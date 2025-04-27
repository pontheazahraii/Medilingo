"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SessionProgressContextType = {
  reviewed: Record<number, number>; // courseId -> number of cards reviewed
  totalCards: Record<number, number>; // courseId -> total cards available
  starredCards: Record<number, number[]>; // courseId -> array of starred card IDs
  addReviewed: (courseId: number) => void;
  setTotalCardsForCourse: (courseId: number, total: number) => void;
  resetProgress: (courseId?: number) => void;
  toggleStarCard: (courseId: number, cardId: number) => void;
  isCardStarred: (courseId: number, cardId: number) => boolean;
};

const SessionProgressContext = createContext<SessionProgressContextType | undefined>(undefined);

export const SessionProgressProvider = ({ children }: { children: ReactNode }) => {
  const [reviewed, setReviewed] = useState<Record<number, number>>({});
  const [totalCards, setTotalCards] = useState<Record<number, number>>({});
  const [starredCards, setStarredCards] = useState<Record<number, number[]>>({});

  // Add a card review to the session
  const addReviewed = (courseId: number) => {
    setReviewed((prev) => ({
      ...prev,
      [courseId]: (prev[courseId] || 0) + 1,
    }));
  };

  // Set total cards for a course
  const setTotalCardsForCourse = (courseId: number, total: number) => {
    setTotalCards((prev) => ({
      ...prev,
      [courseId]: total,
    }));
  };

  // Reset progress for a specific course or all courses
  const resetProgress = (courseId?: number) => {
    if (courseId) {
      setReviewed((prev) => ({
        ...prev,
        [courseId]: 0,
      }));
    } else {
      setReviewed({});
    }
  };

  // Toggle star status for a card
  const toggleStarCard = (courseId: number, cardId: number) => {
    setStarredCards((prev) => {
      const courseStars = prev[courseId] || [];
      const isStarred = courseStars.includes(cardId);
      
      if (isStarred) {
        // Remove star
        return {
          ...prev,
          [courseId]: courseStars.filter(id => id !== cardId)
        };
      } else {
        // Add star
        return {
          ...prev,
          [courseId]: [...courseStars, cardId]
        };
      }
    });
  };

  // Check if a card is starred
  const isCardStarred = (courseId: number, cardId: number): boolean => {
    const courseStars = starredCards[courseId] || [];
    return courseStars.includes(cardId);
  };

  // Initialize session data
  useEffect(() => {
    // Load data from sessionStorage
    const storedReviewed = sessionStorage.getItem("flashcard_reviewed");
    const storedTotalCards = sessionStorage.getItem("flashcard_totalCards");
    const storedStarredCards = sessionStorage.getItem("flashcard_starred");
    
    // Only restore data if it exists
    if (storedReviewed) setReviewed(JSON.parse(storedReviewed));
    if (storedTotalCards) setTotalCards(JSON.parse(storedTotalCards));
    if (storedStarredCards) setStarredCards(JSON.parse(storedStarredCards));
  }, []);

  // Save data to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem("flashcard_reviewed", JSON.stringify(reviewed));
    sessionStorage.setItem("flashcard_totalCards", JSON.stringify(totalCards));
    sessionStorage.setItem("flashcard_starred", JSON.stringify(starredCards));
  }, [reviewed, totalCards, starredCards]);

  return (
    <SessionProgressContext.Provider 
      value={{ 
        reviewed, 
        totalCards,
        starredCards,
        addReviewed, 
        setTotalCardsForCourse, 
        resetProgress,
        toggleStarCard,
        isCardStarred
      }}
    >
      {children}
    </SessionProgressContext.Provider>
  );
};

export const useSessionProgress = () => {
  const context = useContext(SessionProgressContext);
  if (!context) {
    throw new Error("useSessionProgress must be used within SessionProgressProvider");
  }
  return context;
}; 