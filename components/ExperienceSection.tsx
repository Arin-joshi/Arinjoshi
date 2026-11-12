"use client";

import React, { useState } from "react";
import { EXPERIENCE } from "@/constants";
import { Briefcase, Calendar, ChevronDown, MapPin } from "lucide-react";

export default function ExperienceSection() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="py-11 sm:py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Work &amp; Engineering Impact
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Proven engineering contributions across enterprise SaaS platforms, high-volume marketplaces, and low-latency multiplayer gaming architectures.
          </p>
        </div>

        {/* Experience Timeline (Full-width cards on mobile, numbered timeline on sm+) */}
        <div className="space-y-4 sm:space-y-7 relative sm:before:absolute sm:before:inset-y-0 sm:before:left-7 sm:before:w-px sm:before:bg-gradient-to-b sm:before:from-indigo-500/80 sm:before:via-zinc-200 dark:sm:before:via-zinc-800 sm:before:to-transparent">
          {EXPERIENCE.map((exp, idx) => {
            const isExpanded = !!expandedCards[exp.id];
            const hasExtraBullets = exp.description.length > 2;

            return (
              <div
                key={exp.id}
                className="relative flex items-start gap-0 sm:gap-7 group"
              >
                {/* Desktop / Tablet Timeline Marker */}
                <div className="hidden sm:flex relative z-10 w-14 h-14 rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 items-center justify-center shrink-0 shadow-xs group-hover:border-indigo-400/70 transition-colors">
                  <span className="font-mono-code text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    0{idx + 1}
                  </span>
                </div>

                {/* Experience Card */}
                <article className="flex-1 min-w-0 rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 p-4 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] transition-all duration-200">
                  {/* Top Eyebrow: Index + Company + Period */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="sm:hidden px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono-code text-[10px] font-bold">
                        0{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate">
                        {exp.company}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-800/80 text-[11px] font-mono-code font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Role & Clean Meta Line */}
                  <div className="pt-3 space-y-1.5">
                    <h3 className="text-base sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-mono-code">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span>{exp.location}</span>
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500">{exp.type}</span>
                    </div>
                  </div>

                  {/* Compact Quantified Impact Chips */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3.5">
                      {exp.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/50 text-[11px] font-mono-code font-semibold text-indigo-700 dark:text-indigo-300"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Responsibilities (Compact 2-bullet default on mobile, full on sm+) */}
                  <ul className="space-y-2 text-[13px] sm:text-sm text-zinc-600 dark:text-zinc-300 pt-3.5 leading-relaxed">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 ${
                          i >= 2 && !isExpanded ? "hidden sm:flex" : "flex"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {hasExtraBullets && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      className="sm:hidden mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? "Show less"
                          : `Show ${exp.description.length - 2} more highlights`}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {/* Tech Stack Chips */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-300 text-[10px] sm:text-[11px] font-mono-code"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

