"use client";

import { useState } from "react";
import { SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS,
 } from "@/constants/medical-content";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PracticePageProps {
  params: {
    categoryId: string;
  };
}

const PracticePage = ({ params }: PracticePageProps) => {
  const categoryId = Number(params.categoryId);
  const router = useRouter()

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
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFlipped(false); // Reset flip when moving to next
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setFlipped(false); // Reset flip when moving to previous
    }
  };

  const handleGoBack = () => {
    router.push(`/learn/${categoryId}`);
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Flashcards
      </Button>

      <h1 className="text-3xl font-bold mb-6">Practice Flashcards</h1>

      {/* Flashcard */}
      <div
        onClick={handleFlip}
        className="relative flex items-center justify-center w-[90%] max-w-[900px] h-[50vh] max-h-[500px] mb-8 cursor-pointer border rounded-xl shadow-2xl bg-white hover:scale-105 transition-transform duration-300"
      >

        <p className="text-4xl font-semibold text-center p-4">
          {flipped ? currentFlashcard.definition : currentFlashcard.term}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PracticePage;
