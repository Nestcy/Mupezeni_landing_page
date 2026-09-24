import React from 'react';
import { X, Play, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface CinematicDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookStrategy?: () => void;
}

export const CinematicDemoModal: React.FC<CinematicDemoModalProps> = ({ isOpen, onClose, onBookStrategy }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0D0805] border border-[#2D1B0F] p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F140D] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E58330]/10 text-[#E58330]">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Interactive AI Retail Walkthrough</h3>
              <p className="text-xs text-[#A8A099]">See how the Support & Marketing workers collaborate in real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C827A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Interactive Simulation Container */}
        <div className="rounded-xl overflow-hidden bg-black border border-[#24130A] aspect-video relative flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Simulated Retail Cycle</span>
            </div>
            <span className="text-xs font-mono text-[#A8A099]">Mupezeni Retail Engine v2.4</span>
          </div>

          <div className="space-y-4 max-w-lg mx-auto text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-[#E58330]/10 border border-[#E58330]/30 text-[#E58330] flex items-center justify-center mx-auto">
              <Bot className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Full Retail Automation Cycle</h4>
            <p className="text-xs text-[#A8A099] leading-relaxed">
              Customer inquires on WhatsApp &rarr; AI Support Worker checks stock & sends payment details &rarr; Order confirmed &rarr; AI Marketing Worker analyzes purchase trend & prepares tomorrow's promotional graphic.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#A8A099] border-t border-[#1F120A] pt-4">
            <span>Duration: Continuous Real-Time Operation</span>
            <span className="text-emerald-400 font-mono">Cost: $100 / month flat</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#1F140D]">
          <div className="text-xs text-[#A8A099]">
            Want to see how this works with your exact product inventory?
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#140B06] hover:bg-[#201109] text-[#A8A099] hover:text-white text-xs font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onBookStrategy) onBookStrategy();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white text-xs font-bold shadow-md shadow-[#9B2208]/35 hover:scale-105 transition-all cursor-pointer"
            >
              Book 30-Min Strategy Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
