export interface Project {
  id: string;
  title: string;
  slug?: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description?: string;
  type: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category?: string;
  credential_url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
