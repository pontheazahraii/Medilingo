import { redirect } from "next/navigation";

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

  return (
    <div className="flex flex-col">
      {/* Welcome Banner */}
      <div className="mx-auto mt-6 w-[90%] bg-blue-500 text-white py-3 px-6 text-center font-bold text-3xl rounded-2xl shadow-md">
        Welcome back!
      </div>
      
      {/* Streak Banner */}
      <div className="mx-auto mt-4 w-[85%] bg-yellow-400 text-black py-2 px-4 text-center font-semibold text-md rounded-lg shadow">
        🔥You're on a <span className="font-bold">{streak_count} day</span> streak!🔥
      </div>

      {/* Recommended Courses Section */}
      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold mb-6">Your Active Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Dummy example 1 active course */}
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="font-semibold text-lg mb-2">Skeletal System</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">65% complete</p>
        </div>
         {/* Dummy example 2 active course */}
        <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="font-semibold text-lg mb-2">Muscular System</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "85%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">85% complete</p>
        </div>
        {/* Dummy example 3 active course */}
        <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="font-semibold text-lg mb-2">Muscular System</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "12%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">12% complete</p>
        </div>
          {/* Add more active courses here */}
        </div>
      </div>

      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold mb-6">New Courses For You</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Dummy example 1 rec course */}
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="font-semibold text-lg mb-2">Skeletal System</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">65% complete</p>
        </div>
         {/* Dummy example 2 rec course */}
        <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="font-semibold text-lg mb-2">Muscular System</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "85%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">85% complete</p>
        </div>
        {/* Dummy example 3 rec course */}
        <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="font-semibold text-lg mb-2">Muscular System</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "12%" }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">12% complete</p>
        </div>
          {/* Add more rec courses here */}
        </div>
      </div>


    {/* Main Content (empty for now) */}
    <div className="p-8">
      {/* You can continue building your page content here */}
    </div>
  </div>
  );
};

export default MedicalLearningPage;
