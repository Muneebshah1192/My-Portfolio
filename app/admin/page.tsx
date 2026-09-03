'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured, uploadToStorage } from '@/lib/supabase';
import { INITIAL_PROJECTS, INITIAL_EXPERIENCES, INITIAL_CERTIFICATIONS } from '@/lib/data';
import { Project, Experience, Certification } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminIdentifier, setAdminIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 6, num2: 7, answer: 13 });
  const [authError, setAuthError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'certifications'>('projects');

  // Data States
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
  const [certifications, setCertifications] = useState<Certification[]>(INITIAL_CERTIFICATIONS);

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Project Form
  const [projectForm, setProjectForm] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'Full-Stack & 3D Web',
    technologies: '',
    image_url: '',
    github_url: 'https://github.com/Muneebshah1192',
    featured: true
  });

  // Experience Form
  const [experienceForm, setExperienceForm] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    type: 'Internship'
  });

  // Certification Form
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    category: 'AI & ML'
  });

  // Generate new math captcha
  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setCaptchaChallenge({ num1: n1, num2: n2, answer: n1 + n2 });
    setCaptchaInput('');
  };

  useEffect(() => {
    refreshCaptcha();
    // Check Supabase Auth on Mount if configured
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // 1. Verify Math Captcha
    if (parseInt(captchaInput.trim(), 10) !== captchaChallenge.answer) {
      setAuthError('Security verification failed: Incorrect Captcha calculation.');
      refreshCaptcha();
      return;
    }

    // 2. Anti-brute force attempt throttling
    if (attemptCount >= 5) {
      setAuthError('Too many failed authorization attempts. Please wait 60 seconds.');
      return;
    }

    const expectedUser = 'muneeb@admin@1192@real.pk';
    const expectedPass = 'Muneeb1122@#@';

    // 3. Strict Credential Validation
    if (adminIdentifier.trim() === expectedUser && password === expectedPass) {
      setIsAuthenticated(true);
      setAttemptCount(0);
    } else if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email: adminIdentifier,
        password: password
      });
      if (error) {
        setAuthError(error.message);
        setAttemptCount(prev => prev + 1);
        refreshCaptcha();
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setAttemptCount(prev => prev + 1);
      setAuthError('Access Denied: Invalid administrator credentials.');
      refreshCaptcha();
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setAdminIdentifier('');
    setPassword('');
    refreshCaptcha();
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await uploadToStorage(file, 'project-thumbnails');
      if (url) {
        setProjectForm(prev => ({ ...prev, image_url: url }));
        setStatusMessage('Image uploaded to storage successfully.');
      }
    } catch (err: any) {
      setStatusMessage(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setProjectForm({
      title: '',
      tagline: '',
      description: '',
      category: 'Full-Stack & 3D Web',
      technologies: '',
      image_url: '',
      github_url: 'https://github.com/Muneebshah1192',
      featured: true
    });
    setExperienceForm({
      role: '',
      company: '',
      period: '',
      description: '',
      type: 'Internship'
    });
    setCertForm({
      title: '',
      issuer: '',
      category: 'AI & ML'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'projects') {
      setProjectForm({
        title: item.title,
        tagline: item.tagline || '',
        description: item.description || '',
        category: item.category || 'Full-Stack & 3D Web',
        technologies: item.technologies?.join(', ') || '',
        image_url: item.image_url || '',
        github_url: item.github_url || 'https://github.com/Muneebshah1192',
        featured: !!item.featured
      });
    } else if (activeTab === 'experiences') {
      setExperienceForm({
        role: item.role,
        company: item.company,
        period: item.period,
        description: item.description || '',
        type: item.type || 'Internship'
      });
    } else if (activeTab === 'certifications') {
      setCertForm({
        title: item.title,
        issuer: item.issuer,
        category: item.category || 'AI & ML'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'projects') {
      const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
      if (editingItem) {
        setProjects(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...projectForm, technologies: techArray } : p));
      } else {
        const newProj: Project = {
          id: `proj-${Date.now()}`,
          ...projectForm,
          technologies: techArray
        };
        setProjects(prev => [newProj, ...prev]);
      }
    } else if (activeTab === 'experiences') {
      if (editingItem) {
        setExperiences(prev => prev.map(exp => exp.id === editingItem.id ? { ...exp, ...experienceForm } : exp));
      } else {
        const newExp: Experience = {
          id: `exp-${Date.now()}`,
          ...experienceForm
        };
        setExperiences(prev => [newExp, ...prev]);
      }
    } else if (activeTab === 'certifications') {
      if (editingItem) {
        setCertifications(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...certForm } : c));
      } else {
        const newCert: Certification = {
          id: `cert-${Date.now()}`,
          ...certForm
        };
        setCertifications(prev => [newCert, ...prev]);
      }
    }

    setIsModalOpen(false);
    setStatusMessage('Record saved successfully.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    if (activeTab === 'projects') {
      setProjects(prev => prev.filter(p => p.id !== id));
    } else if (activeTab === 'experiences') {
      setExperiences(prev => prev.filter(e => e.id !== id));
    } else if (activeTab === 'certifications') {
      setCertifications(prev => prev.filter(c => c.id !== id));
    }
  };

  // Secure Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-background relative z-20">
        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-2xl border border-white/15 shadow-glass-luxury">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              Admin Authorization
            </h1>
          </div>

          {authError && (
            <div className="mb-5 p-3 bg-red-950/50 border border-red-500/40 text-xs text-red-300 rounded-lg">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">
                Admin Identifier
              </label>
              <input
                type="text"
                required
                value={adminIdentifier}
                onChange={(e) => setAdminIdentifier(e.target.value)}
                placeholder="Enter your email here"
                className="w-full text-xs px-4 py-2.5 glass-panel text-white placeholder-gray-500 rounded-lg border border-white/10 focus:border-accent-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password here"
                className="w-full text-xs px-4 py-2.5 glass-panel text-white placeholder-gray-500 rounded-lg border border-white/10 focus:border-accent-gold focus:outline-none"
              />
            </div>

            {/* Captcha Challenge */}
            <div className="p-3.5 bg-black/40 border border-white/10 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 font-mono">
                  Captcha Challenge: <strong className="text-accent-gold">{captchaChallenge.num1} + {captchaChallenge.num2} = ?</strong>
                </span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-[10px] uppercase text-accent-silver hover:text-white"
                >
                  Regenerate
                </button>
              </div>
              <input
                type="number"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter calculation result"
                className="w-full text-xs px-3 py-2 bg-white/5 text-white rounded border border-white/10 focus:border-accent-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-accent-gold transition-colors shadow-glass-luxury mt-2"
            >
              Verify & Authorize
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">
              Return to Portfolio
            </Link>
            <span className="text-[11px] text-accent-silver font-mono">
              Control Panel
            </span>
          </div>
        </div>
      </main>
    );
  }

  // Authenticated Dashboard
  return (
    <main className="min-h-screen bg-background text-white p-6 md:p-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent-gold" />
              <span className="text-xs uppercase tracking-widest text-accent-gold">
                Administrator Active
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
              Portfolio Content Manager
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest px-4 py-2 glass-panel border border-white/10 hover:text-accent-gold rounded transition-colors"
            >
              View Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-widest px-4 py-2 bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/60 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 p-3 bg-accent-gold/10 border border-accent-gold/30 text-xs text-accent-gold rounded">
            {statusMessage}
          </div>
        )}

        {/* Tab Selector & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {(['projects', 'experiences', 'certifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-accent-gold text-black font-semibold shadow-glow-gold'
                    : 'glass-panel text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {tab} ({tab === 'projects' ? projects.length : tab === 'experiences' ? experiences.length : certifications.length})
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenAdd}
            className="text-xs uppercase tracking-widest px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-accent-gold transition-colors shadow-glass-luxury"
          >
            Add New {activeTab === 'projects' ? 'Project' : activeTab === 'experiences' ? 'Experience' : 'Certification'}
          </button>
        </div>

        {/* Content Table / Cards */}
        <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
          
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="divide-y divide-white/5">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/10 text-accent-silver rounded">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="text-[10px] uppercase tracking-wider text-accent-gold">Featured</span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">{proj.title}</h3>
                    <p className="text-xs text-gray-400 font-light mb-2">{proj.tagline}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies?.map(t => (
                        <span key={t} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 glass-panel text-accent-silver hover:text-white border border-white/10 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 bg-red-950/30 text-red-400 hover:bg-red-900/50 rounded border border-red-800/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === 'experiences' && (
            <div className="divide-y divide-white/5">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/10 text-accent-gold rounded">
                        {exp.type}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{exp.period}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                    <h4 className="text-xs text-accent-silver font-medium mb-2">{exp.company}</h4>
                    <p className="text-xs text-gray-400 font-light">{exp.description}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(exp)}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 glass-panel text-accent-silver hover:text-white border border-white/10 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 bg-red-950/30 text-red-400 hover:bg-red-900/50 rounded border border-red-800/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certifications' && (
            <div className="divide-y divide-white/5">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-white mb-0.5">{cert.title}</h3>
                    <p className="text-[11px] text-gray-400">
                      {cert.issuer} {cert.category ? `• ${cert.category}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(cert)}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 glass-panel text-accent-silver hover:text-white border border-white/10 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="text-xs uppercase tracking-wider px-3 py-1.5 bg-red-950/30 text-red-400 hover:bg-red-900/50 rounded border border-red-800/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl glass-panel p-8 rounded-xl border border-white/15 shadow-glass-luxury max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6">
              {editingItem ? 'Edit Record' : 'Create New Record'}
            </h2>

            <form onSubmit={handleSaveModal} className="space-y-4">
              
              {activeTab === 'projects' && (
                <>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Tagline</label>
                    <input
                      type="text"
                      required
                      value={projectForm.tagline}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Category</label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                        className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">GitHub Repository Link</label>
                    <input
                      type="url"
                      value={projectForm.github_url}
                      onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">
                      Upload Image to Supabase Storage
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="w-full text-xs px-4 py-2 glass-panel text-gray-400 rounded border border-white/10 cursor-pointer"
                    />
                    {uploadingImage && <span className="text-[10px] text-accent-gold mt-1 block">Uploading to storage...</span>}
                    {projectForm.image_url && <span className="text-[10px] text-green-400 mt-1 block truncate">Attached: {projectForm.image_url}</span>}
                  </div>
                </>
              )}

              {activeTab === 'experiences' && (
                <>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Role Title</label>
                    <input
                      type="text"
                      required
                      value={experienceForm.role}
                      onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={experienceForm.company}
                      onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Period (e.g. Jun 2026 - Present)</label>
                      <input
                        type="text"
                        required
                        value={experienceForm.period}
                        onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                        className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Type</label>
                      <input
                        type="text"
                        value={experienceForm.type}
                        onChange={(e) => setExperienceForm({ ...experienceForm, type: e.target.value })}
                        className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>
                </>
              )}

              {activeTab === 'certifications' && (
                <>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Certification Title</label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Issuer (e.g. Google, Anthropic, IBM)</label>
                    <input
                      type="text"
                      required
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-accent-gold mb-1">Category</label>
                    <input
                      type="text"
                      value={certForm.category}
                      onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 glass-panel text-white rounded border border-white/10"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs uppercase tracking-wider px-4 py-2 glass-panel text-gray-400 hover:text-white rounded border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs uppercase tracking-wider px-6 py-2 bg-white text-black font-semibold rounded hover:bg-accent-gold transition-colors"
                >
                  Save Record
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}
