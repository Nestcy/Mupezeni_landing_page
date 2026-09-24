import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingCta } from './components/FloatingCta';
import { PolicyModal } from './components/PolicyModal';
import { CinematicDemoModal } from './components/CinematicDemo/CinematicDemoModal';

// Pages
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PricingPage } from './pages/PricingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' | 'guarantee' }>({
    isOpen: false,
    type: 'guarantee'
  });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = () => {
    handleNavigate('pricing');
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenCinematicDemo={() => setIsDemoModalOpen(true)}
            onOpenPolicy={(type) => setPolicyModal({ isOpen: true, type })}
          />
        );
      case 'solutions':
        return (
          <SolutionsPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'pricing':
        return (
          <PricingPage
            onNavigate={handleNavigate}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'industries':
        return (
          <IndustriesPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
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
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenCinematicDemo={() => setIsDemoModalOpen(true)}
            onOpenPolicy={(type) => setPolicyModal({ isOpen: true, type })}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030202] text-[#F7F5F0] flex flex-col justify-between">
      {/* Fixed Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Main Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(type) => setPolicyModal({ isOpen: true, type })}
      />

      {/* Floating Call to Action */}
      {currentPage !== 'pricing' && currentPage !== 'admin' && (
        <FloatingCta
          onNavigate={handleNavigate}
          onOpenBookingModal={handleOpenBookingModal}
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
        onBookStrategy={handleOpenBookingModal}
      />
    </div>
  );
};

export default App;
