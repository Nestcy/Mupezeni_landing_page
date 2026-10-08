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
  ShieldAlert,
  Clock,
  Sparkles,
  WifiOff
} from 'lucide-react';
import { 
  apiClient, 
  ConversationItem, 
  ConversationMessage, 
  ConversationsResponse 
} from '../../services/apiClient';
import { BusinessRoleItem } from '../../services/apiClient';

interface InboxTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const InboxTab: React.FC<InboxTabProps> = ({ business, role }) => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'needs_human' | 'whatsapp' | 'web' | 'instagram'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [humanTakeoverNotice, setHumanTakeoverNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch conversations from API
  const fetchConversations = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const data = await apiClient.getConversations(business.id);
      setConversations(data.conversations || []);
      
      // Auto-select first conversation if none selected
      if (!activeConvoId && data.conversations && data.conversations.length > 0) {
        setActiveConvoId(data.conversations[0].id);
      }
    } catch (err: any) {
      console.warn('Inbox fetch note:', err?.message);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchConversations(false);
  }, [business.id]);

  // Online / offline event listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Hard Rule 9: Poll for live data (inbox every 5s while visible). No websockets yet.
  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible' && !isOffline) {
        setIsPolling(true);
        fetchConversations(true).finally(() => setIsPolling(false));
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [business.id, isOffline, activeConvoId]);

  useEffect(() => {
    scrollToBottom();
  }, [activeConvoId, conversations]);

  const activeConvo = conversations.find(c => c.id === activeConvoId) || conversations[0] || null;

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    if (filter === 'needs_human' && !c.needs_human && c.status !== 'pending_human') return false;
    if (filter === 'whatsapp' && c.channel !== 'whatsapp') return false;
    if (filter === 'web' && c.channel !== 'web') return false;
    if (filter === 'instagram' && c.channel !== 'instagram') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.customer_name.toLowerCase().includes(q);
      const matchPhone = c.customer_phone.toLowerCase().includes(q);
      const matchMsg = c.last_message.toLowerCase().includes(q);
      return matchName || matchPhone || matchMsg;
    }
    return true;
  });

  // Handle Send Human Message
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConvo || isSending) return;

    const textToSend = replyText.trim();
    setReplyText('');
    setIsSending(true);

    try {
      const updated = await apiClient.sendConversationMessage(business.id, activeConvo.id, textToSend, 'human');
      setConversations(prev => prev.map(c => c.id === updated.id ? updated : c));
      setHumanTakeoverNotice('Human message sent. AI will stay paused on this thread until resolved.');
      setTimeout(() => setHumanTakeoverNotice(null), 3500);
    } catch (err: any) {
      console.error('Send message failed:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Resolve Conversation
  const handleResolve = async () => {
    if (!activeConvo) return;
    try {
      const updated = await apiClient.resolveConversation(business.id, activeConvo.id);
      setConversations(prev => prev.map(c => c.id === updated.id ? updated : c));
      setHumanTakeoverNotice('Conversation marked resolved. AI worker will handle future messages.');
      setTimeout(() => setHumanTakeoverNotice(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0D0805] border border-white/10 text-xs font-dm shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#9B2208]/20 text-[#E58330] flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="font-syne font-bold text-white flex items-center gap-2">
              <span>Autonomous Omnichannel Customer Inbox</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Polls every 5s
              </span>
            </div>
            <p className="text-[#F5EDE4]/60 text-[11px]">
              AI Worker answers WhatsApp and Web shoppers immediately. You can step in anytime.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] self-end sm:self-center">
          {isPolling && (
            <span className="flex items-center gap-1.5 text-[#E58330]">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Syncing...</span>
            </span>
          )}
          {isOffline && (
            <span className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => fetchConversations(false)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#F5EDE4]/70 hover:text-white cursor-pointer"
            title="Refresh inbox"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {humanTakeoverNotice && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-dm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{humanTakeoverNotice}</span>
        </motion.div>
      )}

      {/* INBOX SPLIT VIEW: CONVERSATION LIST (LEFT) & ACTIVE CHAT (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[650px] rounded-3xl bg-[#090503] border border-white/10 overflow-hidden shadow-2xl">
        
        {/* LEFT COLUMN: CONVERSATION LIST (5 cols) */}
        <div className="lg:col-span-5 border-r border-white/10 flex flex-col h-full bg-[#0D0805]/50">
          
          {/* Search & Filters */}
          <div className="p-3 sm:p-4 border-b border-white/[0.08] space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer name, phone (+260)..."
                className="w-full bg-[#150D08] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-syne font-bold">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-sm' 
                    : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                }`}
              >
                All ({conversations.length})
              </button>

              <button
                type="button"
                onClick={() => setFilter('needs_human')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  filter === 'needs_human' 
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'bg-white/5 text-amber-400 hover:text-amber-300'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Needs Human ({conversations.filter(c => c.needs_human || c.status === 'pending_human').length})</span>
              </button>

              <button
                type="button"
                onClick={() => setFilter('whatsapp')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filter === 'whatsapp' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                }`}
              >
                WhatsApp
              </button>

              <button
                type="button"
                onClick={() => setFilter('web')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filter === 'web' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/5 text-[#F5EDE4]/60 hover:text-white'
                }`}
              >
                Web
              </button>
            </div>
          </div>

          {/* List Stream */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/5 text-white/40 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <p className="text-xs font-dm text-[#F5EDE4]/50">
                  No conversations match your filter.
                </p>
              </div>
            ) : (
              filteredConversations.map((convo) => {
                const isSelected = convo.id === activeConvo?.id;
                const needsHuman = convo.needs_human || convo.status === 'pending_human';

                return (
                  <div
                    key={convo.id}
                    onClick={() => setActiveConvoId(convo.id)}
                    className={`p-3.5 sm:p-4 transition-all cursor-pointer space-y-1.5 ${
                      isSelected 
                        ? 'bg-[#1D120B] border-l-4 border-l-[#E58330]' 
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {convo.unread && (
                          <span className="w-2 h-2 rounded-full bg-[#E58330] shrink-0" />
                        )}
                        <span className="text-xs font-syne font-bold text-white truncate max-w-[130px]">
                          {convo.customer_name}
                        </span>
                        <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                          {convo.customer_phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                          convo.channel === 'whatsapp'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {convo.channel}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] font-dm text-[#F5EDE4]/70 line-clamp-1">
                      {convo.last_message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#F5EDE4]/40 pt-0.5">
                      {needsHuman ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Human takeover needed</span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          <span>AI Autonomous</span>
                        </span>
                      )}
                      <span>{new Date(convo.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CONVERSATION THREAD (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-[#080402]">
          {activeConvo ? (
            <>
              {/* Chat Header */}
              <div className="p-3.5 sm:p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0C0704]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9B2208] to-[#CD481B] text-white flex items-center justify-center font-syne font-bold text-xs shadow">
                    {activeConvo.customer_name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-syne font-bold text-white">
                        {activeConvo.customer_name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#E58330]">
                        {activeConvo.customer_phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-dm text-[#F5EDE4]/60">
                      <span>Channel: {activeConvo.channel.toUpperCase()}</span>
                      <span>·</span>
                      <span className={activeConvo.needs_human ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                        {activeConvo.needs_human ? '● Escalated to human' : '● AI Handling autonomously'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResolve}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-950/40 text-emerald-300 border border-white/10 text-xs font-syne font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-dm text-xs">
                {activeConvo.messages.map((msg) => {
                  const isCust = msg.sender === 'customer';
                  const isAi = msg.sender === 'ai';
                  const isHuman = msg.sender === 'human';

                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isCust ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[#F5EDE4]/40 mb-1">
                        {isCust && <span>{activeConvo.customer_name}</span>}
                        {isAi && (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Bot className="w-3 h-3" />
                            <span>AI Worker</span>
                          </span>
                        )}
                        {isHuman && (
                          <span className="text-[#E58330] flex items-center gap-1 font-bold">
                            <User className="w-3 h-3" />
                            <span>You (Merchant)</span>
                          </span>
                        )}
                        <span>· {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <div 
                        className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                          isCust
                            ? 'bg-[#150D08] border border-white/10 text-white rounded-tl-sm'
                            : isHuman
                              ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white rounded-tr-sm shadow-md'
                              : 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-100 rounded-tr-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-white/[0.08] bg-[#0C0704] flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message as merchant (pauses AI on this thread)..."
                  className="flex-1 bg-[#130C08] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
                />
                <button
                  type="submit"
                  disabled={isSending || !replyText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#F5EDE4]/50 space-y-2">
              <MessageSquare className="w-12 h-12 text-white/20" />
              <p className="text-xs font-dm">Select a conversation from the left to view customer messages.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
