"use client";

import Image from "next/image";
import Link from "next/link";
import { mockUser } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";

// Mock user button (profile icon)
export function MockUserButton({ afterSignOutUrl }: { afterSignOutUrl?: string }) {
  return (
    <Link href={afterSignOutUrl || "/"}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600">
        <span className="text-sm font-bold">{mockUser.firstName?.charAt(0) || "T"}</span>
      </div>
    </Link>
  );
}

// Mock SignIn button
export function MockSignInButton({ 
  children, 
  mode, 
  afterSignInUrl 
}: { 
  children: React.ReactNode; 
  mode?: string;
  afterSignInUrl?: string;
}) {
  return (
    <Link href={afterSignInUrl || "/learn"}>
      {children}
    </Link>
  );
}

// Mock SignUp button
export function MockSignUpButton({ 
  children, 
  mode, 
  afterSignUpUrl 
}: { 
  children: React.ReactNode; 
  mode?: string;
  afterSignUpUrl?: string;
}) {
  return (
    <Link href={afterSignUpUrl || "/learn"}>
      {children}
    </Link>
  );
}

// Mock SignedIn component
export function MockSignedIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Mock SignedOut component
export function MockSignedOut({ children }: { children: React.ReactNode }) {
  return null; // Don't render sign out content in mock mode
}

// Mock ClerkLoading component
export function MockClerkLoading({ children }: { children: React.ReactNode }) {
  return null; // Don't show loading state in mock mode
}

// Mock ClerkLoaded component
export function MockClerkLoaded({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 