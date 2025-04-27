"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MEDICAL_QUIZZES } from "@/constants/medical-content"; // Import the quizzes data

const MCQuestionCourse = () => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    // For now, just set the quiz data from MEDICAL_QUIZZES
    const selectedQuiz = MEDICAL_QUIZZES.find((quiz) => quiz.id === 2); // Simulating loading the quiz
    setQuiz(selectedQuiz);
  }, []);

  const handleStartQuiz = () => {
    // Placeholder: Navigate to the actual quiz page when ready
    router.push("/quizzes/FIB/QuizTake"); // Navigate to an example quiz route
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="flex flex-col items-left justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">MC Questions</h1>
      <p className="text-lg text-gray-700 mb-6">Test your skills with these questions:</p>

      {/* Loop through questions and display them as cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quiz.questions.map((question: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-6 shadow-md bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <h3 className="font-semibold text-lg">{question.question}</h3>
          </div>
        ))}
      </div>

      {/* Button to start quiz (this could be linked to the quiz logic later) */}
      <Button
        onClick={handleStartQuiz}
        className="mt-6 rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-500"
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default MCQuestionCourse;
