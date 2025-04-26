// Mock authentication for local development

// Mock user data with more properties to match Clerk's structure
export const mockUser = {
  id: "mock-user-id",
  firstName: "Test",
  lastName: "User",
  username: "testuser",
  fullName: "Test User",
  imageUrl: "/avatar.png",
  hasImage: true,
  primaryEmailAddressId: "mock-email-id",
  primaryPhoneNumberId: null,
  primaryWeb3WalletId: null,
  emailAddresses: [
    {
      id: "mock-email-id",
      emailAddress: "test@example.com",
      verification: { status: "verified", strategy: "mock" },
      linkedTo: []
    }
  ],
  phoneNumbers: [],
  web3Wallets: [],
  externalAccounts: [],
  passwordEnabled: true,
  totpEnabled: false,
  backupCodeEnabled: false,
  twoFactorEnabled: false,
  verified: true,
  banned: false,
  locked: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {}
};

// Mock Clerk auth for local development
export const mockAuth = {
  userId: mockUser.id,
  sessionId: "mock-session-id",
  session: {
    id: "mock-session-id",
    userId: mockUser.id,
    status: "active",
    lastActiveAt: new Date().toISOString(),
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    abandonAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  getToken: async () => "mock-token",
};

// Mock sign-in function
export const mockSignIn = () => {
  return {
    status: "complete",
  };
};

// Mock sign-up function
export const mockSignUp = () => {
  return {
    status: "complete",
  };
}; 