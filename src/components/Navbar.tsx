import React, { useState } from 'react';
import { Logo } from './Logo';
import { PageId } from '../types';
import { Menu, X, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; id: PageId; badge?: string }[] = [
    { label: 'Overview', id: 'home' },
    { label: 'AI Workers', id: 'solutions', badge: '2 Workers' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Industries', id: 'industries' },
    { label: 'Pricing', id: 'pricing', badge: 'K2,000/mo' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030202]/85 backdrop-blur-md border-b border-[#261810]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <Logo size="md" showTagline={true} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map(link => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-[#1A1009] border border-[#E58330]/30 shadow-sm'
                    : 'text-[#B8B2AA] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-[#E58330] text-black font-semibold'
                      : 'bg-[#1C120B] text-[#E58330] border border-[#E58330]/20'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              if (onOpenBookingModal) {
                onOpenBookingModal();
              } else {
                handleNavClick('pricing');
              }
            }}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E58330] to-[#FF9F4A] text-[#0A0604] font-semibold text-sm shadow-md shadow-[#E58330]/20 hover:shadow-lg hover:shadow-[#E58330]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Your AI Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-[#140C07] text-[#D4CDC5] hover:text-white border border-[#2D1B0F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0604] border-b border-[#2D1B0F] px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="grid grid-cols-1 gap-1 pb-3">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'bg-[#1C120B] text-[#E58330] border border-[#E58330]/30 font-semibold'
                      : 'text-[#D4CDC5] hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E58330]/10 text-[#E58330] border border-[#E58330]/20">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#261810]/80">
            <button
              onClick={() => {
                if (onOpenBookingModal) {
                  onOpenBookingModal();
                } else {
                  handleNavClick('pricing');
                }
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E58330] to-[#FF9F4A] text-[#0A0604] font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#0A0604]" />
              <span>Get Your AI Team • K2,000/mo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
