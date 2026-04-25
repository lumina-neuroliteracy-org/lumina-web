import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileNavSidebar } from "@/components/navigation/MobileNavSideBar";
import Footer from "@/components/Footer";
import { DyslexiaProvider } from "@/components/DyslexiaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luminar",
  description: "Accessibility-first learning support for dyslexia journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-surface text-foreground">
        <DyslexiaProvider>
          <SidebarProvider defaultOpen={false} className="flex-col w-full">
            <MobileNavSidebar />
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </SidebarProvider>
        </DyslexiaProvider>
      </body>
    </html>
  );
}
