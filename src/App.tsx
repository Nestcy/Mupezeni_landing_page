import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { CinematicDemoModal } from './components/CinematicDemo/CinematicDemoModal';
import { GetAiTeamModal } from './components/GetAiTeamModal';
import { Sparkles } from 'lucide-react';

// Pages
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PricingPage } from './pages/PricingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { StorefrontPage } from './pages/StorefrontPage';
import { AiWorkersTestingHub } from './pages/AiWorkersTestingHub';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { BusinessPickerPage } from './pages/BusinessPickerPage';
import { ConnectCallbackPage } from './pages/ConnectCallbackPage';

const resolvePageFromLocation = (): { page: PageId; mode: 'login' | 'signup' } => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path === 'connect/callback' || path === 'connect-callback') return { page: 'connect-callback', mode: 'login' };
  if (path === 'reset-password') return { page: 'reset-password', mode: 'login' };
  if (path === 'business-picker') return { page: 'business-picker', mode: 'login' };
  if (path === 'dashboard') return { page: 'dashboard', mode: 'login' };
  if (path === 'onboarding') return { page: 'onboarding', mode: 'signup' };
  if (path === 'admin') return { page: 'admin', mode: 'login' };
  if (path === 'login') return { page: 'auth', mode: 'login' };
  if (path === 'signup' || path === 'register') return { page: 'auth', mode: 'signup' };
  if (path === 'ai-workers-test') return { page: 'ai-workers-test', mode: 'signup' };
  if (path === 'pricing') return { page: 'pricing', mode: 'signup' };
  if (path === 'solutions') return { page: 'solutions', mode: 'signup' };
  if (path === 'how-it-works') return { page: 'how-it-works', mode: 'signup' };
  if (path === 'industries') return { page: 'industries', mode: 'signup' };
  if (path === 'about') return { page: 'about', mode: 'signup' };
  if (path === 'contact') return { page: 'contact', mode: 'signup' };
  return { page: 'home', mode: 'signup' };
};

export const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, businesses } = useAuth();
  
  const [currentPage, setCurrentPage] = useState<PageId>(() => resolvePageFromLocation().page);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(() => resolvePageFromLocation().mode);
  const [storefrontSlug, setStorefrontSlug] = useState<string>('');
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' | 'guarantee' }>({
    isOpen: false,
    type: 'guarantee'
  });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isGetAiTeamModalOpen, setIsGetAiTeamModalOpen] = useState(false);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { page, mode } = resolvePageFromLocation();
      setCurrentPage(page);
      setAuthMode(mode);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route Guard: Sends signed-out users to login when trying to access protected routes
  // After login, GET /me: zero businesses → onboarding; one → dashboard; many → business picker
  useEffect(() => {
    if (isLoading) return;

    const protectedPages: PageId[] = ['dashboard', 'onboarding', 'admin', 'business-picker'];

    if (!isAuthenticated && protectedPages.includes(currentPage)) {
      setAuthMode('login');
      setCurrentPage('auth');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/auth') {
        window.history.replaceState(null, '', '/login');
      }
    } else if (isAuthenticated && currentPage === 'auth') {
      if (businesses.length === 0) {
        setCurrentPage('onboarding');
        window.history.replaceState(null, '', '/onboarding');
      } else if (businesses.length === 1) {
        setCurrentPage('dashboard');
        window.history.replaceState(null, '', '/dashboard');
      } else {
        setCurrentPage('business-picker');
        window.history.replaceState(null, '', '/business-picker');
      }
    }
  }, [isAuthenticated, isLoading, currentPage, businesses]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentPage('auth');
    const targetUrl = mode === 'login' ? '/login' : '/signup';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGetAiTeam = () => {
    setIsGetAiTeamModalOpen(true);
  };

  const handleOpenBookingModal = () => {
    handleNavigate('pricing');
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleViewStorefront = (slug: string) => {
    setStorefrontSlug(slug);
    setCurrentPage('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state while restoring session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050302] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B2208] to-[#E58330] flex items-center justify-center animate-pulse mb-3 shadow-xl shadow-[#9B2208]/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="text-xs font-mono text-[#E58330] tracking-wider animate-pulse">
          RESTORING SESSION...
        </div>
      </div>
    );
  }

  const isStorefront = currentPage === 'storefront';
  const isDashboard = currentPage === 'dashboard';
  const hideGlobalChrome = isStorefront || isDashboard;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenCinematicDemo={() => setIsDemoModalOpen(true)}
            onOpenPolicy={(type: 'terms' | 'privacy' | 'guarantee') => setPolicyModal({ isOpen: true, type })}
            onOpenGetAiTeam={handleOpenGetAiTeam}
          />
        );
      case 'solutions':
        return (
          <SolutionsPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenGetAiTeam={handleOpenGetAiTeam}
          />
        );
      case 'pricing':
        return (
          <PricingPage
            onNavigate={handleNavigate}
            onOpenGetAiTeam={handleOpenGetAiTeam}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenGetAiTeam={handleOpenGetAiTeam}
          />
        );
      case 'industries':
        return (
          <IndustriesPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenGetAiTeam={handleOpenGetAiTeam}
          />
        );
      case 'about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'contact':
        return (
          <ContactPage
            onNavigate={handleNavigate}
          />
        );
      case 'admin':
        return (
          <AdminPage
            onNavigate={handleNavigate}
          />
        );
      case 'auth':
        return (
          <AuthPage
            onNavigate={handleNavigate}
            defaultMode={authMode}
          />
        );
      case 'reset-password':
        return (
          <ResetPasswordPage
            onNavigate={handleNavigate}
          />
        );
      case 'business-picker':
        return (
          <BusinessPickerPage
            onNavigate={handleNavigate}
          />
        );
      case 'onboarding':
        return (
          <OnboardingPage
            onNavigate={handleNavigate}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={handleNavigate}
            onViewStorefront={handleViewStorefront}
          />
        );
      case 'storefront':
        return (
          <StorefrontPage
            slug={storefrontSlug}
            onNavigate={handleNavigate}
          />
        );
      case 'ai-workers-test':
        return (
          <AiWorkersTestingHub
            onNavigate={handleNavigate}
          />
        );
      case 'connect-callback':
        return (
          <ConnectCallbackPage
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenCinematicDemo={() => setIsDemoModalOpen(true)}
            onOpenPolicy={(type: 'terms' | 'privacy' | 'guarantee') => setPolicyModal({ isOpen: true, type })}
            onOpenGetAiTeam={handleOpenGetAiTeam}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030202] text-[#F7F5F0] flex flex-col justify-between">
      {/* Fixed Navbar (hidden on storefront & dashboard shell) */}
      {!hideGlobalChrome && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBookingModal={handleOpenBookingModal}
          onOpenGetAiTeam={handleOpenGetAiTeam}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 ${!hideGlobalChrome ? 'pt-18 sm:pt-20' : ''}`}>
        {renderPage()}
      </main>

      {/* Global Footer (hidden on storefront & dashboard shell) */}
      {!hideGlobalChrome && (
        <Footer
          onNavigate={handleNavigate}
          onOpenPolicy={(type: 'terms' | 'privacy' | 'guarantee') => setPolicyModal({ isOpen: true, type })}
        />
      )}

      {/* Policy and Guarantee Modal */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        type={policyModal.type}
        onClose={() => setPolicyModal({ ...policyModal, isOpen: false })}
      />

      {/* Interactive Cinematic Demo Modal */}
      <CinematicDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onBookStrategy={handleOpenGetAiTeam}
      />

      {/* Get AI Team Selection Modal */}
      <GetAiTeamModal
        isOpen={isGetAiTeamModalOpen}
        onClose={() => setIsGetAiTeamModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
