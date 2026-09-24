import React from 'react';
import { Store, ShoppingCart, Check, ArrowRight } from 'lucide-react';

interface ImplementationPathsSectionProps {
  onSelectPath?: (path: 'path1-build' | 'path2-upgrade') => void;
}

export const ImplementationPathsSection: React.FC<ImplementationPathsSectionProps> = ({ onSelectPath }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#070403] relative overflow-hidden border-t border-[#1F120A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#E58330] uppercase font-semibold">
            Onboarding Tracks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Two Clear Implementation Paths
          </h2>
          <p className="text-sm text-[#A8A099]">
            Whether you operate a physical boutique or already sell via Instagram & WhatsApp, we tailor your onboarding to your existing setup.
          </p>
        </div>

        {/* 2 Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Path 1: Physical Store */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0F0805] border border-[#2B180D] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-[#E58330]/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330]">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#E58330] uppercase font-semibold">Track 01</span>
                  <h3 className="text-xl font-bold text-white">Physical Store Going Digital</h3>
                </div>
              </div>

              <p className="text-sm text-[#C4BCB3] leading-relaxed">
                For retail shops in Cairo Road, Woodlands, Roma, East Park, or town centers wanting an automated digital storefront on WhatsApp & Instagram without hiring an agency.
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                  What we execute:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#E0D8D0]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                    <span>Digitize paper catalogues or price sheets into AI knowledge base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                    <span>Setup WhatsApp Business API and Instagram Direct Message automations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                    <span>Configure mobile money payment prompts (Airtel, MTN, Zamtel)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F120A]">
              <button
                onClick={() => onSelectPath && onSelectPath('path1-build')}
                className="w-full py-3 rounded-xl bg-[#1C110A] hover:bg-[#2B180D] border border-[#3A2214] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Select Track 01 (Physical to Digital)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E58330]" />
              </button>
            </div>
          </div>

          {/* Path 2: E-Commerce / Social Seller Upgrading */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0F0805] border border-[#2B180D] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-[#E58330]/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#E58330]/10 border border-[#E58330]/20 text-[#E58330]">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#E58330] uppercase font-semibold">Track 02</span>
                  <h3 className="text-xl font-bold text-white">Existing Seller Upgrading to AI</h3>
                </div>
              </div>

              <p className="text-sm text-[#C4BCB3] leading-relaxed">
                For online brands already experiencing high DM volume who are struggling to answer inquiries fast enough and missing late-night sales.
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A8A099] block font-semibold">
                  What we execute:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#E0D8D0]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                    <span>Integrate with your Shopify, WooCommerce, or inventory spreadsheet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                    <span>Deploy 24/7 AI Support Worker to eliminate abandoned DM conversations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E58330] shrink-0 mt-0.5" />
                    <span>Activate AI Marketing Worker for daily branded promotional graphics</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F120A]">
              <button
                onClick={() => onSelectPath && onSelectPath('path2-upgrade')}
                className="w-full py-3 rounded-xl bg-[#1C110A] hover:bg-[#2B180D] border border-[#3A2214] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Select Track 02 (Upgrade Existing Store)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E58330]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
