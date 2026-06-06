import React, { useEffect, useState } from 'react';
import { Code2, Cpu, Sparkles, Zap, Brackets, Github } from 'lucide-react';

interface LoaderProps {
  progress?: number;
  loadingText?: string;
}

const Loader: React.FC<LoaderProps> = ({ progress: propProgress, loadingText: propLoadingText }) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [internalLoadingText, setInternalLoadingText] = useState('Initializing');

  const progress = propProgress !== undefined ? propProgress : internalProgress;
  const loadingText = propLoadingText !== undefined ? propLoadingText : internalLoadingText;

  // Simulate loading progress (single interval; avoids resetting on each tick)
  useEffect(() => {
    if (propProgress !== undefined) return;

    const texts = [
      'Initializing',
      'Loading modules',
      'Compiling components',
      'Fetching data',
      'Almost ready',
      'Welcome!',
    ];

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) return 100;
        const next = prev + 1;
        const textIdx =
          next >= 100
            ? 5
            : next >= 80
              ? 4
              : next >= 60
                ? 3
                : next >= 40
                  ? 2
                  : next >= 20
                    ? 1
                    : 0;
        setInternalLoadingText(texts[textIdx]);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [propProgress]);

  // Floating tech icons
  const techIcons = [
    { Icon: Code2, color: 'from-cyan-400 to-blue-500', delay: 0 },
    { Icon: Cpu, color: 'from-red-400 to-red-500', delay: 1 },
    { Icon: Zap, color: 'from-red-400 to-red-500', delay: 2 },
    { Icon: Brackets, color: 'from-green-400 to-emerald-500', delay: 1.5 },
    { Icon: Github, color: 'from-gray-400 to-slate-500', delay: 2.5 },
  ];

  /* Inline shell so loading UI stays correct if Tailwind CDN is late */
  const loaderShell: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    boxSizing: 'border-box',
    background: 'linear-gradient(to bottom, #020617 0%, #0f172a 50%, #020617 100%)',
    color: '#e2e8f0',
    overflow: 'hidden',
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      style={loaderShell}
    >
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-full blur-[160px] -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-[160px] bottom-[-200px] right-[-200px] animate-pulse delay-1000"></div>
      
      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden">
        {techIcons.map(({ Icon, color, delay }, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              top: `${20 + index * 15}%`,
              left: `${10 + index * 20}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${15 + index * 2}s`
            }}
          >
            <div className={`
              p-4 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50
              bg-gradient-to-br ${color} bg-opacity-10
            `}>
              <Icon size={24} className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main loader card */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-md mx-4">
        {/* Animated rings */}
        <div className="relative flex justify-center mb-6 sm:mb-8">
          {/* Outer ring */}
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-red-500/30 animate-ping"></div>
          
          {/* Spinning ring */}
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-t-2 border-r-2 border-red-500 animate-spin"></div>
          
          {/* Inner ring */}
          <div className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-red-600/20 animate-pulse"></div>
          
          {/* Center icon */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-red-600 to-red-700 rounded-full p-3 sm:p-4">
              <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-white animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Loading card */}
        <div className="relative group">
          {/* Animated border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl opacity-75 blur transition duration-500 group-hover:opacity-100 animate-pulse"></div>
          
          {/* Main card */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 p-5 sm:p-8">
            
            {/* Loading text */}
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  {loadingText}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 tracking-wider flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>
                Building digital experiences
                <span className="w-1 h-1 rounded-full bg-red-600 animate-pulse"></span>
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Loading resources</span>
                <span className="text-red-400 font-mono">{progress}%</span>
              </div>
              
              {/* Progress bar with gradient */}
              <div className="h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-700 rounded-full transition-all duration-300 relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
                </div>
              </div>

              {/* Loading dots */}
              <div className="flex justify-center gap-1 pt-3 sm:pt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-800">
              {['React', 'TypeScript', 'Node.js', 'MongoDB'].map((tech, i) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-slate-800/80 text-slate-400 border border-slate-700"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${i * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <p className="text-center text-[10px] sm:text-xs text-slate-600 mt-5 sm:mt-6 tracking-wider">
          © {new Date().getFullYear()} Arin Joshi • Software Engineer
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-30px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(15px); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Loader;