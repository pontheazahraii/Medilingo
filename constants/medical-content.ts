// Medical learning content organized by main categories and subcategories

// Flashcard types
export type MedicalFlashcard = {
  id: number;
  term: string;
  definition: string;
  category: string;
  subcategory: string;
};

// Quiz question types
export type MedicalQuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  category: string;
  subcategory: string;
};

// Matching pairs for matching games
export type MedicalMatchingPair = {
  id: number;
  term: string;
  definition: string;
  category: string;
  subcategory: string;
};

// Structure of medical categories
export const MEDICAL_CATEGORIES = [
  {
    id: 1,
    title: "Skeletal System Flashcards",
    imageSrc: "/anatomy-icon.svg",
    description: "Study the human bones and structure",
    subcategories: []
  },
  {
    id: 2,
    title: "Muscular System Flashcards",
    imageSrc: "/physiology-icon.svg",
    description: "Study the body's muscles and movement",
    subcategories: []
  },
  {
    id: 3,
    title: "Circulatory System Flashcards",
    imageSrc: "/pharma-icon.svg",
    description: "Explore the blood flow and the heart",
    subcategories: []
  },
  {
    id: 4,
    title: "Digestive System Flashcardsogy",
    imageSrc: "/pathology-icon.svg",
    description: "Study digestion and metabolism",
    subcategories: []
  },
  {
    id: 5,
    title: "Respiratory System Flashcards",
    imageSrc: "/terminology-icon.svg",
    description: "Learn about breathing and lungs",
    subcategories: []
  },
  {
    id: 6,
    title: "Nervous System Flashcards",
    imageSrc: "/procedures-icon.svg",
    description: "Study the nervous system and brain",
    subcategories: []
  },
  {
    id: 7,
    title: "Multiple Choice Practice",
    imageSrc: "/communication-icon.svg",
    description: "Practice all 6 systems in a multiple choice format",
    subcategories: []
  },
  {
    id: 8,
    title: "Fill In The Blank Practice",
    imageSrc: "/literacy-icon.svg",
    description: "Practice all 6 systems in a fill in the black format",
    subcategories: []
  },
  {
    id: 9,
    title: "Diagram Practice",
    imageSrc: "/emergency-icon.svg",
    description: "Practice identifying parts of all 6 body systems on diagrams",
    subcategories: []
  }
];

export const SKELETAL_FLASHCARDS: MedicalFlashcard[] = [ /* terms from Skeletal system */ ];
export const MUSCULAR_FLASHCARDS: MedicalFlashcard[] = [ /* terms from Muscular system */ ];
export const CIRCULATORY_FLASHCARDS: MedicalFlashcard[] = [ /* terms from Circulatory system */ ];
export const DIGESTIVE_FLASHCARDS: MedicalFlashcard[] = [ /* terms from Digestive system */ ];
export const RESPIRATORY_FLASHCARDS: MedicalFlashcard[] = [ /* terms from Respiratory system */ ];
export const NERVOUS_FLASHCARDS: MedicalFlashcard[] = [ /* terms from Nervous system */ ];
export const MULTIPLE_CHOICE_QUESTIONS: MedicalQuizQuestion[] = [
  // Will populate from your Questions_Data.csv later
];

export const FILL_IN_THE_BLANK_QUESTIONS: MedicalQuizQuestion[] = [
  // Will populate from your Questions_Data.csv later
];
