'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '@/lib/types';
import { PERSONAL_INFO } from '@/lib/data';
import ThreeDTilt from './ThreeDTilt';

interface Props {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredCerts = certifications.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cert.category && cert.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Display only first 6 certifications by default, or all if expanded
  const visibleCerts = showAll ? filteredCerts : filteredCerts.slice(0, 6);

  return (
    <section id="certifications" className="py-20 md:py-24 lg:py-24 px-5 sm:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        
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
              Credentials & Qualifications
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Certifications & Courses
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto"
          >
            <input
              type="text"
              placeholder="Search 30+ certifications..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowAll(false); // Reset collapse when searching
              }}
              className="w-full md:w-64 text-xs px-4 py-3.5 sm:py-2.5 glass-panel text-white placeholder-gray-500 rounded-lg border border-white/15 focus:border-accent-gold focus:outline-none transition-colors min-h-[44px]"
            />
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest px-5 py-3.5 sm:py-2.5 glass-panel text-accent-gold font-semibold rounded-lg border border-accent-gold/30 hover:bg-accent-gold hover:text-black transition-all text-center whitespace-nowrap min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              Verify on LinkedIn →
            </a>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCerts.map((cert, index) => (
            <ThreeDTilt key={cert.id || index} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                className="glass-panel glass-panel-hover p-4 rounded-xl flex items-center justify-between gap-4 min-h-[72px] h-full border border-white/10"
              >
                <div className="flex-1 min-w-0">
                  {/* Title wrapping on mobile to prevent clipping of long course names */}
                  <h3 className="text-xs font-semibold text-white whitespace-normal md:truncate mb-1 pr-1 break-words">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400">
                    <span className="text-accent-silver font-medium">{cert.issuer}</span>
                    {cert.category && (
                      <>
                        <span>•</span>
                        <span className="text-gray-500 truncate max-w-[80px] xs:max-w-none">{cert.category}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Verify Action Button with 44px min mobile height */}
                <a
                  href={PERSONAL_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-[10px] uppercase tracking-wider text-accent-gold px-3.5 py-3 sm:px-2.5 sm:py-1 bg-white/5 hover:bg-accent-gold hover:text-black border border-accent-gold/25 rounded transition-all duration-300 font-medium min-h-[44px] sm:min-h-0 flex items-center justify-center cursor-pointer shadow-glass-luxury"
                >
                  Verify
                </a>
              </motion.div>
            </ThreeDTilt>
          ))}
        </div>

        {/* Dynamic Expand Button */}
        {filteredCerts.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 glass-panel text-accent-gold text-xs uppercase tracking-widest font-semibold rounded border border-accent-gold/30 hover:bg-accent-gold hover:text-black transition-all duration-300 shadow-glass-luxury min-h-[44px] cursor-pointer"
            >
              {showAll ? 'Show Less ↑' : `View All Certifications (${filteredCerts.length - 6}) ↓`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
