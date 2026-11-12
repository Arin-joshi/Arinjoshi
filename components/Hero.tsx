"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/constants";
import HeroSpatialCanvas from "@/components/HeroSpatialCanvas";
import HeroSpatialRoom, { ShowcaseItem } from "@/components/HeroSpatialRoom";
import {
  ArrowDown,
  Code2,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Building2,
} from "lucide-react";

interface HeroProps {
  onExploreProjects?: () => void;
  onOpenProjectCaseStudy?: (projectId: string) => void;
  onOpenResume?: () => void;
}

const SHOWCASES: ShowcaseItem[] = [
  {
    id: "proj-paassly",
    key: "paassly",
    tabLabel: "Paassly",
    title: "Paassly",
    role: "Creator & Lead Engineer",
    scale: "Hyperlocal Discovery Engine",
    highlight:
      "Real-time geolocation discovery for street vendors & chai stalls across India with zero app installs.",
    image: "/projects/paassly-v2.png",
    logo: "/logos/paassly-logo.png",
    tech: ["Next.js", "React 19", "TypeScript", "Geolocation API"],
    metric: "<50ms Edge Route",
    liveUrl: "https://paassly.vercel.app",
  },
  {
    id: "proj-laavo",
    key: "laavo",
    tabLabel: "Laavo",
    title: "Laavo",
    role: "Creator & Product Architect",
    scale: "QR Loyalty & Customer Retention",
    highlight:
      "Scan-to-join rewards platform converting offline walk-ins into repeat customers — zero app installs.",
    image: "/projects/laavo-v2.png",
    logo: "/logos/laavo-logo.png",
    tech: ["Next.js", "TypeScript", "QR Matrix", "Supabase"],
    metric: "3x Repeat Visits",
    liveUrl: "https://laavo.vercel.app",
  },
  {
    id: "proj-gyaniastro",
    key: "gyaniastro",
    tabLabel: "GyaniAstro",
    title: "GyaniAstro",
    role: "Lead Full-Stack Engineer",
    scale: "Algorithmic Vedic Astrology",
    highlight:
      "High-precision Vedic ephemeris engine: Janam Kundali, 36-guna Milan & multilingual Jyotishi consultations.",
    image: "/projects/gyaniastro-v2.png",
    logo: "/logos/gyaniastro-logo.png",
    tech: ["React.js", "Node.js", "Ephemeris", "REST APIs"],
    metric: "36-Guna Real-time",
    liveUrl: "https://gyaniastro.arinstechnology.in",
  },
  {
    id: "proj-education-walkthrough",
    key: "education",
    tabLabel: "3,500+ Schools",
    title: "Education Walkthrough",
    role: "Software Engineer @ Aipxperts",
    scale: "3,500+ Schools Worldwide",
    highlight:
      "Classroom walkthrough SaaS empowering instructional leaders across 3,500+ schools with instant feedback.",
    image: "/projects/education-walkthrough.webp",
    tech: ["React.js", "TypeScript", "MySQL", "Node.js"],
    metric: "+40% Query Speed",
    liveUrl: "https://educationwalkthrough.com/",
  },
];

export default function Hero({
  onExploreProjects,
  onOpenProjectCaseStudy,
  onOpenResume,
}: HeroProps) {
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
    <section className="relative pt-20 pb-10 sm:pt-32 sm:pb-20 overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-white dark:from-[#09090b] dark:via-[#0b0b10] dark:to-[#09090b]">
      {/* Real-Time Three.js 3D White Topological Wave & Spatial Room Depth */}
      <HeroSpatialCanvas />

      {/* Soft Architectural Radial Vignette for Crisp Typography Contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.28)_50%,rgba(255,255,255,0.05)_100%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(9,9,11,0.72)_0%,rgba(9,9,11,0.35)_55%,rgba(9,9,11,0.1)_100%)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Executive Narrative & Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-6 w-full min-w-0 space-y-4 sm:space-y-6 text-left"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 shadow-xs backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold font-mono-code text-emerald-700 dark:text-emerald-400">
                Open for SDE Roles • Immediate Joiner
              </span>
            </div>

            {/* Authoritative SDE Headline */}
            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
                Engineering high-scale web platforms &amp; real-time systems.
              </h1>
              <p className="text-[15px] sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-[1.6]">
                Software Development Engineer with <strong className="text-zinc-900 dark:text-white">3+ years</strong> building distributed systems. Creator of <strong className="text-zinc-900 dark:text-white">Paassly</strong>, <strong className="text-zinc-900 dark:text-white">Laavo</strong> &amp; <strong className="text-zinc-900 dark:text-white">GyaniAstro</strong>. Scaled SaaS to <strong className="text-zinc-900 dark:text-white">3,500+ schools</strong> at Aipxperts and <strong className="text-zinc-900 dark:text-white">&lt;100ms</strong> WebSocket engines at NKB PlayTech.
              </p>
            </div>

            {/* Verified Career Credentials (Clean Micro-Badges, Zero Dangling Separators) */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300 font-mono-code">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
                <Building2 className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>Ex-Aipxperts</span>
                <span className="text-[10px] text-zinc-400">(Sep &apos;26)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
                <Building2 className="w-3 h-3 text-zinc-400 shrink-0" />
                <span>Ex-NKB PlayTech</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                <span>Ahmedabad · Remote</span>
              </span>
            </div>

            {/* Primary Actions (Clean 1+2 Grid on Mobile, Inline Flex on Desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-950 text-white dark:from-white dark:to-zinc-100 dark:hover:from-zinc-100 dark:hover:to-zinc-200 dark:text-black font-semibold text-sm shadow-[0_6px_20px_-4px_rgba(0,0,0,0.25)] active:scale-[0.985] transition-all duration-200 cursor-pointer group"
              >
                <span>Explore 11+ Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => onOpenResume?.()}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-zinc-900/95 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/90 dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 font-semibold text-xs sm:text-sm shadow-xs active:scale-[0.985] transition-all duration-200 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-indigo-500" />
                <span>Resume PDF</span>
              </button>

              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs sm:text-sm shadow-[0_6px_18px_-4px_rgba(16,185,129,0.35)] active:scale-[0.985] transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Direct Connect Row */}
            <div className="flex items-center justify-between sm:justify-start gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono-code pt-0.5">
              <span className="text-[11px] text-zinc-400">Direct Channels</span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/95 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/95 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-indigo-600 dark:text-indigo-400 transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/95 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-amber-600 dark:text-amber-400 transition-colors"
                  title="LeetCode"
                  aria-label="LeetCode"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.email}
                  className="p-2 rounded-lg bg-white/95 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="Email Arin"
                  aria-label="Email Arin"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D/4D Spatial Engineering Room */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-6 w-full min-w-0"
          >
            <HeroSpatialRoom
              showcases={SHOWCASES}
              onOpenCaseStudy={onOpenProjectCaseStudy}
            />
          </motion.div>
        </div>

        {/* 4-Metric Bento Stat Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          className="mt-8 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4"
        >
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-xl sm:rounded-2xl p-3.5 sm:p-5 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-xl border border-zinc-200/85 dark:border-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-indigo-300/70 dark:hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="text-xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight font-mono-code">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
