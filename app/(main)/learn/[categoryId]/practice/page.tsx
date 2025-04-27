"use client";

import { useState, useCallback, useEffect } from "react";
import { SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS,
 } from "@/constants/medical-content";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Volume2 } from "lucide-react";
import { FlashcardMode } from "@/app/learning-modules/flashcard";
import { useSessionProgress } from "@/app/contexts/SessionProgressContext";

interface PracticePageProps {
  params: {
    categoryId: string;
  };
}

const PracticePage = ({ params }: PracticePageProps) => {
  const categoryId = Number(params.categoryId);
  const router = useRouter();
  const { setTotalCardsForCourse } = useSessionProgress();

  // For now, just use skeletal flashcards
  let flashcards = SKELETAL_FLASHCARDS;
  if (categoryId === 2) {
    flashcards = MUSCULAR_FLASHCARDS;
  } else if (categoryId === 3) {
    flashcards = CIRCULATORY_FLASHCARDS;
  } else if (categoryId === 4) {
    flashcards = DIGESTIVE_FLASHCARDS;
  } else if (categoryId === 5) {
    flashcards = RESPIRATORY_FLASHCARDS;
  } else if (categoryId === 6) {
    flashcards = NERVOUS_FLASHCARDS;
  }
  
  // Set total cards when component mounts
  useEffect(() => {
    setTotalCardsForCourse(categoryId, flashcards.length);
  }, [categoryId, flashcards.length, setTotalCardsForCourse]);

  const handleGoBack = () => {
    router.push(`/learn/${categoryId}`);
  };
  
  const handleComplete = () => {
    router.push(`/learn/${categoryId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Flashcards
      </Button>

      <h1 className="text-3xl font-bold mb-6">Practice Flashcards</h1>

      <FlashcardMode 
        flashcards={flashcards} 
        onComplete={handleComplete}
        courseId={categoryId}
      />
    </div>
  );
};

export default PracticePage;
