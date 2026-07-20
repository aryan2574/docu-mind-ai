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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img src="/icon.png" alt="DocuMind AI" className="h-20 w-20 mx-auto mb-6" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Welcome to DocuMind AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent document assistant for study and research. Upload PDFs, chat with your documents, 
            and unlock insights from your knowledge base with the power of artificial intelligence.
          </p>
        </div>

        <Show when="signed-out">
          <div className="text-center max-w-2xl mx-auto">
            <Card className="card-academic">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Join thousands of students, researchers, and professionals who use DocuMind AI to unlock insights from their documents.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-primary mb-2" />
                    <span className="font-medium">AI Chat</span>
                    <span className="text-muted-foreground">Instant answers</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-accent/10 rounded-lg">
                    <Upload className="h-8 w-8 text-accent-foreground mb-2" />
                    <span className="font-medium">Document Upload</span>
                    <span className="text-muted-foreground">Premium feature</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-purple-500/10 rounded-lg">
                    <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="font-medium">Smart Insights</span>
                    <span className="text-muted-foreground">AI-powered analysis</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Free account includes AI chat • Premium features available
                </div>
              </CardContent>
            </Card>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Chat Feature */}
            <Card className="card-academic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  AI Chat Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Engage in intelligent conversations with AI and get instant answers from your uploaded documents and knowledge base.
                </p>
                <Link href="/chat">
                  <Button className="w-full btn-academic">Start Chatting</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profile Feature */}
            <Card className="card-academic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <BookOpen className="h-6 w-6 text-accent-foreground" />
                  </div>
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Manage your account information, update your profile, and view your access permissions and role status.
                </p>
                <Link href="/profile">
                  <Button className="w-full" variant="outline">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upload Status */}
            <Card className={`card-academic ${hasUploadAccess ? 'success-glow border-accent/30' : 'border-orange-200/50'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${hasUploadAccess ? 'bg-accent/20' : 'bg-orange-100'}`}>
                    {hasUploadAccess ? (
                      <Upload className="h-6 w-6 text-accent-foreground" />
                    ) : (
                      <Shield className="h-6 w-6 text-orange-600" />
                    )}
                  </div>
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {hasUploadAccess 
                    ? "You have access to upload PDF documents directly in the chat interface for AI analysis."
                    : "Document upload is a premium feature available for Premium Users and Administrators."
                  }
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Current role:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    userRole === 'admin' ? 'badge-admin' : 
                    userRole === 'premium-user' ? 'badge-premium' : 'badge-user'
                  }`}>
                    {userRole.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">
              How DocuMind AI Works
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-4">1. Upload Documents</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {hasUploadAccess 
                    ? "Use the upload button in the chat interface to add PDF documents for AI analysis and processing"
                    : "Premium feature - upgrade your account to upload and analyze documents with AI"
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <MessageCircle className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-4">2. Ask Questions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Engage in natural conversations with AI and ask specific questions about your uploaded documents and research materials
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/20 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <BookOpen className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-4">3. Get Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive intelligent, contextual answers and unlock valuable insights from your content with advanced AI understanding
                </p>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
