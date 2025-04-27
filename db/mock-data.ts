import { MEDICAL_CATEGORIES } from "@/constants/medical-content";

// Mock database types
interface MockChallenge {
  id: number;
  question: string;
  moduleId: number;
  type: string;
  order: number;
  challengeProgress: any[];
  challengeOptions: any[];
}

interface MockModule {
  id: number;
  title: string;
  description: string;
  subcategoryId: number;
  order: number;
  challenges: MockChallenge[];
}

interface MockSubcategory {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  order: number;
  learningModules: MockModule[];
}

// Mock subcategories based on medical categories
export const generateMockSubcategories = (): MockSubcategory[] => {
  const subcategories: MockSubcategory[] = [];
  let subcategoryId = 1;
  let order = 1;

  MEDICAL_CATEGORIES.forEach((category) => {
    category.subcategories.forEach((subcategoryTitle) => {
      subcategories.push({
        id: subcategoryId,
        title: subcategoryTitle,
        description: `Learn essential healthcare terminology for ${subcategoryTitle}`,
        categoryId: category.id,
        order: order,
        // Add empty modules array for safety
        learningModules: generateMockModules(subcategoryId)
      });
      subcategoryId++;
      order++;
    });
  });

  return subcategories;
};

// Generate mock learning modules for each subcategory
export const generateMockModules = (subcategoryId: number): MockModule[] => {
  const modules: MockModule[] = [];
  const totalModules = 3; // 3 modules per subcategory
  
  for (let i = 1; i <= totalModules; i++) {
    modules.push({
      id: (subcategoryId - 1) * totalModules + i,
      title: `Module ${i}`,
      description: `Healthcare terminology module ${i}`,
      subcategoryId: subcategoryId,
      order: i,
      // Include empty challenges array for safety
      challenges: generateMockChallenges((subcategoryId - 1) * totalModules + i)
    });
  }
  
  return modules;
};

// Generate mock challenges for each module
export const generateMockChallenges = (moduleId: number): MockChallenge[] => {
  const challenges: MockChallenge[] = [];
  const totalChallenges = 5; // 5 challenges per module
  
  for (let i = 1; i <= totalChallenges; i++) {
    challenges.push({
      id: (moduleId - 1) * totalChallenges + i,
      question: `Challenge ${i} question`,
      moduleId: moduleId,
      type: i % 3 === 0 ? "ASSIST" : i % 2 === 0 ? "SELECT" : "MATCH",
      order: i,
      challengeProgress: [],
      challengeOptions: []
    });
  }
  
  return challenges;
};

// Mock user progress
export const mockUserProgress = {
  id: 1,
  userId: "user_mock",
  userName: "Medical Student",
  userImageSrc: "/Pete_Alone_Logo.png",
  activeCategoryId: 1,
  points: 100,
  level: "1",
  hearts: 5,
  activeCategory: MEDICAL_CATEGORIES[0]
};

// Mock course progress function
export const mockCourseProgress = {
  activeModule: {
    id: 1,
    title: "Introduction to Clinical Anatomy",
    description: "Learn the basics of clinical anatomy terminology",
    subcategoryId: 1,
    order: 1,
    challenges: generateMockChallenges(1)
  },
  activeModuleId: 1
}; 