'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/60 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500 uppercase tracking-widest">
        <div>
          <span>SYED MUNEEB HAIDER SHAH</span>
          <span className="mx-2">•</span>
          <span>BSIT & AI PORTFOLIO</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/admin" className="hover:text-accent-gold transition-colors">
            Admin Panel
          </Link>
          <a href="#about" className="hover:text-white transition-colors">
            Return to Apex
          </a>
        </div>
      </div>
    </footer>
  );
}
