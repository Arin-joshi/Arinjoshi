import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      <div className="max-w-md space-y-4">
        <div className="font-mono-code text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 inline-block">
          404 ERROR
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The requested system route does not exist.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

