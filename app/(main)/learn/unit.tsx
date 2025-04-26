import { learningModules, subcategories } from "@/db/schema";

import { ModuleButton } from "./lesson-button";
import { SubcategoryBanner } from "./unit-banner";

type SubcategoryProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  modules: (typeof learningModules.$inferSelect & {
    completed: boolean;
  })[];
  activeModule:
    | (typeof learningModules.$inferSelect & {
        subcategory: typeof subcategories.$inferSelect;
      })
    | undefined;
  activeModulePercentage: number;
};

export const Subcategory = ({
  title,
  description,
  modules,
  activeModule,
  activeModulePercentage,
}: SubcategoryProps) => {
  return (
    <>
      <SubcategoryBanner title={title} description={description} />

      <div className="relative flex flex-col items-center">
        {modules.map((module, i) => {
          const isCurrent = module.id === activeModule?.id;
          const isLocked = !module.completed && !isCurrent;

          return (
            <ModuleButton
              key={module.id}
              id={module.id}
              index={i}
              totalCount={modules.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeModulePercentage}
              moduleType={module.moduleType}
            />
          );
        })}
      </div>
    </>
  );
};
