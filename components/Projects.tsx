import React from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Gamepad2, Globe } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1.5 bg-violet-600 rounded-full"></div>
          </div>
          <p className="text-slate-400 mt-4 md:mt-0 max-w-md text-right">
            Showcasing real-time gaming applications and responsive web solutions using the MERN stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group bg-card rounded-2xl overflow-hidden border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col h-full">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90"></div>
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
                    project.category === 'Game' 
                      ? 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300' 
                      : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                  }`}>
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.category === 'Game' ? <Gamepad2 className="text-slate-500" size={20} /> : <Globe className="text-slate-500" size={20} />}
                </div>

                <div className="space-y-2 mb-6 flex-1">
                  {project.description.map((desc, i) => (
                    <p key={i} className="text-slate-400 text-sm flex items-start gap-2">
                       <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 flex-shrink-0"></span>
                       {desc}
                    </p>
                  ))}
                </div>

                <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-violet-600 text-white font-medium transition-all flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100">
                  View Details <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;