"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/constants";
import ResumePaperSheet from "@/components/ResumePaperSheet";
import { ArrowLeft, Download, ExternalLink, Printer } from "lucide-react";

export default function ResumePreviewPage() {
  const [viewMode, setViewMode] = useState<"sheet" | "pdf">("sheet");

  useEffect(() => {
    setViewMode(window.innerWidth >= 768 ? "pdf" : "sheet");
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Apple Preview Sticky Glass Toolbar */}
      <header className="sticky top-0 z-30 bg-white/85 dark:bg-[#111116]/85 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-zinc-800/80 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Segmented View Mode */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setViewMode("sheet")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                viewMode === "sheet"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <span className="sm:hidden">Quick Look</span>
              <span className="hidden sm:inline">Document View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pdf")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                viewMode === "pdf"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              PDF File
            </button>
          </div>

          <div className="flex items-center gap-2">
            {viewMode === "sheet" && (
              <button
                type="button"
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            )}

            <a
              href={PERSONAL_INFO.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold transition-colors"
            >
              <span>Raw PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.socials.resume}
              download="Arin_Joshi_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Document Canvas */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {viewMode === "pdf" ? (
          <div className="w-full h-[calc(100vh-8.5rem)] rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] flex flex-col">
            <iframe
              src={`${PERSONAL_INFO.socials.resume}#toolbar=0&navpanes=0&view=FitH`}
              title="Arin Joshi Resume PDF"
              className="w-full flex-1 border-0"
            />
          </div>
        ) : (
          <ResumePaperSheet />
        )}
      </main>
    </div>
  );
}

