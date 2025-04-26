// This file is used to mock @clerk/nextjs in development mode
import { 
  MockUserButton, 
  MockSignInButton, 
  MockSignUpButton, 
  MockSignedIn, 
  MockSignedOut,
  MockClerkLoading,
  MockClerkLoaded
} from '@/components/mock-clerk-components';
import { mockClerkAuth, mockCurrentUser, mockSignIn, mockSignUp } from './auth-mock';
import { MockClerkProvider, useMockClerk } from '@/components/mock-clerk-provider';
import { NextRequest, NextResponse } from 'next/server';

// Create mock authMiddleware function
const mockAuthMiddleware = (options = {}) => {
  // Return a function that just passes the request through
  return (req: NextRequest) => {
    console.log('Mock authMiddleware called, allowing all requests');
    return NextResponse.next();
  };
};

// Export mock implementations
export {
  MockUserButton as UserButton,
  MockSignInButton as SignInButton,
  MockSignUpButton as SignUpButton,
  MockSignedIn as SignedIn,
  MockSignedOut as SignedOut,
  MockClerkLoading as ClerkLoading,
  MockClerkLoaded as ClerkLoaded,
  MockClerkProvider as ClerkProvider,
  mockClerkAuth as auth,
  mockCurrentUser as currentUser,
  mockSignIn as useSignIn,
  mockSignUp as useSignUp,
  useMockClerk as useAuth,
  mockAuthMiddleware as authMiddleware
};

// Mock webhook handler
export function webhookHandler() {
  return async () => {};
} 