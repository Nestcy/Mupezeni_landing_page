import React from 'react';
import { PageId } from '../types';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { WhatWeBelieveSection } from '../components/WhatWeBelieveSection';
import { ShieldCheck, HeartHandshake, Zap, Target, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Our Origin & Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Built for African Retailers Who Never Stop Working
          </h1>
          <p className="text-base text-[#A8A099]">
            We started Mupezeni with a single, urgent mission: liberate retail business owners from repetitive digital messaging so they can focus on inventory and growth.
          </p>
        </div>

        {/* Founder Story Block */}
        <div className="rounded-3xl bg-[#090503] border border-[#2B180D] p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 text-[#D4CDC5] leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Reality of Running a Retail Business in Zambia
            </h2>
            
            <p>
              Walk into any shopping hub in Lusaka—from Cairo Road and Kamwala to East Park and Woodlands—and talk to the shop owner. You will quickly see the exhaustion in their eyes.
            </p>

            <p>
              They spend their days sourcing quality stock, bargaining with wholesalers, and managing physical walk-ins. But when 6:00 PM arrives and they head home, their work doesn’t stop. In fact, that's when their WhatsApp and Instagram DMs ignite with dozens of messages:
            </p>

            <div className="p-4 rounded-xl bg-[#140C07] border border-[#26140A] text-xs font-mono text-[#E58330] space-y-1">
              <p>"Is this dress available in Medium?"</p>
              <p>"How much to deliver to Kabwata?"</p>
              <p>"Can I pay via Airtel Money or MTN MoMo?"</p>
              <p>"Why didn't you post today's special deals on Facebook?"</p>
            </div>

            <p>
              If the owner takes an hour to have dinner with family, those customers move on to another store. If they hire social media assistants, they deal with missed shifts, grammatical errors, and a K10,000+ monthly overhead they cannot sustain.
            </p>

            <p className="text-white font-semibold text-base sm:text-lg">
              "We didn't want to build another complicated software tool that gives owners more homework. We built an autonomous AI workforce that takes over the daily digital execution for just K2,000 a month."
            </p>

            <div className="pt-4 border-t border-[#1F120A] flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-base">Ernest Zimba</div>
                <div className="text-xs font-mono text-[#E58330]">Founder, Mupezeni AI Technologies</div>
              </div>
              <span className="text-xs font-mono text-[#8C827A]">Lusaka, Zambia</span>
            </div>
          </div>
        </div>

        {/* What We Believe Section */}
        <WhatWeBelieveSection />

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-[#170E08] via-[#100905] to-[#170E08] border border-[#E58330]/40 p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Join the Next Generation of Autonomous Retail
          </h3>
          <p className="text-sm text-[#A8A099] max-w-xl mx-auto">
            Experience what it feels like to wake up to formatted orders and pre-paid mobile money slips instead of 60 unread DMs.
          </p>
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E58330] to-[#FF9F4A] text-black font-bold text-sm shadow-xl shadow-[#E58330]/20 hover:scale-105 transition-all"
          >
            <span>Get Your AI Team • K2,000/mo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
