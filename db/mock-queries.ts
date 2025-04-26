// Mock implementation of db/queries.ts for local development
import { cache } from "react";
import { mockUser } from "@/lib/mock-auth";

// Mock data with medical body systems theme
const mockCourses = [
  {
    id: 1,
    title: "Cardiovascular",
    imageSrc: "/cardio-icon.svg",
  },
  {
    id: 2,
    title: "Respiratory",
    imageSrc: "/respiratory-icon.svg",
  },
  {
    id: 3,
    title: "Neurological",
    imageSrc: "/neuro-icon.svg",
  },
];

const mockUserProgress = {
  userId: mockUser.id,
  userName: `${mockUser.firstName} ${mockUser.lastName}`,
  userImageSrc: mockUser.imageUrl,
  activeCourseId: 1,
  hearts: 5,
  points: 100,
  activeCourse: mockCourses[0],
};

const mockUnits = [
  {
    id: 1,
    courseId: 1,
    title: "Cardiac Anatomy", 
    description: "Learn the structures of the heart",
    order: 1,
    lessons: [
      {
        id: 1,
        unitId: 1,
        title: "Heart Chambers",
        order: 1,
        completed: false,
        challenges: [
          {
            id: 1,
            lessonId: 1,
            type: "SELECT",
            question: "Which chamber receives oxygenated blood from the lungs?",
            order: 1,
            completed: false,
            challengeProgress: [],
            challengeOptions: [
              {
                id: 1,
                challengeId: 1,
                text: "Left Atrium",
                correct: true,
                imageSrc: null,
                audioSrc: null,
              },
              {
                id: 2,
                challengeId: 1,
                text: "Right Atrium",
                correct: false,
                imageSrc: null,
                audioSrc: null,
              },
              {
                id: 3,
                challengeId: 1,
                text: "Left Ventricle",
                correct: false,
                imageSrc: null,
                audioSrc: null,
              },
            ],
          },
          {
            id: 2,
            lessonId: 1,
            type: "SELECT",
            question: "Which vessel carries blood away from the heart to the body?",
            order: 2,
            completed: false,
            challengeProgress: [],
            challengeOptions: [
              {
                id: 4,
                challengeId: 2,
                text: "Aorta",
                correct: true,
                imageSrc: null,
                audioSrc: null,
              },
              {
                id: 5,
                challengeId: 2,
                text: "Pulmonary Artery",
                correct: false,
                imageSrc: null,
                audioSrc: null,
              },
              {
                id: 6,
                challengeId: 2,
                text: "Vena Cava",
                correct: false,
                imageSrc: null,
                audioSrc: null,
              },
            ],
          },
        ],
      },
    ],
  },
];

const mockLessons = mockUnits.flatMap(unit => unit.lessons);

const mockSubscription = {
  userId: mockUser.id,
  stripePriceId: "price_mock",
  stripeSubscriptionId: "sub_mock",
  stripeCustomerId: "cus_mock",
  stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  isActive: true,
};

// Mock implementations of all queries
export const getCourses = cache(async () => {
  return mockCourses;
});

export const getUserProgress = cache(async () => {
  return mockUserProgress;
});

export const getUnits = cache(async () => {
  return mockUnits;
});

export const getCourseById = cache(async (courseId: number) => {
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return null;
  
  return {
    ...course,
    units: mockUnits.filter(u => u.courseId === courseId),
  };
});

export const getCourseProgress = cache(async () => {
  const firstLesson = mockLessons[0];
  
  return {
    activeLesson: firstLesson,
    activeLessonId: firstLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const lessonId = id || mockLessons[0]?.id;
  if (!lessonId) return null;
  
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (!lesson) return null;
  
  return lesson;
});

export const getLessonPercentage = cache(async () => {
  return 25; // Mock 25% completion
});

export const getUserSubscription = cache(async () => {
  return mockSubscription;
});

export const getTopTenUsers = cache(async () => {
  // Create 10 mock users for the leaderboard
  return Array.from({ length: 10 }, (_, i) => ({
    userId: `mock-user-${i + 1}`,
    userName: `User ${i + 1}`,
    userImageSrc: "/avatar.png",
    points: 1000 - i * 100,
  }));
}); 