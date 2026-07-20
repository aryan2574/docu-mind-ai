import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ExternalLink,
  Mail,
  BookOpen,
  Sparkles,
  Shield,
  Users,
  Zap,
  MessageCircle,
  Upload,
  Globe,
  Link as LinkIcon
} from "lucide-react";
import { ScrollToTopButton } from "./scroll-to-top-button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-transparent"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <img src="/icon.png" alt="DocuMind AI" className="h-10 w-10 drop-shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold gradient-text leading-none">
                    DocuMind AI
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Intelligent Document Assistant
                  </span>
                </div>
              </Link>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Empowering students, researchers, and professionals with AI-powered document analysis. 
                Transform your learning experience with intelligent insights.
              </p>

              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 p-2" title="GitHub">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 p-2" title="Twitter">
                  <Globe className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 p-2" title="LinkedIn">
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 p-2" title="Email">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Features
              </h3>
              <div className="space-y-3">
                <Link href="/chat" className="block text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <MessageCircle className="h-3 w-3" />
                  AI Chat Assistant
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  Document Upload
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BookOpen className="h-3 w-3" />
                  Smart Analysis
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  AI Insights
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent-foreground" />
                Resources
              </h3>
              <div className="space-y-3">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Tutorials
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Best Practices
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                Company
              </h3>
              <div className="space-y-3">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10 rounded-2xl border border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Ready to Transform Your Learning?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of students and professionals who are already using DocuMind AI 
                to unlock insights from their documents and accelerate their research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="btn-academic px-8 py-3">
                  Get Started Free
                </Button>
                <Button variant="outline" className="px-8 py-3 hover:bg-primary/5">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>© {currentYear} DocuMind AI. All rights reserved.</span>
                <div className="flex items-center gap-1">
                  <span>Made with</span>
                  <Heart className="h-3 w-3 text-red-500 fill-current" />
                  <span>for education</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Security Badge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span>Enterprise Security</span>
                </div>

                {/* Version Badge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full border border-primary/20">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>v1.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </footer>
  );
};