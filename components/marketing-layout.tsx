"use client";

import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function MarketingLayout({ children, showFooter = true }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 grid-pattern opacity-50" />
      <div className="hero-glow -top-40 start-[-10rem]" />
      <div className="hero-glow -bottom-40 end-[-10rem]" />

      {/* Navigation */}
      <MarketingNav />

      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <MarketingFooter />}
    </div>
  );
}

