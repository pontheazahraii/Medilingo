import { cache } from "react";

import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import db from "./drizzle";
import {
  challengeProgress,
  medicalCategories,
  learningModules,
  subcategories,
  userProgress,
  userSubscription,
} from "./schema";

const DAY_IN_MS = 86_400_000;

export const getCourses = cache(async () => {
  const data = await db.query.medicalCategories.findMany();

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCategory: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCategoryId) return [];

  const data = await db.query.subcategories.findMany({
    where: eq(subcategories.categoryId, userProgress.activeCategoryId),
    orderBy: (subcategories, { asc }) => [asc(subcategories.order)],
    with: {
      learningModules: {
        orderBy: (learningModules, { asc }) => [asc(learningModules.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((subcategory) => {
    const modulesWithCompletedStatus = subcategory.learningModules.map((module) => {
      if (module.challenges.length === 0)
        return { ...module, completed: false };

      const allCompletedChallenges = module.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });

      return { ...module, completed: allCompletedChallenges };
    });

    return { ...subcategory, modules: modulesWithCompletedStatus };
  });

  return normalizedData;
});

export const getCourseById = cache(async (categoryId: number) => {
  const data = await db.query.medicalCategories.findFirst({
    where: eq(medicalCategories.id, categoryId),
    with: {
      subcategories: {
        orderBy: (subcategories, { asc }) => [asc(subcategories.order)],
        with: {
          learningModules: {
            orderBy: (learningModules, { asc }) => [asc(learningModules.order)],
          },
        },
      },
    },
  });

  return data;
});

export const getCourseProgress = cache(async () => {
  const { userId } = auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCategoryId) return null;

  const subcategoriesInActiveCategory = await db.query.subcategories.findMany({
    orderBy: (subcategories, { asc }) => [asc(subcategories.order)],
    where: eq(subcategories.categoryId, userProgress.activeCategoryId),
    with: {
      learningModules: {
        orderBy: (learningModules, { asc }) => [asc(learningModules.order)],
        with: {
          subcategory: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedModule = subcategoriesInActiveCategory
    .flatMap((subcategory) => subcategory.learningModules)
    .find((module) => {
      return module.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some((progress) => !progress.completed)
        );
      });
    });

  return {
    activeModule: firstUncompletedModule,
    activeModuleId: firstUncompletedModule?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = auth();

  if (!userId) return null;

  const courseProgress = await getCourseProgress();
  const moduleId = id || courseProgress?.activeModuleId;

  if (!moduleId) return null;

  const data = await db.query.learningModules.findFirst({
    where: eq(learningModules.id, moduleId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeModuleId) return 0;

  const module = await getLesson(courseProgress?.activeModuleId);

  if (!module) return 0;

  const completedChallenges = module.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / module.challenges.length) * 100
  );

  return percentage;
});

export const getUserSubscription = cache(async () => {
  const { userId } = auth();

  if (!userId) return null;

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) return null;

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

export const getTopTenUsers = cache(async () => {
  const { userId } = auth();

  if (!userId) return [];

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });

  return data;
});
