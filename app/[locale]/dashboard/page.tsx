"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 8l8-6 8 6v12l-8 6-8-6V8z" />
                </svg>
              </div>
              <span className="font-bold">Aniomer</span>
            </Link>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link
                href="/api/auth/signout"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {tCommon("signOut")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("welcome", { name: session.user?.name || "User" })}</h1>
        </div>

        {/* Courses Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{t("yourCourses")}</h2>
            <Link
              href="/admin/courses/new"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {tCommon("create")} {tCommon("courses").toLowerCase()}
            </Link>
          </div>

          <div className="glow-card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">{t("noCourses")}</h3>
            <p className="text-muted-foreground mb-6">{t("createFirst")}</p>
            <Link
              href="/admin/courses/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 font-medium hover:bg-violet-500/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t("createFirst")}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


