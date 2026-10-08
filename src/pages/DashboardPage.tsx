import React, { useEffect } from 'react';
import { PageId } from '../types';
import { useAuth } from '../context/AuthContext';
import { SignedShell } from '../components/shell/SignedShell';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onViewStorefront?: (slug: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  onNavigate,
  onViewStorefront 
}) => {
  const { user, businesses, selectedBusiness, isLoading } = useAuth();

  // If user is not logged in or has 0 businesses, route guard
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        onNavigate('auth');
      } else if (businesses.length === 0) {
        onNavigate('onboarding');
      }
    }
  }, [user, businesses, isLoading, onNavigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#040202] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9B2208] to-[#E58330] animate-pulse mx-auto shadow-lg" />
          <p className="text-xs font-mono text-[#E58330] tracking-wider">SYNCING WORKSPACE...</p>
        </div>
      </div>
    );
  }

  return (
    <SignedShell 
      onNavigate={onNavigate} 
      onViewStorefront={onViewStorefront} 
    />
  );
};
