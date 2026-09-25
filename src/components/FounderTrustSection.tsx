import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Linkedin, 
  MessageSquare, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  ExternalLink,
  Clock,
  HeartHandshake
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
    <section className="py-20 relative bg-gradient-to-b from-[#030202] via-[#090503] to-[#030202] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#E58330]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/25 text-[#E58330] text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Founder-Led & Engineered in Zambia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built by Engineers Who Understand <span className="text-gradient-fire">African Retail</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A099]">
            We are not a faceless template or an overseas plugin. Mupezeni is engineered from the ground up to solve the real, daily messaging and payment grind of local shop owners.
          </p>
        </div>

        {/* Main Trust Card */}
        <div className="rounded-3xl bg-[#0C0704] border border-[#2B180D] p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Subtle Corner Badge */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E58330]/10 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Founder Photo + Quick Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#E58330]/40 shadow-2xl shadow-[#9B2208]/30 group-hover:border-[#E58330] transition-all duration-300">
                  <img
                    src="/founder.png"
                    alt="Ernest Zimba - Founder"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-bold text-white">Ernest Zimba</h3>
                <p className="text-xs font-mono text-[#E58330] mt-0.5">
                  Founder & Chief Architect
                </p>
                <p className="text-[11px] text-[#8C827A] mt-0.5">
                  Lusaka, Zambia
                </p>
              </div>

              {/* Direct Channels */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/ernest-zimba-904661318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/15 border border-[#0A66C2]/35 text-[#58A6FF] hover:bg-[#0A66C2]/30 text-xs font-medium transition-all"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>

                <a
                  href="https://wa.me/260973732409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#4ADE80] hover:bg-[#25D366]/20 text-xs font-medium transition-all"
                  title="Direct WhatsApp with Founder"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Founder Message & Low-Risk Guarantee Commitment */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Personal Quote */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#E58330] text-xs font-mono">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Founder's Direct Commitment to Store Owners</span>
                </div>
                
                <blockquote className="text-base sm:text-lg text-[#F7F5F0] font-medium leading-relaxed border-l-2 border-[#E58330]/60 pl-4 py-1 italic">
                  "I started Mupezeni after watching hardworking retail owners in Lusaka spend until 1:00 AM replying to WhatsApp DMs, quoting prices, and verifying mobile money transfers by hand. You shouldn't have to hire a pricey social team or lose customers when you step away. We give you a fully operational AI workforce for $100/month, and we stand behind every implementation."
                </blockquote>
              </div>

              {/* 3 Low-Risk Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#140C07] border border-[#26140A] space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>30-Day Guarantee</span>
                  </div>
                  <p className="text-[11px] text-[#A8A099] leading-tight">
                    100% money-back if you don't save hours and capture more sales.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#140C07] border border-[#26140A] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#E58330] text-xs font-bold">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>4–6 Week Setup</span>
                  </div>
                  <p className="text-[11px] text-[#A8A099] leading-tight">
                    Full catalog ingestion, WhatsApp API config & hands-on store testing.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#140C07] border border-[#26140A] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#E58330] text-xs font-bold">
                    <Cpu className="w-4 h-4 shrink-0" />
                    <span>$100/mo Flat</span>
                  </div>
                  <p className="text-[11px] text-[#A8A099] leading-tight">
                    Zero hidden fees, zero surprise per-message charges, cancel anytime.
                  </p>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#9B2208]/30 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Sign Agreement & Start Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#140C07] border border-[#2B180D] hover:border-[#E58330]/40 text-[#D4CDC5] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Read Founder Story & Team Pillars</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
