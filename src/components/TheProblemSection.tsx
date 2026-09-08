import React from 'react';
import { 
  Users, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Bot,
  Zap,
  TrendingUp,
  Clock,
  Briefcase
} from 'lucide-react';
import { PageId } from '../types';

interface TheProblemSectionProps {
  onNavigate: (page: PageId) => void;
}

export const TheProblemSection: React.FC<TheProblemSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 relative bg-[#0D0805] border-t border-b border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#9B2208]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E08] border border-[#9B2208]/40 text-[#D95A1A] text-xs font-bold font-syne uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-[#D95A1A]" />
            <span>The Traditional Growth Trap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-syne text-[#FAFAF9] tracking-tight leading-tight">
            Growing your business shouldn't mean{' '}
            <span className="text-gradient-fire block sm:inline">
              hiring endlessly.
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-[#FAFAF9]/80 font-normal leading-relaxed">
            As your retail business gains momentum, the digital workload compounds exponentially. But responding with endless human hiring creates an expensive bottleneck that drains your profit margins.
          </p>
        </div>

        {/* The Compounding Bottleneck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="p-6 sm:p-7 rounded-3xl bg-[#140D08] border border-[#9B2208]/30 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#20100A] text-[#D95A1A] flex items-center justify-center font-black font-syne text-sm">
              01
            </div>
            <h3 className="text-lg font-black font-syne text-white">More Enquiries Arrive</h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
              Customers message on WhatsApp, Instagram, Facebook, and your store 24/7. Delayed replies mean lost sales to faster competitors.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-[#140D08] border border-[#9B2208]/30 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#20100A] text-[#D95A1A] flex items-center justify-center font-black font-syne text-sm">
              02
            </div>
            <h3 className="text-lg font-black font-syne text-white">Demand for Marketing</h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
              You need daily social media posts, product photography, video reels, and promotional broadcasts to keep customers buying.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-[#140D08] border border-[#9B2208]/30 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#20100A] text-[#D95A1A] flex items-center justify-center font-black font-syne text-sm">
              03
            </div>
            <h3 className="text-lg font-black font-syne text-white">Complex Operations</h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
              Tracking orders across multiple channels, managing low stock, and writing dispatch notes eats away the owner's strategic focus.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-[#140D08] border border-[#9B2208]/30 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#20100A] text-[#D95A1A] flex items-center justify-center font-black font-syne text-sm">
              04
            </div>
            <h3 className="text-lg font-black font-syne text-white">The Hiring Spiral</h3>
            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 leading-relaxed">
              Payroll balloons, onboarding takes weeks, staff churn increases, and management becomes a full-time headache.
            </p>
          </div>

        </div>

        {/* The Solution Banner: Mupezeni's New Path */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1C0E08] via-[#140C07] to-[#0A0705] border-2 border-[#9B2208] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B2208]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24110A] text-[#D95A1A] text-xs font-bold font-syne uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Mupezeni Alternative</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-syne text-white tracking-tight leading-tight">
                Mupezeni lets businesses scale with AI Teams before continuously expanding payroll.
              </h3>
              <p className="text-xs sm:text-base text-[#FAFAF9]/80 leading-relaxed max-w-2xl">
                Instead of hiring three separate employees for support, content creation, and store admin, you deploy intelligent Digital AI Teams that operate your repetitive digital workload 24/7—at a fraction of the cost and with zero management strain.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-syne font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-xl hover:shadow-[#9B2208]/30 transition-all cursor-pointer"
              >
                <span>Book My AI Growth Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('how-it-works')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-syne font-bold text-xs sm:text-sm text-white/90 bg-[#160D09] hover:bg-[#20110A] border border-white/10 transition-all cursor-pointer"
              >
                <span>See How AI Teams Scale</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
