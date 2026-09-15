import React, { useState } from 'react';
import { Film, Sparkles, ArrowRight, Play, ShieldCheck, Zap, Video, Monitor } from 'lucide-react';
import { CinematicViewer } from './CinematicViewer';
import { SimulatedVideoDemo } from './SimulatedVideoDemo';

interface CinematicDemoSectionProps {
  onNavigateToContact: () => void;
}

export const CinematicDemoSection: React.FC<CinematicDemoSectionProps> = ({
  onNavigateToContact
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'video' | 'interactive'>('video');

  return (
    <section id="cinematic-demo-section" className="relative py-12 sm:py-20 bg-[#070402] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#9B2208]/15 via-[#D95A1A]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180E08] border border-[#9B2208]/40 shadow-sm">
            <Film className="w-3.5 h-3.5 text-[#D95A1A] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold text-[#F5EDE4] font-syne uppercase tracking-wider">
              Product Walkthrough & Demonstration
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight">
            See your AI Growth Team{' '}
            <span className="text-gradient-fire block sm:inline">
              in live action.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#FAFAF9]/80 leading-relaxed font-syne">
            From the moment you click "Activate" in the merchant portal to autonomous midnight chats, instant Airtel/MTN MoMo payments, and one-click dispatch manifests.
          </p>

          {/* Mode Switcher Pill Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <div className="p-1 rounded-xl bg-[#140C07] border border-white/10 flex items-center gap-1 shadow-lg">
              <button
                onClick={() => setActiveViewMode('video')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-syne font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeViewMode === 'video'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Screen Studio Walkthrough (1080p)</span>
              </button>

              <button
                onClick={() => setActiveViewMode('interactive')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-syne font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeViewMode === 'interactive'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Multi-Scene Agent Stream & Sandbox</span>
              </button>
            </div>
          </div>

        </div>

        {/* Embedded Player: Renders either Simulated Screen Studio Video or Interactive Stream */}
        <div className="relative max-w-5xl mx-auto">
          {activeViewMode === 'video' ? (
            <SimulatedVideoDemo
              onNavigateToContact={onNavigateToContact}
            />
          ) : (
            <CinematicViewer
              initialIndustryId="fashion"
              isFullscreen={false}
              onNavigateToContact={onNavigateToContact}
            />
          )}
        </div>

      </div>

    </section>
  );
};
