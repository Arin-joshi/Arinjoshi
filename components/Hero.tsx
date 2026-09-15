import React, { useEffect, useRef, useState } from "react";
import { useData } from "../contexts/DataContext";
import { useAudio } from "../contexts/AudioContext";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Code2,
  ChevronDown,
  Award,
  Users,
} from "lucide-react";

interface HeroProps {
  visitorName?: string;
  ready?: boolean;
}

const Hero: React.FC<HeroProps> = React.memo(({ visitorName, ready = true }) => {
  const { personalInfo } = useData();
  const { isMuted } = useAudio();
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [nameColorIndex, setNameColorIndex] = useState(0);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const heroBackground =
    personalInfo.heroBackgroundImage || "/ArinJoshiBackgroundImg.webp";
  const heroVideo =
    personalInfo.heroVideo || "/Video.MP4";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      video.muted = isMuted;
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    syncPlayback();

    const handleVisibilityChange = () => {
      syncPlayback();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMuted]);

  // Color gradients that work well in both light and dark themes
  const nameColorGradients = [
    "from-red-400 via-red-500 to-red-600",
    "from-orange-400 via-orange-500 to-orange-600",
    "from-yellow-400 via-yellow-500 to-yellow-600",
    "from-green-400 via-green-500 to-green-600",
    "from-cyan-400 via-cyan-500 to-cyan-600",
    "from-blue-400 via-blue-500 to-blue-600",
    "from-purple-400 via-purple-500 to-purple-600",
    "from-pink-400 via-pink-500 to-pink-600",
  ];

  // Cycle through name colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNameColorIndex((prev) => (prev + 1) % nameColorGradients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Typing animation for roles - Optimized to prevent flickering
  const roles = [
    "Software Engineer",
    "React Developer",
    "MERN Stack Developer",
    "Frontend Specialist",
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let isMounted = true;

    const type = () => {
      if (!isMounted) return;

      const fullText = roles[currentIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      setTypedText(currentText);

      let nextDelay = 100; // Base typing speed

      if (!isDeleting && currentText === fullText) {
        // Wait at the end of word
        nextDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        // Move to next word
        isDeleting = false;
        currentIndex = (currentIndex + 1) % roles.length;
        nextDelay = 500; // Pause before next word
      } else {
        // Normal typing/deleting speed
        nextDelay = isDeleting ? 50 : 80;
      }

      typingTimeoutRef.current = setTimeout(type, nextDelay);
    };

    type();

    // Cursor blink - slower to reduce flicker
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530); // Slightly off-sync to prevent visual glitches

    return () => {
      isMounted = false;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative lg:min-h-screen w-full flex flex-col items-center lg:justify-end justify-start pt-20 sm:pt-24 md:pt-28 lg:pt-28 pb-16 sm:pb-10 md:pb-10 lg:pb-12 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:bg-slate-950 lg:dark:bg-slate-950"
    >
      {/* ── Personalized welcome banner ── */}
      {visitorName && (
        <div
          className="absolute top-16 sm:top-20 lg:top-24 left-0 right-0 z-30 flex justify-center px-4"
          style={{ animation: 'hero-welcome-slide 0.7s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <div
            className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold backdrop-blur-md border"
            style={{
              background: 'linear-gradient(135deg, rgba(225,29,72,0.12), rgba(124,58,237,0.12))',
              borderColor: 'rgba(225,29,72,0.3)',
              boxShadow: '0 2px 12px rgba(225,29,72,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              color: 'white',
            }}
          >
            <span className="text-xs sm:text-sm" style={{ animation: 'hero-wave 1.5s 0.5s ease-in-out 3' }}>👋</span>
            <span className="text-white/80">Welcome,&nbsp;</span>
            <span
              className="font-bold"
              style={{ background: 'linear-gradient(90deg,#fb7185,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {visitorName}
            </span>
            <span className="text-white/60">! ✨</span>
          </div>
        </div>
      )}
      <style>{`
        @keyframes hero-welcome-slide {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes hero-wave {
          0%, 100% { transform: rotate(0deg); }
          25%       { transform: rotate(20deg); }
          75%       { transform: rotate(-10deg); }
        }
      `}</style>

      {/* Single Hero Video Element (100% Full Width Edge-to-Edge Background on Desktop, Mobile Video Card on Mobile) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:max-w-none lg:absolute lg:inset-0 lg:h-full z-0 select-none">
        <div className="relative w-full aspect-video sm:min-h-[320px] max-h-[400px] lg:max-h-none lg:min-h-0 lg:aspect-auto lg:h-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-none border border-slate-200/80 dark:border-white/15 lg:border-none shadow-xl lg:shadow-none bg-slate-950 mb-4 lg:mb-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={heroBackground}
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent lg:bg-white/5 lg:dark:bg-black/5 pointer-events-none transition-colors duration-300" />
        </div>
      </div>

      {/* Foreground Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 lg:py-0 z-20">
        <div className="flex flex-col">
          {/* Mobile App Social Quick Bar */}
          <div className="flex items-center justify-center gap-3 lg:hidden mb-4 px-4">
            <a
              href="https://www.linkedin.com/in/arinjoshi/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all active:scale-95 shadow-sm"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Arin-joshi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all active:scale-95 shadow-sm"
            >
              <Github size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 transition-all active:scale-95 shadow-sm"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Top Text Block: Name, Typing Role, Summary Card */}
          <div className="text-center md:text-left w-full">
            <div className="md:shrink-0">
              <div className="mb-1 sm:mb-2 md:mb-1">
                <h1 id="hero-heading" className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 tracking-tight dark:text-white lg:text-white">
                  Hi, I'm{" "}
                  <span className="relative inline-block">
                    <span className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-r ${nameColorGradients[nameColorIndex]} transition-all duration-1000`}>
                      {personalInfo.name}
                    </span>
                    <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${nameColorGradients[nameColorIndex]} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-1000 origin-left`}></span>
                  </span>
                </h1>
              </div>

              <div className="min-h-[28px] sm:min-h-[40px] mb-2 sm:mb-3 md:mb-0 md:min-h-0">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-lg sm:text-2xl md:text-xl lg:text-2xl text-slate-600 lg:text-slate-300 font-medium dark:text-slate-400">
                    <span className="text-slate-900 lg:text-white dark:text-white">{typedText}</span>
                    <span
                      className={`ml-1 inline-block w-0.5 h-5 sm:h-6 lg:h-7 bg-gradient-to-b from-red-400 to-red-600 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                    ></span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Description Summary Card (100% Full Width) */}
            <div className="relative group mb-4 sm:mb-6 md:mb-0 md:mt-2 lg:mt-3 w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500 md:hidden"></div>
              <div className="relative w-full bg-white/95 p-3.5 sm:p-5 md:p-4 lg:p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none lg:bg-slate-950/50 lg:border-white/10 lg:backdrop-blur-md">
                <p
                  className={`text-xs sm:text-base md:text-[15px] lg:text-base text-slate-700 lg:text-slate-200 leading-relaxed dark:text-slate-300 md:text-left md:line-clamp-none ${
                    summaryExpanded ? "line-clamp-none" : "line-clamp-4"
                  }`}
                >
                  {personalInfo.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setSummaryExpanded((prev) => !prev)}
                  className="md:hidden mt-2 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  aria-expanded={summaryExpanded}
                >
                  {summaryExpanded ? "Show less" : "Read more"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${summaryExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Quick stats — mobile only */}
            <div className="md:hidden mt-4">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                {[
                  {
                    icon: <Award size={14} className="sm:w-4 sm:h-4" />,
                    label: "Experience",
                    value: "3+ Years",
                  },
                  {
                    icon: <Code2 size={14} className="sm:w-4 sm:h-4" />,
                    label: "Projects",
                    value: "15+",
                  },
                  {
                    icon: <Users size={14} className="sm:w-4 sm:h-4" />,
                    label: "Clients",
                    value: "10+",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/80 border border-slate-200 hover:border-red-400/60 transition-all group dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-red-500/50"
                  >
                    <div className="text-red-600 mb-1 group-hover:scale-110 transition-transform dark:text-red-400">
                      {stat.icon}
                    </div>
                    <div className="text-slate-900 font-bold text-xs sm:text-sm md:text-base lg:text-lg dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons — mobile only */}
            <div className="md:hidden">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mb-0">
                <a
                  href="#projects"
                  className="w-full sm:w-auto group relative px-5 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] overflow-hidden text-sm sm:text-base text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Work
                    <ArrowRight
                      size={16}
                      className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </a>

                <a
                  href={personalInfo.resumeUrl || "/ArinJoshi.pdf"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto group px-5 sm:px-8 py-3 rounded-xl bg-slate-100/90 backdrop-blur-sm hover:bg-slate-200/90 text-slate-900 font-semibold transition-all border border-slate-300 hover:border-red-400 flex items-center justify-center gap-2 text-sm sm:text-base dark:bg-slate-800/50 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 dark:hover:border-red-500/50"
                >
                  <Download
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] group-hover:translate-y-1 transition-transform"
                  />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet + Laptop Bottom Row: CTA Buttons (left) + Stats (right) */}
        <div className="relative z-30 hidden md:flex justify-between items-end mt-4 lg:mt-6 w-full gap-4 lg:gap-6">
          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View My Work
                <ArrowRight
                  size={16}
                  className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>

            <a
              href={personalInfo.resumeUrl || "/ArinJoshi.pdf"}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-slate-100/90 backdrop-blur-sm hover:bg-slate-200/90 text-slate-900 font-semibold transition-all border border-slate-300 hover:border-red-400 flex items-center justify-center gap-2 text-sm sm:text-base dark:bg-slate-800/50 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 dark:hover:border-red-500/50"
            >
              <Download
                size={16}
                className="sm:w-[18px] sm:h-[18px] group-hover:translate-y-1 transition-transform"
              />
              Download Resume
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3 sm:gap-4">
            {[
              {
                icon: <Award size={14} className="sm:w-4 sm:h-4" />,
                label: "Experience",
                value: "3+ Years",
              },
              {
                icon: <Code2 size={14} className="sm:w-4 sm:h-4" />,
                label: "Projects",
                value: "15+",
              },
              {
                icon: <Users size={14} className="sm:w-4 sm:h-4" />,
                label: "Clients",
                value: "10+",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-2.5 sm:p-3.5 rounded-xl border transition-all group w-24 sm:w-28 lg:w-32 bg-white/90 border-slate-200 backdrop-blur-md hover:border-red-400/60 dark:bg-slate-900/70 dark:border-slate-700 lg:bg-slate-950/40 lg:border-white/10 lg:hover:border-red-500/50"
              >
                <div className="text-red-600 lg:text-red-400 mb-1 group-hover:scale-110 transition-transform dark:text-red-400">
                  {stat.icon}
                </div>
                <div className="text-slate-900 lg:text-white font-bold text-xs sm:text-sm lg:text-base dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] lg:text-xs text-slate-500 lg:text-slate-300 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-15px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(8px); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
          will-change: transform;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
        .perspective {
          perspective: 1000px;
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 480px) {
          .xs\\:flex {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
});

export default Hero;
