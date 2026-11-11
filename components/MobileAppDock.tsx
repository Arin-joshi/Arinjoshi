"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  Layers,
  MessageCircle,
  FileDown
} from "lucide-react";
import { PERSONAL_INFO } from "@/constants";

export default function MobileAppDock() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "experience", "projects", "contact"];

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 3) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDockClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", window.location.pathname);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const dockItems = [
    { id: "hero", label: "Home", targetId: "hero", icon: Home },
    { id: "experience", label: "Work", targetId: "experience", icon: Briefcase },
    { id: "projects", label: "Projects", targetId: "projects", icon: Layers },
    { id: "contact", label: "Contact", targetId: "contact", icon: MessageCircle },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-sm mx-auto mb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation dock"
    >
      <div className="flex items-center justify-between gap-1 p-1.5 rounded-3xl bg-white/95 dark:bg-[#111116]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.targetId}`}
              onClick={(e) => handleDockClick(e, item.targetId)}
              className={`relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-colors duration-200 active:scale-95 z-10 ${
                isActive
                  ? "text-white dark:text-zinc-950 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockIndicator"
                  className="absolute inset-0 rounded-2xl bg-zinc-950 dark:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.25)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="text-[10px] font-mono-code font-medium mt-1 tracking-tight">
                {item.label}
              </span>
            </a>
          );
        })}

        {/* Clean, Uniform Resume Tab (Matching other tabs without heavy blob button) */}
        <a
          href={PERSONAL_INFO.socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150 active:scale-95 z-10"
          title="Download Resume (PDF)"
        >
          <FileDown className="w-4.5 h-4.5 shrink-0" />
          <span className="text-[10px] font-mono-code font-medium mt-1 tracking-tight">
            Resume
          </span>
        </a>
      </div>
    </nav>
  );
}
