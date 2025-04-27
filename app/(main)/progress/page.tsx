"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ComingSoonPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/courses");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button onClick={handleGoBack} className="mb-6 self-start">
        ← Back to Courses
      </Button>

      <h1 className="text-4xl font-bold text-center mb-4">
        🚧 Coming Soon 🚧
      </h1>
      <p className="text-lg text-center text-gray-600">
        This content is under construction. Check back soon!
      </p>
    </div>
  );
};

export default ComingSoonPage;
