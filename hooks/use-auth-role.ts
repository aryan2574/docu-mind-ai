"use client";

import { useUser } from "@clerk/nextjs";
import type { Roles } from "@/types/globals";

export function useAuthRole() {
  const { user, isLoaded } = useUser();
  const userRole = user?.publicMetadata?.role as Roles;

  const isAdmin = userRole === "admin";
  const isPremiumUser = userRole === "premium-user";
  const isRegularUser = userRole === "user" || !userRole;
  
  const hasUploadAccess = isAdmin || isPremiumUser;

  return {
    userRole: userRole || "user",
    isAdmin,
    isPremiumUser,
    isRegularUser,
    hasUploadAccess,
    isLoaded,
  };
}