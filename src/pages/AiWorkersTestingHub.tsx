import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Plug, 
  MessageSquare, 
  Globe, 
  Cpu, 
  ShoppingBag, 
  Eye, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink,
  Sliders,
  Database,
  Search,
  Plus,
  Minus,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  Store as StoreIcon,
  ShieldCheck,
  Code
} from 'lucide-react';
import { ConnectorType, VisitorVisionContext, ConnectorRpcLog, ConnectorInfo } from '../types/connectors';
import { connectorRegistry } from '../services/connectorRegistry';
import { Product, ProductVariant } from '../types/commerce';
import { AiWebBubble } from '../components/AiWebBubble';
import { WhatsAppSimulator } from '../components/WhatsAppSimulator';
import { PageId } from '../types';

interface AiWorkersTestingHubProps {
  onNavigate: (page: PageId) => void;
}

export const AiWorkersTestingHub: React.FC<AiWorkersTestingHubProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'web_bubble' | 'whatsapp' | 'rpc_logs'>('web_bubble');
  const [selectedConnector, setSelectedConnector] = useState<ConnectorType>('mupezeni');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [simulatedCart, setSimulatedCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [dwellTime, setDwellTime] = useState(0);
  const [logs, setLogs] = useState<ConnectorRpcLog[]>([]);
  const [stockEditProduct, setStockEditProduct] = useState<Product | null>(null);
  const [newStockValue, setNewStockValue] = useState<number>(0);

  // Load connector products and subscribe to RPC logs
  useEffect(() => {
    connectorRegistry.setActiveConnectorType(selectedConnector);
    const loadProducts = async () => {
      const prods = await connectorRegistry.getProducts(selectedConnector);
      setProducts(prods);
      if (prods.length > 0) {
        setSelectedProduct(prods[0]);
      } else {
        setSelectedProduct(null);
      }
    };
    loadProducts();
    setDwellTime(0);

    const unsubscribe = connectorRegistry.onLogsChange((updatedLogs) => {
      setLogs([...updatedLogs]);
    });
    setLogs(connectorRegistry.getRpcLogs());

    return () => unsubscribe();
  }, [selectedConnector]);

  // Track dwell time on selected product
  useEffect(() => {
    const timer = setInterval(() => {
      setDwellTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedProduct]);

  // Dispatch visitor vision signal when active product or cart changes
  useEffect(() => {
    const cartTotal = simulatedCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const cartCount = simulatedCart.reduce((sum, item) => sum + item.quantity, 0);

    const visionContext: VisitorVisionContext = {
      sessionId: 'sess_live_visitor_88',
      activePage: selectedProduct ? `Product: ${selectedProduct.name}` : 'Catalog Home',
      activeProductId: selectedProduct?.id,
      activeProductTitle: selectedProduct?.name,
      activeProductPrice: selectedProduct?.price,
      activeProductSku: selectedProduct?.sku,
      activeProductCategory: selectedProduct?.category,
      activeProductStock: selectedProduct?.variants && selectedProduct.variants.length > 0
        ? selectedProduct.variants.reduce((a, v) => a + v.stock_quantity, 0)
        : 5,
      activeProductImage: selectedProduct?.image_url,
      dwellTimeSeconds: dwellTime,
      scrollDepthPercent: 65,
      cartItemCount: cartCount,
      cartTotal: cartTotal,
      recentSearches: [selectedProduct?.category || 'Footwear', 'Lusaka delivery'],
      visitorLocation: 'Lusaka, Zambia',
      referrerSource: 'Instagram Ad Campaign'
    };

    connectorRegistry.dispatchVisitorSignal(visionContext, selectedConnector);
  }, [selectedProduct, simulatedCart, dwellTime, selectedConnector]);

  const connectorInfo = connectorRegistry.getConnectorInfo(selectedConnector);
  const allConnectors = connectorRegistry.getAllConnectorInfos();

  const handleAddToCart = (product: Product) => {
    setSimulatedCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateStock = (productId: string, qty: number) => {
    connectorRegistry.updateProductStock(productId, qty, undefined, selectedConnector);
    const updatedProds = products.map(p => {
      if (p.id === productId) {
        if (p.variants && p.variants.length > 0) {
          p.variants[0].stock_quantity = qty;
        }
        p.is_available = qty > 0;
      }
      return p;
    });
    setProducts([...updatedProds]);
    setStockEditProduct(null);
  };

  const currentCartTotal = simulatedCart.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
  const currentCartCount = simulatedCart.reduce((sum, it) => sum + it.quantity, 0);

  const visitorVisionContext: VisitorVisionContext = {
    sessionId: 'sess_live_visitor_88',
    activePage: selectedProduct ? `Product: ${selectedProduct.name}` : 'Catalog Home',
    activeProductId: selectedProduct?.id,
    activeProductTitle: selectedProduct?.name,
    activeProductPrice: selectedProduct?.price,
    activeProductSku: selectedProduct?.sku,
    activeProductCategory: selectedProduct?.category,
    activeProductStock: selectedProduct?.variants && selectedProduct.variants.length > 0
      ? selectedProduct.variants.reduce((a, v) => a + v.stock_quantity, 0)
      : (selectedProduct?.is_available ? 5 : 0),
    activeProductImage: selectedProduct?.image_url,
    dwellTimeSeconds: dwellTime,
    scrollDepthPercent: 65,
    cartItemCount: currentCartCount,
    cartTotal: currentCartTotal,
    recentSearches: ['ZMW Sneakers', 'Lusaka Delivery'],
    visitorLocation: 'Lusaka, Zambia',
    referrerSource: 'Direct Storefront'
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#070403] text-[#FAFAF9] font-dm pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Top Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58330]/15 border border-[#E58330]/30 text-[#E58330] text-xs font-mono font-semibold">
              <Bot className="w-3.5 h-3.5" />
              <span>AI WORKFORCE & CONNECTOR INTEGRATION LAB</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9] tracking-tight">
              Test AI Workers with Unified Connectors
            </h1>
            <p className="text-sm sm:text-base text-[#F5EDE4]/75 max-w-3xl leading-relaxed">
              Every store on Mupezeni—whether a native Mupezeni storefront or an external store (Shopify, WooCommerce, WhatsApp DM Catalog, or Custom ERP)—uses the <strong>exact same unified connector pipeline</strong>. Test how Support and Sales AI workers see visitor browsing behavior and respond to real-time catalog queries.
            </p>

            {/* Live LLM & Backend Engine Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Render Backend LLM: Online</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E58330]/10 border border-[#E58330]/30 text-[#E58330]">
                <span>Supabase Database: Configured</span>
              </div>

              <div className="text-[11px] text-[#F5EDE4]/50">
                URL: <code className="text-white">mupezeni-ai.onrender.com</code> (Zero Gemini dependency)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs border border-white/10 transition-colors cursor-pointer"
            >
              Merchant Dashboard
            </button>
            <button
              onClick={() => onNavigate('storefront')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs shadow-lg shadow-[#9B2208]/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>View Live Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================= CONNECTOR SWITCHER BAR ================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-[#E58330] uppercase tracking-wider flex items-center gap-2">
              <Plug className="w-4 h-4" />
              <span>Select Active Store Commerce Connector:</span>
            </label>
            <span className="text-[11px] font-mono text-[#F5EDE4]/60">
              Ping Latency: <strong className="text-emerald-400">{connectorInfo.syncLatencyMs}ms</strong> • Status: <strong className="text-emerald-400 uppercase">ONLINE</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {allConnectors.map((c) => {
              const isSelected = selectedConnector === c.type;
              return (
                <button
                  key={c.type}
                  onClick={() => setSelectedConnector(c.type)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-[#1C1008] border-[#E58330] shadow-lg shadow-[#E58330]/15'
                      : 'bg-[#100A06] border-white/10 hover:border-white/20 hover:bg-[#150D08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-[#E58330]">
                      {c.type === 'mupezeni' ? 'NATIVE' : 'CONNECTOR'}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 animate-ping' : 'bg-white/20'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-syne text-white truncate">{c.name.split(' ')[0]}</h4>
                    <p className="text-[10px] text-[#F5EDE4]/60 truncate font-mono">{c.currency} • {c.totalProducts} products</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Connector Active Summary Banner */}
        <div className="p-4 rounded-2xl bg-[#140C07] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E58330]/20 border border-[#E58330]/40 flex items-center justify-center text-[#E58330]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-syne font-bold text-sm flex items-center gap-2">
                <span>{connectorInfo.storeName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {connectorInfo.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#F5EDE4]/60 font-dm">
                {connectorInfo.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {connectorInfo.supportedFeatures.map((f, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10.5px] text-white/80">
                ✓ {f}
              </span>
            ))}
          </div>
        </div>

        {/* ================= TEST MODES TABS ================= */}
        <div className="flex border-b border-white/10 gap-2">
          <button
            onClick={() => setActiveTab('web_bubble')}
            className={`px-5 py-3 text-xs sm:text-sm font-syne font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'web_bubble'
                ? 'border-[#E58330] text-[#E58330] bg-[#E58330]/10 rounded-t-xl'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Mode 1: Web Bubble Support AI (with Visitor Tracking Vision)</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-5 py-3 text-xs sm:text-sm font-syne font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'border-[#00A884] text-[#00A884] bg-[#00A884]/10 rounded-t-xl'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mode 2: WhatsApp Commerce Sales AI Worker</span>
          </button>

          <button
            onClick={() => setActiveTab('rpc_logs')}
            className={`px-5 py-3 text-xs sm:text-sm font-syne font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'rpc_logs'
                ? 'border-indigo-400 text-indigo-400 bg-indigo-500/10 rounded-t-xl'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Mode 3: Connector RPC Stream & Inventory Modifier ({logs.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: WEB BUBBLE WITH VISITOR VISION ================= */}
        {activeTab === 'web_bubble' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Side: Interactive Storefront Simulation (6 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-4 sm:p-6 rounded-3xl bg-[#110B07] border border-white/10 space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <StoreIcon className="w-5 h-5 text-[#E58330]" />
                    <h3 className="font-syne font-bold text-base text-white">
                      Live Store Browser: {connectorInfo.storeName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2 py-1 rounded bg-[#E58330]/20 text-[#E58330] font-bold">
                      Cart: {currentCartCount} item ({connectorInfo.currency} {currentCartTotal})
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#F5EDE4]/70">
                  Click on any product below to simulate a website visitor browsing. Notice how the <strong>Support AI on the right automatically senses which item you are inspecting, your dwell time, and your cart contents</strong>!
                </p>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                        selectedCategory === c
                          ? 'bg-[#E58330] text-white font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-[#F5EDE4]/70'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => {
                    const isSelected = selectedProduct?.id === p.id;
                    const totalStock = p.variants && p.variants.length > 0 
                      ? p.variants.reduce((a, v) => a + v.stock_quantity, 0)
                      : (p.is_available ? 5 : 0);

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          setDwellTime(0);
                        }}
                        className={`rounded-2xl border p-3.5 space-y-3 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#1D1109] border-[#E58330] ring-1 ring-[#E58330]'
                            : 'bg-[#0E0805] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
                            <img 
                              src={p.image_url} 
                              alt={p.name}
                              className="w-full h-full object-cover" 
                            />
                            <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              totalStock > 0 ? 'bg-emerald-500/80 text-white' : 'bg-rose-500/80 text-white'
                            }`}>
                              {totalStock > 0 ? `${totalStock} in stock` : 'Out of stock'}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-syne font-bold text-sm text-white line-clamp-1">{p.name}</h4>
                            <p className="text-[11px] text-[#F5EDE4]/60 line-clamp-2 mt-0.5">{p.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="font-mono text-xs font-bold text-[#E58330]">
                            {p.currency} {p.price.toLocaleString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(p);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#E58330] hover:text-white text-xs font-syne font-bold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Visitor Vision Radar Inspector Card */}
                {selectedProduct && (
                  <div className="p-4 rounded-2xl bg-[#090503] border border-[#E58330]/30 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#E58330] font-bold text-[11px]">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 animate-pulse" />
                        <span>ACTIVE VISITOR VISION TELEMETRY:</span>
                      </span>
                      <span>Dwell Time: {dwellTime}s</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px] text-[#F5EDE4]/70">
                      <div>Product: <strong className="text-white truncate block">{selectedProduct.name}</strong></div>
                      <div>SKU: <strong className="text-white block">{selectedProduct.sku}</strong></div>
                      <div>Price: <strong className="text-[#E58330] block">{selectedProduct.currency} {selectedProduct.price}</strong></div>
                      <div>Radar Signal: <strong className="text-emerald-400 block">Active Tracking</strong></div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Side: Embedded Live Web Bubble AI Worker (5 cols) */}
            <div className="lg:col-span-5 h-[620px]">
              <AiWebBubble 
                connectorType={selectedConnector}
                visitorContext={visitorVisionContext}
                customCatalog={products}
                storeName={connectorInfo.storeName}
                isEmbedded={true}
                onCheckoutClick={(url) => {
                  alert(`1-Click Checkout Session Link Dispatched:\n${url}\n(Customer completes purchase through connector pipeline!)`);
                }}
              />
            </div>

          </div>
        )}

        {/* ================= TAB 2: WHATSAPP COMMERCE SALES AI ================= */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Side: WhatsApp Phone Simulator (5 cols) */}
            <div className="lg:col-span-6 flex justify-center">
              <WhatsAppSimulator 
                connectorType={selectedConnector}
                customCatalog={products}
                storeName={connectorInfo.storeName}
                onSimulateOrder={(pName, amt) => {
                  alert(`WhatsApp Order Dispatched:\nItem: ${pName}\nAmount: ${connectorInfo.currency} ${amt}\nAI Worker logged order payload in connector stream.`);
                }}
              />
            </div>

            {/* Right Side: Real-World Test Scenarios & Catalog Queries (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-3xl bg-[#110B07] border border-white/10 space-y-5">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#00A884] font-mono text-xs font-bold">
                    <Zap className="w-4 h-4" />
                    <span>AUTONOMOUS WHATSAPP COMMERCE SCENARIOS</span>
                  </div>
                  <h3 className="text-xl font-bold font-syne text-white">
                    Simulate Real WhatsApp Customer Questions
                  </h3>
                  <p className="text-xs text-[#F5EDE4]/70">
                    Retail customers on WhatsApp expect instant stock checks, photos, and direct payment links. Click any test scenario to see the AI query the live connector catalog and respond within milliseconds.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: '1. Inquire about in-stock sizes',
                      query: `Hi, do you have ${products[0]?.name || 'the sneaker'} in size 42 in stock?`,
                      desc: 'Tests variant stock lookup and multi-variant availability check.'
                    },
                    {
                      title: '2. Delivery fees and Lusaka dispatch',
                      query: 'How much is delivery to Woodlands, Lusaka and when can I receive it?',
                      desc: 'Tests local delivery policy grounding and dispatch times.'
                    },
                    {
                      title: '3. Instant purchase & Mobile Money link',
                      query: `I want to order 2 units of ${products[0]?.name || 'this item'}. Please send me the payment link.`,
                      desc: 'Tests instant checkout session generation with total calculation.'
                    },
                    {
                      title: '4. Product recommendations by category',
                      query: 'What do you recommend for daily active wear under 1000 Kwacha?',
                      desc: 'Tests price filtering and product curation from active catalog.'
                    }
                  ].map((sc, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-2xl bg-[#090503] border border-white/10 hover:border-[#00A884]/40 space-y-2 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-syne font-bold text-xs text-white">{sc.title}</h4>
                        <span className="text-[10px] font-mono text-[#00A884]">Live Grounded</span>
                      </div>
                      <p className="text-[11px] text-[#F5EDE4]/60 font-dm">{sc.desc}</p>
                      <div className="p-2.5 rounded-xl bg-[#111B21] text-xs font-mono text-[#00A884] border border-[#222E35]">
                        "{sc.query}"
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: CONNECTOR RPC STREAM & INVENTORY MODIFIER ================= */}
        {activeTab === 'rpc_logs' && (
          <div className="space-y-6">
            
            {/* Real-time Inventory Modifier Tool */}
            <div className="p-6 rounded-3xl bg-[#110B07] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-syne font-bold text-lg text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#E58330]" />
                    <span>Live Catalog Stock Modifier (Test Out-of-Stock Reactions)</span>
                  </h3>
                  <p className="text-xs text-[#F5EDE4]/70 mt-0.5">
                    Dynamically change the stock of any item in the active connector. When you ask the AI in the Web Bubble or WhatsApp after setting stock to 0, it will immediately alert the customer that the item is sold out!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((p) => {
                  const currentStock = p.variants && p.variants.length > 0 
                    ? p.variants[0].stock_quantity 
                    : (p.is_available ? 5 : 0);

                  return (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#090503] border border-white/10 space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <h4 className="font-syne font-bold text-xs text-white truncate">{p.name}</h4>
                          <span className="text-[10px] font-mono text-[#E58330]">{p.currency} {p.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-xs">
                        <span className="text-white/60">Stock: <strong className={currentStock > 0 ? 'text-emerald-400' : 'text-rose-400'}>{currentStock} units</strong></span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleUpdateStock(p.id, 0)}
                            className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-[10px] font-bold cursor-pointer"
                          >
                            Set 0 (Sold Out)
                          </button>
                          <button
                            onClick={() => handleUpdateStock(p.id, 10)}
                            className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 text-[10px] font-bold cursor-pointer"
                          >
                            Set 10
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live RPC Trace Log */}
            <div className="p-6 rounded-3xl bg-[#0C0704] border border-white/10 space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-syne font-bold text-base text-white">
                    Live Connector Event Stream & RPC Dispatch Log
                  </h3>
                </div>
                <span className="text-xs text-white/50">{logs.length} events tracked</span>
              </div>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto custom-scrollbar text-xs">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-[#110B07] border border-white/5 space-y-1.5 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase text-[10px]">
                          {log.action}
                        </span>
                        <span className="text-white font-bold">{log.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/50 text-[10px]">
                        <span>{log.durationMs}ms</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] pt-1">
                      <div className="p-2 rounded bg-black/40 text-white/70 overflow-x-auto">
                        <span className="text-white/40 block">Payload:</span>
                        <code>{JSON.stringify(log.payload)}</code>
                      </div>
                      <div className="p-2 rounded bg-black/40 text-emerald-400/80 overflow-x-auto">
                        <span className="text-white/40 block">Response:</span>
                        <code>{JSON.stringify(log.response)}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
