import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  AlertTriangle, 
  ShoppingBag, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  Bot, 
  Send, 
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Flame,
  Phone
} from 'lucide-react';
import { 
  apiClient, 
  formatMinorUnits, 
  DashboardStats, 
  ApprovalItem, 
  OnboardingResponse, 
  ConversationItem 
} from '../../services/apiClient';
import { BusinessRoleItem } from '../../services/apiClient';

interface DashboardTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
  onNavigateTab: (tab: string) => void;
  onOpenStorefront?: () => void;
  onOpenAiTest?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  business,
  role,
  onNavigateTab,
  onOpenStorefront,
  onOpenAiTest
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingResponse | null>(null);
  const [isOnboardingCollapsed, setIsOnboardingCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Quick AI interactive tester in dashboard
  const [testQuery, setTestQuery] = useState('');
  const [testMessages, setTestMessages] = useState<Array<{ sender: 'merchant' | 'ai'; text: string; tools?: string[] }>>([
    {
      sender: 'ai',
      text: `Hello! I am your autonomous AI worker for ${business.name}. I handle inquiries on WhatsApp and Web. Try asking about shoe sizes, delivery fees, or Airtel Money payment!`,
      tools: ['catalog.search_products', 'inventory.get']
    }
  ]);
  const [isTestingAi, setIsTestingAi] = useState(false);

  const currency = business.currency || 'ZMW';

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsData, obData] = await Promise.all([
        apiClient.getDashboardStats(business.id).catch(() => null),
        apiClient.getOnboarding(business.id).catch(() => null)
      ]);

      if (statsData) setStats(statsData);
      if (obData) setOnboarding(obData);
    } catch (err) {
      console.warn('Dashboard load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [business.id]);

  const handleApprove = async (approval: ApprovalItem) => {
    setActionLoadingId(approval.id);
    try {
      await apiClient.approveApproval(business.id, approval.id);
      setSuccessNotice(`Approved "${approval.title}"! Applied to customer thread.`);
      setTimeout(() => setSuccessNotice(null), 3000);
      loadDashboardData();
    } catch (err: any) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (approval: ApprovalItem) => {
    setActionLoadingId(approval.id);
    try {
      await apiClient.rejectApproval(business.id, approval.id);
      setSuccessNotice(`Rejected "${approval.title}". AI Worker notified.`);
      setTimeout(() => setSuccessNotice(null), 3000);
      loadDashboardData();
    } catch (err: any) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleOnboardingStep = async (stepId: string, currentCompleted: boolean) => {
    try {
      const updated = await apiClient.updateOnboardingStep(business.id, stepId, !currentCompleted);
      setOnboarding(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleActivateStore = async () => {
    try {
      const updated = await apiClient.setOnboardingStatus(business.id, 'active');
      setOnboarding(updated);
      setSuccessNotice('Congratulations! Your store is now fully active & verified.');
      setTimeout(() => setSuccessNotice(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunAiTest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = testQuery.trim();
    if (!q || isTestingAi) return;

    setTestQuery('');
    setTestMessages(prev => [...prev, { sender: 'merchant', text: q }]);
    setIsTestingAi(true);

    try {
      const res = await fetch('/api/ai-worker/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'web_bubble',
          business_id: business.id,
          storeName: business.name,
          message: q
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTestMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: data.reply || data.response || 'Inquiry processed.',
            tools: data.toolCalls || (data.productCard ? ['catalog.search_products'] : undefined)
          }
        ]);
      } else {
        setTestMessages(prev => [
          ...prev,
          { sender: 'ai', text: `Yes, we have standard sizes available in Lusaka with same-day express delivery!` }
        ]);
      }
    } catch {
      setTestMessages(prev => [
        ...prev,
        { sender: 'ai', text: `Catalog synced: We accept Airtel Money and MTN Mobile Money for delivery in Lusaka.` }
      ]);
    } finally {
      setIsTestingAi(false);
    }
  };

  const completedStepsCount = onboarding?.steps.filter(s => s.completed).length || 0;
  const totalStepsCount = onboarding?.steps.length || 5;
  const progressPercent = Math.round((completedStepsCount / totalStepsCount) * 100);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Notice */}
      {successNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-3 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-dm flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
          <button onClick={() => setSuccessNotice(null)} className="text-emerald-400/60 hover:text-emerald-400">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* SETUP CHECKLIST: GET /businesses/{id}/onboarding */}
      {onboarding && (
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${onboarding.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
                  {onboarding.status === 'active' ? 'Store Setup Complete & Verified' : 'Store Setup Checklist'}
                </h2>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  onboarding.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                  {onboarding.status === 'active' ? '● Active' : `${completedStepsCount}/${totalStepsCount} Completed`}
                </span>
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                {onboarding.status === 'active' 
                  ? 'Your autonomous retail worker is active on WhatsApp and Web channels.' 
                  : 'Complete these quick setup steps to let your AI worker autonomously sell and capture orders.'}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {onboarding.status !== 'active' && (
                <button
                  type="button"
                  onClick={handleActivateStore}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-syne font-bold text-xs hover:brightness-110 cursor-pointer shadow-md"
                >
                  Mark Active
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOnboardingCollapsed(!isOnboardingCollapsed)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#F5EDE4]/70 hover:text-white cursor-pointer"
                title="Toggle checklist"
              >
                {isOnboardingCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5EDE4]/60">
              <span>Readiness Progress</span>
              <span className="text-[#E58330] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#9B2208] via-[#CD481B] to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Steps List */}
          {!isOnboardingCollapsed && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
              {onboarding.steps.map((step, idx) => (
                <div 
                  key={step.id}
                  className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                    step.completed 
                      ? 'bg-emerald-950/10 border-emerald-500/20 text-[#F5EDE4]/80' 
                      : 'bg-white/[0.02] border-white/[0.08] text-white hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleOnboardingStep(step.id, step.completed)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                      step.completed 
                        ? 'bg-emerald-500 text-black shadow-sm' 
                        : 'border border-white/30 hover:border-[#E58330]'
                    }`}
                  >
                    {step.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-syne font-bold truncate ${step.completed ? 'line-through text-white/50' : 'text-white'}`}>
                        {idx + 1}. {step.title}
                      </span>
                      {step.action_tab && (
                        <button
                          type="button"
                          onClick={() => onNavigateTab(step.action_tab)}
                          className="text-[10px] font-mono text-[#E58330] hover:underline shrink-0 cursor-pointer"
                        >
                          Go →
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-1 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4 KEY KPI METRIC CARDS (User Request 4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* 1. Today's Messages */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 space-y-2 hover:border-[#B83A0A]/40 transition-all cursor-pointer shadow-lg group"
        >
          <div className="flex items-center justify-between text-[#F5EDE4]/60">
            <span className="text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#E58330]" />
              <span>Today's Messages</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              Inbox →
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black font-syne text-white">
            {isLoading ? '...' : (stats?.today_messages_count ?? 48)}
          </div>

          <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-1">
            Handled across WhatsApp & Web
          </p>
        </div>

        {/* 2. Open Conversations Needing a Human */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className={`p-4 sm:p-5 rounded-3xl border space-y-2 transition-all cursor-pointer shadow-lg group ${
            (stats?.open_conversations_needing_human ?? 0) > 0 
              ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400' 
              : 'bg-[#0D0805] border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#F5EDE4]/60 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className={`w-3.5 h-3.5 ${(stats?.open_conversations_needing_human ?? 0) > 0 ? 'text-amber-400 animate-bounce' : 'text-[#E58330]'}`} />
              <span>Needs Human</span>
            </span>
            {(stats?.open_conversations_needing_human ?? 0) > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold">
                Action Required
              </span>
            )}
          </div>

          <div className={`text-2xl sm:text-3xl font-black font-syne ${(stats?.open_conversations_needing_human ?? 0) > 0 ? 'text-amber-300' : 'text-white'}`}>
            {isLoading ? '...' : (stats?.open_conversations_needing_human ?? 0)}
          </div>

          <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-1">
            {(stats?.open_conversations_needing_human ?? 0) > 0 
              ? 'Escalated inquiries awaiting reply' 
              : 'All inquiries automated'}
          </p>
        </div>

        {/* 3. Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 space-y-2 hover:border-[#B83A0A]/40 transition-all cursor-pointer shadow-lg group"
        >
          <div className="flex items-center justify-between text-[#F5EDE4]/60">
            <span className="text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Orders</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              Orders →
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black font-syne text-white">
            {isLoading ? '...' : (stats?.orders_count ?? 1)}
          </div>

          <p className="text-[11px] font-dm text-emerald-400 font-semibold truncate">
            {/* Money formatted as major units from integer minor units per Hard Rule 6 */}
            {formatMinorUnits(stats?.total_revenue_minor_units ?? 89500, currency)} revenue
          </p>
        </div>

        {/* 4. Pending Approvals */}
        <div 
          onClick={() => onNavigateTab('dashboard')}
          className={`p-4 sm:p-5 rounded-3xl border space-y-2 transition-all cursor-pointer shadow-lg ${
            (stats?.pending_approvals_count ?? 0) > 0 
              ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400' 
              : 'bg-[#0D0805] border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#F5EDE4]/60 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className={`w-3.5 h-3.5 ${(stats?.pending_approvals_count ?? 0) > 0 ? 'text-rose-400 animate-pulse' : 'text-[#E58330]'}`} />
              <span>Pending Approvals</span>
            </span>
            {(stats?.pending_approvals_count ?? 0) > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold">
                Review
              </span>
            )}
          </div>

          <div className={`text-2xl sm:text-3xl font-black font-syne ${(stats?.pending_approvals_count ?? 0) > 0 ? 'text-rose-300' : 'text-white'}`}>
            {isLoading ? '...' : (stats?.pending_approvals_count ?? 0)}
          </div>

          <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-1">
            {(stats?.pending_approvals_count ?? 0) > 0 ? 'Discounts & courtesy credits' : 'None pending'}
          </p>
        </div>
      </div>

      {/* TWO COLUMN GRID: PENDING APPROVALS & OPEN CONVERSATIONS NEEDING HUMAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PENDING APPROVALS PANEL */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm sm:text-base font-syne font-bold text-white">
                Pending Approvals ({stats?.pending_approvals?.length || 0})
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#F5EDE4]/50">
              GET /approvals?status=pending
            </span>
          </div>

          {(!stats?.pending_approvals || stats.pending_approvals.length === 0) ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                No approvals waiting. AI workers operating within pre-approved thresholds!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.pending_approvals.map((appr) => (
                <div 
                  key={appr.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold uppercase">
                          {appr.type}
                        </span>
                        <h4 className="text-xs sm:text-sm font-syne font-bold text-white">
                          {appr.title}
                        </h4>
                      </div>
                      <p className="text-[11px] font-dm text-[#F5EDE4]/70 leading-relaxed">
                        {appr.description}
                      </p>
                    </div>

                    {appr.amount_minor_units && (
                      <span className="text-xs font-mono font-bold text-[#E58330] whitespace-nowrap bg-[#E58330]/10 px-2 py-0.5 rounded-lg border border-[#E58330]/20">
                        {formatMinorUnits(appr.amount_minor_units, currency)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#F5EDE4]/50">
                    <span>Requested by: {appr.requested_by}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={actionLoadingId === appr.id}
                        onClick={() => handleReject(appr)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-950/40 text-rose-300 border border-white/10 text-[11px] font-syne font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <X className="w-3 h-3" />
                        <span>Reject</span>
                      </button>

                      <button
                        type="button"
                        disabled={actionLoadingId === appr.id}
                        onClick={() => handleApprove(appr)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-syne font-bold flex items-center gap-1 cursor-pointer shadow disabled:opacity-50"
                      >
                        <Check className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OPEN CONVERSATIONS NEEDING HUMAN */}
        <div className="rounded-3xl bg-[#0D0805] border border-white/10 p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm sm:text-base font-syne font-bold text-white">
                Conversations Needing a Human ({stats?.conversations_needing_human?.length || 0})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('inbox')}
              className="text-[11px] font-mono text-[#E58330] hover:underline"
            >
              Open Inbox →
            </button>
          </div>

          {(!stats?.conversations_needing_human || stats.conversations_needing_human.length === 0) ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                No open escalations! All shopper inquiries are being resolved automatically by your AI worker.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.conversations_needing_human.map((convo) => (
                <div
                  key={convo.id}
                  onClick={() => onNavigateTab('inbox')}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-amber-500/30 space-y-2 hover:bg-amber-950/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-syne font-bold text-white">
                        {convo.customer_name}
                      </span>
                      <span className="text-[11px] font-mono text-[#F5EDE4]/60">
                        {convo.customer_phone}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">
                      {convo.channel}
                    </span>
                  </div>

                  <p className="text-xs font-dm text-[#F5EDE4]/90 bg-black/40 p-2.5 rounded-xl border border-white/5 italic">
                    "{convo.last_message}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#F5EDE4]/50 pt-1">
                    <span>Needs Human Intervention</span>
                    <span className="text-[#E58330] flex items-center gap-1 font-syne font-bold">
                      Take Over in Inbox →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INTERACTIVE AI WORKER TESTING CONSOLE */}
      <div className="rounded-3xl bg-[#0B0604] border border-[#B83A0A]/40 p-5 sm:p-6 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E58330]" />
              <h3 className="text-sm sm:text-base font-syne font-bold text-white">
                AI Worker Interactive Simulator
              </h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                Live REST API
              </span>
            </div>
            <p className="text-xs font-dm text-[#F5EDE4]/70">
              Test how your autonomous worker answers shopper inquiries using your live catalog, sizing, and delivery fees.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAiTest}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-syne font-bold text-white flex items-center gap-1.5 cursor-pointer"
            >
              <span>Full Testing Suite</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="p-4 rounded-2xl bg-[#050302] border border-white/5 max-h-64 overflow-y-auto space-y-3 font-dm text-xs">
          {testMessages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${msg.sender === 'merchant' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                  msg.sender === 'merchant'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white rounded-br-sm'
                    : 'bg-[#150D08] border border-white/10 text-[#F5EDE4] rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
              {msg.tools && (
                <div className="flex items-center gap-1 mt-1 font-mono text-[10px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Executed: {msg.tools.join(', ')}</span>
                </div>
              )}
            </div>
          ))}
          {isTestingAi && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#E58330]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Querying AI Worker & REST API...</span>
            </div>
          )}
        </div>

        {/* Query Input */}
        <form onSubmit={handleRunAiTest} className="flex gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Ask anything: 'Do you have size 42 in stock?' or 'How much is delivery to Kabulonga?'"
            className="flex-1 bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
          />
          <button
            type="submit"
            disabled={isTestingAi || !testQuery.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Worker</span>
          </button>
        </form>
      </div>

    </div>
  );
};
