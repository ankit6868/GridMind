import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GridMind | AI-Powered Decentralized Energy Intelligence",
  description:
    "GridMind is a decentralized AI-powered energy coordination network that optimizes electricity production, storage, and consumption across distributed energy systems.",
  keywords: [
    "GridMind",
    "decentralized energy",
    "AI energy",
    "smart grid",
    "blockchain energy",
    "renewable energy",
    "energy optimization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
