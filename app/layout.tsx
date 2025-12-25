import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  display: "swap",
  weight: "600",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aniomer | Modern Video Course Platform",
  description:
    "Create and share beautiful video courses with ease. A modern platform built for creators, powered by cutting-edge technology.",
  keywords: ["video courses", "online learning", "education platform", "video hosting"],
  authors: [{ name: "Aniomer" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aniomer",
    title: "Aniomer | Modern Video Course Platform",
    description: "Create and share beautiful video courses with ease.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniomer | Modern Video Course Platform",
    description: "Create and share beautiful video courses with ease.",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${calSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

