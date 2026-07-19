import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SplashCursor from './components/SplashCursor';
import SocialPopup from './components/SocialPopup';
import AIAssistant from './components/AIAssistant';
import LoadingScreen from './components/LoadingScreen';
import AdminPanel from './components/AdminPanel';

function App() {
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLoadComplete = (name: string) => {
    setVisitorName(name);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500/20 selection:text-red-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-red-500/30 dark:selection:text-red-200">
      {/* Loading Gate - renders until video + UI are ready */}
      {visitorName === null && (
        <LoadingScreen onComplete={handleLoadComplete} />
      )}

      {/* Main app - always rendered in DOM (so video preloads) but visually gated */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: visitorName !== null ? 1 : 0, pointerEvents: visitorName !== null ? 'auto' : 'none' }}
      >
        <Navbar onAdminClick={() => setIsAdminOpen(true)} />
        <SocialPopup ready={visitorName !== null} />
        <AIAssistant />
        <main>
          <Hero visitorName={visitorName ?? ''} ready={visitorName !== null} />
          <div className="relative overflow-hidden">
            <SplashCursor />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </main>
      </div>

      {/* Admin Panel Modal Overlay */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
