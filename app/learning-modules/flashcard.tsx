"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X, Check, Volume2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Flashcard = {
  id: number;
  term: string;
  definition: string;
  category: string;
  subcategory: string;
};

type FlashcardModeProps = {
  flashcards: Flashcard[];
  onComplete: () => void;
};

export const FlashcardMode = ({ flashcards, onComplete }: FlashcardModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [reviewCards, setReviewCards] = useState<number[]>([]);
  const router = useRouter();

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

  // Text to speech function
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

  // Handle speak button click
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    const textToSpeak = flipped ? currentCard.definition : currentCard.term;
    speakText(textToSpeak);
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
                {currentCard.category} • {currentCard.subcategory}
              </div>
              <div className="text-xl font-bold">
                {flipped ? currentCard.definition : currentCard.term}
              </div>
              <div className="mt-4 text-sm text-blue-500">
                {flipped ? "Click to see term" : "Click to see definition"}
              </div>
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