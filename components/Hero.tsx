import React from "react";
import { PERSONAL_INFO } from "../constants";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
            Available for new opportunities
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
            Hi, I'm <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              {PERSONAL_INFO.name}
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-slate-400 mb-6 font-medium">
            {PERSONAL_INFO.role}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
            {PERSONAL_INFO.summary}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/ArinJoshi.pdf"
              download="ArinJoshi.pdf"
              className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all border border-slate-700 flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-violet-400 transition-colors"
            >
              <Mail size={24} />
            </a>
            {/* Placeholders for social links not explicitly in resume, but standard for portfolios */}
            <a
              href="https://www.linkedin.com/in/arinjoshi/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-violet-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Abstract visual for profile */}
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] rotate-6 opacity-30 blur-lg group-hover:rotate-12 transition-transform duration-500"></div>
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-card rounded-[2rem] border border-slate-700 overflow-hidden flex items-center justify-center">
            {/* Using a tech-oriented placeholder since personal photo isn't provided */}
            <img
              src="/profile.png"
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-white">
                    Based in {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
