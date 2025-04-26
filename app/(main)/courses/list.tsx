"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { upsertUserProgress } from "@/actions/user-progress";
import { medicalCategories, userProgress } from "@/db/schema";

import { Card } from "./card";

type ListProps = {
  categories: (typeof medicalCategories.$inferSelect)[];
  activeCategoryId?: typeof userProgress.$inferSelect.activeCategoryId;
};

export const List = ({ categories, activeCategoryId }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCategoryId) return router.push("/learn");

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {categories.map((category) => (
        <Card
          key={category.id}
          id={category.id}
          title={category.title}
          imageSrc={category.imageSrc}
          description={category.description}
          onClick={onClick}
          disabled={pending}
          isActive={category.id === activeCategoryId}
        />
      ))}
    </div>
  );
};
