"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/constants";
import { Project } from "@/types";
import {
  ExternalLink,
  Layers,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from "lucide-react";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filterTabs = [
    { id: "All", label: "All Projects" },
    { id: "Enterprise", label: "Enterprise Platforms" },
    { id: "Gaming", label: "Real-Time & Gaming" },
    { id: "Tools", label: "Dev Tools & Utilities" },
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
    <section id="projects" className="py-20 sm:py-28 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineered Systems & Products</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Featured Case Studies & Software
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              From enterprise education infrastructure scaling to 3,500+ schools, to low-latency WebSocket gaming engines and developer productivity utilities.
            </p>
          </div>

          {/* Clean Single-Row Filter Segment (Apple Segmented Style) */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] overflow-x-auto no-scrollbar max-w-full shrink-0 shadow-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono-code whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid (Apple Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group flex flex-col rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 ${
                project.featured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Image Preview Container */}
              <div
                className="relative w-full h-48 sm:h-64 bg-zinc-100 dark:bg-zinc-900 overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-xs font-semibold text-zinc-950 dark:text-white">
                    <Eye className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Inspect Case Study</span>
                  </span>
                </div>

                {/* Category or Official Brand Logo Badge */}
                {project.logoUrl ? (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-[#121217]/95 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] shadow-sm">
                    <div className="relative h-5 w-16 sm:w-20">
                      <Image
                        src={project.logoUrl}
                        alt={`${project.title} logo`}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-xl bg-zinc-950/80 dark:bg-zinc-950/90 text-white backdrop-blur-md text-[10px] font-mono-code font-semibold tracking-wider uppercase border border-white/10">
                      {project.category}
                    </span>
                  </div>
                )}

                {/* Live Link Button */}
                {project.liveUrl && (
                  <div className="absolute top-3 right-3 z-10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/85 hover:bg-black dark:bg-white/95 dark:hover:bg-white text-white dark:text-black backdrop-blur-md transition-all border border-white/10 shadow-sm text-xs font-semibold active:scale-95"
                      title="Open Live Website"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    {project.logoUrl && (
                      <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-1 border border-black/[0.06] dark:border-white/[0.08] shrink-0 shadow-xs flex items-center justify-center">
                        <Image
                          src={project.logoUrl}
                          alt={`${project.title} logo`}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                    )}
                    <h3
                      className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                      onClick={() => onSelectProject(project)}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {project.tagline && (
                    <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400 font-medium">
                      {project.tagline}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description[0]}
                  </p>
                </div>

                {/* Metrics Pill Row if available */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.metrics.slice(0, 2).map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-[11px] font-mono-code text-zinc-700 dark:text-zinc-300"
                      >
                        <TrendingUp className="w-3 h-3 text-indigo-500" />
                        <strong className="font-semibold">{m.value}</strong> {m.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Tech Stack & Details Button */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {(project.architecture || ["React.js", "TypeScript"]).slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer shrink-0"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
