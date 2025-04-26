export const POINTS_TO_REFILL = 10;

export const MAX_HEARTS = 5;

export const QUESTS = [
  {
    title: "Earn 20 Health Points",
    value: 20,
  },
  {
    title: "Earn 50 Health Points",
    value: 50,
  },
  {
    title: "Earn 100 Health Points",
    value: 100,
  },
  {
    title: "Earn 250 Health Points",
    value: 250,
  },
  {
    title: "Earn 500 Health Points",
    value: 500,
  },
  {
    title: "Earn 1000 Health Points",
    value: 1000,
  },
];

// Medical career ladder levels
export const MEDICAL_LEVELS = [
  "Student",
  "Intern", 
  "Resident",
  "Fellow",
  "Attending"
];

// XP required for each level
export const LEVEL_THRESHOLDS = [
  0,      // Student (starting level)
  1000,   // Intern
  3000,   // Resident 
  7000,   // Fellow
  15000   // Attending
];

// Medical category structure
export const MEDICAL_CATEGORIES = [
  {
    title: "Anatomy",
    subcategories: ["Cardiovascular", "Musculoskeletal", "Neuroanatomy"]
  },
  {
    title: "Physiology",
    subcategories: ["Endocrine System", "Renal Physiology", "Respiratory Physiology"]
  },
  {
    title: "Pharmacology",
    subcategories: ["Antibiotics", "Antihypertensives", "Anesthetics"]
  },
  {
    title: "Pathology",
    subcategories: ["Cancer Types", "Infectious Diseases", "Genetic Disorders"]
  },
  {
    title: "Medical Terminology",
    subcategories: ["Prefixes/Suffixes", "Latin/Greek Root Words"]
  },
  {
    title: "Clinical Procedures",
    subcategories: ["IV Insertion", "Basic Suturing", "CPR Protocols"]
  },
  {
    title: "Patient Communication",
    subcategories: ["Informed Consent", "Bad News Delivery (SPIKES protocol)"]
  },
  {
    title: "Health Literacy",
    subcategories: ["Reading Prescriptions", "Insurance Terms"]
  },
  {
    title: "Emergency Medicine",
    subcategories: ["Trauma Assessment", "Triage Principles"]
  }
];
