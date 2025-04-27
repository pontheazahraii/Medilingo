"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, BookOpen, Users, Award, BookMarked } from "lucide-react";

import { Button } from "@/components/ui/button";

const GetStartedPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/Pete_Alone_Logo.png" alt="Medilingo Mascot" width={40} height={40} />
            <h1 className="text-2xl font-bold ml-2">Medilingo</h1>
          </div>
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get Started with Medilingo for Healthcare</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Your journey to mastering medical terminology begins here. Follow these steps to get the most out of Medilingo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-md p-8 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">Step 1: Create Your Account</h2>
          </div>
          <p className="text-neutral-600 mb-6">
            Sign up for a free Medilingo account to track your progress, earn achievements, and access all healthcare terminology modules.
          </p>
          <Link href="/sign-up">
            <Button className="w-full">
              Create Account <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookMarked className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">Step 2: Choose Your Specialty</h2>
          </div>
          <p className="text-neutral-600 mb-6">
            Select from specialized medical topics including anatomy, pharmacology, pathology, and more based on your learning needs.
          </p>
          <Link href="/courses">
            <Button className="w-full">
              Browse Medical Topics <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">Step 3: Practice Daily</h2>
          </div>
          <p className="text-neutral-600 mb-6">
            Use our interactive flashcards, matching games, and quizzes to reinforce your knowledge of medical terminology.
          </p>
          <Link href="/learn">
            <Button className="w-full">
              Start Learning <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold ml-4">Step 4: Track Progress</h2>
          </div>
          <p className="text-neutral-600 mb-6">
            Monitor your learning achievements, compete on leaderboards, and unlock healthcare terminology certificates.
          </p>
          <Link href="/leaderboard">
            <Button className="w-full">
              View Achievements <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help Getting Started?</h2>
        <p className="text-lg mb-6">
          Our team is here to help you with any questions about healthcare terminology learning.
        </p>
        <Button variant="secondary">
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default GetStartedPage; 