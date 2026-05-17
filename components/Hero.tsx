import React, { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO } from "../constants";
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

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [nameColorIndex, setNameColorIndex] = useState(0);
  const [cardColorIndex, setCardColorIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

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
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)]"></div>

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/15 rounded-full blur-3xl animate-pulse will-change-transform dark:bg-red-600/20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-pulse delay-1000 will-change-transform dark:bg-red-700/20"></div>

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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Title Icons */}
            <TitleIcons />

            {/* Status badge with glow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 mb-4 sm:mb-6 backdrop-blur-sm hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-emerald-300">
                Open for opportunities
              </span>
              <Sparkles
                size={12}
                className="sm:w-3.5 sm:h-3.5 text-emerald-400"
              />
            </div>

            {/* Name with gradient */}
            <div className="mb-3 sm:mb-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight dark:text-white">
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
            <div className="h-16 sm:h-20 mb-4 sm:mb-6">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="hidden sm:block p-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
                  <Code2 size={16} className="text-red-400" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 font-medium dark:text-slate-400">
                  <span className="text-slate-900 dark:text-white">{typedText}</span>
                  <span
                    className={`ml-1 inline-block w-0.5 h-5 sm:h-6 lg:h-8 bg-gradient-to-b from-red-400 to-red-600 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                  ></span>
                </h2>
              </div>
            </div>

            {/* Description with animated border */}
            <div className="relative group mb-6 sm:mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none">
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed dark:text-slate-300">
                  {PERSONAL_INFO.summary}
                </p>
              </div>
            </div>

            {/* Quick stats - responsive grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {[
                {
                  icon: <Award size={14} className="sm:w-4 sm:h-4" />,
                  label: "Experience",
                  value: "2+ Years",
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
                  <div className="text-[10px] sm:text-xs text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
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

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 sm:p-3 rounded-xl bg-white/90 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-400 hover:scale-110 transition-all group dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:hover:text-red-400 dark:hover:border-red-500/50"
              >
                <Mail
                  size={18}
                  className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/arinjoshi/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 sm:p-3 rounded-xl bg-white/90 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-400 hover:scale-110 transition-all group dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:hover:text-red-400 dark:hover:border-red-500/50"
              >
                <Linkedin
                  size={18}
                  className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform"
                />
              </a>
              <a
                href="https://github.com/Arin-joshi"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 sm:p-3 rounded-xl bg-white/90 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-400 hover:scale-110 transition-all group dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:hover:text-red-400 dark:hover:border-red-500/50"
              >
                <Github
                  size={18}
                  className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div className="relative order-1 lg:order-2 mb-6 lg:mb-0">
            {/* Animated background rings - simplified for performance */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] border border-red-500/30 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px] border border-red-600/20 rounded-full animate-spin-slow animation-delay-2000"></div>
              </div>

              {/* Main profile card */}
              <div className="relative group perspective w-full h-full">
                <div className="relative w-full h-full">
                  {/* Profile image container */}
                  <div className="relative w-full h-full">
                    {/* Glow effect behind image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-full blur-3xl"></div>

                    {/* Animated gradient border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${cardColorGradients[cardColorIndex]} rounded-2xl sm:rounded-3xl lg:rounded-[2rem] animate-spin-slow transition-all duration-1000`}></div>

                    {/* Transparent image container */}
                    <div className="absolute inset-1 sm:inset-1.5 lg:inset-2 bg-transparent rounded-2xl sm:rounded-3xl lg:rounded-[1.9rem] overflow-hidden">
                      <img
                        src="/profile.png"
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-contain opacity-100 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80";
                        }}
                      />

                      {/* Location badge */}
                      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6">
                        <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl border border-slate-200 shadow-md transform transition-all group-hover:translate-y-[-5px] dark:bg-slate-900/90 dark:border-slate-700 dark:shadow-none">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-500"></div>
                              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                              <MapPin
                                size={12}
                                className="sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-slate-500"
                              />
                              <span className="text-slate-900 font-medium truncate dark:text-white">
                                {PERSONAL_INFO.location}
                              </span>
                            </div>
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
          <span className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider dark:text-slate-500">
            Scroll
          </span>
          <ChevronDown size={16} className="sm:w-5 sm:h-5 text-slate-600 dark:text-slate-500" />
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
};

export default Hero;
