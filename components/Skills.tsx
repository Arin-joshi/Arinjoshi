import React, { useEffect, useState } from 'react';
import { SKILLS, CERTIFICATIONS, EDUCATION } from '../constants';
import { useAudio } from '../contexts/AudioContext';
import { 
  Award, GraduationCap, Code2, 
  Sparkles, Zap, Cpu, Brain, Trophy,
  ExternalLink, Calendar, MapPin, Star
} from 'lucide-react';
import LookAtCursor from './LookAtCursor';

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

const Skills: React.FC = () => {
  const { isMuted } = useAudio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoverCoords, setHoverCoords] = useState<Record<string, { x: number; y: number }>>({});
  const [tiltStyle, setTiltStyle] = useState<Record<string, string>>({});
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverCoords(prev => ({ ...prev, [id]: { x, y } }));
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 3; 
    const rotateY = ((x - centerX) / centerX) * 3;
    
    setTiltStyle(prev => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`
    }));
  };

  const handleMouseLeave = (id: string) => {
    setHoverCoords(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setTiltStyle(prev => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }));
  };

  const categories = ['all', ...new Set(SKILLS.map(s => s.category))];
  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

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
      className="relative py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 pointer-events-none"></div>
      
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none dark:bg-red-600/3"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none dark:bg-cyan-600/3"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <LookAtCursor type="duck" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4 mt-2">
            <Sparkles size={13} className="text-red-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">TECHNICAL EXPERTISE</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 dark:text-white">
            Engineering{' '}
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
              Excellence
            </span>
          </h2>
          
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base dark:text-slate-400">
            A matrix of programming languages, framework state machines, and system logic libraries.
          </p>

          {/* Category Switchers */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                onMouseEnter={() => playAudioCue('hover')}
                className={`
                  px-4 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 border
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
        <div className="relative min-h-[220px] mb-24">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ${
            animateSkills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {filteredSkills.map((skill, index) => {
              const cfg = getStyle(skill.category);
              const cardId = `skill-${index}`;
              
              return (
                <div
                  key={index}
                  className="group relative transition-all duration-200 rounded-2xl"
                  onMouseMove={(e) => handleMouseMove(e, cardId)}
                  onMouseLeave={() => handleMouseLeave(cardId)}
                  style={{ 
                    transform: tiltStyle[cardId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <div 
                    className="relative p-[1px] rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                    style={{
                      background: hoverCoords[cardId]
                        ? `radial-gradient(160px circle at ${hoverCoords[cardId].x}px ${hoverCoords[cardId].y}px, ${cfg.accentColor}, rgba(226, 232, 240, 0.4) 70%)`
                        : undefined
                    }}
                  >
                    <div className="bg-white dark:bg-slate-950 rounded-[15px] p-5 relative min-h-[130px] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${cfg.bg} ${cfg.text}`}>
                            {cfg.icon}
                          </div>
                          <span className={`text-[9px] font-mono tracking-wider ${cfg.text}`}>
                            {skill.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-all dark:text-white dark:group-hover:from-white dark:group-hover:to-slate-350">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-mono leading-normal select-none">
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
        <div className="grid lg:grid-cols-2 gap-12" id="education">
          
          {/* Certifications Panel */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <Trophy size={18} className="text-red-500 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Certifications</h3>
                <p className="text-slate-500 text-xs font-mono">Academic achievements & coursework</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => {
                const certId = `cert-${cert.id}`;
                return (
                  <div
                    key={cert.id}
                    className="group relative transition-all duration-200 rounded-2xl"
                    onMouseMove={(e) => handleMouseMove(e, certId)}
                    onMouseLeave={() => handleMouseLeave(certId)}
                    style={{ 
                      transform: tiltStyle[certId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                      transition: 'transform 0.2s ease-out'
                    }}
                  >
                    <div 
                      className="relative p-[1px] rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                      style={{
                        background: hoverCoords[certId]
                          ? `radial-gradient(180px circle at ${hoverCoords[certId].x}px ${hoverCoords[certId].y}px, #ef4444, rgba(226, 232, 240, 0.4) 70%)`
                          : undefined
                      }}
                    >
                      <div className="bg-white/95 dark:bg-slate-950 p-5 rounded-[15px] relative">
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-lg bg-red-500/10 text-red-500">
                            <Award size={18} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                  {cert.name}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                  Issuer: {cert.issuer}
                                </p>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded">
                                ID: #{cert.id.split('-')[1]}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {['Software', 'Engineering', 'Verified'].map((tag, i) => (
                                <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-50 text-slate-650 border border-slate-150 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-850">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <button 
                              onClick={() => playAudioCue('click')}
                              className="mt-4 text-xs font-mono text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 group/btn"
                            >
                              Launch Verification
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
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <GraduationCap size={18} className="text-emerald-500 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Education</h3>
                <p className="text-slate-500 text-xs font-mono">Academic background records</p>
              </div>
            </div>

            <div className="space-y-6 relative pl-6">
              {/* Thin vertical timeline connector track */}
              <div className="absolute left-3 top-2 bottom-6 w-[1px] bg-slate-200 dark:bg-slate-850"></div>

              {EDUCATION.map((edu, index) => (
                <div key={edu.id} className="relative group/edu">
                  {/* Timeline circle node */}
                  <div className="absolute -left-6 top-1.5 transform -translate-x-1/2 w-3 h-3 rounded-full bg-slate-50 border border-slate-350 dark:bg-slate-950 dark:border-slate-750 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 group-hover/edu:scale-125 transition-transform duration-300"></div>
                  </div>
                  
                  {/* Card wrapper */}
                  <div className="bg-white/95 dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:border-emerald-500/40 dark:hover:border-emerald-500/30">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-sm font-bold text-slate-950 dark:text-white leading-snug">
                        {edu.degree}
                      </h4>
                      {edu.score && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                          {edu.score}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{edu.institution}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      {edu.id === 'edu-1' && (
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star size={12} className="fill-yellow-500/10" />
                          Outstanding CGPA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;