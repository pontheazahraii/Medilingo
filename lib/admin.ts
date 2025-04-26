import { auth } from "@clerk/nextjs";

export const getIsAdmin = () => {
  try {
    const { userId } = auth();
    
    // Handle missing environment variable
    if (!process.env.CLERK_ADMIN_IDS) {
      console.warn("CLERK_ADMIN_IDS not defined, using development mode");
      return true; // Allow admin access in development when env vars aren't set
    }
    
    const adminIds = process.env.CLERK_ADMIN_IDS.split(", "); // stored in .env.local file as string separated by comma(,) and space( )

    if (!userId) return false;

    return adminIds.indexOf(userId) !== -1;
  } catch (error) {
    console.warn("Error in auth, using development mode");
    return true; // Allow admin access in development when auth fails
  }
};
