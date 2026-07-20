"use client";

import { useState } from "react";
import { SignInButton, SignOutButton, SignUpButton, Show, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, MessageCircle, UserCircle, Sparkles, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";
import type { Roles } from "@/types/globals";

export const Navigation = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as Roles;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const userMenuRef = useClickOutside<HTMLDivElement>(() => {
    setIsUserMenuOpen(false);
  });
  
  const hasUploadAccess = userRole === "admin" || userRole === "premium-user";
  
  const getDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    }
    return user?.primaryEmailAddress?.emailAddress?.split('@')[0] || "User";
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "admin":
        return <Sparkles className="h-3 w-3 text-red-500" />;
      case "premium-user":
        return <Sparkles className="h-3 w-3 text-purple-500" />;
      default:
        return null;
    }
  };

  const isActivePage = (href: string) => pathname === href;

  return (
    <nav className="nav-glass sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="relative">
              <img src="/icon.png" alt="DocuMind AI" className="h-10 w-10 drop-shadow-sm" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur opacity-75 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text leading-none">
                DocuMind AI
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Intelligent Document Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <Show when="signed-in">
            <div className="hidden md:flex items-center gap-1">
              <Link href="/chat">
                <Button 
                  variant={isActivePage('/chat') ? 'default' : 'ghost'}
                  size="sm"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActivePage('/chat') ? 'btn-academic shadow-lg' : 'hover:bg-primary/5'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </Button>
              </Link>
              <Link href="/profile">
                <Button 
                  variant={isActivePage('/profile') ? 'default' : 'ghost'}
                  size="sm"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActivePage('/profile') ? 'btn-academic shadow-lg' : 'hover:bg-primary/5'
                  }`}
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            </div>
          </Show>

          {/* Desktop User Menu */}
          <Show when="signed-in">
            <div className="hidden md:flex items-center gap-3">
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-200 border border-primary/10"
                >
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden ring-2 ring-primary/20">
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                    {getRoleIcon() && (
                      <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5">
                        {getRoleIcon()}
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="font-medium text-sm leading-none">{getDisplayName()}</div>
                    <div className="text-xs text-muted-foreground capitalize flex items-center gap-1 mt-1">
                      {(userRole || "user").replace('-', ' ')}
                      {hasUploadAccess && <span className="text-green-500">•</span>}
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl p-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-border/50">
                      <div className="font-medium">{getDisplayName()}</div>
                      <div className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userRole === 'admin' ? 'badge-admin' : 
                          userRole === 'premium-user' ? 'badge-premium' : 'badge-user'
                        }`}>
                          {(userRole || 'user').replace('-', ' ').toUpperCase()}
                        </span>
                        {hasUploadAccess && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            Upload Access
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="py-1">
                      <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-primary/5 rounded-lg transition-colors">
                        <UserCircle className="h-4 w-4" />
                        Manage Profile
                      </Link>
                      <SignOutButton>
                        <button className="flex items-center gap-2 p-2 hover:bg-destructive/5 text-destructive rounded-lg transition-colors w-full text-left">
                          <X className="h-4 w-4" />
                          Sign Out
                        </button>
                      </SignOutButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Show>

          {/* Sign In/Up Buttons */}
          <Show when="signed-out">
            <div className="hidden md:flex gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" className="hover:bg-primary/5">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="btn-academic">Get Started</Button>
              </SignUpButton>
            </div>
          </Show>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-primary/5"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Show when="signed-in">
                <Link href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant={isActivePage('/chat') ? 'default' : 'ghost'}
                    size="sm"
                    className={`w-full justify-start gap-2 ${isActivePage('/chat') ? 'btn-academic' : ''}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant={isActivePage('/profile') ? 'default' : 'ghost'}
                    size="sm"
                    className={`w-full justify-start gap-2 ${isActivePage('/profile') ? 'btn-academic' : ''}`}
                  >
                    <UserCircle className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                
                <div className="border-t border-border/50 pt-2 mt-4">
                  <div className="flex items-center gap-3 p-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden ring-2 ring-primary/20">
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{getDisplayName()}</div>
                      <div className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          userRole === 'admin' ? 'badge-admin' : 
                          userRole === 'premium-user' ? 'badge-premium' : 'badge-user'
                        }`}>
                          {(userRole || 'user').replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <SignOutButton>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive hover:bg-destructive/5 mt-2">
                      <X className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              </Show>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full btn-academic" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </SignUpButton>
              </Show>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
