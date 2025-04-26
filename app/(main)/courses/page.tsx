import { getCourses, getUserProgress } from "@/db/queries";

import { List } from "./list";

const MedicalCategoriesPage = async () => {
  const categoriesData = getCourses();
  const userProgressData = getUserProgress();

  const [categories, userProgress] = await Promise.all([
    categoriesData,
    userProgressData,
  ]);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Medical Topics</h1>

      <List categories={categories} activeCategoryId={userProgress?.activeCategoryId} />
    </div>
  );
};

export default MedicalCategoriesPage;
