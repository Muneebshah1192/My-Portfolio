/**
 * Rule-Based AI Assistant Chatbot Engine
 * Evaluates user input against predefined intent rules.
 * Strictly free of emojis and symbols.
 */

export function evaluateChatbotResponse(input: string): string {
  const normalized = input.toLowerCase().trim();

  if (!normalized) {
    return "Please type a question regarding Syed Muneeb Haider Shah's portfolio, skills, experience, or contact details.";
  }

  // Rule 1: Name / Identity
  if (/\b(name|who|who are you|who is|identify|about you)\b/i.test(normalized)) {
    return "I am Syed Muneeb Haider Shah, an AI Automation Engineer, Python & LLM Developer, and Full-Stack AI Apps creator.";
  }

  // Rule 2: Education / Degree / University
  if (/\b(education|degree|university|study|college|academic|graduat(e|ion)|bsit|chakwal)\b/i.test(normalized)) {
    return "I am currently pursuing a BS in Information Technology and AI at The University of Chakwal, expected to graduate in September 2027.";
  }

  // Rule 3: Skills / Technologies
  if (/\b(skill|skills|tech|technolog(y|ies)|stack|languages|python|nextjs|machine learning|tools|frameworks)\b/i.test(normalized)) {
    return "My core skills include Prompt Engineering, Python, Next.js, AI Bot Design, n8n Automation, Machine Learning, Cybersecurity Fundamentals, Model Context Protocol (MCP), and Data Analytics.";
  }

  // Rule 4: Experience / Internships
  if (/\b(experience|internship|internships|work|career|history|flyrank|decodelabs|codealpha|jobs|companies)\b/i.test(normalized)) {
    return "I have completed multiple AI and ML internships at companies like FlyRank AI, Decodelabs, and CodeAlpha, alongside extensive freelance experience in web development and automation.";
  }

  // Rule 5: Contact / Hiring / Email / WhatsApp / LinkedIn
  if (/\b(contact|hire|email|phone|call|message|reach|linkedin|whatsapp|github|connect|collaborate)\b/i.test(normalized)) {
    return "You can reach me via email at muneebshah1192@gmail.com, via WhatsApp / phone at 03140895219, or connect with my 3,000+ network on LinkedIn.";
  }

  // Rule 6: Music / Audio Label
  if (/\b(music|audio|sound|sounds|valunexa|track|label|production|engineering)\b/i.test(normalized)) {
    return "I manage Valunexa Sounds, an independent music production and audio engineering label.";
  }

  // Rule 7: Projects / Portfolio
  if (/\b(project|projects|portfolio|built|apps|queueless|textforge|kyc|system|systems)\b/i.test(normalized)) {
    return "Notable projects include QueueLess AI Smart Queue System, TextForge Studio AI SaaS, Intelligent KYC Automation, n8n Business Suite, and Valunexa Sounds. Repositories are accessible on GitHub.";
  }

  // Rule 8: Certifications
  if (/\b(certificat(e|ion|ions)|courses|google|hackerrank|anthropic|ibm|forage)\b/i.test(normalized)) {
    return "I hold over 30 professional certifications spanning Software Engineering, Google Cybersecurity, Anthropic Agent Skills, and Machine Learning.";
  }

  // Default Fallback
  return "I am a simple AI assistant trained to answer questions about Syed Muneeb Haider Shah's portfolio. You can ask me about his education, skills, experience, or contact information.";
}
