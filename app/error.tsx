"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
        </div>

        <div className="space-y-2">
          <span className="inline-block font-mono-code text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Something went wrong
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            An unexpected error occurred while loading this page. You can retry or return to the homepage.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono-code text-zinc-400 dark:text-zinc-500 pt-1">
              Reference: {error.digest}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

