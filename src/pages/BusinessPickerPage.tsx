import React from 'react';
import { motion } from 'motion/react';
import { Store, ArrowRight, ShieldCheck, Plus, Sparkles, Building2, UserCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';

interface BusinessPickerPageProps {
  onNavigate: (page: PageId) => void;
}

export const BusinessPickerPage: React.FC<BusinessPickerPageProps> = ({ onNavigate }) => {
  const { businesses, user, selectBusiness, logout } = useAuth();

  const handleSelectBusiness = (businessId: string) => {
    selectBusiness(businessId);
    onNavigate('dashboard');
  };

  const getRoleBadge = (role: 'owner' | 'admin' | 'member') => {
    switch (role) {
      case 'owner':
        return (
          <span className="px-2 py-0.5 rounded-full bg-[#E58330]/20 text-[#E58330] border border-[#E58330]/30 text-[10px] font-mono uppercase font-bold">
            Store Owner
          </span>
        );
      case 'admin':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase font-bold">
            Administrator
          </span>
        );
      case 'member':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#F5EDE4]/70 border border-white/10 text-[10px] font-mono uppercase font-bold">
            Team Member
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-[#050302]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#9B2208]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#B83A0A]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-lg space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#130C08] border border-white/10 text-xs font-mono text-[#E58330]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Multi-Store Workspace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-syne text-[#FAFAF9] tracking-tight">
            Select Your Business
          </h1>

          <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70">
            Welcome back, <strong className="text-white">{user?.full_name || user?.email}</strong>. Select the retail business you want to manage today.
          </p>
        </div>

        {/* Business Cards Container */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-[#130C08] border border-white/10 p-5 sm:p-7 shadow-2xl space-y-4"
        >
          <div className="text-xs font-mono text-[#F5EDE4]/50 uppercase tracking-wider px-1">
            Available Stores & Businesses ({businesses.length})
          </div>

          <div className="space-y-3">
            {businesses.map((biz) => (
              <button
                key={biz.id}
                type="button"
                onClick={() => handleSelectBusiness(biz.id)}
                className="w-full p-4 rounded-2xl bg-[#090503] hover:bg-[#160E09] border border-white/10 hover:border-[#E58330]/40 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9B2208]/30 to-[#E58330]/20 border border-[#E58330]/30 flex items-center justify-center shrink-0 text-[#E58330] group-hover:scale-105 transition-transform">
                    <Store className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-syne font-bold text-sm text-white group-hover:text-[#E58330] transition-colors truncate">
                        {biz.name}
                      </h3>
                      {getRoleBadge(biz.role)}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-dm text-[#F5EDE4]/60 pt-0.5">
                      <span>Currency: <strong className="text-white font-mono">{biz.currency || 'ZMW'}</strong></span>
                      {biz.location && <span>• {biz.location}</span>}
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#E58330] group-hover:bg-[#E58330]/10 shrink-0 ml-2 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Create New Business Action */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => onNavigate('onboarding')}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-syne font-bold text-[#F5EDE4] hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E58330]" />
              <span>Create / Onboard Another Business</span>
            </button>
          </div>
        </motion.div>

        {/* User profile / sign out */}
        <div className="flex items-center justify-between px-2 text-xs text-[#F5EDE4]/60">
          <div className="flex items-center gap-1.5 font-dm">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Signed in as <strong className="text-white">{user?.email}</strong></span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-red-400/80 hover:text-red-300 hover:underline font-mono cursor-pointer"
          >
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};
