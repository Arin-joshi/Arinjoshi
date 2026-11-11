export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  type?: string;
  description: string[];
  skills?: string[];
  metrics?: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string[];
  tech?: string[];
  category: 'Enterprise & Platform' | 'Real-Time & Gaming' | 'Dev Tools & Products' | 'Web & Apps';
  imageUrl: string;
  logoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  problem?: string;
  solution?: string;
  architecture?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Production Mastered", "Advanced"
    context?: string; // e.g. "Education Walkthrough, Legiit"
  }[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Core' | 'Architecture' | 'AI & Tools' | 'Cloud';
}
