/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { FloatingCta } from './components/FloatingCta';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PageId } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync URL hash with page
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash === 'admin' || rawHash === 'leads' || rawHash === 'portal') {
        setCurrentPage('admin');
        return;
      }
      if (['home', 'how-it-works', 'industries', 'about', 'contact', 'admin'].includes(rawHash)) {
        setCurrentPage(rawHash as PageId);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global Keyboard Command Listener: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#FAFAF9] font-body selection:bg-[#9B2208] selection:text-white relative flex flex-col justify-between">
      {/* Top Sticky Navigation (Rendered on public pages) */}
      {!isAdminView && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
        />
      )}

      {/* Main Multi-Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage onNavigate={navigateTo} />
        )}
        {currentPage === 'how-it-works' && (
          <HowItWorksPage onNavigate={navigateTo} />
        )}
        {currentPage === 'industries' && (
          <IndustriesPage onNavigate={navigateTo} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}
        {currentPage === 'admin' && (
          <AdminPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer (Rendered on public pages) */}
      {!isAdminView && (
        <Footer
          onNavigate={navigateTo}
          onOpenPrivacy={() => setPolicyType('privacy')}
          onOpenTerms={() => setPolicyType('terms')}
        />
      )}

      {/* Persistent Floating Consultation CTA (Rendered on public pages) */}
      {!isAdminView && (
        <FloatingCta
          currentPage={currentPage}
          onNavigateToContact={() => navigateTo('contact')}
        />
      )}

      {/* Privacy Policy & Terms Modal */}
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
}
