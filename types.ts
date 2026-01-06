export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string[];
  tech?: string[]; // Inferred from context if not explicit
  category: 'Game' | 'Web' | 'App';
  imageUrl: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Core';
}