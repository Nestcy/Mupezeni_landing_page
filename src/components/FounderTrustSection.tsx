import React from 'react';
import { 
  Linkedin, 
  MessageSquare, 
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { PageId } from '../types';

interface FounderTrustSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const FounderTrustSection: React.FC<FounderTrustSectionProps> = ({ 
  onNavigate,
  onOpenBookingModal 
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#0A0705] text-[#FAFAF9] relative overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#9B2208]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 space-y-12">
        
        {/* Main Founder Card */}
        <div className="rounded-3xl bg-[#130C08] border border-white/[0.09] p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Founder Photo + Channels */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl shadow-black/80 bg-[#0A0705]">
                  <img
                    src="/founder.png"
                    alt="Ernest Zimba - Founder & AI Systems Architect"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="text-xl font-bold font-syne text-[#FAFAF9]">Ernest Zimba</h3>
                <p className="text-xs font-dm font-semibold text-[#B83A0A] tracking-wider uppercase">
                  Founder & AI Systems Architect
                </p>
              </div>

              {/* Direct Channels */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/ernest-zimba-904661318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0705] border border-white/[0.08] hover:border-white/20 text-[#FAFAF9]/80 hover:text-white text-xs font-dm transition-all cursor-pointer"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>

                <a
                  href="https://wa.me/260776091393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0705] border border-white/[0.08] hover:border-white/20 text-[#FAFAF9]/80 hover:text-white text-xs font-dm transition-all cursor-pointer"
                  title="Direct WhatsApp: 0776091393"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp (0776091393)</span>
                </a>
              </div>
            </div>

            {/* Right: Founder Narrative & Statement */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                  Founder
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-[#FAFAF9] tracking-tight">
                  Building capacity for modern businesses.
                </h2>
              </div>

              <blockquote className="pl-4 border-l-2 border-[#B83A0A] text-lg sm:text-xl font-editorial text-[#F5EDE4]/95 leading-relaxed italic">
                "The future of business isn't just more software. It's businesses with more capacity to act."
              </blockquote>

              <div className="space-y-3 text-sm sm:text-base font-dm text-[#F5EDE4]/80 leading-relaxed">
                <p>
                  Mupezeni was built around a simple observation: businesses don't always need more software. They need more capacity to act.
                </p>
                <p>
                  The goal is to build AI workers that can take responsibility for recurring business work while keeping humans in control of the decisions that matter.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-syne font-bold text-xs sm:text-sm shadow-xl shadow-[#9B2208]/30 hover:shadow-[#9B2208]/50 transition-all cursor-pointer"
                >
                  <span>Get Your AI Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0A0705] border border-white/[0.08] hover:border-white/20 text-[#FAFAF9] text-xs font-syne font-semibold transition-all cursor-pointer"
                >
                  <span>Read Full Philosophy</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
