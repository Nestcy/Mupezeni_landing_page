import React, { useState, useEffect } from 'react';
import { X, Sparkles, Film, ArrowRight, Video, Monitor } from 'lucide-react';
import { CinematicViewer } from './CinematicViewer';
import { SimulatedVideoDemo } from './SimulatedVideoDemo';

interface CinematicDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: () => void;
  initialIndustryId?: string;
  defaultMode?: 'video' | 'interactive';
}

export const CinematicDemoModal: React.FC<CinematicDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigateToContact,
  initialIndustryId = 'fashion',
  defaultMode = 'video'
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'interactive'>(defaultMode);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#040201]/95 backdrop-blur-2xl animate-fadeIn">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#9B2208]/30 via-[#D95A1A]/15 to-transparent rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[96vh] flex flex-col bg-[#0A0604] border border-[#9B2208]/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-4 sm:px-6 py-3 bg-[#130B07] border-b border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-white text-sm sm:text-base flex items-center gap-2">
                <span>Mupezeni Cinematic Retail Demo</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#20100A] text-[#D95A1A] border border-[#9B2208]/40 hidden sm:inline-block">
                  1080p 60fps Walkthrough
                </span>
              </h3>
              <p className="text-[11px] text-[#FAFAF9]/60 hidden md:block">
                Watch how our 3 AI teams operate a Zambian retail business autonomously 24/7.
              </p>
            </div>
          </div>

          {/* Mode Switcher in Modal */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-[#090503] border border-white/10 text-xs font-syne">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white font-bold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Video className="w-3 h-3" />
                <span>Walkthrough Video</span>
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white font-bold shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>Deep Stream</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#D95A1A] text-white font-syne font-bold text-xs hover:shadow-lg hover:shadow-[#9B2208]/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Get Your Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1C100A] border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
              aria-label="Close Cinema Demo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#080402]">
          {activeTab === 'video' ? (
            <SimulatedVideoDemo
              onNavigateToContact={() => {
                onClose();
                onNavigateToContact();
              }}
            />
          ) : (
            <CinematicViewer
              initialIndustryId={initialIndustryId}
              isFullscreen={true}
              onToggleFullscreen={onClose}
              onNavigateToContact={() => {
                onClose();
                onNavigateToContact();
              }}
            />
          )}
        </div>

      </div>

    </div>
  );
};
