import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocuMind AI - Intelligent Document Assistant",
  description: "Your AI-powered document assistant for study and research. Upload PDFs, chat with your documents, and unlock insights from your knowledge base.",
  keywords: ["AI", "Document", "Study", "Research", "PDF", "Chat", "Education", "Learning"],
  authors: [{ name: "DocuMind AI" }],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }
    ],
    apple: { url: "/icon.png", sizes: "512x512", type: "image/png" },
    shortcut: "/favicon.ico"
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
