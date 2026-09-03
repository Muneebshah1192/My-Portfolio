import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { INITIAL_PROJECTS, INITIAL_EXPERIENCES, INITIAL_CERTIFICATIONS } from '@/lib/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Project, Experience, Certification } from '@/lib/types';

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

async function getPortfolioData() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const [projectsRes, expRes, certRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('experiences').select('*').order('order_index', { ascending: true }),
        supabase.from('certifications').select('*').order('order_index', { ascending: true })
      ]);

      return {
        projects: (projectsRes.data && projectsRes.data.length > 0) ? (projectsRes.data as Project[]) : INITIAL_PROJECTS,
        experiences: (expRes.data && expRes.data.length > 0) ? (expRes.data as Experience[]) : INITIAL_EXPERIENCES,
        certifications: (certRes.data && certRes.data.length > 0) ? (certRes.data as Certification[]) : INITIAL_CERTIFICATIONS
      };
    } catch (e) {
      console.warn('Failed to fetch from Supabase, using seeded static data.', e);
    }
  }

  return {
    projects: INITIAL_PROJECTS,
    experiences: INITIAL_EXPERIENCES,
    certifications: INITIAL_CERTIFICATIONS
  };
}

export default async function HomePage() {
  const { projects, experiences, certifications } = await getPortfolioData();

  return (
    <main className="relative z-10">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <ContactSection />
      <Footer />
    </main>
  );
}
