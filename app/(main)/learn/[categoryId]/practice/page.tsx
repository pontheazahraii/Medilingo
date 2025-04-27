"use client";

import { useState, useCallback } from "react";
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

  // Text to speech functionality
  const speakText = useCallback((text: string) => {
    // Stop any current speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;  // Slightly slower than default
    utterance.pitch = 1;   // Normal pitch
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    const textToSpeak = flipped ? currentFlashcard.definition : currentFlashcard.term;
    speakText(textToSpeak);
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Flashcards
      </Button>

      <h1 className="text-3xl font-bold mb-6">Practice Flashcards</h1>

      {/* Flashcard */}
      <div className="relative w-[90%] max-w-[900px] h-[50vh] max-h-[500px] mb-8 border rounded-xl shadow-2xl bg-white hover:scale-105 transition-transform duration-300">
        <div
          onClick={handleFlip}
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          <p className="text-4xl font-semibold text-center p-4">
            {flipped ? currentFlashcard.definition : currentFlashcard.term}
          </p>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <Button 
              onClick={handleSpeak} 
              variant="secondary" 
              size="sm"
              className="mx-auto mt-4"
              aria-label="Listen to pronunciation"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>
        </div>
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
