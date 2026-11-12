import React from "react";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PERSONAL_INFO,
  PROJECTS,
  SKILL_GROUPS,
} from "@/constants";

/**
 * Crisp paper-sheet representation of Arin Joshi's resume for glitch-free
 * Quick Look previews on mobile, tablet, and desktop.
 */
export default function ResumePaperSheet() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-[780px] bg-white text-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] p-5 sm:p-10 space-y-6 text-left print:shadow-none print:border-0 print:p-0">
      {/* Header */}
      <header className="pb-4 border-b border-zinc-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            {PERSONAL_INFO.name}
          </h1>
          <span className="text-xs sm:text-sm font-semibold text-indigo-600">
            Software Engineer
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
          <span>{PERSONAL_INFO.location}</span>
          <span>·</span>
          <a href={PERSONAL_INFO.socials.email} className="hover:text-zinc-950 underline-offset-2 hover:underline">
            {PERSONAL_INFO.email}
          </a>
          <span>·</span>
          <a href={PERSONAL_INFO.socials.phone} className="hover:text-zinc-950">
            {PERSONAL_INFO.phone}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono-code text-zinc-500">
          <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
            LinkedIn
          </a>
          <span>·</span>
          <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
            GitHub
          </a>
          <span>·</span>
          <a href={PERSONAL_INFO.socials.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
            LeetCode
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="space-y-1.5">
        <h2 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-zinc-400">
          Summary
        </h2>
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
          {PERSONAL_INFO.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="space-y-3.5">
        <h2 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-zinc-400">
          Experience
        </h2>
        <div className="space-y-4">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                <div className="text-sm font-bold text-zinc-950">
                  {exp.role} <span className="font-semibold text-indigo-600">@ {exp.company}</span>
                </div>
                <span className="text-[11px] font-mono-code text-zinc-500 shrink-0">
                  {exp.period} · {exp.location}
                </span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs text-zinc-700 leading-relaxed">
                {exp.description.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Key Projects */}
      <section className="space-y-2.5">
        <h2 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-zinc-400">
          Selected Products &amp; Systems
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredProjects.map((proj) => (
            <div key={proj.id} className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-zinc-950">{proj.title}</span>
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono-code text-indigo-600 hover:underline shrink-0"
                  >
                    Live ↗
                  </a>
                )}
              </div>
              <p className="text-[11px] text-zinc-600 leading-snug">
                {proj.description[0]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-2">
        <h2 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-zinc-400">
          Technical Skills
        </h2>
        <div className="space-y-1.5 text-xs text-zinc-700">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="leading-relaxed">
              <strong className="text-zinc-950">{group.category}:</strong>{" "}
              {group.skills.map((s) => s.name).join(", ")}
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="space-y-2 pt-2 border-t border-zinc-200">
        <h2 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-zinc-400">
          Education &amp; Certifications
        </h2>
        <div className="space-y-1 text-xs text-zinc-700">
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
              <span>
                <strong className="text-zinc-950">{edu.degree}</strong> — {edu.institution}
              </span>
              <span className="text-[11px] font-mono-code text-zinc-500 shrink-0">
                {edu.period} ({edu.score})
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-zinc-500 pt-1">
          Certifications: {CERTIFICATIONS.map((c) => c.name).join(" · ")}
        </p>
      </section>
    </div>
  );
}

