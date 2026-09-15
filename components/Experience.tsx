import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useData } from '../contexts/DataContext';
import { useAudio } from '../contexts/AudioContext';
import { 
  Briefcase, Calendar, MapPin, Code2, 
  Clock, Users, ChevronRight, Globe, Activity
} from 'lucide-react';
import LookAtCursor from './LookAtCursor';
import { useRafTilt } from '../hooks/useRafTilt';

interface CompanyMeta {
  color: string;
  accentColor: string;
  subtitle: string;
  icon: React.ReactNode;
  tech: string[];
  metrics: { label: string; value: string; desc: string }[];
  status: 'Current' | 'Completed';
  category: string;
}

const companyMetaMap: Record<string, CompanyMeta> = {
  'exp-3': {
    color: 'from-violet-500 to-indigo-600',
    accentColor: '#8b5cf6',
    subtitle: 'Platform Operations & Full Stack Engineering',
    icon: <Globe size={16} className="text-violet-500 dark:text-violet-400" />,
    tech: ['React.js', 'PHP', 'Laravel', 'MySQL', 'AI Integration'],
    metrics: [
      { label: 'Schools Supported', value: '3,500+', desc: 'Engineered observation workflows for Education Walkthrough platform.' },
      { label: 'Database Optimization', value: '+40%', desc: 'Optimized complex SQL queries and API response times.' },
      { label: 'Frontend Migration', value: '100%', desc: 'Ported legacy monolith pages into modular React components.' },
      { label: 'API Integrations', value: '12+', desc: 'Shipped third-party API integrations as production-grade solutions.' }
    ],
    status: 'Current',
    category: 'SaaS & Marketplace Engineering'
  },
  'exp-2': {
    color: 'from-red-500 to-rose-600',
    accentColor: '#ef4444',
    subtitle: 'High-Frequency Gaming Systems & UI Optimization',
    icon: <Activity size={16} className="text-red-500 dark:text-red-400" />,
    tech: ['React.js', 'WebSockets', 'Node.js', 'TypeScript', 'MongoDB'],
    metrics: [
      { label: 'WebSocket Latency', value: '<100ms', desc: 'Achieved near-zero delay state synchronization over socket pipelines.' },
      { label: 'Production Releases', value: '8+ Games', desc: 'Maintained and deployed highly interactive live multiplayer games.' },
      { label: 'GC Memory Overhead', value: '-35%', desc: 'Optimized render cycles to prevent garbage collection drops.' },
      { label: 'Sprint Delivery', value: '2x', desc: 'Accelerated feature delivery with AI-assisted dev and Jira workflows.' }
    ],
    status: 'Completed',
    category: 'Real-time Systems'
  },
  'exp-1': {
    color: 'from-blue-500 to-cyan-600',
    accentColor: '#3b82f6',
    subtitle: 'Design Systems & UI Engineering',
    icon: <Code2 size={16} className="text-blue-500 dark:text-blue-400" />,
    tech: ['React.js', 'JavaScript', 'HTML5 / CSS3', 'Tailwind CSS'],
    metrics: [
      { label: 'Component Reusability', value: '90%', desc: 'Built atomic frontend blocks using SOLID react patterns.' },
      { label: 'Pixel Fidelity', value: '100%', desc: 'Translated high-fidelity Figma specifications into interactive code.' },
      { label: 'Cross-device Score', value: 'Grade A', desc: 'Guaranteed fully fluid layouts across all mobile and web viewports.' },
      { label: 'Components Built', value: '10+', desc: 'Developed reusable React components with hooks and clean architecture.' }
    ],
    status: 'Completed',
    category: 'Design Systems'
  }
};

const mobileTabLabels: Record<string, { line1: string; line2: string }> = {
  'exp-3': { line1: 'Aipxperts', line2: 'Technolabs' },
  'exp-2': { line1: 'NKB', line2: 'PlayTech' },
  'exp-1': { line1: 'Celebal', line2: 'Technologies' },
};

const getMobileTabLabels = (id: string, company: string) =>
  mobileTabLabels[id] || { line1: company, line2: '' };

const Experience: React.FC = React.memo(() => {
  const { isMuted } = useAudio();
  const { experience } = useData();
  const [selectedExpId, setSelectedExpId] = useState<string>('');
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (experience.length > 0 && !selectedExpId) {
      setSelectedExpId(experience[0].id);
      setActiveTabId(experience[0].id);
    }
  }, [experience, selectedExpId]);
  
  const { hoverCoords, tiltStyle, handleMouseMove, handleMouseLeave } = useRafTilt();

  // Tab transition state for the details panel content
  const [animateCard, setAnimateCard] = useState<boolean>(true);

  // Trigger fade-and-slide transition when selected experience changes
  useEffect(() => {
    setAnimateCard(false);
    const timer = setTimeout(() => setAnimateCard(true), 80);
    return () => clearTimeout(timer);
  }, [selectedExpId]);

  const handleSelectCompany = (id: string) => {
    if (id === activeTabId) return;
    playAudioCue('select');
    setActiveTabId(id);
    setIsLoading(true);

    setTimeout(() => {
      setSelectedExpId(id);
      setIsLoading(false);
    }, 500);
  };

  // Premium subtle synthesizer sounds for physical feedback
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
        gainNode.gain.setValueAtTime(0.005, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
        osc.start(now);
        osc.stop(now + 0.015);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.04);
        gainNode.gain.setValueAtTime(0.015, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'select') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // C6
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(783.99, now); // G5
        osc2.frequency.exponentialRampToValueAtTime(1567.98, now + 0.1); // G6
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        gain2.gain.setValueAtTime(0.006, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc2.start(now);
        osc2.stop(now + 0.1);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const getCompanyConfig = (id: string): CompanyMeta => {
    return companyMetaMap[id] || {
      color: 'from-slate-700 to-slate-800',
      accentColor: '#64748b',
      subtitle: 'Software Engineer',
      icon: <Briefcase size={16} className="text-slate-500" />,
      tech: ['React', 'JavaScript'],
      metrics: [],
      status: 'Completed',
      category: 'Engineering'
    };
  };

  const activeExp = experience.find(e => e.id === selectedExpId) || experience[0] || { id: '', company: '', role: '', period: '', description: [] };
  const activeConfig = getCompanyConfig(activeExp.id);
  const pendingConfig = getCompanyConfig(activeTabId);



  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 lg:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Micro-Grid & Soft Ambient Illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 pointer-events-none"></div>
      
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none dark:bg-indigo-500/3"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none dark:bg-emerald-500/2"></div>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 z-10">
        
        {/* Modern Section Header */}
        <div className="text-center mb-5 sm:mb-10 lg:mb-16 flex flex-col items-center">
          <LookAtCursor type="robot" className="mx-auto scale-75 sm:scale-90 lg:scale-100" />
          
          <h2 id="experience-heading" className="text-xl sm:text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-2 sm:mb-4 dark:text-white px-1 mt-2 sm:mt-3">
            Work{' '}
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
              Experience
            </span>
          </h2>
          
          <p className="text-slate-500 max-w-xs sm:max-w-xl mx-auto text-[11px] sm:text-sm lg:text-base dark:text-slate-400 leading-relaxed px-1">
            A review of core engineering roles, systems architecture, and frontend initiatives.
          </p>
        </div>

        {/* Experience Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-10 lg:mb-12">
          {[
            { icon: <Briefcase size={14} className="sm:w-[18px] sm:h-[18px]" />, label: 'Roles held', shortLabel: 'Roles', value: experience.length },
            { icon: <Clock size={14} className="sm:w-[18px] sm:h-[18px]" />, label: 'Years active', shortLabel: 'Years', value: '3+' },
            { icon: <Code2 size={14} className="sm:w-[18px] sm:h-[18px]" />, label: 'Apps shipped', shortLabel: 'Apps', value: '15+' },
            { icon: <Users size={14} className="sm:w-[18px] sm:h-[18px]" />, label: 'Teams led', shortLabel: 'Teams', value: '3' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white/80 p-2.5 sm:p-4 lg:p-5 shadow-sm transition-all duration-300 dark:bg-slate-900/60 dark:border-slate-800 sm:hover:-translate-y-1 sm:hover:border-slate-350 dark:sm:hover:border-slate-700"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 lg:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:group-hover:scale-110 transition-transform shrink-0">
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white leading-none">{stat.value}</div>
                  <div className="text-[8px] sm:text-[10px] font-medium tracking-wide sm:tracking-wide text-slate-500 dark:text-slate-400 leading-tight mt-0.5 sm:mt-1">
                    <span className="sm:hidden">{stat.shortLabel}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Dashboard Layout */}
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 items-start min-h-0 lg:min-h-[520px]">

          {/* Mobile: compact company tabs */}
          <div className="col-span-full lg:hidden">
            <div className="grid grid-cols-3 gap-1">
              {experience.map((exp) => {
                const isSelected = exp.id === activeTabId;
                const labels = getMobileTabLabels(exp.id, exp.company);
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => handleSelectCompany(exp.id)}
                    className={`rounded-md px-1 py-1.5 text-center transition-all duration-200 border ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 dark:border-white dark:bg-slate-800'
                        : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/60'
                    }`}
                    title={exp.company}
                  >
                    <span
                      className={`block text-[10px] font-bold leading-none ${
                        isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {labels.line1}
                    </span>
                    {labels.line2 && (
                      <span
                        className={`block text-[9px] font-medium leading-none mt-0.5 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {labels.line2}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Desktop: left navigation tabs */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-2">
            {experience.map((exp, idx) => {
              const isSelected = exp.id === activeTabId;
              const meta = getCompanyConfig(exp.id);
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectCompany(exp.id)}
                  onMouseEnter={() => playAudioCue('hover')}
                  className={`w-full text-left rounded-2xl p-4 transition-all duration-200 border relative group ${
                    isSelected 
                      ? 'bg-white border-slate-900 text-slate-900 shadow-md dark:bg-slate-900 dark:border-white dark:text-white' 
                      : 'bg-white/40 border-slate-200/60 hover:bg-white text-slate-600 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:border-slate-750'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-950'}`}>
                        {meta.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{exp.company}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className={`transition-transform duration-200 ${isSelected ? 'translate-x-0.5 text-slate-900 dark:text-white' : 'opacity-20'}`} />
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-[10px] font-medium opacity-80">
                    <span>{exp.period.split('-')[0].trim()}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] ${
                      isSelected 
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200' 
                        : 'bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-500'
                    }`}>
                      {meta.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details panel */}
          <div className={`col-span-full lg:col-span-8 transition-all duration-300 ${
            animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div 
              className="group relative transition-all duration-200 rounded-2xl lg:rounded-3xl"
              onMouseMove={(e) => handleMouseMove(e, activeExp.id)}
              onMouseLeave={() => handleMouseLeave(activeExp.id)}
              style={{ 
                transform: tiltStyle[activeExp.id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Glowing spotlight border wrapper */}
              <div 
                className="relative p-[1px] rounded-2xl lg:rounded-3xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                style={{
                  background: hoverCoords[activeExp.id]
                    ? `radial-gradient(300px circle at ${hoverCoords[activeExp.id].x}px ${hoverCoords[activeExp.id].y}px, ${activeConfig.accentColor}, rgba(226, 232, 240, 0.4) 70%)`
                    : undefined
                }}
              >
                <div className="bg-white/95 dark:bg-slate-950 rounded-[15px] lg:rounded-[23px] p-4 sm:p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 relative">
                  
                  {/* Premium Brand-Colored Spinner Overlay (0.5s timeout transition) */}
                  <div className={`absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[3px] flex items-center justify-center z-25 rounded-[15px] lg:rounded-[23px] transition-all duration-300 pointer-events-none ${
                    isLoading ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex flex-col items-center gap-3">
                      <div 
                        className="w-10 h-10 border-2 border-transparent rounded-full animate-spin"
                        style={{
                          borderTopColor: pendingConfig.accentColor,
                          borderRightColor: pendingConfig.accentColor,
                        }}
                      ></div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 select-none">
                        Loading...
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{activeConfig.category}</span>
                        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                        <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium ${activeConfig.status === 'Current' ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}>
                          {activeConfig.status === 'Current' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>}
                          {activeConfig.status}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {activeExp.role}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                        <Briefcase size={12} className="text-slate-400 sm:w-[13px] sm:h-[13px]" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{activeExp.company}</span>
                      </p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 gap-3 sm:gap-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {activeExp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {activeExp.location}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 sm:mb-8 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-900">
                    <ul className="space-y-3 sm:space-y-4">
                      {activeExp.description.map((desc, dIdx) => (
                        <li 
                          key={dIdx} 
                          className="flex items-start gap-2.5 sm:gap-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-sans group/item"
                        >
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activeConfig.color} flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200`}></span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 sm:mb-8">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-4">
                      Measurable Impact
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3">
                      {activeConfig.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx} 
                          className="p-2 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50/50 border border-slate-200/50 dark:bg-slate-900/30 dark:border-slate-800/80 relative overflow-hidden"
                        >
                          <div className={`text-sm sm:text-xl font-bold bg-gradient-to-r ${activeConfig.color} bg-clip-text text-transparent mb-0.5 sm:mb-1 leading-none`}>
                            {metric.value}
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 mb-0.5 sm:mb-1 leading-tight">{metric.label}</div>
                          <div className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">{metric.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Core Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {activeConfig.tech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium bg-slate-50 text-slate-700 border border-slate-150 transition-colors duration-200 hover:bg-slate-100 hover:border-slate-300 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Experience;