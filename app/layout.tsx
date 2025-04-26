import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { MockClerkProvider } from "@/components/mock-clerk-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";
import { HeadInject } from "./head-inject";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#4BB4E6",
};

export const metadata: Metadata = siteConfig;

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use mock provider in development if needed
  if (isDevelopment) {
    return (
      <MockClerkProvider>
        <html lang="en">
          <head>
            <HeadInject />
          </head>
          <body className={font.className}>
            <Toaster theme="light" richColors closeButton />
            <ExitModal />
            <HeartsModal />
            <PracticeModal />
            {children}
          </body>
        </html>
      </MockClerkProvider>
    );
  }
  
  // Use real Clerk provider in production
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/favicon.ico",
        },
        variables: {
          colorPrimary: "#22C55E",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <Toaster theme="light" richColors closeButton />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
