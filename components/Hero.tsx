"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/constants";
import HeroSpatialCanvas from "@/components/HeroSpatialCanvas";
import {
  Code2,
  FileDown,
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
  Building2,
} from "lucide-react";

interface HeroProps {
  onExploreProjects?: () => void;
  onOpenProjectCaseStudy?: (projectId: string) => void;
  onOpenResume?: () => void;
}

export default function Hero({
  onOpenResume,
}: HeroProps) {

  return (
    <section className="relative pt-20 pb-10 sm:pt-32 sm:pb-20 overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-white dark:from-[#09090b] dark:via-[#0b0b10] dark:to-[#09090b]">
      {/* Real-Time Three.js 3D White Topological Wave & Spatial Room Depth */}
      <HeroSpatialCanvas />

      {/* Soft Architectural Radial Vignette for Crisp Typography Contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.28)_50%,rgba(255,255,255,0.05)_100%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(9,9,11,0.72)_0%,rgba(9,9,11,0.35)_55%,rgba(9,9,11,0.1)_100%)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Hero Container */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full min-w-0 space-y-4 sm:space-y-6 text-left"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 shadow-xs backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold font-mono-code text-emerald-700 dark:text-emerald-400">
                Open for SDE Roles • Immediate Joiner
              </span>
            </div>

            {/* Authoritative SDE Headline */}
            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
                Engineering high-scale web platforms &amp; real-time systems.
              </h1>
              <p className="text-[15px] sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-[1.6]">
                Software Development Engineer with <strong className="text-zinc-900 dark:text-white">3+ years</strong> building distributed systems. Creator of <strong className="text-zinc-900 dark:text-white">Paassly</strong>, <strong className="text-zinc-900 dark:text-white">Laavo</strong> &amp; <strong className="text-zinc-900 dark:text-white">GyaniAstro</strong>. Scaled SaaS to <strong className="text-zinc-900 dark:text-white">3,500+ schools</strong> at Aipxperts and <strong className="text-zinc-900 dark:text-white">&lt;100ms</strong> WebSocket engines at NKB PlayTech.
              </p>
            </div>

            {/* Verified Career Credentials (Clean Micro-Badges, Zero Dangling Separators) */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300 font-mono-code">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
                <Building2 className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>Ex-Aipxperts</span>
                <span className="text-[10px] text-zinc-400">(Sep &apos;26)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
                <Building2 className="w-3 h-3 text-zinc-400 shrink-0" />
                <span>Ex-NKB PlayTech</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                <span>Ahmedabad · Remote</span>
              </span>
            </div>

            {/* Primary Actions: Direct Social Reach Icons + Full Colorful Resume Button */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Direct Channels Icon Group */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#18181f] border border-zinc-200/70 dark:border-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105 active:scale-95"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#18181f] border border-zinc-200/70 dark:border-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105 active:scale-95"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>

                {/* LeetCode */}
                <a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#18181f] border border-zinc-200/70 dark:border-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105 active:scale-95"
                  title="LeetCode Profile"
                  aria-label="LeetCode Profile"
                >
                  <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>

                {/* WhatsApp */}
                <a
                  href={PERSONAL_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#18181f] border border-zinc-200/70 dark:border-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105 active:scale-95"
                  title="WhatsApp Chat"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>
              </div>

              {/* Full Vibrant Colorful Resume Button */}
              <button
                type="button"
                onClick={() => onOpenResume?.()}
                className="inline-flex items-center justify-center gap-2.5 h-12 sm:h-[50px] px-6 sm:px-7 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base shadow-[0_8px_24px_-4px_rgba(79,70,229,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] active:scale-[0.98] transition-all duration-200 cursor-pointer group"
              >
                <FileDown className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Resume PDF</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4-Metric Bento Stat Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          className="mt-8 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4"
        >
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-xl sm:rounded-2xl p-3.5 sm:p-5 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-xl border border-zinc-200/85 dark:border-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-indigo-300/70 dark:hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="text-xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight font-mono-code">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
