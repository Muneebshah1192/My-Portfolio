'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
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

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled || isOpen ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-[11px] xs:text-xs sm:text-sm font-semibold tracking-widest text-white uppercase hover:text-accent-gold transition-colors truncate max-w-[65vw] sm:max-w-none"
          >
            SYED MUNEEB HAIDER SHAH
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Admin CMS Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-xs uppercase tracking-widest px-4 py-2 border border-white/20 text-accent-silver hover:border-accent-gold hover:text-accent-gold transition-all duration-300 rounded"
            >
              Admin CMS
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden flex-col justify-center items-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-gold/40 transition-all z-50 cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? 'transform rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full my-1 transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Full-Screen Navigation Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-35 bg-background/98 backdrop-blur-2xl md:hidden flex flex-col justify-center p-8 sm:p-12"
          >
            {/* Background Vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col space-y-8 max-w-sm mx-auto w-full text-center">
              <span className="text-[10px] uppercase tracking-widest text-accent-gold font-medium block mb-2 border-b border-white/10 pb-4">
                Navigation Menu
              </span>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl uppercase tracking-widest text-gray-300 hover:text-accent-gold transition-colors block py-2.5 font-light"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.35 }}
                className="pt-6 border-t border-white/10 flex flex-col gap-4"
              >
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-xs uppercase tracking-widest py-3.5 bg-white text-black font-semibold rounded hover:bg-accent-gold transition-colors text-center shadow-glass-luxury"
                >
                  Admin CMS
                </Link>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-xs uppercase tracking-widest py-3 glass-panel text-gray-400 hover:text-white rounded border border-white/10 text-center"
                >
                  Return
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
