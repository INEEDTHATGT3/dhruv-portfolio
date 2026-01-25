import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sambhav Jaiswal // Data Scientist & AI Specialist",
  description: "Official Portfolio of Sambhav Jaiswal. Founded in Civil Engineering (HBTU), specializing in high-performance AI, Computer Vision, and Data Engineering.",
  openGraph: {
    title: "Sambhav Jaiswal // Technical Dossier",
    description: "Bridging Civil Engineering with Data Intelligence.",
    url: "https://sambhavjaiswalportfolio.vercel.app/",
    siteName: "Sambhav Jaiswal Portfolio",
    images: [
      {
        url: "/og-image.png", // You can create a screenshot of your hero section and name it this
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sambhav Jaiswal // Data Scientist",
    description: "HBTU Civil Engineering | AI | Computer Vision | Data Engineering",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-red-600 selection:text-white`}>
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
