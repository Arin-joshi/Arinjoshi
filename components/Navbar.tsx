import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Menu, X, Home, Briefcase, FolderGit2, Cpu, GraduationCap, Mail, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AudioToggle from "./AudioToggle";

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("about");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navTrackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const navLinks = useMemo(
    () => [
      { name: "About", href: "#about", icon: <Home size={17} /> },
      { name: "Experience", href: "#experience", icon: <Briefcase size={17} /> },
      { name: "Projects", href: "#projects", icon: <FolderGit2 size={17} /> },
      { name: "Skills", href: "#skills", icon: <Cpu size={17} /> },
      { name: "Education", href: "#education", icon: <GraduationCap size={17} /> },
      { name: "Contact", href: "#contact", icon: <Mail size={17} />, highlight: true },
    ],
    []
  );

  const mainLinks = useMemo(() => navLinks.filter((link) => !link.highlight), [navLinks]);
  const contactLink = navLinks.find((link) => link.highlight);

  const updateIndicator = useCallback(() => {
    const container = navTrackRef.current;
    const el = linkRefs.current.get(activeLink);
    if (!container || !el) return;
    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [activeLink]);

  useEffect(() => {
    let ticking = false;
    const scrollOffset = 120;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 16);

          const sections = navLinks.map((link) => link.href.substring(1));
          let currentSection = sections[0];

          // Pick the last section whose top has passed the nav — handles nested anchors (e.g. education inside skills)
          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i]);
            if (element && element.getBoundingClientRect().top <= scrollOffset) {
              currentSection = sections[i];
              break;
            }
          }

          setActiveLink(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator, { passive: true });
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 72;
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  const glassShell =
    "rounded-2xl border backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-out " +
    "bg-white/55 dark:bg-slate-950/45 border-white/40 dark:border-white/10 " +
    "shadow-[0_8px_32px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.55)] " +
    "dark:shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]";

  const glassTrack =
    "relative flex items-center gap-0.5 p-1 rounded-xl border backdrop-blur-xl " +
    "bg-white/25 dark:bg-white/[0.04] border-white/30 dark:border-white/[0.08] " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

  return (
    <>
      <nav aria-label="Primary navigation" className="fixed w-full z-50 px-3 sm:px-5 lg:px-8 pt-2.5 md:pt-3.5 transition-all duration-500">
        <div
          className={`max-w-7xl mx-auto ${glassShell} ${scrolled ? "py-2 px-3 sm:px-4" : "py-2.5 px-3 sm:px-4 md:py-3"}`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              aria-label="Arin Joshi - Go to about section"
              className="flex items-center gap-2.5 min-w-0 group shrink-0"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden ring-1 ring-white/30 dark:ring-white/20 bg-slate-800/80 backdrop-blur-sm">
                  <img
                    src="/favicon.webp"
                    alt="Arin Joshi"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white/80 dark:ring-slate-950/80" />
              </div>

              <div className="min-w-0 leading-tight">
                <span className="block text-sm sm:text-base font-bold tracking-tight truncate text-slate-900 dark:text-white">
                  Arin
                  <span className="text-red-500 dark:text-red-400">Joshi</span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
              <div ref={navTrackRef} className={glassTrack}>
                {/* Sliding liquid-glass pill */}
                {indicator.width > 0 && activeLink !== "contact" && (
                  <div
                    className="absolute top-1 bottom-1 rounded-lg pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] bg-white/70 dark:bg-white/10 border border-white/50 dark:border-white/15 shadow-[0_2px_12px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    style={{ left: indicator.left, width: indicator.width }}
                  />
                )}

                {mainLinks.map((link) => {
                  const id = link.href.substring(1);
                  const isActive = activeLink === id;
                  return (
                    <a
                      key={link.name}
                      ref={(node) => {
                        if (node) linkRefs.current.set(id, node);
                        else linkRefs.current.delete(id);
                      }}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative z-10 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors duration-300 ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      <span className={`transition-colors duration-300 ${isActive ? "text-red-500" : "opacity-60"}`}>
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {contactLink && (
                <a
                  href={contactLink.href}
                  onClick={(e) => handleNavClick(e, contactLink.href)}
                  className="relative px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap text-white bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-md border border-red-400/30 shadow-[0_4px_20px_rgba(220,38,38,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.35)] transition-all duration-300 hover:scale-[1.02]"
                >
                  {contactLink.icon}
                  <span>{contactLink.name}</span>
                </a>
              )}

              <div className={`flex items-center gap-0.5 p-1 rounded-xl border backdrop-blur-xl bg-white/25 dark:bg-white/[0.04] border-white/30 dark:border-white/[0.08]`}>
                <AudioToggle variant="ghost" />
                <ThemeToggle variant="ghost" />
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center md:hidden p-1 rounded-xl bg-slate-900/75 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/10">
              <AudioToggle variant="ghost-dark" />
              <ThemeToggle variant="ghost-dark" />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors duration-300"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[min(300px,88vw)] border-l border-white/10 shadow-2xl backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.08) 0%, rgba(15,23,42,0.92) 40%, rgba(2,6,23,0.97) 100%)",
          }}
        >
          <div className="h-[4.5rem]" />

          <div className="px-5 pb-6 flex flex-col h-[calc(100%-4.5rem)]">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Explore portfolio</h3>
            </div>

            <nav className="flex flex-col gap-1.5 flex-1">
              {navLinks.map((link, index) => {
                const isActive = activeLink === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      link.highlight
                        ? "bg-gradient-to-r from-red-600/90 to-red-700/90 text-white shadow-lg shadow-red-500/20 border border-red-400/20 mt-2"
                        : isActive
                          ? "bg-white/12 text-white border border-white/15 backdrop-blur-md"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                    style={{ transitionDelay: isOpen ? `${index * 40}ms` : "0ms" }}
                  >
                    <span className={link.highlight ? "text-white" : isActive ? "text-red-400" : "text-slate-500 group-hover:text-red-400"}>
                      {link.icon}
                    </span>
                    <span className="flex-1">{link.name}</span>
                    {!link.highlight && (
                      <ArrowRight
                        size={14}
                        className={`transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 ${
                          isActive ? "opacity-60 translate-x-0 text-red-400" : "text-slate-500"
                        }`}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 mt-auto border-t border-white/[0.08]">
              <p className="text-[10px] text-slate-500 font-medium text-center">© {new Date().getFullYear()} Arin Joshi</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;
