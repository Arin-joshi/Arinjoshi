import React, { useState, useEffect } from "react";
import { Menu, X, Code2, ChevronDown, Home, Briefcase, FolderGit2, Cpu, GraduationCap, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AudioToggle from "./AudioToggle";

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
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
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
                  src="/favicon.png"
                  alt="Arin Joshi"
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain rounded-lg group-hover:rotate-6 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Logo text with gradient */}
              <div className="relative overflow-hidden">
                <span className={`font-bold text-lg sm:text-xl tracking-tight transition-colors duration-500 ${
                  scrolled 
                    ? "text-slate-900 dark:text-white" 
                    : "text-slate-900 lg:text-white dark:text-white"
                }`}>
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
                          ? scrolled
                            ? 'text-slate-900 bg-slate-900/5 dark:text-white dark:bg-white/10'
                            : 'text-slate-900 lg:text-white bg-slate-900/5 dark:text-white dark:bg-white/10'
                          : scrolled
                            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                            : 'text-slate-600 lg:text-slate-300 lg:hover:text-white hover:text-slate-900 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                      }
                    `}
                  >
                    {/* Icon with animation */}
                    <span className={`
                      transition-transform duration-300 group-hover:scale-110
                      ${link.highlight 
                        ? 'text-white/90' 
                        : activeLink === link.href.substring(1)
                          ? scrolled 
                            ? 'text-slate-900 dark:text-white' 
                            : 'text-slate-900 lg:text-white dark:text-white'
                          : scrolled
                            ? 'text-slate-500 group-hover:text-red-600 dark:text-slate-400 dark:group-hover:text-red-400'
                            : 'text-slate-500 lg:text-slate-400 lg:group-hover:text-white group-hover:text-red-600 dark:text-slate-400 dark:group-hover:text-red-400'
                      }
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
              <AudioToggle />
              <ThemeToggle />
            </div>

            {/* Mobile: theme + menu */}
            <div className="flex items-center gap-2 md:hidden">
              <AudioToggle />
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

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            absolute top-full right-4 sm:right-6 w-[240px] mt-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.15)] border border-slate-200/80 z-40 transition-all duration-300 ease-out md:hidden dark:bg-slate-900/95 dark:border-slate-800/80 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] origin-top-right overflow-hidden
            ${isOpen ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-2'}
          `}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-700/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          {/* Menu content */}
          <div className="relative flex flex-col p-3 gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3
                  ${link.highlight 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-500/20 mt-1 hover:shadow-red-500/40' 
                    : activeLink === link.href.substring(1)
                      ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }
                `}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(10px)'
                }}
              >
                <span className={`
                  ${link.highlight ? 'text-white' : activeLink === link.href.substring(1) ? 'text-red-500' : 'text-slate-400 group-hover:text-red-500'}
                  transition-colors duration-300
                `}>
                  {link.icon}
                </span>
                <span className="flex-1">{link.name}</span>
                
                {/* Active indicator dot */}
                {activeLink === link.href.substring(1) && !link.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                )}
                
                {/* Hover effect background */}
                {!link.highlight && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/5 to-red-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

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