import { auth } from "@clerk/nextjs/server";
import type { Roles } from "@/types/globals";

export async function getCurrentUserRole(): Promise<Roles | null> {
  try {
    const { sessionClaims } = await auth();
    return (sessionClaims?.metadata?.role as Roles) || null;
  } catch {
    return null;
  }
}

export async function hasUploadAccess(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role === "admin" || role === "premium-user";
}

export function isAuthorizedRole(role: string | undefined): role is "admin" | "premium-user" {
  return role === "admin" || role === "premium-user";
}