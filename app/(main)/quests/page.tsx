"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResourcesPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/courses");
  };

  // State for controlling visibility of each system's resources
  const [isSkeletalOpen, setIsSkeletalOpen] = useState(true);  // Open by default
  const [isMuscularOpen, setIsMuscularOpen] = useState(true);  // Open by default
  const [isCirculatoryOpen, setIsCirculatoryOpen] = useState(true);  // Open by default
  const [isDigestiveOpen, setIsDigestiveOpen] = useState(true); // Open by default
  const [isRespiratoryOpen, setIsRespiratoryOpen] = useState(true); // Open by default
  const [isNervousOpen, setIsNervousOpen] = useState(true); // Open by default

  // Function to toggle the collapse state
  const toggleCollapse = (system) => {
    if (system === "skeletal") {
      setIsSkeletalOpen(!isSkeletalOpen);
    } else if (system === "muscular") {
      setIsMuscularOpen(!isMuscularOpen);
    } else if (system === "circulatory") {
      setIsCirculatoryOpen(!isCirculatoryOpen)
    } else if (system === "digestive") {
      setIsDigestiveOpen(!isDigestiveOpen)
    } else if (system === "respiratory") {
      setIsRespiratoryOpen(!isRespiratoryOpen)
    } else if (system === "nervous") {
      setIsNervousOpen(!isNervousOpen)
    }
  };

  return (
    <div className="min-h-screen flex flex-col">


      {/* Centered main content */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          📚 Resources
        </h1>

        {/* Add image here */}
        <img
          src="/pete-with-glasses-book.png"
          alt="Resources Illustration"
          width={100}
          height={100}
          className="w-32 h-32 mx-auto mb-8 rounded-lg shadow-md"
        />
        <p className="text-lg font-bold text-black-500 mb-6">
          Welcome to our Resources page!
        </p>
        <p className="text-lg font text-black-500 mb-6">
          Below are the materials used to create and support the content of this application, organized by systems. We also attached relevant resources that you might find helpful:
        </p>
        <p className="text-sm italic text-gray-500 mb-6">
          Last Updated: April 27, 2025 at 1:00 PM
        </p>

        {/* Resources Content */}
        <div className="text-left max-w-3xl space-y-8">
          {/* Flex container for the systems */}
          <div className="flex flex-wrap gap-8">
            {/* Skeletal System */}
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2 cursor-pointer" onClick={() => toggleCollapse("skeletal")}>
                  Skeletal System
                </h2>
                <button onClick={() => toggleCollapse("skeletal")} className="text-gray-500">
                  {/* Rotate the triangle icon when collapsed/expanded */}
                  <span
                    className={`transform ${isSkeletalOpen ? "rotate-180" : ""} transition-transform duration-200`}
                  >
                    ▼
                  </span>
                </button>
              </div>
              {isSkeletalOpen && (
                <ul className="list-disc list-inside space-y-2">
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.britannica.com/science/human-skeleton" target="_blank" rel="noopener noreferrer">Human Skeleton (Britannica)</a></li>
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.visiblebody.com/learn/skeleton/glossary" target="_blank" rel="noopener noreferrer">Glossary of the Skeletal System (Visible Body)</a></li>
                  <li>💀 <a className="text-blue-600 hover:underline" href="https://g.co/kgs/4gF17XT" target="_blank" rel="noopener noreferrer">Skeleton Diagram (BioDigital)</a></li>
                  <li>🎥 <a className="text-blue-600 hover:underline" href="https://www.youtube.com/watch?v=NHECopO6L3g" target="_blank" rel="noopener noreferrer">Anatomy of the Skeleton (YouTube)</a></li>
                  <li>🌐 <a className="text-blue-600 hover:underline" href="https://my.clevelandclinic.org/health/body/21048-skeletal-system" target="_blank" rel="noopener noreferrer">Skeletal System (Cleveland Clinic)</a></li>
                </ul>
              )}
            </div>

            {/* Muscular System */}
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2 cursor-pointer" onClick={() => toggleCollapse("muscular")}>
                  Muscular System
                </h2>
                <button onClick={() => toggleCollapse("muscular")} className="text-gray-500">
                  {/* Rotate the triangle icon when collapsed/expanded */}
                  <span
                    className={`transform ${isMuscularOpen ? "rotate-180" : ""} transition-transform duration-200`}
                  >
                    ▼
                  </span>
                </button>
              </div>
              {isMuscularOpen && (
                <ul className="list-disc list-inside space-y-2">
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.innerbody.com/image/musfov.html" target="_blank" rel="noopener noreferrer">The Muscular System (Innerbody)</a></li>
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://courses.lumenlearning.com/suny-ap1/chapter/glossary-the-muscular-system/" target="_blank" rel="noopener noreferrer">Glossary: The Muscular System (SUNY ER Services)</a></li>
                  <li>💀 <a className="text-blue-600 hover:underline" href="https://g.co/kgs/RjSH7UQ" target="_blank" rel="noopener noreferrer">Muscle Diagram (BioDigital)</a></li>
                  <li>🎥 <a className="text-blue-600 hover:underline" href="https://www.youtube.com/watch?v=VUzhweM2YDQ" target="_blank" rel="noopener noreferrer">Muscular System Video (YouTube)</a></li>
                  <li>🌐 <a className="text-blue-600 hover:underline" href="https://my.clevelandclinic.org/health/body/21887-muscle" target="_blank" rel="noopener noreferrer">Muscles (Cleveland Clinic)</a></li>
                </ul>
              )}
            </div>

            {/* Circulatory System */}
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2 cursor-pointer" onClick={() => toggleCollapse("circulatory")}>
                Circulatory System
                </h2>
                <button onClick={() => toggleCollapse("circulatory")} className="text-gray-500">
                  {/* Rotate the triangle icon when collapsed/expanded */}
                  <span
                    className={`transform ${isCirculatoryOpen ? "rotate-180" : ""} transition-transform duration-200`}
                  >
                    ▼
                  </span>
                </button>
              </div>
              {isCirculatoryOpen && (
                <ul className="list-disc list-inside space-y-2">
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.visiblebody.com/learn/circulatory/glossary" target="_blank" rel="noopener noreferrer">Glossary of the Circulatory System (Visible Body)</a></li>
                  <li>💀 <a className="text-blue-600 hover:underline" href="https://g.co/kgs/aiNjfky" target="_blank" rel="noopener noreferrer">Muscle Diagram (BioDigital)</a></li>
                  <li>🎥 <a className="text-blue-600 hover:underline" href="https://www.youtube.com/watch?v=CWFyxn0qDEU" target="_blank" rel="noopener noreferrer">The Heart and Circulatory System - How They Work (YouTube)</a></li>
                  <li>🌐 <a className="text-blue-600 hover:underline" href="https://my.clevelandclinic.org/health/body/circulatory-and-cardiovascular-system" target="_blank" rel="noopener noreferrer">How Your Circulatory System Works (Cleveland Clinic)</a></li>
                </ul>
              )}
            </div>

            {/* Digestive System */}
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2 cursor-pointer" onClick={() => toggleCollapse("digestive")}>
                Circulatory System
                </h2>
                <button onClick={() => toggleCollapse("digestive")} className="text-gray-500">
                  {/* Rotate the triangle icon when collapsed/expanded */}
                  <span
                    className={`transform ${isDigestiveOpen ? "rotate-180" : ""} transition-transform duration-200`}
                  >
                    ▼
                  </span>
                </button>
              </div>
              {isDigestiveOpen && (
                <ul className="list-disc list-inside space-y-2">
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.ncbi.nlm.nih.gov/books/NBK607444/" target="_blank" rel="noopener noreferrer">Chapter 12 Digestive System Terminology (National Institutes of Health [NIH][.gov])</a></li>
                  <li>💀 <a className="text-blue-600 hover:underline" href="https://g.co/kgs/wpjTfpY" target="_blank" rel="noopener noreferrer">Interactive Diagrams (Powered by Google and From BioDigital)</a></li>
                  <li>🎥 <a className="text-blue-600 hover:underline" href="https://www.youtube.com/watch?v=jCnQ-IK4jLE" target="_blank" rel="noopener noreferrer">Digestive system - Anatomical terminology for healthcare (YouTube): </a></li>
                  <li>🌐 <a className="text-blue-600 hover:underline" href="https://my.clevelandclinic.org/health/body/7041-digestive-system" target="_blank" rel="noopener noreferrer">What Is the Digestive System? (Cleveland Clinic)</a></li>
                </ul>
              )}
            </div>

            {/* Respiratory System */}
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2 cursor-pointer" onClick={() => toggleCollapse("respiratory")}>
                Circulatory System
                </h2>
                <button onClick={() => toggleCollapse("respiratory")} className="text-gray-500">
                  {/* Rotate the triangle icon when collapsed/expanded */}
                  <span
                    className={`transform ${isRespiratoryOpen ? "rotate-180" : ""} transition-transform duration-200`}
                  >
                    ▼
                  </span>
                </button>
              </div>
              {isRespiratoryOpen && (
                <ul className="list-disc list-inside space-y-2">
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.ncbi.nlm.nih.gov/books/NBK607438/" target="_blank" rel="noopener noreferrer">Chapter 4 Respiratory System Terminology (National Institutes of Health [NIH][.gov])</a></li>
                  <li>💀 <a className="text-blue-600 hover:underline" href="https://g.co/kgs/7my6spU" target="_blank" rel="noopener noreferrer">Interactive Diagrams (Powered by Google and From BioDigital)</a></li>
                  <li>🎥 <a className="text-blue-600 hover:underline" href="https://www.youtube.com/watch?v=6uqfH3Gi1fw&pp=ygUQI3Jlc3BpcmF0b3J5cm9vdA%3D%3D " target="_blank" rel="noopener noreferrer">Respiratory system - Anatomical terminology for healthcare (YouTube)</a></li>
                  <li>🌐 <a className="text-blue-600 hover:underline" href="https://my.clevelandclinic.org/health/body/21205-respiratory-system" target="_blank" rel="noopener noreferrer">Respiratory System: Organs, Facts, Anatomy & Function (Cleveland Clinic)</a></li>
                </ul>
              )}
            </div>

            {/* Nervous System */}
            <div className="flex-1 min-w-[250px]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2 cursor-pointer" onClick={() => toggleCollapse("nervous")}>
                Circulatory System
                </h2>
                <button onClick={() => toggleCollapse("nervous")} className="text-gray-500">
                  {/* Rotate the triangle icon when collapsed/expanded */}
                  <span
                    className={`transform ${isNervousOpen ? "rotate-180" : ""} transition-transform duration-200`}
                  >
                    ▼
                  </span>
                </button>
              </div>
              {isNervousOpen && (
                <ul className="list-disc list-inside space-y-2">
                  <li>📚 <a className="text-blue-600 hover:underline" href="https://www.visiblebody.com/learn/nervous/glossary" target="_blank" rel="noopener noreferrer">Glossary of the Nervous System | Learn Nervous Anatomy (Visible Body)</a></li>
                  <li>💀 <a className="text-blue-600 hover:underline" href="https://g.co/kgs/YwJJkB4" target="_blank" rel="noopener noreferrer">Interactive Diagrams (Powered by Google and From BioDigital)</a></li>
                  <li>🎥 <a className="text-blue-600 hover:underline" href="https://www.youtube.com/watch?v=RNLceVI8jcc" target="_blank" rel="noopener noreferrer">Nervous System (YouTube) (YouTube)</a></li>
                  <li>🌐 <a className="text-blue-600 hover:underline" href="https://my.clevelandclinic.org/health/body/21202-nervous-system" target="_blank" rel="noopener noreferrer">Nervous System: What It Is, Parts, Function & Disorders (Clevelad Clinic)</a></li>
                </ul>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;