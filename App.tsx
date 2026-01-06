import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-dark selection:bg-violet-500/30 selection:text-violet-200">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </div>
  );
}

export default App;