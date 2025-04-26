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
    title: "Anatomy",
    imageSrc: "/anatomy-icon.svg",
    description: "Explore the structure of the human body",
    subcategories: ["Cardiovascular", "Musculoskeletal", "Neuroanatomy"]
  },
  {
    id: 2,
    title: "Physiology",
    imageSrc: "/physiology-icon.svg",
    description: "Study how the body's systems function",
    subcategories: ["Endocrine System", "Renal Physiology", "Respiratory Physiology"]
  },
  {
    id: 3,
    title: "Pharmacology",
    imageSrc: "/pharma-icon.svg",
    description: "Learn about drugs and their effects on the body",
    subcategories: ["Antibiotics", "Antihypertensives", "Anesthetics"]
  },
  {
    id: 4,
    title: "Pathology",
    imageSrc: "/pathology-icon.svg",
    description: "Study diseases and their effects",
    subcategories: ["Cancer Types", "Infectious Diseases", "Genetic Disorders"]
  },
  {
    id: 5,
    title: "Medical Terminology",
    imageSrc: "/terminology-icon.svg",
    description: "Master the language of medicine",
    subcategories: ["Prefixes/Suffixes", "Latin/Greek Root Words"]
  },
  {
    id: 6,
    title: "Clinical Procedures",
    imageSrc: "/procedures-icon.svg",
    description: "Learn essential clinical skills",
    subcategories: ["IV Insertion", "Basic Suturing", "CPR Protocols"]
  },
  {
    id: 7,
    title: "Patient Communication",
    imageSrc: "/communication-icon.svg",
    description: "Develop effective provider-patient interaction skills",
    subcategories: ["Informed Consent", "Bad News Delivery (SPIKES protocol)"]
  },
  {
    id: 8,
    title: "Health Literacy",
    imageSrc: "/literacy-icon.svg",
    description: "Help patients understand medical information",
    subcategories: ["Reading Prescriptions", "Insurance Terms"]
  },
  {
    id: 9,
    title: "Emergency Medicine",
    imageSrc: "/emergency-icon.svg",
    description: "Learn critical emergency care principles",
    subcategories: ["Trauma Assessment", "Triage Principles"]
  }
];

// Sample flashcards for Anatomy - Cardiovascular subcategory
export const CARDIOVASCULAR_FLASHCARDS: MedicalFlashcard[] = [
  {
    id: 1,
    term: "Myocardium",
    definition: "The middle and thickest layer of the heart wall composed of cardiac muscle",
    category: "Anatomy",
    subcategory: "Cardiovascular"
  },
  {
    id: 2,
    term: "Endocardium",
    definition: "The innermost layer of tissue that lines the chambers of the heart",
    category: "Anatomy",
    subcategory: "Cardiovascular"
  },
  {
    id: 3,
    term: "Epicardium",
    definition: "The outer layer of the heart wall, also known as the visceral pericardium",
    category: "Anatomy",
    subcategory: "Cardiovascular"
  },
  {
    id: 4,
    term: "Interventricular Septum",
    definition: "The wall separating the right and left ventricles of the heart",
    category: "Anatomy",
    subcategory: "Cardiovascular"
  },
  {
    id: 5,
    term: "Mitral Valve",
    definition: "A bicuspid valve between the left atrium and left ventricle of the heart",
    category: "Anatomy",
    subcategory: "Cardiovascular"
  }
];

// Sample matching pairs for Pharmacology - Antibiotics subcategory
export const ANTIBIOTICS_MATCHING_PAIRS: MedicalMatchingPair[] = [
  {
    id: 1,
    term: "Penicillin",
    definition: "Beta-lactam antibiotic that inhibits cell wall synthesis",
    category: "Pharmacology",
    subcategory: "Antibiotics"
  },
  {
    id: 2,
    term: "Ciprofloxacin",
    definition: "Fluoroquinolone antibiotic that inhibits bacterial DNA gyrase",
    category: "Pharmacology",
    subcategory: "Antibiotics"
  },
  {
    id: 3,
    term: "Tetracycline",
    definition: "Inhibits bacterial protein synthesis by binding to the 30S ribosomal subunit",
    category: "Pharmacology",
    subcategory: "Antibiotics"
  },
  {
    id: 4,
    term: "Vancomycin",
    definition: "Glycopeptide antibiotic used to treat serious Gram-positive infections",
    category: "Pharmacology",
    subcategory: "Antibiotics"
  },
  {
    id: 5,
    term: "Azithromycin",
    definition: "Macrolide antibiotic that binds to the 50S ribosomal subunit",
    category: "Pharmacology",
    subcategory: "Antibiotics"
  }
];

// Sample quiz questions for Medical Terminology - Prefixes/Suffixes subcategory
export const MEDICAL_TERMINOLOGY_QUIZ: MedicalQuizQuestion[] = [
  {
    id: 1,
    question: "What does the prefix 'brady-' mean?",
    options: ["Slow", "Fast", "Difficult", "Painful"],
    correctOptionIndex: 0,
    category: "Medical Terminology",
    subcategory: "Prefixes/Suffixes"
  },
  {
    id: 2,
    question: "What does the suffix '-ectomy' indicate?",
    options: ["Inflammation", "Surgical removal", "Record or image", "Flow or discharge"],
    correctOptionIndex: 1,
    category: "Medical Terminology",
    subcategory: "Prefixes/Suffixes"
  },
  {
    id: 3,
    question: "The prefix 'hyper-' means:",
    options: ["Below", "Within", "Above normal", "Beside"],
    correctOptionIndex: 2,
    category: "Medical Terminology",
    subcategory: "Prefixes/Suffixes"
  },
  {
    id: 4,
    question: "The suffix '-itis' refers to:",
    options: ["Disease", "Inflammation", "Condition", "Process"],
    correctOptionIndex: 1,
    category: "Medical Terminology",
    subcategory: "Prefixes/Suffixes"
  },
  {
    id: 5,
    question: "What does the prefix 'dys-' indicate?",
    options: ["Double", "Abnormal/difficult", "Away from", "Through"],
    correctOptionIndex: 1,
    category: "Medical Terminology",
    subcategory: "Prefixes/Suffixes"
  }
]; 