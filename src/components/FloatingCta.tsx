import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface FloatingCtaProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onOpenBookingModal}
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs sm:text-sm shadow-2xl shadow-[#9B2208]/50 border border-[#CD481B]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span>Get Your AI Team • $100/mo</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};
