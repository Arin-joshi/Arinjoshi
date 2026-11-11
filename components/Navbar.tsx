"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/constants";
import {
  Search,
  FileDown,
  Moon,
  Sun
} from "lucide-react";

interface NavbarProps {
  onOpenCommand: () => void;
}

export default function Navbar({ onOpenCommand }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [timeString, setTimeString] = useState("IST");

  useEffect(() => {
    setMounted(true);
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);

    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTimeString(`${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
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
    { label: "Contact", targetId: "contact" },
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

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Status & Time Pill (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2 h-10.5 px-3.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono-code font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span suppressHydrationWarning>{timeString}</span>
          </div>

          {/* Search Button (⌘K) */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10.5 px-2.5 sm:px-3.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/90 border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer group shadow-xs active:scale-95"
            title="Search projects and actions (⌘K or Ctrl+K)"
            aria-label="Search and command menu"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
            <span className="hidden sm:inline text-zinc-600 dark:text-zinc-400 font-mono-code text-xs">
              Search
            </span>
            <kbd className="hidden sm:inline font-mono-code text-[11px] px-1.5 py-0.5 rounded-md bg-zinc-200/90 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button (Hydration Safe) */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10.5 sm:h-10.5 flex items-center justify-center rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/90 border border-black/[0.08] dark:border-white/[0.1] text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-xs active:scale-95"
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

          {/* Resume CTA (Desktop Only - on mobile, thumb-friendly MobileAppDock handles Resume with zero clipping!) */}
          <a
            href={PERSONAL_INFO.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 h-10.5 px-4.5 rounded-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black hover:from-zinc-800 hover:to-zinc-900 text-white dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:hover:from-zinc-100 dark:hover:to-zinc-300 dark:text-black font-semibold text-xs sm:text-sm shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-95 transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
