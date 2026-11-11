"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsMatrix from "@/components/SkillsMatrix";
import EducationAndCerts from "@/components/EducationAndCerts";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import CommandPalette from "@/components/CommandPalette";
import MobileAppDock from "@/components/MobileAppDock";
import { Project } from "@/types";
import { PROJECTS } from "@/constants";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const handleOpenShowcaseProject = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) setSelectedProject(found);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#09090b] text-zinc-950 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Floating Header */}
      <Navbar onOpenCommand={() => setIsCommandOpen(true)} />

      {/* Main Page Content */}
      <main className="relative pb-24 md:pb-0">
        <div id="hero">
          <Hero
            onOpenProjectCaseStudy={handleOpenShowcaseProject}
          />
        </div>
        <ExperienceSection />
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <SkillsMatrix />
        <EducationAndCerts />
        <ContactSection />
      </main>

      {/* Footer Colophon */}
      <Footer />

      {/* Mobile Application Navigation Dock */}
      <MobileAppDock />

      {/* Project Case Study Drawer / Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Keyboard Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </div>
  );
}
