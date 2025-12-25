"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";

export function MarketingNav() {
  const { data: session, status } = useSession();
  const tCommon = useTranslations("common");
  
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navItems = [
    { name: tCommon("home"), href: "/" },
    { name: tCommon("courses"), href: "/courses" },
    { name: tCommon("about"), href: "/about" },
  ];

  return (
    <motion.nav 
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* Desktop Nav */}
      <motion.div
        animate={{
          width: scrolled ? "90%" : "100%",
          y: scrolled ? 12 : 0,
          borderRadius: scrolled ? "9999px" : "0px",
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "hidden md:flex items-center justify-between mx-auto px-6 py-4 transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-xl shadow-lg shadow-foreground/5 border border-border/50"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center gap-3">
            <Logo width={scrolled ? 100 : 140} height={scrolled ? 40 : 56} />
          </Link>
        </motion.div>

        {/* Center Nav Links */}
        <motion.div 
          className="flex items-center gap-1"
          animate={{ opacity: scrolled ? 1 : 0.9 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>

        {/* Right side - Auth & Settings */}
        <motion.div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {status === "loading" ? (
            <div className="w-24 h-10 bg-muted rounded-full animate-pulse" />
          ) : session ? (
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              {tCommon("dashboard")}
            </Link>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {tCommon("signIn")}
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                {tCommon("getStarted")}
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Mobile Nav */}
      <motion.div
        animate={{
          width: scrolled ? "94%" : "100%",
          y: scrolled ? 8 : 0,
          borderRadius: scrolled || mobileMenuOpen ? "20px" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "md:hidden flex flex-col mx-auto transition-all duration-300 overflow-hidden",
          scrolled || mobileMenuOpen
            ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-foreground/5 border border-border/50"
            : "bg-background/50 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <Logo width={100} height={40} />
          </Link>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-accent/50 text-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.05 } }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-xl text-foreground hover:bg-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="w-full h-px bg-border my-2" />
                
                {status === "loading" ? (
                  <div className="w-full h-10 bg-muted rounded-xl animate-pulse" />
                ) : session ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm text-center"
                  >
                    {tCommon("dashboard")}
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm text-center hover:bg-accent transition-colors"
                    >
                      {tCommon("signIn")}
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm text-center"
                    >
                      {tCommon("getStarted")}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}

