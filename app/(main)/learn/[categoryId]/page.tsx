"use client";

import { MEDICAL_CATEGORIES } from "@/constants/medical-content";
import { SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS,
 } from "@/constants/medical-content";
import { Button } from "@/components/ui/button"; 
import { useRouter, useParams } from "next/navigation";

const LearnPage = () => {
  // Use useParams instead of props.params
  const params = useParams();
  const categoryId = Number(Array.isArray(params.categoryId) 
    ? params.categoryId[0] 
    : params.categoryId);
  
  console.log("Category Id: ", categoryId);
  
  const router = useRouter();

  const handlePracticeClick = () => {
    router.push(`/learn/${categoryId}/practice`); // New behavior: navigate!
  };

  let flashcards = SKELETAL_FLASHCARDS; // default
  let title = "Skeletal System Flashcards";

  if (categoryId === 2) {
    flashcards = MUSCULAR_FLASHCARDS;
    title = "Muscular System Flashcards";
  } else if (categoryId === 3) {
    flashcards = CIRCULATORY_FLASHCARDS;
    title = "Circulatory System Flashcards";
  } else if (categoryId === 4) {
    flashcards = DIGESTIVE_FLASHCARDS;
    title = "Digestive System Flashcards";
  } else if (categoryId === 5) {
    flashcards = RESPIRATORY_FLASHCARDS;
    title = "Respiratory System Flashcards";
  } else if (categoryId === 6) {
    flashcards = NERVOUS_FLASHCARDS;
    title = "Nervous System Flashcards";
  }

  const handleGoBack = () => {
    router.push(`/courses`);
  };


  if (categoryId > 6) {
    // If user navigates to /learn/2 etc, show a simple message or 404 later
    return <div>
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Courses
      </Button>
      <div className="p-8 text-center text-3xl font-bold">Category not ready yet!</div>
    </div>
    ;
  }

 
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Courses
      </Button>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flashcards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg shadow-lg p-6 w-64 h-48 flex flex-col justify-center items-center bg-white hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg font-semibold">{card.term}</p>
            <p className="text-gray-500 mt-2 text-center">{card.definition}</p>
          </div>
        ))}
      </div>
      <Button onClick={handlePracticeClick} className="mt-8 px-8 py-4 text-lg font-semibold">
          Practice Flashcards
      </Button>
    </div>
  );
};

export default LearnPage;
