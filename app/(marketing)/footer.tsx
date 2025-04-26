import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Link href="/courses?category=anatomy" className="w-full">
          <Button size="lg" variant="ghost" className="w-full cursor-pointer">
            <Image
              src="/anatomy-icon.svg"
              alt="Clinical Anatomy"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Clinical Anatomy
          </Button>
        </Link>

        <Link href="/courses?category=pharmacology" className="w-full">
          <Button size="lg" variant="ghost" className="w-full cursor-pointer">
            <Image
              src="/pharma-icon.svg"
              alt="Pharmacotherapy"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Pharmacotherapy
          </Button>
        </Link>

        <Link href="/courses?category=terminology" className="w-full">
          <Button size="lg" variant="ghost" className="w-full cursor-pointer">
            <Image
              src="/terminology-icon.svg"
              alt="Medical Terminology"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Medical Terminology
          </Button>
        </Link>

        <Link href="/courses?category=procedures" className="w-full">
          <Button size="lg" variant="ghost" className="w-full cursor-pointer">
            <Image
              src="/procedures-icon.svg"
              alt="Clinical Procedures"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Clinical Procedures
          </Button>
        </Link>

        <Link href="/courses?category=emergency" className="w-full">
          <Button size="lg" variant="ghost" className="w-full cursor-pointer">
            <Image
              src="/emergency-icon.svg"
              alt="Emergency Medicine"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Emergency Medicine
          </Button>
        </Link>
      </div>
    </div>
  );
};
