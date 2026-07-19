import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { useAudio } from '../contexts/AudioContext';
import LookAtCursor from './LookAtCursor';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUp,
  Send,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Github,
  Coffee,
  Heart
} from 'lucide-react';

const Contact: React.FC = () => {
  const { isMuted } = useAudio();
  const { personalInfo } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoverCoords, setHoverCoords] = useState<Record<string, { x: number; y: number }>>({});
  // Track scroll depth for the back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when contact modal is open
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

  const playAudioCue = (type: 'hover' | 'click' | 'focus') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.01);
        gainNode.gain.setValueAtTime(0.003, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);
        osc.start(now);
        osc.stop(now + 0.01);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.03);
        gainNode.gain.setValueAtTime(0.015, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'focus') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.02);
        gainNode.gain.setValueAtTime(0.004, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverCoords(prev => ({ ...prev, [id]: { x, y } }));
  };

  const handleMouseLeave = (id: string) => {
    setHoverCoords(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playAudioCue('click');
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@ArinJoshi',
      icon: <Youtube size={18} />,
      color: 'from-red-500 to-rose-600',
      accentColor: '#ef4444',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arinjoshi/',
      icon: <Linkedin size={18} />,
      color: 'from-blue-500 to-cyan-600',
      accentColor: '#3b82f6',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/click_by_arin/',
      icon: <Instagram size={18} />,
      color: 'from-pink-500 to-rose-600',
      accentColor: '#ec4899',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Arin-joshi',
      icon: <Github size={18} />,
      color: 'from-slate-500 to-slate-600',
      accentColor: '#64748b',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-gray-400'
    }
  ];

  return (
    <>
      <footer
        id="contact"
        className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/40 pt-20 pb-8 overflow-hidden transition-colors duration-300"
      >
        {/* Background micro-dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 pointer-events-none"></div>
        
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none dark:bg-red-600/3"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none dark:bg-red-700/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            
            {/* Left Column: Let's create something amazing together */}
            <div className="space-y-6">
              <LookAtCursor type="robot" className="mx-auto lg:mx-0 mb-4" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Sparkles size={13} className="text-red-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">GET IN TOUCH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight dark:text-white tracking-tight">
                Let's create something{' '}
                <span className="block bg-gradient-to-r from-red-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  amazing together
                </span>
              </h2>

              <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed dark:text-slate-400">
                I'm currently available for freelance work and full-time opportunities. 
                Let's bring your ideas to life with clean code and high-performance solutions.
              </p>

              {/* Status Indicator Card */}
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 max-w-md">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white tracking-wide">Available for projects</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Average response latency: &lt; 24h</p>
                </div>
              </div>

              {/* Main CTA Button */}
              <button
                onClick={() => { playAudioCue('click'); setIsOpen(true); }}
                onMouseEnter={() => playAudioCue('hover')}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white dark:from-white dark:to-slate-100 dark:text-slate-900 rounded-xl font-mono text-xs tracking-wider uppercase transition-all hover:shadow-lg overflow-hidden flex items-center gap-2 border border-transparent dark:border-slate-200"
              >
                <span>Send Secure Message</span>
                <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Contact info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div 
                  className="flex items-center gap-3.5 p-4 bg-white/90 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800/80 transition-all duration-300 relative group overflow-hidden"
                  onMouseMove={(e) => handleMouseMove(e, 'email-card')}
                  onMouseLeave={() => handleMouseLeave('email-card')}
                  style={{
                    background: hoverCoords['email-card']
                      ? `radial-gradient(120px circle at ${hoverCoords['email-card'].x}px ${hoverCoords['email-card'].y}px, rgba(239, 68, 68, 0.1), transparent 70%)`
                      : undefined
                  }}
                >
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">Email Address</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-400">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
 
                <div 
                  className="flex items-center gap-3.5 p-4 bg-white/90 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800/80 transition-all duration-300 relative group overflow-hidden"
                  onMouseMove={(e) => handleMouseMove(e, 'phone-card')}
                  onMouseLeave={() => handleMouseLeave('phone-card')}
                  style={{
                    background: hoverCoords['phone-card']
                      ? `radial-gradient(120px circle at ${hoverCoords['phone-card'].x}px ${hoverCoords['phone-card'].y}px, rgba(239, 68, 68, 0.1), transparent 70%)`
                      : undefined
                  }}
                >
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">Telephone Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-400">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
 
                <div 
                  className="sm:col-span-2 flex items-center gap-3.5 p-4 bg-white/90 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800/80 transition-all duration-300 relative group overflow-hidden"
                  onMouseMove={(e) => handleMouseMove(e, 'location-card')}
                  onMouseLeave={() => handleMouseLeave('location-card')}
                  style={{
                    background: hoverCoords['location-card']
                      ? `radial-gradient(120px circle at ${hoverCoords['location-card'].x}px ${hoverCoords['location-card'].y}px, rgba(139, 92, 246, 0.1), transparent 70%)`
                      : undefined
                  }}
                >
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-750 dark:bg-slate-800 dark:text-slate-350">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">HQ Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Social grids */}
            <div className="space-y-6">
              <div className="bg-white/95 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-md">
                <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2.5 dark:text-white tracking-tight">
                  <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900">
                    <Coffee size={16} className="text-slate-500 dark:text-slate-400" />
                  </span>
                  Connect Channels
                </h3>

                {/* 2x2 Grid with Spotlight Glow Border */}
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const socId = `social-${social.name}`;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => playAudioCue('hover')}
                        onMouseMove={(e) => handleMouseMove(e, socId)}
                        onMouseLeave={() => handleMouseLeave(socId)}
                        className="group relative rounded-2xl transition-all duration-200 border border-slate-200 dark:border-slate-800 hover:border-transparent"
                      >
                        {/* Glowing spotlight mask */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: hoverCoords[socId]
                              ? `radial-gradient(120px circle at ${hoverCoords[socId].x}px ${hoverCoords[socId].y}px, ${social.accentColor}18, transparent 75%)`
                              : undefined,
                            border: '1px solid transparent',
                            backgroundImage: hoverCoords[socId]
                              ? `radial-gradient(90px circle at ${hoverCoords[socId].x}px ${hoverCoords[socId].y}px, ${social.accentColor}, transparent 80%)`
                              : undefined,
                            backgroundClip: 'border-box',
                            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude'
                          }}
                        />

                        {/* Card Content */}
                        <div className="p-4 flex flex-col items-center gap-2 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl">
                          <div className={`p-2.5 rounded-xl ${social.bgColor} group-hover:scale-105 transition-transform`}>
                            <div className={`${social.textColor}`}>
                              {social.icon}
                            </div>
                          </div>
                          <span className="text-xs font-mono tracking-wider text-slate-700 dark:text-slate-300">
                            {social.name}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">View index showcase</span>
                  <a href="#projects" className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center gap-1">
                    Projects Showcase
                    <ArrowUp size={12} className="rotate-45" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar Footer info */}
          <div className="relative pt-8 border-t border-slate-200/60 dark:border-slate-800/40">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                © {new Date().getFullYear()} {personalInfo.name}. 
                <span className="hidden sm:inline">All rights reserved.</span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  Made with <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" /> using React
                </span>
              </p>

              <div className="flex items-center gap-3">
                <a href="#privacy" className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">
                  Privacy
                </a>
                <span className="text-slate-350 dark:text-slate-800">•</span>
                <a href="#terms" className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">
                  Terms
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll back to top button */}
        <button
          onClick={() => { playAudioCue('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`fixed bottom-8 right-8 z-40 p-3.5 bg-slate-900 border border-slate-800 text-white rounded-full transition-all duration-300 group dark:bg-white dark:border-slate-200 dark:text-slate-900 ${
            showScrollTop ? 'opacity-100 translate-y-0 shadow-md' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </footer>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-md p-8 shadow-2xl dark:bg-slate-950 dark:border-slate-850">
            
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-850 hover:bg-slate-50 p-2 rounded-lg transition-all dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850">
                <MessageSquare size={20} className="text-slate-700 dark:text-slate-350" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Send a message</h3>
                <p className="text-xs text-slate-500">I will reply within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value="bd82c972-b151-4beb-9247-261d9ef155a7" />
              <input type="hidden" name="subject" value="New Portfolio Contact" />

              {!success ? (
                <>
                  <div>
                    <label className="block text-xs font-mono tracking-wide text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      onFocus={() => playAudioCue('focus')}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 focus:border-slate-600 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      onFocus={() => playAudioCue('focus')}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 focus:border-slate-600 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      required
                      onFocus={() => playAudioCue('focus')}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 focus:border-slate-600 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all resize-none dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-600 dark:focus:border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-mono tracking-wider uppercase transition-all hover:bg-slate-850 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 flex items-center justify-center gap-2 border border-transparent"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-slate-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-4">
                    <CheckCircle size={36} className="text-emerald-500" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Message Sent!</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Your secure transmission was completed. I'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;