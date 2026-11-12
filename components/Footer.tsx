"use client";

import React from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/constants";
import { ArrowUp, Code2, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { label: "GitHub", href: PERSONAL_INFO.socials.github, icon: Github, hover: "hover:text-zinc-950 dark:hover:text-white", external: true },
    { label: "LinkedIn", href: PERSONAL_INFO.socials.linkedin, icon: Linkedin, hover: "hover:text-indigo-600 dark:hover:text-indigo-400", external: true },
    { label: "LeetCode", href: PERSONAL_INFO.socials.leetcode, icon: Code2, hover: "hover:text-amber-600 dark:hover:text-amber-400", external: true },
    { label: "WhatsApp", href: PERSONAL_INFO.socials.whatsapp, icon: MessageCircle, hover: "hover:text-emerald-600 dark:hover:text-emerald-400", external: true },
    { label: "Email", href: PERSONAL_INFO.socials.email, icon: Mail, hover: "hover:text-zinc-950 dark:hover:text-white", external: false },
  ];

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#08080c] pt-9 pb-24 md:py-12 text-zinc-500 dark:text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Top Row: Identity + Quick Links + Back to Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-xs shrink-0 bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono-code font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Software Development Engineer · Ahmedabad, India (IST)
              </p>
            </div>
          </div>

          {/* Quick Jump Links (Desktop/Tablet) + Socials & Top */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
            <nav aria-label="Footer navigation" className="hidden lg:flex items-center gap-5 mr-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Unified Social Bar */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    title={s.label}
                    className={`p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${s.hover} transition-colors active:scale-95`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-colors active:scale-95 font-mono-code text-xs font-semibold cursor-pointer shadow-xs"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-5 border-t border-zinc-200/70 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
          <div>
            © {new Date().getFullYear()} Arin Joshi
          </div>
          <div className="text-zinc-400 dark:text-zinc-500">
            Next.js · React 19 · TypeScript · Three.js · Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
