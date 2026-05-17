import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Gamepad2, Globe, Github, Sparkles, Code2, Zap } from 'lucide-react';

const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project-id');
            if (projectId && !visibleProjects.includes(projectId)) {
              setVisibleProjects((prev) => [...prev, projectId]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleProjects]);

  // Helper function to get gradient based on category
  const getCategoryGradient = (category: string) => {
    switch(category) {
      case 'Game':
        return 'from-red-600 to-red-700';
      case 'Web':
        return 'from-emerald-600 to-cyan-600';
      case 'App':
        return 'from-blue-600 to-indigo-600';
      default:
        return 'from-red-600 to-red-700';
    }
  };

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Game':
        return <Gamepad2 className="text-red-400" size={16} />;
      case 'Web':
        return <Globe className="text-emerald-400" size={16} />;
      case 'App':
        return <Zap className="text-blue-400" size={16} />;
      default:
        return <Code2 className="text-slate-400" size={16} />;
    }
  };

  // Handle button clicks
  const handleLiveClick = (e: React.MouseEvent, url?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGithubClick = (e: React.MouseEvent, url?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse dark:bg-red-600/10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-emerald-600/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4 backdrop-blur-sm">
            <Sparkles size={14} className="text-red-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300">Featured Work</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 dark:text-white">
            Crafting{' '}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Interactive Experiences
            </span>
          </h2>
          
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base dark:text-slate-400">
            Real-time gaming applications and web solutions built with the MERN stack
          </p>
        </div>

        {/* Responsive Grid: 2 on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardRefs.current.set(project.id, el);
              }}
              data-project-id={project.id}
              className={`
                group relative transform transition-all duration-700 ease-out
                ${visibleProjects.includes(project.id) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${parseInt(project.id.split('-')[1]) * 100}ms` }}
            >
              {/* Card Container */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm hover:border-red-400/70 transition-all duration-300 overflow-hidden dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none dark:hover:border-red-500/50">
                
                {/* Image Section - Make image clickable */}
                <a 
                  href={project.liveUrl || '#'}
                  onClick={(e) => handleLiveClick(e, project.liveUrl)}
                  className="block relative h-28 sm:h-32 lg:h-36 overflow-hidden group/image"
                  target={project.liveUrl ? "_blank" : undefined}
                  rel={project.liveUrl ? "noopener noreferrer" : undefined}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/50 to-transparent dark:from-slate-900 dark:via-slate-900/50"></div>
                  
                  {/* Hover overlay with play icon */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-2 rounded-full bg-red-600/90 backdrop-blur-sm">
                      <ExternalLink size={16} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`
                      px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md border
                      ${project.category === 'Game' 
                        ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                        : project.category === 'Web'
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                      }
                    `}>
                      {project.category}
                    </span>
                  </div>

                  {/* Tech Stack Chips */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex gap-1 max-w-[70%]">
                      {project.tech.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200 text-[8px] sm:text-[10px] text-slate-700 truncate dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200 text-[8px] sm:text-[10px] text-slate-700 dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-300">
                          +{project.tech.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </a>

                {/* Content Section */}
                <div className="p-3 sm:p-4">
                  {/* Title */}
                  <a 
                    href={project.liveUrl || '#'}
                    onClick={(e) => handleLiveClick(e, project.liveUrl)}
                    target={project.liveUrl ? "_blank" : undefined}
                    rel={project.liveUrl ? "noopener noreferrer" : undefined}
                    className="block mb-2"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1 dark:text-white dark:group-hover:text-red-400">
                      {project.title}
                    </h3>
                  </a>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-slate-600 mb-3 line-clamp-2 dark:text-slate-400">
                    {project.description[0]}
                  </p>

                  {/* Highlights */}
                  <div className="flex gap-2 mb-3">
                    {project.category === 'Game' ? (
                      <>
                        <span className="flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded dark:text-slate-500 dark:bg-slate-800/30">
                          <Zap size={10} className="text-red-400" />
                          Real-time
                        </span>
                        <span className="flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded dark:text-slate-500 dark:bg-slate-800/30">
                          <Gamepad2 size={10} className="text-red-400" />
                          Game
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded dark:text-slate-500 dark:bg-slate-800/30">
                          <Globe size={10} className="text-emerald-400" />
                          Responsive
                        </span>
                        <span className="flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded dark:text-slate-500 dark:bg-slate-800/30">
                          <Code2 size={10} className="text-emerald-400" />
                          MERN
                        </span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Live Demo Button */}
                    <button 
                      onClick={(e) => handleLiveClick(e, project.liveUrl)}
                      disabled={!project.liveUrl}
                      className={`
                        flex-1 py-1.5 rounded-lg bg-gradient-to-r ${getCategoryGradient(project.category)} 
                        text-white text-[10px] sm:text-xs font-medium transition-all 
                        hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] 
                        flex items-center justify-center gap-1
                        ${!project.liveUrl ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <ExternalLink size={12} />
                      <span className="hidden xs:inline">Live</span>
                    </button>
                  </div>
                </div>

                {/* Hover Progress Indicator */}
                <div className={`
                  absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${getCategoryGradient(project.category)} 
                  w-0 group-hover:w-full transition-all duration-500
                `}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;