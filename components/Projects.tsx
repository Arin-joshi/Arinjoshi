import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Gamepad2, Globe, Github, Sparkles, Code2, Zap, Award } from 'lucide-react';

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
      { threshold: 0.2, rootMargin: '50px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleProjects]);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (hoveredId !== id) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setHoveredId(null);
  };

  // Helper function to get gradient based on category
  const getCategoryGradient = (category: string) => {
    switch(category) {
      case 'Game':
        return 'from-fuchsia-600 to-purple-600';
      case 'Web':
        return 'from-emerald-600 to-cyan-600';
      case 'App':
        return 'from-blue-600 to-indigo-600';
      default:
        return 'from-violet-600 to-fuchsia-600';
    }
  };

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Game':
        return <Gamepad2 className="text-fuchsia-400" size={20} />;
      case 'Web':
        return <Globe className="text-emerald-400" size={20} />;
      case 'App':
        return <Zap className="text-blue-400" size={20} />;
      default:
        return <Code2 className="text-slate-400" size={20} />;
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Floating orbs with category-based colors */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-40 right-40 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with animated gradient */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-violet-400 animate-pulse" />
            <span className="text-sm font-medium text-violet-300">Featured Portfolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Crafting{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
              Interactive Experiences
            </span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real-time gaming applications and web solutions built with the{' '}
            <span className="text-white font-semibold">MERN stack</span>, 
            featuring WebSocket integration and responsive design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardRefs.current.set(project.id, el);
              }}
              data-project-id={project.id}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredId(project.id)}
              className={`
                group relative transform transition-all duration-700 ease-out
                ${visibleProjects.includes(project.id) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'}
              `}
              style={{ transitionDelay: `${parseInt(project.id.split('-')[1]) * 150}ms` }}
            >
              {/* Animated border gradient */}
              <div className={`
                absolute -inset-0.5 bg-gradient-to-r ${getCategoryGradient(project.category)} 
                rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500 
                group-hover:duration-200
              `}></div>
              
              <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-transparent transition-all duration-500 overflow-hidden">
                {/* Project image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback image if the main one fails to load
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border
                      ${project.category === 'Game' 
                        ? 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300' 
                        : project.category === 'Web'
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                      }
                    `}>
                      {project.category}
                    </span>
                    
                    {/* Live/Play badge */}
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border
                      ${project.category === 'Game'
                        ? 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300'
                        : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                      }
                    `}>
                      {project.category === 'Game' ? 'Play Now' : 'Live Demo'}
                    </span>
                  </div>

                  {/* Tech stack chips - if available */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm border border-slate-700"
                        >
                          <span className="text-xs text-slate-300">{tech}</span>
                        </div>
                      ))}
                      {project.tech.length > 3 && (
                        <div className="px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm border border-slate-700">
                          <span className="text-xs text-slate-300">+{project.tech.length - 3}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700">
                      {getCategoryIcon(project.category)}
                    </div>
                  </div>

                  {/* Description with bullet points */}
                  <div className="space-y-3 mb-6">
                    {project.description.map((desc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`
                          mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r 
                          ${getCategoryGradient(project.category)} flex-shrink-0
                        `}></div>
                        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack section */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-violet-500/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project highlights based on category */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {project.category === 'Game' && (
                      <>
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 p-2 rounded-lg">
                          <Zap size={14} className="text-fuchsia-400" />
                          <span>Real-time</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 p-2 rounded-lg">
                          <Gamepad2 size={14} className="text-fuchsia-400" />
                          <span>Multiplayer</span>
                        </div>
                      </>
                    )}
                    {project.category === 'Web' && (
                      <>
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 p-2 rounded-lg">
                          <Globe size={14} className="text-emerald-400" />
                          <span>Responsive</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 p-2 rounded-lg">
                          <Code2 size={14} className="text-emerald-400" />
                          <span>MERN Stack</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button className={`
                      flex-1 py-3 rounded-xl bg-gradient-to-r ${getCategoryGradient(project.category)} 
                      text-white font-medium transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] 
                      hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2
                    `}>
                      {project.category === 'Game' ? 'Play Game' : 'View Live'}
                      <ExternalLink size={16} />
                    </button>
                    <button className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all border border-slate-700 hover:border-slate-600">
                      <Github size={18} />
                    </button>
                  </div>
                </div>

                {/* Animated progress indicator */}
                <div className={`
                  absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${getCategoryGradient(project.category)} 
                  w-0 group-hover:w-full transition-all duration-700
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