"use client";

import React, { useState, useEffect } from "react";
import { PROJECTS, PERSONAL_INFO } from "@/constants";
import { Project } from "@/types";
import {
  Search,
  Command,
  Code2,
  FileDown,
  Mail,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  MessageSquare,
  Moon,
  Sun,
  Layers,
  Briefcase,
  Cpu,
  GraduationCap,
  X
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenResume?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle if already open or parent controls
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      (p.tagline && p.tagline.toLowerCase().includes(query.toLowerCase())) ||
      (p.architecture &&
        p.architecture.some((tech) =>
          tech.toLowerCase().includes(query.toLowerCase())
        ))
  );

  const navigationCommands = [
    { label: "Go to Experience", targetId: "experience", icon: Briefcase },
    { label: "Go to Flagship Projects", targetId: "projects", icon: Layers },
    { label: "Go to Engineering Skills", targetId: "stack", icon: Cpu },
    { label: "Go to Education & Credentials", targetId: "education", icon: GraduationCap },
    { label: "Go to Contact & WhatsApp", targetId: "contact", icon: Mail },
  ];

  const handleJumpTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    onClose();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const handleToggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-white/95 dark:bg-[#121217]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden animate-in zoom-in-95 duration-150 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar (Apple Spotlight Style) */}
        <div className="flex items-center gap-3.5 px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, technologies (e.g. WebSocket, React), or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none font-medium"
          />
          <span className="hidden sm:inline px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono-code text-zinc-500 border border-black/[0.04] dark:border-white/[0.06]">
            ESC
          </span>
          <button
            onClick={onClose}
            className="sm:hidden p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          
          {/* Matching Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-mono-code font-semibold uppercase tracking-wider text-zinc-400">
                Projects ({filteredProjects.length})
              </div>
              {filteredProjects.slice(0, 5).map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group cursor-pointer"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-500 transition-colors truncate">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono-code truncate">
                      {project.tagline || project.category}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    Case Study
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-mono-code font-semibold uppercase tracking-wider text-zinc-400">
              Actions
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenResume?.();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-indigo-500" />
              <span>Download Resume (PDF)</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-emerald-500" />
              <span>{copied ? "Copied Email!" : `Copy Email (${PERSONAL_INFO.email})`}</span>
            </button>

            <a
              href={PERSONAL_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Code2 className="w-4 h-4 text-amber-500" />
              <span>Open LeetCode Profile</span>
            </a>

            <button
              onClick={handleToggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Toggle Light / Dark Mode</span>
            </button>
          </div>

          {/* Navigation Jumps */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-mono-code font-semibold uppercase tracking-wider text-zinc-400">
              Jump To
            </div>
            {navigationCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <a
                  key={cmd.label}
                  href={`#${cmd.targetId}`}
                  onClick={(e) => handleJumpTo(e, cmd.targetId)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span>{cmd.label}</span>
                </a>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
          <span>Arin Joshi • Software Development Engineer</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}

