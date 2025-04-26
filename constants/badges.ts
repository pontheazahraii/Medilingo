// MediLingo Badge System

export const MEDICAL_BADGES = [
  // Category-specific badges
  {
    id: 1,
    title: "Anatomy Ace",
    description: "Master of anatomical knowledge",
    imageSrc: "/badges/anatomy.svg",
    category: "Anatomy",
    requirementType: "category_mastery",
    requirementValue: 90, // 90% completion of Anatomy
  },
  {
    id: 2,
    title: "Physiology Phenom",
    description: "Expert in how the body functions",
    imageSrc: "/badges/physiology.svg",
    category: "Physiology",
    requirementType: "category_mastery",
    requirementValue: 90,
  },
  {
    id: 3,
    title: "Pharma Phenom",
    description: "Medication and pharmacology expert",
    imageSrc: "/badges/pharmacology.svg",
    category: "Pharmacology",
    requirementType: "category_mastery",
    requirementValue: 90,
  },
  {
    id: 4,
    title: "Pathology Pro",
    description: "Disease and pathology specialist",
    imageSrc: "/badges/pathology.svg",
    category: "Pathology",
    requirementType: "category_mastery",
    requirementValue: 90,
  },
  {
    id: 5,
    title: "Terminology Titan",
    description: "Master of medical terminology",
    imageSrc: "/badges/terminology.svg",
    category: "Medical Terminology",
    requirementType: "category_mastery",
    requirementValue: 90,
  },
  
  // Streak badges
  {
    id: 6,
    title: "Week Warrior",
    description: "Maintained a 7-day learning streak",
    imageSrc: "/badges/streak7.svg",
    requirementType: "streak",
    requirementValue: 7,
  },
  {
    id: 7,
    title: "Month Master",
    description: "Maintained a 30-day learning streak",
    imageSrc: "/badges/streak30.svg",
    requirementType: "streak",
    requirementValue: 30,
  },
  
  // Points badges
  {
    id: 8,
    title: "Health Hero",
    description: "Earned 5,000 health points",
    imageSrc: "/badges/points5k.svg",
    requirementType: "points",
    requirementValue: 5000,
  },
  {
    id: 9,
    title: "Medical Master",
    description: "Earned 20,000 health points",
    imageSrc: "/badges/points20k.svg",
    requirementType: "points",
    requirementValue: 20000,
  },
  
  // Perfect score badges
  {
    id: 10,
    title: "Perfect Precision",
    description: "Completed 10 quizzes with 100% accuracy",
    imageSrc: "/badges/perfect10.svg",
    requirementType: "perfect_quizzes",
    requirementValue: 10,
  },
  
  // Game mode badges
  {
    id: 11,
    title: "Flash Master",
    description: "Completed 100 flashcards",
    imageSrc: "/badges/flashcards.svg",
    requirementType: "flashcards_completed",
    requirementValue: 100,
  },
  {
    id: 12,
    title: "Quiz King",
    description: "Completed 50 quizzes",
    imageSrc: "/badges/quizzes.svg",
    requirementType: "quizzes_completed",
    requirementValue: 50,
  },
  {
    id: 13,
    title: "Game Guru",
    description: "Completed 25 mini-games",
    imageSrc: "/badges/minigames.svg",
    requirementType: "minigames_completed",
    requirementValue: 25,
  },
]; 