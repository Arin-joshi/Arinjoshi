"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";
import {
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingUp,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal / Sheet Container */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-8 space-y-6 text-left animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-auto sm:hidden -mt-2 mb-2" />

        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono-code text-xs font-semibold border border-blue-200/50 dark:border-blue-800/50">
              {project.category}
            </span>
            <div className="flex items-center gap-3">
              {project.logoUrl && (
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-1.5 border border-black/[0.06] dark:border-white/[0.08] shrink-0 shadow-xs flex items-center justify-center">
                  <Image
                    src={project.logoUrl}
                    alt={`${project.title} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
                {project.title}
              </h3>
            </div>
            {project.tagline && (
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {project.tagline}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Image Banner */}
        <div className="relative w-full h-52 sm:h-72 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Key Metrics Strip if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 font-mono-code"
              >
                <div className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {metric.value}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Problem & Solution Breakdown (PM Perspective) */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.problem && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 font-mono-code">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>The Challenge / Bottleneck</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono-code">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>The Engineering Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Implementation Highlights */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-400">
            Key Technical Implementations
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {project.description.map((desc, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Tech Stack Badges */}
        {project.architecture && (
          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technology & Tools</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.architecture.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono-code"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-zinc-100 dark:border-zinc-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors"
          >
            Close Sheet
          </button>
        </div>

      </div>
    </div>
  );
}

