import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';
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
  Twitter,
  Coffee,
  Heart
} from 'lucide-react';

const Contact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      icon: <Youtube size={20} />,
      color: 'from-red-500 to-rose-600',
      hoverColor: 'hover:bg-red-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arinjoshi/',
      icon: <Linkedin size={20} />,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:bg-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/click_by_arin/',
      icon: <Instagram size={20} />,
      color: 'from-pink-500 to-rose-600',
      hoverColor: 'hover:bg-pink-600',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/arinjoshi',
      icon: <Github size={20} />,
      color: 'from-gray-500 to-slate-600',
      hoverColor: 'hover:bg-gray-600',
      bgColor: 'bg-gray-500/10',
      textColor: 'text-gray-400'
    }
  ];

  return (
    <>
      <footer
        id="contact"
        className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200/80 pt-20 pb-8 overflow-hidden dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:border-slate-800/50"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse dark:bg-violet-600/20"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-fuchsia-600/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            
            {/* Left side - CTA */}
            <div className="space-y-6">
              {/* Section badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm">
                <Sparkles size={16} className="text-violet-400" />
                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Get In Touch</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight dark:text-white">
                Let's create something
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                  amazing together
                </span>
              </h2>

              <p className="text-slate-600 text-lg max-w-md leading-relaxed dark:text-slate-400">
                I'm currently available for freelance work and full-time opportunities. 
                Let's bring your ideas to life with clean code and creative solutions.
              </p>

              {/* Availability indicator */}
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm max-w-md dark:bg-slate-900/50 dark:border-slate-800 dark:shadow-none">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                </div>
                <div>
                  <p className="text-slate-900 font-medium dark:text-white">Available for opportunities</p>
                  <p className="text-sm text-slate-500">Reply within 24 hours</p>
                </div>
              </div>

              {/* CTA Button with animation */}
              <button
                onClick={() => setIsOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send a Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-fuchsia-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>

              {/* Contact info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-violet-400/70 transition-all group shadow-sm dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-violet-500/50 dark:shadow-none">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 group-hover:scale-110 transition-transform dark:text-violet-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm text-slate-900 hover:text-violet-600 transition-colors dark:text-white dark:hover:text-violet-400">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-violet-400/70 transition-all group shadow-sm dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-violet-500/50 dark:shadow-none">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 group-hover:scale-110 transition-transform dark:text-violet-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm text-slate-900 hover:text-violet-600 transition-colors dark:text-white dark:hover:text-violet-400">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-violet-400/70 transition-all group shadow-sm dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-violet-500/50 dark:shadow-none">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 group-hover:scale-110 transition-transform dark:text-violet-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm text-slate-900 dark:text-white">{PERSONAL_INFO.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Social links */}
            <div className="space-y-6">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-800 dark:shadow-none">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 dark:text-white">
                  <span className="p-2 rounded-lg bg-violet-500/10">
                    <Coffee size={20} className="text-violet-400" />
                  </span>
                  Connect with me
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="group relative p-4 rounded-xl bg-slate-100/90 border border-slate-200 hover:border-transparent transition-all duration-300 overflow-hidden dark:bg-slate-800/50 dark:border-slate-700"
                    >
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`p-3 rounded-lg ${social.bgColor} group-hover:bg-white/20 transition-colors`}>
                          <div className={`${social.textColor} group-hover:text-white transition-colors`}>
                            {social.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors dark:text-slate-300 dark:group-hover:text-white">
                          {social.name}
                        </span>
                      </div>

                      {/* Hover effect dot */}
                      {hoveredSocial === social.name && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      )}
                    </a>
                  ))}
                </div>

                {/* Additional links */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Check out my work</span>
                    <a href="#projects" className="text-sm text-violet-600 hover:text-violet-500 flex items-center gap-1 dark:text-violet-400 dark:hover:text-violet-300">
                      View Projects
                      <ArrowUp size={14} className="rotate-45" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="relative pt-8 border-t border-slate-200/80 dark:border-slate-800/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500 flex items-center gap-2">
                © {new Date().getFullYear()} {PERSONAL_INFO.name}. 
                <span className="hidden sm:inline">All rights reserved.</span>
                <span className="flex items-center gap-1 text-xs">
                  Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> using React
                </span>
              </p>

              <div className="flex items-center gap-3">
                <a href="#privacy" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  Privacy
                </a>
                <span className="text-slate-700">•</span>
                <a href="#terms" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 group ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </footer>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-2xl w-full max-w-md p-8 shadow-2xl dark:from-slate-900 dark:to-slate-950 dark:border-slate-800">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-600/20 rounded-full blur-3xl"></div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200 p-2 rounded-lg transition-all dark:text-slate-400 dark:hover:text-white dark:bg-slate-800/50 dark:hover:bg-slate-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30">
                <MessageSquare size={24} className="text-violet-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send a message</h3>
                <p className="text-sm text-slate-500">I'll get back to you within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="access_key" value="bd82c972-b151-4beb-9247-261d9ef155a7" />
              <input type="hidden" name="subject" value="New Portfolio Contact" />

              {!success ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2 dark:text-slate-400">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2 dark:text-slate-400">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2 dark:text-slate-400">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] disabled:opacity-50 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex p-4 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                    <CheckCircle size={48} className="text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2 dark:text-white">Message Sent!</h4>
                  <p className="text-slate-600 dark:text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
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