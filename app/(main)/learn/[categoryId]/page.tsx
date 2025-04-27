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

 
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-full flex justify-between items-center mb-6">
        <Button onClick={handleGoBack} className="self-start">
          ← Back to Courses
        </Button>
        <Button onClick={handlePracticeClick} className="px-8 py-4 text-lg font-semibold">
          Practice Flashcards
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Course {numericCategoryId} - XXXX</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flashcards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg shadow-lg p-6 w-64 h-48 flex flex-col justify-center items-center bg-white hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg font-semibold">{card.term}</p>
            <p className="text-gray-500 mt-2 text-center line-clamp-2 overflow-hidden">{card.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
