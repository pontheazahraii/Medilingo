"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { fetchTerminology, TerminologyItem } from "@/lib/api";
import { MEDICAL_CATEGORIES } from "@/constants/medical-content";
import { RefreshCw } from "lucide-react";

const PracticePage = () => {
  // Use the useParams hook instead of relying on the params prop
  const params = useParams();
  const categoryId = Number(Array.isArray(params.categoryId) 
    ? params.categoryId[0] 
    : params.categoryId);
    
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<TerminologyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find the category title for display purposes
  const categoryTitle = MEDICAL_CATEGORIES.find(
    (category) => category.id === categoryId
  )?.title || "Flashcards";

  const loadFlashcards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Map category IDs to system_ids for the API
      // Assuming the system_id in the API corresponds to the categoryId
      const data = await fetchTerminology({ system_id: categoryId });
      
      if (data.length === 0) {
        setError("No flashcards found for this category");
      } else {
        setFlashcards(data);
      }
    } catch (err: any) {
      console.error("Error loading flashcards:", err);
      setError(`Failed to load flashcards: ${err?.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFlashcards();
  }, [categoryId]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Button onClick={handleGoBack} className="mb-6 self-start">
          ← Back
        </Button>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-semibold mb-4">Loading flashcards...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Button onClick={handleGoBack} className="mb-6 self-start">
          ← Back
        </Button>
        <div className="text-2xl font-semibold text-red-500 mb-6">
          {error || "No flashcards available for this category"}
        </div>
        <Button onClick={loadFlashcards} variant="secondary">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Flashcards
      </Button>

      <h1 className="text-3xl font-bold mb-6">{categoryTitle}</h1>

      {/* Progress indicator */}
      <div className="mb-4 text-gray-600">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      {/* Flashcard */}
      <div
        onClick={handleFlip}
        className="relative flex items-center justify-center w-[900px] h-[500px] mb-8 cursor-pointer border rounded-xl shadow-2xl bg-white hover:scale-105 transition-transform duration-300"
      >
        <p className="text-4xl font-semibold text-center p-4">
          {flipped ? currentFlashcard.definition : currentFlashcard.term}
        </p>
        <div className="absolute bottom-4 text-sm text-gray-500">
          Click to see {flipped ? "term" : "definition"}
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
