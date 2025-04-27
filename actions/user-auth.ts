"use server";

import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { users } from "@/db/schema";

/**
 * Handles user login by checking if user exists and creating or updating their record
 * Should be called after successful authentication
 */
export const handleUserLogin = async () => {
  try {
    // In development mode with mocks, we'll use a fallback approach
    const isDev = process.env.NODE_ENV === "development";
    let userId: string = "unknown-user-id"; // Default value
    let email: string;
    let username: string | null;

    // For development/testing, use mock user data
    if (isDev) {
      userId = "mock-user-id";
      email = "mock-user@example.com";
      username = "MockUser";
      console.log("Using mock user data in development mode");
    } else {
      // In production, get the actual user data
      try {
        const authData = auth();
        if (!authData.userId) {
          throw new Error("Not authenticated");
        }
        
        userId = authData.userId;
        
        const { currentUser } = await import("@clerk/nextjs");
        const user = await currentUser();
        
        if (!user) {
          throw new Error("User not found");
        }
        
        const userEmail = user.emailAddresses.find(
          (email) => email.id === user.primaryEmailAddressId
        )?.emailAddress;
        
        if (!userEmail) {
          throw new Error("User email not found");
        }
        
        email = userEmail;
        username = user.username || user.firstName || null;
      } catch (error) {
        console.error("Error fetching user details:", error);
        // If in development, we can continue with mock data
        if (!isDev) {
          throw error; // In production, we want to fail if we can't get user data
        }
        // Fallback values for development mode
        email = "unknown@example.com";
        username = null;
      }
    }

    // Skip DB operations in development if using mock database
    if (isDev && !process.env.DATABASE_URL) {
      console.log("Skipping database operations in development mode without DATABASE_URL");
      return { success: true, devMode: true };
    }

    // Check if user already exists in database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    const now = new Date();

    if (existingUser) {
      // Update existing user's last login timestamp
      await db
        .update(users)
        .set({
          logged_in_last: now,
        })
        .where(eq(users.email, email));
      
      console.log(`User ${email} logged in, timestamp updated`);
    } else {
      // Create new user record
      await db.insert(users).values({
        email: email,
        username: username,
        created_at: now,
        streak: 0,
        longest_streak: 0,
        timezone: isDev ? "UTC" : (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : null),
        logged_in_last: now,
      });
      
      console.log(`New user ${email} created in database`);
    }

    // Revalidate relevant paths that might display user data
    revalidatePath("/courses");
    revalidatePath("/learn");
    revalidatePath("/profile");
    
    return { success: true };
  } catch (error) {
    console.error("Error in handleUserLogin:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}; 