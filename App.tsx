import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SplashCursor from './components/SplashCursor';
import SocialPopup from './components/SocialPopup';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500/20 selection:text-red-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-red-500/30 dark:selection:text-red-200">
      <Navbar />
      <SocialPopup />
      <AIAssistant />
      <main>
        <Hero />
        <div className="relative overflow-hidden">
          <SplashCursor />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
