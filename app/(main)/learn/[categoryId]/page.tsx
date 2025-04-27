"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { fetchTerminology } from "@/api/api";
import { Volume2, Star } from "lucide-react";
import { SessionProgressDisplay } from "@/app/components/SessionProgressDisplay";
import { useSessionProgress } from "@/app/contexts/SessionProgressContext";
import { toast } from "sonner";
import {use} from "react";

interface LearnPageProps {
  params: {
    categoryId: string;
  };
}

const getCourseTitle = (id: number): string => {
  const categories = [
    "Skeletal System",
    "Muscular System",
    "Circulatory System",
    "Digestive System",
    "Respiratory System",
    "Nervous System",
  ];
  return categories[id] || "Medical Terminology";
};

const LearnPage = (props: LearnPageProps) => {
  const router = useRouter();
  // const numericCategoryId = Number(props.params.categoryId) - 1;
  const numericCategoryId = Number(use(props.params).categoryId - 1); // Use React.use() to unwrap params

  const { isCardStarred, toggleStarCard } = useSessionProgress();

  console.log("Category Id: ", numericCategoryId);

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handlePracticeClick = () => {
    router.push(`/learn/${numericCategoryId}/practice`); // New behavior: navigate!
  };

  const handlePracticeFavoriteClick = () => {
    router.push(`/learn/${numericCategoryId}/practiceFavorite`); // New behavior: navigate!
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

  // Text to speech functionality
  const speakText = useCallback((text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;  // Slightly slower than default
    utterance.pitch = 1;   // Normal pitch

    window.speechSynthesis.speak(utterance);
  }, []);

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation(); // Prevent any other handlers
    speakText(text);
  };

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

  useEffect(() => {
    // Redirect to MC page if categoryId is 6
    if (numericCategoryId === 6) {
      router.push(`/learn/mc`);
    }
  }, [numericCategoryId, router]);

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

  const handleGoBack = () => {
    router.push(`/courses`);
  };

  const courseTitle = getCourseTitle(numericCategoryId);

  // Filter starred cards
  const starredCards = flashcards.filter((card) => isCardStarred(numericCategoryId, card.id));
  const hasStarredCards = starredCards.length > 0;

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-7xl mx-auto">
      <div className="w-full flex justify-between items-center mb-10">
        <Button onClick={handleGoBack} className="rounded-full px-6 py-3 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm transition-all" variant="ghost">
          ← Back to Courses
        </Button>
        <div className="flex flex-col gap-4">
          <Button onClick={handlePracticeClick} className="rounded-full px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md transition-all">
            Practice Flashcards
          </Button>

          <Button onClick={handlePracticeFavoriteClick} className="rounded-full px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-medium shadow-md transition-all">
            Practice Favorites
          </Button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">{courseTitle}</h1>

      {/* Session Progress */}
      <div className="w-full max-w-md mb-8">
        <SessionProgressDisplay courseId={numericCategoryId} />
      </div>

      {/* Starred Cards Section */}
      {hasStarredCards && (
        <div className="w-full mb-10">
          <h2 className="text-xl font-bold mb-4 text-yellow-600">
            <Star className="inline-block h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
            Your Favorite Cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full px-4 mb-8">
            {starredCards.map((card) => (
              <div key={`starred-${card.id}`} className="border border-yellow-200 rounded-xl shadow-md p-8 w-full h-64 flex flex-col bg-yellow-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-2 right-2">
                  <button onClick={(e) => handleToggleStar(card.id, e)} className="p-2 hover:bg-yellow-100 rounded-full">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center mb-4">
                  <p className="text-xl font-semibold text-gray-800 text-center">{card.term}</p>
                </div>
                <div className="flex-1 flex items-start justify-center">
                  <p className="text-sm text-gray-600 text-center line-clamp-2 overflow-hidden">{card.definition}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <Button onClick={(e) => handleSpeak(e, `${card.term}. ${card.definition}`)} variant="ghost" size="sm" className="mt-2" aria-label="Listen to pronunciation">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-b border-gray-200 my-4"></div>
        </div>
      )}

      {/* All Cards */}
      <h2 className="text-xl font-bold mb-4 self-start">All Flashcards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full px-4">
        {flashcards.map((card) => (
          <div key={card.id} className="border border-gray-100 rounded-xl shadow-md p-8 w-full h-64 flex flex-col bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 relative">
            <div className="absolute top-2 right-2">
              <button onClick={(e) => handleToggleStar(card.id, e)} className="p-2 hover:bg-gray-100 rounded-full">
                <Star className={`h-5 w-5 ${isCardStarred(numericCategoryId, card.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center mb-4">
              <p className="text-xl font-semibold text-gray-800 text-center">{card.term}</p>
            </div>
            <div className="flex-1 flex items-start justify-center">
              <p className="text-sm text-gray-600 text-center line-clamp-2 overflow-hidden">{card.definition}</p>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={(e) => handleSpeak(e, `${card.term}. ${card.definition}`)} variant="ghost" size="sm" className="mt-2" aria-label="Listen to pronunciation">
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
