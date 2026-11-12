"use client";

import React, { useState } from "react";
import { SKILL_GROUPS } from "@/constants";
import { Bot, Cpu, Terminal, Database, Server, LayoutGrid } from "lucide-react";

const DOMAIN_META: Record<string, { short: string; preview: string; accent: string }> = {
  "Frontend & Architecture": {
    short: "Frontend & UI",
    preview: "React 19 · Next.js · TypeScript",
    accent: "text-indigo-600 dark:text-indigo-400",
  },
  "Backend & Real-Time Protocols": {
    short: "Backend & Sockets",
    preview: "Node.js · WebSockets · Python",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  "AI Engineering, LLMs & Tooling": {
    short: "AI & LLM Tooling",
    preview: "Claude · Cursor · Gemini API",
    accent: "text-purple-600 dark:text-purple-400",
  },
  "Databases & Cloud Infrastructure": {
    short: "Data & Cloud",
    preview: "PostgreSQL · Supabase · AWS",
    accent: "text-amber-600 dark:text-amber-400",
  },
  "System Design & Engineering Rigor": {
    short: "System Design",
    preview: "DSA · Distributed Arch · CI/CD",
    accent: "text-blue-600 dark:text-blue-400",
  },
};

function getCategoryIcon(category: string, className = "w-4 h-4") {
  if (category.includes("Frontend")) return <Cpu className={`${className} text-indigo-500`} />;
  if (category.includes("Backend")) return <Server className={`${className} text-emerald-500`} />;
  if (category.includes("AI") || category.includes("LLM")) return <Bot className={`${className} text-purple-500`} />;
  if (category.includes("Database") || category.includes("Cloud")) return <Database className={`${className} text-amber-500`} />;
  return <Terminal className={`${className} text-blue-500`} />;
}

function getLevelSignal(level: string): { bars: number; barColor: string } {
  switch (level) {
    case "Mastered":
    case "Production Specialist":
    case "Specialist":
      return { bars: 4, barColor: "bg-indigo-600 dark:bg-indigo-400" };
    case "Strong":
    case "Advanced":
    case "Experienced":
      return { bars: 3, barColor: "bg-emerald-600 dark:bg-emerald-400" };
    default:
      return { bars: 2, barColor: "bg-amber-500 dark:bg-amber-400" };
  }
}

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>(SKILL_GROUPS[0].category);

  const isAllView = activeCategory === "ALL";
  const activeGroup = SKILL_GROUPS.find((g) => g.category === activeCategory) || SKILL_GROUPS[0];
  const totalSkills = SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <section id="stack" className="py-11 sm:py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Skills &amp; Capabilities
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Production-tested stack across frontend architecture, low-latency backends, AI workflows, and cloud data systems.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs font-mono-code text-zinc-600 dark:text-zinc-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{SKILL_GROUPS.length} Domains · {totalSkills} Technologies</span>
          </div>
        </div>

        {/* Unified Interactive Stack Console */}
        <div className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Domain Selector Rail (2-col Mobile, 3-col Tablet, Vertical Sidebar Desktop) */}
            <div className="lg:col-span-4 bg-zinc-50/70 dark:bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/80 p-3 sm:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5 sm:gap-2">
                {SKILL_GROUPS.map((group) => {
                  const isActive = activeCategory === group.category;
                  const meta = DOMAIN_META[group.category];
                  return (
                    <button
                      key={group.category}
                      type="button"
                      onClick={() => setActiveCategory(group.category)}
                      className={`group text-left px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer border ${
                        isActive
                          ? "bg-white dark:bg-zinc-800/90 border-zinc-200/90 dark:border-zinc-700 shadow-xs"
                          : "bg-transparent border-transparent hover:bg-white/60 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="shrink-0">{getCategoryIcon(group.category, "w-3.5 h-3.5")}</span>
                          <span
                            className={`text-xs sm:text-sm font-semibold truncate ${
                              isActive
                                ? "text-zinc-950 dark:text-white"
                                : "text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            {meta?.short ?? group.category}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded-md shrink-0 ${
                            isActive
                              ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold"
                              : "text-zinc-400 dark:text-zinc-500"
                          }`}
                        >
                          {group.skills.length}
                        </span>
                      </div>
                      {meta?.preview && (
                        <p className="hidden sm:block mt-1 pl-5.5 text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400 truncate">
                          {meta.preview}
                        </p>
                      )}
                    </button>
                  );
                })}

                {/* Full Matrix Toggle */}
                <button
                  type="button"
                  onClick={() => setActiveCategory(isAllView ? SKILL_GROUPS[0].category : "ALL")}
                  className={`text-left px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer border ${
                    isAllView
                      ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-xs"
                      : "bg-transparent border-dashed border-zinc-300/80 dark:border-zinc-700/80 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold truncate">
                        Full Stack Index
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded-md shrink-0 ${
                        isAllView
                          ? "bg-white/15 dark:bg-zinc-900/15"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {totalSkills}
                    </span>
                  </div>
                  <p
                    className={`hidden sm:block mt-1 pl-5.5 text-[11px] font-mono-code truncate ${
                      isAllView ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    Compare all domains at once
                  </p>
                </button>
              </div>
            </div>

            {/* Right / Main Capability Canvas */}
            <div className="lg:col-span-8 p-4 sm:p-6">
              {!isAllView ? (
                <div className="space-y-5">
                  {/* Active Domain Header */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/70 shrink-0">
                        {getCategoryIcon(activeGroup.category, "w-4 h-4")}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                          {activeGroup.category}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {activeGroup.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clean 2-Column Spec Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {activeGroup.skills.map((skill) => {
                      const signal = getLevelSignal(skill.level);
                      return (
                        <div
                          key={skill.name}
                          className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between gap-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs sm:text-sm font-semibold font-mono-code text-zinc-900 dark:text-zinc-100 leading-snug">
                              {skill.name}
                            </span>

                            {/* 4-Bar Signal Proficiency Meter */}
                            <div
                              className="flex items-end gap-0.5 shrink-0 pt-0.5"
                              title={skill.level}
                              aria-label={`${skill.name} proficiency: ${skill.level}`}
                            >
                              {[1, 2, 3, 4].map((step) => (
                                <span
                                  key={step}
                                  className={`w-1 rounded-full ${
                                    step === 1
                                      ? "h-1.5"
                                      : step === 2
                                      ? "h-2"
                                      : step === 3
                                      ? "h-2.5"
                                      : "h-3.5"
                                  } ${
                                    step <= signal.bars
                                      ? signal.barColor
                                      : "bg-zinc-200 dark:bg-zinc-700/70"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 text-[11px]">
                            <span className="text-zinc-500 dark:text-zinc-400 truncate">
                              {skill.context}
                            </span>
                            <span className="font-mono-code font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Compact Full Stack Index (All 30 Technologies in Minimal Space) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div>
                      <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                        Complete Stack Index
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Click any domain on the rail for detailed production context.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SKILL_GROUPS.map((group) => (
                      <div
                        key={group.category}
                        className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80 space-y-2.5"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveCategory(group.category)}
                          className="flex items-center gap-2 text-left cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          {getCategoryIcon(group.category, "w-3.5 h-3.5")}
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            {DOMAIN_META[group.category]?.short ?? group.category}
                          </span>
                        </button>
                        <div className="flex flex-wrap gap-1.5">
                          {group.skills.map((skill) => (
                            <span
                              key={skill.name}
                              title={`${skill.level}${skill.context ? ` — ${skill.context}` : ""}`}
                              className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/70 text-[11px] font-mono-code text-zinc-700 dark:text-zinc-300"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
