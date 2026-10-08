import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Phone, 
  MapPin, 
  Store as StoreIcon, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  MessageSquare,
  Search,
  ExternalLink,
  Layers,
  AlertCircle,
  Copy,
  ChevronRight
} from 'lucide-react';
import { apiClient, formatMinorUnits } from '../services/apiClient';
import { PageId } from '../types';

interface StorefrontPageProps {
  slug?: string;
  onNavigate?: (page: PageId) => void;
}

interface PublicStore {
  id: string;
  business_id: string;
  name: string;
  slug: string;
  logo_url?: string;
  colors?: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
  about?: string;
  description?: string;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  contact_phone?: string;
  contact_email?: string;
  is_published?: boolean;
}

interface PublicProductVariant {
  id: string;
  title: string;
  sku?: string;
  price_override?: number;
  stock_quantity?: number;
  is_available?: boolean;
}

interface PublicProduct {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  price: number; // In minor units (or major units depending on source, normalized below)
  currency?: string;
  image_url: string;
  sku?: string;
  category?: string;
  is_available?: boolean;
  has_variants?: boolean;
  variants?: PublicProductVariant[];
}

interface CartItem {
  product: PublicProduct;
  variant?: PublicProductVariant;
  quantity: number;
}

export const StorefrontPage: React.FC<StorefrontPageProps> = ({ 
  slug = '',
  onNavigate 
}) => {
  // Determine effective slug from prop or URL pathname
  const effectiveSlug = (() => {
    if (slug) return slug;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (path.startsWith('s/')) return path.substring(2);
    if (path.startsWith('storefront/')) return path.substring(11);
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('slug') || 'lsk-urban-boutique';
  })();

  const [store, setStore] = useState<PublicStore | null>(null);
  const [businessData, setBusinessData] = useState<any>(null);
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Search & Category
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Product Details Modal: GET /public/stores/{slug}/products/{productSlug}
  const [selectedProduct, setSelectedProduct] = useState<PublicProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<PublicProductVariant | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [isLoadingProductDetail, setIsLoadingProductDetail] = useState(false);

  // Cart & Checkout
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  // Checkout Form fields
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Lusaka Express Dispatch (ZMW 45)');
  const [deliveryFeeMinor, setDeliveryFeeMinor] = useState(4500); // 45 ZMW in minor units
  const [paymentMethod, setPaymentMethod] = useState('Airtel / MTN Mobile Money');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Fetch store and products using ONLY public endpoints:
  // 1. GET /public/stores/{slug}
  // 2. GET /public/stores/{slug}/products
  const loadPublicStoreData = async (targetSlug: string) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      // 1. GET /public/stores/{slug}
      const storeRes = await apiClient.getPublicStore(targetSlug);
      if (!storeRes?.store) {
        throw new Error(`Store "${targetSlug}" was not found or is not yet published.`);
      }

      setStore(storeRes.store);
      setBusinessData(storeRes.business || null);

      // 2. GET /public/stores/{slug}/products
      try {
        const prodRes = await apiClient.getPublicProducts(targetSlug);
        setProducts(prodRes?.products || []);
      } catch (prodErr) {
        console.warn('Public products fetch note:', prodErr);
      }
    } catch (err: any) {
      console.warn('Public store error:', err);
      setLoadError(err?.message || 'Could not load store. Please verify store link.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (effectiveSlug) {
      loadPublicStoreData(effectiveSlug);
    }
  }, [effectiveSlug]);

  // Load product detail via GET /public/stores/{slug}/products/{productSlug}
  const handleOpenProductDetail = async (prod: PublicProduct) => {
    setSelectedProduct(prod);
    setModalQty(1);
    setSelectedVariant(prod.variants?.[0] || null);

    // Call individual product public endpoint
    setIsLoadingProductDetail(true);
    try {
      const singleRes = await apiClient.getPublicProduct(effectiveSlug, prod.id);
      if (singleRes?.product) {
        setSelectedProduct(singleRes.product);
        if (singleRes.product.variants && singleRes.product.variants.length > 0) {
          setSelectedVariant(singleRes.product.variants[0]);
        }
      }
    } catch (err) {
      console.warn('Product single fetch note:', err);
    } finally {
      setIsLoadingProductDetail(false);
    }
  };

  // Helper: Normalize product price into minor units
  const getProductPriceMinor = (product: PublicProduct, variant?: PublicProductVariant): number => {
    if (variant?.price_override != null) {
      return variant.price_override > 1000 ? variant.price_override : variant.price_override * 100;
    }
    return product.price > 1000 ? product.price : product.price * 100;
  };

  // Add item to cart
  const handleAddToCart = (product: PublicProduct, variant?: PublicProductVariant, qty = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        (variant ? item.variant?.id === variant.id : !item.variant)
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      }
      return [...prev, { product, variant, quantity: qty }];
    });

    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Quantity modifier in cart
  const updateCartQty = (idx: number, delta: number) => {
    setCart(prev => {
      const copy = [...prev];
      const newQty = copy[idx].quantity + delta;
      if (newQty <= 0) {
        return copy.filter((_, i) => i !== idx);
      }
      copy[idx].quantity = newQty;
      return copy;
    });
  };

  // Cart Calculations
  const currency = businessData?.currency || 'ZMW';
  const cartSubtotalMinor = cart.reduce((acc, item) => {
    return acc + getProductPriceMinor(item.product, item.variant) * item.quantity;
  }, 0);
  const cartTotalMinor = cartSubtotalMinor + (cart.length > 0 ? deliveryFeeMinor : 0);
  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  // Generate WhatsApp Order Link Fallback
  const generateWhatsAppOrderLink = (itemsToOrder?: CartItem[]): string => {
    const targetItems = itemsToOrder || cart;
    const storePhone = store?.contact?.phone || store?.contact_phone || businessData?.phone || '+260 77 609 1393';
    const cleanPhone = storePhone.replace(/[^0-9]/g, '');

    const lines = targetItems.map(item => {
      const priceMinor = getProductPriceMinor(item.product, item.variant);
      const varInfo = item.variant?.title ? ` (${item.variant.title})` : '';
      return `• ${item.quantity}x ${item.product.name}${varInfo} — ${formatMinorUnits(priceMinor, currency)}`;
    }).join('\n');

    const subtotalText = formatMinorUnits(cartSubtotalMinor, currency);
    const totalText = formatMinorUnits(cartTotalMinor, currency);

    const message = 
`Hello *${store?.name || 'Store'}*! 👋
I would like to place an order via your online store:

*Order Items:*
${lines || '• (No items selected)'}

*Subtotal:* ${subtotalText}
*Delivery Fee:* ${formatMinorUnits(deliveryFeeMinor, currency)} (${deliveryOption})
*Estimated Total:* ${totalText}

*Delivery Details:*
👤 Name: ${custName || 'Shopper'}
📞 Phone: ${custPhone || storePhone}
📍 Address: ${custAddress || 'Lusaka, Zambia'}
💳 Payment: ${paymentMethod}${orderNotes ? `\n📝 Note: ${orderNotes}` : ''}

Please confirm product availability and dispatch schedule. Thank you!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Direct WhatsApp order for a single product
  const handleSingleProductWhatsAppOrder = (prod: PublicProduct, variant?: PublicProductVariant, qty = 1) => {
    const storePhone = store?.contact?.phone || store?.contact_phone || businessData?.phone || '+260 77 609 1393';
    const cleanPhone = storePhone.replace(/[^0-9]/g, '');
    const priceMinor = getProductPriceMinor(prod, variant);
    const varText = variant?.title ? ` (Variant: ${variant.title})` : '';

    const message = 
`Hello *${store?.name || 'Store'}*! 👋
I would like to order:

• *${qty}x ${prod.name}*${varText}
• *Price:* ${formatMinorUnits(priceMinor * qty, currency)}

Please let me know how to proceed with payment and delivery. Thank you!`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Submit Checkout: POST /public/stores/{slug}/checkout
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim()) {
      setCheckoutError('Please provide your name and phone number for delivery.');
      return;
    }
    if (cart.length === 0) return;

    setIsSubmittingOrder(true);
    setCheckoutError(null);

    try {
      const itemsPayload = cart.map(it => ({
        product_id: it.product.id,
        variant_id: it.variant?.id,
        name: it.product.name,
        variant_title: it.variant?.title,
        price: getProductPriceMinor(it.product, it.variant),
        quantity: it.quantity,
        image_url: it.product.image_url
      }));

      const payload = {
        items: itemsPayload,
        customer_name: custName.trim(),
        customer_phone: custPhone.trim(),
        customer_email: custEmail.trim() || 'shopper@mupezeni.ai',
        customer_address: custAddress.trim() || 'Lusaka, Zambia',
        delivery_option: deliveryOption,
        delivery_fee: deliveryFeeMinor,
        payment_method: paymentMethod,
        notes: orderNotes.trim()
      };

      // POST /public/stores/{slug}/checkout
      const res = await apiClient.publicCheckout(effectiveSlug, payload);

      if (res?.order || res?.success) {
        setOrderComplete(res.order || { 
          order_number: `MPZ-${Date.now().toString().slice(-6)}`,
          whatsapp_url: res.whatsapp_url,
          total: cartTotalMinor
        });
        setCart([]);
        setIsCheckoutStep(false);
      } else {
        throw new Error('Checkout did not return an order confirmation.');
      }
    } catch (err: any) {
      setCheckoutError(err?.message || 'Checkout failed. Please try again or use the WhatsApp Order button.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Brand Styles
  const primaryColor = store?.colors?.primary || '#B83010';
  const accentColor = store?.colors?.accent || '#E58330';
  const bgColor = store?.colors?.background || '#070503';
  const textColor = store?.colors?.text || '#FAFAF9';

  // Category filter
  const categories: string[] = ['All', ...Array.from(new Set(products.map(p => p.category).filter((c): c is string => Boolean(c))))];
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    if (!matchesCat) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q));
  });

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070503] flex items-center justify-center text-white font-dm px-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#E58330] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#F5EDE4]/70 font-mono tracking-wider animate-pulse">
            LOADING PUBLIC STOREFRONT...
          </p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (loadError || !store) {
    return (
      <div className="min-h-screen bg-[#070503] flex items-center justify-center text-white font-dm px-4">
        <div className="text-center space-y-4 max-w-md p-8 rounded-3xl bg-[#130C08] border border-white/10 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#B83A0A]/20 border border-[#B83A0A]/40 flex items-center justify-center mx-auto text-[#E58330]">
            <StoreIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-syne font-bold text-white">Storefront Unavailable</h2>
          <p className="text-xs text-[#F5EDE4]/60">
            {loadError || `Store "${effectiveSlug}" could not be loaded.`}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white text-xs font-syne font-bold cursor-pointer hover:brightness-110 shadow-md"
                >
                  Merchant Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-dm cursor-pointer"
                >
                  Mupezeni Home
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen font-dm antialiased relative selection:bg-[#E58330]/30 selection:text-white pb-24 md:pb-16"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      
      {/* TOP ANNOUNCEMENT BANNER */}
      <div 
        className="py-1.5 px-4 text-center text-[10.5px] font-mono tracking-wide text-white border-b border-white/10 flex items-center justify-center gap-2 shadow-sm"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="truncate">Fast Nationwide Dispatch · WhatsApp Orders Accepted · Mobile Money Ready</span>
      </div>

      {/* STORE HEADER & NAVIGATION */}
      <header className="sticky top-0 z-30 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-black/60 shadow-lg">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/15 overflow-hidden flex items-center justify-center shrink-0">
            {store.logo_url ? (
              <img src={store.logo_url} alt={store.name} className="w-full h-full object-cover" />
            ) : (
              <StoreIcon className="w-5 h-5 text-white" />
            )}
          </div>

          <div className="truncate">
            <h1 className="font-syne font-black text-sm sm:text-base text-white truncate leading-tight">
              {store.name}
            </h1>
            <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Verified Merchant</span>
              <span>·</span>
              <span className="truncate">{store.contact?.phone || store.contact_phone || '+260 77 609 1393'}</span>
            </div>
          </div>
        </div>

        {/* Header Actions: WhatsApp Direct + Cart Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick WhatsApp Chat */}
          <a
            href={`https://wa.me/${(store.contact?.phone || store.contact_phone || '+260 77 609 1393').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${store.name}! I am browsing your online store.`)}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all"
            title="Chat with Store on WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 rounded-xl text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-transform active:scale-95"
            style={{ backgroundColor: primaryColor }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {totalCartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white text-black font-black">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO / STORE STORY */}
      <section className="px-4 sm:px-8 py-6 sm:py-8 max-w-7xl mx-auto border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E58330]">
              Official Storefront
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-syne text-white tracking-tight">
              {store.name}
            </h2>
            <p className="text-xs sm:text-sm font-dm text-[#F5EDE4]/70 leading-relaxed">
              {store.about || store.description || 'Welcome to our verified digital storefront. Order online with quick checkout or directly via WhatsApp dispatch.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            {/* Order via WhatsApp Direct Button */}
            <a
              href={generateWhatsAppOrderLink()}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Order via WhatsApp Fallback</span>
            </a>
          </div>
        </div>
      </section>

      {/* MAIN CATALOG AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'text-white font-bold shadow-md'
                    : 'bg-white/[0.03] text-[#F5EDE4]/60 hover:bg-white/[0.08] hover:text-white border border-white/5'
                }`}
                style={selectedCategory === cat ? { backgroundColor: primaryColor } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (Mobile-first 2 columns on small screens, 3-4 on large) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full p-12 rounded-3xl bg-white/[0.02] border border-white/10 text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-white/20 mx-auto" />
              <h3 className="text-sm font-syne font-bold text-white">No Items Available</h3>
              <p className="text-xs font-dm text-[#F5EDE4]/60">
                Try clearing your search or switching categories.
              </p>
            </div>
          ) : (
            filteredProducts.map(p => {
              const priceMinor = getProductPriceMinor(p);
              const variantCount = p.variants?.length || 1;

              return (
                <div 
                  key={p.id}
                  className="rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-white/25 transition-all shadow-lg flex flex-col justify-between group"
                >
                  <div 
                    onClick={() => handleOpenProductDetail(p)}
                    className="cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="h-36 sm:h-52 w-full bg-black/60 relative overflow-hidden">
                      <img 
                        src={p.image_url} 
                        alt={p.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                      />
                      {variantCount > 1 && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono text-white border border-white/10">
                          {variantCount} Options
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-3 sm:p-4 space-y-1.5">
                      <h3 className="font-syne font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-[#E58330] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-dm text-[#F5EDE4]/60 line-clamp-1 sm:line-clamp-2">
                        {p.description || 'Verified authentic item.'}
                      </p>
                      <div className="font-mono text-xs sm:text-sm font-black text-emerald-400">
                        {formatMinorUnits(priceMinor, currency)}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 sm:p-4 pt-0 space-y-1.5">
                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(p, p.variants?.[0], 1)}
                      className="w-full py-2 rounded-xl text-white font-syne font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:brightness-110 active:scale-98 transition-all"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    {/* Quick WhatsApp Order Button */}
                    <button
                      type="button"
                      onClick={() => handleSingleProductWhatsAppOrder(p, p.variants?.[0], 1)}
                      className="w-full py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-syne font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      title="Order this product immediately on WhatsApp"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

      {/* MOBILE-FIRST STICKY BOTTOM CART BAR */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-[#0A0604]/90 backdrop-blur-lg border-t border-white/10 shadow-2xl flex items-center justify-between max-w-lg mx-auto sm:rounded-t-3xl">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#F5EDE4]/60">
              {totalCartCount} item{totalCartCount > 1 ? 's' : ''} in Bag
            </span>
            <div className="text-sm font-mono font-black text-emerald-400">
              {formatMinorUnits(cartSubtotalMinor, currency)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Fallback */}
            <a
              href={generateWhatsAppOrderLink()}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg"
              title="Send Cart to WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </a>

            {/* Open Bag Checkout */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-xl text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              <span>View Bag & Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL (GET /public/stores/{slug}/products/{productSlug}) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#110A07] border border-white/15 p-5 sm:p-6 space-y-4 shadow-2xl my-6"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <span className="text-[11px] font-mono text-[#E58330]">
                  {selectedProduct.category || 'Product Details'}
                </span>
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="p-1 text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Product Image */}
              <div className="h-56 sm:h-64 w-full rounded-2xl bg-black/60 overflow-hidden relative">
                <img 
                  src={selectedProduct.image_url} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Title & Price */}
              <div className="space-y-1">
                <h3 className="font-syne font-bold text-lg text-white">
                  {selectedProduct.name}
                </h3>
                <div className="font-mono text-base font-black text-emerald-400">
                  {formatMinorUnits(getProductPriceMinor(selectedProduct, selectedVariant || undefined), currency)}
                </div>
              </div>

              <p className="text-xs font-dm text-[#F5EDE4]/70">
                {selectedProduct.description || 'Verified quality retail stock ready for immediate dispatch.'}
              </p>

              {/* Variants Selector */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="block text-[11px] font-mono text-[#F5EDE4]/60">
                    Select Option / Size / Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.variants.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white border-transparent font-bold shadow-md'
                            : 'bg-white/5 border-white/10 text-[#F5EDE4]/80 hover:bg-white/10'
                        }`}
                      >
                        {v.title}
                        {v.stock_quantity !== undefined && (
                          <span className="text-[10px] opacity-60 ml-1">({v.stock_quantity})</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-[#F5EDE4]/70">Quantity</span>
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    className="p-1 text-white/60 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold px-2">{modalQty}</span>
                  <button
                    type="button"
                    onClick={() => setModalQty(modalQty + 1)}
                    className="p-1 text-white/60 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dual Actions: Add to Bag + Instant WhatsApp Order */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCart(selectedProduct, selectedVariant || undefined, modalQty)}
                  className="py-2.5 px-4 rounded-xl text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add {modalQty} to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSingleProductWhatsAppOrder(selectedProduct, selectedVariant || undefined, modalQty)}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART DRAWER & CHECKOUT SHEET */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#0D0704] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl p-5 sm:p-6 overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#E58330]" />
                    <h3 className="font-syne font-bold text-base text-white">
                      {isCheckoutStep ? 'Checkout & Delivery' : 'Your Shopping Bag'}
                    </h3>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutStep(false);
                    }} 
                    className="p-1 text-white/60 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {checkoutError && (
                  <div className="my-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-dm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                {/* STEP 1: CART ITEMS LIST */}
                {!isCheckoutStep && (
                  <div className="space-y-4 py-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 space-y-2">
                        <ShoppingBag className="w-10 h-10 text-white/20 mx-auto" />
                        <p className="text-xs font-dm text-[#F5EDE4]/60">Your shopping bag is empty.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item, idx) => {
                          const itemPriceMinor = getProductPriceMinor(item.product, item.variant);

                          return (
                            <div 
                              key={`${item.product.id}_${item.variant?.id || 'std'}`}
                              className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3"
                            >
                              <img 
                                src={item.product.image_url} 
                                alt={item.product.name} 
                                className="w-14 h-14 rounded-xl object-cover bg-black/40 shrink-0" 
                              />
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <h4 className="font-syne font-bold text-xs text-white truncate">
                                  {item.product.name}
                                </h4>
                                {item.variant?.title && (
                                  <span className="text-[10px] font-mono text-[#F5EDE4]/50 block">
                                    Option: {item.variant.title}
                                  </span>
                                )}
                                <span className="text-xs font-mono font-bold text-emerald-400">
                                  {formatMinorUnits(itemPriceMinor * item.quantity, currency)}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-xl px-1.5 py-1">
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(idx, -1)}
                                  className="p-1 text-white/60 hover:text-white"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs px-1">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(idx, 1)}
                                  className="p-1 text-white/60 hover:text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: CHECKOUT FORM */}
                {isCheckoutStep && (
                  <form id="public-checkout-form" onSubmit={handlePlaceOrder} className="space-y-3.5 py-4 text-xs font-dm">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutStep(false)}
                      className="text-[#E58330] font-mono text-[11px] flex items-center gap-1 mb-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to Review Bag</span>
                    </button>

                    <div>
                      <label className="block font-mono text-[#F5EDE4]/70 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="e.g. Mwamba Mwila"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E58330]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-mono text-[#F5EDE4]/70 mb-1">WhatsApp Phone *</label>
                        <input
                          type="text"
                          required
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          placeholder="+260 97 123 4567"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#E58330]"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[#F5EDE4]/70 mb-1">Email</label>
                        <input
                          type="email"
                          value={custEmail}
                          onChange={(e) => setCustEmail(e.target.value)}
                          placeholder="name@email.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E58330]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[#F5EDE4]/70 mb-1">Delivery Address *</label>
                      <input
                        type="text"
                        required
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        placeholder="House / Street / Area, Lusaka"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E58330]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[#F5EDE4]/70 mb-1">Dispatch / Delivery Option</label>
                      <select
                        value={deliveryOption}
                        onChange={(e) => {
                          setDeliveryOption(e.target.value);
                          if (e.target.value.includes('Express')) {
                            setDeliveryFeeMinor(7500);
                          } else if (e.target.value.includes('Pickup')) {
                            setDeliveryFeeMinor(0);
                          } else {
                            setDeliveryFeeMinor(4500);
                          }
                        }}
                        className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                      >
                        <option value="Lusaka Standard Dispatch (ZMW 45)">Lusaka Standard Dispatch (ZMW 45.00)</option>
                        <option value="Lusaka Same-Day Express (ZMW 75)">Lusaka Same-Day Express (ZMW 75.00)</option>
                        <option value="Store Hub Pickup (Free)">Store Hub Pickup (Free)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[#F5EDE4]/70 mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                      >
                        <option value="Airtel / MTN Mobile Money">Airtel / MTN Mobile Money</option>
                        <option value="Cash on Delivery">Cash on Delivery (Lusaka only)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[#F5EDE4]/70 mb-1">Notes / Special Instructions</label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g. Call upon arrival at gate"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Cart Drawer Footer */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-white/[0.08] space-y-3">
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-[#F5EDE4]/60">
                      <span>Subtotal</span>
                      <span>{formatMinorUnits(cartSubtotalMinor, currency)}</span>
                    </div>
                    {isCheckoutStep && (
                      <div className="flex justify-between text-[#F5EDE4]/60">
                        <span>Delivery</span>
                        <span>{formatMinorUnits(deliveryFeeMinor, currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-white/5">
                      <span>Total</span>
                      <span className="text-emerald-400">
                        {formatMinorUnits(isCheckoutStep ? cartTotalMinor : cartSubtotalMinor, currency)}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Fallback Button */}
                  <a
                    href={generateWhatsAppOrderLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Order via WhatsApp Fallback</span>
                  </a>

                  {!isCheckoutStep ? (
                    <button
                      type="button"
                      onClick={() => setIsCheckoutStep(true)}
                      className="w-full py-2.5 rounded-xl text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span>Proceed to Delivery & Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="public-checkout-form"
                      disabled={isSubmittingOrder}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingOrder ? (
                        <span>Submitting Order...</span>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Place Online Order ({formatMinorUnits(cartTotalMinor, currency)})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ORDER COMPLETE CONFIRMATION MODAL */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#130C08] border border-emerald-500/30 p-6 sm:p-8 space-y-5 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Order Received
              </span>
              <h3 className="font-syne font-bold text-xl text-white">
                Thank You For Your Order!
              </h3>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                Your order <span className="font-mono text-white font-bold">{orderComplete.order_number}</span> has been saved and dispatched to store staff.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono text-left">
              <div className="flex justify-between text-[#F5EDE4]/60">
                <span>Order Ref:</span>
                <span className="text-white">{orderComplete.order_number}</span>
              </div>
              <div className="flex justify-between text-[#F5EDE4]/60">
                <span>Total Amount:</span>
                <span className="text-emerald-400 font-bold">
                  {formatMinorUnits(orderComplete.total, currency)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {orderComplete.whatsapp_url && (
                <a
                  href={orderComplete.whatsapp_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <Phone className="w-4 h-4" />
                  <span>Follow Up Order on WhatsApp</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setOrderComplete(null)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne text-xs cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
