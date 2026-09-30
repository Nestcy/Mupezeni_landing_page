import React from 'react';
import { 
  ArrowRight
} from 'lucide-react';

interface CapacitySolutionSectionProps {
  onExploreWorkforce?: () => void;
}

export const CapacitySolutionSection: React.FC<CapacitySolutionSectionProps> = ({
  onExploreWorkforce
}) => {
  const scrollToWorkforce = () => {
    if (onExploreWorkforce) {
      onExploreWorkforce();
    } else {
      const el = document.getElementById('autonomous-workforce');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="the-capacity-solution"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#0A0705] text-[#FAFAF9] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#9B2208]/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[420px] h-[420px] bg-[#B83A0A]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(19,12,8,0.7),#0A0705_100%)] pointer-events-none -z-10" />

      {/* Main container */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* ================= TOP SECTION: NARRATIVE & HEADLINE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Eyebrow + Headline */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.25em] text-[#B83A0A] block">
                Meet the Mupezeni Workforce
              </span>
              <div className="h-[1px] w-12 bg-[#9B2208]/50" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-syne text-[#FAFAF9] tracking-tight leading-[1.12] text-balance">
              Add capacity without adding more people to manage.
            </h2>

            <div className="text-xl sm:text-2xl font-editorial text-[#F5EDE4]/90">
              More business. <span className="text-[#B83A0A]">Less chasing.</span>
            </div>
          </div>

          {/* Right: Supporting Editorial Prose */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg font-dm text-[#F5EDE4]/85 leading-relaxed font-normal">
              Mupezeni gives growing businesses autonomous AI workers that handle recurring customer, sales, and marketing work while the people behind the business stay focused on judgment, relationships, products, and growth.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={scrollToWorkforce}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-syne font-bold text-xs sm:text-sm shadow-xl shadow-[#9B2208]/30 hover:shadow-[#9B2208]/50 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-98"
              >
                <span>See the Workforce</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
