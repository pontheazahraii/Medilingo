"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Import individual hooks conditionally
let useClerk: any;
try {
  // Try to dynamically import useClerk (will work in production)
  useClerk = require("@clerk/nextjs").useClerk;
} catch (error) {
  // In development with mocks, this might fail - we'll handle it
  console.log("Clerk useClerk not available, using mock instead");
  useClerk = null;
}

// For development mock
import { useMockClerk } from "@/components/mock-clerk-provider";

interface LogoutButtonProps extends ButtonProps {
  compact?: boolean;
}

export const LogoutButton = ({ 
  className, 
  compact = false,
  ...props 
}: LogoutButtonProps) => {
  const router = useRouter();
  
  // Try to use Clerk first (for production) if available
  let clerkClient = null;
  try {
    if (useClerk) {
      clerkClient = useClerk();
    }
  } catch (error) {
    console.log("Error using Clerk:", error);
  }
  
  // Fallback to mock clerk in development
  const mockClerk = useMockClerk();
  
  const handleLogout = async () => {
    try {
      // In development mode, just redirect
      if (process.env.NODE_ENV === "development") {
        router.push("/");
        toast.success("Logged out successfully (dev mode)");
        return;
      }
      
      if (clerkClient?.signOut) {
        await clerkClient.signOut({ redirectUrl: "/" });
      } else if (mockClerk?.signOut) {
        await mockClerk.signOut();
        router.push("/");
      }
      
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out");
    }
  };
  

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "flex justify-start text-sm hover:text-red-500", 
        compact ? "p-2" : "w-full text-muted-foreground", 
        className
      )}
      {...props}
    >
      <LogOut className={cn("h-4 w-4", compact ? "" : "mr-2")} />
      {!compact && "Logout"}
    </Button>
  );
}; 