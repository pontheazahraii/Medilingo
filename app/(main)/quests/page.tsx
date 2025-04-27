"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ComingSoonPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/courses");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar with Back Button */}
      <div className="p-4">
        <Button onClick={handleGoBack}>
          ← Back to Courses
        </Button>
      </div>

      {/* Centered main content */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          🚧 Coming Soon 🚧
        </h1>
        <p className="text-lg text-center text-gray-600">
          This content is under construction. Check back soon!
        </p>
      </div>
    </div>
  );
};

export default ComingSoonPage;
