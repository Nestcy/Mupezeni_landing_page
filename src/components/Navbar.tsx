import React, { useState } from 'react';
import { Logo } from './Logo';
import { PageId } from '../types';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Store as StoreIcon, 
  UserCheck, 
  LogIn, 
  LogOut, 
  LayoutDashboard,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBookingModal?: () => void;
  onOpenGetAiTeam?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal,
  onOpenGetAiTeam,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, businesses, selectedBusiness, role, logout } = useAuth();

  const navLinks: { label: string; id: PageId }[] = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'AI Workforce', id: 'solutions' },
    { label: 'Test AI Workers', id: 'ai-workers-test' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStorePortalClick = () => {
    if (user) {
      if (selectedBusiness) {
        onNavigate('dashboard');
      } else {
        onNavigate('onboarding');
      }
    } else {
      onNavigate('auth');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060403]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Zone 1: Single Clean Wordmark / Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition-opacity hover:opacity-90 flex items-center"
        >
          <Logo size="md" showTagline={false} />
        </div>

        {/* Zone 2: 4-6 Pure Text Navigation Links (Zero-Pill Discipline) */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map(link => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#FAFAF9] font-semibold'
                    : 'text-[#A8A099] hover:text-[#FAFAF9]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D95A1A] to-[#E58330] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions - Retailer Portal, Login/Logout & Primary CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {user ? (
            <>
              {/* Active Business & Switcher */}
              {selectedBusiness ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                      currentPage === 'dashboard'
                        ? 'bg-[#1C120B] text-[#E58330] border-[#E58330]/60'
                        : 'bg-[#140C07] text-[#FAFAF9] hover:bg-[#1E120A] border-white/10'
                    }`}
                    title="Open Merchant Dashboard"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#E58330]" />
                    <span className="max-w-[130px] truncate">{selectedBusiness.name}</span>
                    {role && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-[#E58330] uppercase">
                        {role}
                      </span>
                    )}
                  </button>

                  {businesses.length > 1 && (
                    <button
                      onClick={() => handleNavClick('business-picker')}
                      className="px-2 py-2 rounded-xl text-xs font-mono text-[#E58330] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors"
                      title="Switch Business"
                    >
                      Switch ({businesses.length})
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick('onboarding')}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#1C120B] text-[#E58330] border border-[#E58330]/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <StoreIcon className="w-3.5 h-3.5" />
                  <span>Start Business</span>
                </button>
              )}

              {/* Explicit Log Out Button */}
              <button
                onClick={async () => {
                  await logout();
                  handleNavClick('home');
                }}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#D4CDC5] hover:text-rose-300 bg-white/5 hover:bg-rose-950/30 border border-white/10 hover:border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Log out of your account"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Explicit Log In Button */}
              <button
                onClick={() => {
                  if (onOpenAuth) {
                    onOpenAuth('login');
                  } else {
                    handleNavClick('auth');
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                  currentPage === 'auth'
                    ? 'bg-white/10 text-white border-white/20'
                    : 'bg-white/5 text-[#E5DDD5] hover:text-white hover:bg-white/10 border-white/10'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#E58330]" />
                <span>Log In</span>
              </button>

              {/* Create Store / Sign Up Button */}
              <button
                onClick={() => {
                  if (onOpenAuth) {
                    onOpenAuth('signup');
                  } else {
                    handleNavClick('auth');
                  }
                }}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#FAFAF9] bg-[#1C120B] hover:bg-[#2A1A0F] border border-[#E58330]/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <StoreIcon className="w-3.5 h-3.5 text-[#E58330]" />
                <span>Sign Up</span>
              </button>
            </>
          )}

          {/* Primary Action */}
          <button
            onClick={() => {
              if (onOpenGetAiTeam) {
                onOpenGetAiTeam();
              } else if (onOpenBookingModal) {
                onOpenBookingModal();
              } else {
                handleNavClick('pricing');
              }
            }}
            className="group relative inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#9B2208]/25 hover:shadow-xl hover:shadow-[#9B2208]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
          >
            <span>Get Your AI Team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#140C07] text-[#D4CDC5] hover:text-white border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Minimal Luxury Aesthetics */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0604] border-b border-white/10 px-5 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1 pb-2">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#1C120B] text-[#E58330] font-semibold border-l-2 border-[#E58330]'
                      : 'text-[#D4CDC5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2 rounded-xl bg-[#140C07] border border-white/10 text-xs font-dm text-[#F5EDE4]/70 flex items-center justify-between">
                  <span>Signed in as:</span>
                  <strong className="text-white truncate max-w-[170px]">{user.fullName || user.email}</strong>
                </div>

                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1C120B] border border-[#E58330]/30 text-[#FAFAF9] font-medium text-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#E58330]" />
                  <span>Go to Merchant Dashboard</span>
                </button>

                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                    handleNavClick('home');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-300 font-medium text-xs hover:bg-rose-950/40"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('login');
                    else handleNavClick('auth');
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs hover:bg-white/10"
                >
                  <LogIn className="w-4 h-4 text-[#E58330]" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('signup');
                    else handleNavClick('auth');
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#1C120B] border border-[#E58330]/40 text-white font-medium text-xs hover:bg-[#25150C]"
                >
                  <StoreIcon className="w-4 h-4 text-[#E58330]" />
                  <span>Create Store</span>
                </button>
              </div>
            )}

            {/* Mobile Primary Action */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenGetAiTeam) {
                  onOpenGetAiTeam();
                } else if (onOpenBookingModal) {
                  onOpenBookingModal();
                } else {
                  handleNavClick('pricing');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#9B2208] via-[#B83010] to-[#CD481B] text-white font-bold text-sm shadow-md shadow-[#9B2208]/35"
            >
              <span>Deploy AI Team</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
