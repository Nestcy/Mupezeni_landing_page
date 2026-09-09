import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FloatingCtaProps {
  onNavigateToContact: () => void;
  currentPage: string;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({ onNavigateToContact, currentPage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show floating button on the contact page itself
  if (!visible || currentPage === 'contact') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center p-1.5 rounded-2xl bg-[#0A0705]/95 backdrop-blur-xl border border-[#9B2208]/50 shadow-2xl animate-fadeIn">
      <button
        id="floating-cta-btn"
        onClick={onNavigateToContact}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:opacity-95 shadow-md shadow-[#9B2208]/30 transition-all active:scale-95 font-syne cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>Book My AI Growth Consultation</span>
        <ArrowRight className="w-3.5 h-3.5 text-white" />
      </button>
    </div>
  );
};
