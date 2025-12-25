"use client";

import { cn } from "@/lib/utils";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface NavbarProps {
  navItems: {
    name: string;
    link: string;
  }[];
  visible: boolean;
}

const Nav = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Courses",
      link: "/courses",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full fixed top-0 inset-x-0 z-50"
    >
      <DesktopNav visible={visible} navItems={navItems} />
      <MobileNav visible={visible} navItems={navItems} />
    </motion.div>
  );
};

const DesktopNav = ({ navItems, visible }: NavbarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/logo-light-trans.png"
      : "/logo-dark-trans.png";

  return (
    <motion.div
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{
        width: visible ? "80%" : "100%",
        y: visible ? 12 : 0,
        borderRadius: visible ? "9999px" : "0px",
      }}
      initial={{
        width: "100%",
        scale: 0.98,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn(
        "hidden lg:flex flex-row self-center items-center justify-between py-3 mx-auto px-6 relative z-[100] transition-colors duration-300",
        visible
          ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-foreground/5 border border-border/50"
          : "bg-background/70 backdrop-blur-md border-b border-border/30"
      )}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex-shrink-0"
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            {mounted && (
              <Image
                src={logoSrc}
                alt="Aniomer"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
          <motion.span
            className="font-cal text-xl tracking-tight text-foreground"
            animate={{
              opacity: visible ? 0 : 1,
              width: visible ? 0 : "auto",
              marginLeft: visible ? 0 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            Aniomer
          </motion.span>
        </Link>
      </motion.div>

      {/* Nav Items */}
      <motion.div
        className="flex flex-row items-center justify-center gap-1"
        layout
      >
        {navItems.map((navItem, idx) => (
          <motion.div
            key={`nav-item-${idx}`}
            onHoverStart={() => setHoveredIndex(idx)}
            className="relative"
          >
            <Link
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href={navItem.link}
            >
              <span className="relative z-10">{navItem.name}</span>
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 rounded-full bg-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.div>
        ))}

        {session && (
          <motion.div
            onHoverStart={() => setHoveredIndex(navItems.length)}
            className="relative"
          >
            <Link
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/admin"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Settings className="h-3.5 w-3.5" />
                Admin
              </span>
              {hoveredIndex === navItems.length && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 rounded-full bg-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Auth Section */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3"
        >
          {session ? (
            <div className="flex items-center gap-3">
              <motion.div
                className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="max-w-[150px] truncate">
                  {session.user?.email}
                </span>
              </motion.div>
              <motion.button
                onClick={() => signOut()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={() => signIn()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md hover:shadow-primary/20"
            >
              Sign in
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const MobileNav = ({ navItems, visible }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/logo-light-trans.png"
      : "/logo-dark-trans.png";

  return (
    <>
      <motion.div
        animate={{
          width: visible ? "92%" : "100%",
          y: visible ? 12 : 0,
          borderRadius: visible ? "24px" : open ? "24px" : "0px",
        }}
        initial={{
          width: "100%",
          scale: 0.98,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex relative flex-col lg:hidden w-full justify-between items-center mx-auto z-50 transition-colors duration-300",
          visible
            ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-foreground/5 border border-border/50"
            : "bg-background/70 backdrop-blur-md border-b border-border/30"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl">
              {mounted && (
                <Image
                  src={logoSrc}
                  alt="Aniomer"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span className="font-cal text-lg tracking-tight text-foreground">
              Aniomer
            </span>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full bg-accent/50 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="w-full overflow-hidden"
            >
              <div className="flex flex-col items-start gap-2 px-4 pb-4">
                {navItems.map((navItem, idx) => (
                  <motion.div
                    key={`mobile-link-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: idx * 0.05 },
                    }}
                    className="w-full"
                  >
                    <Link
                      href={navItem.link}
                      onClick={() => setOpen(false)}
                      className="block w-full px-4 py-2.5 rounded-xl text-foreground hover:bg-accent transition-colors"
                    >
                      {navItem.name}
                    </Link>
                  </motion.div>
                ))}

                {session && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: navItems.length * 0.05 },
                    }}
                    className="w-full"
                  >
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-foreground hover:bg-accent transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Admin
                    </Link>
                  </motion.div>
                )}

                <div className="w-full h-px bg-border my-2" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: (navItems.length + 1) * 0.05 },
                  }}
                  className="w-full"
                >
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                          <User className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <span className="truncate">{session.user?.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          setOpen(false);
                          signOut();
                        }}
                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setOpen(false);
                        signIn();
                      }}
                      className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md"
                    >
                      Sign in
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Nav;
