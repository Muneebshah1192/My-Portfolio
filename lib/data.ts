import { Project, Experience, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Syed Muneeb Haider Shah",
  titles: [
    "AI & Automation Engineer",
    "Python, Data Science & ML",
    "Full-Stack & 3D Web Experiences"
  ],
  subtitleString: "AI & Automation Engineer | Python, Data Science & ML | Full-Stack & 3D Web Experiences",
  education: {
    degree: "BS Information Technology and AI",
    institution: "The University of Chakwal",
    expectedGraduation: "Expected September 2027"
  },
  metrics: {
    linkedinConnections: "3,000+",
    linkedinBadge: "3,000+ Connections & Active Tech Creator",
    certificationsCount: "30+",
    projectsCount: "17+",
    experienceCount: "11+"
  },
  contact: {
    email: "muneebshah1192@gmail.com",
    phone: "0314-089-5219",
    whatsapp: "+923140895219",
    whatsappFormatted: "03140895219",
    whatsappUrl: "https://wa.me/923140895219",
    linkedin: "https://linkedin.com/in/syed-muneeb-629648284",
    github: "https://github.com/Muneebshah1192"
  },
  about: "I am a BSIT student at The University of Chakwal with a strong passion for Artificial Intelligence, software development, automation, and innovative technology solutions. My technical journey includes hands-on experience in Prompt Engineering, Web Development, Python programming, AI bot design, AI agent design, n8n automation, Machine Learning, Robotics, Software Quality Assurance, and software testing. I also have practical exposure to Cybersecurity Fundamentals, SQL, DBMS, Oracle, AWS, Networking, Virtualization, Project Management, and Information Security. I enjoy building practical, logic-driven, and AI-powered solutions that solve real-world problems."
};

// 6 Curated Domains for Grid/Bento UI Display
export const TECHNICAL_SKILLS = [
  {
    domainNumber: "01",
    category: "AI & Machine Learning",
    skills: [
      "Artificial Intelligence (AI)",
      "Machine Learning & Deep Learning",
      "Natural Language Processing (NLP)",
      "Generative AI",
      "Agentic AI Development",
      "Model Context Protocol (MCP)",
      "Prompt Engineering",
      "OpenCV & MediaPipe",
      "Scikit-learn & TensorFlow"
    ]
  },
  {
    domainNumber: "02",
    category: "Software & Web Development",
    skills: [
      "Full-Stack Development",
      "Python (Programming Language)",
      "Next.js & React",
      "Three.js & WebGL",
      "Tailwind CSS",
      "Flask & FastAPI",
      "Supabase & PostgreSQL",
      "Software Architecture & Design"
    ]
  },
  {
    domainNumber: "03",
    category: "Cybersecurity",
    skills: [
      "Cybersecurity",
      "Information Security",
      "Network Security"
    ]
  },
  {
    domainNumber: "04",
    category: "Automation & DevOps",
    skills: [
      "Automation Engineering",
      "Process Automation (n8n & Make.com)",
      "DevOps"
    ]
  },
  {
    domainNumber: "05",
    category: "Data",
    skills: [
      "Data Engineering",
      "Data Analytics",
      "Business Intelligence (BI)"
    ]
  },
  {
    domainNumber: "06",
    category: "Management & Core Competencies",
    skills: [
      "Technical Project Management",
      "Agile Methodologies (Scrum & Kanban)",
      "Problem Solving",
      "Effective Communication",
      "Teamwork & Collaboration"
    ]
  }
];

// Curated High-Impact Projects Categorized by Domain
export const INITIAL_PROJECTS: Project[] = [
  // 1. Full-Stack & 3D Web Development
  {
    id: "proj-1",
    title: "The Momos Theory - Custom 3D E-Commerce Website",
    tagline: "Custom immersive 3D e-commerce platform developed for Syed Zohair Ahmad.",
    description: "High-performance interactive 3D web experience with WebGL product visualization, dynamic cart management, and modern luxury design.",
    category: "Full-Stack & 3D Web",
    technologies: ["Next.js", "Three.js", "WebGL", "React", "Tailwind CSS"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },
  {
    id: "proj-2",
    title: "QueueLess - AI Smart Queue & Token Management System",
    tagline: "Intelligent real-time queue orchestration and predictive token allocation platform.",
    description: "An advanced smart queuing system designed to eliminate physical waiting lines through algorithmic token dispatch, real-time wait estimation, and SMS/push notifications.",
    category: "Full-Stack & 3D Web",
    technologies: ["Python", "Next.js", "FastAPI", "WebSockets", "PostgreSQL"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },
  {
    id: "proj-3",
    title: "TextForge Studio - AI SaaS Writing Platform",
    tagline: "Enterprise-grade generative AI text generation and content engineering suite.",
    description: "Full-stack SaaS application with customizable prompt templates, tone-of-voice calibration, document analysis, and export automation for editorial teams.",
    category: "Full-Stack & 3D Web",
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Supabase", "Stripe"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },
  {
    id: "proj-4",
    title: "CRMS - Criminal Record Management System",
    tagline: "Secure centralized relational database and biometric record indexing portal.",
    description: "High-security relational database system with role-based access control, cryptographic verification, and audit logging for law enforcement workflows.",
    category: "Full-Stack & 3D Web",
    technologies: ["Java", "Oracle SQL", "Spring Boot", "React", "Cryptography"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-5",
    title: "Style & Glow Affiliate Platform",
    tagline: "Automated e-commerce affiliate aggregator with dynamic price intelligence.",
    description: "High performance product aggregation platform with automated scraping pipelines, price tracking, and affiliate attribution routing.",
    category: "Full-Stack & 3D Web",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },

  // 2. AI Automation & n8n Pipelines
  {
    id: "proj-6",
    title: "Autonomous AI-Driven YouTube Metadata Engine & SEO Pipeline",
    tagline: "Automated video transcription, keyword extraction, and metadata optimization pipeline.",
    description: "Autonomous pipeline integrating speech-to-text models and LLMs to generate high-ranking SEO titles, descriptions, and tag matrices.",
    category: "AI Automation & n8n",
    technologies: ["n8n", "Python", "OpenAI API", "YouTube Data API", "Webhooks"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },
  {
    id: "proj-7",
    title: "AI-Powered LinkedIn Content Creator & Scheduler",
    tagline: "Automated industry trend analysis and scheduled post generation system (n8n).",
    description: "Multi-step workflow utilizing RSS feeds, semantic summarization, and LinkedIn API webhooks to automate professional thought leadership publishing.",
    category: "AI Automation & n8n",
    technologies: ["n8n", "LLM Pipelines", "LinkedIn API", "REST", "Node.js"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },
  {
    id: "proj-8",
    title: "Automated SEO Article Generation Pipeline",
    tagline: "End-to-end longform research, outline synthesis, and CMS publishing system (n8n).",
    description: "High throughput content engine executing web scraping, SERP analysis, section-by-section drafting, and direct markdown/WordPress publishing.",
    category: "AI Automation & n8n",
    technologies: ["n8n", "Python", "SerpAPI", "OpenAI", "WordPress REST"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },
  {
    id: "proj-9",
    title: "Intelligent KYC Automation System",
    tagline: "Autonomous identity verification and regulatory document compliance engine.",
    description: "Automated document scanning, optical character recognition, facial matching, and anti-fraud verification pipeline designed for fintech compliance.",
    category: "AI Automation & n8n",
    technologies: ["Python", "OpenCV", "Tesseract OCR", "FastAPI", "Docker"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  },

  // 3. Artificial Intelligence, NLP & Computer Vision
  {
    id: "proj-10",
    title: "MindCare AI - Mental Health FAQ Chatbot",
    tagline: "Conversational mental wellness guidance and healthcare knowledge routing (CodeAlpha).",
    description: "Trained conversational agent utilizing intent recognition and sentiment analysis to provide empathetic responses and verified mental health resources.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "NLTK", "Transformers", "React", "Flask"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-11",
    title: "Medical Expert System",
    tagline: "Rule-based and probabilistic diagnostic inference system for clinical triage (Syntecxhub).",
    description: "Knowledge-base reasoning engine utilizing forward and backward chaining algorithms to assist medical staff in preliminary symptom analysis.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "Prolog Logic", "Flask", "SQLite", "Tailwind CSS"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-12",
    title: "FaceStyle AI Pro Analyzer",
    tagline: "Deep learning facial topology evaluation and aesthetic styling recommendation platform.",
    description: "Computer vision application providing real-time facial symmetry analysis, geometric feature mapping, and personalized grooming recommendations.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "PyTorch", "MediaPipe", "React", "FastAPI"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-13",
    title: "Hand Gesture Recognition System",
    tagline: "Real-time hand tracking and contactless machine control interface (Syntecxhub).",
    description: "Computer vision pipeline detecting multi-finger landmarks and gesture vectors to control system audio, presentations, and applications.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy", "PyAutoGUI"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-14",
    title: "Apexcify Image Classifier",
    tagline: "Convolutional neural network for multi-class visual object recognition.",
    description: "Deep learning image classification architecture trained on custom datasets with data augmentation and high validation accuracy.",
    category: "AI, NLP & Vision",
    technologies: ["TensorFlow", "Keras", "Python", "Scikit-Learn", "Matplotlib"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-15",
    title: "Music Recommendation System & AI Music Generator",
    tagline: "Hybrid audio feature extraction, recommendation engine, and algorithmic generation.",
    description: "Combines Spotify API acoustic feature vectors with cosine similarity algorithms and MIDI generative sequences for tailored musical exploration.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "Librosa", "Scikit-Learn", "Spotify API", "Flask"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-16",
    title: "Project Sentiment Analysis Tool",
    tagline: "Real-time user feedback evaluation and emotion classification suite (Syntecxhub).",
    description: "Natural language processing tool analyzing textual sentiment polarity, subjectivity, and customer feedback themes with automated reporting.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "VADER", "TextBlob", "Pandas", "Streamlit"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-17",
    title: "AI CodeAlpha Translator",
    tagline: "Multi-language neural machine translation interface with syntax preservation.",
    description: "Transformer-based language translation portal enabling instant multilingual text processing and programmatic code comment translation.",
    category: "AI, NLP & Vision",
    technologies: ["Python", "HuggingFace", "Transformers", "FastAPI", "React"],
    github_url: "https://github.com/Muneebshah1192",
    featured: false
  },
  {
    id: "proj-18",
    title: "Valunexa Sounds - Independent Music Production & Audio Engineering Label",
    tagline: "Audio production, acoustic mastering, and digital sound synthesis collective.",
    description: "Independent creative label dedicated to spatial sound design, modular synthesizer composition, vocal mastering, and digital audio distribution.",
    category: "Full-Stack & 3D Web",
    technologies: ["FL Studio", "Ableton Live", "DSP Algorithms", "Web Audio API", "Sound Design"],
    github_url: "https://github.com/Muneebshah1192",
    featured: true
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Machine Learning Intern",
    company: "FlyRank AI",
    period: "Jun 2026 - Present",
    description: "Developing intelligent ranking algorithms, neural feature pipelines, and machine learning models for search optimization.",
    type: "Internship"
  },
  {
    id: "exp-2",
    role: "Hospital IT & Information Security Intern",
    company: "Doctors International Hospital, Islamabad",
    period: "Jun 2026 - Aug 2026",
    description: "Managed healthcare infrastructure systems, network protocols, electronic health record security, and clinical IT operations.",
    type: "Internship"
  },
  {
    id: "exp-3",
    role: "Machine Learning Intern",
    company: "Meng Ming International",
    period: "May 2026 - Present",
    description: "Engineered predictive machine learning models, natural language classification pipelines, and data processing architectures.",
    type: "Internship"
  },
  {
    id: "exp-4",
    role: "Prompt Engineer",
    company: "Fiverr",
    period: "May 2026 - Present",
    description: "Architecting bespoke prompt frameworks, LLM system prompts, chain-of-thought protocols, and autonomous agent workflows.",
    type: "Contract"
  },
  {
    id: "exp-5",
    role: "Automation Engineer",
    company: "Upwork",
    period: "Mar 2026 - Present",
    description: "Delivering end-to-end enterprise workflow automations, n8n webhook pipelines, API integrations, and database synchronizations.",
    type: "Freelance"
  },
  {
    id: "exp-6",
    role: "Web Developer",
    company: "Sproutgigs",
    period: "Aug 2024 - Present",
    description: "Creating responsive, modern full-stack web applications and micro-services for international clients.",
    type: "Freelance"
  },
  {
    id: "exp-7",
    role: "Software Engineer",
    company: "HackerRank",
    period: "Jun 2026 - Jul 2026",
    description: "Participated in rigorous algorithmic problem solving, software design verification, and code quality evaluations.",
    type: "Assessment"
  },
  {
    id: "exp-8",
    role: "Artificial Intelligence Intern",
    company: "Decodelabs",
    period: "Jun 2026 - Jul 2026",
    description: "Developed deep learning models, prompt orchestration engines, and computer vision proof-of-concept architectures.",
    type: "Internship"
  },
  {
    id: "exp-9",
    role: "Artificial Intelligence Intern",
    company: "Arch Technologies",
    period: "Feb 2026 - May 2026",
    description: "Built conversational AI bots, retrieval augmented generation systems, and automated data pipelines.",
    type: "Internship"
  },
  {
    id: "exp-10",
    role: "Artificial Intelligence Intern",
    company: "Syntecxhub",
    period: "Feb 2026 - Mar 2026",
    description: "Contributed to machine learning pipeline integration and automated quality testing protocols.",
    type: "Internship"
  },
  {
    id: "exp-11",
    role: "Artificial Intelligence Intern",
    company: "CodeAlpha",
    period: "Feb 2026 - Mar 2026",
    description: "Designed foundational neural networks, supervised classification workflows, and model performance evaluations.",
    type: "Internship"
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  { id: "cert-1", title: "Software Engineer", issuer: "HackerRank", category: "Software Engineering" },
  { id: "cert-2", title: "Introduction to agent skills", issuer: "Anthropic", category: "AI & Agents" },
  { id: "cert-3", title: "Artificial Intelligence Virtual Internship", issuer: "Decodelabs", category: "AI & ML" },
  { id: "cert-4", title: "Data Analytics and Business", issuer: "DigiSkills.pk", category: "Data Science" },
  { id: "cert-5", title: "Artificial Intelligence Using Python", issuer: "DigiSkills.pk", category: "AI & Python" },
  { id: "cert-6", title: "Google Cybersecurity Professional Certificate", issuer: "Google", category: "Cybersecurity" },
  { id: "cert-7", title: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", category: "AI & Agents" },
  { id: "cert-8", title: "Introduction to DevOps", issuer: "IBM", category: "DevOps & Cloud" },
  { id: "cert-9", title: "Google AI Professional Certificate", issuer: "Google", category: "AI & ML" },
  { id: "cert-10", title: "Wells Fargo Software Engineering Job Simulation", issuer: "Forage", category: "Software Engineering" },
  { id: "cert-11", title: "Deloitte Technology Job Simulation", issuer: "Forage", category: "Enterprise Tech" },
  { id: "cert-12", title: "Generative AI Overview for Project Managers", issuer: "Project Management Institute", category: "Management & AI" },
  { id: "cert-13", title: "Business Communications", issuer: "HP LIFE", category: "Professional Skills" },
  { id: "cert-14", title: "Project Management", issuer: "HP LIFE", category: "Management" },
  { id: "cert-15", title: "Professional Networking for Career Growth", issuer: "HP LIFE", category: "Professional Skills" },
  { id: "cert-16", title: "Critical Thinking in the AI Era", issuer: "HP LIFE", category: "AI Strategy" },
  { id: "cert-17", title: "AI for Business Professionals", issuer: "HP LIFE", category: "AI Strategy" },
  { id: "cert-18", title: "Technical Support Fundamentals", issuer: "Google", category: "IT Infrastructure" },
  { id: "cert-19", title: "Hello, Python!", issuer: "Google", category: "Programming" },
  { id: "cert-20", title: "Tools of the Trade: Linux and SQL", issuer: "Google", category: "Systems & SQL" },
  { id: "cert-21", title: "Connect and Protect: Networks and Network Security", issuer: "Google", category: "Networking" },
  { id: "cert-22", title: "The Nuts and Bolts of Machine Learning", issuer: "Google", category: "Machine Learning" },
  { id: "cert-23", title: "The Bits and Bytes of Computer Networking", issuer: "Google", category: "Networking" },
  { id: "cert-24", title: "Play It Safe: Manage Security Risks", issuer: "Google", category: "Cybersecurity" },
  { id: "cert-25", title: "Foundations of Project Management", issuer: "Google", category: "Management" },
  { id: "cert-26", title: "Automate tasks and processes with Jira", issuer: "Coursera", category: "Automation" },
  { id: "cert-27", title: "Google AI Essentials", issuer: "Google", category: "AI & ML" },
  { id: "cert-28", title: "Crash Course on Python", issuer: "Google", category: "Programming" },
  { id: "cert-29", title: "Google Prompting Essentials", issuer: "Coursera / Google", category: "Prompt Engineering" },
  { id: "cert-30", title: "Foundations of Cybersecurity", issuer: "United Latino Students Association", category: "Cybersecurity" }
];
