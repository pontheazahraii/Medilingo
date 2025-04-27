"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchTerminology, TerminologyItem } from "@/lib/api";

type FlashcardModeProps = {
  systemId?: number;
  onComplete: () => void;
};

export const FlashcardMode = ({ systemId, onComplete }: FlashcardModeProps) => {
  const [flashcards, setFlashcards] = useState<TerminologyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [reviewCards, setReviewCards] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadFlashcards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // If systemId is provided, filter by it, otherwise get all flashcards
      const params = systemId ? { system_id: systemId } : {};
      const data = await fetchTerminology(params);
      
      if (data.length === 0) {
        setError("No flashcards found");
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
  }, [systemId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <div className="text-xl mb-4">Loading flashcards...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || flashcards.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <div className="text-xl text-red-500 mb-4">
          {error || "No flashcards available"}
        </div>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/learn")} variant="primaryOutline">
            Return to Learn
          </Button>
          <Button onClick={loadFlashcards} variant="primary">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const cardsRemaining = flashcards.length - currentIndex;

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of deck
      handleComplete();
    }
  };

  const handlePrevious = () => {
    setFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKnown = () => {
    setKnownCards([...knownCards, currentCard.id]);
    toast.success("Added to known terms");
    handleNext();
  };

  const handleReview = () => {
    setReviewCards([...reviewCards, currentCard.id]);
    toast.info("Added to review list");
    handleNext();
  };

  const handleComplete = () => {
    toast.success(`Session complete! You mastered ${knownCards.length} terms`);
    onComplete();
  };

  return (
    <div className="flex h-full flex-col items-center justify-between p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/learn")} variant="ghost" size="sm">
            <X className="h-4 w-4 mr-2" />
            Exit
          </Button>
          <div className="text-sm font-medium">
            {currentIndex + 1} of {flashcards.length} • {cardsRemaining} remaining
          </div>
        </div>

        <div 
          className="relative w-full cursor-pointer"
          onClick={handleFlip}
        >
          <Card className={`w-full h-64 p-6 flex items-center justify-center transition-all duration-500 ${flipped ? "bg-blue-50" : "bg-white"}`}>
            <div className="text-center">
              <div className="text-xs text-neutral-500 mb-2">
                System ID: {currentCard.system_id}
                {currentCard.system_name && ` • ${currentCard.system_name}`}
              </div>
              <div className="text-xl font-bold">
                {flipped ? currentCard.definition : currentCard.term}
              </div>
              <div className="mt-4 text-sm text-blue-500">
                {flipped ? "Click to see term" : "Click to see definition"}
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="primaryOutline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} variant="primaryOutline">
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={handleReview} variant="danger" className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Need to Review
          </Button>
          <Button onClick={handleKnown} variant="secondary" className="flex-1">
            <Check className="h-4 w-4 mr-2" />
            I Know This
          </Button>
        </div>
      </div>
    </div>
  );
}; 