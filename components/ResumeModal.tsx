"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/constants";
import { Download, ExternalLink, FileText, X } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative z-10 w-full max-w-md rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121218] border border-zinc-200/90 dark:border-zinc-800 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.28)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2
                    id="resume-modal-title"
                    className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight"
                  >
                    Download Resume
                  </h2>
                  <p className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                    ArinJoshi.pdf • ATS-Ready
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Includes full production track record across <strong className="text-zinc-900 dark:text-white">3+ years</strong> of SDE experience (Aipxperts, NKB PlayTech), live products, and system architecture highlights.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["React & Next.js", "Node & WebSockets", "3,500+ Schools Scale", "Immediate Joiner"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100/90 dark:bg-zinc-800/70 text-[11px] font-mono-code text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <a
                  href={PERSONAL_INFO.socials.resume}
                  download="Arin_Joshi_Resume.pdf"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>

              <a
                href={PERSONAL_INFO.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Open PDF in new tab instead</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

