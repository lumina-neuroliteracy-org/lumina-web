import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

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
  metadataBase: new URL("https://www.lumina-literacy.ie"),
  title: {
    default: "Lumina Neuro-Literacy Studio",
    template: "%s | Lumina Neuro-Literacy Studio",
  },
  description:
    "Specialist dyslexia tuition and literacy support for children and adults in Ireland. Expert-led, accessibility-first sessions online and in-person.",
  openGraph: {
    siteName: "Lumina Neuro-Literacy Studio",
    locale: "en_IE",
    type: "website",
  },
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
        <JsonLd />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
