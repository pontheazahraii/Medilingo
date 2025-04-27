import { auth } from "@clerk/nextjs";
import { handleUserLogin } from "@/actions/user-auth";

/**
 * Test script to verify user authentication functionality
 * 
 * This script:
 * 1. Tests the handleUserLogin function
 * 2. Simulates user login in development mode 
 * 
 * To run:
 * npx tsx scripts/test-user-auth.ts
 */
async function testUserAuth() {
  try {
    console.log("Testing user authentication functionality...");

    // Test the handleUserLogin function
    // This will handle both development and production environments
    const result = await handleUserLogin();
    
    console.log("Login handling result:", result);
    
    if (result.success) {
      console.log("User authentication test completed successfully");
    } else {
      console.error("User authentication test failed:", result.error);
    }
  } catch (error) {
    console.error("Error testing user authentication:", error);
  }
}

// Run the test
testUserAuth(); 