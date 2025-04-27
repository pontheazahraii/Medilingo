"use client";

import { MEDICAL_CATEGORIES } from "@/constants/medical-content";
import { SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS,
 } from "@/constants/medical-content";
import { Button } from "@/components/ui/button"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTerminology } from "@/api/api";

interface LearnPageProps {
  params: {
    categoryId: string;
  };
}

// interface Flashcard {
//   id: number; 
//   term: string;
//   definition: string;
// }

const getCourseTitle = (id: number): string => {
  const categories = [
    "Skeletal System", 
    "Muscular System", 
    "Circulatory System", 
    "Digestive System", 
    "Respiratory System", 
    "Nervous System"
  ];
  return categories[id - 1] || "Medical Terminology";
};

const LearnPage = (props: LearnPageProps) => {
  const router = useRouter();  
  const numericCategoryId = Number(props.params.categoryId);
  
  console.log("Category Id: ", numericCategoryId)

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handlePracticeClick = () => {
    router.push(`/learn/${numericCategoryId}/practice`); // New behavior: navigate!
  };

  // let flashcards = SKELETAL_FLASHCARDS; // default
  // let title = "Skeletal System Flashcards";

  // if (categoryId === 2) {
  //   flashcards = MUSCULAR_FLASHCARDS;
  //   title = "Muscular System Flashcards";
  // } else if (categoryId === 3) {
  //   flashcards = CIRCULATORY_FLASHCARDS;
  //   title = "Circulatory System Flashcards";
  // } else if (categoryId === 4) {
  //   flashcards = DIGESTIVE_FLASHCARDS;
  //   title = "Digestive System Flashcards";
  // } else if (categoryId === 5) {
  //   flashcards = RESPIRATORY_FLASHCARDS;
  //   title = "Respiratory System Flashcards";
  // } else if (categoryId === 6) {
  //   flashcards = NERVOUS_FLASHCARDS;
  //   title = "Nervous System Flashcards";
  // }

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

  //   if (numericCategoryId >= 1 && numericCategoryId <= 6) {
  //     loadFlashcards();
  //   } else {
  //     setLoading(false); // don't try loading if not flashcard type
  //   }
  // }, [numericCategoryId]);

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


  if (numericCategoryId > 6) {
    // If user navigates to /learn/2 etc, show a simple message or 404 later
    return <div>
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Courses
      </Button>
      <div className="p-8 text-center text-3xl font-bold">Category not ready yet!</div>
    </div>
    ;
  }

  const courseTitle = getCourseTitle(numericCategoryId);
 
  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-7xl mx-auto">
      <div className="w-full flex justify-between items-center mb-10">
        <Button 
          onClick={handleGoBack} 
          className="rounded-full px-6 py-3 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm transition-all"
          variant="ghost"
        >
          ← Back to Courses
        </Button>
        <Button 
          onClick={handlePracticeClick} 
          className="rounded-full px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md transition-all"
        >
          Practice Flashcards
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-12 text-center">Course {numericCategoryId} - {courseTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full px-4">
        {flashcards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-100 rounded-xl shadow-md p-8 w-full h-56 flex flex-col bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex-1 flex items-center justify-center mb-4">
              <p className="text-xl font-semibold text-gray-800 text-center">{card.term}</p>
            </div>
            <div className="flex-1 flex items-start justify-center">
              <p className="text-sm text-gray-600 text-center line-clamp-2 overflow-hidden">{card.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
