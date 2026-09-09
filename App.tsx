import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppSkeleton from './components/AppSkeleton';
import SectionLazy from './components/SectionLazy';

const SplashCursor = lazy(() => import('./components/SplashCursor'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

const MIN_SKELETON_MS = 0;
const MAX_SKELETON_MS = 2500;

function useSplashCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileOrTablet = window.matchMedia('(max-width: 1023px)').matches;
    const lowEnd = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency < 6;
    setEnabled(!reducedMotion && !isMobileOrTablet && !lowEnd);
  }, []);

  return enabled;
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const splashEnabled = useSplashCursorEnabled();

  useEffect(() => {
    const start = performance.now();
    let finished = false;
    let revealTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      if (finished) return;
      finished = true;
      const remaining = Math.max(0, MIN_SKELETON_MS - (performance.now() - start));
      revealTimer = setTimeout(() => setIsReady(true), remaining);
    };

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      finish();
    } else {
      document.addEventListener('DOMContentLoaded', finish, { once: true });
    }

    const maxTimer = setTimeout(finish, MAX_SKELETON_MS);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(maxTimer);
      document.removeEventListener('DOMContentLoaded', finish);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const idleTimer = setTimeout(() => setShowAssistant(true), 3000);
    const onInteraction = () => {
      setShowAssistant(true);
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };

    window.addEventListener('pointerdown', onInteraction, { once: true });
    window.addEventListener('keydown', onInteraction, { once: true });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };
  }, [isReady]);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-red-500/20 selection:text-red-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-red-500/30 dark:selection:text-red-200 antialiased">
      {!isReady && <AppSkeleton />}

      <div
        className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!isReady}
      >
        <Navbar />

        {showAssistant && (
          <Suspense fallback={null}>
            <AIAssistant />
          </Suspense>
        )}

        <main>
          <Hero ready={isReady} />
          <div className="relative overflow-hidden">
            {splashEnabled && (
              <Suspense fallback={null}>
                <SplashCursor SIM_RESOLUTION={128} DYE_RESOLUTION={512} />
              </Suspense>
            )}
            <SectionLazy minHeight="400px">
              <Experience />
            </SectionLazy>
            <SectionLazy minHeight="500px">
              <Projects />
            </SectionLazy>
            <SectionLazy minHeight="400px">
              <Skills />
            </SectionLazy>
            <SectionLazy minHeight="400px">
              <Contact />
            </SectionLazy>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
