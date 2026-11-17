"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/constants";
import {
  Moon,
  Sun,
  Mail,
} from "lucide-react";

interface NavbarProps {
  onOpenCommand?: () => void;
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenCommand, onOpenResume }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: "Experience", targetId: "experience" },
    { label: "Projects", targetId: "projects" },
    { label: "Skills", targetId: "stack" },
    { label: "Education", targetId: "education" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={scrollToTop}
          className="group flex items-center gap-2.5 sm:gap-3 text-zinc-950 dark:text-white tracking-tight shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/20 shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0 bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={PERSONAL_INFO.profileImage}
              alt={PERSONAL_INFO.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 36px, 44px"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-base font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] sm:text-xs font-mono-code font-normal text-zinc-500 dark:text-zinc-400 leading-tight">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation (Apple Unified Floating Pill - Desktop Only) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] rounded-full p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              onClick={(e) => handleScrollTo(e, link.targetId)}
              className="px-4 py-2 text-xs sm:text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-zinc-800/90 transition-all duration-150 shadow-xs-hover"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle + High-Conversion Contact CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Button (Hydration Safe) */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/90 border border-black/[0.08] dark:border-white/[0.1] text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Toggle dark and light theme"
          >
            {mounted ? (
              isDark ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )
            ) : (
              <span className="w-4 h-4" />
            )}
          </button>

          {/* Direct Contact CTA (Smooth scrolls to #contact form & direct reach) */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="inline-flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10 px-3.5 sm:px-4.5 rounded-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black hover:from-zinc-800 hover:to-zinc-900 text-white dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:hover:from-zinc-100 dark:hover:to-zinc-300 dark:text-black font-semibold text-xs sm:text-sm shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}
