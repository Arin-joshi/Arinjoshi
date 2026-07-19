import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../contexts/AudioContext';

interface LoadingScreenProps {
  onComplete: (visitorName: string) => void;
}

const PARTICLES = Array.from({ length: 28 }, (_, i) => i);

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { setMuted } = useAudio();
  const [phase, setPhase] = useState<'loading' | 'sound' | 'welcome' | 'exit'>('loading');
  const [progress, setProgress] = useState(0);
  const [visitorName, setVisitorName] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number>();

  // Simulate progressive loading (fast at start, slower mid, snap at end)
  useEffect(() => {
    if (phase !== 'loading') return;

    const startTime = performance.now();
    const duration = 10000; // ms

    const ease = (t: number) => {
      // Custom ease: fast start, slow middle, fast finish
      if (t < 0.4) return t * 1.8;
      if (t < 0.85) return 0.72 + (t - 0.4) * 0.36;
      return 0.88 + (t - 0.85) * 0.8;
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = ease(t);
      const p = Math.min(Math.round(eased * 100), 100);
      progressRef.current = p;
      setProgress(p);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold at 100% briefly then transition to sound phase
        setTimeout(() => setPhase('sound'), 600);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  // Typewriter for welcome message
  useEffect(() => {
    if (phase !== 'welcome') return;
    const fullText = visitorName ? `Welcome, ${visitorName}! ✨` : `Welcome! ✨`;
    let i = 0;
    setWelcomeText('');
    const id = setInterval(() => {
      i++;
      setWelcomeText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(id);
        setTimeout(() => setPhase('exit'), 1200);
      }
    }, 55);
    return () => clearInterval(id);
  }, [phase, visitorName]);

  // After exit animation completes, call onComplete
  useEffect(() => {
    if (phase !== 'exit') return;
    const t = setTimeout(() => onComplete(visitorName), 900);
    return () => clearTimeout(t);
  }, [phase, visitorName, onComplete]);

  const handleSoundChoice = (soundOn: boolean) => {
    setMuted(!soundOn);
    setPhase('welcome');
  };

  const isExiting = phase === 'exit';

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* ── Deep dark luxury background ── */}
      <div className="absolute inset-0 bg-[#050810]" />

      {/* ── Animated radial gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #e11d48 0%, transparent 70%)',
            top: '-10%', left: '-10%',
            animation: 'ls-orb1 8s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            bottom: '-5%', right: '-5%',
            animation: 'ls-orb2 10s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
            top: '40%', right: '20%',
            animation: 'ls-orb3 6s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* ── Floating star particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((i) => {
          const size = 1 + Math.random() * 3;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          const dur = 3 + Math.random() * 4;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: size, height: size,
                left: `${x}%`, top: `${y}%`,
                opacity: 0.15 + Math.random() * 0.5,
                animation: `ls-twinkle ${dur}s ${delay}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>

      {/* ── Grid lines overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Main glass card ── */}
      <div
        className={`relative z-10 w-full max-w-[240px] sm:max-w-sm mx-4 transition-all duration-500 ${phase === 'loading' || phase === 'sound' ? 'translate-y-0 opacity-100' : ''
          } ${phase === 'welcome' ? 'scale-105 opacity-100' : ''}`}
      >
        {/* Glowing border wrapper */}
        <div className="relative rounded-3xl p-[1.5px]" style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.8), rgba(124,58,237,0.6), rgba(14,165,233,0.4))',
          boxShadow: '0 0 60px rgba(225,29,72,0.25), 0 0 120px rgba(124,58,237,0.15)',
        }}>
          <div className="rounded-3xl bg-[#0a0f1e]/90 backdrop-blur-2xl p-4 sm:p-8">

            {/* Logo / Brand */}
            <div className="flex flex-col items-center mb-4 sm:mb-8">
              <div className="relative mb-2 sm:mb-4">
                <div
                  className="w-9 h-9 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #e11d48, #7c3aed)',
                    boxShadow: '0 0 30px rgba(225,29,72,0.5)',
                    animation: 'ls-pulse-logo 2s ease-in-out infinite',
                  }}
                >
                  {phase === 'welcome' ? '🎉' : phase === 'sound' ? '🎵' : '⚡'}
                </div>
                {/* Ping ring */}
                <div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl border border-red-500/40"
                  style={{ animation: 'ls-ring-ping 2s ease-out infinite' }}
                />
              </div>

              <h1 className="text-sm sm:text-xl font-extrabold tracking-tight text-white">
                {phase === 'welcome'
                  ? <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    {welcomeText}
                  </span>
                  : <span className="bg-gradient-to-r from-red-400 via-pink-300 to-violet-400 bg-clip-text text-transparent">
                    Arin Joshi
                  </span>
                }
              </h1>
              <p className="text-[8px] sm:text-[11px] text-slate-500 mt-0.5 font-mono tracking-widest uppercase">
                {phase === 'welcome'
                  ? "Let's create something amazing 🚀"
                  : phase === 'sound'
                    ? 'Choose your vibe 🎧'
                    : 'Software Engineer · MERN Stack · React'
                }
              </p>
            </div>

            {/* ── PHASE: LOADING ── */}
            {phase === 'loading' && (
              <div className="flex flex-col items-center gap-3 sm:gap-5">
                {/* Segmented progress bar */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider">Initializing</span>
                    <span className="text-[9px] sm:text-[10px] text-red-400 font-mono font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1 sm:h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-100"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #e11d48, #7c3aed, #0ea5e9)',
                        boxShadow: '0 0 12px rgba(225,29,72,0.7)',
                      }}
                    />
                  </div>
                </div>

                {/* Loading status dots */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {[
                    { label: 'Assets', done: progress >= 30 },
                    { label: 'UI', done: progress >= 60 },
                    { label: 'Video', done: progress >= 85 },
                    { label: 'Ready', done: progress >= 100 },
                  ].map((step) => (
                    <div key={step.label} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${step.done
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                          : 'bg-slate-700'
                          }`}
                      />
                      <span className="text-[8px] sm:text-[9px] font-mono text-slate-600">{step.label}</span>
                    </div>
                  ))}
                </div>

                {/* Animated spinner rings */}
                <div className="relative w-10 h-10 sm:w-14 sm:h-14">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500"
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                  <div
                    className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-500"
                    style={{ animation: 'spin 0.7s linear infinite reverse' }}
                  />
                  <div
                    className="absolute inset-4 rounded-full border-2 border-transparent border-t-sky-500"
                    style={{ animation: 'spin 0.5s linear infinite' }}
                  />
                </div>

                <p className="text-[10px] text-slate-600 font-mono text-center animate-pulse">
                  Loading your experience...
                </p>
              </div>
            )}

            {/* ── PHASE: SOUND ── */}
            {phase === 'sound' && (
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <p className="text-xs sm:text-sm font-bold text-white text-center">
                  Sound chahiye? 🎵
                </p>
                <p className="text-[10px] text-slate-400 text-center -mt-1">
                  Background music aur effects on karu? 🎶
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => handleSoundChoice(true)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3 sm:py-4 rounded-2xl border-2 border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
                  >
                    <span className="text-2xl sm:text-3xl group-hover:animate-bounce">🔊</span>
                    <span className="text-xs font-bold text-emerald-400">Haan ON!</span>
                    <span className="text-[9px] text-slate-500">Vibe on karo 🎉</span>
                  </button>

                  <button
                    onClick={() => handleSoundChoice(false)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3 sm:py-4 rounded-2xl border-2 border-slate-600/40 hover:border-slate-500 bg-slate-800/40 hover:bg-slate-700/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
                  >
                    <span className="text-2xl sm:text-3xl">🔇</span>
                    <span className="text-xs font-bold text-slate-400">Nahi, OFF</span>
                    <span className="text-[9px] text-slate-500">Shant rehna hai 🤫</span>
                  </button>
                </div>

                <p className="text-[9px] text-slate-700 text-center font-mono">
                  Baad mein bhi change kar sakte ho ↗
                </p>
              </div>
            )}

            {/* ── PHASE: WELCOME ── */}
            {phase === 'welcome' && (
              <div className="flex flex-col items-center gap-5">
                {/* Confetti-style emoji burst */}
                <div className="flex gap-3 text-2xl animate-bounce">
                  {'🎊 🌟 🎉'.split(' ').map((e, i) => (
                    <span
                      key={i}
                      className="inline-block"
                      style={{ animation: `ls-pop 0.5s ${i * 0.1}s ease-out both` }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-xs text-center font-mono">
                  Preparing your personalized experience...
                </p>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)',
                      animation: 'ls-bar-fill 1s ease-in-out forwards',
                    }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Bottom tagline ── */}
      <div className="relative z-10 mt-6 flex items-center gap-2 text-[10px] text-slate-700 font-mono uppercase tracking-widest">
        <span className="w-8 h-px bg-slate-800" />
        Crafting Digital Excellence
        <span className="w-8 h-px bg-slate-800" />
      </div>

      {/* ── All keyframe animations ── */}
      <style>{`
        @keyframes ls-orb1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(80px, 60px) scale(1.2); }
        }
        @keyframes ls-orb2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-60px, -40px) scale(1.15); }
        }
        @keyframes ls-orb3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes ls-twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50%       { opacity: 0.8; transform: scale(1.4); }
        }
        @keyframes ls-pulse-logo {
          0%, 100% { box-shadow: 0 0 30px rgba(225,29,72,0.5); }
          50%       { box-shadow: 0 0 50px rgba(124,58,237,0.7), 0 0 80px rgba(225,29,72,0.3); }
        }
        @keyframes ls-ring-ping {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes ls-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        @keyframes ls-pop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes ls-bar-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ls-emoji-pop {
          0%   { transform: scale(0.4) rotate(-15deg); opacity: 0; }
          60%  { transform: scale(1.25) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
