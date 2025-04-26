// Mock implementation of db/queries.ts for local development
import { cache } from "react";
import { mockUser } from "@/lib/mock-auth";
import { CARDIOVASCULAR_FLASHCARDS, ANTIBIOTICS_MATCHING_PAIRS } from "@/constants/medical-content";

// Mock data with medical categories theme
const mockMedicalCategories = [
  {
    id: 1,
    title: "Anatomy",
    imageSrc: "/anatomy-icon.svg",
    description: "Explore the structure of the human body",
  },
  {
    id: 2,
    title: "Physiology",
    imageSrc: "/physiology-icon.svg",
    description: "Study how the body's systems function",
  },
  {
    id: 3,
    title: "Pharmacology",
    imageSrc: "/pharma-icon.svg",
    description: "Learn about drugs and their effects on the body",
  },
];

const mockUserProgress = {
  userId: mockUser.id,
  userName: `${mockUser.firstName} ${mockUser.lastName}`,
  userImageSrc: mockUser.imageUrl,
  activeCategoryId: 1,
  hearts: 5,
  points: 100,
  level: "Student",
  streak: 3,
  activeCategory: mockMedicalCategories[0],
};

const mockSubcategories = [
  {
    id: 1,
    categoryId: 1,
    title: "Cardiovascular", 
    description: "Learn about the heart and circulatory system",
    order: 1,
    learningModules: [
      {
        id: 1,
        subcategoryId: 1,
        title: "Heart Structure Flashcards",
        order: 1,
        moduleType: "flashcards",
        completed: false,
        challenges: CARDIOVASCULAR_FLASHCARDS.map((card, index) => ({
          id: index + 1,
          moduleId: 1,
          type: "SELECT",
          question: card.term,
          order: index + 1,
          completed: false,
          challengeProgress: [],
          challengeOptions: [
            {
              id: index * 3 + 1,
              challengeId: index + 1,
              text: card.definition,
              correct: true,
              imageSrc: null,
              audioSrc: null,
            },
            {
              id: index * 3 + 2,
              challengeId: index + 1,
              text: "Incorrect definition 1",
              correct: false,
              imageSrc: null,
              audioSrc: null,
            },
            {
              id: index * 3 + 3,
              challengeId: index + 1,
              text: "Incorrect definition 2",
              correct: false,
              imageSrc: null,
              audioSrc: null,
            },
          ],
        })),
      },
      {
        id: 2,
        subcategoryId: 1,
        title: "Matching Game: Heart Anatomy",
        order: 2,
        moduleType: "match",
        completed: false,
        challenges: [
          {
            id: 100,
            moduleId: 2,
            type: "MATCH",
            question: "Match the heart structures to their definitions",
            order: 1,
            completed: false,
            challengeProgress: [],
            challengeOptions: [],
            matchingPairs: CARDIOVASCULAR_FLASHCARDS.slice(0, 5),
          }
        ],
      },
    ],
  },
  {
    id: 2,
    categoryId: 3,
    title: "Antibiotics", 
    description: "Learn about antibiotics and their mechanisms of action",
    order: 1,
    learningModules: [
      {
        id: 3,
        subcategoryId: 2,
        title: "Matching Game: Antibiotics",
        order: 1,
        moduleType: "match",
        completed: false,
        challenges: [
          {
            id: 101,
            moduleId: 3,
            type: "MATCH",
            question: "Match the antibiotics to their mechanisms of action",
            order: 1,
            completed: false,
            challengeProgress: [],
            challengeOptions: [],
            matchingPairs: ANTIBIOTICS_MATCHING_PAIRS,
          }
        ],
      },
    ],
  },
];

const mockLearningModules = mockSubcategories.flatMap(subcategory => subcategory.learningModules);

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
  return mockMedicalCategories;
});

export const getUserProgress = cache(async () => {
  return mockUserProgress;
});

export const getUnits = cache(async () => {
  return mockSubcategories;
});

export const getCourseById = cache(async (categoryId: number) => {
  const category = mockMedicalCategories.find(c => c.id === categoryId);
  if (!category) return null;
  
  return {
    ...category,
    subcategories: mockSubcategories.filter(s => s.categoryId === categoryId),
  };
});

export const getCourseProgress = cache(async () => {
  // If there are no modules, return default data for first module
  if (!mockLearningModules || mockLearningModules.length === 0) {
    return {
      activeModule: null,
      activeModuleId: null,
    };
  }
  
  const firstModule = mockLearningModules[0];
  
  return {
    activeModule: firstModule,
    activeModuleId: firstModule?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const moduleId = id || mockLearningModules[0]?.id;
  if (!moduleId) return null;
  
  const module = mockLearningModules.find(m => m.id === moduleId);
  if (!module) return null;
  
  return module;
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();
  
  if (!courseProgress || !courseProgress.activeModuleId) return 0;
  
  return 25; // Mock 25% completion
});

export const getUserSubscription = cache(async () => {
  return mockSubscription;
});

export const getTopTenUsers = cache(async () => {
  // Create 10 mock users for the leaderboard
  return Array.from({ length: 10 }, (_, i) => ({
    userId: `mock-user-${i + 1}`,
    userName: `Medical Student ${i + 1}`,
    userImageSrc: "/avatar.png",
    points: 1000 - i * 100,
  }));
}); 