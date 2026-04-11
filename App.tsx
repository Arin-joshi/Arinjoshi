import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = performance.now();
    // Matches Loader progress (~100 steps × 30ms ≈ 3s) so the site does not appear mid-animation
    const minLoaderMs = 3100;
    let timeoutId: ReturnType<typeof setTimeout>;

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minLoaderMs - elapsed);
      timeoutId = setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-violet-500/20 selection:text-violet-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-violet-500/30 dark:selection:text-violet-200">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </div>
  );
}

export default App;
