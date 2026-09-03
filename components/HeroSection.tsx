'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';

export default function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex items-center relative pt-20 pb-10 px-5 sm:px-12 lg:px-20">
      
      {/* Left-Aligned Editorial Content Container (Keeps Right 50% Clear for Face & Video Animation) */}
      <div className="w-full max-w-sm xs:max-w-md md:max-w-lg lg:max-w-2xl text-left z-10 mr-auto">
        
        {/* Category Pill & LinkedIn Network Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 glass-panel rounded-full border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-medium">
              AI Automation & Systems Architecture
            </span>
          </div>

          <a
            href={PERSONAL_INFO.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 glass-panel rounded-full border border-blue-500/30 text-blue-300 hover:border-blue-400 hover:text-white transition-all text-[9px] sm:text-[11px] tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>3,000+ LinkedIn Network</span>
          </a>
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28px] xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase mb-3 sm:mb-5 leading-[1.08]"
        >
          SYED MUNEEB<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-accent-gold">
            HAIDER SHAH
          </span>
        </motion.h1>

        {/* Subtitle & Education */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1.5 mb-5 sm:mb-8"
        >
          <p className="text-[11px] sm:text-sm md:text-base text-accent-silver font-medium tracking-wide leading-relaxed">
            AI & Automation Engineer | Python, Data Science & ML | Full-Stack & 3D Web Experiences
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-light">
            {PERSONAL_INFO.education.degree} — {PERSONAL_INFO.education.institution} ({PERSONAL_INFO.education.expectedGraduation})
          </p>
        </motion.div>

        {/* Action Buttons Optimized for Mobile Touch Targets & Vertical Spacing */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-none space-y-2"
        >
          {/* Row 1: Primary CTAs */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5">
            <a
              href="#projects"
              className="px-3 py-2.5 sm:px-7 sm:py-3 bg-white text-black text-[10px] sm:text-xs uppercase tracking-widest font-semibold rounded hover:bg-accent-gold hover:text-black transition-all duration-300 shadow-glass-luxury text-center flex items-center justify-center min-h-[44px]"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-3 py-2.5 sm:px-7 sm:py-3 glass-panel text-white text-[10px] sm:text-xs uppercase tracking-widest font-semibold rounded border border-white/20 hover:border-accent-gold hover:text-accent-gold transition-all duration-300 text-center flex items-center justify-center min-h-[44px]"
            >
              Initiate Contact
            </a>
          </div>

          {/* Row 2: Secondary & Social links */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <a
              href={PERSONAL_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 sm:px-5 sm:py-3 glass-panel text-green-400 text-[9px] sm:text-xs uppercase tracking-wider rounded border border-green-500/20 hover:border-green-400 hover:text-white transition-all duration-300 text-center flex items-center justify-center min-h-[44px] font-semibold"
            >
              WhatsApp
            </a>
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 sm:px-5 sm:py-3 glass-panel text-gray-400 text-[9px] sm:text-xs uppercase tracking-wider rounded border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300 text-center flex items-center justify-center min-h-[44px] font-semibold"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 sm:px-5 sm:py-3 glass-panel text-gray-400 text-[9px] sm:text-xs uppercase tracking-wider rounded border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300 text-center flex items-center justify-center min-h-[44px] font-semibold"
            >
              GitHub
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
