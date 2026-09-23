import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  ArrowRight,
  ChevronRight,
  Sparkles,
  Bot
} from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions', badge: '2 Tracks' },
    { id: 'pricing', label: 'Pricing', badge: 'K2,000' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'industries', label: 'Industries', badge: '7 Sectors' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (target: PageId) => {
    onNavigate(target);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0705]/95 backdrop-blur-xl border-b border-[#9B2208]/25 shadow-2xl py-2.5'
            : 'bg-[#0A0705]/80 backdrop-blur-md border-b border-white/5 py-3'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo - Compact and proportional for navbar */}
            <div className="flex items-center flex-shrink-0">
              <Logo 
                size="sm" 
                emblemClassName="w-9 h-7 sm:w-10 sm:h-8"
                onClick={() => handleNavClick('home')} 
              />
            </div>

            {/* Desktop Navigation Links - Compact, sleek, no overflowing badges */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-xl bg-[#130C08]/90 border border-white/5 backdrop-blur-lg">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold transition-all duration-150 cursor-pointer font-syne whitespace-nowrap ${
                      isActive
                        ? 'text-white bg-[#20110A] border border-[#9B2208]/50 shadow-sm shadow-[#9B2208]/20'
                        : 'text-[#FAFAF9]/75 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Primary Action Button */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <button
                id="nav-btn-build-workforce"
                onClick={() => handleNavClick('contact')}
                className="group relative inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] hover:shadow-lg hover:shadow-[#9B2208]/30 transition-all duration-200 active:scale-95 cursor-pointer font-syne whitespace-nowrap"
              >
                <span className="hidden xl:inline">Get Your AI Team</span>
                <span className="xl:hidden">Get Team</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile / Tablet Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="nav-btn-mobile-cta"
                onClick={() => handleNavClick('contact')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#9B2208] to-[#D95A1A] font-syne shadow-md shadow-[#9B2208]/30 whitespace-nowrap cursor-pointer"
              >
                Get Team
              </button>
              <button
                id="nav-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#130C08] border border-white/10 text-[#FAFAF9] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0705]/98 backdrop-blur-2xl lg:hidden pt-24 px-6 pb-8 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D95A1A] font-syne mb-2">
              Menu Navigation
            </div>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3.5 px-4 rounded-xl text-base font-bold font-syne flex items-center justify-between border transition-all ${
                    isActive
                      ? 'bg-[#20110A] border-[#9B2208] text-white shadow-md'
                      : 'bg-[#130C08]/80 border-white/5 text-[#FAFAF9]/85 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#9B2208]/40 text-[#D95A1A] border border-[#9B2208]/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#D95A1A]' : 'text-white/40'}`} />
                </button>
              );
            })}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-[#FAFAF9]/70 mb-1 font-syne">
              <Sparkles className="w-3.5 h-3.5 text-[#D95A1A]" />
              <span>Scale your retail business 24/7</span>
            </div>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[#9B2208] via-[#B83A0A] to-[#D95A1A] font-syne shadow-lg shadow-[#9B2208]/40"
            >
              <span>Get Your AI Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
