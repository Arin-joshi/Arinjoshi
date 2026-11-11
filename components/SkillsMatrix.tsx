"use client";

import React from "react";
import { SKILL_GROUPS } from "@/constants";
import { Cpu, Terminal, Database, Server, Sparkles, Cloud, CheckCircle2 } from "lucide-react";

export default function SkillsMatrix() {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Frontend")) return <Cpu className="w-4 h-4 text-indigo-500" />;
    if (category.includes("Backend")) return <Server className="w-4 h-4 text-emerald-500" />;
    if (category.includes("AI") || category.includes("LLM")) return <Sparkles className="w-4 h-4 text-purple-500" />;
    if (category.includes("Database") || category.includes("Cloud")) return <Database className="w-4 h-4 text-amber-500" />;
    return <Terminal className="w-4 h-4 text-blue-500" />;
  };

  return (
    <section id="stack" className="py-20 sm:py-28 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Technical Stack & System Capabilities
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Rigorous proficiency across modern frontend architectures, real-time event-driven backends, and performance-tuned database systems.
          </p>
        </div>

        {/* 4-Domain Grid (Apple Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Domain Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div className="p-2.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/[0.04] dark:border-white/[0.06] shrink-0">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-100">
                      {group.category}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Skills List with NO TRUNCATION! */}
                <div className="space-y-2.5 pt-1">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-800/40 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/70 border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between gap-3 text-xs transition-colors"
                    >
                      {/* Left: Icon + Full Name + Context Subtitle */}
                      <div className="flex items-start gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100 font-mono-code text-xs sm:text-sm">
                            {skill.name}
                          </div>
                          {skill.context && (
                            <div className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
                              {skill.context}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Proficiency Badge */}
                      <div className="shrink-0">
                        <span className="px-2.5 py-1 rounded-xl bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 font-mono-code text-[10px] font-semibold border border-black/[0.06] dark:border-white/[0.08] shadow-xs whitespace-nowrap">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
