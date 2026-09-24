import React from 'react';
import { PageId } from '../types';
import { PROCESS_STEPS, END_TO_END_WORKFLOW } from '../data/websiteData';
import { ConsultationCtaSection } from '../components/ConsultationCtaSection';
import { Database, Sliders, Rocket, Check, ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const stepIcons = [Database, Sliders, Rocket];

  return (
    <div className="pt-24 pb-16 bg-[#030202] min-h-screen text-[#F7F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330] text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>5–7 Day Deployment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            From Catalogue to Live AI in Under 7 Days
          </h1>
          <p className="text-base text-[#A8A099]">
            We handle 100% of the technical heavy lifting—knowledge ingestion, channel connection, prompt tuning, and safety testing.
          </p>
        </div>

        {/* 3 Step Deployment Timeline */}
        <div className="space-y-8">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Database;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#0A0604] border border-[#26150C] p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start hover:border-[#E58330]/40 transition-all shadow-xl"
              >
                <div className="flex items-center md:flex-col gap-4 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#170E08] border border-[#E58330]/30 text-[#E58330] flex items-center justify-center font-black text-xl font-['Space_Grotesk']">
                    {step.stepNumber}
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1C110A] text-[#E58330] border border-[#3A2214]">
                    {step.timeline}
                  </span>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-[#C4BCB3] mt-1">{step.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#120B07] border border-[#24130A] space-y-1.5">
                      <span className="text-xs font-mono uppercase text-[#A8A099] block font-semibold">
                        Retailer Action:
                      </span>
                      <p className="text-xs text-[#E0D8D0]">{step.retailerAction}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#120B07] border border-[#24130A] space-y-1.5">
                      <span className="text-xs font-mono uppercase text-[#E58330] block font-semibold">
                        Mupezeni Execution:
                      </span>
                      <p className="text-xs text-[#E0D8D0]">{step.mupezeniExecution}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#9E958C] pt-2">
                    {step.detailedPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E58330]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* End-to-End Workflow Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E58330]">Execution Cycle</span>
            <h2 className="text-3xl font-extrabold text-white">How an Order Actually Moves</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {END_TO_END_WORKFLOW.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090503] border border-[#24130A] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E58330]">STEP {item.stepNumber}</span>
                    <span className="text-[10px] font-mono text-[#A8A099]">{item.actor}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{item.stageTitle}</h4>
                  <p className="text-xs text-[#A8A099] leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-3 border-t border-[#1C1008] text-[11px] font-mono text-emerald-400">
                  ⚡ {item.businessImpact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Callout */}
        <ConsultationCtaSection />

      </div>
    </div>
  );
};
