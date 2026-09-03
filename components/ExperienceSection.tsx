'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '@/lib/types';
import { PERSONAL_INFO } from '@/lib/data';
import ThreeDTilt from './ThreeDTilt';

interface Props {
  experiences: Experience[];
}

// Dynamic technology tags generator based on keywords
const getExperienceTags = (role: string, desc: string): string[] => {
  const tags: string[] = [];
  const r = role.toLowerCase();
  const d = desc.toLowerCase();
  
  if (r.includes('machine learning') || d.includes('machine learning') || d.includes('predictive') || d.includes('models')) {
    tags.push('Python', 'Scikit-Learn', 'Predictive Modeling', 'TensorFlow');
  }
  if (r.includes('artificial intelligence') || r.includes('ai') || d.includes('prompt') || d.includes('agent') || d.includes('conversational')) {
    tags.push('Generative AI', 'LLMs', 'Prompt Engineering', 'AI Agents');
  }
  if (r.includes('automation') || d.includes('automation') || d.includes('n8n') || d.includes('pipeline') || d.includes('webhook')) {
    tags.push('n8n', 'Workflow Automation', 'API Integrations', 'Webhooks');
  }
  if (r.includes('web') || r.includes('developer') || d.includes('web') || d.includes('full-stack') || r.includes('full-stack')) {
    tags.push('Next.js', 'React', 'Tailwind CSS', 'TypeScript');
  }
  if (r.includes('security') || d.includes('security') || d.includes('network') || r.includes('it')) {
    tags.push('Cybersecurity', 'Network Protocols', 'Information Security', 'IT Operations');
  }
  if (r.includes('software engineer') || d.includes('algorithmic') || d.includes('code quality') || r.includes('software')) {
    tags.push('Algorithms', 'SQA & Testing', 'Software Architecture');
  }
  
  // Default fallback if no match
  if (tags.length === 0) {
    tags.push('Python', 'AI Integration', 'Data Science');
  }
  
  return tags;
};

export default function ExperienceSection({ experiences }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllTabs, setShowAllTabs] = useState(false);

  if (!experiences || experiences.length === 0) return null;

  // Render first 6 tabs by default, or all if expanded
  const visibleExperiences = showAllTabs ? experiences : experiences.slice(0, 6);
  
  // Safeguard activeExp selection
  const activeExp = experiences[activeTab] || experiences[0];

  return (
    <section id="experience" className="py-20 md:py-24 lg:py-24 px-5 sm:px-12 lg:px-20 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-2">
              Career Timeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Experience & Internships
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-auto"
          >
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3.5 sm:py-2.5 glass-panel text-accent-gold text-xs uppercase tracking-widest font-semibold rounded border border-accent-gold/30 hover:bg-accent-gold hover:text-black transition-all duration-300 shadow-glass-luxury min-h-[44px]"
            >
              <span>Verify All on LinkedIn</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>

        {/* Dynamic Tab Timeline Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          
          {/* TAB BAR: Horizontally scrollable list on Mobile, Vertical list on Desktop */}
          <div className="w-full md:w-1/4 flex flex-col flex-shrink-0">
            {/* Scrollable button container */}
            <div className="w-full flex md:flex-col overflow-x-auto md:overflow-x-visible md:overflow-y-visible scrollbar-none border-b md:border-b-0 md:border-l border-white/10 pb-1 md:pb-0">
              {visibleExperiences.map((exp, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={exp.id || idx}
                    onClick={() => setActiveTab(idx)}
                    className={`relative text-left px-4 py-3 text-xs uppercase tracking-widest transition-all duration-300 outline-none whitespace-nowrap md:whitespace-normal min-h-[40px] md:min-h-[44px] flex items-center flex-shrink-0 cursor-pointer ${
                      isActive 
                        ? 'text-accent-gold font-semibold bg-white/5 md:bg-transparent' 
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Sliding Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineTab"
                        className="absolute bg-accent-gold md:left-0 md:top-0 md:bottom-0 md:w-[2px] left-0 right-0 bottom-0 h-[2px] md:h-auto"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 truncate md:normal-case md:font-medium text-[10px] md:text-[11px]">
                      {exp.company}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Collapsible Expand Button for Remaining Tabs (Only shown on Desktop, matches timeline flow) */}
            {experiences.length > 6 && (
              <button
                onClick={() => {
                  setShowAllTabs(!showAllTabs);
                  // Reset selection if active tab is hidden on collapse
                  if (showAllTabs && activeTab >= 6) {
                    setActiveTab(0);
                  }
                }}
                className="hidden md:flex items-center gap-1.5 mt-3 px-4 py-2 text-[10px] uppercase tracking-widest text-accent-gold hover:text-white transition-colors duration-200 font-semibold cursor-pointer border border-accent-gold/20 hover:border-accent-gold/50 rounded bg-white/[0.02]"
              >
                <span>{showAllTabs ? 'Show Less ↑' : `More Experiences (${experiences.length - 6}) ↓`}</span>
              </button>
            )}
            
            {/* Mobile Dropdown expander (Horizontal layout matches overflow bar) */}
            {experiences.length > 6 && (
              <button
                onClick={() => {
                  setShowAllTabs(!showAllTabs);
                  if (showAllTabs && activeTab >= 6) {
                    setActiveTab(0);
                  }
                }}
                className="md:hidden flex items-center justify-center gap-1.5 mt-3 py-2 text-[9px] uppercase tracking-widest text-accent-gold border border-accent-gold/20 rounded bg-white/[0.02] cursor-pointer"
              >
                <span>{showAllTabs ? 'Show Less ↑' : `Show More (+${experiences.length - 6}) ↓`}</span>
              </button>
            )}
          </div>

          {/* ACTIVE PANEL CONTENT DISPLAY: Sized dynamically and tiltable in 3D */}
          <ThreeDTilt className="flex-1 w-full">
            <div className="w-full glass-panel bg-gradient-to-br from-white/5 to-white/[0.01] p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-glass-luxury min-h-[220px]">
              {/* Ambient Background Glow in Panel */}
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-accent-gold/5 blur-3xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
                          {activeExp.role}
                        </h3>
                        <h4 className="text-xs uppercase tracking-widest text-accent-silver font-medium mt-1">
                          {activeExp.company}
                        </h4>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span className="text-[10px] sm:text-xs text-gray-400 font-mono">
                          {activeExp.period}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded font-medium mt-0.5">
                          {activeExp.type || 'Internship'}
                        </span>
                      </div>
                    </div>

                    {activeExp.description && (
                      <div className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed text-left space-y-3 max-w-3xl">
                        {activeExp.description.split('\n').map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}

                    {/* Dynamic Experience Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {getExperienceTags(activeExp.role, activeExp.description || '').map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] sm:text-[10px] text-accent-gold/90 bg-accent-gold/5 px-2.5 py-0.5 rounded border border-accent-gold/15 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Verify Button */}
                  <div className="pt-5 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                      <span>Verified Professional Track</span>
                    </div>
                    <a
                      href={PERSONAL_INFO.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-widest px-4 py-2 bg-white/5 hover:bg-accent-gold hover:text-black text-accent-gold border border-accent-gold/30 rounded font-semibold transition-all duration-300 min-h-[40px] sm:min-h-0 flex items-center justify-center cursor-pointer shadow-glass-luxury"
                    >
                      Verify on LinkedIn →
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ThreeDTilt>

        </div>

      </div>
    </section>
  );
}
