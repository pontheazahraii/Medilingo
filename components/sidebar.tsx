import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";
import { LogoutButton } from "./logout-button";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      
      <Link href="/courses">
        <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />

          <h1 className="text-2xl font-extrabold tracking-wide text-blue-500">
            Medilingo
          </h1>
        </div>
      </Link>

      

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Courses" href="/courses" iconSrc="/learn.svg" />
        <SidebarItem label="Healthcare Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem label="Anatomy" href="/courses?category=anatomy" iconSrc="/anatomy-icon.svg" />
        <SidebarItem label="Pharmacology" href="/courses?category=pharmacology" iconSrc="/pharma-icon.svg" />
        <SidebarItem
          label="Progress"
          href="/progress"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="Medical Quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="Resource Shop" href="/shop" iconSrc="/shop.svg" />
      </div>

      <div className="mb-2 mt-auto flex flex-col gap-y-2 border-t pt-2">
        <LogoutButton />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
