import React from 'react';

const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse ${className}`}
    aria-hidden="true"
  />
);

const AppSkeleton: React.FC = () => (
  <div
    className="fixed inset-0 z-[9999] bg-slate-50 dark:bg-slate-950 overflow-hidden"
    role="status"
    aria-label="Loading portfolio"
  >
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-50 pointer-events-none" />

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 sm:space-y-12">
      {/* Navbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-9 w-9 rounded-xl" />
          <div className="space-y-1.5">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-2 w-16 hidden sm:block" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBlock key={i} className="h-8 w-16 rounded-full" />
          ))}
        </div>
        <SkeletonBlock className="h-9 w-9 rounded-xl md:hidden" />
      </div>

      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pt-4 sm:pt-8">
        <div className="space-y-4 sm:space-y-5 order-2 lg:order-1">
          <SkeletonBlock className="h-4 w-32 rounded-full" />
          <SkeletonBlock className="h-10 sm:h-12 w-full max-w-md" />
          <SkeletonBlock className="h-10 sm:h-12 w-3/4 max-w-sm" />
          <SkeletonBlock className="h-4 w-full max-w-lg" />
          <SkeletonBlock className="h-4 w-5/6 max-w-md" />
          <div className="flex gap-2 pt-2">
            <SkeletonBlock className="h-10 w-28 rounded-xl" />
            <SkeletonBlock className="h-10 w-28 rounded-xl" />
          </div>
        </div>
        <SkeletonBlock className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-2xl order-1 lg:order-2" />
      </div>

      {/* Section cards */}
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <SkeletonBlock className="h-12 w-12 rounded-full" />
          <SkeletonBlock className="h-7 w-48 sm:w-64" />
          <SkeletonBlock className="h-3 w-56 sm:w-72" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
              <SkeletonBlock className="w-full aspect-video rounded-none" />
              <div className="p-3 sm:p-4 space-y-2">
                <SkeletonBlock className="h-3 w-3/4" />
                <SkeletonBlock className="h-2 w-full hidden sm:block" />
                <SkeletonBlock className="h-7 w-full mt-2 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <span className="sr-only">Loading…</span>
  </div>
);

export default AppSkeleton;
