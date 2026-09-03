'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 lg:py-24 px-5 sm:px-12 lg:px-20 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-left mb-12 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-2">
            Direct Communication
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
            Initiate Contact
          </h2>
          <p className="text-sm text-gray-300 font-light max-w-2xl">
            Direct channels for professional engagements, AI automation consulting, and high-impact engineering collaborations.
          </p>
        </motion.div>

        {/* 4 Direct Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Channel 1: WhatsApp Direct */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono">Channel 01</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded">
                  Instant
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">WhatsApp Direct</h3>
              <p className="text-xs text-gray-400 font-light mb-4">
                Fastest response for direct project queries and instant chat.
              </p>
              <div className="p-3 bg-white/5 rounded-lg font-mono text-sm text-white mb-4">
                {PERSONAL_INFO.contact.whatsappFormatted}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10">
              <a
                href={PERSONAL_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-green-950/40 hover:bg-green-600 hover:text-black text-green-300 text-xs uppercase tracking-widest font-semibold rounded border border-green-500/30 flex items-center justify-center gap-2 transition-all duration-300 min-h-[44px]"
              >
                <span>Message on WhatsApp</span>
                <span>→</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.contact.whatsappFormatted, 'phone')}
                className="w-full py-2.5 glass-panel text-[11px] text-gray-400 hover:text-white uppercase tracking-wider rounded transition-colors min-h-[38px] sm:min-h-0 flex items-center justify-center cursor-pointer"
              >
                {copiedPhone ? 'Copied to Clipboard' : 'Copy Phone Number'}
              </button>
            </div>
          </motion.div>

          {/* Channel 2: Direct Email */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono">Channel 02</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                  Official
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Direct Email</h3>
              <p className="text-xs text-gray-400 font-light mb-4">
                Formal inquiries, technical specifications, and detailed proposals.
              </p>
              <div className="p-3 bg-white/5 rounded-lg font-mono text-xs text-white break-all mb-4">
                {PERSONAL_INFO.contact.email}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10">
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="w-full py-3.5 bg-white text-black hover:bg-accent-gold text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center gap-2 transition-all duration-300 shadow-glass-luxury min-h-[44px]"
              >
                <span>Send Email</span>
                <span>→</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.contact.email, 'email')}
                className="w-full py-2.5 glass-panel text-[11px] text-gray-400 hover:text-white uppercase tracking-wider rounded transition-colors min-h-[38px] sm:min-h-0 flex items-center justify-center cursor-pointer"
              >
                {copiedEmail ? 'Copied to Clipboard' : 'Copy Email Address'}
              </button>
            </div>
          </motion.div>

          {/* Channel 3: LinkedIn Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono">Channel 03</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-white/5 text-accent-silver border border-white/10 rounded">
                  Network
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">LinkedIn Network</h3>
              <p className="text-xs text-gray-400 font-light mb-4">
                Professional connections, endorsements, and verified career trajectory.
              </p>
              <div className="p-3 bg-white/5 rounded-lg text-xs text-gray-300 mb-4">
                syed-muneeb-629648284
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 glass-panel text-accent-gold hover:bg-accent-gold hover:text-black text-xs uppercase tracking-widest font-semibold rounded border border-accent-gold/30 flex items-center justify-center gap-2 transition-all duration-300 min-h-[44px]"
              >
                <span>Connect on LinkedIn</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

          {/* Channel 4: GitHub Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-accent-gold font-mono">Channel 04</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-white/5 text-accent-silver border border-white/10 rounded">
                  Open Source
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">GitHub Repositories</h3>
              <p className="text-xs text-gray-400 font-light mb-4">
                Source code, AI architectures, automation pipelines, and experiments.
              </p>
              <div className="p-3 bg-white/5 rounded-lg text-xs text-gray-300 mb-4">
                Muneebshah1192
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 glass-panel text-white hover:border-accent-gold hover:text-accent-gold text-xs uppercase tracking-widest font-semibold rounded border border-white/20 flex items-center justify-center gap-2 transition-all duration-300 min-h-[44px]"
              >
                <span>Explore GitHub</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
