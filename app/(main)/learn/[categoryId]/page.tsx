"use client";

import { MEDICAL_CATEGORIES } from "@/constants/medical-content";
import { SKELETAL_FLASHCARDS } from "@/constants/medical-content";
import { Button } from "@/components/ui/button"; 
import { useRouter } from "next/navigation";

interface LearnPageProps {
  params: {
    categoryId: string;
  };
}



const LearnPage = (props: LearnPageProps) => {
  const categoryId = Number(props.params.categoryId);
  console.log("Category Id: ", categoryId)

  
  const router = useRouter();                    // Inside your component (LearnPage)

  const handlePracticeClick = () => {
    router.push(`/learn/${categoryId}/practice`); // New behavior: navigate!
  };


  if (categoryId !== 1) {
    // If user navigates to /learn/2 etc, show a simple message or 404 later
    return <div className="p-8 text-center text-xl font-bold">Category not ready yet!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Skeletal System Flashcards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {SKELETAL_FLASHCARDS.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg shadow-lg p-6 w-64 h-48 flex flex-col justify-center items-center bg-white hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg font-semibold">{card.term}</p>
            <p className="text-gray-500 mt-2 text-center">{card.definition}</p>
          </div>
        ))}
      </div>
      <Button onClick={handlePracticeClick} className="mt-8 px-8 py-4 text-lg font-semibold">
          Practice Flashcards
      </Button>
    </div>
  );
};

export default LearnPage;
