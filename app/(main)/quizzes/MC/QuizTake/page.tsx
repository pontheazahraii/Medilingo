"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { MEDICAL_QUIZZES } from "@/constants/medical-content"; // Quiz data import

const MCQuestionCourse = () => {
    const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null); // Store quiz data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch the quiz (Here we're using a static quiz for simplicity)
    const selectedQuiz = MEDICAL_QUIZZES.find((quiz) => quiz.type === "mc");
    setQuiz(selectedQuiz);
  }, []);

  if (!quiz) return <div>Loading quiz...</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelection = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Once all questions are answered, display the final score
      alert(`Quiz Complete! Your final score is: ${score}`);
    }
  };

  const speakText = (text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    speakText(currentQuestion.question);
  };
  const handleGoBack = () => {
    // Navigate back to the quizzes home page
    router.push("/quizzes");
  };
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">MC Questions</h1>
        {/* Back to Quiz Home Button */}
      <Button onClick={handleGoBack} className="mb-4">
        Exit Quiz
      </Button>

      {/* Displaying the current question */}
      <div className="w-full max-w-md mb-6 p-8 border rounded-xl">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.options.map((option: string, index: number) => (
            <li
              key={index}
              onClick={() => handleAnswerSelection(option)}
              className={`cursor-pointer ${selectedOption === option ? "bg-blue-100" : ""}`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Listen Button */}
      <Button onClick={handleSpeak} className="mb-4">
        <Volume2 className="h-4 w-4 mr-2" />
        Listen
      </Button>

      {/* Next Question Button */}
      <Button onClick={handleNextQuestion} disabled={!selectedOption}>
        Next
      </Button>

      {/* Display Score */}
      {currentQuestionIndex === quiz.questions.length - 1 && (
        <div className="mt-6 text-xl">
          Your final score: {score} out of {quiz.questions.length}
        </div>
      )}
    </div>
  );
};

export default MCQuestionCourse;
