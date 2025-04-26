// Mock implementation of db/queries.ts for local development
import { cache } from "react";
import { mockUser } from "@/lib/mock-auth";

// Mock data with medical body systems theme
const mockMedicalCategories = [
  {
    id: 1,
    title: "Cardiovascular",
    imageSrc: "/cardio-icon.svg",
    description: "Learn about the heart and circulatory system",
  },
  {
    id: 2,
    title: "Respiratory",
    imageSrc: "/respiratory-icon.svg",
    description: "Study the lungs and breathing system",
  },
  {
    id: 3,
    title: "Neurological",
    imageSrc: "/neuro-icon.svg",
    description: "Explore the brain and nervous system",
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
    title: "Cardiac Anatomy", 
    description: "Learn the structures of the heart",
    order: 1,
    learningModules: [
      {
        id: 1,
        subcategoryId: 1,
        title: "Heart Chambers",
        order: 1,
        moduleType: "quiz",
        completed: false,
        challenges: [
          {
            id: 1,
            moduleId: 1,
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
            moduleId: 1,
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