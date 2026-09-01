import React, { useState, useEffect } from 'react';
import { Youtube, Linkedin, Instagram, X, ChevronRight } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import LookAtCursor from './LookAtCursor';

const socialLinks = [
  {
    href: 'https://www.youtube.com/@ArinJoshi',
    icon: Youtube,
    title: 'YouTube',
    subtitle: 'Funny Vlog Dekhega/gi? 😂',
    iconClass: 'bg-red-500 shadow-red-500/30',
    rowClass: 'hover:border-red-500/25 active:bg-red-500/[0.06]',
  },
  {
    href: 'https://www.linkedin.com/in/arinjoshi/',
    icon: Linkedin,
    title: 'LinkedIn',
    subtitle: 'Professional network',
    iconClass: 'bg-blue-600 shadow-blue-500/30',
    rowClass: 'hover:border-blue-500/25 active:bg-blue-500/[0.06]',
  },
  {
    href: 'https://www.instagram.com/click_by_arin/',
    icon: Instagram,
    title: 'Instagram',
    subtitle: 'Behind the scenes',
    iconClass: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 shadow-pink-500/30',
    rowClass: 'hover:border-pink-500/25 active:bg-pink-500/[0.06]',
  },
] as const;

const SocialPopup: React.FC<{ ready?: boolean }> = ({ ready = true }) => {
  const { isMuted } = useAudio();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    if (!ready) return;

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const seen = sessionStorage.getItem('social-popup-seen');
    if (seen === 'true' && !isLocalhost) return;

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

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
    } catch {
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
    } catch {
      // Audio fallback
    }
  };

  const handleClose = () => {
    playClick();
    setAnimate(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity duration-300 ease-out ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-[288px] sm:max-w-[320px] overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          background: 'linear-gradient(165deg, rgba(15,23,42,0.98) 0%, rgba(2,6,23,0.99) 100%)',
        }}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-red-500 via-pink-500 to-violet-500" />

        <div className="flex items-start gap-2.5 px-3.5 pt-3.5 pb-2">
          <div className="relative shrink-0 w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center overflow-hidden">
            <LookAtCursor type="cat" className="scale-[0.55] -mt-0.5" />
          </div>

          <div className="flex-1 min-w-0 pt-0.5 pr-6">
            <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
              Check Out My Socials
            </h3>
            <p className="mt-0.5 text-[10px] text-slate-400 leading-snug line-clamp-2">
              Follow my journey or drop a hello!
            </p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-2.5 right-2.5 flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="px-3 pb-2.5 space-y-1.5">
          {socialLinks.map(({ href, icon: Icon, title, subtitle, iconClass, rowClass }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className={`group flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-200 active:scale-[0.98] ${rowClass}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg text-white shrink-0 shadow-md ${iconClass}`}
              >
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-xs font-semibold text-white leading-none">{title}</h4>
                <p className="text-[10px] text-slate-400 truncate mt-0.5 hidden sm:block">{subtitle}</p>
              </div>
              <ChevronRight
                size={14}
                className="shrink-0 text-slate-500 group-hover:text-white transition-colors"
              />
            </a>
          ))}
        </div>

        <div className="px-3 pb-3">
          <button
            onClick={handleClose}
            className="w-full py-1.5 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-300 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialPopup;
