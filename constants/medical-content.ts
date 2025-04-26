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

export type MatchingGame = {
  id: number;
  terms: { term: string; definition: string }[];
};

// Structure of medical categories
export const MEDICAL_CATEGORIES = [
  {
    id: 1,
    title: "Clinical Anatomy",
    imageSrc: "/anatomy-icon.svg",
    description: "Essential anatomy knowledge for healthcare practitioners",
    subcategories: ["Cardiovascular", "Musculoskeletal", "Neuroanatomy", "Respiratory System", "Gastrointestinal"]
  },
  {
    id: 2,
    title: "Clinical Physiology",
    imageSrc: "/physiology-icon.svg",
    description: "Physiological principles for patient care",
    subcategories: ["Endocrine Function", "Renal & Fluid Balance", "Respiratory Physiology", "Cardiovascular Function"]
  },
  {
    id: 3,
    title: "Pharmacotherapy",
    imageSrc: "/pharma-icon.svg",
    description: "Medication knowledge for healthcare providers",
    subcategories: ["Antimicrobials", "Cardiovascular Drugs", "Pain Management", "Psychiatric Medications", "Drug Interactions"]
  },
  {
    id: 4,
    title: "Clinical Pathology",
    imageSrc: "/pathology-icon.svg",
    description: "Disease processes and clinical manifestations",
    subcategories: ["Oncology", "Infectious Diseases", "Genetic Disorders", "Autoimmune Conditions", "Metabolic Disorders"]
  },
  {
    id: 5,
    title: "Medical Terminology",
    imageSrc: "/terminology-icon.svg",
    description: "Essential terminology for healthcare documentation",
    subcategories: ["Prefixes/Suffixes", "Latin/Greek Roots", "Abbreviations & Acronyms", "Specialty-Specific Terms"]
  },
  {
    id: 6,
    title: "Clinical Procedures",
    imageSrc: "/procedures-icon.svg",
    description: "Common procedures for healthcare practitioners",
    subcategories: ["Vascular Access", "Wound Management", "Airway Management", "Diagnostic Procedures", "Surgical Asepsis"]
  },
  {
    id: 7,
    title: "Patient Communication",
    imageSrc: "/communication-icon.svg",
    description: "Effective communication skills for healthcare",
    subcategories: ["Informed Consent", "Breaking Bad News", "Health Literacy", "Cultural Competence", "Interprofessional Communication"]
  },
  {
    id: 8,
    title: "Clinical Documentation",
    imageSrc: "/literacy-icon.svg",
    description: "Documentation standards for healthcare professionals",
    subcategories: ["SOAP Notes", "Electronic Health Records", "Discharge Summaries", "Medical Coding Basics"]
  },
  {
    id: 9,
    title: "Emergency Medicine",
    imageSrc: "/emergency-icon.svg",
    description: "Critical emergency care concepts for clinicians",
    subcategories: ["Trauma Assessment", "Resuscitation", "Critical Care", "Disaster Management", "Triage Principles"]
  },
  {
    id: 10,
    title: "Healthcare Ethics & Law",
    imageSrc: "/ethics-icon.svg",
    description: "Ethical and legal foundations for healthcare practice",
    subcategories: ["Patient Rights", "Confidentiality & HIPAA", "End-of-Life Care", "Professional Boundaries"]
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