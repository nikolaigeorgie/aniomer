"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { type Locale } from "@/i18n/config";

// Flag components
const IsraeliFlag = () => (
  <svg
    className="w-8 h-8 rounded-md shadow-sm"
    viewBox="0 0 640 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="il-a">
        <path fillOpacity=".7" d="M-87.6 0H595v512H-87.6z" />
      </clipPath>
    </defs>
    <g
      fillRule="evenodd"
      clipPath="url(#il-a)"
      transform="translate(82.1) scale(.94)"
    >
      <path fill="#fff" d="M619.4 512H-112V0h731.4z" />
      <path
        fill="#0038b8"
        d="M619.4 115.2H-112V48h731.4zm0 350.4H-112v-67.2h731.4zm-483-274h262.4l-131.2 231-131.2-231z"
      />
      <path fill="#fff" d="M225.8 317.8l20.9 35.5 21.4-35.3-42.4-.2z" />
      <path
        fill="#0038b8"
        d="m136.4 320 41.3-71.7h82.5l41.4 71.6-41.5 71.5H178zm28.6-57 28.4 48.5 57.4.2 28.8-48.7-28.5-48.2h-57.3l-28.8 48.2zm177.3-79.3 21-35.5 21.3 35.5-42.3.1z"
      />
      <path fill="#fff" d="m344.2 183.6-20.9-35.5-21.4 35.3 42.4.2z" />
      <path fill="#0038b8" d="m225.8 183.6-21-35.5-21.3 35.5 42.3.1z" />
      <path fill="#fff" d="m136.4 191.7 20.9 35.5 21.4-35.3-42.4-.2z" />
      <path
        fill="#0038b8"
        d="m135.4 254.5 42.2 73.5 45-73.3-87.2-.2zm175.2 0-42.2 73.5-45-73.3 87.2-.2z"
      />
      <path
        fill="#fff"
        d="m267.3 192-28.3 48.5-57.5-.2-28.8-48.8 28.5-48.1h57.3l28.8 48.7z"
      />
    </g>
  </svg>
);

const AmericanFlag = () => (
  <svg
    className="w-8 h-8 rounded-md shadow-sm"
    viewBox="0 0 640 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#bd3d44" d="M0 0h640v480H0" />
    <path
      stroke="#fff"
      strokeWidth="37"
      d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
    />
    <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
    <marker id="us-a" markerHeight="30" markerWidth="30">
      <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z" />
    </marker>
    <path
      fill="none"
      markerMid="url(#us-a)"
      d="m0 0 16 11h61 61 61 61 61L47 37h61 61 61 61m-244 26h61 61 61 61 61L47 89h61 61 61 61m-244 26h61 61 61 61 61L47 141h61 61 61 61m-244 26h61 61 61 61 61L47 193h61 61 61 61m-244 26h61 61 61 61 61"
    />
  </svg>
);

export function LanguageLearningSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageSwitch = (newLocale: Locale) => {
    const pathWithoutLocale = pathname?.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const isHebrew = locale === "he";
  const isEnglish = locale === "en";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
    >
      {/* Learn Hebrew Button - Always shows Hebrew text */}
      <button
        onClick={() => handleLanguageSwitch("he")}
        className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all duration-300 w-full sm:w-auto ${
          isHebrew
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        <div className="relative">
          <IsraeliFlag />
          {isHebrew && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
            >
              <svg
                className="w-2.5 h-2.5 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          )}
        </div>
        <div className="text-start">
          {/* Hebrew text - target language */}
          <p
            className={`font-semibold ${
              isHebrew ? "text-primary" : "text-foreground"
            }`}
            dir="rtl"
          >
            אני רוצה ללמוד עברית
          </p>
          <p className="text-xs text-muted-foreground">
            I want to learn Hebrew
          </p>
        </div>
        {!isHebrew && (
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ms-2 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>

      {/* Divider */}
      <div className="hidden sm:block w-px h-12 bg-border" />
      <span className="sm:hidden text-muted-foreground text-sm">or / או</span>

      {/* Learn English Button - Always shows English text */}
      <button
        onClick={() => handleLanguageSwitch("en")}
        className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all duration-300 w-full sm:w-auto ${
          isEnglish
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        <div className="relative">
          <AmericanFlag />
          {isEnglish && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
            >
              <svg
                className="w-2.5 h-2.5 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          )}
        </div>
        <div className="text-start">
          {/* English text - target language */}
          <p
            className={`font-semibold ${
              isEnglish ? "text-primary" : "text-foreground"
            }`}
          >
            I want to learn English
          </p>
          <p className="text-xs text-muted-foreground" dir="rtl">
            אני רוצה ללמוד אנגלית
          </p>
        </div>
        {!isEnglish && (
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ms-2 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
