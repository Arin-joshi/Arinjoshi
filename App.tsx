import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent.toLowerCase();
    const isBot = /googlebot|bingbot|yandexbot|baiduspider|duckduckbot|slurp|ia_archiver|facebookexternalhit|twitterbot|linkedinbot/i.test(ua);
    return !isBot;
  });

  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    if (!loading) return;

    let active = true;
    const targetProgressRef = { current: 0 };
    
    // Smooth progress animation loop
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small delay before transition out
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        
        const target = targetProgressRef.current;
        if (prev < target) {
          const step = Math.max(1, Math.floor((target - prev) * 0.1));
          const next = Math.min(100, prev + step);
          
          const texts = [
            'Initializing',
            'Loading modules',
            'Compiling components',
            'Preloading video background',
            'Finalizing resources',
            'Welcome!',
          ];
          const textIdx =
            next >= 100
              ? 5
              : next >= 90
                ? 4
                : next >= 60
                  ? 3
                  : next >= 40
                    ? 2
                    : next >= 20
                      ? 1
                      : 0;
          setLoadingText(texts[textIdx]);
          return next;
        }
        return prev;
      });
    }, 30);

    const startPreload = async () => {
      // 1. Initial simulated progress to 30% for boot setup
      for (let i = 0; i <= 30; i++) {
        if (!active) return;
        targetProgressRef.current = i;
        await new Promise((r) => setTimeout(r, 15));
      }

      // 2. Fetch video with progress tracking (30% to 90%)
      try {
        const videoElement = document.createElement('video');
        const supportsWebm = videoElement.canPlayType('video/webm; codecs="vp9, opus"') !== '';
        let videoUrl = supportsWebm ? "/ArinJoshi.webm" : "/ArinJoshi.mp4";

        let response = await fetch(videoUrl);
        if (!response.ok && supportsWebm) {
          // Fallback to mp4 if webm 404s
          videoUrl = "/ArinJoshi.mp4";
          response = await fetch(videoUrl);
        }

        if (!response.ok) throw new Error("Video load failed");

        const reader = response.body?.getReader();
        const contentLength = +(response.headers.get("Content-Length") || 0);

        if (!reader || contentLength === 0) {
          targetProgressRef.current = 90;
        } else {
          let receivedLength = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            receivedLength += value?.length || 0;
            const downloadPercent = receivedLength / contentLength;
            const mappedPercent = Math.min(90, 30 + Math.floor(downloadPercent * 60));
            targetProgressRef.current = mappedPercent;
          }
        }
      } catch (err) {
        console.warn("Failed to preload video, proceeding with normal load:", err);
        targetProgressRef.current = 90;
      }

      // 3. Finalize progress to 100%
      for (let i = targetProgressRef.current; i <= 100; i++) {
        if (!active) return;
        targetProgressRef.current = i;
        await new Promise((r) => setTimeout(r, 10));
      }
    };

    startPreload();

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [loading]);

  if (loading) {
    return <Loader progress={progress} loadingText={loadingText} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500/20 selection:text-red-900 dark:bg-dark dark:text-slate-300 dark:selection:bg-red-500/30 dark:selection:text-red-200">
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
