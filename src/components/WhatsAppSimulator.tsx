import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  CheckCheck, 
  ShoppingBag, 
  ArrowRight, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic, 
  ShieldCheck, 
  Zap, 
  Package, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { ConnectorType, AiChatMessage } from '../types/connectors';
import { connectorRegistry } from '../services/connectorRegistry';
import { Product } from '../types/commerce';

interface WhatsAppSimulatorProps {
  connectorType?: ConnectorType;
  customCatalog?: Product[];
  storeName?: string;
  businessId?: string;
  phone?: string;
  onSimulateOrder?: (productName: string, amount: number) => void;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  connectorType = 'mupezeni',
  customCatalog,
  storeName,
  businessId,
  phone = '+260 77 609 1393',
  onSimulateOrder
}) => {
  const connectorInfo = connectorRegistry.getConnectorInfo(connectorType);
  const activeStoreName = storeName || connectorInfo.storeName;

  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize WhatsApp chat with connector greeting
  useEffect(() => {
    setMessages([
      {
        id: 'wa_init',
        sender: 'assistant',
        channel: 'whatsapp',
        text: `*Hello! Welcome to ${activeStoreName}* 🛍️\n\nI am your 24/7 WhatsApp AI Commerce Assistant connected directly to our store catalog via *${connectorInfo.name}*.\n\nYou can ask for prices, check live size/color inventory, or order directly here!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'What products are in stock right now?',
          'Do you have sneakers in size 42?',
          'How much is delivery to East Park, Lusaka?'
        ],
        connectorMeta: {
          connectorUsed: connectorType,
          rpcMethod: 'whatsapp_session_start',
          latencyMs: 18
        }
      }
    ]);
  }, [connectorType, activeStoreName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query) return;

    setInputMessage('');
    const userMsg: AiChatMessage = {
      id: `user_wa_${Date.now()}`,
      sender: 'user',
      channel: 'whatsapp',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const catalog = customCatalog || await connectorRegistry.getProducts(connectorType);

      const res = await fetch('/api/ai-worker/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'whatsapp',
          connectorType,
          business_id: businessId,
          storeName: activeStoreName,
          currency: connectorInfo.currency,
          catalog,
          message: query,
          history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AiChatMessage = {
          id: `ai_wa_${Date.now()}`,
          sender: 'assistant',
          channel: 'whatsapp',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: data.suggestedActions,
          productCard: data.productCard,
          checkoutLink: data.checkoutLink,
          connectorMeta: data.connectorMeta
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('WhatsApp chat API error');
      }
    } catch (err) {
      console.warn('WhatsApp fallback response error:', err);
      setTimeout(async () => {
        const liveCatalog = customCatalog || await connectorRegistry.getProducts(connectorType);
        const lowerQ = query.toLowerCase();
        const matched = liveCatalog.find(p => lowerQ.includes(p.name.toLowerCase()) || (p.sku && lowerQ.includes(p.sku.toLowerCase())));
        
        let replyText = '';
        let actions = ['Check Sizes', 'Delivery Times'];
        
        if (matched) {
          const totalStock = matched.variants?.reduce((a, v) => a + (v.stock_quantity || 0), 0) ?? (matched.is_available ? 5 : 0);
          if (matched.is_available && totalStock > 0) {
            replyText = `*In Stock* ✅\n\n*${matched.name}* is available in stock for *${connectorInfo.currency} ${matched.price.toLocaleString()}* (${totalStock} units available). Would you like to proceed with payment?`;
            actions = ['Send Payment Link', 'Check Sizing'];
          } else {
            replyText = `*Out of Stock* ❌\n\nSorry, *${matched.name}* is currently sold out. We will notify you when we restock!`;
            actions = ['View Other Products', 'Notify on Restock'];
          }
        } else if (lowerQ.includes('stock') || lowerQ.includes('have') || lowerQ.includes('available') || lowerQ.includes('got')) {
          const inStock = liveCatalog.filter(p => p.is_available);
          const inStockList = inStock.slice(0, 3).map(p => `• *${p.name}* (${connectorInfo.currency} ${p.price})`).join('\n');
          replyText = `*Item Not Found* 🔍\n\nSorry, we do not currently carry that item in our catalog. Here is what we have in stock:\n${inStockList}`;
          actions = inStock.slice(0, 3).map(p => `Buy ${p.name}`);
        } else {
          replyText = `Hello! 👋 How can I assist you with sizes, stock availability, or delivery today?`;
        }

        setMessages(prev => [
          ...prev,
          {
            id: `fallback_wa_${Date.now()}`,
            sender: 'assistant',
            channel: 'whatsapp',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedActions: actions,
            connectorMeta: {
              connectorUsed: connectorType,
              rpcMethod: 'wa_grounded_fallback',
              latencyMs: 15
            }
          }
        ]);
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0B141A] border border-[#222E35] rounded-3xl shadow-2xl overflow-hidden font-dm flex flex-col h-[640px]">
      
      {/* WhatsApp Green App Bar */}
      <div className="bg-[#202C33] px-4 py-3 text-white flex items-center justify-between border-b border-[#2A3942]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00A884] to-[#25D366] flex items-center justify-center font-bold text-white shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A884] rounded-full border-2 border-[#202C33]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-syne font-bold text-sm text-white truncate max-w-[170px]">
                {activeStoreName}
              </h4>
              <ShieldCheck className="w-4 h-4 text-[#00A884] shrink-0" />
            </div>
            <p className="text-[11px] text-[#8696A0] font-mono flex items-center gap-1">
              <span>Verified Store AI • {connectorInfo.name.split(' ')[0]}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[#AEBAC1]">
          <button className="hover:text-white p-1" aria-label="Call"><Phone className="w-4 h-4" /></button>
          <button className="hover:text-white p-1" aria-label="Video"><Video className="w-4 h-4" /></button>
          <button className="hover:text-white p-1" aria-label="Menu"><MoreVertical className="w-4 h-4" /></button>
        </div>
      </div>

      {/* WhatsApp Message Canvas with Subtle Chat Wallpaper Pattern */}
      <div className="flex-1 bg-[#0B141A] p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs relative">
        <div className="text-center my-1">
          <span className="px-2.5 py-1 rounded-lg bg-[#182229] text-[#8696A0] text-[10px] font-mono border border-[#222E35]">
            🔒 Messages synced live with {connectorInfo.name}
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 shadow-md space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-[#005C4B] text-[#E9EDEF] rounded-tr-none'
                  : 'bg-[#202C33] text-[#D1D7DB] rounded-tl-none border border-[#2A3942]'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line text-[12.5px] font-dm">
                {msg.text}
              </p>

              {/* WhatsApp Product Card Attachment */}
              {msg.productCard && (
                <div className="mt-2 rounded-xl bg-[#111B21] border border-[#2A3942] overflow-hidden">
                  <img 
                    src={msg.productCard.imageUrl} 
                    alt={msg.productCard.title}
                    className="w-full h-32 object-cover" 
                  />
                  <div className="p-2.5 space-y-1.5">
                    <div className="font-syne font-bold text-white text-xs">
                      {msg.productCard.title}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#00A884] font-bold">
                        {msg.productCard.currency} {msg.productCard.price.toLocaleString()}
                      </span>
                      <span className="text-[#8696A0]">
                        SKU: {msg.productCard.sku}
                      </span>
                    </div>

                    {msg.productCard.variants && msg.productCard.variants.length > 0 && (
                      <div className="text-[10px] text-[#8696A0] pt-1">
                        Variants in stock: {msg.productCard.variants.map(v => `${v.title} (${v.stock})`).join(' • ')}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        handleSendMessage(`I'd like to purchase ${msg.productCard?.title}. Please send checkout link.`);
                        if (onSimulateOrder && msg.productCard) {
                          onSimulateOrder(msg.productCard.title, msg.productCard.price);
                        }
                      }}
                      className="w-full py-1.5 rounded-lg bg-[#00A884] hover:bg-[#009272] text-[#111B21] font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}

              {/* WhatsApp Payment / Checkout Link card */}
              {msg.checkoutLink && (
                <div className="mt-2 p-2.5 rounded-xl bg-[#111B21] border border-[#00A884]/40 space-y-1.5">
                  <div className="text-[#00A884] font-syne font-bold text-xs flex items-center gap-1">
                    <span>⚡ Direct Order Payment Link</span>
                  </div>
                  <div className="text-[11px] text-[#8696A0] font-mono">
                    Total: <strong className="text-white">{msg.checkoutLink.currency} {msg.checkoutLink.totalAmount.toLocaleString()}</strong>
                  </div>
                  <a
                    href={msg.checkoutLink.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Direct 1-Click Pay link opened: ${msg.checkoutLink?.url}\nCustomer completes purchase in 1 tap!`);
                    }}
                    className="block w-full py-1.5 text-center rounded-lg bg-gradient-to-r from-[#00A884] to-[#25D366] text-[#111B21] font-syne font-bold text-xs cursor-pointer shadow-md"
                  >
                    Pay & Confirm Delivery Now
                  </a>
                </div>
              )}

              <div className="flex items-center justify-end gap-1 text-[9px] text-[#8696A0] pt-0.5 font-mono">
                <span>{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />}
              </div>
            </div>

            {/* WhatsApp Quick Action Chips */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                {msg.suggestedActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(action)}
                    className="px-2.5 py-1 rounded-full bg-[#182229] hover:bg-[#202C33] border border-[#2A3942] hover:border-[#00A884]/50 text-[10.5px] text-[#00A884] hover:text-white transition-all text-left cursor-pointer"
                  >
                    💬 {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#202C33] border border-[#2A3942] text-[#8696A0] w-fit">
            <span className="text-xs font-mono animate-pulse">Assistant typing & checking catalog...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* WhatsApp Input Footer */}
      <div className="bg-[#202C33] p-2.5 flex items-center gap-2 border-t border-[#2A3942]">
        <button className="text-[#8696A0] hover:text-white p-1" aria-label="Emoji"><Smile className="w-5 h-5" /></button>
        <button className="text-[#8696A0] hover:text-white p-1" aria-label="Attachment"><Paperclip className="w-5 h-5" /></button>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex-1 flex items-center"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message or ask for product..."
            className="w-full bg-[#2A3942] text-white placeholder:text-[#8696A0] text-xs rounded-xl px-3.5 py-2.5 outline-none focus:ring-1 focus:ring-[#00A884]"
          />
        </form>

        {inputMessage.trim() ? (
          <button
            onClick={() => handleSendMessage()}
            className="w-9 h-9 rounded-full bg-[#00A884] hover:bg-[#009272] text-[#111B21] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button className="w-9 h-9 rounded-full bg-[#2A3942] text-[#8696A0] hover:text-white flex items-center justify-center" aria-label="Mic">
            <Mic className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
