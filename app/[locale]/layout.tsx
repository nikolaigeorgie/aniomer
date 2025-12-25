import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales, isRtlLocale, type Locale } from "@/i18n/config";
import { Providers } from "../providers";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#2d2a28",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const t = (messages as any).metadata;

  return {
    title: t?.title || "Aniomer | Modern Video Course Platform",
    description:
      t?.description ||
      "Create and share beautiful video courses with ease. A modern platform built for creators, powered by cutting-edge technology.",
    keywords: ["video courses", "online learning", "education platform", "video hosting"],
    authors: [{ name: "Aniomer" }],
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName: "Aniomer",
      title: t?.title || "Aniomer | Modern Video Course Platform",
      description:
        t?.description || "Create and share beautiful video courses with ease.",
    },
    twitter: {
      card: "summary_large_image",
      title: t?.title || "Aniomer | Modern Video Course Platform",
      description:
        t?.description || "Create and share beautiful video courses with ease.",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  // Determine RTL
  const isRtl = isRtlLocale(locale as Locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${calSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


