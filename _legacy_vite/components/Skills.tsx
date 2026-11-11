import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useData } from '../contexts/DataContext';
import { useAudio } from '../contexts/AudioContext';
import { 
  Award, GraduationCap, Code2, 
  Zap, Cpu, Brain, Trophy,
  ExternalLink, Calendar, MapPin, Star,
  Rocket, Crown, Globe
} from 'lucide-react';
import LookAtCursor from './LookAtCursor';
import { useRafTilt } from '../hooks/useRafTilt';

interface CategoryStyle {
  color: string;
  accentColor: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
  categoryDesc: string;
}

const categoryConfig: Record<string, CategoryStyle> = {
  Frontend: { 
    color: 'from-cyan-500 to-blue-500', 
    accentColor: '#06b6d4',
    icon: <Code2 size={14} />, 
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/5', 
    text: 'text-cyan-500 dark:text-cyan-400',
    categoryDesc: 'Production React interfaces, state managers & responsive engines.'
  },
  Backend: { 
    color: 'from-emerald-500 to-teal-500', 
    accentColor: '#10b981',
    icon: <Cpu size={14} />, 
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/5', 
    text: 'text-emerald-500 dark:text-emerald-400',
    categoryDesc: 'Scalable service logic, Socket.io channels & API gateway routers.'
  },
  Database: { 
    color: 'from-purple-500 to-indigo-500', 
    accentColor: '#a855f7',
    icon: <Brain size={14} />, 
    bg: 'bg-purple-500/10 dark:bg-purple-500/5', 
    text: 'text-purple-500 dark:text-purple-400',
    categoryDesc: 'Structured data relationships, NoSQL query profiles & indexing.'
  },
  Core: { 
    color: 'from-red-500 to-rose-500', 
    accentColor: '#ef4444',
    icon: <Zap size={14} />, 
    bg: 'bg-red-500/10 dark:bg-red-500/5', 
    text: 'text-red-500 dark:text-red-400',
    categoryDesc: 'System architecture foundations, algorithms & design principles.'
  }
};

const Skills: React.FC = React.memo(() => {
  const { isMuted } = useAudio();
  const { skills, certifications, education } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { hoverCoords, tiltStyle, handleMouseMove, handleMouseLeave } = useRafTilt();

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(skills.map(s => s.category)))];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return activeCategory === 'all'
      ? skills
      : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [skills, activeCategory]);
  const [animateSkills, setAnimateSkills] = useState<boolean>(true);
  
  // Instantaneous filter change
  const handleFilterChange = (category: string) => {
    if (category === activeCategory) return;
    playAudioCue('select');
    setActiveCategory(category);
  };

  // Synthesizer audio engine
  const playAudioCue = (type: 'hover' | 'click' | 'select') => {
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
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.015);
        gainNode.gain.setValueAtTime(0.004, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
        osc.start(now);
        osc.stop(now + 0.015);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);
        gainNode.gain.setValueAtTime(0.015, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'select') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1);
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const getStyle = (category: string): CategoryStyle => {
    return categoryConfig[category] || { 
      color: 'from-slate-500 to-slate-600', 
      accentColor: '#64748b',
      icon: <Code2 size={14} />, 
      bg: 'bg-slate-500/10', 
      text: 'text-slate-400',
      categoryDesc: 'Software engineering skill depth.'
    };
  };



  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative pt-10 pb-16 sm:py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 pointer-events-none"></div>
      
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none dark:bg-red-600/3"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none dark:bg-cyan-600/3"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center mb-8 sm:mb-16 flex flex-col items-center">
          <LookAtCursor type="duck" className="mx-auto scale-75 sm:scale-90 lg:scale-100" />
          
          <h2 id="skills-heading" className="text-xl sm:text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-2 sm:mb-4 dark:text-white px-1 mt-2 sm:mt-3">
            Engineering{' '}
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
              Excellence
            </span>
          </h2>
          
          <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm lg:text-base dark:text-slate-400 px-2">
            A matrix of programming languages, framework state machines, and system logic libraries.
          </p>

          {/* Category Switchers */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                onMouseEnter={() => playAudioCue('hover')}
                className={`
                  px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium tracking-wide transition-all duration-200 border
                  ${activeCategory === cat 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md dark:bg-white dark:border-white dark:text-slate-900' 
                    : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white'
                  }
                `}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid Section */}
        <div className="relative min-h-[180px] sm:min-h-[220px] mb-16 sm:mb-24">
          <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 transition-all duration-300 ${
            animateSkills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {filteredSkills.map((skill, index) => {
              const cfg = getStyle(skill.category);
              const cardId = `skill-${index}`;
              
              return (
                <div
                  key={index}
                  className="group relative transition-all duration-200 rounded-xl sm:rounded-2xl"
                  onMouseMove={(e) => handleMouseMove(e, cardId)}
                  onMouseLeave={() => handleMouseLeave(cardId)}
                  style={{ 
                    transform: tiltStyle[cardId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <div 
                    className="relative p-[1px] rounded-xl sm:rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300 h-full"
                    style={{
                      background: hoverCoords[cardId]
                        ? `radial-gradient(160px circle at ${hoverCoords[cardId].x}px ${hoverCoords[cardId].y}px, ${cfg.accentColor}, rgba(226, 232, 240, 0.4) 70%)`
                        : undefined
                    }}
                  >
                    <div className="bg-white dark:bg-slate-950 rounded-[11px] sm:rounded-[15px] p-3 sm:p-5 relative min-h-[108px] sm:min-h-[130px] h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${cfg.bg} ${cfg.text}`}>
                            {cfg.icon}
                          </div>
                          <span className={`text-[8px] sm:text-[9px] font-medium tracking-wide ${cfg.text}`}>
                            {skill.category}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-all dark:text-white dark:group-hover:from-white dark:group-hover:to-slate-350 leading-tight">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2 font-medium leading-snug select-none line-clamp-2 sm:line-clamp-none">
                        {cfg.categoryDesc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


        </div>

        {/* Certifications & Education Split Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12" id="education">
          
          {/* Certifications Panel */}
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-8">
              <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
                <Trophy size={16} className="sm:w-[18px] sm:h-[18px] text-red-500 dark:text-red-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">Certifications</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">Academic achievements & coursework</p>
              </div>
            </div>
            
            <div className="space-y-2.5 sm:space-y-4">
              {certifications.map((cert) => {
                const certId = `cert-${cert.id}`;
                return (
                  <div
                    key={cert.id}
                    className="group relative transition-all duration-200 rounded-xl sm:rounded-2xl"
                    onMouseMove={(e) => handleMouseMove(e, certId)}
                    onMouseLeave={() => handleMouseLeave(certId)}
                    style={{ 
                      transform: tiltStyle[certId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                      transition: 'transform 0.2s ease-out'
                    }}
                  >
                    <div 
                      className="relative p-[1px] rounded-xl sm:rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                      style={{
                        background: hoverCoords[certId]
                          ? `radial-gradient(180px circle at ${hoverCoords[certId].x}px ${hoverCoords[certId].y}px, #ef4444, rgba(226, 232, 240, 0.4) 70%)`
                          : undefined
                      }}
                    >
                      <div className="bg-white/95 dark:bg-slate-950 p-3.5 sm:p-5 rounded-[11px] sm:rounded-[15px] relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-rose-500 sm:hidden" />
                        <div className="flex items-start gap-3 sm:gap-4 pl-1.5 sm:pl-0">
                          <div className="hidden sm:flex p-2.5 rounded-lg bg-red-500/10 text-red-500 shrink-0">
                            <Award size={18} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                  {cert.name}
                                </h4>
                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                  {cert.issuer}
                                </p>
                              </div>
                              <span className="hidden sm:inline text-[9px] font-mono font-medium text-slate-500 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded shrink-0">
                                ID: #{cert.id.split('-')[1]}
                              </span>
                            </div>
                            
                            <button 
                              onClick={() => playAudioCue('click')}
                              className="mt-2.5 sm:mt-4 text-[10px] sm:text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 group/btn"
                            >
                              View credential
                              <ExternalLink size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education Panel */}
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-8">
              <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
                <GraduationCap size={16} className="sm:w-[18px] sm:h-[18px] text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">Education</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Academic background records</p>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-4 md:space-y-6 relative">
              {/* Timeline track — desktop/tablet only */}
              <div className="hidden md:block absolute left-3 top-3 bottom-3 w-px bg-slate-200 dark:bg-slate-800" />

              {education.map((edu) => (
                <div key={edu.id} className="relative group/edu md:flex md:items-start md:gap-4">
                  {/* Timeline node — desktop/tablet only */}
                  <div className="hidden md:flex w-6 shrink-0 justify-center pt-4">
                    <div className="relative z-10 w-3 h-3 rounded-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover/edu:scale-125 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/50 backdrop-blur-sm p-3.5 sm:p-5 transition-all duration-200 hover:border-emerald-500/30 dark:hover:border-emerald-500/25">
                    {/* Mobile accent stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 md:hidden" />

                    <div className="pl-2 md:pl-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-snug pr-1">
                          {edu.degree}
                        </h4>
                        {edu.score && (
                          <span className="shrink-0 px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                            {edu.score}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 leading-snug">
                        {edu.institution}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={11} className="shrink-0 text-emerald-500/80" />
                          {edu.period}
                        </span>
                        {edu.id === 'edu-1' && (
                          <span className="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400">
                            <Star size={11} className="fill-amber-400/30 shrink-0" />
                            Outstanding CGPA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Founder Startup Card — Fills empty space below Education */}
            <div className="mt-5 sm:mt-6">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 sm:p-2.5 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-lg sm:rounded-xl border border-cyan-500/20 shrink-0">
                  <Rocket size={16} className="sm:w-[18px] sm:h-[18px] text-cyan-500 dark:text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">Own Venture & Startup</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Founder & Owner Leadership</p>
                </div>
              </div>

              <div className="group relative transition-all duration-200 rounded-xl sm:rounded-2xl">
                <div 
                  className="relative p-[1px] rounded-xl sm:rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                >
                  <div className="bg-white/95 dark:bg-slate-950 p-4 sm:p-5 rounded-[11px] sm:rounded-[15px] relative overflow-hidden">
                    
                    {/* Top Row: Logo + Title + Founder Badge */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 p-1.5 shrink-0 border border-slate-700/50 shadow-md flex items-center justify-center">
                          <img 
                            src="/Project Image/Arin's Technology.png" 
                            alt="Arins Technology Logo" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                            Arins Technology
                          </h4>
                          <p className="text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                            Founder & Owner
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Crown size={10} className="text-amber-400 fill-amber-400/40" />
                        Founder
                      </span>
                    </div>

                    {/* Thumbnail Image Banner */}
                    <div className="relative w-full aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-800 group/banner">
                      <img 
                        src="/Project Image/Arin'sTechnology.webp" 
                        alt="Arins Technology Website" 
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover/banner:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-medium pointer-events-none">
                        <span className="flex items-center gap-1 backdrop-blur-md bg-black/40 px-2 py-0.5 rounded border border-white/10">
                          <Globe size={10} className="text-cyan-400" />
                          arinstechnology.in
                        </span>
                        <span className="backdrop-blur-md bg-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded border border-cyan-400/30 font-semibold text-[9px]">
                          Self Startup
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mb-3.5 leading-relaxed">
                      Founded Arins Technology as a self-started technology venture delivering web development, custom software engineering, and digital transformation solutions.
                    </p>

                    {/* Visit Button */}
                    <a
                      href="https://www.arinstechnology.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAudioCue('click')}
                      className="w-full py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-center flex items-center justify-center gap-1.5 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-[1.01] group/btn"
                    >
                      <span>Visit Arins Technology</span>
                      <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

export default Skills;