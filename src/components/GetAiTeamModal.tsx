import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  Store as StoreIcon, 
  Sparkles, 
  Database, 
  Plug, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';
import { useAuth } from '../context/AuthContext';

interface GetAiTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const GetAiTeamModal: React.FC<GetAiTeamModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { user, business, store } = useAuth();

  if (!isOpen) return null;

  const handleSelectTrack = (track: 'existing_store' | 'no_store') => {
    onClose();
    try {
      sessionStorage.setItem('mupezeni_selected_track', track);
    } catch (e) {
      console.warn('Could not save selected track', e);
    }

    if (track === 'existing_store') {
      // Track 1: Has established store/catalog -> uses connectors after onboarding
      if (!user) {
        onNavigate('auth');
      } else if (!business) {
        onNavigate('onboarding');
      } else {
        // Direct to onboarding with existing store connector flow
        onNavigate('onboarding');
      }
    } else {
      // Track 2: Doesn't have store or catalog -> Mupezeni Store Builder
      if (!user) {
        onNavigate('auth');
      } else if (!business) {
        onNavigate('onboarding');
      } else {
        onNavigate('onboarding');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl bg-[#0D0805] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 space-y-8 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/15 border border-[#E58330]/30 text-[#E58330] text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>DEPLOY YOUR AUTONOMOUS AI WORKFORCE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-syne text-[#FAFAF9] leading-tight">
            How does your business sell online today?
          </h2>

          <p className="text-xs sm:text-sm text-[#F5EDE4]/70 font-dm leading-relaxed">
            Mupezeni connects autonomous AI workers to your digital commerce infrastructure. Choose your current setup to launch your onboarding path:
          </p>
        </div>

        {/* 2 Clear Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* ================= OPTION 1: ESTABLISHED STORE / CATALOG (USES CONNECTORS) ================= */}
          <div 
            onClick={() => handleSelectTrack('existing_store')}
            className="group relative rounded-2xl sm:rounded-3xl bg-[#140C07] border-2 border-white/10 hover:border-[#E58330]/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#E58330]/10 cursor-pointer space-y-6"
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E58330] font-bold px-2.5 py-0.5 rounded-full bg-[#E58330]/10 border border-[#E58330]/30">
                  TRACK 01: COMMERCE CONNECTORS
                </span>
                <Plug className="w-5 h-5 text-[#E58330] opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-syne text-white group-hover:text-[#FAFAF9]">
                  I have an established online store or catalog
                </h3>
                <p className="text-xs text-[#F5EDE4]/75 font-dm leading-relaxed">
                  You already sell on <strong>Shopify, WooCommerce, a custom website</strong>, or have an established <strong>WhatsApp / Instagram product catalog</strong>.
                </p>
              </div>

              {/* What happens */}
              <div className="p-3.5 rounded-xl bg-[#090503] border border-white/5 space-y-2 text-xs">
                <div className="font-syne font-bold text-white/90 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E58330]" />
                  <span>How Mupezeni executes:</span>
                </div>
                <p className="text-[#F5EDE4]/70 leading-relaxed text-[11.5px]">
                  After onboarding, we plug our <strong>Customer Support & Marketing AI workers</strong> directly into your live catalog, inventory, and order systems using our commerce connectors—without migrating away from your current store.
                </p>
              </div>

              {/* Connector Badges */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-[#F5EDE4]/50 uppercase tracking-wider block">
                  Supported Connectors:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Shopify Connector', 'WooCommerce', 'Custom API Bridge', 'WhatsApp DM Catalog'].map((b) => (
                    <span 
                      key={b} 
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10.5px] font-mono text-white/80"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-[#1C120B] group-hover:bg-[#2A1B10] border border-[#E58330]/40 group-hover:border-[#E58330] text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Connect Existing Store via Connectors</span>
                <ArrowRight className="w-4 h-4 text-[#E58330] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ================= OPTION 2: NO STORE OR CATALOG (BUILD STORE FROM SCRATCH) ================= */}
          <div 
            onClick={() => handleSelectTrack('no_store')}
            className="group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1C1008] to-[#120A05] border-2 border-[#B83A0A] hover:border-[#CD481B] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#9B2208]/25 cursor-pointer space-y-6"
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E58330] font-bold px-2.5 py-0.5 rounded-full bg-[#B83A0A]/20 border border-[#B83A0A]/50">
                  TRACK 02: MUPEZENI STORE BUILDER
                </span>
                <Sparkles className="w-5 h-5 text-[#E58330]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-syne text-white">
                  I don't have an online store or catalog
                </h3>
                <p className="text-xs text-[#F5EDE4]/80 font-dm leading-relaxed">
                  For <strong>physical shops, boutique owners, or emerging retail brands</strong> without an active online store or digital product database.
                </p>
              </div>

              {/* What happens */}
              <div className="p-3.5 rounded-xl bg-[#0A0604] border border-[#B83A0A]/30 space-y-2 text-xs">
                <div className="font-syne font-bold text-[#E58330] flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>How Mupezeni executes:</span>
                </div>
                <p className="text-[#F5EDE4]/75 leading-relaxed text-[11.5px]">
                  Mupezeni builds your digital commerce infrastructure from scratch. We guide you through brand setup, product catalog digitization, variant inventory, Mobile Money/Card checkout, and launch your live public storefront.
                </p>
              </div>

              {/* Included Badges */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-[#F5EDE4]/50 uppercase tracking-wider block">
                  What You Get Built-In:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Brand Identity', 'Product Catalog', 'Live Storefront', 'Mobile Money Pay', 'AI Team Attached'].map((b) => (
                    <span 
                      key={b} 
                      className="px-2 py-0.5 rounded-md bg-[#221008] border border-[#B83A0A]/40 text-[10.5px] font-mono text-[#FAFAF9]"
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#9B2208]/30 cursor-pointer"
              >
                <span>Start Store Builder (I Don't Have a Store)</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Guarantee & Helper */}
        <div className="p-3.5 rounded-2xl bg-[#090503] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F5EDE4]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Zero lock-in. Backed by our 30-day money-back guarantee.</span>
          </div>
          <div className="text-[11px] font-mono text-[#E58330]">
            Both tracks include dedicated AI workers for Support, Sales & Marketing
          </div>
        </div>

      </motion.div>
    </div>
  );
};
