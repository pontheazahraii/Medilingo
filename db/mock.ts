// This is a mock database service for local development without a real database
import { medicalCategories, subcategories, learningModules, challenges, challengeOptions, userProgress } from "./schema";
import { CARDIOVASCULAR_FLASHCARDS, ANTIBIOTICS_MATCHING_PAIRS } from "@/constants/medical-content";

// Mock data
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

const mockSubcategories = [
  {
    id: 1,
    categoryId: 1,
    title: "Cardiovascular",
    description: "Learn about the heart and circulatory system",
    order: 1,
  },
  {
    id: 2,
    categoryId: 3, 
    title: "Antibiotics",
    description: "Learn about antibiotics and their mechanisms of action",
    order: 1,
  },
];

const mockLearningModules = [
  {
    id: 1,
    subcategoryId: 1,
    title: "Heart Structure Flashcards",
    moduleType: "flashcards",
    order: 1,
  },
  {
    id: 2,
    subcategoryId: 1,
    title: "Matching Game: Heart Anatomy",
    moduleType: "match",
    order: 2,
  },
  {
    id: 3,
    subcategoryId: 2,
    title: "Matching Game: Antibiotics",
    moduleType: "match",
    order: 1,
  },
];

const mockChallenges = [
  {
    id: 1,
    moduleId: 1,
    type: "SELECT",
    question: "What is the middle and thickest layer of the heart wall?",
    order: 1,
  },
  {
    id: 100,
    moduleId: 2,
    type: "MATCH",
    question: "Match the heart structures to their definitions",
    order: 1,
  },
  {
    id: 101,
    moduleId: 3,
    type: "MATCH",
    question: "Match the antibiotics to their mechanisms of action",
    order: 1,
  },
];

const mockChallengeOptions = [
  {
    id: 1,
    challengeId: 1,
    text: "Myocardium",
    correct: true,
    imageSrc: null,
    audioSrc: null,
  },
  {
    id: 2,
    challengeId: 1,
    text: "Endocardium",
    correct: false,
    imageSrc: null,
    audioSrc: null,
  },
  {
    id: 3,
    challengeId: 1,
    text: "Epicardium",
    correct: false,
    imageSrc: null,
    audioSrc: null,
  },
];

// Mock query functions
const mockDb = {
  query: {
    medicalCategories: {
      findMany: async () => mockMedicalCategories,
      findFirst: async (params?: any) => {
        return mockMedicalCategories[0] || null;
      },
    },
    subcategories: {
      findMany: async () => mockSubcategories,
      findFirst: async (params?: any) => {
        return mockSubcategories[0] || null;
      },
    },
    learningModules: {
      findMany: async () => mockLearningModules,
      findFirst: async (params?: any) => {
        return mockLearningModules[0] || null;
      },
    },
    challenges: {
      findMany: async () => mockChallenges,
      findFirst: async (params?: any) => {
        return mockChallenges[0] || null;
      },
    },
    challengeOptions: {
      findMany: async () => mockChallengeOptions,
      findFirst: async (params?: any) => {
        return mockChallengeOptions[0] || null;
      },
    },
    userProgress: {
      findMany: async () => [{
        userId: "mock-user",
        activeCategoryId: 1,
        hearts: 5,
        points: 100,
        level: "Student",
        streak: 0,
      }],
      findFirst: async (params?: any) => ({
        userId: "mock-user",
        activeCategoryId: 1,
        hearts: 5,
        points: 100,
        level: "Student",
        streak: 0,
      }),
    },
    userSubscription: {
      findFirst: async (params?: any) => null, // No subscription by default
    },
    challengeProgress: {
      findFirst: async (params?: any) => null, // No challenge progress by default
    }
  },
  insert: () => ({
    values: () => ({
      returning: async () => [{ id: 999 }],
    }),
  }),
  update: () => ({
    set: () => ({
      where: () => ({
        returning: async () => [{ id: 1 }],
      }),
    }),
  }),
  delete: () => ({
    where: () => ({
      returning: async () => [{ id: 1 }],
    }),
  }),
};

export default mockDb; 