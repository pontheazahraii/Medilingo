// This is a mock database service for local development without a real database
import { medicalCategories, subcategories, learningModules, challenges, challengeOptions, userProgress } from "./schema";

// Mock data
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

const mockSubcategories = [
  {
    id: 1,
    categoryId: 1,
    title: "Basic Cardiac Anatomy",
    description: "Learn the structure of the heart and blood vessels",
    order: 1,
  },
];

const mockLearningModules = [
  {
    id: 1,
    subcategoryId: 1,
    title: "Heart Structures",
    moduleType: "quiz",
    order: 1,
  },
];

const mockChallenges = [
  {
    id: 1,
    moduleId: 1,
    type: "SELECT",
    question: "Which chamber receives oxygenated blood from the lungs?",
    order: 1,
  },
];

const mockChallengeOptions = [
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
];

// Mock query functions
const mockDb = {
  query: {
    medicalCategories: {
      findMany: async () => mockMedicalCategories,
      findFirst: async () => mockMedicalCategories[0],
    },
    subcategories: {
      findMany: async () => mockSubcategories,
      findFirst: async () => mockSubcategories[0],
    },
    learningModules: {
      findMany: async () => mockLearningModules,
      findFirst: async () => mockLearningModules[0],
    },
    challenges: {
      findMany: async () => mockChallenges,
      findFirst: async () => mockChallenges[0],
    },
    challengeOptions: {
      findMany: async () => mockChallengeOptions,
      findFirst: async () => mockChallengeOptions[0],
    },
    userProgress: {
      findFirst: async () => ({
        userId: "mock-user",
        activeCategoryId: 1,
        hearts: 5,
        points: 100,
        level: "Student",
        streak: 0,
      }),
    },
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