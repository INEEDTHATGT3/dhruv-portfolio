import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import resume from "@/content/resume.json";
import { site } from "@/content/site";
import { availability, roleLine } from "@/lib/profile";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

const title = `${resume.name} — ${site.role}`;
const latest = resume.experience[0];
const description = `${site.pitch} ${latest ? `${roleLine(latest)}. ` : ""}${availability}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: "/", siteName: resume.name, title, description, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#f4f5f6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
