import { redirect } from "next/navigation";
import { MEDICAL_CATEGORIES } from "@/constants/medical-content"; // Make sure you import this!
import Link from "next/link";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

import { Header } from "./header";
import { Subcategory } from "./unit";

const MedicalLearningPage = async () => {
  const userProgressData = getUserProgress();
  const categoryProgressData = getCourseProgress();
  const modulePercentageData = getLessonPercentage();
  const subcategoriesData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    subcategories,
    categoryProgress,
    modulePercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    subcategoriesData,
    categoryProgressData,
    modulePercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCategory)
    redirect("/courses");

  const safeSubcategories = subcategories || [];
  
  const safeCategoryProgress = categoryProgress || {
    activeModule: null,
    activeModuleId: null
  };

  const isPro = !!userSubscription?.isActive;
  let streak_count = 2
  const quotesOfTheDay = [
    "Studying anatomy now saves you from confusing a spleen for a kidney later. You're welcome.",
    "Medical terms aren't just long to sound smart. (Okay, maybe a little.)",
    "Every flashcard you skip cries a little inside. Learn responsibly.",
    "Remember: it's not 'just a bone' until you break one.",
    "One small step for your brain, one giant leap for passing your exams.",
    "Learning today means flexing tomorrow — at the hospital, not the gym.",
    "Doctors aren't born knowing Latin. They just cried through it like you are now.",
    "You can't spell 'circulatory system' without 'cry.' Coincidence? I think not.",
    "Finish one more lesson, and your neurons will personally high-five you.",
    "Skipping your flashcards? Bold move. Let's hope you never need to locate your pancreas."
  ];
  const randomQuote = quotesOfTheDay[Math.floor(Math.random() * quotesOfTheDay.length)];

  

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-100 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
          {/* Left side: Logo + App name */}
          <div className="flex items-center gap-x-3">
            <img src="/Pete_Alone_Logo.png" alt="Medilingo Mascot" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
              Medilingo
            </h1>
          </div>

          {/* Right side: Link to GitHub */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link 
              href="https://github.com/pontheazahraii/Medilingo/tree/main" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500 font-medium text-sm"
            >
              Helping You Keep Those Medical Terms In The Noggin'
            </Link>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="mx-auto mt-6 w-[90%] bg-blue-500 text-white py-3 px-6 text-center font-bold text-3xl rounded-2xl shadow-md">
        Welcome back, user123 !
      </div>
      
      {/* Streak Banner */}
      <div className="mx-auto mt-4 w-[85%] bg-yellow-400 text-black py-2 px-4 text-center font-semibold text-md rounded-lg shadow">
        🔥You're on a <span className="font-bold">{streak_count} day</span> streak!🔥
      </div>


      {/* Quote of the Day Section */}
      <div className="mt-8 px-8">
        <div className="rounded-lg bg-blue-100 p-6 shadow-md">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Quote of the Day 🌟</h2>
          <p className="text-lg italic text-blue-800">
            {randomQuote}
          </p>
          <p className="mt-2 text-sm text-blue-600">— Pete</p>
        </div>
      </div>

      {/* Active Courses Section */}
      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold mb-6">Your Active Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MEDICAL_CATEGORIES.slice(0, 6).map((category, index) => {
          const dummyProgress = [65, 85, 12, 8, 25, 45]; // Dummy progress values for now
          
          return (
            <Link 
              key={category.id}
              href={`/learn/${category.id}`} 
              className="hover:scale-105 transition-transform duration-300"
            >
              <div className="border rounded-lg p-4 shadow-md bg-white cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full" 
                    style={{ width: `${dummyProgress[index]}%` }}
                  />
                </div>

                {/* Progress Text */}
                <p className="text-sm text-gray-600 mt-2">{dummyProgress[index]}% complete</p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>

      {/* Recommended Courses Section */}
    <div className="mt-12 px-8">
      <h2 className="text-2xl font-bold mb-6">Recommended Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MEDICAL_CATEGORIES.slice(-3).map((category) => (
          <div 
            key={category.id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center text-center"
          >
            <img 
              src={category.imageSrc}
              alt={category.title}
              className="h-24 w-24 object-contain mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
            <Link href={`/learn/${category.id}`}>
              <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                Start Learning
              </button>
            </Link>
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
          <Link href="https://github.com/pontheazahraii/Medilingo/tree/main" className="text-gray-600 hover:text-blue-500 text-sm">
            Check Out Our Github Repo!
          </Link>
        </div>
      </div>
    </footer>
  </div>
  );
};

export default MedicalLearningPage;
