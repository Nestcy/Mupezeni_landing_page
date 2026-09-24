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
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#E58330] to-[#FF9F4A] text-[#0A0604] font-bold text-xs sm:text-sm shadow-2xl shadow-[#E58330]/40 hover:scale-105 active:scale-95 transition-all"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
        </span>
        <span>Get Your AI Team • K2,000/mo</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};
