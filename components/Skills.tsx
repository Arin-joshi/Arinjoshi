import React, { useEffect, useRef, useState } from 'react';
import { SKILLS, CERTIFICATIONS, EDUCATION } from '../constants';
import { 
  Award, BookOpen, GraduationCap, Code2, 
  Sparkles, Zap, Cpu, Brain, Trophy,
  ChevronRight, ExternalLink, Calendar,
  MapPin, Star, TrendingUp
} from 'lucide-react';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const certRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eduRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll animations
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
      { threshold: 0.2, rootMargin: '50px' }
    );

    [...skillRefs.current, ...certRefs.current, ...eduRefs.current].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [animatedItems]);

  // Category filter for skills
  const categories = ['all', ...new Set(SKILLS.map(s => s.category))];
  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  // Category colors and icons
  const categoryConfig = {
    Frontend: { color: 'from-cyan-500 to-blue-500', icon: <Code2 size={14} />, bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    Backend: { color: 'from-green-500 to-emerald-500', icon: <Cpu size={14} />, bg: 'bg-green-500/10', text: 'text-green-400' },
    Database: { color: 'from-red-500 to-red-600', icon: <Brain size={14} />, bg: 'bg-red-500/10', text: 'text-red-400' },
    Core: { color: 'from-orange-500 to-red-500', icon: <Zap size={14} />, bg: 'bg-orange-500/10', text: 'text-orange-400' },
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse dark:bg-red-600/10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000 dark:bg-cyan-600/10"></div>
      <div className="absolute top-40 right-40 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700 dark:bg-emerald-600/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with animated gradient */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-red-400 animate-pulse" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">Technical Expertise</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 dark:text-white">
            Engineering{' '}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-gradient">
              Excellence
            </span>
          </h2>
          
          <p className="text-slate-600 max-w-2xl mx-auto text-lg dark:text-slate-400">
            Full-stack development expertise with a focus on 
            <span className="text-slate-900 font-semibold dark:text-white"> React.js </span> 
            and modern web technologies
          </p>
        </div>

        {/* Skills Section with Category Filter */}
        <div className="mb-20">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category 
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                    : 'bg-slate-100/90 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-red-400 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:text-white dark:border-slate-700 dark:hover:border-red-500/50'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {activeCategory === category && (
                  <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                )}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, index) => {
              const config = categoryConfig[skill.category as keyof typeof categoryConfig] || 
                { color: 'from-slate-500 to-slate-600', icon: <Code2 size={14} />, bg: 'bg-slate-500/10', text: 'text-slate-400' };
              
              return (
                <div
                  key={index}
                  ref={(el) => (skillRefs.current[index] = el)}
                  data-id={`skill-${index}`}
                  className={`
                    group relative transform transition-all duration-700 ease-out
                    ${animatedItems.has(`skill-${index}`) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Animated border gradient */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${config.color} rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500`}></div>
                  
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-transparent p-5 transition-all duration-300 shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none">
                    {/* Skill icon and name */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${config.bg} ${config.text}`}>
                        {config.icon}
                      </div>
                      <span className="text-slate-900 font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-slate-800 transition-all dark:text-white dark:group-hover:from-white dark:group-hover:to-slate-300">
                        {skill.name}
                      </span>
                    </div>
                    
                    {/* Skill level indicator */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                        <div className={`h-full bg-gradient-to-r ${config.color} w-[85%] group-hover:w-full transition-all duration-700`}></div>
                      </div>
                      <span className={`text-xs ${config.text}`}>Expert</span>
                    </div>
                    
                    {/* Category badge */}
                    <span className={`absolute top-1.5 right-1.5 text-[8px] px-1 py-0.5 rounded-full ${config.bg} ${config.text} border border-slate-500`}>
                      {skill.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications & Education Grid */}
        <div className="grid lg:grid-cols-2 gap-8" id="education">
          {/* Certifications Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30">
                <Trophy size={24} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Certifications</h3>
                <p className="text-slate-500 text-sm">Professional achievements</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={cert.id}
                  ref={(el) => (certRefs.current[index] = el)}
                  data-id={`cert-${cert.id}`}
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                  className={`
                    group relative transform transition-all duration-700 ease-out
                    ${animatedItems.has(`cert-${cert.id}`) 
                      ? 'translate-x-0 opacity-100' 
                      : '-translate-x-10 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                  
                  <div className="relative bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:border-red-400/60 transition-all group shadow-sm dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-red-500/50 dark:shadow-none">
                    <div className="flex items-start gap-4">
                      {/* Icon with animation */}
                      <div className={`
                        p-3 rounded-xl bg-red-500/10 text-red-400 transition-all duration-300
                        ${hoveredCert === cert.id ? 'scale-110 rotate-12' : ''}
                      `}>
                        <Award size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-slate-900 font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors dark:text-white dark:group-hover:text-red-400">
                              {cert.name}
                            </h4>
                            <p className="text-slate-600 text-sm flex items-center gap-2 dark:text-slate-400">
                              <span>by {cert.issuer}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                              <span className="text-emerald-400">Verified</span>
                            </p>
                          </div>
                          
                          {/* Certificate ID (mock) */}
                          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded dark:text-slate-600 dark:bg-slate-800/50">
                            #{cert.id.split('-')[1]}
                          </span>
                        </div>
                        
                        {/* Skills tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {['React', 'Web Dev', 'Professional'].map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800/80 dark:text-slate-400 dark:border-slate-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* View certificate link */}
                        <button className="mt-4 text-sm text-red-400 hover:text-red-300 flex items-center gap-1 group/btn">
                          View Certificate
                          <ExternalLink size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Animated progress indicator */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-red-700 w-0 group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30">
                <GraduationCap size={24} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h3>
                <p className="text-slate-500 text-sm">Academic background</p>
              </div>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <div
                  key={edu.id}
                  ref={(el) => (eduRefs.current[index] = el)}
                  data-id={`edu-${edu.id}`}
                  className={`
                    group relative transform transition-all duration-700 ease-out
                    ${animatedItems.has(`edu-${edu.id}`) 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-10 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline connector */}
                  {index < EDUCATION.length - 1 && (
                    <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-transparent"></div>
                  )}
                  
                  <div className="relative flex gap-4">
                    {/* Timeline dot with animation */}
                    <div className="relative">
                      <div className={`
                        w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 
                        flex items-center justify-center transition-all duration-500
                        group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]
                      `}>
                        <GraduationCap size={18} className="text-emerald-400" />
                      </div>
                    </div>
                    
                    {/* Content card */}
                    <div className="flex-1 bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:border-emerald-500/60 transition-all group-hover:translate-x-2 shadow-sm dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-emerald-500/50 dark:shadow-none">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors dark:text-white dark:group-hover:text-emerald-400">
                          {edu.degree}
                        </h4>
                        {edu.score && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/30">
                            {edu.score}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-emerald-400 font-medium mb-3">{edu.institution}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.period}
                        </span>
                        {edu.id === 'edu-1' && (
                          <span className="flex items-center gap-1 text-yellow-500">
                            <Star size={14} />
                            Outstanding Achievement
                          </span>
                        )}
                      </div>
                      
                      {/* Additional info for latest education */}
                      {edu.id === 'edu-1' && (
                        <div className="mt-4 flex gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            Computer Science
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                            B.Tech
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Summary Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Years Experience', value: '3+', icon: <TrendingUp size={20} />, color: 'from-blue-500 to-cyan-500' },
            { label: 'Projects Completed', value: '15+', icon: <Code2 size={20} />, color: 'from-red-500 to-red-600' },
            { label: 'Certifications', value: CERTIFICATIONS.length.toString(), icon: <Award size={20} />, color: 'from-emerald-500 to-teal-500' },
            { label: 'Technologies', value: SKILLS.length.toString(), icon: <Cpu size={20} />, color: 'from-orange-500 to-red-500' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500`}></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 p-6 text-center shadow-sm dark:bg-slate-900/90 dark:border-slate-800 dark:shadow-none">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color}/20 mb-3`}>
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;