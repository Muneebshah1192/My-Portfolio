'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import { PERSONAL_INFO } from '@/lib/data';
import ThreeDTilt from './ThreeDTilt';

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Full-Stack & 3D Web', 'AI Automation & n8n', 'AI, NLP & Vision'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter === 'All');

  // Display only first 6 projects by default, or all if expanded
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 md:py-24 lg:py-24 px-5 sm:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <span className="text-xs uppercase tracking-widest text-accent-gold font-medium block mb-2">
              Curated Portfolio Gallery
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Projects & Deployments
            </h2>
          </motion.div>

          {/* GitHub Profile Button & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto"
          >
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest px-5 py-3.5 sm:py-2.5 glass-panel text-white font-semibold rounded border border-white/20 hover:border-accent-gold hover:text-accent-gold transition-all text-center flex items-center justify-center min-h-[44px] sm:min-h-0"
            >
              GitHub Portfolio →
            </a>

            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setShowAll(false); // Reset expand status on filter change
                  }}
                  className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-3.5 py-3 sm:px-3 sm:py-1.5 rounded transition-all duration-300 flex-1 sm:flex-initial text-center min-h-[44px] sm:min-h-0 cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-accent-gold text-black font-semibold shadow-glow-gold'
                      : 'glass-panel text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ThreeDTilt key={project.id || index} className="h-full">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
                className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl flex flex-col justify-between h-full border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-white/5 text-accent-silver border border-white/10 rounded">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] uppercase tracking-widest text-accent-gold font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-wide mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-accent-silver font-medium mb-3 leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 text-left">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-4">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">Repository</span>
                    <a
                      href={project.github_url || PERSONAL_INFO.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-wider text-accent-gold hover:text-white transition-colors font-medium inline-flex items-center gap-1 min-h-[44px] sm:min-h-0 flex items-center"
                    >
                      <span>View on GitHub</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            </ThreeDTilt>
          ))}
        </div>

        {/* Dynamic Expand Button */}
        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 glass-panel text-accent-gold text-xs uppercase tracking-widest font-semibold rounded border border-accent-gold/30 hover:bg-accent-gold hover:text-black transition-all duration-300 shadow-glass-luxury min-h-[44px] cursor-pointer"
            >
              {showAll ? 'Show Less ↑' : `Discover More Projects (${filteredProjects.length - 6}) ↓`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
