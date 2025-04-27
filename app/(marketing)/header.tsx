"use client";
import { useState } from "react";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

import Banner from "./banner";

export const Header = () => {
    return (<></>);
};
