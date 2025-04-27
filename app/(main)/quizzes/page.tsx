"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MEDICAL_QUIZZES } from "@/constants/medical-content"; // Import the quizzes data
import { SessionProgressDisplay } from "@/app/components/SessionProgressDisplay";
import Link from "next/link";

const QuizzesPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<any[]>([]);  // State to hold quiz data

  useEffect(() => {
    // Simulating fetching the quizzes data from the `MEDICAL_QUIZZES` list
    const quizzesData = MEDICAL_QUIZZES.filter(quiz => quiz.id);  // Assuming `quiz` is a property indicating quizzes
    setQuizzes(quizzesData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="mx-auto h-full max-w-[1550px] px-3">
      {/* Quiz Cards */}
      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold mb-6">Your Available Quizzes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="border rounded-lg p-4 shadow-md bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>

              {/* Quiz Progress Bar
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${quiz.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{quiz.progress}% complete</p> */}

              <SessionProgressDisplay courseId={quiz.id} />

              {/* Conditional button for MC or FIB quiz */}
              {quiz.type === "mc" ? (
                <Link href={`/quizzes/MC`}>
                  <Button className="mt-4 rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-500">
                    Start
                  </Button>
                </Link>
              ) : quiz.type === "fib" ? (
                <Link href={`/quizzes/FIB`}>
                  <Button className="mt-4 rounded-full px-6 py-3 bg-green-600 text-white hover:bg-green-500">
                    Start 
                  </Button>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-16 bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
          <p className="text-gray-600 text-sm text-center sm:text-left">
            © 2025 Medilingo. Built with ❤️ at PantherHacks.
          </p>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="https://github.com/pontheazahraii/Medilingo/tree/main"
              className="text-gray-600 hover:text-blue-500 text-sm"
            >
              Check Out Our Github Repo!
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizzesPage;
