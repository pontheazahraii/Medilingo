"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSafeClerk } from "@/lib/clerk"; // ← use your safe import now!

interface LogoutButtonProps extends ButtonProps {
  compact?: boolean;
}

export const LogoutButton = ({
  className,
  compact = false,
  ...props
}: LogoutButtonProps) => {
  const router = useRouter();

  const clerkClient = useSafeClerk();

  const handleLogout = async () => {
    try {
      if (clerkClient?.signOut) {
        await clerkClient.signOut({ redirectUrl: "/" });
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
