import { getCourses, getUserProgress } from "@/db/queries";
import { MEDICAL_CATEGORIES } from "@/constants/medical-content";
import Link from "next/link";
import { List } from "./list";

const MedicalCategoriesPage = async () => {
  // const categoriesData = getCourses();
  const userProgressData = getUserProgress();

  // const [categories, userProgress] = await Promise.all([
  //   categoriesData,
  //   userProgressData,
  // ]);
  const categories = MEDICAL_CATEGORIES;

  const userProgress = await userProgressData;

  return (
    <div className="mx-auto h-full max-w-[1550px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Flashcard Sets</h1>
      <p className="text-md text-neutral-600 mb-4">Select a medical category to start mastering terminology used by healthcare professionals</p>

      <List categories={categories} activeCategoryId={userProgress?.activeCategoryId} />
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

export default MedicalCategoriesPage;
