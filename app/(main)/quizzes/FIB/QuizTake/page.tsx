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
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null); // To track if the selected answer is correct

  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch the quiz (Here we're using a static quiz for simplicity)
    const selectedQuiz = MEDICAL_QUIZZES.find((quiz) => quiz.type === "fib");
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
    setIsAnswerCorrect(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Once all questions are answered, display the final score
      alert(`Quiz Complete! Your final score is: ${score}`);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === quiz?.questions[currentQuestionIndex].correctAnswer) {
      setIsAnswerCorrect(true);
      setScore(score + 1); // Increment score if the answer is correct
    } else {
      setIsAnswerCorrect(false);
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
      <h1 className="text-3xl font-bold mb-4">Fill In The Blank Questions</h1>
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
      {/* Check Answer Button */}
      <Button
        onClick={handleCheckAnswer}
        disabled={!selectedOption}
        className="mb-4 rounded-full px-6 py-3 bg-green-600 text-white hover:bg-green-500"
      >
        Check Answer
      </Button>

      {/* Show Feedback */}
      {isAnswerCorrect !== null && (
        <div className={`text-xl ${isAnswerCorrect ? "text-green-600" : "text-red-600"}`}>
          {isAnswerCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}




      {/* Next Question Button */}
      <Button onClick={handleNextQuestion} disabled={isAnswerCorrect === null} className="mt-4 rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-500">
        Next Question
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
