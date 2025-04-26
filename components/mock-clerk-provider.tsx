"use client";

import React, { createContext, useContext } from "react";
import { mockAuth, mockUser } from "@/lib/mock-auth";

// Create a more complete mock context
const MockClerkContext = createContext({
  isLoaded: true,
  user: mockUser,
  isSignedIn: true,
  session: mockAuth.session,
  signIn: () => Promise.resolve({ status: "complete" }),
  signUp: () => Promise.resolve({ status: "complete" }),
  signOut: () => Promise.resolve({}),
  getToken: () => Promise.resolve("mock-token"),
  openSignIn: () => {},
  openSignUp: () => {},
  openUserProfile: () => {},
  authenticateWithMetamask: () => Promise.resolve(),
  setActive: () => Promise.resolve({}),
  client: {
    sessions: {
      getToken: async () => "mock-token",
      get: async () => mockAuth.session,
    }
  }
});

// Hook to use the mock context
export const useMockClerk = () => useContext(MockClerkContext);

// Mock Clerk Provider component with appearance prop
interface MockClerkProviderProps {
  children: React.ReactNode;
  appearance?: any;
  navigate?: (to:string) => void
}

export function MockClerkProvider({ children, appearance }: MockClerkProviderProps) {
  return (
    <MockClerkContext.Provider 
      value={{
        isLoaded: true,
        user: mockUser,
        isSignedIn: true,
        session: mockAuth.session,
        signIn: () => Promise.resolve({ status: "complete" }),
        signUp: () => Promise.resolve({ status: "complete" }),
        signOut: () => Promise.resolve({}),
        getToken: () => Promise.resolve("mock-token"),
        openSignIn: () => {},
        openSignUp: () => {},
        openUserProfile: () => {},
        authenticateWithMetamask: () => Promise.resolve(),
        setActive: () => Promise.resolve({}),
        client: {
          sessions: {
            getToken: async () => "mock-token",
            get: async () => mockAuth.session,
          }
        }
      }}
    >
      {children}
    </MockClerkContext.Provider>
  );
} 

(MockClerkProvider as any).displayName = "ClerkProvider";
