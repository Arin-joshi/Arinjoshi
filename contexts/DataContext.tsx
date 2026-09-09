import React, { createContext, useContext, useMemo } from 'react';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';
import { Experience, Project, Education, Certification, Skill } from '../types';

interface DataContextType {
  loading: boolean;
  personalInfo: typeof PERSONAL_INFO;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
}

const DataContext = createContext<DataContextType>({
  loading: false,
  personalInfo: PERSONAL_INFO,
  experience: EXPERIENCE,
  projects: PROJECTS,
  skills: SKILLS,
  education: EDUCATION,
  certifications: CERTIFICATIONS,
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo(
    () => ({
      loading: false,
      personalInfo: PERSONAL_INFO,
      experience: EXPERIENCE,
      projects: PROJECTS,
      skills: SKILLS,
      education: EDUCATION,
      certifications: CERTIFICATIONS,
    }),
    []
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
