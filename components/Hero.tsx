import React, { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "../constants";
import { useAudio } from "../contexts/AudioContext";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Code2,
  Sparkles,
  MapPin,
  ChevronDown,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Award,
  Users,
  Star,
  Shield,
  Braces,
} from "lucide-react";

interface HeroProps {
  visitorName?: string;
  ready?: boolean;
}

const Hero: React.FC<HeroProps> = ({ visitorName, ready = false }) => {
  const { isMuted } = useAudio();
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [nameColorIndex, setNameColorIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const isIntersectingRef = useRef(false);

  // Monitor viewport width to prevent dual-video rendering/audio conflicts
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Play/pause background videos based on viewport visibility and handle autoplay policies
  useEffect(() => {
    // Only set up video playback after loading is complete
    if (!ready) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const playVideo = (video: HTMLVideoElement) => {
      video.play().catch(() => {
        // Fallback to muted autoplay if browser blocks audio autoplay
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        isIntersectingRef.current = entry.isIntersecting;
        const desktopVideo = desktopVideoRef.current;
        const cardVideo = cardVideoRef.current;

        if (entry.isIntersecting && !document.hidden) {
          if (desktopVideo) playVideo(desktopVideo);
          if (cardVideo) playVideo(cardVideo);
        } else {
          if (desktopVideo) desktopVideo.pause();
          if (cardVideo) cardVideo.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Pause/play when switching browser tabs (Page Visibility API)
    const handleVisibilityChange = () => {
      const desktopVideo = desktopVideoRef.current;
      const cardVideo = cardVideoRef.current;

      if (document.hidden) {
        if (desktopVideo) desktopVideo.pause();
        if (cardVideo) cardVideo.pause();
      } else {
        // Resume only if the Hero section is currently in view
        if (isIntersectingRef.current) {
          if (desktopVideo) playVideo(desktopVideo);
          if (cardVideo) playVideo(cardVideo);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Unmute/play video on first user interaction if isMuted is false
    const enableSoundOnInteraction = () => {
      const desktopVideo = desktopVideoRef.current;
      const cardVideo = cardVideoRef.current;
      
      if (desktopVideo) {
        desktopVideo.muted = isMuted;
        desktopVideo.play().catch(() => {});
      }
      if (cardVideo) {
        cardVideo.muted = isDesktop ? true : isMuted;
        cardVideo.play().catch(() => {});
      }
      
      // Remove all listeners after first interaction
      window.removeEventListener("click", enableSoundOnInteraction);
      window.removeEventListener("touchstart", enableSoundOnInteraction);
      window.removeEventListener("mousedown", enableSoundOnInteraction);
      window.removeEventListener("pointerdown", enableSoundOnInteraction);
      window.removeEventListener("keydown", enableSoundOnInteraction);
    };

    window.addEventListener("click", enableSoundOnInteraction);
    window.addEventListener("touchstart", enableSoundOnInteraction);
    window.addEventListener("mousedown", enableSoundOnInteraction);
    window.addEventListener("pointerdown", enableSoundOnInteraction);
    window.addEventListener("keydown", enableSoundOnInteraction);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("click", enableSoundOnInteraction);
      window.removeEventListener("touchstart", enableSoundOnInteraction);
      window.removeEventListener("mousedown", enableSoundOnInteraction);
      window.removeEventListener("pointerdown", enableSoundOnInteraction);
      window.removeEventListener("keydown", enableSoundOnInteraction);
    };
  }, [isMuted, isDesktop, ready]);

  // Dynamically sync video muted state with isMuted state
  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const cardVideo = cardVideoRef.current;

    if (desktopVideo) {
      desktopVideo.muted = isMuted;
    }
    if (cardVideo) {
      cardVideo.muted = isDesktop ? true : isMuted;
    }
  }, [isMuted, isDesktop]);

  // Synchronize desktop background video and card video playback state and time
  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const cardVideo = cardVideoRef.current;

    if (!desktopVideo || !cardVideo || !isDesktop) return;

    const syncPlay = () => {
      if (cardVideo.paused) {
        cardVideo.play().catch(() => {});
      }
    };

    const syncPause = () => {
      if (!cardVideo.paused) {
        cardVideo.pause();
      }
    };

    const syncTime = () => {
      // Keep them within 0.15 seconds of each other to ensure seamless visual synchronization
      if (Math.abs(desktopVideo.currentTime - cardVideo.currentTime) > 0.15) {
        cardVideo.currentTime = desktopVideo.currentTime;
      }
    };

    desktopVideo.addEventListener("play", syncPlay);
    desktopVideo.addEventListener("pause", syncPause);
    desktopVideo.addEventListener("timeupdate", syncTime);
    desktopVideo.addEventListener("seeking", syncTime);

    // Initial sync
    cardVideo.currentTime = desktopVideo.currentTime;
    if (desktopVideo.paused) {
      cardVideo.pause();
    } else {
      cardVideo.play().catch(() => {});
    }

    return () => {
      desktopVideo.removeEventListener("play", syncPlay);
      desktopVideo.removeEventListener("pause", syncPause);
      desktopVideo.removeEventListener("timeupdate", syncTime);
      desktopVideo.removeEventListener("seeking", syncTime);
    };
  }, [isDesktop]);

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

  // Card color gradients (darker for better visibility on cards)
  const cardColorGradients = [
    "from-red-600 via-red-700 to-red-800",
    "from-orange-600 via-orange-700 to-orange-800",
    "from-yellow-600 via-yellow-700 to-yellow-800",
    "from-green-600 via-green-700 to-green-800",
    "from-cyan-600 via-cyan-700 to-cyan-800",
    "from-blue-600 via-blue-700 to-blue-800",
    "from-purple-600 via-purple-700 to-purple-800",
    "from-pink-600 via-pink-700 to-pink-800",
  ];

  // Cycle through name colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNameColorIndex((prev) => (prev + 1) % nameColorGradients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Cycle through card colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCardColorIndex((prev) => (prev + 1) % cardColorGradients.length);
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

  // Tech stack for floating icons
  const techStack = [
    {
      icon: <Code2 size={18} />,
      name: "React",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Terminal size={18} />,
      name: "Node.js",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <Cpu size={18} />,
      name: "TypeScript",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <Braces size={18} />,
      name: "JavaScript",
      color: "from-red-400 to-red-500",
    },
    {
      icon: <Globe size={18} />,
      name: "MongoDB",
      color: "from-green-400 to-teal-500",
    },
  ];

  // Custom icons for title
  const TitleIcons = () => (
    <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
        <Code2 size={14} className="text-red-400" />
      </div>
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
        <Braces size={14} className="text-cyan-400" />
      </div>
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
        <Shield size={14} className="text-emerald-400" />
      </div>
    </div>
  );

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:bg-slate-950 lg:dark:bg-slate-950"
    >
      {/* ── Personalized welcome banner ── */}
      {visitorName && (
        <div
          className="absolute top-20 left-0 right-0 z-30 flex justify-center px-4"
          style={{ animation: 'hero-welcome-slide 0.7s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border"
            style={{
              background: 'linear-gradient(135deg, rgba(225,29,72,0.12), rgba(124,58,237,0.12))',
              borderColor: 'rgba(225,29,72,0.3)',
              boxShadow: '0 2px 12px rgba(225,29,72,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              color: 'white',
            }}
          >
            <span className="text-sm" style={{ animation: 'hero-wave 1.5s 0.5s ease-in-out 3' }}>👋</span>
            <span className="text-white/80">Welcome,&nbsp;</span>
            <span
              className="font-extrabold"
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
      {/* Desktop Full-Screen Background Video */}
      {isDesktop && (
        <>
          <video
            ref={desktopVideoRef}
            className="hidden lg:block absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
            loop
            muted={isMuted}
            playsInline
            preload={ready ? "auto" : "none"}
          >
            <source src="/ArinJoshi.mp4" type="video/mp4" />
          </video>
          {/* Desktop 70% Opacity Dark Overlay */}
          <div className="hidden lg:block absolute inset-0 bg-black/70 z-10 pointer-events-none" />
        </>
      )}

      {/* Animated background grid - mobile only */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] lg:hidden"></div>

      {/* Gradient orbs - mobile only */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/15 rounded-full blur-3xl animate-pulse will-change-transform dark:bg-red-600/20 lg:hidden"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-pulse delay-1000 will-change-transform dark:bg-red-700/20 lg:hidden"></div>

      {/* Floating tech icons - reduced count for performance */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {techStack.map((tech, i) => (
          <div
            key={i}
            className="absolute animate-float will-change-transform"
            style={{
              top: `${15 + i * 12}%`,
              left: `${5 + i * 18}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${20 + i * 2}s`,
            }}
          >
            <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm dark:bg-slate-900/80 dark:border-slate-700/50 dark:shadow-none">
              <div
                className={`text-transparent bg-clip-text bg-gradient-to-r ${tech.color}`}
              >
                {tech.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 -translate-y-16 sm:-translate-y-20 lg:translate-y-0">
            {/* Title Icons */}
            <TitleIcons />

            {/* Status badge with glow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 mb-4 sm:mb-6 backdrop-blur-sm hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-300 lg:text-emerald-300">
                Open for opportunities
              </span>
              <Sparkles
                size={12}
                className="sm:w-3.5 sm:h-3.5 text-emerald-400"
              />
            </div>

            {/* Name with gradient */}
            <div className="mb-3 sm:mb-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight dark:text-white lg:text-white">
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-r ${nameColorGradients[nameColorIndex]} transition-all duration-1000`}>
                    {PERSONAL_INFO.name}
                  </span>
                  <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${nameColorGradients[nameColorIndex]} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-1000 origin-left`}></span>
                </span>
              </h1>
            </div>

            {/* Typing animation with role icons */}
            <div className="min-h-[32px] sm:min-h-[40px] mb-3 sm:mb-4">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="hidden sm:block p-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
                  <Code2 size={16} className="text-red-400" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 lg:text-slate-300 font-medium dark:text-slate-400">
                  <span className="text-slate-900 lg:text-white dark:text-white">{typedText}</span>
                  <span
                    className={`ml-1 inline-block w-0.5 h-5 sm:h-6 lg:h-8 bg-gradient-to-b from-red-400 to-red-600 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                  ></span>
                </h2>
              </div>
            </div>

            {/* Description with animated border */}
            <div className="relative group mb-6 sm:mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none lg:bg-slate-950/40 lg:border-white/10 lg:backdrop-blur-md">
                <p className="text-sm sm:text-base md:text-lg text-slate-700 lg:text-slate-200 leading-relaxed dark:text-slate-300">
                  {PERSONAL_INFO.summary}
                </p>
              </div>
            </div>

            {/* Quick stats - responsive grid (mobile/tablet only) */}
            {!isDesktop && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
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
                    className="text-center p-2 sm:p-3 rounded-xl bg-white/80 border border-slate-200 hover:border-red-400/60 transition-all group dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-red-500/50"
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
            )}

            {/* CTA Buttons - Mobile/Tablet only inside Left Content */}
            {!isDesktop && (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
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
                  href="/ArinJoshi.pdf"
                  download="ArinJoshi.pdf"
                  className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-slate-100/90 backdrop-blur-sm hover:bg-slate-200/90 text-slate-900 font-semibold transition-all border border-slate-300 hover:border-red-400 flex items-center justify-center gap-2 text-sm sm:text-base dark:bg-slate-800/50 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 dark:hover:border-red-500/50"
                >
                  <Download
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] group-hover:translate-y-1 transition-transform"
                  />
                  Download Resume
                </a>
              </div>
            )}

            {/* Social links have been moved to float around the image */}
          </div>

          {/* Right Content - Profile Card */}
          <div className="relative order-1 lg:order-2 mb-6 lg:mb-0">
            {/* Animated background rings - simplified for performance */}
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] aspect-video mx-auto -translate-y-10 lg:-translate-y-20">
              {/* Floating Badges */}
              <div className="absolute top-[10%] -left-6 sm:-left-12 lg:-left-16 z-20 animate-float" style={{ animationDelay: '0s', animationDuration: '4s' }}>
                <a href="https://www.linkedin.com/in/arinjoshi/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-blue-500 text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-110 transition-transform dark:bg-slate-900/90 dark:border-blue-500/80 dark:text-blue-400">
                  <Linkedin size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:block text-xs sm:text-sm font-bold">LinkedIn</span>
                </a>
              </div>

              <div className="absolute top-[60%] -right-6 sm:-right-12 lg:-right-16 z-20 animate-float" style={{ animationDelay: '1.5s', animationDuration: '5s' }}>
                <a href="https://github.com/Arin-joshi" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-purple-500 text-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-110 transition-transform dark:bg-slate-900/90 dark:border-purple-500/80 dark:text-purple-400">
                  <Github size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:block text-xs sm:text-sm font-bold">GitHub</span>
                </a>
              </div>

              <div className="absolute -bottom-6 left-[10%] sm:left-[20%] z-20 animate-float" style={{ animationDelay: '3s', animationDuration: '6s' }}>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-500 text-pink-600 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-110 transition-transform dark:bg-slate-900/90 dark:border-pink-500/80 dark:text-pink-400">
                  <Mail size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:block text-xs sm:text-sm font-bold">Email</span>
                </a>
              </div>
              


              {/* Premium Background Glow Orbs */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] bg-red-500/30 dark:bg-red-600/30 rounded-full blur-[40px] animate-pulse mix-blend-multiply dark:mix-blend-lighten"></div>
                <div className="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] bg-orange-500/30 dark:bg-orange-600/30 rounded-full blur-[40px] animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-lighten"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[40px] animate-pulse delay-700 mix-blend-multiply dark:mix-blend-lighten"></div>
              </div>

              {/* Main profile card with Glassmorphism and Animated Border */}
              <div className="relative group perspective w-full h-full z-10 transition-transform duration-700 sm:hover:rotate-y-3 sm:hover:rotate-x-3 sm:hover:scale-[1.02]">
                {/* Outer Wrapper for masking the rotating border */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.1)] dark:shadow-[0_0_40px_rgba(239,68,68,0.2)] bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-slate-700/50 group-hover:shadow-[0_0_60px_rgba(239,68,68,0.3)] transition-all duration-700">
                  
                  {/* Rotating Conic Gradient Borders */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-60 dark:opacity-80 group-hover:opacity-100 animate-[spin_4s_linear_infinite] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(239, 68, 68, 0.8) 90%, rgba(249, 115, 22, 1) 100%)' }}></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-40 dark:opacity-60 group-hover:opacity-100 animate-[spin_3s_linear_infinite_reverse] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'conic-gradient(from 180deg, transparent 0%, transparent 60%, rgba(168, 85, 247, 0.8) 90%, rgba(236, 72, 153, 1) 100%)' }}></div>
                  
                  {/* Inner Content Container (slightly smaller to reveal the border) */}
                  <div className="absolute inset-1 sm:inset-1.5 lg:inset-2 bg-slate-50 dark:bg-slate-950 rounded-xl sm:rounded-[1.3rem] lg:rounded-[1.7rem] overflow-hidden z-10 transition-transform duration-700">
                    {/* Profile Card Video (plays on both Desktop and Mobile) */}
                    <video
                      ref={cardVideoRef}
                      loop
                      muted={isDesktop ? true : isMuted}
                      playsInline
                      preload={ready ? "auto" : "none"}
                      className="w-full h-full object-cover scale-[1.15] transition-transform duration-700 group-hover:scale-[1.2]"
                    >
                      <source src="/ArinJoshi.mp4" type="video/mp4" />
                    </video>

                    {/* Location badge inside the glass card */}
                    <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6">
                      <div className="bg-white/95 backdrop-blur-xl p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-white/50 shadow-lg transform transition-all group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-slate-900/90 dark:border-slate-700/80">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-500"></div>
                            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <MapPin
                              size={12}
                              className="sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-slate-500 dark:text-slate-400"
                            />
                            <span className="text-slate-900 font-bold truncate dark:text-white tracking-wide">
                              {PERSONAL_INFO.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges - hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-5 lg:-bottom-10 -left-5 lg:-left-10 bg-white/95 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl border border-slate-200 shadow-lg animate-float dark:bg-slate-900/90 dark:border-slate-700 dark:shadow-none">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <Star size={12} className="lg:w-4 lg:h-4 text-yellow-500" />
                  <span className="text-xs lg:text-base text-slate-900 font-semibold dark:text-white">
                    Top Rated
                  </span>
                </div>
              </div>

              <div className="hidden sm:block absolute -top-5 lg:-top-10 -right-5 lg:-right-10 bg-white/95 backdrop-blur-sm p-2 lg:p-4 rounded-lg lg:rounded-xl border border-slate-200 shadow-lg animate-float animation-delay-2000 dark:bg-slate-900/90 dark:border-slate-700 dark:shadow-none">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <Zap size={12} className="lg:w-4 lg:h-4 text-red-500" />
                  <span className="text-xs lg:text-base text-slate-900 font-semibold dark:text-white">
                    MERN Expert
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 animate-bounce hidden xs:flex">
          <span className="text-[10px] sm:text-xs text-slate-600 lg:text-white/70 uppercase tracking-wider dark:text-slate-500">
            Scroll
          </span>
          <ChevronDown size={16} className="sm:w-5 sm:h-5 text-slate-600 lg:text-white/70 dark:text-slate-500" />
        </div>

        {/* Desktop Bottom Row: CTA Buttons + Stats Cards */}
        {isDesktop && (
          <div className="relative z-30 flex justify-between items-center mt-6 lg:mt-10 w-full">
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
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
                href="/ArinJoshi.pdf"
                download="ArinJoshi.pdf"
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
                  className="text-center p-2.5 sm:p-3.5 rounded-xl border transition-all group bg-slate-950/40 border-white/10 backdrop-blur-md hover:border-red-500/50 w-24 sm:w-28 lg:w-32"
                >
                  <div className="text-red-400 mb-1 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-white font-bold text-xs sm:text-sm lg:text-base">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
};

export default Hero;
