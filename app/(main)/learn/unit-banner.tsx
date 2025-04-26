import { Stethoscope } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type SubcategoryBannerProps = {
  title: string;
  description: string;
};

export const SubcategoryBanner = ({ title, description }: SubcategoryBannerProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-blue-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>

      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
        >
          <Stethoscope className="mr-2" />
          Study Now
        </Button>
      </Link>
    </div>
  );
};
