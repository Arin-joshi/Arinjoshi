import React, { useEffect, useState } from 'react';
import { EXPERIENCE } from '../constants';
import { useAudio } from '../contexts/AudioContext';
import { 
  Briefcase, Calendar, MapPin, Code2, 
  Clock, Users, ChevronRight, Globe, Activity
} from 'lucide-react';
import LookAtCursor from './LookAtCursor';

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
      { label: 'Database Optimization', value: '+40%', desc: 'Optimized complex SQL queries and API response times.' },
      { label: 'Frontend Migration', value: '100%', desc: 'Ported legacy monolith pages into modular React components.' },
      { label: 'AI Search Matcher', value: '98%', desc: 'Engineered search matches for freelance digital marketer tools.' }
    ],
    status: 'Current',
    category: 'Marketplace Engineering'
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
      { label: 'GC Memory Overhead', value: '-35%', desc: 'Optimized render cycles to prevent garbage collection drops.' }
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
      { label: 'Cross-device Score', value: 'Grade A', desc: 'Guaranteed fully fluid layouts across all mobile and web viewports.' }
    ],
    status: 'Completed',
    category: 'Design Systems'
  }
};

const Experience: React.FC = () => {
  const { isMuted } = useAudio();
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCE[0]?.id || 'exp-3');
  const [activeTabId, setActiveTabId] = useState<string>(EXPERIENCE[0]?.id || 'exp-3');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Hover and tilt coordinate states for the card spotlight borders
  const [hoverCoords, setHoverCoords] = useState<Record<string, { x: number; y: number }>>({});
  const [tiltStyle, setTiltStyle] = useState<Record<string, string>>({});
  
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

  // Cursor spotlight calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverCoords(prev => ({
      ...prev,
      [id]: { x, y }
    }));
    
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

  const activeExp = EXPERIENCE.find(e => e.id === selectedExpId) || EXPERIENCE[0];
  const activeConfig = getCompanyConfig(activeExp.id);
  const pendingConfig = getCompanyConfig(activeTabId);

  return (
    <section 
      id="experience" 
      className="relative py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Micro-Grid & Soft Ambient Illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 pointer-events-none"></div>
      
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none dark:bg-indigo-500/3"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none dark:bg-emerald-500/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Modern Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <LookAtCursor type="robot" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">PROFESSIONAL JOURNEY</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 dark:text-white">
            Work{' '}
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
              Experience
            </span>
          </h2>
          
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base dark:text-slate-400">
            A review of core engineering roles, systems architecture, and frontend initiatives.
          </p>
        </div>

        {/* Experience Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Briefcase size={18} />, label: 'ROLES HELD', value: EXPERIENCE.length },
            { icon: <Clock size={18} />, label: 'YEARS ACTIVE', value: '3+' },
            { icon: <Code2 size={18} />, label: 'APPLICATIONS SHIPPED', value: '15+' },
            { icon: <Users size={18} />, label: 'TEAMS COORDINATED', value: '3' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition-all duration-300 dark:bg-slate-900/60 dark:border-slate-800 hover:-translate-y-1 hover:border-slate-350 dark:hover:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Dashboard Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start min-h-[520px]">
          
          {/* Left Navigation Tabs (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 dark:text-slate-400 px-3 py-1 uppercase">
              Select Company
            </span>
            {EXPERIENCE.map((exp, idx) => {
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
                        <div className="text-[9px] font-mono tracking-wider opacity-60">STREAM_0{idx+1}</div>
                        <div className="font-semibold text-sm tracking-wide">{exp.company}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className={`transition-transform duration-200 ${isSelected ? 'translate-x-0.5 text-slate-900 dark:text-white' : 'opacity-20'}`} />
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono opacity-80">
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

          {/* Right Details Panel (8 columns) */}
          <div className={`lg:col-span-8 transition-all duration-300 ${
            animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div 
              className="group relative transition-all duration-200 rounded-3xl"
              onMouseMove={(e) => handleMouseMove(e, activeExp.id)}
              onMouseLeave={() => handleMouseLeave(activeExp.id)}
              style={{ 
                transform: tiltStyle[activeExp.id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Glowing spotlight border wrapper */}
              <div 
                className="relative p-[1px] rounded-3xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                style={{
                  background: hoverCoords[activeExp.id]
                    ? `radial-gradient(300px circle at ${hoverCoords[activeExp.id].x}px ${hoverCoords[activeExp.id].y}px, ${activeConfig.accentColor}, rgba(226, 232, 240, 0.4) 70%)`
                    : undefined
                }}
              >
                <div className="bg-white/95 dark:bg-slate-950 rounded-[23px] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 relative">
                  
                  {/* Premium Brand-Colored Spinner Overlay (0.5s timeout transition) */}
                  <div className={`absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[3px] flex items-center justify-center z-25 rounded-[23px] transition-all duration-300 pointer-events-none ${
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
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase select-none">
                        Updating Stream...
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">{activeConfig.category}</span>
                        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono ${activeConfig.status === 'Current' ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}>
                          {activeConfig.status === 'Current' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>}
                          {activeConfig.status}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {activeExp.role}
                      </h3>
                      <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                        <Briefcase size={13} className="text-slate-400" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{activeExp.company}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end text-xs font-mono text-slate-500 dark:text-slate-400 gap-1.5">
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

                  <div className="mb-8 pt-4 border-t border-slate-100 dark:border-slate-900">
                    <ul className="space-y-4">
                      {activeExp.description.map((desc, dIdx) => (
                        <li 
                          key={dIdx} 
                          className="flex items-start gap-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-sans group/item"
                        >
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activeConfig.color} flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200`}></span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 dark:text-slate-400 block mb-4 uppercase">
                      Measurable Impact
                    </span>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {activeConfig.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx} 
                          className="p-4 rounded-xl bg-slate-50/50 border border-slate-200/50 dark:bg-slate-900/30 dark:border-slate-800/80 relative overflow-hidden"
                        >
                          <div className={`text-xl font-bold bg-gradient-to-r ${activeConfig.color} bg-clip-text text-transparent mb-1`}>
                            {metric.value}
                          </div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{metric.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">{metric.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-500 dark:text-slate-400 block mb-3 uppercase">
                      Core Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeConfig.tech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-50 text-slate-700 border border-slate-150 transition-colors duration-200 hover:bg-slate-100 hover:border-slate-300 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:border-slate-700"
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
};

export default Experience;