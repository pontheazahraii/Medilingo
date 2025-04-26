"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
      <nav className="flex justify-between items-center py-6">
        <div className="flex items-center">
          <img src="/mascot.svg" alt="Medilingo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold ml-2">Medilingo</h1>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/get-started">
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="space-y-6 flex-1">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-800 dark:text-neutral-200">
              Master medical terminology for healthcare professionals
            </h1>
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-600 dark:text-neutral-400">
              Interactive learning platform designed for medical students, nurses, and healthcare practitioners
            </h3>
            <div className="flex gap-x-4">
              <Link href="/get-started">
                <Button>
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2 fill-white"/>
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="secondary">
                  Explore Medical Systems
                </Button>
              </Link>
            </div>
          </div>
          <div className="max-w-[500px] flex-1">
            <img
              src="/hero.svg"
              alt="Medilingo Hero"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <footer className="py-6 text-center text-neutral-600 dark:text-neutral-400">
        <p>© 2023 Medilingo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MarketingPage;
