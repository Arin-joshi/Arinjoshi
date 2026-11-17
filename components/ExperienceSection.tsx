"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "@/constants";
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Layers,
  Building2,
  ExternalLink,
} from "lucide-react";

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = EXPERIENCE[activeIndex] ?? EXPERIENCE[0];

  const companyBadges: Record<
    string,
    { short: string; accent: string; logo: string; bg?: string }
  > = {
    "exp-aipxperts": {
      short: "AX",
      accent: "from-blue-600 to-indigo-600 text-white",
      logo: "/logos/aipxperts-logo.png",
      bg: "bg-white",
    },
    "exp-nkb": {
      short: "NKB",
      accent: "from-emerald-600 to-teal-600 text-white",
      logo: "/logos/nkb-logo.webp",
      bg: "bg-white",
    },
    "exp-celebal": {
      short: "CT",
      accent: "from-amber-600 to-orange-600 text-white",
      logo: "/logos/celebal-logo.png",
      bg: "bg-white",
    },
  };

  return (
    <section
      id="experience"
      className="py-12 sm:py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Work &amp; Engineering Impact
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              3+ years engineering high-throughput SaaS platforms, micro-frontends, and sub-100ms real-time WebSocket state systems.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 text-xs font-mono-code text-zinc-600 dark:text-zinc-300 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3 Production Tenures</span>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>3,500+ Schools Scaled</span>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Segmented Switcher (< lg) */}
        <div className="lg:hidden mb-5">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-x-auto no-scrollbar">
            {EXPERIENCE.map((exp, idx) => {
              const isActive = activeIndex === idx;
              const badge = companyBadges[exp.id] ?? {
                short: "CO",
                accent: "from-zinc-700 to-zinc-900 text-white",
                logo: "/logos/aipxperts-logo.png",
              };

              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex-1 min-w-[130px] sm:min-w-[160px] py-2 px-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileExpTab"
                      className="absolute inset-0 rounded-xl bg-white dark:bg-[#18181f] shadow-sm border border-black/[0.06] dark:border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 p-0.5 shrink-0 flex items-center justify-center shadow-xs">
                      <Image
                        src={badge.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-0.5"
                        sizes="28px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">
                        {exp.company}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate font-mono-code">
                        {exp.period.split(" - ")[0]}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master-Detail Interactive Executive Console (Grid on Desktop, Unified Card on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Navigation Rail (Desktop Master List: lg:col-span-4) */}
          <div className="hidden lg:flex flex-col lg:col-span-4 space-y-2.5">
            {EXPERIENCE.map((exp, idx) => {
              const isActive = activeIndex === idx;
              const badge = companyBadges[exp.id] ?? {
                short: "CO",
                accent: "from-zinc-700 to-zinc-900 text-white",
                logo: "/logos/aipxperts-logo.png",
              };

              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-[#121217] border-indigo-500/40 dark:border-indigo-400/30 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]"
                      : "bg-zinc-50/80 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {/* Left Active Glow Accent */}
                  {isActive && (
                    <motion.div
                      layoutId="activeExpBar"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-indigo-500 to-blue-600"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 p-1 shrink-0 flex items-center justify-center shadow-xs">
                        <Image
                          src={badge.logo}
                          alt={exp.company}
                          fill
                          className="object-contain p-0.5"
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-zinc-950 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {exp.company}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {exp.role}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400 translate-x-0.5"
                          : "text-zinc-400 dark:text-zinc-600 group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>

                  {/* Period & Location / Website Footer */}
                  <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>{exp.period}</span>
                    </span>
                    {exp.website ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(exp.website, "_blank", "noopener,noreferrer");
                        }}
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        title={`Open ${exp.company} website`}
                      >
                        <span>Website</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    ) : (
                      <span className="truncate max-w-[120px]">
                        {exp.location?.split(",")[0]}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Quick Summary Card at Bottom of Rail */}
            <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/70 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                  Engineering Scope:
                </span>{" "}
                Enterprise SaaS, real-time gaming engines &amp; micro-frontends.
              </div>
            </div>
          </div>

          {/* Right Detail Stage (Executive Workstation: lg:col-span-8) */}
          <div className="lg:col-span-8 w-full min-w-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeExp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="h-full rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111116] border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_6px_32px_-6px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Role & Company Branding with Logo + Live Website Link */}
                  <div className="flex flex-wrap items-start justify-between gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {activeExp.website ? (
                        <a
                          href={activeExp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-indigo-400/80 p-1.5 shrink-0 flex items-center justify-center shadow-xs transition-transform hover:scale-105 cursor-pointer"
                          title={`Visit ${activeExp.company} website`}
                        >
                          <Image
                            src={
                              companyBadges[activeExp.id]?.logo ??
                              "/logos/aipxperts-logo.png"
                            }
                            alt={activeExp.company}
                            fill
                            className="object-contain p-1"
                            sizes="56px"
                          />
                        </a>
                      ) : (
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-1.5 shrink-0 flex items-center justify-center shadow-xs">
                          <Image
                            src={
                              companyBadges[activeExp.id]?.logo ??
                              "/logos/aipxperts-logo.png"
                            }
                            alt={activeExp.company}
                            fill
                            className="object-contain p-1"
                            sizes="56px"
                          />
                        </div>
                      )}
                      <div className="space-y-1 min-w-0">
                        <div className="inline-flex items-center gap-2 flex-wrap">
                          {activeExp.website ? (
                            <a
                              href={activeExp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono-code uppercase tracking-wider hover:underline group"
                            >
                              <span>{activeExp.company}</span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          ) : (
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono-code uppercase tracking-wider">
                              {activeExp.company}
                            </span>
                          )}
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {activeExp.type}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                          {activeExp.role}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5 font-mono-code text-xs shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 font-medium border border-zinc-200/70 dark:border-zinc-700/70">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{activeExp.period}</span>
                        </div>
                        {activeExp.website && (
                          <a
                            href={activeExp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 font-semibold transition-all group"
                            title={`Visit ${activeExp.company} website`}
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>{activeExp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantified Impact KPI Bento Strip */}
                  {activeExp.metrics && activeExp.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 py-4">
                      {activeExp.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-left"
                        >
                          <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <span className="font-mono-code text-xs font-bold text-indigo-950 dark:text-indigo-200 leading-snug">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* High-Impact Engineering Contributions */}
                  <div className="pt-2 space-y-2.5">
                    <div className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Core Technical Contributions
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-[13px] sm:leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {activeExp.description.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Chip Bar */}
                {activeExp.skills && activeExp.skills.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2 text-[11px] font-mono-code text-zinc-400 mb-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Technologies &amp; Protocols:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeExp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 text-xs font-mono-code font-medium hover:border-indigo-400/60 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
