import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Roles } from "@/types/globals";

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth.protect();
  
  // Get user role from public metadata
  const userRole = sessionClaims?.metadata?.role as Roles;
  
  // Only allow admin and premium-user to access upload
  if (!userRole || !["admin", "premium-user"].includes(userRole)) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}