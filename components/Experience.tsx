import React from 'react';
import { EXPERIENCE } from '../constants';
import { Briefcase, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Work Experience</h2>
          <div className="w-20 h-1.5 bg-violet-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 sm:pl-10 border-l-2 border-slate-700 last:border-0 pb-12 last:pb-0 group">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-violet-500 group-hover:bg-violet-500 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-violet-300 font-medium mt-1">
                      <Briefcase size={16} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-2 sm:mt-0 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-slate-700/50 hover:border-violet-500/30 transition-all shadow-lg hover:shadow-violet-500/5">
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;