"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/logo";

export function MarketingFooter() {
  const t = useTranslations("landing");

  return (
    <footer className="relative z-10 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo width={100} height={40} />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.documentation")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.github")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.support")}</a>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}


