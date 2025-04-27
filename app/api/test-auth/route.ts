import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { users } from "@/db/schema";

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }
    
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 });
    }
    
    const email = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: "Email not found" 
      }, { status: 400 });
    }
    
    // Check if user exists in database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    });
    
    const now = new Date();
    
    let result;
    if (existingUser) {
      // Update user's last login
      await db
        .update(users)
        .set({ logged_in_last: now })
        .where(eq(users.email, email));
        
      result = {
        action: "updated",
        user: {
          ...existingUser,
          logged_in_last: now
        }
      };
    } else {
      // Create new user
      const newUser = {
        email,
        username: user.username || user.firstName || null,
        created_at: now,
        streak: 0,
        longest_streak: 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
        logged_in_last: now
      };
      
      await db.insert(users).values(newUser);
      
      result = {
        action: "created",
        user: newUser
      };
    }
    
    return NextResponse.json({
      success: true,
      userId,
      email,
      result
    });
  } catch (error) {
    console.error("Test auth error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
} 