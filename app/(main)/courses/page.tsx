import { getCourses, getUserProgress } from "@/db/queries";
import { MEDICAL_CATEGORIES } from "@/constants/medical-content";

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
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Courses</h1>

      <List categories={categories} activeCategoryId={userProgress?.activeCategoryId} />
    </div>
  );
};

export default MedicalCategoriesPage;
