"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/constants";
import {
  ArrowDown,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Building2,
  ExternalLink,
  TrendingUp,
  Sparkles,
  Rocket
} from "lucide-react";

interface HeroProps {
  onExploreProjects?: () => void;
  onOpenProjectCaseStudy?: (projectId: string) => void;
}

export default function Hero({ onExploreProjects, onOpenProjectCaseStudy }: HeroProps) {
  // Interactive Showcase Tab State (Paassly, Laavo, GyaniAstro, Education Walkthrough)
  const [activeShowcase, setActiveShowcase] = useState<"paassly" | "laavo" | "gyaniastro" | "education">("paassly");

  const showcases: Record<string, {
    id: string;
    title: string;
    role: string;
    scale: string;
    highlight: string;
    image: string;
    logo?: string;
    tech: string[];
    metric: string;
    liveUrl?: string;
  }> = {
    paassly: {
      id: "proj-paassly",
      title: "Paassly",
      role: "Creator & Lead Engineer",
      scale: "Hyperlocal Discovery Engine",
      highlight: "Real-time geolocation discovery for street vendors & chai stalls across India with zero app installs.",
      image: "/projects/paassly-v2.png",
      logo: "/logos/paassly-logo.png",
      tech: ["Next.js", "React 19", "TypeScript", "Geolocation API", "Tailwind CSS"],
      metric: "Live Geolocation Discovery",
      liveUrl: "https://paassly.vercel.app",
    },
    laavo: {
      id: "proj-laavo",
      title: "Laavo",
      role: "Creator & Product Architect",
      scale: "QR Loyalty & Customer Retention",
      highlight: "Scan-to-join rewards platform converting offline walk-ins into repeat customers — zero app installs.",
      image: "/projects/laavo-v2.png",
      logo: "/logos/laavo-logo.png",
      tech: ["Next.js", "TypeScript", "QR Matrix", "Supabase", "Tailwind CSS"],
      metric: "3x Repeat Customer Visits",
      liveUrl: "https://laavo.vercel.app",
    },
    gyaniastro: {
      id: "proj-gyaniastro",
      title: "GyaniAstro",
      role: "Lead Full-Stack Engineer",
      scale: "Algorithmic Vedic Astrology",
      highlight: "High-precision Vedic ephemeris engine: Janam Kundali, 36-guna Milan & multilingual Jyotishi consultations.",
      image: "/projects/gyaniastro-v2.png",
      logo: "/logos/gyaniastro-logo.png",
      tech: ["React.js", "Node.js", "Ephemeris Algorithms", "REST APIs"],
      metric: "Vedic Ephemeris Accuracy",
      liveUrl: "https://gyaniastro.arinstechnology.in",
    },
    education: {
      id: "proj-education-walkthrough",
      title: "Education Walkthrough",
      role: "Software Engineer @ Aipxperts",
      scale: "3,500+ Schools Worldwide",
      highlight: "Classroom walkthrough SaaS empowering instructional leaders across 3,500+ schools with instant feedback.",
      image: "/projects/education-walkthrough.webp",
      tech: ["React.js", "TypeScript", "MySQL", "Node.js", "REST APIs"],
      metric: "+40% Query Optimization",
      liveUrl: "https://educationwalkthrough.com/",
    },
  };

  const current = showcases[activeShowcase];

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreProjects) {
      onExploreProjects();
      return;
    }
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#projects");
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-[#09090b] dark:via-[#0c0c10] dark:to-[#09090b]">
      {/* Precision ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] ambient-glow pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Executive Narrative & Positioning */}
          <div className="w-full min-w-0 space-y-6 text-left">
            
            {/* High-Signal Availability Pill (No redundant name/photo duplication) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold font-mono-code text-emerald-700 dark:text-emerald-400">
                Open for SDE Roles • Immediate Joiner
              </span>
            </div>

            {/* Authoritative SDE Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
                Engineering high-scale web platforms &amp; real-time systems.
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
                Software Development Engineer with <strong>3+ years</strong> experience building distributed systems. Creator of <strong>Paassly</strong>, <strong>Laavo</strong> &amp; <strong>GyaniAstro</strong>. Previously scaled enterprise SaaS to <strong>3,500+ schools</strong> at Aipxperts and built real-time WebSocket gaming engines (<strong>&lt;100ms</strong>) at NKB PlayTech.
              </p>
            </div>

            {/* Verified Career Credentials (Updated with Aipxperts Sep 30 & Immediate Availability) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono-code pt-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Ex-Aipxperts <span className="text-[10px] text-zinc-400">(Sep 2026)</span></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Ex-NKB PlayTech</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Ahmedabad • Open to Remote</span>
              </div>
            </div>

            {/* Guaranteed Solid High-Contrast Apple-Grade Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-950 text-white dark:from-white dark:to-zinc-100 dark:hover:from-zinc-100 dark:hover:to-zinc-200 dark:text-black font-semibold text-sm shadow-[0_2px_10px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[0_2px_14px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-[0.985] transition-all duration-200 cursor-pointer group"
              >
                <span>Explore 11+ Projects &amp; Products</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 font-semibold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] active:scale-[0.985] transition-all duration-200 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-blue-500" />
                <span>Resume (PDF)</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-[0_2px_10px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:scale-[0.985] transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Direct Connect Row */}
            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono-code pt-1">
              <span className="text-zinc-400">Direct Channels:</span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-indigo-600 dark:text-indigo-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                title="Email Arin"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Live Interactive Product & Platform Canvas */}
          <div className="w-full min-w-0">
            <div className="rounded-3xl bg-white/90 dark:bg-[#121217]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300 hover:shadow-2xl">
              
              {/* Top Browser Bezel & Live Switcher Tabs (With Paassly, Laavo, GyaniAstro) */}
              <div className="p-3.5 bg-zinc-100/80 dark:bg-zinc-900/80 border-b border-black/[0.06] dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono-code text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                    Live Products
                  </span>
                </div>

                {/* Tab Switcher Pills */}
                <div className="flex items-center gap-1 bg-white/90 dark:bg-zinc-950/90 p-1 rounded-xl border border-black/[0.06] dark:border-white/[0.08] text-[10px] font-mono-code overflow-x-auto no-scrollbar shadow-xs">
                  <button
                    onClick={() => setActiveShowcase("paassly")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeShowcase === "paassly"
                        ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    Paassly
                  </button>
                  <button
                    onClick={() => setActiveShowcase("laavo")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeShowcase === "laavo"
                        ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    Laavo
                  </button>
                  <button
                    onClick={() => setActiveShowcase("gyaniastro")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeShowcase === "gyaniastro"
                        ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    GyaniAstro
                  </button>
                  <button
                    onClick={() => setActiveShowcase("education")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeShowcase === "education"
                        ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    3,500+ Schools
                  </button>
                </div>
              </div>

              {/* Showcase Image & Live Platform Details */}
              <div className="relative w-full h-56 sm:h-64 bg-zinc-900 overflow-hidden group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
                
                {/* Metric Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-md bg-zinc-950/90 text-white text-xs font-mono-code font-bold backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{current.scale}</span>
                  </span>
                </div>

                {current.liveUrl && (
                  <div className="absolute top-3 right-3">
                    <a
                      href={current.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-zinc-950/90 text-white hover:bg-indigo-600 transition-colors backdrop-blur-md border border-white/10 block shadow-lg"
                      title="Open Live Product"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Card Meta & Engineering Specs */}
              <div className="p-5 space-y-3 bg-white dark:bg-[#121217]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {current.logo && (
                      <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-1 border border-black/[0.06] dark:border-white/[0.08] shrink-0 shadow-xs flex items-center justify-center">
                        <Image
                          src={current.logo}
                          alt={`${current.title} logo`}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                        <span>{current.title}</span>
                        {current.liveUrl && (
                          <a
                            href={current.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-mono-code flex items-center gap-0.5"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </h3>
                      <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400 font-semibold">
                        {current.role}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-mono-code font-bold border border-emerald-200/60 dark:border-emerald-800/60 shrink-0 shadow-xs">
                    {current.metric}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {current.highlight}
                </p>

                {/* Tech Chips */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono-code text-zinc-400 mr-1">Stack:</span>
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Metric Bento Stat Strip (Apple Glass Cards) */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-3xl p-5 sm:p-6 bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 text-left"
            >
              <div className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight font-mono-code">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
