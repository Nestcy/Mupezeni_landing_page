import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Mail, 
  ArrowUp, 
  Globe, 
  Phone,
  MessageSquare,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenPolicy?: (type: 'terms' | 'privacy' | 'guarantee') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenPolicy,
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
              "Your business shouldn’t stop when you do."
            </p>

            <p className="text-xs sm:text-sm text-[#FAFAF9]/75 max-w-md leading-relaxed">
              AI workers for businesses ready to grow beyond the limits of human capacity. Mupezeni puts autonomous AI workers behind customer support, sales conversations, and marketing.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 pt-2 text-xs text-[#FAFAF9]/80 font-medium">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D95A1A] shrink-0" />
                <a 
                  href="mailto:hello.mupezeni@gmail.com" 
                  className="hover:text-[#D95A1A] transition-colors font-mono"
                >
                  hello.mupezeni@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D95A1A] shrink-0" />
                <a 
                  href="https://wa.me/260776091393"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:text-[#D95A1A] transition-colors font-mono"
                  title="Chat directly with Mupezeni on WhatsApp: 0776091393"
                >
                  0776091393 / +260 776 091 393 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#D95A1A] shrink-0" />
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#D95A1A] transition-colors"
                >
                  mupezeni.com
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigation (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAFAF9]/75">
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
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Workforce
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Channels (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne">
              Connect With Us
            </h4>
            <p className="text-xs text-[#FAFAF9]/70 leading-relaxed">
              Explore how autonomous AI employees handle recurring business execution.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#140C07] border border-white/10 hover:border-[#D95A1A]/50 text-xs font-dm text-[#FAFAF9]/80 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#140C07] border border-white/10 hover:border-[#D95A1A]/50 text-xs font-dm text-[#FAFAF9]/80 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/ernest-zimba-904661318"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#140C07] border border-white/10 hover:border-[#D95A1A]/50 text-xs font-dm text-[#FAFAF9]/80 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#140C07] border border-white/10 hover:border-[#D95A1A]/50 text-xs font-dm text-[#FAFAF9]/80 hover:text-white transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF9]/50">
          <div 
            onClick={handleSecretTrigger}
            className="cursor-default select-none flex items-center gap-1 font-dm"
          >
            <span>© {new Date().getFullYear()} MUPEZENI.AI — All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPolicy ? onOpenPolicy('privacy') : (onOpenPrivacy && onOpenPrivacy())}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenPolicy ? onOpenPolicy('terms') : (onOpenTerms && onOpenTerms())}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#140C07] hover:bg-[#1E1109] text-[#FAFAF9] border border-white/10 transition-colors flex items-center gap-1 cursor-pointer ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
