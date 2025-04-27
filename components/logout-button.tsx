"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Import Clerk normally
import { useClerk } from "@clerk/nextjs";

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
  
  // Always try to use Clerk
  const clerkClient = useClerk();
  
  // Fallback mock (only if you manually hook it up in your mock provider)
  const mockClerk = useMockClerk();
  
  const handleLogout = async () => {
    try {
      if (clerkClient?.signOut) {
        await clerkClient.signOut({ redirectUrl: "/" });
      } else if (mockClerk?.signOut) {
        await mockClerk.signOut();
        router.push("/");
      } else {
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
