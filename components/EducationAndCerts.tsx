"use client";

import React from "react";
import { EDUCATION, CERTIFICATIONS } from "@/constants";
import { GraduationCap, Award, CheckCircle2, Calendar, MapPin } from "lucide-react";

export default function EducationAndCerts() {
  return (
    <section id="education" className="py-20 sm:py-28 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor & Certifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Education & Validated Credentials
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Foundational computer science degree complemented by verified credentials in enterprise frontend systems, databases, and algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Education Column */}
          <div className="lg:col-span-7 w-full min-w-0 space-y-4">
            <h3 className="text-sm font-mono-code font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>Degree & Academics</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {edu.degree}
                    </h4>
                    {edu.score && (
                      <span className="inline-block self-start sm:self-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono-code text-xs font-semibold border border-emerald-200/50 dark:border-emerald-800/50">
                        {edu.score}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    {edu.institution}
                  </p>

                  <div className="text-xs font-mono-code text-zinc-400 flex items-center gap-1.5 pt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>

                  {edu.highlights && (
                    <ul className="pt-2 space-y-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-5 w-full min-w-0 space-y-4">
            <h3 className="text-sm font-mono-code font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Verified Certifications</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] p-4 sm:p-4.5 shadow-xs flex items-center justify-between gap-3 hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {cert.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono-code truncate">
                      {cert.issuer}
                    </div>
                  </div>

                  <div className="shrink-0 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 border border-blue-200/40 dark:border-blue-800/40">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

