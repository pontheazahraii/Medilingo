"use client";

import { useSessionProgress } from "../contexts/SessionProgressContext";
import { useEffect, useState } from "react";

interface SessionProgressDisplayProps {
  courseId: number;
}

export const SessionProgressDisplay = ({ courseId }: SessionProgressDisplayProps) => {
  const { reviewed, totalCards } = useSessionProgress();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevReviewed, setPrevReviewed] = useState(0);
  
  // Number of cards reviewed for this course
  const cardsReviewed = reviewed[courseId] || 0;
  // Total cards available for this course
  const total = totalCards[courseId] || 0;
  
  // Calculate percentage (avoid division by zero)
  const percentage = total > 0 ? Math.round((cardsReviewed / total) * 100) : 0;
  
  // Animate the progress bar when cards are reviewed
  useEffect(() => {
    if (cardsReviewed > prevReviewed) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      setPrevReviewed(cardsReviewed);
      return () => clearTimeout(timer);
    }
  }, [cardsReviewed, prevReviewed]);
  
  // If no cards have been reviewed and none are available yet, show "Start Studying" message
  if (cardsReviewed === 0 && total === 0) {
    return (
      <div className="mt-3 text-sm text-blue-500 font-medium">Start Studying!</div>
    );
  }
  
  return (
    <div></div>
  );
}; 