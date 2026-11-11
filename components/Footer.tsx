"use client";

import React from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/constants";
import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.06] bg-zinc-50/80 dark:bg-[#07070a] pt-12 pb-28 md:pb-14 text-zinc-500 dark:text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Identity & Status */}
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-zinc-950 dark:text-zinc-100 flex items-center justify-center md:justify-start gap-2.5 text-sm">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-black/[0.1] dark:border-white/[0.15] shadow-xs shrink-0 bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-zinc-400">•</span>
              <span className="font-mono-code font-normal text-blue-600 dark:text-blue-400">
                Software Development Engineer
              </span>
            </div>
            <p className="font-mono-code text-[11px] text-zinc-500">
              Ahmedabad, Gujarat, India (IST • UTC+5:30) • Open to Global & Remote Opportunities
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:text-zinc-950 dark:hover:text-white transition-all active:scale-95 shadow-xs"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:text-blue-500 transition-all active:scale-95 shadow-xs"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:text-emerald-500 transition-all active:scale-95 shadow-xs"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.email}
              className="p-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:text-zinc-950 dark:hover:text-white transition-all active:scale-95 shadow-xs"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-all active:scale-95 font-mono-code text-xs cursor-pointer shadow-xs"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Colophon & Stack Spec */}
        <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-code text-zinc-400">
          <div>
            Built with Next.js (App Router) • React 19 • TypeScript • Tailwind CSS • Framer Motion
          </div>
          <div>
            © {new Date().getFullYear()} Arin Joshi. Designed for production performance & craft.
          </div>
        </div>

      </div>
    </footer>
  );
}
