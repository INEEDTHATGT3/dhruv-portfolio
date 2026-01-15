import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAMBHAV JAISWAL // Data Intelligence & Civil Engineering",
  description: "Portfolio of Sambhav Jaiswal - Bridging Civil Engineering foundations with high-performance Data Science and AI.",
  keywords: ["Sambhav Jaiswal", "Data Scientist", "Civil Engineering AI", "HBTU Kanpur", "Machine Learning Portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F0] dark:bg-black transition-colors duration-500`}>
        {children}
      </body>
    </html>
  );
}
