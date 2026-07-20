"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Show } from "@clerk/nextjs";
import { useAuthRole } from "@/hooks/use-auth-role";
import { MessageCircle, Upload, BookOpen, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { hasUploadAccess, userRole } = useAuthRole();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to DocuMind AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent document assistant. Chat with your PDFs, get instant answers, and unlock insights from your knowledge base.
          </p>
        </div>

        <Show when="signed-out">
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Sign in to access the AI chatbot and upload your documents.
                </p>
              </CardContent>
            </Card>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Chat Feature */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  AI Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Chat with AI and get answers from your uploaded documents.
                </p>
                <Link href="/chat">
                  <Button className="w-full">Start Chatting</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upload Feature - Conditional */}
            {hasUploadAccess ? (
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-green-600" />
                    Upload PDFs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Upload PDF documents to build your knowledge base.
                  </p>
                  <Link href="/upload">
                    <Button className="w-full" variant="outline">
                      Upload Documents
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="hover:shadow-lg transition-shadow border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Premium Feature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    PDF upload is available for Premium Users and Administrators.
                  </p>
                  <Button disabled className="w-full" variant="outline">
                    Upgrade Required
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Your Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  Current role: <strong className="capitalize">{userRole}</strong>
                </p>
                <div className="text-sm text-gray-500">
                  {userRole === "admin" && "Full access to all features"}
                  {userRole === "premium-user" && "Access to chat and upload features"}
                  {(userRole === "user" || !userRole) && "Access to chat feature only"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Upload Documents</h3>
                <p className="text-gray-600 text-sm">
                  {hasUploadAccess 
                    ? "Upload your PDF documents to create your knowledge base"
                    : "Premium feature - upgrade to upload documents"
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Ask Questions</h3>
                <p className="text-gray-600 text-sm">
                  Chat with AI and ask questions about your documents
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Get Insights</h3>
                <p className="text-gray-600 text-sm">
                  Receive intelligent answers and insights from your content
                </p>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
