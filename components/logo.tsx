"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width = 120, height = 48 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return placeholder with same dimensions to avoid layout shift
    return (
      <div 
        className={`${className}`} 
        style={{ width, height }}
      />
    );
  }

  // Dark theme shows dark logo, light theme shows light logo
  const logoSrc = resolvedTheme === "dark" 
    ? "/logo-dark-trans.png" 
    : "/logo-light-trans.png";

  return (
    <Image
      src={logoSrc}
      alt="Ani Omer"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  );
}

// Smaller version for compact spaces
export function LogoIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className={`rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const logoSrc = resolvedTheme === "dark" 
    ? "/logo-dark-trans.png" 
    : "/logo-light-trans.png";

  return (
    <Image
      src={logoSrc}
      alt="Ani Omer"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  );
}

