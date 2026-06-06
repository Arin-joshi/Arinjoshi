import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../constants';
import { 
  Briefcase, Calendar, MapPin, Code2, 
  Sparkles, TrendingUp, Users, Rocket,
  ChevronRight, Award, Clock, Zap,
  Layers, GitBranch, Server, Globe
} from 'lucide-react';

const Experience: React.FC = () => {
  const [activeExp, setActiveExp] = useState<string | null>(null);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const expRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id && !animatedItems.has(id)) {
              setAnimatedItems(prev => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    expRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [animatedItems]);

  // Company colors and tech stacks (you can customize these)
  const companyConfig: Record<string, { color: string, tech: string[], icon: React.ReactNode }> = {
    'Aipxperts': {
      color: 'from-purple-500 to-pink-600',
      tech: ['React.js', 'PHP', 'Laravel', 'MySQL', 'AI Integration'],
      icon: <Globe size={16} />
    },
    'NKB PlayTech Pvt. Ltd': {
      color: 'from-red-500 to-red-600',
      tech: ['React.js', 'WebSockets', 'Node.js', 'TypeScript', 'Java'],
      icon: <Gamepad size={16} />
    },
    'Kotibox Global Technologies': {
      color: 'from-emerald-500 to-cyan-600',
      tech: ['MERN', 'React', 'Tailwind', 'REST API'],
      icon: <Globe size={16} />
    },
    'Celebal Technologies': {
      color: 'from-blue-500 to-indigo-600',
      tech: ['React.js', 'JavaScript', 'HTML/CSS'],
      icon: <Code2 size={16} />
    }
  };

  // Helper to get company config
  const getCompanyConfig = (company: string) => {
    return companyConfig[company] || {
      color: 'from-red-500 to-red-600',
      tech: ['React', 'JavaScript', 'Web Dev'],
      icon: <Briefcase size={16} />
    };
  };

  // Calculate duration in months (simplified - you can enhance this)
  const getDuration = (period: string) => {
    if (period.includes('Present')) return 'Current';
    return period.split('-')[1]?.trim() || '';
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse dark:bg-red-600/10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-red-700/10"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6 backdrop-blur-sm">
            <Rocket size={16} className="text-red-400 animate-pulse" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">Professional Journey</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 dark:text-white">
            Work{' '}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-gradient">
              Experience
            </span>
          </h2>
          
          <p className="text-slate-600 max-w-2xl mx-auto text-lg dark:text-slate-400">
            Over 3 years of hands-on experience building scalable applications
            and leading development initiatives
          </p>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <Briefcase size={20} />, label: 'Companies', value: EXPERIENCE.length },
            { icon: <Clock size={20} />, label: 'Years Active', value: '3+' },
            { icon: <Code2 size={20} />, label: 'Projects', value: '10+' },
            { icon: <Users size={20} />, label: 'Teams', value: '3' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 p-6 text-center shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none">
                <div className="inline-flex p-3 rounded-lg bg-red-500/10 text-red-600 mb-3 group-hover:scale-110 transition-transform dark:text-red-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto" ref={timelineRef}>
          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-600 via-red-700 to-transparent"></div>

            {EXPERIENCE.map((exp, index) => {
              const config = getCompanyConfig(exp.company);
              const isEven = index % 2 === 0;
              const duration = getDuration(exp.period);
              
              return (
                <div
                  key={exp.id}
                  ref={(el) => (expRefs.current[index] = el)}
                  data-id={`exp-${exp.id}`}
                  onMouseEnter={() => setActiveExp(exp.id)}
                  onMouseLeave={() => setActiveExp(null)}
                  className={`
                    relative flex flex-col sm:flex-row items-start gap-8 mb-12 last:mb-0
                    transform transition-all duration-1000 ease-out
                    ${animatedItems.has(`exp-${exp.id}`) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-20 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot with glow */}
                  <div className={`
                    absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 
                    w-8 h-8 rounded-full bg-white border-4 
                    transition-all duration-500 z-10 dark:bg-slate-900
                    ${activeExp === exp.id 
                      ? 'border-red-500 scale-125 shadow-[0_0_30px_rgba(220,38,38,0.8)]' 
                      : 'border-slate-300 dark:border-slate-700'}
                  `}>
                    <div className={`
                      absolute inset-0 rounded-full animate-ping opacity-20
                      ${activeExp === exp.id ? 'bg-red-500' : 'bg-slate-500'}
                    `}></div>
                  </div>

                  {/* Content card */}
                  <div className={`
                    w-full sm:w-[calc(50%-2rem)] 
                    ${isEven ? 'sm:ml-auto sm:pl-8' : 'sm:mr-auto sm:pr-8'}
                    pl-12 sm:pl-0
                  `}>
                    <div className={`
                      group relative transform transition-all duration-500
                      ${activeExp === exp.id ? 'scale-[1.02]' : 'scale-100'}
                    `}>
                      {/* Animated border */}
                      <div className={`
                        absolute -inset-0.5 bg-gradient-to-r ${config.color} 
                        rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500
                        ${activeExp === exp.id ? 'opacity-100' : ''}
                      `}></div>

                      {/* Main card */}
                      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none">
                        {/* Company header with gradient */}
                        <div className={`
                          p-6 bg-gradient-to-r ${config.color} bg-opacity-10 
                          border-b border-slate-200 dark:border-slate-800
                        `}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`
                                  px-3 py-1 rounded-full text-xs font-semibold
                                  bg-white/10 backdrop-blur-sm border border-white/20
                                `}>
                                  {duration}
                                </span>
                                {index === 0 && (
                                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Current
                                  </span>
                                )}
                              </div>
                              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-slate-700 dark:text-white dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all">
                                {exp.role}
                              </h3>
                              <div className="flex items-center gap-2 mt-2">
                                <Briefcase size={14} className="text-red-400" />
                                <span className="text-red-700 font-medium dark:text-red-300">{exp.company}</span>
                              </div>
                            </div>
                            
                            {/* Company icon */}
                            <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
                              {config.icon}
                            </div>
                          </div>
                        </div>

                        {/* Content body */}
                        <div className="p-6">
                          {/* Period */}
                          <div className="flex items-center gap-2 mb-4 text-sm">
                            <Calendar size={14} className="text-slate-500" />
                            <span className="text-slate-600 dark:text-slate-400">{exp.period}</span>
                            {exp.location && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                <MapPin size={14} className="text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-400">{exp.location}</span>
                              </>
                            )}
                          </div>

                          {/* Description list */}
                          <ul className="space-y-3 mb-6">
                            {exp.description.map((item, i) => (
                              <li 
                                key={i} 
                                className="flex items-start gap-3 text-slate-700 text-sm group/item dark:text-slate-300"
                                style={{ transitionDelay: `${i * 50}ms` }}
                              >
                                <span className={`
                                  mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${config.color} 
                                  flex-shrink-0 group-hover/item:scale-125 transition-transform
                                `}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech stack used */}
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                              <Layers size={12} />
                              TECH STACK
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {config.tech.map((tech, i) => (
                                <div
                                  key={i}
                                  onMouseEnter={() => setHoveredTech(tech)}
                                  onMouseLeave={() => setHoveredTech(null)}
                                  className={`
                                    px-3 py-1.5 rounded-lg text-xs font-medium
                                    transition-all duration-300 cursor-default
                                    ${hoveredTech === tech 
                                      ? `bg-gradient-to-r ${config.color} text-white scale-105` 
                                      : 'bg-slate-100/90 text-slate-700 border border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700'}
                                  `}
                                >
                                  {tech}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Key achievements badge (for recent roles) */}
                          {index === 0 && (
                            <div className="mt-4 flex items-center gap-2">
                              <Award size={14} className="text-yellow-500" />
                              <span className="text-xs text-yellow-500">Lead Developer • Key Contributor</span>
                            </div>
                          )}
                        </div>

                        {/* Animated progress indicator */}
                        <div className={`
                          absolute bottom-0 left-0 h-1 bg-gradient-to-r ${config.color} 
                          transition-all duration-700
                          ${activeExp === exp.id ? 'w-full' : 'w-0'}
                        `}></div>
                      </div>
                    </div>
                  </div>

                  {/* Year badge for desktop */}
                  <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-400 border border-slate-700">
                      {exp.period.split('-')[0].trim()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all group"
          >
            <span>Open for Opportunities</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(10px) translateX(5px); }
        }
        .animate-float {
          animation: float linear infinite;
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
      `}</style>
    </section>
  );
};

// Custom Gamepad icon component
function Gamepad({ size = 16 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12"></line>
      <line x1="8" x2="8" y1="10" y2="14"></line>
      <line x1="15" x2="15.01" y1="13" y2="13"></line>
      <line x1="18" x2="18.01" y1="11" y2="11"></line>
      <rect width="20" height="12" x="2" y="6" rx="2"></rect>
    </svg>
  );
}

export default Experience;