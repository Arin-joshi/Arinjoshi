import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SocialPopup from './components/SocialPopup';
import AppSkeleton from './components/AppSkeleton';

const SplashCursor = lazy(() => import('./components/SplashCursor'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

const MIN_SKELETON_MS = 450;
const MAX_SKELETON_MS = 4000;

function App() {
  const [isReady, setIsReady] = useState(false);

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

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    const maxTimer = setTimeout(finish, MAX_SKELETON_MS);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(maxTimer);
      window.removeEventListener('load', finish);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-red-500/20 selection:text-red-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-red-500/30 dark:selection:text-red-200 antialiased">
      {!isReady && <AppSkeleton />}

      <div
        className={`transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!isReady}
      >
        <Navbar />
        <SocialPopup ready={isReady} />

        <Suspense fallback={null}>
          <AIAssistant />
        </Suspense>

        <main>
          <Hero ready={isReady} />
          <div className="relative overflow-hidden">
            <Suspense fallback={null}>
              <SplashCursor />
            </Suspense>
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
