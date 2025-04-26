// This is a mock database service for local development without a real database
import { courses, units, lessons, challenges, challengeOptions, userProgress } from "./schema";

// Mock data
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

const mockUnits = [
  {
    id: 1,
    courseId: 1,
    title: "Basic Cardiac Anatomy",
    description: "Learn the structure of the heart and blood vessels",
    order: 1,
  },
];

const mockLessons = [
  {
    id: 1,
    unitId: 1,
    title: "Heart Structures",
    order: 1,
  },
];

const mockChallenges = [
  {
    id: 1,
    lessonId: 1,
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
    courses: {
      findMany: async () => mockCourses,
      findFirst: async () => mockCourses[0],
    },
    units: {
      findMany: async () => mockUnits,
      findFirst: async () => mockUnits[0],
    },
    lessons: {
      findMany: async () => mockLessons,
      findFirst: async () => mockLessons[0],
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
        activeCourseId: 1,
        hearts: 5,
        points: 100,
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