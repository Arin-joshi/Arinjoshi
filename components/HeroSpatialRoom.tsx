"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

export interface ShowcaseItem {
  id: string;
  key: "paassly" | "laavo" | "gyaniastro" | "education";
  tabLabel: string;
  title: string;
  role: string;
  scale: string;
  highlight: string;
  image: string;
  logo?: string;
  tech: string[];
  metric: string;
  liveUrl?: string;
}

interface HeroSpatialRoomProps {
  showcases: ShowcaseItem[];
  onOpenCaseStudy?: (projectId: string) => void;
}

export default function HeroSpatialRoom({
  showcases,
  onOpenCaseStudy,
}: HeroSpatialRoomProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [canHoverTilt, setCanHoverTilt] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const current = showcases[activeIndex] ?? showcases[0];

  useEffect(() => {
    setCanHoverTilt(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Smooth spring-driven 3D room tilt (desktop fine pointers only)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 150, damping: 24 });
  const smoothY = useSpring(rawY, { stiffness: 150, damping: 24 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4.5, -4.5]);
  const roomOffsetX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const roomOffsetY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  // Subtle autonomous showcase cycling when user is not interacting
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcases.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isHovered, showcases.length]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHoverTilt) return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={stageRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full py-4 sm:py-6 select-none"
      style={canHoverTilt && isHovered ? { perspective: "1400px" } : undefined}
    >
      {/* 3D Spatial Room Container */}
      <motion.div
        style={
          canHoverTilt && isHovered
            ? { rotateX, rotateY }
            : undefined
        }
        className="relative mx-auto w-full max-w-[580px]"
      >
        {/* LAYER 0: 3D Architectural Room Chamber & Perspective Floor Grid */}
        <motion.div
          aria-hidden="true"
          style={canHoverTilt ? { x: roomOffsetX, y: roomOffsetY } : undefined}
          className="absolute -inset-2.5 sm:-inset-5 rounded-[1.75rem] sm:rounded-[2rem] bg-gradient-to-br from-white via-zinc-50 to-indigo-50/80 dark:from-zinc-900/90 dark:via-[#101016] dark:to-indigo-950/35 border border-zinc-200/80 dark:border-white/[0.08] shadow-[0_24px_60px_-15px_rgba(79,70,229,0.12)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)] overflow-hidden pointer-events-none"
        >
          {/* Perspective architectural floor grid inside the room */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 opacity-45 dark:opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(99,102,241,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.16) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              transform: "perspective(360px) rotateX(55deg)",
              transformOrigin: "bottom center",
            }}
          />
          {/* Corner depth beams (gives room-corner illusion) */}
          <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-indigo-400/20 via-transparent to-indigo-400/20" />
          <div className="absolute top-0 right-6 w-px h-full bg-gradient-to-b from-indigo-400/20 via-transparent to-indigo-400/20" />
          <div className="absolute top-6 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
        </motion.div>

        {/* LAYER 1: Crisp Main Spatial Product Viewport (No blur-causing preserve-3d/backdrop-blur) */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121218] border border-zinc-200/90 dark:border-white/[0.1] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_54px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top Switcher Bar */}
          <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-zinc-50/90 dark:bg-zinc-900/80 border-b border-zinc-200/70 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Live Products
            </span>

            {/* Interactive Product Tabs */}
            <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] overflow-x-auto no-scrollbar">
              {showcases.map((item, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono-code whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? "text-white dark:text-zinc-950 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="hero-room-tab"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-zinc-950 dark:bg-white shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{item.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 16:9 Animated Product Preview Stage */}
          <div
            onClick={() => onOpenCaseStudy?.(current.id)}
            className="relative w-full aspect-video bg-zinc-950 overflow-hidden cursor-pointer group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 580px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle top vignette for crisp pill contrast */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

            {/* Scale Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950/85 text-white text-[11px] font-mono-code font-semibold backdrop-blur-md border border-white/15 shadow-sm">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{current.scale}</span>
              </span>
            </div>

            {current.liveUrl && (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-zinc-950 text-[11px] font-semibold shadow-sm transition-colors"
                title="Open Live Product"
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Viewport Spec Bar */}
          <div className="p-4 sm:p-5 bg-white dark:bg-[#121218] space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {current.logo && (
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 shrink-0 flex items-center justify-center">
                    <Image
                      src={current.logo}
                      alt={`${current.title} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white truncate">
                    {current.title}
                  </h3>
                  <p className="text-[11px] font-mono-code text-indigo-600 dark:text-indigo-400 truncate">
                    {current.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCaseStudy?.(current.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                <span>Inspect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {current.highlight}
            </p>

            {/* Tech Chips */}
            <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {current.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono-code bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                {current.metric}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

