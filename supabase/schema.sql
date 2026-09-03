-- ==============================================================================
-- SYED MUNEEB HAIDER SHAH - SUPABASE POSTGRESQL SCHEMA
-- Projects, Experiences, Certifications & Storage Bucket Configuration
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  tagline TEXT,
  description TEXT,
  category TEXT DEFAULT 'AI & Systems',
  technologies TEXT[] DEFAULT '{}',
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'internship',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  credential_url TEXT,
  category TEXT DEFAULT 'AI & ML',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON public.certifications FOR SELECT USING (true);

-- Authenticated (Admin) write access policies
CREATE POLICY "Admin Insert Projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin Delete Projects" ON public.projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin Insert Experiences" ON public.experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Experiences" ON public.experiences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin Delete Experiences" ON public.experiences FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin Insert Certifications" ON public.certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Update Certifications" ON public.certifications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin Delete Certifications" ON public.certifications FOR DELETE TO authenticated USING (true);

-- Storage bucket creation instruction:
-- In Supabase dashboard -> Storage -> Create bucket named "portfolio-assets" (Public: true)
-- Or run:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Public View Bucket Objects" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Auth Upload Bucket Objects" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "Auth Delete Bucket Objects" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');
