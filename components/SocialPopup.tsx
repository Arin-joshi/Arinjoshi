import React, { useState, useEffect } from 'react';
import { Youtube, Linkedin, Instagram, X, Sparkles } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import LookAtCursor from './LookAtCursor';

const SocialPopup: React.FC<{ ready?: boolean }> = ({ ready = false }) => {
  const { isMuted } = useAudio();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    if (!ready) return; // ⏳ wait until loading screen is fully done

    // Only show once per session (bypass on localhost for dev testing)
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const seen = sessionStorage.getItem('social-popup-seen');
    if (seen === 'true' && !isLocalhost) return;

    // 🎉 10 seconds AFTER portfolio becomes visible
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setAnimate(true);
        playChime();
      }, 50);
      sessionStorage.setItem('social-popup-seen', 'true');
    }, 10000);

    return () => clearTimeout(timer);
  }, [ready, isMuted]);

  // Ascending major arpeggio chime sound for premium interaction feedback
  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Cute ascending notes: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.015, now + index * 0.08 + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.35);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.38);
      });
    } catch (e) {
      // Audio fallback
    }
  };

  const playClick = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Audio fallback
    }
  };

  const handleClose = () => {
    playClick();
    setAnimate(false);
    // Unmount after transition finishes
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Premium Backdrop blur overlay */}
      <div
        className={`absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 ease-out ${animate ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-[320px] sm:max-w-[360px] bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out transform ${animate ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`}
      >
        {/* Cursor Tracking Mascot floating at the top */}
        <div className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none select-none">
          <div className="transform scale-[1.1] hover:scale-[1.15] transition-transform duration-300">
            <LookAtCursor type="cat" />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={15} />
        </button>

        {/* Content */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 mb-2">
            <Sparkles size={11} className="animate-pulse" />
            <span className="text-[9px] font-mono tracking-wider uppercase font-semibold">LET'S CONNECT</span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Checkout My Social Media!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mt-1.5 sm:mt-2 max-w-[260px] sm:max-w-[280px] mx-auto leading-relaxed">
            Follow my journey, see what I'm coding, or just drop a hello! I post code tutorials, designs, and tech logs.
          </p>

          {/* Social Platform Grid */}
          <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@ArinJoshi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-3 bg-gradient-to-r from-red-500/5 to-rose-500/5 hover:from-red-500/10 hover:to-rose-500/10 dark:from-red-500/10 dark:to-rose-500/10 border border-red-500/10 hover:border-red-500/30 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="p-1.5 sm:p-2 bg-red-500 text-white rounded-lg sm:rounded-xl shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                <Youtube size={14} className="sm:block hidden" />
                <Youtube size={12} className="sm:hidden block" />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">YouTube Channel</h4>
                <p className="text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-500">Funny Vlog Dekhega/gi?😂</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/arinjoshi/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-3 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 hover:from-blue-500/10 hover:to-indigo-500/10 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-500/10 hover:border-blue-500/30 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="p-1.5 sm:p-2 bg-blue-650 text-white rounded-lg sm:rounded-xl shadow-md shadow-blue-500/20 bg-blue-600 group-hover:scale-105 transition-transform">
                <Linkedin size={14} className="sm:block hidden" />
                <Linkedin size={12} className="sm:hidden block" />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">LinkedIn Profile</h4>
                <p className="text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-500">Professional network & contact</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/click_by_arin/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-3 bg-gradient-to-r from-pink-500/5 to-purple-500/5 hover:from-pink-500/10 hover:to-purple-500/10 dark:from-pink-500/10 dark:to-purple-500/10 border border-pink-500/10 hover:border-pink-500/30 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="p-1.5 sm:p-2 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-lg sm:rounded-xl shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <Instagram size={14} className="sm:block hidden" />
                <Instagram size={12} className="sm:hidden block" />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Instagram Handle</h4>
                <p className="text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-500">Behind the scenes & photography</p>
              </div>
            </a>
          </div>

          {/* Decline Link */}
          <button
            onClick={handleClose}
            className="text-[10px] font-mono tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-350 transition-colors mt-5 uppercase hover:underline"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialPopup;
