"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/constants";
import ResumePaperSheet from "@/components/ResumePaperSheet";
import { Download, ExternalLink, FileText, Maximize2, X } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<"sheet" | "pdf">("sheet");

  useEffect(() => {
    if (!isOpen) return;

    // Default to native PDF embed on desktop/tablet where browser PDF viewers shine,
    // and crisp HTML paper sheet on mobile where inline PDF iframes often glitch.
    setViewMode(window.innerWidth >= 768 ? "pdf" : "sheet");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Apple Quick Look Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/55 backdrop-blur-sm"
          />

          {/* macOS / Apple Quick Look Window */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl h-[92dvh] sm:h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-zinc-100 dark:bg-[#141419] border border-black/[0.08] dark:border-white/[0.1] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Top Apple Preview Toolbar */}
            <div className="bg-white/95 dark:bg-[#18181f]/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800 shrink-0">
              {/* Mobile Drag Handle */}
              <div className="sm:hidden pt-2 flex justify-center">
                <span className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <div className="px-4 py-2.5 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                {/* Left: File Identity (+ Mobile Close Button) */}
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <h2
                        id="resume-modal-title"
                        className="text-sm font-bold text-zinc-950 dark:text-white truncate"
                      >
                        ArinJoshi.pdf
                      </h2>
                      <p className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400">
                        Resume · ATS-Ready
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close resume preview"
                    className="sm:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Center: Segmented View Switcher (Full-width single-line on mobile) */}
                <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode("sheet")}
                    className={`px-3 py-1.5 sm:py-1 rounded-lg text-xs sm:text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      viewMode === "sheet"
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    Quick Look
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("pdf")}
                    className={`px-3 py-1.5 sm:py-1 rounded-lg text-xs sm:text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      viewMode === "pdf"
                        ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    PDF File
                  </button>
                </div>

                {/* Right: Desktop Actions */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <Link
                    href="/resume"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                    title="Open dedicated full-page preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full Page</span>
                  </Link>

                  <a
                    href={PERSONAL_INFO.socials.resume}
                    download="Arin_Joshi_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close resume preview"
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Canvas (Single Scrollbar: PDF scrolls internally, Quick Look scrolls container) */}
            <div
              className={`flex-1 min-h-0 ${
                viewMode === "pdf"
                  ? "overflow-hidden p-2 sm:p-4 flex flex-col"
                  : "overflow-y-auto overscroll-contain p-3 sm:p-6"
              }`}
            >
              {viewMode === "pdf" ? (
                <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col">
                  <iframe
                    src={`${PERSONAL_INFO.socials.resume}#toolbar=0&navpanes=0&view=FitH`}
                    title="Arin Joshi Resume PDF Preview"
                    className="w-full flex-1 min-h-0 border-0"
                  />
                  <div className="hidden sm:flex px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/80 dark:border-zinc-800 items-center justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>Having trouble viewing the embedded PDF?</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setViewMode("sheet")}
                        className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Switch to Quick Look
                      </button>
                      <a
                        href={PERSONAL_INFO.socials.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-200 hover:underline"
                      >
                        <span>Open Tab</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <ResumePaperSheet />
              )}
            </div>

            {/* Mobile Bottom Action Bar */}
            <div className="sm:hidden px-3.5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-white/95 dark:bg-[#18181f]/95 border-t border-zinc-200/80 dark:border-zinc-800 grid grid-cols-3 gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <a
                href={PERSONAL_INFO.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold whitespace-nowrap"
              >
                <span>Open PDF</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
              <a
                href={PERSONAL_INFO.socials.resume}
                download="Arin_Joshi_Resume.pdf"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Download</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
