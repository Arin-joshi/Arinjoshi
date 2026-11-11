"use client";

import React, { useState } from "react";
import { EXPERIENCE } from "@/constants";
import { Briefcase, Building2, Calendar, CheckCircle2, ChevronRight, MapPin, Sparkles, TrendingUp } from "lucide-react";

export default function ExperienceSection() {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCE[0].id);

  return (
    <section id="experience" className="py-20 sm:py-28 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record & Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Production Engineering & Impact
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Proven engineering contributions across enterprise SaaS platforms, high-volume marketplaces, and low-latency multiplayer gaming architectures.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-8 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-zinc-300 dark:before:via-zinc-800 before:to-transparent">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={exp.id}
              className="relative flex items-start gap-4 sm:gap-8 group"
            >
              {/* Timeline Marker Dot */}
              <div className="relative z-10 w-6 h-6 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-[#09090b] border-2 border-indigo-500/80 flex items-center justify-center shrink-0 shadow-sm mt-1 sm:mt-0">
                <span className="hidden sm:inline font-mono-code text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  0{idx + 1}
                </span>
                <span className="sm:hidden w-2 h-2 rounded-full bg-indigo-500" />
              </div>

              {/* Experience Card (Apple Glass Standard) */}
              <div className="flex-1 rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-lg transition-all duration-300">
                
                {/* Header: Role, Company, Period */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      {exp.role}
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        @ {exp.company}
                      </span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono-code">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {exp.location}
                      </span>
                      <span>•</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 border border-black/[0.04] dark:border-white/[0.06] text-xs font-mono-code font-semibold text-zinc-800 dark:text-zinc-200 self-start md:self-center shrink-0 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Quantified Metrics Row (PM & Recruiter Highlight) */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 py-3.5">
                    {exp.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/50 text-[11px] font-mono-code font-semibold text-blue-700 dark:text-blue-300 shadow-xs"
                      >
                        <TrendingUp className="w-3 h-3 text-blue-500" />
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                {/* Concrete Responsibilities & Results */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 pt-1 leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Chips for this Role */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono-code text-zinc-400 mr-1.5">
                      Environment:
                    </span>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono-code"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

