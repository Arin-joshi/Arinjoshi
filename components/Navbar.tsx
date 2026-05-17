import React, { useState, useEffect } from "react";
import { Menu, X, Code2, ChevronDown, Home, Briefcase, FolderGit2, Cpu, GraduationCap, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("about");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveLink(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
        setShowMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "#about", icon: <Home size={16} /> },
    { name: "Experience", href: "#experience", icon: <Briefcase size={16} /> },
    { name: "Projects", href: "#projects", icon: <FolderGit2 size={16} /> },
    { name: "Skills", href: "#skills", icon: <Cpu size={16} /> },
    { name: "Education", href: "#education", icon: <GraduationCap size={16} /> },
    { name: "Contact", href: "#contact", icon: <Mail size={16} />, highlight: true },
  ];

  // Handle smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] border-b border-slate-200/80 dark:bg-slate-950/95 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:border-slate-800/50 py-2"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        {/* Animated gradient line at bottom */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex-shrink-0 flex items-center gap-2 sm:gap-3 group cursor-pointer relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Logo image with animation */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/25">
                <img
                  src="/ArinJoshi.png"
                  alt="Arin Joshi Logo"
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain rounded-lg group-hover:rotate-6 transition-transform duration-300"
                />
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Logo text with gradient */}
              <div className="relative overflow-hidden">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Arin
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500">
                    Joshi
                  </span>
                </span>
                {/* Underline animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </div>
            </a>

            {/* Desktop: nav + theme */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1 lg:gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`
                      relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      flex items-center gap-1.5 lg:gap-2 group overflow-hidden
                      ${link.highlight 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40' 
                        : activeLink === link.href.substring(1)
                          ? 'text-slate-900 bg-slate-900/5 dark:text-white dark:bg-white/10'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                      }
                    `}
                  >
                    {/* Icon with animation */}
                    <span className={`
                      transition-transform duration-300 group-hover:scale-110
                      ${link.highlight ? 'text-white/90' : 'text-slate-500 group-hover:text-red-600 dark:text-slate-400 dark:group-hover:text-red-400'}
                    `}>
                      {link.icon}
                    </span>
                    
                    <span>{link.name}</span>
                    
                    {/* Active indicator */}
                    {activeLink === link.href.substring(1) && !link.highlight && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600"></span>
                    )}
                    
                    {/* Hover effect background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </a>
                ))}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile: theme + menu */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-lg border border-slate-200 bg-white/90 text-slate-800 hover:border-red-400 transition-all duration-300 flex items-center justify-center group dark:bg-slate-800/80 dark:border-slate-700 dark:text-white dark:hover:border-red-500/50"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/20 to-red-700/20 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative transition-transform duration-300 group-hover:scale-110">
                  {isOpen ? (
                    <X size={20} />
                  ) : (
                    <Menu size={20} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden dark:bg-slate-950/95
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{ top: '64px' }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Menu content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Navigation links */}
          <div className="flex-1 flex flex-col gap-2 py-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  group relative px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${link.highlight 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25' 
                    : 'bg-slate-100/80 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-red-400 hover:bg-white dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:border-red-500/50 dark:hover:bg-slate-900'
                  }
                `}
                style={{
                  animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="flex items-center gap-3">
                  <span className={link.highlight ? 'text-white' : 'text-red-400'}>
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.name}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 group-hover:translate-x-1 ${
                      link.highlight ? 'text-white/70' : 'text-slate-500'
                    }`} 
                  />
                </div>

                {/* Hover effect */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/10 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile footer */}
          {/* <div className="pt-8 border-t border-slate-800">
            <div className="flex items-center justify-center gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:scale-110 transition-all duration-300"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/arinjoshi/"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/arinjoshi"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div> */}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;