import type { Metadata } from 'next';
import './globals.css';
import ScrollAnimationBackground from '@/components/ScrollAnimationBackground';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Syed Muneeb Haider Shah — AI & Automation Engineer',
  description: 'AI & Automation Engineer | Python, Data Science & ML | Full-Stack & 3D Web Experiences — Syed Muneeb Haider Shah Portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
        {/* Pure Scroll-Driven Video Animation Background (Zero 3D Objects in front of face) */}
        <ScrollAnimationBackground />

        {/* Page Foreground Content */}
        {children}

        {/* AI Assistant Chatbot */}
        <Chatbot />
      </body>
    </html>
  );
}
