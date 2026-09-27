import React from 'react';
import { Play, Sparkles, Bot, CheckCircle2 } from 'lucide-react';

interface CinematicDemoSectionProps {
  onOpenDemo: () => void;
}

export const CinematicDemoSection: React.FC<CinematicDemoSectionProps> = ({ onOpenDemo }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#070402] relative overflow-hidden border-t border-[#1C1008]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden border border-[#2B180D] bg-gradient-to-r from-[#140C07] via-[#1E110A] to-[#140C07] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visual Walkthrough</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto">
            Experience Your Future AI Retail Team in Action
          </h2>

          <p className="text-sm text-[#A8A099] max-w-xl mx-auto leading-relaxed">
            Watch how a customer inquiry on WhatsApp flows seamlessly into inventory reservation, digital payment confirmation, and next-day social marketing.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-extrabold text-sm shadow-xl shadow-[#9B2208]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-white">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Watch Interactive Demo</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
