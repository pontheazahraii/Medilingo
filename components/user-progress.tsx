import { InfinityIcon, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { medicalCategories } from "@/db/schema";
import { MEDICAL_LEVELS } from "@/constants";

type UserProgressProps = {
  activeCategory: typeof medicalCategories.$inferSelect;
  hearts: number;
  points: number;
  level: string;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCategory,
  hearts,
  points,
  level,
  hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex w-full items-center justify-between gap-x-2">
        <Link href="/courses">
          <Button variant="ghost">
            <Image
              src={activeCategory.imageSrc}
              alt={activeCategory.title}
              className="rounded-md border"
              width={32}
              height={32}
            />
          </Button>
        </Link>

        <Link href="/shop">
          <Button variant="ghost" className="text-blue-500">
            <Image
              src="/points.svg"
              height={28}
              width={28}
              alt="Health Points"
              className="mr-2"
            />
            {points}
          </Button>
        </Link>

        <Link href="/shop">
          <Button variant="ghost" className="text-rose-500">
            <Image
              src="/heart.svg"
              height={22}
              width={22}
              alt="Hearts"
              className="mr-2"
            />
            {hasActiveSubscription ? (
              <InfinityIcon className="stroke-3 h-4 w-4" />
            ) : (
              hearts
            )}
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-x-2 rounded-md bg-blue-50 p-2">
        <Trophy className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-medium text-blue-500">
          Level: {level}
        </span>
      </div>
    </div>
  );
};
