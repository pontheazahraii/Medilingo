"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { use } from "react";
import { fetchTerminology } from "@/api/api";
import { useSessionProgress } from "@/app/contexts/SessionProgressContext";
import { toast } from "sonner";
import { Volume2, Star } from "lucide-react";


interface PracticePageProps {
  params: {
    categoryId: string;
  };
}

const PracticePage = ({ params }: PracticePageProps) => {
  const numericCategoryId = use(params).categoryId;
  const router = useRouter();

  // State for flashcards, loading state, and error handling
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addReviewed, setTotalCardsForCourse, toggleStarCard, isCardStarred } = useSessionProgress();

  // Fetch the flashcards from the API based on the categoryId
  useEffect(() => {
    async function loadFlashcards() {
      try {
        const data = await fetchTerminology(numericCategoryId);
        setFlashcards(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadFlashcards();
  }, [numericCategoryId]);

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
    const newCat = parseInt(numericCategoryId) + 1
    router.push(`/learn/${newCat}`);
  };

  const handleToggleStar = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any other handlers
    toggleStarCard(numericCategoryId, cardId);

    if (isCardStarred(numericCategoryId, cardId)) {
      toast.info("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }
  };

  // Text-to-Speech Functionality
  const speakText = useCallback((text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    const textToSpeak = flipped ? flashcards[currentIndex].definition : flashcards[currentIndex].term;
    speakText(textToSpeak);
  };

  const currentFlashcard = flashcards[currentIndex];

  if (loading) {
    return <div className="p-8 text-center text-xl font-bold">Loading flashcards {numericCategoryId}...</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-center text-3xl font-bold">
        Error loading flashcards. {numericCategoryId}
      </div>
    );
  }

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

      {/* Speak Button */}
      <Button 
                onClick={handleSpeak}
                variant="ghost" 
                size="sm"
                className="mt-2"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>

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
