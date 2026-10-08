import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Bot,
  RefreshCw,
  Zap,
  Tag,
  Clock
} from 'lucide-react';
import { ConnectorType, VisitorVisionContext, AiChatMessage } from '../types/connectors';
import { connectorRegistry } from '../services/connectorRegistry';
import { Product } from '../types/commerce';

interface AiWebBubbleProps {
  connectorType?: ConnectorType;
  visitorContext: VisitorVisionContext;
  onSelectProduct?: (productId: string) => void;
  onCheckoutClick?: (url: string) => void;
  onAddToCart?: (product: Product, variantTitle?: string) => void;
  customCatalog?: Product[];
  storeName?: string;
  businessId?: string;
  isEmbedded?: boolean; // If true, renders as embedded panel instead of fixed floating bubble
}

export const AiWebBubble: React.FC<AiWebBubbleProps> = ({
  connectorType = 'mupezeni',
  visitorContext,
  onSelectProduct,
  onCheckoutClick,
  onAddToCart,
  customCatalog,
  storeName = 'Ernest Sneakers',
  businessId,
  isEmbedded = false
}) => {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasProactiveTriggered, setHasProactiveTriggered] = useState(false);
  const [siteKey, setSiteKey] = useState<string>(`wk_${businessId ? businessId.replace(/[^a-zA-Z0-9]/g, '') : 'default'}`);
  const [isConnectorSyncing, setIsConnectorSyncing] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const connectorInfo = connectorRegistry.getConnectorInfo(connectorType);

  // Initialize Web Connector with FastAPI backend
  useEffect(() => {
    let isMounted = true;
    const initWebConnector = async () => {
      if (businessId) {
        setIsConnectorSyncing(true);
        try {
          const key = await connectorRegistry.ensureWebConnector(businessId);
          if (isMounted) {
            setSiteKey(key);
          }
        } catch (e) {
          console.warn('Could not register web connector with backend:', e);
        } finally {
          if (isMounted) setIsConnectorSyncing(false);
        }
      }
    };
    initWebConnector();
    return () => { isMounted = false; };
  }, [businessId]);

  // Initialize greeting and react to visitor vision changes
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'msg_welcome',
          sender: 'assistant',
          channel: 'web_bubble',
          text: `👋 Hi! I'm your AI Shopping Assistant for **${connectorInfo.storeName}**.\n\nI'm synced live with our inventory via the **${connectorInfo.name}**. How can I help you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            'Do you have size 42 in stock?',
            'What are the delivery times in Lusaka?',
            'Recommend best-selling sneakers'
          ],
          connectorMeta: {
            connectorUsed: connectorType,
            rpcMethod: 'initial_connect',
            latencyMs: connectorInfo.syncLatencyMs
          }
        }
      ]);
    }
  }, [connectorType]);

  // Proactive trigger when customer views a product for more than 4 seconds
  useEffect(() => {
    if (visitorContext.activeProductTitle && !hasProactiveTriggered && visitorContext.dwellTimeSeconds >= 4) {
      setHasProactiveTriggered(true);
      const proactiveMsg: AiChatMessage = {
        id: `proactive_${Date.now()}`,
        sender: 'assistant',
        channel: 'web_bubble',
        text: `👀 I see you're checking out the **${visitorContext.activeProductTitle}** (${connectorInfo.currency} ${visitorContext.activeProductPrice}).\n\nWe currently have **${visitorContext.activeProductStock ?? 4} units** ready for fast dispatch. Would you like me to reserve one or answer any sizing questions?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          `Check available sizes for ${visitorContext.activeProductTitle}`,
          `Generate 1-Click Checkout link`,
          'Ask about return policy'
        ],
        productCard: visitorContext.activeProductId ? {
          id: visitorContext.activeProductId,
          title: visitorContext.activeProductTitle,
          price: visitorContext.activeProductPrice || 0,
          currency: connectorInfo.currency,
          imageUrl: visitorContext.activeProductImage || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
          stockQuantity: visitorContext.activeProductStock || 4,
          inStock: (visitorContext.activeProductStock ?? 1) > 0,
          sku: visitorContext.activeProductSku || 'SKU-LIVE'
        } : undefined,
        connectorMeta: {
          connectorUsed: connectorType,
          rpcMethod: 'visitor_radar_proactive_nudge',
          latencyMs: 16
        }
      };

      setMessages(prev => [...prev, proactiveMsg]);
    }
  }, [visitorContext.dwellTimeSeconds, visitorContext.activeProductTitle, hasProactiveTriggered]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query) return;

    setInputMessage('');
    const userMsg: AiChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      channel: 'web_bubble',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const catalog = customCatalog || await connectorRegistry.getProducts(connectorType);

      // 1. Dispatch inbound message through FastAPI Web Channel Connector (/api/v1/channels/web/{site_key}/messages)
      const inboundMsgId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      connectorRegistry.sendWebInboundMessage(siteKey, {
        session_id: visitorContext.sessionId || 'sess_visitor_live',
        message_id: inboundMsgId,
        content: query
      }).catch(e => console.warn('Web channel connector dispatch:', e));

      // 2. Call AI Worker server backend API matching Customer Revenue Worker pipeline
      const res = await fetch('/api/ai-worker/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'web_bubble',
          connectorType,
          site_key: siteKey,
          business_id: businessId,
          storeName: storeName || connectorInfo.storeName,
          currency: connectorInfo.currency,
          catalog,
          visitorContext,
          message: query,
          history: messages.slice(-5).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AiChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          channel: 'web_bubble',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: data.suggestedActions,
          productCard: data.productCard,
          checkoutLink: data.checkoutLink,
          handoff: data.handoff,
          conversationState: data.conversationState,
          toolCalls: data.toolCalls,
          connectorMeta: data.connectorMeta
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('Chat API returned error');
      }
    } catch (err) {
      console.warn('AI bubble fallback response:', err);
      setTimeout(async () => {
        const liveCatalog = customCatalog || await connectorRegistry.getProducts(connectorType);
        const lowerQ = query.toLowerCase();
        const matched = liveCatalog.find(p => lowerQ.includes(p.name.toLowerCase()) || (p.sku && lowerQ.includes(p.sku.toLowerCase())));
        
        let replyText = '';
        let actions = ['Check Sizes', 'Delivery Times'];
        
        if (matched) {
          const totalStock = matched.variants?.reduce((a, v) => a + (v.stock_quantity || 0), 0) ?? (matched.is_available ? 5 : 0);
          if (matched.is_available && totalStock > 0) {
            replyText = `Yes! We currently have the **${matched.name}** in stock for **${connectorInfo.currency} ${matched.price.toLocaleString()}** (${totalStock} units available). Would you like me to prepare your checkout link?`;
            actions = ['One-Click Checkout', 'Check Delivery Rates'];
          } else {
            replyText = `Unfortunately, the **${matched.name}** is currently **Out of Stock** (0 units remaining). Would you like to check similar available products?`;
            actions = ['View Other Products', 'Notify on Restock'];
          }
        } else if (lowerQ.includes('stock') || lowerQ.includes('have') || lowerQ.includes('available') || lowerQ.includes('got')) {
          const inStock = liveCatalog.filter(p => p.is_available);
          const inStockList = inStock.slice(0, 3).map(p => `• **${p.name}** (${connectorInfo.currency} ${p.price})`).join('\n');
          replyText = `Sorry, we do not currently carry that item in our catalog. Here is what we currently have in stock:\n${inStockList}`;
          actions = inStock.slice(0, 3).map(p => `Check ${p.name}`);
        } else {
          replyText = `Hello! I'm your autonomous assistant for **${connectorInfo.storeName}**. How can I help you today?`;
        }

        setMessages(prev => [
          ...prev,
          {
            id: `fallback_${Date.now()}`,
            sender: 'assistant',
            channel: 'web_bubble',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedActions: actions,
            connectorMeta: {
              connectorUsed: connectorType,
              rpcMethod: 'local_grounded_fallback',
              latencyMs: 12
            }
          }
        ]);
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-[#110B07] border border-white/15 rounded-3xl shadow-2xl overflow-hidden font-dm">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-[#1C1008] via-[#24140B] to-[#160D07] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E58330] to-[#B83A0A] p-0.5 flex items-center justify-center shadow-lg shadow-[#E58330]/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#110B07] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold font-syne text-white">Mupezeni Support AI</h4>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>BACKEND CONNECTOR</span>
              </span>
            </div>
            <p className="text-[10.5px] text-[#F5EDE4]/60 flex items-center gap-1 font-mono truncate max-w-[220px]">
              <Zap className="w-3 h-3 text-[#E58330]" />
              <span className="truncate">Channel: {siteKey}</span>
            </p>
          </div>
        </div>

        {!isEmbedded && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close support chat"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Visitor Vision Radar HUD banner */}
      <div className="px-3.5 py-2 bg-[#090503] border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-[#F5EDE4]/70">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Eye className="w-3.5 h-3.5 text-[#E58330] shrink-0 animate-pulse" />
          <span className="truncate">
            {visitorContext.activeProductTitle 
              ? `Viewing: ${visitorContext.activeProductTitle} (${visitorContext.dwellTimeSeconds}s)`
              : `Browsing: ${visitorContext.activePage}`
            }
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-emerald-400 font-bold">
            {visitorContext.cartItemCount > 0 ? `Cart: ${visitorContext.cartItemCount} item` : 'Cart: Empty'}
          </span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-lg'
                  : 'bg-[#1A100B] border border-white/10 text-[#F5EDE4] shadow-md'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

              {/* Product Card Attachment */}
              {msg.productCard && (
                <div className="mt-2 p-2.5 rounded-xl bg-[#0C0704] border border-white/10 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={msg.productCard.imageUrl} 
                      alt={msg.productCard.title}
                      className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0" 
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="font-syne font-bold text-white text-[11px] truncate">
                        {msg.productCard.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-[#E58330] font-bold">
                          {msg.productCard.currency} {msg.productCard.price.toLocaleString()}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          msg.productCard.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {msg.productCard.inStock ? `${msg.productCard.stockQuantity} in stock` : 'Sold out'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Variants list if available */}
                  {msg.productCard.variants && msg.productCard.variants.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-white/5">
                      <div className="text-[9px] font-mono text-[#F5EDE4]/60 uppercase">Available Sizes / Options:</div>
                      <div className="flex flex-wrap gap-1">
                        {msg.productCard.variants.map((v, vIdx) => (
                          <button
                            key={vIdx}
                            onClick={() => {
                              if (onAddToCart && customCatalog) {
                                const matched = customCatalog.find(p => p.id === msg.productCard?.id);
                                if (matched) onAddToCart(matched, v.title);
                              } else {
                                handleSendMessage(`I want size ${v.title}`);
                              }
                            }}
                            className={`px-2 py-0.5 rounded-md text-[9.5px] font-mono flex items-center gap-1 border transition-all cursor-pointer ${
                              v.stock > 0
                                ? 'bg-[#1F120A] border-[#E58330]/40 text-[#F5EDE4] hover:bg-[#E58330] hover:text-white'
                                : 'bg-white/5 border-white/10 text-white/40 line-through'
                            }`}
                          >
                            <span>{v.title}</span>
                            <span className="text-[8px] opacity-70">({v.stock})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    {onAddToCart && msg.productCard.inStock && (
                      <button
                        onClick={() => {
                          const matched = (customCatalog || []).find(p => p.id === msg.productCard?.id);
                          if (matched) {
                            onAddToCart(matched);
                          } else {
                            handleSendMessage(`Add ${msg.productCard?.title} to my cart`);
                          }
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-syne font-bold text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#E58330]" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleSendMessage(`Prepare checkout for ${msg.productCard?.title}`)}
                      className="flex-1 py-1.5 rounded-lg bg-[#E58330] hover:bg-[#CD481B] text-white font-syne font-bold text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Instant Order</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Human Handoff Card */}
              {msg.handoff && msg.handoff.requested && (
                <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 to-[#120B07] border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-syne font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Human Manager Handoff</span>
                  </div>
                  <p className="text-[10px] font-dm text-[#F5EDE4]/70">
                    {msg.handoff.reason || 'Store management is available on direct phone and WhatsApp.'}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    {msg.handoff.whatsappUrl && (
                      <a
                        href={msg.handoff.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-[10px] flex items-center justify-center gap-1 text-center transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>WhatsApp Owner</span>
                      </a>
                    )}
                    {msg.handoff.contactPhone && (
                      <a
                        href={`tel:${msg.handoff.contactPhone.replace(/[^0-9+]/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-[10px] flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Call</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Direct Checkout Link Card */}
              {msg.checkoutLink && (
                <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 to-[#120B07] border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-syne font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Checkout Session Prepared</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#F5EDE4]/70">
                    Total: <strong className="text-white">{msg.checkoutLink.currency} {msg.checkoutLink.totalAmount.toLocaleString()}</strong> ({msg.checkoutLink.summary})
                  </div>
                  <button
                    onClick={() => {
                      if (onCheckoutClick && msg.checkoutLink) {
                        onCheckoutClick(msg.checkoutLink.url);
                      } else {
                        alert(`Redirecting to secure checkout: ${msg.checkoutLink?.url}`);
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/40 cursor-pointer"
                  >
                    <span>Proceed to 1-Click Pay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between text-[9px] font-mono text-[#F5EDE4]/40 pt-1">
                <span>{msg.timestamp}</span>
                {msg.connectorMeta && (
                  <span className="text-[#E58330]/70">via {msg.connectorMeta.connectorUsed}</span>
                )}
              </div>
            </div>

            {/* Smart Prompt Suggestions */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                {msg.suggestedActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(action)}
                    className="px-2.5 py-1 rounded-full bg-[#180E08] hover:bg-[#25150C] border border-white/10 hover:border-[#E58330]/50 text-[10.5px] text-[#F5EDE4]/85 hover:text-white transition-all text-left flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#E58330]" />
                    <span>{action}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#1A100B] border border-white/10 text-white/60 w-fit">
            <Bot className="w-3.5 h-3.5 text-[#E58330] animate-bounce" />
            <span className="text-[11px] font-mono animate-pulse">AI Worker querying catalog connector...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#160D08] border-t border-white/10">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask about products, stock, or checkout in ${connectorInfo.storeName}...`}
            className="flex-1 bg-[#0B0604] border border-white/15 focus:border-[#E58330] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] disabled:opacity-40 text-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );

  if (isEmbedded) {
    return <div className="w-full h-full min-h-[500px]">{content}</div>;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[360px] sm:w-[400px] h-[580px] max-h-[85vh]"
          >
            {content}
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative p-4 rounded-2xl bg-gradient-to-br from-[#9B2208] via-[#B83A0A] to-[#E58330] text-white shadow-2xl shadow-[#9B2208]/40 border border-white/20 flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#9B2208] animate-ping" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold font-syne">Ask AI Support</div>
              <div className="text-[10px] text-white/80 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Connected & Tracking</span>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
