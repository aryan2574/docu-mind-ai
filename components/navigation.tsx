"use client";

import { SignInButton, SignOutButton, SignUpButton, Show, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Roles } from "@/types/globals";

export const Navigation = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as Roles;
  
  const hasUploadAccess = userRole === "admin" || userRole === "premium-user";

  return (
    <nav className="border-b border-[var(--foreground)]/10">
      <div className="flex container h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold">
            docu-mind-ai
          </Link>
          
          <Show when="signed-in">
            <div className="flex gap-4">
              <Link href="/chat">
                <Button variant="ghost">Chat</Button>
              </Link>
              {hasUploadAccess && (
                <Link href="/upload">
                  <Button variant="ghost">Upload PDF</Button>
                </Link>
              )}
            </div>
          </Show>
        </div>

        <div className="flex gap-2 items-center">
          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Role: <span className="capitalize font-medium">{userRole || "user"}</span>
              </span>
              <SignOutButton>
                <Button variant="outline">Sign Out</Button>
              </SignOutButton>
            </div>
          </Show>
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </nav>
  );
};
