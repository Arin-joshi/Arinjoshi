"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants";
import { Project } from "@/types";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  List,
} from "lucide-react";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

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
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Products &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              High-scale SaaS platforms, proprietary commerce engines, and sub-100ms real-time WebSocket state systems.
            </p>
          </div>

          {/* Controls Bar: Category Filter Pills + View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Segmented Rail */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 overflow-x-auto no-scrollbar shadow-xs">
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

            {/* View Mode Toggle (Grid vs Compact Table) */}
            <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-[#18181f] text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
                title="Visual Bento Grid"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white dark:bg-[#18181f] text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
                title="Compact Directory Table"
                aria-label="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Compact Bento Grid */}
        {viewMode === "grid" ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filteredProjects.map((project) => {
              const primaryMetric = project.metrics?.[0];
              const displayTech = project.architecture?.slice(0, 3) ?? [];

              return (
                <article
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#111116] border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:shadow-[0_12px_32px_-8px_rgba(79,70,229,0.12)] dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] transition-all duration-200 cursor-pointer"
                >
                  {/* Compact 16:9 Image Preview with Subtle Browser Chrome */}
                  <div className="relative w-full aspect-[16/9.5] bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-100 dark:border-zinc-800/80">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay for Crisp Text / Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                    {/* Live Website Button Badge */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950/85 hover:bg-zinc-950 dark:bg-white/95 dark:hover:bg-white text-white dark:text-zinc-950 backdrop-blur-md border border-white/10 shadow-sm text-[11px] font-semibold transition-all hover:scale-105"
                        title={`Open live site for ${project.title}`}
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {/* Primary Quantified Impact Metric Pill (Float on Image) */}
                    {primaryMetric && (
                      <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-[#121217]/95 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] text-zinc-950 dark:text-white shadow-xs text-[11px] font-mono-code font-bold">
                        <TrendingUp className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        <span>{primaryMetric.value}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Logo + Title Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {project.logoUrl && (
                            <div className="relative w-6 h-6 rounded-md overflow-hidden bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 shrink-0 flex items-center justify-center">
                              <Image
                                src={project.logoUrl}
                                alt={`${project.title} logo`}
                                fill
                                className="object-contain p-0.5"
                              />
                            </div>
                          )}
                          <h3 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>

                      {/* Tagline / Value Proposition */}
                      {project.tagline && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    {/* Tech Architecture Stack Chips */}
                    {displayTech.length > 0 && (
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                        {displayTech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-zinc-100/90 dark:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono-code font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.architecture && project.architecture.length > 3 && (
                          <span className="text-[10px] font-mono-code text-zinc-400 px-1">
                            +{project.architecture.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </motion.div>
        ) : (
          /* View Mode 2: High-Density Engineering Table / Directory */
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111116] border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden shadow-xs divide-y divide-zinc-100 dark:divide-zinc-800/80"
          >
            {/* Table Header (Desktop Only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-zinc-50/80 dark:bg-zinc-900/60 text-[11px] font-mono-code font-semibold uppercase tracking-wider text-zinc-500">
              <div className="col-span-5">Project &amp; Focus</div>
              <div className="col-span-3">Primary Impact Metric</div>
              <div className="col-span-3">Core Stack</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Project Rows */}
            {filteredProjects.map((project) => {
              const primaryMetric = project.metrics?.[0];
              const displayTech = project.architecture?.slice(0, 3) ?? [];

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 sm:px-5 sm:py-3.5 hover:bg-zinc-50/90 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer items-center"
                >
                  {/* Col 1: Title & Tagline */}
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    {project.logoUrl ? (
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 shrink-0 flex items-center justify-center p-1">
                        <Image
                          src={project.logoUrl}
                          alt={project.title}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold font-mono-code text-xs flex items-center justify-center shrink-0">
                        {project.title.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-zinc-950 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {project.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Metric */}
                  <div className="col-span-3 flex items-center gap-1.5 text-xs font-mono-code font-bold text-indigo-600 dark:text-indigo-400">
                    {primaryMetric ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span>{primaryMetric.value}</span>
                        <span className="text-[11px] font-normal text-zinc-400 truncate hidden xl:inline">
                          ({primaryMetric.label})
                        </span>
                      </>
                    ) : (
                      <span className="text-zinc-400 font-normal">Production Grade</span>
                    )}
                  </div>

                  {/* Col 3: Tech Stack */}
                  <div className="col-span-3 flex flex-wrap items-center gap-1">
                    {displayTech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono-code text-zinc-600 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Col 4: Links */}
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Live Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
