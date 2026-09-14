import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Mail, 
  MapPin, 
  ArrowUp, 
  Globe, 
  Sparkles, 
  Bot,
  ArrowRight,
  Phone,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretTrigger = () => {
    const next = secretClicks + 1;
    if (next >= 3) {
      setSecretClicks(0);
      onNavigate('admin');
    } else {
      setSecretClicks(next);
      setTimeout(() => setSecretClicks(0), 1200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060403] border-t border-[#9B2208]/20 pt-16 pb-12 overflow-hidden text-[#FAFAF9]">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#9B2208]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Brand Info & Mission Statement (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo 
              size="md" 
              showTagline={true} 
              onClick={() => handleNav('home')}
            />

            <p className="text-base font-semibold text-[#F5EDE4] mt-3 font-syne">
              "Grow your retail business while you sleep."
            </p>

            <p className="text-xs sm:text-sm text-[#FAFAF9]/70 max-w-sm leading-relaxed">
              <span className="font-roboto font-semibold text-white">Mupezeni</span> is an AI Business Growth Company. We deploy dedicated AI Teams for retailers—operating your digital channels around the clock while you focus on inventory, sourcing, and dispatch.
            </p>

            {/* Location & Contact Details */}
            <div className="space-y-2 pt-2 text-xs text-[#FAFAF9]/80 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                <span>Kamwala South, Lusaka, Zambia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                <a 
                  href="mailto:nestcy770@gmail.com" 
                  className="hover:text-[#D95A1A] transition-colors font-mono"
                >
                  nestcy770@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                <a 
                  href="https://wa.me/260973732409"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:text-[#D95A1A] transition-colors font-mono"
                  title="Chat directly with Ernest Zimba on WhatsApp"
                >
                  +260 973 732 409 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#D95A1A] flex-shrink-0" />
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#D95A1A] transition-colors"
                >
                  mupezeni.com
                </button>
              </div>
            </div>
          </div>

          {/* Quick Pages Navigation (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
              Explore <span className="font-roboto font-bold">Mupezeni</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAFAF9]/75">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Pricing</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#1C0F0A] text-[#D95A1A] border border-[#9B2208]/30">
                    From K2,000/mo
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About & Why We Believe
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer font-semibold text-[#D95A1A]"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          {/* Action Column (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
              Transform Your Store
            </h4>
            <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
              Every retailer receives a personalized setup and rollout plan tailored to their store — no obligation, no upfront lock-in.
            </p>

            <button
              onClick={() => handleNav('contact')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-syne font-bold text-xs text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] hover:opacity-95 shadow-md shadow-[#9B2208]/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Get Your AI Growth Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-[11px] font-syne font-semibold pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>30-Day 100% Money-Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF9]/60">
          <div className="flex items-center gap-2">
            <span 
              onClick={handleSecretTrigger}
              className="cursor-default select-none transition-colors active:text-white"
              title="© Mupezeni Technologies"
            >
              © {new Date().getFullYear()} <span className="font-roboto font-medium">Mupezeni</span> Technologies. Founder-led AI transformation for retail.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FAFAF9] transition-colors focus:outline-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#FAFAF9] transition-colors focus:outline-none cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#D95A1A] transition-colors focus:outline-none cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
