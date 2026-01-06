import React from 'react';
import { SKILLS, CERTIFICATIONS, EDUCATION } from '../constants';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Skills Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Skills</h2>
            <div className="w-20 h-1.5 bg-violet-600 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {SKILLS.map((skill, index) => (
              <div 
                key={index} 
                className="bg-card border border-slate-700/50 px-6 py-3 rounded-xl hover:border-violet-500 hover:bg-violet-500/10 transition-all cursor-default group"
              >
                <span className="text-slate-300 group-hover:text-white font-medium">{skill.name}</span>
                <span className="text-xs text-slate-500 block text-center mt-1 uppercase tracking-wider group-hover:text-violet-300/70">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12" id="education">
            {/* Certifications */}
            <div>
                 <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-violet-500/10 rounded-lg text-violet-400">
                        <Award size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Certifications</h3>
                 </div>
                 
                 <div className="space-y-4">
                    {CERTIFICATIONS.map((cert) => (
                        <div key={cert.id} className="bg-card p-5 rounded-xl border border-slate-700/50 hover:border-violet-500/30 transition-all flex items-start gap-4">
                            <div className="mt-1">
                                <BookOpen size={18} className="text-violet-500" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold">{cert.name}</h4>
                                <p className="text-slate-400 text-sm mt-1">by {cert.issuer}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Education */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <GraduationCap size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Education</h3>
                 </div>

                 <div className="space-y-6">
                    {EDUCATION.map((edu) => (
                        <div key={edu.id} className="relative pl-8 border-l border-slate-700">
                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500"></div>
                            <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                            <p className="text-emerald-400 font-medium">{edu.institution}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-slate-500 text-sm">{edu.period}</span>
                                {edu.score && <span className="text-slate-300 text-sm bg-slate-800 px-2 py-1 rounded">{edu.score}</span>}
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