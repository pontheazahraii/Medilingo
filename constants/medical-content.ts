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

// Flashcards for each system

export const SKELETAL_FLASHCARDS: MedicalFlashcard[] = [
  { id: 1, term: "Cranium", definition: "The skull that encloses the brain.", category: "Skeletal System", subcategory: "" },
  { id: 2, term: "Clavicle", definition: "Collar bone connecting the sternum and scapula.", category: "Skeletal System", subcategory: "" },
  { id: 3, term: "Femur", definition: "The thigh bone; the longest bone in the body.", category: "Skeletal System", subcategory: "" },
  { id: 4, term: "Sternum", definition: "Chest bone located in the center of the rib cage.", category: "Skeletal System", subcategory: "" }
];

export const MUSCULAR_FLASHCARDS: MedicalFlashcard[] = [
  { id: 5, term: "Biceps Brachii", definition: "Muscle of the upper arm responsible for flexing the elbow.", category: "Muscular System", subcategory: "" },
  { id: 6, term: "Quadriceps", definition: "Group of muscles located at the front of the thigh.", category: "Muscular System", subcategory: "" },
  { id: 7, term: "Deltoid", definition: "Shoulder muscle responsible for arm rotation.", category: "Muscular System", subcategory: "" },
  { id: 8, term: "Gastrocnemius", definition: "Calf muscle that flexes the foot and knee.", category: "Muscular System", subcategory: "" }
];

export const CIRCULATORY_FLASHCARDS: MedicalFlashcard[] = [
  { id: 9, term: "Aorta", definition: "The largest artery in the body carrying blood from the heart.", category: "Circulatory System", subcategory: "" },
  { id: 10, term: "Vein", definition: "Blood vessel that carries blood toward the heart.", category: "Circulatory System", subcategory: "" },
  { id: 11, term: "Capillary", definition: "Smallest blood vessels where gas exchange occurs.", category: "Circulatory System", subcategory: "" },
  { id: 12, term: "Atrium", definition: "One of the two upper chambers of the heart.", category: "Circulatory System", subcategory: "" }
];

export const DIGESTIVE_FLASHCARDS: MedicalFlashcard[] = [
  { id: 13, term: "Esophagus", definition: "Tube that connects the throat to the stomach.", category: "Digestive System", subcategory: "" },
  { id: 14, term: "Small Intestine", definition: "Organ where most digestion and absorption of food occurs.", category: "Digestive System", subcategory: "" },
  { id: 15, term: "Liver", definition: "Organ that produces bile to aid in fat digestion.", category: "Digestive System", subcategory: "" },
  { id: 16, term: "Stomach", definition: "Organ where food is mixed with digestive juices.", category: "Digestive System", subcategory: "" }
];

export const RESPIRATORY_FLASHCARDS: MedicalFlashcard[] = [
  { id: 17, term: "Trachea", definition: "The windpipe that carries air to the lungs.", category: "Respiratory System", subcategory: "" },
  { id: 18, term: "Alveoli", definition: "Tiny air sacs where gas exchange occurs in the lungs.", category: "Respiratory System", subcategory: "" },
  { id: 19, term: "Bronchi", definition: "Major air passages branching from the trachea to the lungs.", category: "Respiratory System", subcategory: "" },
  { id: 20, term: "Diaphragm", definition: "Muscle that plays a major role in breathing.", category: "Respiratory System", subcategory: "" }
];

export const NERVOUS_FLASHCARDS: MedicalFlashcard[] = [
  { id: 21, term: "Neuron", definition: "The basic working unit of the brain and nervous system.", category: "Nervous System", subcategory: "" },
  { id: 22, term: "Cerebrum", definition: "Largest part of the brain responsible for voluntary activities.", category: "Nervous System", subcategory: "" },
  { id: 23, term: "Spinal Cord", definition: "Bundle of nerves that sends signals between the brain and the body.", category: "Nervous System", subcategory: "" },
  { id: 24, term: "Synapse", definition: "Junction where information is transmitted from one neuron to another.", category: "Nervous System", subcategory: "" }
];

// Placeholder multiple choice questions
export const MULTIPLE_CHOICE_QUESTIONS: MedicalQuizQuestion[] = [
  {
    id: 1,
    question: "Which bone is known as the collar bone?",
    options: ["Femur", "Clavicle", "Scapula", "Tibia"],
    correctOptionIndex: 1,
    category: "Skeletal System",
    subcategory: ""
  },
  {
    id: 2,
    question: "Which organ pumps blood throughout the body?",
    options: ["Liver", "Brain", "Heart", "Lung"],
    correctOptionIndex: 2,
    category: "Circulatory System",
    subcategory: ""
  }
];

// Placeholder fill in the blank style questions
export const FILL_IN_THE_BLANK_QUESTIONS: MedicalQuizQuestion[] = [
  {
    id: 1,
    question: "The _______ carries air from the throat to the lungs.",
    options: ["Trachea", "Esophagus", "Bronchi", "Aorta"],
    correctOptionIndex: 0,
    category: "Respiratory System",
    subcategory: ""
  },
  {
    id: 2,
    question: "The largest part of the human brain is called the _______.",
    options: ["Cerebellum", "Spinal Cord", "Cerebrum", "Medulla"],
    correctOptionIndex: 2,
    category: "Nervous System",
    subcategory: ""
  }
];
