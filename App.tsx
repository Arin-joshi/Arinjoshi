import React, { useState, lazy, Suspense, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SocialPopup from './components/SocialPopup';
import LoadingScreen from './components/LoadingScreen';

// Dynamic lazy imports for non-critical heavy modules (WebGL canvas & Chat Assistant)
const SplashCursor = lazy(() => import('./components/SplashCursor'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

function App() {
  const [visitorName, setVisitorName] = useState<string | null>(null);

  const handleLoadComplete = useCallback((name: string) => {
    setVisitorName(name);
  }, []);

  const isAppReady = visitorName !== null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500/20 selection:text-red-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-red-500/30 dark:selection:text-red-200">
      {/* Loading Gate - renders until video + UI are ready */}
      {!isAppReady && (
        <LoadingScreen onComplete={handleLoadComplete} />
      )}

      {/* Main app - rendered in DOM for smooth transition */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: isAppReady ? 1 : 0, pointerEvents: isAppReady ? 'auto' : 'none' }}
      >
        <Navbar />
        <SocialPopup ready={isAppReady} />
        
        <Suspense fallback={null}>
          <AIAssistant />
        </Suspense>

        <main>
          <Hero visitorName={visitorName ?? ''} ready={isAppReady} />
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
