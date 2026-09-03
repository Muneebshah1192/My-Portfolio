'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, TECHNICAL_SKILLS } from '@/lib/data';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-24 lg:py-24 px-5 sm:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14 text-left"
        >
          <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-2">
            Professional Overview
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Engineering & AI Vision
          </h2>
        </motion.div>

        {/* Lead Narrative with Full Justification on Desktop & Left-Aligned on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                <h3 className="text-sm font-semibold text-white tracking-widest uppercase">
                  Biography & Technical Ethos
                </h3>
              </div>

              {/* Justified on Desktop, Left-aligned on Mobile to prevent word-splitting and huge gaps */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light text-left md:text-justify hyphens-none [text-align-last:left] [word-break:keep-all] [overflow-wrap:normal] break-normal">
                {PERSONAL_INFO.about}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-accent-gold mb-1">Academic Degree</span>
                <span className="text-white font-medium">{PERSONAL_INFO.education.degree}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-accent-gold mb-1">Institution</span>
                <span className="text-white font-medium">{PERSONAL_INFO.education.institution}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-accent-gold mb-1">Timeline</span>
                <span className="text-white font-medium">{PERSONAL_INFO.education.expectedGraduation}</span>
              </div>
            </div>
          </motion.div>

          {/* Metrics Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-4"
          >
            <div className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col justify-center text-center">
              <div className="text-2xl sm:text-4xl font-bold text-accent-gold mb-1">{PERSONAL_INFO.metrics.linkedinConnections}</div>
              <div className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400">LinkedIn Connections</div>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col justify-center text-center">
              <div className="text-2xl sm:text-4xl font-bold text-accent-gold mb-1">{PERSONAL_INFO.metrics.experienceCount}</div>
              <div className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400">Industry Roles</div>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col justify-center text-center">
              <div className="text-2xl sm:text-4xl font-bold text-accent-gold mb-1">{PERSONAL_INFO.metrics.projectsCount}</div>
              <div className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400">Projects Built</div>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col justify-center text-center">
              <div className="text-2xl sm:text-4xl font-bold text-accent-gold mb-1">{PERSONAL_INFO.metrics.certificationsCount}</div>
              <div className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gray-400">Certifications</div>
            </div>
          </motion.div>

        </div>

        {/* 6 Curated Technical & Professional Domains (Bento Grid UI) */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-2">
            Competency Architecture
          </span>
          <h3 className="text-xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-8">
            Technical & Professional Skills
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TECHNICAL_SKILLS.map((domain, index) => (
            <motion.div
              key={domain.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    {domain.category}
                  </h4>
                  <span className="text-[10px] uppercase font-mono text-accent-gold px-2 py-0.5 bg-white/5 rounded">
                    Domain {domain.domainNumber}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] sm:text-xs text-gray-200 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
