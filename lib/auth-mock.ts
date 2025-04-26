// Mock authentication utility for Clerk functions

import { mockAuth, mockUser } from "./mock-auth";

// Clerk's auth() function replacement
export const mockClerkAuth = () => {
  return mockAuth;
};

// Clerk's currentUser() function replacement
export const mockCurrentUser = async () => {
  return {
    ...mockUser,
    emailAddresses: [
      {
        emailAddress: "test@example.com",
      }
    ],
    primaryEmailAddressId: "mock-email-id",
    primaryEmailAddress: {
      emailAddress: "test@example.com",
    },
    getMetadata: () => Promise.resolve({}),
  };
};

// Mock SignIn (using in hooks)
export const mockSignIn = () => {
  return {
    create: () => Promise.resolve({ status: "complete" }),
    signIn: () => Promise.resolve({ status: "complete" }),
  };
};

// Mock SignUp (using in hooks)
export const mockSignUp = () => {
  return {
    create: () => Promise.resolve({ status: "complete" }),
    signUp: () => Promise.resolve({ status: "complete" }),
  };
}; 