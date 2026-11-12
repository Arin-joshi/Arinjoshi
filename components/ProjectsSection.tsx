"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/constants";
import { Project } from "@/types";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
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
    <section id="projects" className="py-11 sm:py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-7 sm:mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Products &amp; Case Studies
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

        {/* Bento Grid: 2-up for flagship products, 3-up for tools & utilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group flex flex-col rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer ${
                project.featured ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              {/* 16:9 Product Preview */}
              <div className="relative w-full aspect-video bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-100 dark:border-zinc-800/80">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  sizes={
                    project.featured
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950/80 hover:bg-zinc-950 dark:bg-white/95 dark:hover:bg-white text-white dark:text-zinc-950 backdrop-blur-sm border border-white/10 shadow-sm text-[11px] font-medium transition-colors"
                    title="Open Live Website"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Compact Header-Only Footer */}
              <div className="px-4 py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {project.logoUrl && (
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/80 shrink-0 flex items-center justify-center">
                      <Image
                        src={project.logoUrl}
                        alt={`${project.title} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.tagline && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {project.tagline}
                      </p>
                    )}
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
