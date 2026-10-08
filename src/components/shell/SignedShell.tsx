import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingBag, 
  Package, 
  Megaphone, 
  Flame, 
  Share2, 
  Settings, 
  ChevronDown, 
  Bell, 
  ExternalLink, 
  Sparkles, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Check, 
  User, 
  Store as StoreIcon, 
  Building2,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient, ApprovalItem, ConversationItem, BusinessRoleItem } from '../../services/apiClient';
import { PageId } from '../../types';

// Tab Components
import { DashboardTab } from './DashboardTab';
import { InboxTab } from './InboxTab';
import { OrdersTab } from './OrdersTab';
import { ProductsTab } from './ProductsTab';
import { MarketingTab } from './MarketingTab';
import { AdsTab } from './AdsTab';
import { ConnectionsTab } from './ConnectionsTab';
import { SettingsTab } from './SettingsTab';

interface SignedShellProps {
  onNavigate: (page: PageId) => void;
  onViewStorefront?: (slug: string) => void;
}

export type ShellTabId = 
  | 'dashboard' 
  | 'inbox' 
  | 'orders' 
  | 'products' 
  | 'marketing' 
  | 'ads' 
  | 'connections' 
  | 'settings';

export const SignedShell: React.FC<SignedShellProps> = ({ onNavigate, onViewStorefront }) => {
  const { 
    user, 
    businesses, 
    selectedBusinessId, 
    selectedBusiness, 
    role, 
    selectBusiness, 
    logout,
    store 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<ShellTabId>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isBusinessSwitcherOpen, setIsBusinessSwitcherOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Notification dot driven by GET /businesses/{id}/approvals?status=pending and unread conversations
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState<number>(0);
  const [unreadConversationsCount, setUnreadConversationsCount] = useState<number>(0);
  const [pendingApprovals, setPendingApprovals] = useState<ApprovalItem[]>([]);
  const [conversationsNeedingAttention, setConversationsNeedingAttention] = useState<ConversationItem[]>([]);

  // Load notification alerts
  const loadAlerts = async () => {
    if (!selectedBusiness?.id) return;
    try {
      const [apprData, convData] = await Promise.all([
        apiClient.getApprovals(selectedBusiness.id, 'pending').catch(() => null),
        apiClient.getConversations(selectedBusiness.id).catch(() => null)
      ]);

      if (apprData) {
        setPendingApprovalsCount(apprData.pending_count || apprData.approvals?.length || 0);
        setPendingApprovals(apprData.approvals || []);
      }
      if (convData) {
        setUnreadConversationsCount(convData.unread_count || 0);
        const needing = (convData.conversations || []).filter(c => c.needs_human || c.unread);
        setConversationsNeedingAttention(needing);
      }
    } catch (err) {
      console.warn('Alerts fetch note:', err);
    }
  };

  useEffect(() => {
    loadAlerts();
    // Poll notifications every 5s while visible per Hard Rule 9
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadAlerts();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [selectedBusiness?.id]);

  const hasNotifications = pendingApprovalsCount > 0 || unreadConversationsCount > 0;

  const currentBusiness = selectedBusiness || (businesses.length > 0 ? businesses[0] : null);

  const navItems = [
    { id: 'dashboard' as ShellTabId, label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'inbox' as ShellTabId, 
      label: 'Inbox', 
      icon: MessageSquare, 
      badge: unreadConversationsCount > 0 ? unreadConversationsCount : undefined,
      badgeColor: 'bg-[#E58330]'
    },
    { id: 'orders' as ShellTabId, label: 'Orders', icon: ShoppingBag },
    { id: 'products' as ShellTabId, label: 'Products', icon: Package },
    { id: 'marketing' as ShellTabId, label: 'Marketing', icon: Megaphone, preview: true },
    { id: 'ads' as ShellTabId, label: 'Ads', icon: Flame, preview: true },
    { id: 'connections' as ShellTabId, label: 'Connections', icon: Share2 },
    { id: 'settings' as ShellTabId, label: 'Settings', icon: Settings },
  ];

  const handleApproveFromNotification = async (apprId: string) => {
    if (!currentBusiness) return;
    try {
      await apiClient.approveApproval(currentBusiness.id, apprId);
      loadAlerts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectFromNotification = async (apprId: string) => {
    if (!currentBusiness) return;
    try {
      await apiClient.rejectApproval(currentBusiness.id, apprId);
      loadAlerts();
    } catch (err) {
      console.error(err);
    }
  };

  const openStorefront = () => {
    const slug = store?.slug || currentBusiness?.slug || '';
    if (onViewStorefront && slug) {
      onViewStorefront(slug);
    } else {
      onNavigate('storefront');
    }
  };

  if (!currentBusiness) {
    return (
      <div className="min-h-screen bg-[#050302] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-sm font-dm text-[#F5EDE4]/70">No store business selected.</p>
          <button
            onClick={() => onNavigate('onboarding')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs"
          >
            Create Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040202] text-[#F7F5F0] flex">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 border-r border-white/[0.08] bg-[#080402] shrink-0 sticky top-0 h-screen justify-between z-30">
        
        <div className="space-y-4 p-4 flex-1 overflow-y-auto">
          
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9B2208] via-[#B83010] to-[#E58330] flex items-center justify-center shadow-lg shadow-[#9B2208]/20">
              <StoreIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-syne font-black text-base text-white tracking-tight">
                Mupezeni
              </span>
              <span className="text-[10px] font-mono text-[#E58330] block -mt-1">
                Retail Intelligence
              </span>
            </div>
          </div>

          {/* BUSINESS SWITCHER FROM GET /me */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBusinessSwitcherOpen(!isBusinessSwitcherOpen)}
              className="w-full p-2.5 rounded-2xl bg-[#110A06] hover:bg-[#180E09] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-left cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#9B2208]/20 border border-[#9B2208]/40 text-[#E58330] flex items-center justify-center font-bold text-xs shrink-0">
                  {currentBusiness.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-syne font-bold text-xs text-white truncate">
                    {currentBusiness.name}
                  </div>
                  {/* ROLE BADGE */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded font-bold capitalize ${
                      role === 'owner' 
                        ? 'bg-purple-500/20 text-purple-300' 
                        : role === 'admin' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-white/10 text-[#F5EDE4]/70'
                    }`}>
                      {role || currentBusiness.role || 'Owner'}
                    </span>
                    <span className="text-[10px] font-mono text-[#F5EDE4]/40">
                      {currentBusiness.currency || 'ZMW'}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronDown className={`w-4 h-4 text-white/50 group-hover:text-white transition-transform shrink-0 ${isBusinessSwitcherOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown list of businesses from GET /me */}
            <AnimatePresence>
              {isBusinessSwitcherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-[#140C07] border border-white/15 p-2 shadow-2xl z-50 space-y-1"
                >
                  <div className="px-2 py-1 text-[10px] font-mono text-[#F5EDE4]/50 uppercase tracking-wider">
                    Your Businesses ({businesses.length})
                  </div>

                  {businesses.map((biz) => (
                    <button
                      key={biz.id}
                      type="button"
                      onClick={() => {
                        selectBusiness(biz.id);
                        setIsBusinessSwitcherOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl flex items-center justify-between text-left text-xs transition-all cursor-pointer ${
                        biz.id === currentBusiness.id
                          ? 'bg-[#9B2208]/20 border border-[#9B2208]/40 text-white'
                          : 'hover:bg-white/5 text-[#F5EDE4]/80'
                      }`}
                    >
                      <span className="font-syne font-bold truncate">{biz.name}</span>
                      <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-white/10 capitalize">
                        {biz.role}
                      </span>
                    </button>
                  ))}

                  <div className="pt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsBusinessSwitcherOpen(false);
                        onNavigate('onboarding');
                      }}
                      className="w-full p-2 rounded-xl text-left text-xs font-syne font-bold text-[#E58330] hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Store</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SIDEBAR NAVIGATION ITEMS */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl flex items-center justify-between font-syne text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-lg shadow-[#9B2208]/20'
                      : 'text-[#F5EDE4]/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E58330]'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.preview && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full border ${
                        isActive ? 'bg-white/20 text-white border-white/30' : 'bg-white/5 text-[#F5EDE4]/40 border-white/10'
                      }`}>
                        Preview
                      </span>
                    )}

                    {item.badge !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-white shadow-sm ${item.badgeColor || 'bg-amber-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Account & Sign Out footer */}
        <div className="p-4 border-t border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-dm text-[#F5EDE4]/70 px-1">
            <div className="truncate min-w-0 pr-2">
              <div className="font-syne font-bold text-white truncate">
                {user?.full_name || user?.email?.split('@')[0] || 'Merchant'}
              </div>
              <div className="text-[10px] font-mono text-[#F5EDE4]/50 truncate">
                {user?.email}
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 capitalize shrink-0">
              {role || 'Owner'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              onNavigate('home');
            }}
            className="w-full py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-rose-950/30 hover:text-rose-300 text-xs font-dm text-[#F5EDE4]/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 bg-[#0C0604] border-r border-white/10 h-full flex flex-col justify-between p-4 z-10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StoreIcon className="w-5 h-5 text-[#E58330]" />
                    <span className="font-syne font-black text-white text-base">Mupezeni</span>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="text-white/60">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-2xl flex items-center justify-between font-syne text-xs font-bold ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white'
                          : 'text-[#F5EDE4]/70 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="w-4 h-4 text-[#E58330]" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <button
                onClick={() => {
                  logout();
                  onNavigate('home');
                }}
                className="w-full py-2 rounded-xl bg-white/5 text-xs text-rose-300 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP HEADER BAR */}
        <header className="h-16 border-b border-white/[0.08] bg-[#070302]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-sm sm:text-base font-syne font-black text-white capitalize">
                {activeTab}
              </h1>
              <span className="text-[11px] font-dm text-[#F5EDE4]/50 hidden sm:inline">
                {currentBusiness.name} · {currentBusiness.currency || 'ZMW'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Quick Actions */}
            <button
              type="button"
              onClick={() => onNavigate('ai-workers-test')}
              className="hidden md:flex px-3 py-1.5 rounded-xl bg-[#1C120B] hover:bg-[#2A1B10] border border-[#E58330]/50 text-[#E58330] font-syne font-bold text-xs items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E58330]" />
              <span>Test AI Worker</span>
            </button>

            <button
              type="button"
              onClick={openStorefront}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#9B2208]/20 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visit Storefront</span>
            </button>

            {/* HEADER NOTIFICATION BELL WITH NOTIFICATION DOT */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white relative cursor-pointer"
                title="Pending Approvals & Alerts"
              >
                <Bell className="w-4 h-4" />
                {/* Notification dot driven by GET /businesses/{id}/approvals?status=pending and unread conversations */}
                {hasNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse ring-2 ring-[#070302]" />
                )}
              </button>

              {/* Notification Popover */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-3xl bg-[#120B07] border border-white/15 p-4 shadow-2xl z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#E58330]" />
                        <h4 className="font-syne font-bold text-xs text-white">
                          Approvals & Alerts
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                        {pendingApprovalsCount + unreadConversationsCount} New
                      </span>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-2.5 text-xs font-dm">
                      {pendingApprovals.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="text-[10px] font-mono text-rose-300 uppercase tracking-wider flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" />
                            <span>Pending Approvals ({pendingApprovals.length})</span>
                          </div>
                          {pendingApprovals.map(appr => (
                            <div key={appr.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                              <div className="flex items-start justify-between">
                                <span className="font-syne font-bold text-white text-[11px]">{appr.title}</span>
                                <span className="text-[9px] font-mono text-rose-400 uppercase bg-rose-500/10 px-1.5 py-0.2 rounded">
                                  {appr.type}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-[#F5EDE4]/70 line-clamp-1">{appr.description}</p>
                              <div className="flex items-center justify-end gap-1.5 pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleRejectFromNotification(appr.id)}
                                  className="px-2 py-0.5 rounded bg-white/5 text-rose-300 text-[10px] font-syne font-bold"
                                >
                                  Reject
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleApproveFromNotification(appr.id)}
                                  className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-syne font-bold"
                                >
                                  Approve
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {conversationsNeedingAttention.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Unread & Escalated ({conversationsNeedingAttention.length})</span>
                          </div>
                          {conversationsNeedingAttention.map(c => (
                            <div 
                              key={c.id} 
                              onClick={() => {
                                setActiveTab('inbox');
                                setIsNotificationOpen(false);
                              }}
                              className="p-2.5 rounded-xl bg-white/[0.02] border border-amber-500/30 space-y-1 hover:bg-white/[0.04] transition-all cursor-pointer"
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-syne font-bold text-white">{c.customer_name}</span>
                                <span className="text-[9px] font-mono text-amber-300 uppercase">{c.channel}</span>
                              </div>
                              <p className="text-[10.5px] text-[#F5EDE4]/70 line-clamp-1 italic">"{c.last_message}"</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {!hasNotifications && (
                        <div className="p-6 text-center text-white/50 space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                          <p className="text-xs">All clear! No pending approvals or escalations.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* TAB CONTENT RENDERER */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex-1">
          {activeTab === 'dashboard' && (
            <DashboardTab
              business={currentBusiness}
              role={role}
              onNavigateTab={(tab) => setActiveTab(tab as ShellTabId)}
              onOpenStorefront={openStorefront}
              onOpenAiTest={() => onNavigate('ai-workers-test')}
            />
          )}

          {activeTab === 'inbox' && (
            <InboxTab
              business={currentBusiness}
              role={role}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              business={currentBusiness}
              role={role}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              business={currentBusiness}
              role={role}
            />
          )}

          {activeTab === 'marketing' && (
            <MarketingTab
              business={currentBusiness}
              role={role}
            />
          )}

          {activeTab === 'ads' && (
            <AdsTab
              business={currentBusiness}
              role={role}
            />
          )}

          {activeTab === 'connections' && (
            <ConnectionsTab
              business={currentBusiness}
              role={role}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              business={currentBusiness}
              role={role}
            />
          )}
        </main>
      </div>

    </div>
  );
};
