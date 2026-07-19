import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { auth, storage } from '../firebase';
import { X, Lock, Mail, Key, LogOut, Plus, Trash2, Edit2, Upload, AlertCircle, CheckCircle, Eye, EyeOff, Sparkles, User, Briefcase, FolderGit2, Cpu, GraduationCap, Award, ChevronDown } from 'lucide-react';
import LookAtCursor from './LookAtCursor';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    isConfigured,
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
  } = useData();

  // Authentication State
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'projects' | 'skills' | 'education' | 'certifications' | 'security'>('personal');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [uploadingFile, setUploadingFile] = useState<{ name: string, progress: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal Editing States
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Lock background scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Monitor auth state changes & enforce sign-out on load
  useEffect(() => {
    if (!auth) return;

    // Sign out on mount to guarantee fresh sessions on every page refresh
    auth.signOut().catch(err => console.error("Sign-out on mount error:", err));

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');



    if (!auth) {
      setAuthError('Firebase Authentication is not initialized. Please verify your configurations.');
      setAuthLoading(false);
      return;
    }
    try {
      const { signInWithEmailAndPassword, setPersistence, inMemoryPersistence } = await import('firebase/auth');
      await setPersistence(auth, inMemoryPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      setStatusMessage({ type: 'success', text: 'Welcome back, Admin!' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Login failed. Please verify email and password.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setAuthError('Please enter your email address first.');
      return;
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAuthError('Please enter a valid email address format.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');
    setResetSent(false);

    if (!isConfigured || !auth) {
      // Mock Forgot Password
      setTimeout(() => {
        setResetSent(true);
        setStatusMessage({ type: 'success', text: 'Password reset link sent to ' + email + ' (Mock Mode)' });
        setTimeout(() => setStatusMessage(null), 5000);
        setAuthLoading(false);
      }, 600);
      return;
    }

    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth!, email);
      setResetSent(true);
      setStatusMessage({ type: 'success', text: 'Password reset link sent to ' + email });
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Failed to send password reset email.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!isConfigured || !auth) {
      setUser(null);
      setStatusMessage({ type: 'success', text: 'Logged out successfully (Mock Mode).' });
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }
    try {
      await auth.signOut();
      setUser(null);
      setStatusMessage({ type: 'success', text: 'Logged out successfully.' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Upload handler for files
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileType: 'video' | 'pdf' | 'project-image', projectId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isConfigured || !storage) {
      // Mock File Upload (Convert to Base64 Data URL)
      setUploadingFile({ name: file.name, progress: 20 });
      setTimeout(() => {
        setUploadingFile({ name: file.name, progress: 60 });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          setUploadingFile({ name: file.name, progress: 100 });
          setTimeout(async () => {
            setUploadingFile(null);
            setStatusMessage({ type: 'success', text: 'Uploaded ' + file.name + ' successfully (Local Storage)!' });
            setTimeout(() => setStatusMessage(null), 3000);

            if (fileType === 'video') {
              await updatePersonalInfo({ ...personalInfo, videoUrl: base64data });
            } else if (fileType === 'pdf') {
              await updatePersonalInfo({ ...personalInfo, resumeUrl: base64data });
            } else if (fileType === 'project-image' && editingItem && editingItem.type === 'project') {
              setEditingItem({
                ...editingItem,
                data: { ...editingItem.data, imageUrl: base64data }
              });
            }
          }, 300);
        };
        reader.readAsDataURL(file);
      }, 500);
      return;
    }

    const { ref, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');

    let storagePath = '';
    if (fileType === 'video') storagePath = 'assets/background_video.mp4';
    else if (fileType === 'pdf') storagePath = 'assets/resume.pdf';
    else storagePath = `projects/${projectId || Date.now()}_${file.name}`;

    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploadingFile({ name: file.name, progress: 0 });

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadingFile({ name: file.name, progress });
      },
      (error) => {
        console.error(error);
        setStatusMessage({ type: 'error', text: 'File upload failed: ' + error.message });
        setUploadingFile(null);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setUploadingFile(null);
        setStatusMessage({ type: 'success', text: 'Uploaded ' + file.name + ' successfully!' });
        setTimeout(() => setStatusMessage(null), 3000);

        if (fileType === 'video') {
          await updatePersonalInfo({ ...personalInfo, videoUrl: downloadUrl });
        } else if (fileType === 'pdf') {
          await updatePersonalInfo({ ...personalInfo, resumeUrl: downloadUrl });
        } else if (fileType === 'project-image' && editingItem && editingItem.type === 'project') {
          setEditingItem({
            ...editingItem,
            data: { ...editingItem.data, imageUrl: downloadUrl }
          });
        }
      }
    );
  };

  // Animated save helper: animates progress bar then fires the actual write
  const withSaveAnimation = async (fn: () => Promise<void>) => {
    setIsSaving(true);
    setSaveProgress(0);
    // Fake fast progress to 80%
    const tick = setInterval(() => setSaveProgress(p => p < 80 ? p + 10 : p), 80);
    try {
      await fn();
      clearInterval(tick);
      setSaveProgress(100);
      setTimeout(() => { setIsSaving(false); setSaveProgress(0); }, 600);
    } catch (err) {
      clearInterval(tick);
      setIsSaving(false);
      setSaveProgress(0);
      throw err;
    }
  };

  // Save changes to personal details form
  const handleSavePersonalInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      summary: formData.get('summary') as string,
      videoUrl: formData.get('videoUrl') as string || personalInfo.videoUrl || '',
      resumeUrl: formData.get('resumeUrl') as string || personalInfo.resumeUrl || '',
    };
    try {
      await withSaveAnimation(() => updatePersonalInfo(updated));
      setStatusMessage({ type: 'success', text: '✅ Personal info saved to Firebase!' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to update personal info: ' + err.message });
    }
  };

  // Change account password helper function
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setStatusMessage({ type: 'error', text: 'Password cannot be empty.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setPasswordChangeLoading(true);
    try {
      if (isConfigured && auth && auth.currentUser) {
        const { updatePassword } = await import('firebase/auth');
        await updatePassword(auth.currentUser, newPassword);
        setStatusMessage({ type: 'success', text: 'Password changed successfully in Firebase!' });
      } else {
        localStorage.setItem('portfolio_admin_mock_password', newPassword);
        setStatusMessage({ type: 'success', text: 'Password changed successfully (Mock Mode)!' });
      }
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to update password: ' + (err.message || err.toString()) });
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  // Generic Edit Modal functions
  const openEditModal = (type: string, data: any = null) => {
    if (data === null) {
      // Create new defaults
      if (type === 'experience') {
        data = { id: 'exp-' + Date.now(), company: '', role: '', period: '', location: '', description: [''] };
      } else if (type === 'project') {
        data = { id: 'proj-' + Date.now(), title: '', category: 'Web', imageUrl: '', liveUrl: '', description: [''] };
      } else if (type === 'skill') {
        data = { name: '', category: 'Frontend' };
      } else if (type === 'education') {
        data = { id: 'edu-' + Date.now(), degree: '', institution: '', period: '', score: '' };
      } else if (type === 'certification') {
        data = { id: 'cert-' + Date.now(), name: '', issuer: '' };
      }
    }
    setEditingItem({ type, data });
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    setIsSavingEdit(true);
    try {
      const { type, data } = editingItem;
      await withSaveAnimation(async () => {
        if (type === 'experience') {
          await saveExperience(data);
        } else if (type === 'project') {
          await saveProject(data);
        } else if (type === 'skill') {
          await saveSkill(data, editingItem.data._oldName);
        } else if (type === 'education') {
          await saveEducation(data);
        } else if (type === 'certification') {
          await saveCertification(data);
        }
      });
      setStatusMessage({ type: 'success', text: '✅ Saved to Firebase successfully!' });
      setTimeout(() => setStatusMessage(null), 3000);
      setEditingItem(null);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to save: ' + err.message });
    } finally {
      setIsSavingEdit(false);
    }
  };

  if (!isOpen) return null;

  if (!user) {
    // Compact, beautiful glassmorphic login modal matching SocialPopup layout!
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={onClose}
        />

        {/* Compact Login Modal Container */}
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] bg-slate-900/90 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 transform scale-100 opacity-100 translate-y-0 animate-fadeIn">

          {/* Floating Robot Mascot at the top */}
          <div className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none select-none">
            <div className="transform scale-[1.1] hover:scale-[1.15] transition-transform duration-300">
              <LookAtCursor type="robot" />
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={15} />
          </button>

          {/* Content */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-2">
              <Sparkles size={11} className="animate-pulse" />
              <span className="text-[9px] font-mono tracking-wider uppercase font-semibold">Verification Required</span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight tracking-tight">
              Portfolio Control Panel
            </h3>
            <p className="text-slate-400 text-[10px] sm:text-xs mt-1.5 max-w-[260px] sm:max-w-[280px] mx-auto leading-relaxed">
              Sign in to modify your portfolio content in real-time
            </p>

            {!isConfigured && (
              <div className="mt-3.5 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] sm:text-[10px] font-mono rounded-xl flex gap-1.5 text-left leading-normal">
                <AlertCircle size={14} className="shrink-0" />
                <span>
                  <strong>Configuration Error:</strong> Firebase environment keys are missing. Please add them to your .env file.
                </span>
              </div>
            )}

            {/* Error alerts */}
            {authError && (
              <div className="mt-3.5 p-2.5 bg-red-500/10 border border-red-500/35 text-red-400 text-[10px] sm:text-xs font-mono rounded-xl flex gap-1.5 text-left leading-normal">
                <AlertCircle size={14} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {statusMessage && (
              <div className="mt-3.5 p-2.5 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-[10px] sm:text-xs font-mono rounded-xl flex gap-1.5 text-left leading-normal">
                <CheckCircle size={14} className="shrink-0" />
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 mt-5 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1 select-none">
                  Administrator Email 📧
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail size={13} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-700 text-xs focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1 select-none">
                    Password 🔑
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={authLoading}
                    className="text-[9px] font-mono text-slate-500 hover:text-red-400 hover:underline transition-colors focus:outline-none"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Key size={13} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 sm:py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-700 text-xs focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>



              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                {authLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock size={12} />
                    <span>Authenticate Account</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'personal', name: 'Personal Details', icon: <User size={15} /> },
    { id: 'experience', name: 'Experiences', icon: <Briefcase size={15} /> },
    { id: 'projects', name: 'Projects', icon: <FolderGit2 size={15} /> },
    { id: 'skills', name: 'Skills & Tech', icon: <Cpu size={15} /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={15} /> },
    { id: 'certifications', name: 'Certifications', icon: <Award size={15} /> },
    { id: 'security', name: 'Account Security', icon: <Lock size={15} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-lg p-2 sm:p-4 overflow-y-auto">

      {/* Container Card */}
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl sm:rounded-3xl w-full max-w-5xl h-[95vh] sm:h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-fadeIn">

        {/* ── Global Save Progress Bar ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-[200] transition-all duration-300 pointer-events-none"
          style={{ opacity: isSaving ? 1 : 0 }}
        >
          <div
            className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-red-600 shadow-lg shadow-red-500/40 transition-all duration-200"
            style={{ width: `${saveProgress}%` }}
          />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-800/80 bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="md:hidden p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white transition-all shrink-0"
            >
              <ChevronDown size={15} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30 shrink-0">
              <Lock size={16} className="text-red-400 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold tracking-tight text-white flex flex-wrap items-center gap-1.5">
                <span className="truncate">Portfolio Control Panel</span>
                <span className="text-[9px] sm:text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-mono font-normal shrink-0">ADMIN</span>
              </h2>
              <p className="text-[9px] sm:text-xs text-slate-400 font-mono hidden sm:block">Firebase Realtime Sync Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {isSaving && (
              <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-red-400 animate-pulse">
                <span className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                Saving...
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-red-950/30 hover:border-red-900 border border-slate-800 text-[10px] sm:text-xs font-semibold text-slate-300 hover:text-red-400 transition-all font-mono"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Status Alerts banner */}
        {statusMessage && (
          <div className={`px-4 py-3 text-xs font-mono flex items-center gap-2.5 transition-all animate-slideDown shrink-0 ${statusMessage.type === 'success' ? 'bg-emerald-950/60 text-emerald-400 border-b border-emerald-900/60' : 'bg-red-950/60 text-red-400 border-b border-red-900/60'
            }`}>
            {statusMessage.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Sidebar — vertical on desktop */}
          <div className="hidden md:flex md:w-56 shrink-0 bg-slate-950/40 border-r border-slate-800/80 flex-col overflow-y-auto p-3 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold font-mono tracking-wide shrink-0 transition-all border ${activeTab === tab.id
                    ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-sm'
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Content area (holds mobile tab bar + scroll content) */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Mobile horizontal tab bar */}
            <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-3 py-2.5 bg-slate-950/60 border-b border-slate-800/80 shrink-0 scrollbar-none">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold font-mono tracking-wide whitespace-nowrap shrink-0 transition-all border ${activeTab === tab.id
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#0b0f19]">

              {/* 1. PERSONAL TAB */}
              {activeTab === 'personal' && (
                <div className="max-w-2xl space-y-8 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Personal Details</h3>
                      <p className="text-xs text-slate-400 mt-1">Modify header texts, contact links, summary and downloads</p>
                    </div>
                  </div>

                  <form onSubmit={handleSavePersonalInfo} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={personalInfo.name}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Profile Role</label>
                        <input
                          type="text"
                          name="role"
                          defaultValue={personalInfo.role}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={personalInfo.email}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          defaultValue={personalInfo.phone}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Location</label>
                        <input
                          type="text"
                          name="location"
                          defaultValue={personalInfo.location}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">About Summary Bio</label>
                      <textarea
                        name="summary"
                        rows={4}
                        defaultValue={personalInfo.summary}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none resize-y"
                      />
                    </div>

                    {/* File uploads section */}
                    <div className="border-t border-slate-850 pt-6 space-y-5">
                      <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase">Portfolio Asset Media</h4>

                      {/* Direct URL Overwrites (Perfect for free plans) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Background Video Link / Path 🔗</label>
                          <input
                            type="text"
                            name="videoUrl"
                            defaultValue={personalInfo.videoUrl}
                            placeholder="/ArinJoshi.mp4"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Resume PDF Link / Path 🔗</label>
                          <input
                            type="text"
                            name="resumeUrl"
                            defaultValue={personalInfo.resumeUrl}
                            placeholder="/ArinJoshi.pdf"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Background Video */}
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold text-white">Background Video (MP4)</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-md">Url: {(personalInfo as any).videoUrl || '/ArinJoshi.mp4'}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold font-mono">
                            <Upload size={13} />
                            UPLOAD FILE
                            <input
                              type="file"
                              accept="video/mp4"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'video')}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Resume PDF */}
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold text-white">Resume Document (PDF)</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-md">Url: {(personalInfo as any).resumeUrl || '/ArinJoshi.pdf'}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold font-mono">
                            <Upload size={13} />
                            UPLOAD FILE
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, 'pdf')}
                            />
                          </label>
                        </div>
                      </div>

                      {uploadingFile && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1.5 animate-pulse">
                          <div className="flex justify-between text-[10px] font-mono text-red-400">
                            <span className="truncate">Uploading: {uploadingFile.name}</span>
                            <span>{uploadingFile.progress}%</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${uploadingFile.progress}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs font-mono tracking-wider uppercase shadow-md shadow-red-500/10 focus:outline-none transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {isSaving ? (
                          <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Saving to Firebase...</span></>
                        ) : (
                          <><CheckCircle size={13} /><span>Save Personal Details</span></>
                        )}
                      </button>
                    </div>
                  </form>



                </div>
              )}

              {/* 2. EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Work Experience</h3>
                      <p className="text-xs text-slate-400 mt-1">Add, edit or delete roles in your career timeline</p>
                    </div>
                    <button
                      onClick={() => openEditModal('experience')}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-md shadow-red-600/15"
                    >
                      <Plus size={14} />
                      ADD EXPERIENCE
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {experience.map((exp) => (
                      <div key={exp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-850 hover:border-slate-800 flex items-start justify-between gap-4 transition-all">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                            <span className="text-slate-500 text-xs">@</span>
                            <span className="text-red-400 font-bold text-xs">{exp.company}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono mt-1">{exp.period} | {exp.location || 'Remote'}</p>
                          <ul className="mt-3 space-y-1.5">
                            {exp.description.map((bullet, i) => (
                              <li key={i} className="text-xs text-slate-400 leading-normal list-disc list-inside truncate">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditModal('experience', exp)}
                            className="p-2 rounded-xl bg-slate-850 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-400 transition-all"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => { if (confirm('Delete role?')) deleteExperience(exp.id); }}
                            className="p-2 rounded-xl bg-slate-850 hover:bg-red-950/30 hover:border-red-900 hover:text-red-400 border border-slate-800 text-slate-500 transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Portfolio Projects</h3>
                      <p className="text-xs text-slate-400 mt-1">Configure project categories, descriptions, URLs and cover photos</p>
                    </div>
                    <button
                      onClick={() => openEditModal('project')}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-md shadow-red-600/15"
                    >
                      <Plus size={14} />
                      ADD PROJECT
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-850 hover:border-slate-800 flex flex-col justify-between gap-4 transition-all">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-850">
                            <img
                              src={proj.imageUrl || 'https://via.placeholder.com/150'}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold border ${proj.category === 'Game' ? 'bg-red-500/10 text-red-400 border-red-500/20' : proj.category === 'Web' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}>
                                {proj.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">{proj.liveUrl || 'No Demo URL'}</p>
                            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{proj.description[0]}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-1.5 border-t border-slate-850/60 pt-3">
                          <button
                            onClick={() => openEditModal('project', proj)}
                            className="px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-850 hover:text-white border border-slate-800 text-xs font-semibold text-slate-400 flex items-center gap-1 transition-all font-mono"
                          >
                            <Edit2 size={11} />
                            EDIT
                          </button>
                          <button
                            onClick={() => { if (confirm('Delete project?')) deleteProject(proj.id); }}
                            className="p-1.5 rounded-xl bg-slate-850 hover:bg-red-950/30 hover:border-red-900 hover:text-red-400 border border-slate-800 text-slate-500 transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Skills & Expertise</h3>
                      <p className="text-xs text-slate-400 mt-1">Categorize technologies and skills under frontend, backend, core etc.</p>
                    </div>
                    <button
                      onClick={() => openEditModal('skill')}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-md shadow-red-600/15"
                    >
                      <Plus size={14} />
                      ADD SKILL
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-2xl bg-slate-900 border border-slate-850 hover:border-slate-800 transition-all text-xs">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="text-[9px] bg-slate-950 border border-slate-855 text-slate-500 px-1.5 py-0.5 rounded font-mono uppercase">{skill.category}</span>
                        <div className="flex items-center gap-0.5 ml-2 border-l border-slate-800/80 pl-1.5">
                          <button
                            onClick={() => openEditModal('skill', { ...skill, _oldName: skill.name })}
                            className="p-1 text-slate-500 hover:text-white transition-colors"
                          >
                            <Edit2 size={10} />
                          </button>
                          <button
                            onClick={() => { if (confirm('Delete skill?')) deleteSkill(skill.name); }}
                            className="p-1 text-slate-550 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. EDUCATION TAB */}
              {activeTab === 'education' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Academic Records</h3>
                      <p className="text-xs text-slate-400 mt-1">Manage educational degrees, scores, and institutions</p>
                    </div>
                    <button
                      onClick={() => openEditModal('education')}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-md shadow-red-600/15"
                    >
                      <Plus size={14} />
                      ADD EDUCATION
                    </button>
                  </div>

                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-850 hover:border-slate-800 flex items-center justify-between gap-4 transition-all">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                            {edu.score && <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-mono">{edu.score}</span>}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{edu.period}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditModal('education', edu)}
                            className="p-2 rounded-xl bg-slate-850 hover:bg-slate-800 hover:text-white border border-slate-800 text-slate-400 transition-all"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => { if (confirm('Delete education item?')) deleteEducation(edu.id); }}
                            className="p-2 rounded-xl bg-slate-850 hover:bg-red-950/30 hover:border-red-900 hover:text-red-400 border border-slate-800 text-slate-500 transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. CERTIFICATIONS TAB */}
              {activeTab === 'certifications' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Professional Certifications</h3>
                      <p className="text-xs text-slate-400 mt-1">Manage verifies credentials, badges and issuers</p>
                    </div>
                    <button
                      onClick={() => openEditModal('certification')}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-md shadow-red-600/15"
                    >
                      <Plus size={14} />
                      ADD CREDENTIAL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-855 hover:border-slate-800 flex items-center justify-between gap-4 transition-all">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">{cert.name}</h4>
                          <p className="text-[10px] text-slate-405 font-mono mt-0.5">Issuer: {cert.issuer}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditModal('certification', cert)}
                            className="p-2 rounded-xl bg-slate-850 hover:bg-slate-800 hover:text-white border border-slate-800 text-slate-450 transition-all"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => { if (confirm('Delete certification?')) deleteCertification(cert.id); }}
                            className="p-2 rounded-xl bg-slate-850 hover:bg-red-950/30 hover:border-red-900 hover:text-red-400 border border-slate-800 text-slate-500 transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="max-w-md space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">Account Security 🔒</h3>
                    <p className="text-xs text-slate-400 mt-1">Change your portfolio admin portal credentials</p>
                  </div>

                  <div className="relative group p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
                    {/* Premium Conic Glow Border effect for the Security card! */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-rose-500 to-purple-600 rounded-3xl opacity-10 group-hover:opacity-20 transition duration-500 blur-sm pointer-events-none animate-pulse" />
                    <div className="relative space-y-4">
                      <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase select-none">New Password</label>
                          <input
                            type="password"
                            required
                            placeholder="Min 6 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase select-none">Confirm New Password</label>
                          <input
                            type="password"
                            required
                            placeholder="Repeat new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={passwordChangeLoading}
                          className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-550 hover:to-rose-550 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/10 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 font-mono"
                        >
                          {passwordChangeLoading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Key size={13} />
                              <span>Update Password</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

            </div>{/* end main content area */}

          </div>{/* end content wrapper */}

        </div>{/* end main body flex row */}
      </div>{/* end container card */}

      {/* Editing Dialog Modal Overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X size={16} />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono">
              {editingItem.data._oldName ? 'Edit' : 'Add'} {editingItem.type}
            </h3>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">

              {/* Experience Forms */}
              {editingItem.type === 'experience' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Company Name</label>
                    <input
                      type="text"
                      value={editingItem.data.company}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, company: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Role Title</label>
                    <input
                      type="text"
                      value={editingItem.data.role}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, role: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Period (e.g. Feb 2026 - Present)</label>
                      <input
                        type="text"
                        value={editingItem.data.period}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, period: e.target.value } })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Location</label>
                      <input
                        type="text"
                        value={editingItem.data.location || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase flex items-center justify-between">
                      Description Points
                      <button
                        onClick={() => {
                          const desc = [...editingItem.data.description, ''];
                          setEditingItem({ ...editingItem, data: { ...editingItem.data, description: desc } });
                        }}
                        className="text-[9px] text-red-400 hover:text-red-300 font-bold"
                      >
                        + ADD POINT
                      </button>
                    </label>
                    {editingItem.data.description.map((bullet: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const desc = [...editingItem.data.description];
                            desc[i] = e.target.value;
                            setEditingItem({ ...editingItem, data: { ...editingItem.data, description: desc } });
                          }}
                          className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-red-500 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const desc = editingItem.data.description.filter((_: any, idx: number) => idx !== i);
                            setEditingItem({ ...editingItem, data: { ...editingItem.data, description: desc } });
                          }}
                          className="p-2 bg-slate-950 border border-slate-800 hover:border-red-900 rounded-xl hover:text-red-400"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Projects Forms */}
              {editingItem.type === 'project' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Project Title</label>
                    <input
                      type="text"
                      value={editingItem.data.title}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Category</label>
                      <select
                        value={editingItem.data.category}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                      >
                        <option value="Game">Game</option>
                        <option value="Web">Web</option>
                        <option value="App">App</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Live Demo URL</label>
                      <input
                        type="text"
                        value={editingItem.data.liveUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, liveUrl: e.target.value } })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Project thumbnail upload & direct input */}
                  <div className="space-y-2 p-3 bg-slate-950 border border-slate-850 rounded-2xl">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Thumbnail Image</label>
                    <div className="flex gap-3 items-center">
                      {editingItem.data.imageUrl && (
                        <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                          <img src={editingItem.data.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Image path or external URL"
                        value={editingItem.data.imageUrl}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, imageUrl: e.target.value } })}
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-red-500 focus:outline-none"
                      />
                      <label className="cursor-pointer px-3 py-2 bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-[10px] font-mono font-bold flex items-center gap-1 shrink-0">
                        <Upload size={11} />
                        UPLOAD
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'project-image', editingItem.data.id)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase flex items-center justify-between">
                      Description Points
                      <button
                        onClick={() => {
                          const desc = [...editingItem.data.description, ''];
                          setEditingItem({ ...editingItem, data: { ...editingItem.data, description: desc } });
                        }}
                        className="text-[9px] text-red-400 hover:text-red-300 font-bold"
                      >
                        + ADD POINT
                      </button>
                    </label>
                    {editingItem.data.description.map((bullet: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const desc = [...editingItem.data.description];
                            desc[i] = e.target.value;
                            setEditingItem({ ...editingItem, data: { ...editingItem.data, description: desc } });
                          }}
                          className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-red-500 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const desc = editingItem.data.description.filter((_: any, idx: number) => idx !== i);
                            setEditingItem({ ...editingItem, data: { ...editingItem.data, description: desc } });
                          }}
                          className="p-2 bg-slate-950 border border-slate-800 hover:border-red-900 rounded-xl hover:text-red-400"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Skills Forms */}
              {editingItem.type === 'skill' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Skill/Tech Name (e.g. React.js)</label>
                    <input
                      type="text"
                      value={editingItem.data.name}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Skill Category</label>
                    <select
                      value={editingItem.data.category}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Core">Core</option>
                    </select>
                  </div>
                </>
              )}

              {/* Education Forms */}
              {editingItem.type === 'education' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Degree/Study Field</label>
                    <input
                      type="text"
                      value={editingItem.data.degree}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, degree: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Institution</label>
                    <input
                      type="text"
                      value={editingItem.data.institution}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, institution: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Period (e.g. 2020 - 2024)</label>
                      <input
                        type="text"
                        value={editingItem.data.period}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, period: e.target.value } })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Score (e.g. 7.53 CGPA or 68%)</label>
                      <input
                        type="text"
                        value={editingItem.data.score || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, score: e.target.value } })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Certifications Forms */}
              {editingItem.type === 'certification' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Certification Name</label>
                    <input
                      type="text"
                      value={editingItem.data.name}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">Issuer/Organization</label>
                    <input
                      type="text"
                      value={editingItem.data.issuer}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, issuer: e.target.value } })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

            </div>

            <div className="flex items-center justify-end gap-3 mt-8 border-t border-slate-850 pt-4">
              <button
                onClick={() => setEditingItem(null)}
                disabled={isSavingEdit}
                className="px-5 py-2.5 rounded-xl border border-slate-800 bg-transparent hover:bg-slate-850 hover:text-white text-slate-400 text-xs font-mono font-bold tracking-wide transition-colors disabled:opacity-50"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSavingEdit}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-mono font-bold tracking-wide shadow-md shadow-red-600/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSavingEdit ? (
                  <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Saving...</span></>
                ) : (
                  <><CheckCircle size={13} /><span>SAVE CHANGES</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes progressShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
};

export default AdminPanel;
