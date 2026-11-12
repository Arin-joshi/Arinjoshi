import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div className="space-y-2">
          <span className="inline-block font-mono-code text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Page not found
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="pt-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

