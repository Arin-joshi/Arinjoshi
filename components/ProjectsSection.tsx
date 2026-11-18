"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants";
import { Project } from "@/types";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
} from "lucide-react";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filterTabs = [
    { id: "All", label: "All Projects", count: PROJECTS.length },
    {
      id: "Enterprise",
      label: "Enterprise Platforms",
      count: PROJECTS.filter((p) => p.category === "Enterprise & Platform").length,
    },
    {
      id: "Gaming",
      label: "Real-Time & Gaming",
      count: PROJECTS.filter((p) => p.category === "Real-Time & Gaming").length,
    },
    {
      id: "Tools",
      label: "Dev Tools & Utilities",
      count: PROJECTS.filter(
        (p) => p.category === "Dev Tools & Products" || p.category === "Web & Apps"
      ).length,
    },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeTab === "All") return true;
    if (activeTab === "Enterprise") return p.category === "Enterprise & Platform";
    if (activeTab === "Gaming") return p.category === "Real-Time & Gaming";
    if (activeTab === "Tools")
      return p.category === "Dev Tools & Products" || p.category === "Web & Apps";
    return true;
  });

  return (
    <section
      id="projects"
      className="py-12 sm:py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-7 sm:mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Products &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              High-scale SaaS platforms, proprietary commerce engines, and sub-100ms real-time WebSocket state systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-x-auto no-scrollbar shadow-xs shrink-0">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono-code whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
                      className="absolute inset-0 rounded-xl bg-white dark:bg-[#18181f] shadow-xs border border-black/[0.06] dark:border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold"
                        : "bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ultra-Compact Clean Visual Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {filteredProjects.map((project) => {
            const primaryMetric = project.metrics?.[0];
            const displayTech = project.architecture?.slice(0, 4) ?? [];
            const taskSummary =
              project.solution || project.problem || project.description[0];

            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden shadow-sm hover:border-indigo-400/60 dark:hover:border-indigo-500/50 hover:shadow-[0_16px_36px_-8px_rgba(79,70,229,0.18)] dark:hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-pointer aspect-[16/10.5]"
              >
                {/* Base Screenshot */}
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Scrim Gradient for High-Contrast Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

                {/* Permanent Live Website Button Badge (Top-Right) */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950/80 hover:bg-zinc-950 dark:bg-white/95 dark:hover:bg-white text-white dark:text-zinc-950 backdrop-blur-md border border-white/10 shadow-sm text-[11px] font-semibold transition-all hover:scale-105"
                    title={`Open live site for ${project.title}`}
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {/* Place of Old Tag: Project Name & About Directly on Card (Bottom) */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4 flex items-end justify-between gap-3 text-white transition-opacity duration-200 group-hover:opacity-0">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      {project.logoUrl && (
                        <div className="relative w-5 h-5 rounded-md overflow-hidden bg-white/15 backdrop-blur-sm border border-white/20 shrink-0 flex items-center justify-center">
                          <Image
                            src={project.logoUrl}
                            alt={`${project.title} logo`}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                      )}
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate drop-shadow-sm">
                        {project.title}
                      </h3>
                    </div>
                    {project.tagline && (
                      <p className="text-xs text-zinc-300 line-clamp-1 leading-snug drop-shadow-sm">
                        {project.tagline}
                      </p>
                    )}
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-zinc-300 shrink-0 mb-0.5" />
                </div>

                {/* HOVER OVERLAY: Slides down from TOP with ~50-60% glass transparency + task details */}
                <div
                  className="absolute inset-0 z-20 bg-zinc-950/75 dark:bg-black/80 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between text-white transition-all duration-300 ease-out transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  {/* Top: Name, Metric & Task Summary */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                        {project.title}
                      </h4>
                      {primaryMetric && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/30 border border-indigo-400/40 text-[10px] font-mono-code font-bold text-indigo-200 shrink-0">
                          <TrendingUp className="w-3 h-3 text-indigo-300" />
                          <span>{primaryMetric.value}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-200 line-clamp-3 leading-relaxed">
                      {taskSummary}
                    </p>
                  </div>

                  {/* Bottom: Tech Stack Chips & Action */}
                  <div className="space-y-2 pt-2 border-t border-white/15">
                    <div className="flex flex-wrap items-center gap-1">
                      {displayTech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/15 border border-white/10 text-[10px] font-mono-code text-zinc-100 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-300 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Inspect Architecture</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
