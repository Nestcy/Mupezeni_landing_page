import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Bot, 
  User, 
  Phone, 
  RefreshCw, 
  Search, 
  Filter,
  Check, 
  CheckCheck,
  ShieldAlert, 
  Clock, 
  Sparkles, 
  WifiOff,
  ShoppingBag,
  CreditCard,
  Truck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Lock,
  Pause,
  Play,
  ToggleLeft,
  ToggleRight,
  Globe,
  Instagram,
  Layers,
  ArrowRight,
  FileText
} from 'lucide-react';
import { 
  apiClient, 
  ConversationItem, 
  ConversationMessage, 
  ConversationsResponse,
  AiSettings,
  formatMinorUnits,
  BusinessRoleItem 
} from '../../services/apiClient';

interface InboxTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

// Approved WhatsApp Template options for when 24h window is closed
const WHATSAPP_TEMPLATES = [
  {
    id: 'tpl_order_update',
    name: 'Order Status Update',
    text: 'Hello! This is an update regarding your order from our store. Your items are currently packaged and awaiting dispatch. Please reply to confirm your delivery address.'
  },
  {
    id: 'tpl_shipping_notice',
    name: 'Shipping & Dispatch Notification',
    text: 'Hi there! Your parcel has been handed over to our dispatch rider for delivery. Please let us know if someone is available at your gate or reception.'
  },
  {
    id: 'tpl_payment_reminder',
    name: 'Mobile Money Payment Info',
    text: 'Hello! Regarding your reserved items: you can complete payment via Airtel Money or MTN Mobile Money. Reply to this message if you need our merchant till code.'
  },
  {
    id: 'tpl_stock_followup',
    name: 'Stock & Sizing Follow-up',
    text: 'Hello! Following up on your earlier inquiry regarding sizes and available colors. We have restocked today and can reserve a pair for you.'
  }
];

export const InboxTab: React.FC<InboxTabProps> = ({ business, role }) => {
  // Conversations State
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<ConversationItem | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);

  // Filter & Search State
  const [statusFilter, setStatusFilter] = useState<'all' | 'needs_human' | 'open' | 'resolved'>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | 'whatsapp' | 'web' | 'instagram' | 'messenger'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts breakdown from server
  const [counts, setCounts] = useState({
    all: 0,
    open: 0,
    needs_human: 0,
    resolved: 0,
    unread: 0,
    whatsapp: 0,
    web: 0,
    instagram: 0,
    messenger: 0
  });

  // Reply Input & Templates
  const [replyText, setReplyText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Global AI Settings (GET/PATCH /ai-settings)
  const [aiSettings, setAiSettings] = useState<AiSettings | null>(null);
  const [isUpdatingAi, setIsUpdatingAi] = useState(false);

  // Takeover / Release State
  const [isTakingOver, setIsTakingOver] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);

  // Loading & Polling
  const [isLoading, setIsLoading] = useState(true);
  const [isPollingMessages, setIsPollingMessages] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Collapsible cards toggle
  const [showCartCard, setShowCartCard] = useState(true);
  const [showOrderCard, setShowOrderCard] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTimeRef = useRef<string | null>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Fetch Conversations: GET /businesses/{id}/conversations
  const fetchConversations = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const data = await apiClient.getConversations(business.id, {
        status: statusFilter,
        channel: channelFilter,
        needs_human: statusFilter === 'needs_human'
      });

      const list = data.conversations || [];
      setConversations(list);

      if (data.counts) {
        setCounts(data.counts);
      } else {
        setCounts({
          all: list.length,
          open: list.filter(c => c.status === 'open').length,
          needs_human: list.filter(c => c.needs_human || c.status === 'pending_human').length,
          resolved: list.filter(c => c.status === 'resolved').length,
          unread: data.unread_count || list.filter(c => c.unread).length,
          whatsapp: list.filter(c => c.channel === 'whatsapp').length,
          web: list.filter(c => c.channel === 'web').length,
          instagram: list.filter(c => c.channel === 'instagram').length,
          messenger: list.filter(c => c.channel === 'messenger').length
        });
      }

      // If active conversation is not selected or no longer exists, select first
      if (!activeConvoId && list.length > 0) {
        setActiveConvoId(list[0].id);
        setActiveConversation(list[0]);
        setMessages(list[0].messages || []);
      } else if (activeConvoId) {
        const found = list.find(c => c.id === activeConvoId);
        if (found) {
          setActiveConversation(found);
        }
      }
    } catch (err: any) {
      console.warn('Conversations fetch note:', err?.message);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // 2. Fetch AI Settings: GET /businesses/{id}/ai-settings
  const fetchAiSettings = async () => {
    try {
      const res = await apiClient.getAiSettings(business.id);
      if (res?.ai_settings) {
        setAiSettings(res.ai_settings);
      }
    } catch (err) {
      console.warn('AI settings fetch note:', err);
    }
  };

  // 3. Poll Conversation Messages: GET .../conversations/{cid}/messages?after=
  const pollActiveMessages = async () => {
    if (!activeConvoId) return;
    try {
      setIsPollingMessages(true);
      const afterParam = lastMessageTimeRef.current || undefined;
      const res = await apiClient.getConversationMessages(business.id, activeConvoId, afterParam);

      if (res?.messages && res.messages.length > 0) {
        setMessages(prev => {
          const prevIds = new Set(prev.map(m => m.id));
          const newOnes = res.messages.filter(m => !prevIds.has(m.id));
          if (newOnes.length === 0) return prev;
          return [...prev, ...newOnes];
        });
      }

      if (res?.conversation) {
        setActiveConversation(res.conversation);
      }
    } catch (err) {
      console.warn('Poll messages note:', err);
    } finally {
      setIsPollingMessages(false);
    }
  };

  // On mount and business changes
  useEffect(() => {
    fetchConversations(false);
    fetchAiSettings();
  }, [business.id, statusFilter, channelFilter]);

  // When active conversation changes, sync messages and reset refs
  useEffect(() => {
    if (!activeConvoId) return;
    const convo = conversations.find(c => c.id === activeConvoId);
    if (convo) {
      setActiveConversation(convo);
      setMessages(convo.messages || []);
      if (convo.messages && convo.messages.length > 0) {
        lastMessageTimeRef.current = convo.messages[convo.messages.length - 1].timestamp;
      }
    }
    setSelectedTemplate(null);
    setReplyText('');
    setTimeout(scrollToBottom, 50);
  }, [activeConvoId]);

  // Keep lastMessageTimeRef updated
  useEffect(() => {
    if (messages.length > 0) {
      lastMessageTimeRef.current = messages[messages.length - 1].timestamp;
    }
    scrollToBottom();
  }, [messages]);

  // Polling: Poll messages every 5s while page is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible' && activeConvoId) {
        pollActiveMessages();
        fetchConversations(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeConvoId, business.id]);

  // Toggle Global AI Settings: PATCH /businesses/{id}/ai-settings
  const handleToggleAiSettings = async () => {
    if (!aiSettings) return;
    const newAiEnabled = !aiSettings.ai_enabled;
    setIsUpdatingAi(true);
    setErrorNotice(null);

    try {
      const res = await apiClient.updateAiSettings(business.id, {
        ai_enabled: newAiEnabled,
        auto_reply: newAiEnabled
      });

      if (res?.ai_settings) {
        setAiSettings(res.ai_settings);
      } else {
        setAiSettings(prev => prev ? { ...prev, ai_enabled: newAiEnabled } : null);
      }

      setActionNotice(`Autonomous AI Workforce switched ${newAiEnabled ? 'ON' : 'OFF'}.`);
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to update AI settings.');
    } finally {
      setIsUpdatingAi(false);
    }
  };

  // Take Over Conversation: POST .../takeover (Pauses the AI)
  const handleTakeOver = async () => {
    if (!activeConvoId) return;
    setIsTakingOver(true);
    setErrorNotice(null);

    try {
      const res = await apiClient.takeoverConversation(business.id, activeConvoId);
      if (res?.conversation) {
        setActiveConversation(res.conversation);
        setConversations(prev => prev.map(c => c.id === activeConvoId ? res.conversation : c));
      }
      setActionNotice('AI Paused: You have taken over this conversation.');
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to take over conversation.');
    } finally {
      setIsTakingOver(false);
    }
  };

  // Hand Back to AI: POST .../release
  const handleRelease = async () => {
    if (!activeConvoId) return;
    setIsReleasing(true);
    setErrorNotice(null);

    try {
      const res = await apiClient.releaseConversation(business.id, activeConvoId);
      if (res?.conversation) {
        setActiveConversation(res.conversation);
        setConversations(prev => prev.map(c => c.id === activeConvoId ? res.conversation : c));
      }
      setActionNotice('Conversation released back to Autonomous AI Worker.');
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to release conversation to AI.');
    } finally {
      setIsReleasing(false);
    }
  };

  // Send a Reply: POST .../messages
  const handleSendMessage = async (e?: React.FormEvent, templateText?: string) => {
    if (e) e.preventDefault();
    const textToSend = templateText || replyText.trim();
    if (!textToSend || !activeConvoId) return;

    setIsSending(true);
    setErrorNotice(null);

    const isTemplate = Boolean(templateText);

    try {
      const res = await apiClient.sendConversationMessage(business.id, activeConvoId, {
        text: textToSend,
        sender_type: 'owner',
        is_template: isTemplate
      });

      setReplyText('');
      setSelectedTemplate(null);

      // Append locally for instantaneous UX
      const newMsg: ConversationMessage = (res as any)?.message || {
        id: `msg_${Date.now()}`,
        conversation_id: activeConvoId,
        sender_type: 'owner',
        sender: 'human',
        text: textToSend,
        status: 'delivered',
        timestamp: new Date().toISOString(),
        is_template: isTemplate
      };

      setMessages(prev => [...prev, newMsg]);

      // If template was sent, re-open the window
      if (isTemplate && activeConversation) {
        setActiveConversation({
          ...activeConversation,
          window_open: true
        });
      }

      await fetchConversations(true);
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to send reply.');
    } finally {
      setIsSending(false);
    }
  };

  // Filtered Conversations for the left pane
  const filteredConversations = conversations.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.customer_name.toLowerCase().includes(q);
      const matchPhone = c.customer_phone.toLowerCase().includes(q);
      const matchMsg = c.last_message.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchMsg) return false;
    }
    return true;
  });

  // Helper: Channel Icon
  const renderChannelIcon = (channel: string, className = "w-3.5 h-3.5") => {
    switch (channel) {
      case 'whatsapp':
        return <Phone className={`${className} text-emerald-400`} />;
      case 'instagram':
        return <Instagram className={`${className} text-pink-400`} />;
      case 'web':
        return <Globe className={`${className} text-sky-400`} />;
      case 'messenger':
      default:
        return <MessageSquare className={`${className} text-indigo-400`} />;
    }
  };

  // Helper: Delivery Status Ticks
  const renderDeliveryTicks = (status?: string) => {
    if (status === 'read') {
      return (
        <span className="inline-flex text-cyan-400 font-bold" title="Read by recipient">
          <CheckCheck className="w-3.5 h-3.5" />
        </span>
      );
    }
    if (status === 'delivered') {
      return (
        <span className="inline-flex text-[#F5EDE4]/60" title="Delivered to device">
          <CheckCheck className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="inline-flex text-[#F5EDE4]/40" title="Sent">
        <Check className="w-3.5 h-3.5" />
      </span>
    );
  };

  // WhatsApp 24-hour window closed check
  const isWhatsApp = activeConversation?.channel === 'whatsapp';
  const isWindowClosed = isWhatsApp && activeConversation?.window_open === false;

  return (
    <div className="space-y-4 font-dm">
      
      {/* GLOBAL INBOX TOP BAR */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#E58330]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Omnichannel Retail Inbox
            </h2>
            {counts.unread > 0 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E58330]/20 text-[#E58330] border border-[#E58330]/30 font-bold">
                {counts.unread} Unread
              </span>
            )}
            {counts.needs_human > 0 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse font-bold">
                {counts.needs_human} Needs Human
              </span>
            )}
          </div>
          <p className="text-xs text-[#F5EDE4]/70">
            Real-time multi-channel inbox: WhatsApp, Web Chat, Instagram, and Messenger with autonomous AI co-pilot.
          </p>
        </div>

        {/* Global AI Switch: GET/PATCH /ai-settings */}
        <div className="flex items-center gap-3 bg-[#130C08] p-2 sm:p-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <Bot className={`w-4 h-4 ${aiSettings?.ai_enabled ? 'text-emerald-400' : 'text-white/40'}`} />
            <div>
              <div className="font-syne font-bold text-white text-[11px] leading-tight">
                AI Auto-Reply Workforce
              </div>
              <div className="text-[10px] font-mono text-[#F5EDE4]/50">
                {aiSettings?.ai_enabled ? '● Autonomous (Active)' : '○ Paused (Manual Mode)'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleAiSettings}
            disabled={isUpdatingAi}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold ${
              aiSettings?.ai_enabled
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
            }`}
            title="Toggle autonomous AI replies globally across all channels"
          >
            {aiSettings?.ai_enabled ? (
              <>
                <ToggleRight className="w-5 h-5 text-emerald-400" />
                <span className="hidden sm:inline">ON</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5 text-white/40" />
                <span className="hidden sm:inline">OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* NOTICES */}
      {actionNotice && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}
      {errorNotice && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 shadow-lg">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* TWO-PANE INBOX CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px] rounded-3xl overflow-hidden border border-white/10 bg-[#070402] shadow-2xl">
        
        {/* ================= LEFT PANE: CONVERSATION LIST (COL 5) ================= */}
        <div className="lg:col-span-5 flex flex-col border-r border-white/10 bg-[#0D0805] h-full overflow-hidden">
          
          {/* Search Input */}
          <div className="p-3.5 border-b border-white/[0.08] space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shoppers by name, phone, message..."
                className="w-full bg-[#130C08] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
              />
            </div>

            {/* Status Filter Pills with Unread Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  statusFilter === 'all'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold'
                    : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                }`}
              >
                <span>All</span>
                <span className="text-[9px] opacity-70">({counts.all})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('needs_human')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 border ${
                  statusFilter === 'needs_human'
                    ? 'bg-amber-600 text-white font-bold border-amber-500'
                    : counts.needs_human > 0
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse'
                      : 'bg-white/5 text-[#F5EDE4]/60 border-transparent hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3 h-3" />
                <span>Needs Human</span>
                {counts.needs_human > 0 && (
                  <span className="text-[9px] px-1 py-0.2 rounded-full bg-amber-500 text-black font-black">
                    {counts.needs_human}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('open')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  statusFilter === 'open'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold'
                    : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                }`}
              >
                <span>Open</span>
                <span className="text-[9px] opacity-70">({counts.open})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('resolved')}
                className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  statusFilter === 'resolved'
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold'
                    : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                }`}
              >
                <span>Resolved</span>
                <span className="text-[9px] opacity-70">({counts.resolved})</span>
              </button>
            </div>

            {/* Channel Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono text-[#F5EDE4]/50">
              <span className="shrink-0 text-[#F5EDE4]/30">Channel:</span>
              {(['all', 'whatsapp', 'web', 'instagram', 'messenger'] as const).map(ch => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setChannelFilter(ch)}
                  className={`px-2 py-0.5 rounded-lg capitalize transition-colors cursor-pointer ${
                    channelFilter === ch 
                      ? 'bg-white/20 text-white font-bold' 
                      : 'hover:text-white'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-2 text-[#F5EDE4]/50">
                <MessageSquare className="w-8 h-8 mx-auto opacity-30" />
                <p className="text-xs">No conversations found matching filters.</p>
              </div>
            ) : (
              filteredConversations.map(c => {
                const isSelected = c.id === activeConvoId;
                const timeAgo = (() => {
                  try {
                    const diffMs = Date.now() - new Date(c.updated_at).getTime();
                    const mins = Math.floor(diffMs / 60000);
                    if (mins < 1) return 'just now';
                    if (mins < 60) return `${mins}m`;
                    const hours = Math.floor(mins / 60);
                    if (hours < 24) return `${hours}h`;
                    return `${Math.floor(hours / 24)}d`;
                  } catch {
                    return '';
                  }
                })();

                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveConvoId(c.id)}
                    className={`p-3.5 transition-all cursor-pointer relative flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-white/[0.07] border-l-4 border-[#E58330]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Top Row: Name + Channel Icon + Time */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {renderChannelIcon(c.channel)}
                        <span className="font-syne font-bold text-white truncate text-xs">
                          {c.customer_name}
                        </span>
                        {c.unread && (
                          <span className="w-2 h-2 rounded-full bg-[#E58330] shrink-0 animate-pulse" />
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-[#F5EDE4]/40 shrink-0">
                        {timeAgo}
                      </span>
                    </div>

                    {/* Middle Row: Last message text */}
                    <p className="text-[11px] text-[#F5EDE4]/70 line-clamp-1 italic">
                      "{c.last_message}"
                    </p>

                    {/* Bottom Row: Badges (Needs Human, WhatsApp Closed, Cart, Order) */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[9.5px] font-mono">
                      {c.needs_human && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                          Needs Human
                        </span>
                      )}

                      {c.ai_paused && (
                        <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          AI Paused
                        </span>
                      )}

                      {c.channel === 'whatsapp' && c.window_open === false && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                          Window 24h Closed
                        </span>
                      )}

                      {c.cart && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5">
                          <ShoppingBag className="w-2.5 h-2.5" />
                          <span>Cart ({c.cart.items_count})</span>
                        </span>
                      )}

                      {c.order && (
                        <span className="px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-0.5">
                          <CreditCard className="w-2.5 h-2.5" />
                          <span>{c.order.order_number}</span>
                        </span>
                      )}

                      <span className="ml-auto text-[#F5EDE4]/40 text-[9px]">
                        {c.customer_phone}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= RIGHT PANE: MESSAGES & CONTROLS (COL 7) ================= */}
        <div className="lg:col-span-7 flex flex-col bg-[#070402] h-full overflow-hidden">
          
          {activeConversation ? (
            <>
              {/* HEADER BAR FOR ACTIVE CONVERSATION */}
              <div className="p-3.5 sm:p-4 border-b border-white/[0.08] bg-[#0C0603] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                    {renderChannelIcon(activeConversation.channel, "w-4 h-4")}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-syne font-bold text-sm text-white truncate">
                        {activeConversation.customer_name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-white/5 border border-white/10 text-[#F5EDE4]/70 capitalize">
                        {activeConversation.channel}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#F5EDE4]/50 flex items-center gap-2">
                      <span>{activeConversation.customer_phone}</span>
                      <span>·</span>
                      <span className={activeConversation.ai_paused ? 'text-purple-400 font-bold' : 'text-emerald-400'}>
                        {activeConversation.ai_paused ? 'AI Paused (You are in control)' : 'AI Autonomous Co-Pilot'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS: TAKEOVER / RELEASE / RESOLVE */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Take over button (POST .../takeover, pauses AI) */}
                  {!activeConversation.ai_paused ? (
                    <button
                      type="button"
                      onClick={handleTakeOver}
                      disabled={isTakingOver}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-950/70 text-purple-300 border border-purple-500/30 text-xs font-syne font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                      title="Pause autonomous AI and take over conversation manually"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>{isTakingOver ? 'Pausing AI...' : 'Take Over'}</span>
                    </button>
                  ) : (
                    /* Hand back to AI button (POST .../release) */
                    <button
                      type="button"
                      onClick={handleRelease}
                      disabled={isReleasing}
                      className="px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 text-xs font-syne font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                      title="Resume autonomous AI responses"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isReleasing ? 'Handing back...' : 'Hand Back to AI'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* WHATSAPP 24-HOUR WINDOW CLOSED WARNING BANNER */}
              {isWindowClosed && (
                <div className="p-3.5 bg-gradient-to-r from-amber-950/40 to-rose-950/40 border-b border-amber-500/30 flex items-start gap-2.5 shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <div className="font-syne font-bold text-amber-200">
                      WhatsApp 24-Hour Messaging Window is Closed
                    </div>
                    <p className="text-[11px] text-[#F5EDE4]/80 leading-relaxed font-dm">
                      Per Meta policy, free-form text cannot be delivered outside the 24-hour customer window. Select an approved template below to re-open the conversation.
                    </p>
                  </div>
                </div>
              )}

              {/* LINKED CART & ORDER CARDS CONTAINER */}
              {(activeConversation.cart || activeConversation.order) && (
                <div className="p-3 bg-[#0A0503] border-b border-white/[0.06] space-y-2 shrink-0">
                  {/* Linked Cart Card */}
                  {activeConversation.cart && (
                    <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-emerald-500/20 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-syne font-bold text-white text-xs">
                          <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Active Shopper Cart ({activeConversation.cart.items_count} items)</span>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold text-xs">
                          Subtotal: {formatMinorUnits(activeConversation.cart.subtotal, business.currency || 'ZMW')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeConversation.cart.items.map((it, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[#F5EDE4]/80">
                            {it.quantity}x {it.name} {it.variant_title ? `(${it.variant_title})` : ''} — {formatMinorUnits(it.price, business.currency || 'ZMW')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Linked Order Card */}
                  {activeConversation.order && (
                    <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-sky-500/20 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-syne font-bold text-white text-xs">
                          <CreditCard className="w-3.5 h-3.5 text-sky-400" />
                          <span>Linked Order: {activeConversation.order.order_number}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-300">
                            Total: {formatMinorUnits(activeConversation.order.total, business.currency || 'ZMW')}
                          </span>
                          <span className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded uppercase ${
                            activeConversation.order.status === 'confirmed' || activeConversation.order.status === 'dispatched'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {activeConversation.order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MESSAGES THREAD AREA (POLL EVERY 5s) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.length === 0 ? (
                  <div className="py-16 text-center space-y-2 text-[#F5EDE4]/40">
                    <MessageSquare className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-xs">No message history yet. Send a reply below.</p>
                  </div>
                ) : (
                  messages.map(m => {
                    const senderType = m.sender_type || (m.sender === 'ai' ? 'worker' : m.sender === 'customer' ? 'customer' : 'owner');
                    const isCustomer = senderType === 'customer';
                    const isWorker = senderType === 'worker';
                    const isOwner = senderType === 'owner';

                    const timeStr = (() => {
                      try {
                        return new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      } catch {
                        return '';
                      }
                    })();

                    return (
                      <div 
                        key={m.id}
                        className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                      >
                        {/* Bubble */}
                        <div 
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-3.5 text-xs shadow-md space-y-1 relative ${
                            isCustomer
                              ? 'bg-[#140D09] border border-white/10 text-white rounded-bl-sm'
                              : isWorker
                                ? 'bg-gradient-to-br from-[#1C120B] to-[#2D160A] border border-[#E58330]/30 text-white rounded-br-sm'
                                : 'bg-gradient-to-br from-[#121B14] to-[#152B1E] border border-emerald-500/30 text-white rounded-br-sm'
                          }`}
                        >
                          {/* Sender Label & Channel */}
                          <div className="flex items-center justify-between gap-2 pb-0.5 border-b border-white/[0.04] text-[10px] font-mono">
                            <span className="flex items-center gap-1">
                              {isCustomer && <User className="w-3 h-3 text-sky-400" />}
                              {isWorker && <Bot className="w-3 h-3 text-[#E58330]" />}
                              {isOwner && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                              <span className={isCustomer ? 'text-sky-300 font-bold' : isWorker ? 'text-[#E58330] font-bold' : 'text-emerald-300 font-bold'}>
                                {isCustomer ? activeConversation.customer_name : isWorker ? 'Autonomous AI Worker' : 'Store Owner (You)'}
                              </span>
                            </span>

                            <span className="flex items-center gap-1 text-[#F5EDE4]/40">
                              {renderChannelIcon(activeConversation.channel, "w-2.5 h-2.5")}
                              <span>{timeStr}</span>
                            </span>
                          </div>

                          {/* Message Body */}
                          <p className="leading-relaxed font-dm whitespace-pre-wrap text-[12px]">
                            {m.text}
                          </p>

                          {/* Template badge or delivery ticks */}
                          <div className="flex items-center justify-end gap-1.5 pt-0.5 text-[10px] font-mono">
                            {m.is_template && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Template
                              </span>
                            )}
                            {!isCustomer && renderDeliveryTicks(m.status)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* COMPOSER / TEMPLATE ACTIONS AREA */}
              <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0A0604] space-y-3 shrink-0">
                
                {/* When WhatsApp Window is closed: Show Template Sending Interface */}
                {isWindowClosed ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Select Pre-Approved WhatsApp Template:</span>
                      </span>
                    </div>

                    {/* Template Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {WHATSAPP_TEMPLATES.map(tpl => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => {
                            setSelectedTemplate(tpl.text);
                            setReplyText(tpl.text);
                          }}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            selectedTemplate === tpl.text
                              ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                              : 'bg-white/[0.02] border-white/10 text-[#F5EDE4]/70 hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          <div className="font-syne font-bold text-[11px] text-amber-300 mb-0.5">
                            {tpl.name}
                          </div>
                          <p className="text-[10px] font-dm line-clamp-2 text-[#F5EDE4]/60">
                            "{tpl.text}"
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Template Send Button */}
                    {selectedTemplate && (
                      <div className="pt-1 flex items-center justify-between gap-3">
                        <span className="text-[10px] font-mono text-emerald-400">
                          ✓ Sending template will re-open customer window
                        </span>
                        <button
                          type="button"
                          disabled={isSending}
                          onClick={() => handleSendMessage(undefined, selectedTemplate)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-50"
                        >
                          {isSending ? (
                            <span>Sending Template...</span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send WhatsApp Template</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Standard Reply Composer when window is open */
                  <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${activeConversation.customer_name} via ${activeConversation.channel}...`}
                      className="flex-1 bg-[#130C08] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
                    />

                    <button
                      type="submit"
                      disabled={isSending || !replyText.trim()}
                      className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#9B2208]/20 cursor-pointer disabled:opacity-40 transition-all"
                    >
                      {isSending ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-[#F5EDE4]/40 space-y-2">
              <div>
                <MessageSquare className="w-12 h-12 mx-auto opacity-20 mb-2" />
                <h4 className="font-syne font-bold text-sm text-white">No Conversation Selected</h4>
                <p className="text-xs font-dm">Select a conversation from the left pane to view messages and shopper context.</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
