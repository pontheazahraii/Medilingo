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

  if (!categoryProgress || !userProgress || !userProgress.activeCategory)
    redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCategory={userProgress.activeCategory}
          hearts={userProgress.hearts}
          points={userProgress.points}
          level={userProgress.level}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCategory.title} />
        {subcategories.map((subcategory) => (
          <div key={subcategory.id} className="mb-10">
            <Subcategory
              id={subcategory.id}
              order={subcategory.order}
              description={subcategory.description}
              title={subcategory.title}
              modules={subcategory.modules}
              activeModule={categoryProgress.activeModule}
              activeModulePercentage={modulePercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default MedicalLearningPage;
