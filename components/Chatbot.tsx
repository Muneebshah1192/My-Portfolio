'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { evaluateChatbotResponse } from '@/lib/chatbot-rules';
import { ChatMessage } from '@/lib/types';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'bot',
      text: 'Hello. I am the AI assistant for Syed Muneeb Haider Shah. Ask me about his education, skills, career experience, or contact information.',
      timestamp: 'Initial'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'Who is Syed?',
    'Education',
    'Core Skills',
    'Experience',
    'Contact Info'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botReplyText = evaluateChatbotResponse(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      
      {/* Chat Window - Constrained size for mobile screen compatibility */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[90vw] sm:w-[380px] h-[70vh] sm:h-[520px] max-h-[520px] min-h-[350px] glass-panel rounded-xl shadow-glass-luxury flex flex-col overflow-hidden border border-white/15"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold text-xs font-bold font-mono">
                  SH
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                    AI Portfolio Assistant
                  </h4>
                  <span className="text-[10px] text-accent-gold uppercase tracking-widest block">
                    Online & Ready
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] sm:text-xs text-gray-400 hover:text-white uppercase tracking-wider px-2 py-1.5 bg-white/5 rounded border border-white/10 transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                Close
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-lg text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent-gold text-black font-medium'
                        : 'bg-white/10 text-gray-200 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-400 text-xs px-3 py-2 rounded-lg border border-white/10 italic">
                    Evaluating response...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2.5 border-t border-white/5 flex gap-1.5 overflow-x-auto bg-black/20 scrollbar-none">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap text-[10px] uppercase tracking-wider px-3 py-1.5 bg-white/5 hover:bg-white/15 text-accent-silver border border-white/10 rounded transition-colors min-h-[32px]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Syed Muneeb..."
                className="flex-1 text-xs px-3 py-2.5 bg-white/5 text-white placeholder-gray-500 rounded border border-white/10 focus:border-accent-gold focus:outline-none transition-colors min-h-[40px]"
              />
              <button
                onClick={() => handleSendMessage()}
                className="text-xs uppercase tracking-wider px-3.5 py-2.5 bg-white text-black font-semibold rounded hover:bg-accent-gold transition-colors min-h-[40px]"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 sm:py-3 glass-panel text-white text-[11px] sm:text-xs uppercase tracking-widest font-semibold rounded-full border border-white/20 hover:border-accent-gold hover:text-accent-gold shadow-glass-luxury transition-all duration-300 flex items-center space-x-2 min-h-[44px]"
        aria-label="Toggle AI Assistant"
      >
        <span className="w-2 h-2 rounded-full bg-accent-gold animate-ping inline-block" />
        <span>{isOpen ? 'Close Assistant' : 'Ask AI Assistant'}</span>
      </button>

    </div>
  );
}
