"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { handleUserLogin } from "@/actions/user-auth";

/**
 * LoginHandler component
 * 
 * This component handles user login and ensures user data is properly 
 * stored in the database. It should be placed on pages that are loaded
 * after successful authentication.
 */
export function LoginHandler() {
  const { isLoaded, userId } = useAuth();
  const [processed, setProcessed] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // Only run once and only when auth is loaded and user is logged in (or in dev mode)
    if ((isLoaded && userId && !processed) || (isDev && !processed)) {
      const processLogin = async () => {
        try {
          // In development mode, don't worry if the call fails
          const result = await handleUserLogin();
          if (!result.success && !isDev) {
            console.error("Login handling failed:", result.error);
          }
          setProcessed(true);
        } catch (error) {
          console.error("Error handling login:", error);
          // Even if there's an error, mark as processed to avoid infinite retry
          setProcessed(true);
        }
      };

      processLogin();
    }
  }, [isLoaded, userId, processed, isDev]);

  // This component doesn't render anything visible
  return null;
}

export default LoginHandler; 