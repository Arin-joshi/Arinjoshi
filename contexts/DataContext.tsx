import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';
import { Experience, Project, Education, Certification, Skill } from '../types';

interface DataContextType {
  loading: boolean;
  isConfigured: boolean;
  personalInfo: typeof PERSONAL_INFO;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
  updatePersonalInfo: (data: typeof PERSONAL_INFO) => Promise<void>;
  saveExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveProject: (proj: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveSkill: (skill: Skill, oldName?: string) => Promise<void>;
  deleteSkill: (name: string) => Promise<void>;
  saveEducation: (edu: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  saveCertification: (cert: Certification) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  refetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState<typeof PERSONAL_INFO>(PERSONAL_INFO);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Dynamically import Firestore methods to avoid runtime failures if firebase is not loaded/installed
  const getFirestoreHelpers = async () => {
    const { doc, getDoc, setDoc, collection, getDocs, deleteDoc } = await import('firebase/firestore');
    return { doc, getDoc, setDoc, collection, getDocs, deleteDoc };
  };

  const loadData = async () => {
    if (!isFirebaseConfigured || !db) {
      setPersonalInfo(PERSONAL_INFO);
      setExperience(EXPERIENCE);
      setProjects(PROJECTS);
      setSkills(SKILLS);
      setEducation(EDUCATION);
      setCertifications(CERTIFICATIONS);
      setLoading(false);
      return;
    }

    try {
      const { doc, getDoc, setDoc, collection, getDocs } = await getFirestoreHelpers();

      // 1. Fetch Personal Info
      const personalDocRef = doc(db, 'portfolio_config', 'personal_info');
      const personalSnap = await getDoc(personalDocRef);
      let currentPersonalInfo = PERSONAL_INFO;

      if (!personalSnap.exists()) {
        // Bootstrapping: database is empty, seed it!
        await setDoc(personalDocRef, PERSONAL_INFO);
      } else {
        currentPersonalInfo = { ...PERSONAL_INFO, ...personalSnap.data() };
      }
      setPersonalInfo(currentPersonalInfo);

      // 2. Fetch Experience
      const expCol = collection(db, 'experience');
      const expSnap = await getDocs(expCol);
      let expList: Experience[] = [];
      if (expSnap.empty) {
        // Seed experience
        for (const exp of EXPERIENCE) {
          await setDoc(doc(db, 'experience', exp.id), exp);
        }
        expList = EXPERIENCE;
      } else {
        expList = expSnap.docs.map(doc => doc.data() as Experience);
      }
      // Sort experiences (exp-3, exp-2, exp-1)
      expList.sort((a, b) => b.id.localeCompare(a.id));
      setExperience(expList);

      // 3. Fetch Projects
      const projCol = collection(db, 'projects');
      const projSnap = await getDocs(projCol);
      let projList: Project[] = [];
      if (projSnap.empty) {
        // Seed projects
        for (const proj of PROJECTS) {
          await setDoc(doc(db, 'projects', proj.id), proj);
        }
        projList = PROJECTS;
      } else {
        projList = projSnap.docs.map(doc => doc.data() as Project);
      }
      // Order projects (proj-1, proj-2...)
      projList.sort((a, b) => {
        const numA = parseInt(a.id.replace('proj-', '')) || 0;
        const numB = parseInt(b.id.replace('proj-', '')) || 0;
        return numA - numB;
      });
      setProjects(projList);

      // 4. Fetch Skills
      const skillCol = collection(db, 'skills');
      const skillSnap = await getDocs(skillCol);
      let skillList: Skill[] = [];
      if (skillSnap.empty) {
        // Seed skills
        for (let i = 0; i < SKILLS.length; i++) {
          const s = SKILLS[i];
          const docId = `skill-${i}-${s.name.replace(/\s+/g, '_')}`;
          await setDoc(doc(db, 'skills', docId), s);
        }
        skillList = SKILLS;
      } else {
        skillList = skillSnap.docs.map(doc => doc.data() as Skill);
      }
      setSkills(skillList);

      // 5. Fetch Education
      const eduCol = collection(db, 'education');
      const eduSnap = await getDocs(eduCol);
      let eduList: Education[] = [];
      if (eduSnap.empty) {
        // Seed education
        for (const edu of EDUCATION) {
          await setDoc(doc(db, 'education', edu.id), edu);
        }
        eduList = EDUCATION;
      } else {
        eduList = eduSnap.docs.map(doc => doc.data() as Education);
      }
      eduList.sort((a, b) => b.id.localeCompare(a.id));
      setEducation(eduList);

      // 6. Fetch Certifications
      const certCol = collection(db, 'certifications');
      const certSnap = await getDocs(certCol);
      let certList: Certification[] = [];
      if (certSnap.empty) {
        // Seed certifications
        for (const cert of CERTIFICATIONS) {
          await setDoc(doc(db, 'certifications', cert.id), cert);
        }
        certList = CERTIFICATIONS;
      } else {
        certList = certSnap.docs.map(doc => doc.data() as Certification);
      }
      certList.sort((a, b) => a.id.localeCompare(b.id));
      setCertifications(certList);

    } catch (err) {
      console.error("Firestore loading error, using fallbacks:", err);
      // Fallback
      setPersonalInfo(PERSONAL_INFO);
      setExperience(EXPERIENCE);
      setProjects(PROJECTS);
      setSkills(SKILLS);
      setEducation(EDUCATION);
      setCertifications(CERTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updatePersonalInfo = async (data: typeof PERSONAL_INFO) => {
    setPersonalInfo(data);
    if (isFirebaseConfigured && db) {
      try {
        console.log('[Firebase] Saving personal info to Firestore...', data);
        const { doc, setDoc } = await getFirestoreHelpers();
        await setDoc(doc(db, 'portfolio_config', 'personal_info'), data);
        console.log('[Firebase] ✅ Personal info saved successfully!');
      } catch (err) {
        console.error('[Firebase] ❌ FAILED to save personal info:', err);
        throw err;
      }
    } else {
      console.warn('[Firebase] ⚠️ Not configured — data saved to local state only (will reset on refresh).');
    }
  };

  const saveExperience = async (exp: Experience) => {
    setExperience(prev => {
      const exists = prev.some(e => e.id === exp.id);
      if (exists) {
        return prev.map(e => e.id === exp.id ? exp : e);
      } else {
        return [exp, ...prev];
      }
    });

    if (isFirebaseConfigured && db) {
      const { doc, setDoc } = await getFirestoreHelpers();
      await setDoc(doc(db, 'experience', exp.id), exp);
    }
  };

  const deleteExperience = async (id: string) => {
    setExperience(prev => prev.filter(e => e.id !== id));
    if (isFirebaseConfigured && db) {
      const { doc, deleteDoc } = await getFirestoreHelpers();
      await deleteDoc(doc(db, 'experience', id));
    }
  };

  const saveProject = async (proj: Project) => {
    setProjects(prev => {
      const exists = prev.some(p => p.id === proj.id);
      if (exists) {
        return prev.map(p => p.id === proj.id ? proj : p);
      } else {
        return [...prev, proj];
      }
    });

    if (isFirebaseConfigured && db) {
      const { doc, setDoc } = await getFirestoreHelpers();
      await setDoc(doc(db, 'projects', proj.id), proj);
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (isFirebaseConfigured && db) {
      const { doc, deleteDoc } = await getFirestoreHelpers();
      await deleteDoc(doc(db, 'projects', id));
    }
  };

  const saveSkill = async (skill: Skill, oldName?: string) => {
    setSkills(prev => {
      if (oldName) {
        return prev.map(s => s.name === oldName ? skill : s);
      } else {
        const exists = prev.some(s => s.name === skill.name);
        if (exists) {
          return prev.map(s => s.name === skill.name ? skill : s);
        } else {
          return [...prev, skill];
        }
      }
    });

    if (isFirebaseConfigured && db) {
      const { doc, setDoc, deleteDoc } = await getFirestoreHelpers();
      if (oldName && oldName !== skill.name) {
        await deleteDoc(doc(db, 'skills', `skill-${oldName.replace(/\s+/g, '_')}`));
      }
      await setDoc(doc(db, 'skills', `skill-${skill.name.replace(/\s+/g, '_')}`), skill);
    }
  };

  const deleteSkill = async (name: string) => {
    setSkills(prev => prev.filter(s => s.name !== name));
    if (isFirebaseConfigured && db) {
      const { doc, deleteDoc } = await getFirestoreHelpers();
      await deleteDoc(doc(db, 'skills', `skill-${name.replace(/\s+/g, '_')}`));
    }
  };

  const saveEducation = async (edu: Education) => {
    setEducation(prev => {
      const exists = prev.some(e => e.id === edu.id);
      if (exists) {
        return prev.map(e => e.id === edu.id ? edu : e);
      } else {
        return [edu, ...prev];
      }
    });

    if (isFirebaseConfigured && db) {
      const { doc, setDoc } = await getFirestoreHelpers();
      await setDoc(doc(db, 'education', edu.id), edu);
    }
  };

  const deleteEducation = async (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
    if (isFirebaseConfigured && db) {
      const { doc, deleteDoc } = await getFirestoreHelpers();
      await deleteDoc(doc(db, 'education', id));
    }
  };

  const saveCertification = async (cert: Certification) => {
    setCertifications(prev => {
      const exists = prev.some(c => c.id === cert.id);
      if (exists) {
        return prev.map(c => c.id === cert.id ? cert : c);
      } else {
        return [...prev, cert];
      }
    });

    if (isFirebaseConfigured && db) {
      const { doc, setDoc } = await getFirestoreHelpers();
      await setDoc(doc(db, 'certifications', cert.id), cert);
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
    if (isFirebaseConfigured && db) {
      const { doc, deleteDoc } = await getFirestoreHelpers();
      await deleteDoc(doc(db, 'certifications', id));
    }
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        isConfigured: isFirebaseConfigured,
        personalInfo,
        experience,
        projects,
        skills,
        education,
        certifications,
        updatePersonalInfo,
        saveExperience,
        deleteExperience,
        saveProject,
        deleteProject,
        saveSkill,
        deleteSkill,
        saveEducation,
        deleteEducation,
        saveCertification,
        deleteCertification,
        refetchData: loadData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
