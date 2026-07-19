import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAudio } from '../contexts/AudioContext';
import { ExternalLink, Gamepad2, Globe, Sparkles, Code2, Zap } from 'lucide-react';
import LookAtCursor from './LookAtCursor';

interface ProjectMeta {
  accentColor: string;
  glowColor: string;
  subCategory: string;
}

const projectMetaMap: Record<string, ProjectMeta> = {
  'Game': {
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    subCategory: 'Real-time Multiplayer Simulation'
  },
  'Web': {
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    subCategory: 'Enterprise Full Stack Platform'
  },
  'App': {
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    subCategory: 'Developer Utility Application'
  }
};

const Projects: React.FC = () => {
  const { isMuted } = useAudio();
  const { loading, projects } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoverCoords, setHoverCoords] = useState<Record<string, { x: number; y: number }>>({});
  const [tiltStyle, setTiltStyle] = useState<Record<string, string>>({});
  const [animateGrid, setAnimateGrid] = useState<boolean>(true);
  
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
        osc.frequency.setValueAtTime(1700, now);
        osc.frequency.exponentialRampToValueAtTime(2300, now + 0.012);
        gainNode.gain.setValueAtTime(0.004, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
        osc.start(now);
        osc.stop(now + 0.012);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.035);
        gainNode.gain.setValueAtTime(0.012, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'select') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
        gainNode.gain.setValueAtTime(0.008, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
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
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
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

  const getMeta = (category: string): ProjectMeta => {
    return projectMetaMap[category] || {
      accentColor: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.2)',
      subCategory: 'Interactive Experience'
    };
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Game': return <Gamepad2 size={13} className="text-red-500" />;
      case 'Web': return <Globe size={13} className="text-emerald-500" />;
      case 'App': return <Zap size={13} className="text-blue-500" />;
      default: return <Code2 size={13} className="text-slate-500" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch(category) {
      case 'Game': return 'from-red-500 to-rose-600';
      case 'Web': return 'from-emerald-500 to-teal-600';
      case 'App': return 'from-blue-500 to-indigo-600';
      default: return 'from-slate-700 to-slate-800';
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <section id="projects" className="relative py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-65 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-full mb-4" />
            <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded-full mb-3" />
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4" />
            <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          {/* Category Filter Skeletons */}
          <div className="flex justify-center gap-3 mb-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
            ))}
          </div>
          {/* Grid Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="projects" 
      className="relative py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 pointer-events-none"></div>
      
      <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none dark:bg-red-600/3"></div>
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none dark:bg-emerald-500/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <LookAtCursor type="cat" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4 mt-2">
            <Sparkles size={13} className="text-red-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">PORTFOLIO PROJECTS</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 dark:text-white">
            Crafting{' '}
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
              Interactive Experiences
            </span>
          </h2>
          
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base dark:text-slate-400">
            Real-time multiplayer gaming architectures and full-stack solutions built with the MERN system.
          </p>

          {/* Clean Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['All', 'Game', 'Web', 'App'].map((cat) => (
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
                {cat === 'All' ? 'All Releases' : cat === 'Game' ? 'Interactive Games' : cat === 'Web' ? 'Web Applications' : 'Developer Tools'}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid with Staged Entry & Shimmer overlay */}
        <div className="relative min-h-[400px]">
          
          {/* Card grid container */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
            animateGrid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {filteredProjects.map((project, index) => {
              const meta = getMeta(project.category);
              const grad = getCategoryGradient(project.category);
              return (
                <div
                  key={project.id}
                  className="group relative transition-all duration-200 rounded-2xl"
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                  style={{ 
                    transform: tiltStyle[project.id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  {/* Spotlight glowing border */}
                  <div 
                    className="relative p-[1px] rounded-2xl bg-slate-200 dark:bg-slate-800 transition-all duration-300"
                    style={{
                      background: hoverCoords[project.id]
                        ? `radial-gradient(220px circle at ${hoverCoords[project.id].x}px ${hoverCoords[project.id].y}px, ${meta.accentColor}, rgba(226, 232, 240, 0.4) 70%)`
                        : undefined
                    }}
                  >
                    
                    <div className="bg-white dark:bg-slate-950 rounded-[15px] overflow-hidden transition-all duration-300">
                      
                      {/* Image Frame */}
                      <a 
                        href={project.liveUrl || '#'}
                        onClick={(e) => {
                          e.preventDefault();
                          playAudioCue('click');
                          if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="block relative h-40 overflow-hidden group/img-link"
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img-link:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        
                        {/* Smooth shade shadow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* High-end micro tag badges overlay */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`
                            px-2 py-0.5 rounded-md text-[9px] font-mono tracking-widest uppercase backdrop-blur-md border border-white/20 text-white bg-black/35
                          `}>
                            {project.category}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                          <span className="text-[10px] font-mono text-white/80 truncate max-w-[70%]">
                            {meta.subCategory}
                          </span>
                        </div>
                      </a>

                      {/* Content panel */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-all dark:text-white dark:group-hover:from-white dark:group-hover:to-slate-300 line-clamp-1">
                            {project.title}
                          </h3>
                          <div className="p-1 rounded-md bg-slate-50 dark:bg-slate-900 flex-shrink-0">
                            {getCategoryIcon(project.category)}
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                          {project.description[0]}
                        </p>

                        {/* Tech tags chips */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-900">
                          {project.tech?.slice(0, 3).map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech && project.tech.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Live Button */}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playAudioCue('click')}
                            className={`
                              mt-4 w-full py-2 rounded-xl bg-gradient-to-r ${grad} 
                              text-white text-[11px] font-mono tracking-wider uppercase text-center block transition-all 
                              hover:shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:scale-[1.01]
                            `}
                          >
                            Launch Application
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>



        </div>

      </div>
    </section>
  );
};

export default Projects;