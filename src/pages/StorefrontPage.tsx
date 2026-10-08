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
  Check
} from 'lucide-react';
import { Store, Business, Product, ProductVariant, PaymentConfig, DeliveryConfig, CartItem, Order, BrandProfile, BrandContext } from '../types/commerce';
import { PageId } from '../types';
import { useAuth } from '../context/AuthContext';
import { AiWebBubble } from '../components/AiWebBubble';
import { VisitorVisionContext } from '../types/connectors';

interface StorefrontPageProps {
  slug?: string;
  onNavigate?: (page: PageId) => void;
}

export const StorefrontPage: React.FC<StorefrontPageProps> = ({ 
  slug = '',
  onNavigate 
}) => {
  const { store: authStore } = useAuth();
  const targetSlug = slug || authStore?.slug || '';

  const [store, setStore] = useState<Store | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [brandContext, setBrandContext] = useState<BrandContext | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [deliveryConfig, setDeliveryConfig] = useState<DeliveryConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Cart & Checkout State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  // Selected product modal for variant selection
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [modalQty, setModalQty] = useState(1);

  // Checkout inputs
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Fetch store data
  const fetchStoreData = async () => {
    if (!targetSlug) {
      setStore(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/commerce/store-by-slug/${encodeURIComponent(targetSlug)}`);
      if (res.ok) {
        const data = await res.json();
        setStore(data.store);
        setBusiness(data.business);
        setBrandProfile(data.brandProfile || null);
        setBrandContext(data.brandContext || null);
        setProducts(data.products || []);
        setPaymentConfig(data.paymentConfig || null);
        setDeliveryConfig(data.deliveryConfig || null);

        // Pre-select first delivery option
        if (data.deliveryConfig?.options?.length > 0) {
          const firstEnabled = data.deliveryConfig.options.find((o: any) => o.enabled);
          if (firstEnabled) setSelectedDeliveryId(firstEnabled.id);
        }
        // Pre-select first payment method
        if (data.paymentConfig?.supported_methods?.length > 0) {
          setSelectedPaymentMethod(data.paymentConfig.supported_methods[0]);
        }
      } else {
        setStore(null);
        setBusiness(null);
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to load store:', err);
      setStore(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [targetSlug]);

  // Categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.variant?.price_override ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const selectedDeliveryOption = deliveryConfig?.options?.find(o => o.id === selectedDeliveryId);
  const deliveryFee = selectedDeliveryOption?.fee || 0;
  const cartTotal = cartSubtotal + deliveryFee;
  const currency = business?.currency || 'ZMW';

  // Add to cart helper
  const handleAddToCart = (product: Product, variant?: ProductVariant, qty: number = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        (variant ? item.variant?.id === variant.id : !item.variant)
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      } else {
        return [...prev, { product, variant, quantity: qty }];
      }
    });

    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Remove or update cart item
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

  // Submit Checkout
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim()) {
      setOrderError('Please provide your name and phone number for delivery.');
      return;
    }
    if (cart.length === 0) return;

    setOrderError(null);
    setIsSubmittingOrder(true);

    try {
      const orderItems = cart.map(item => ({
        product_id: item.product.id,
        variant_id: item.variant?.id,
        name: item.product.name,
        variant_title: item.variant?.title || 'Standard',
        price: item.variant?.price_override ?? item.product.price,
        quantity: item.quantity,
        image_url: item.product.image_url
      }));

      const payload = {
        business_id: store?.business_id || business?.id,
        customer_name: custName.trim(),
        customer_email: custEmail.trim() || 'walkin@customer.com',
        customer_phone: custPhone.trim(),
        customer_address: custAddress.trim() || 'Lusaka Central',
        items: orderItems,
        subtotal: cartSubtotal,
        delivery_fee: deliveryFee,
        total: cartTotal,
        currency,
        payment_method: selectedPaymentMethod,
        delivery_option: selectedDeliveryOption?.name || 'Local Courier Dispatch',
        status: 'confirmed'
      };

      const res = await fetch('/api/commerce/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit order.');
      }

      const resData = await res.json();
      setOrderComplete(resData.order);
      setCart([]);
      setIsCheckoutStep(false);
      // reload store products/inventory
      fetchStoreData();
    } catch (err: any) {
      setOrderError(err.message || 'Checkout failed. Please try again.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070503] flex items-center justify-center text-white font-dm">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#B83A0A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#F5EDE4]/60 font-mono">Loading storefront...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-[#070503] flex items-center justify-center text-white font-dm px-4">
        <div className="text-center space-y-4 max-w-md p-8 rounded-3xl bg-[#130C08] border border-white/10 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#B83A0A]/20 border border-[#B83A0A]/40 flex items-center justify-center mx-auto text-[#E58330]">
            <StoreIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-syne font-bold">Storefront Not Found</h2>
          <p className="text-xs text-[#F5EDE4]/60">
            No live store is currently active for slug <code className="text-[#E58330] font-mono">"{slug}"</code>. If you are the store owner, complete your onboarding to launch your store.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white text-xs font-syne font-bold cursor-pointer hover:brightness-110"
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
      className="min-h-screen text-[#FAFAF9] pb-24 font-dm relative"
      style={{ backgroundColor: brandProfile?.colors?.background || '#070503' }}
    >
      {/* Brand Guidelines Announcement Ribbon */}
      {brandProfile?.guidelines?.always && brandProfile.guidelines.always.length > 0 && (
        <div 
          className="py-1.5 px-4 text-center text-[11px] font-mono tracking-wide text-white border-b border-white/10 flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap"
          style={{ backgroundColor: brandProfile.colors?.primary || '#110B07' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{brandProfile.guidelines.always.join('  •  ')}</span>
        </div>
      )}

      {/* Top Store Header */}
      <header 
        className="sticky top-0 z-40 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between"
        style={{ backgroundColor: `${brandProfile?.colors?.secondary || '#0A0705'}EE` }}
      >
        <div className="flex items-center gap-3">
          {(brandProfile?.logo_url || store?.logo_url) && (
            <img 
              src={brandProfile?.logo_url || store?.logo_url} 
              alt={store?.name} 
              className="w-9 h-9 rounded-xl object-cover border border-white/15 bg-black"
            />
          )}
          <div>
            <div className="text-sm sm:text-base font-black font-syne text-white flex items-center gap-2">
              <span>{store?.name || 'Retail Storefront'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Live Storefront
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#E58330]">
              <span>🌐 {store?.custom_domain || store?.default_subdomain || `${store?.slug || 'store'}.mupezeni.com`}</span>
              {store?.custom_domain && (
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9.5px]">
                  Custom Domain
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-mono text-[#E58330] hover:underline hidden sm:inline-block cursor-pointer"
            >
              ← Retailer Dashboard
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#180C07] border border-[#B83A0A]/40 text-white font-syne font-bold text-xs flex items-center gap-2 hover:border-[#B83A0A] shadow-md cursor-pointer relative"
          >
            <ShoppingBag className="w-4 h-4 text-[#E58330]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#9B2208] text-white text-[11px] font-mono">
              {cart.reduce((sum, it) => sum + it.quantity, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Storefront Banner */}
      <div className="relative py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-4 text-center border-b border-white/[0.06]">
        
        {/* Personality Badges */}
        {brandProfile?.personality && brandProfile.personality.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {brandProfile.personality.map((trait, tIdx) => (
              <span 
                key={tIdx} 
                className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono border"
                style={{ 
                  backgroundColor: `${brandProfile.colors?.accent || '#B83A0A'}15`,
                  borderColor: `${brandProfile.colors?.accent || '#B83A0A'}40`,
                  color: brandProfile.colors?.accent || '#E58330' 
                }}
              >
                ✦ {trait}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-[#FAFAF9]">
          {store?.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#F5EDE4]/75 max-w-xl mx-auto">
          {store?.description || 'Browse our catalog below and place your order directly. Dispatched express across Lusaka.'}
        </p>

        {/* Category Filter Pills */}
        <div className="pt-2 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-syne font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-md' 
                  : 'bg-white/5 hover:bg-white/10 text-[#F5EDE4]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#F5EDE4]/50 space-y-2">
            <div>No items in this category yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((p) => {
              const inStock = p.variants?.some(v => v.stock_quantity > 0) ?? p.is_available;
              const minPrice = p.price;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-[#130C08] border border-white/10 hover:border-white/20 overflow-hidden flex flex-col justify-between group shadow-xl transition-all"
                >
                  <div 
                    onClick={() => {
                      setSelectedProduct(p);
                      setSelectedVariant(p.variants?.[0] || null);
                      setModalQty(1);
                    }}
                    className="cursor-pointer"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                      <img 
                        src={p.image_url} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-md border ${
                          inStock 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                            : 'bg-red-500/20 text-red-300 border-red-500/40'
                        }`}>
                          {inStock ? 'In Stock' : 'Sold Out'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-1.5">
                      <div className="text-[10px] font-mono text-[#F5EDE4]/50 uppercase">{p.category}</div>
                      <h3 className="font-syne font-bold text-sm text-white group-hover:text-[#E58330] transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-[#F5EDE4]/60 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add button */}
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-2">
                    <div className="text-sm font-mono font-bold text-[#E58330]">
                      {currency} {minPrice.toLocaleString()}
                    </div>

                    <button
                      type="button"
                      disabled={!inStock}
                      onClick={() => {
                        if (p.has_variants && p.variants.length > 1) {
                          setSelectedProduct(p);
                          setSelectedVariant(p.variants[0]);
                          setModalQty(1);
                        } else {
                          handleAddToCart(p, p.variants?.[0], 1);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#9B2208] text-white text-xs font-syne font-bold transition-all disabled:opacity-30 cursor-pointer active:scale-95"
                    >
                      {p.has_variants && p.variants.length > 1 ? 'Select Option' : 'Add to Bag'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-lg w-full rounded-3xl bg-[#130C08] border border-white/20 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-[#E58330] uppercase">{selectedProduct.category}</div>
                  <h3 className="text-lg font-bold font-syne text-white">{selectedProduct.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black">
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-[#F5EDE4]/75 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Variant Selector */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-syne font-bold text-white block">
                    Choose Size / Option:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`p-2 rounded-xl text-xs font-mono text-left border transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'bg-[#B83A0A]/20 border-[#B83A0A] text-white font-bold'
                            : 'bg-[#0A0705] border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <div className="truncate">{v.title}</div>
                        <div className={`text-[10px] ${v.stock_quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {v.stock_quantity > 0 ? `${v.stock_quantity} left` : 'Out of stock'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add Button */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="text-lg font-mono font-bold text-[#E58330]">
                  {currency} {((selectedVariant?.price_override ?? selectedProduct.price) * modalQty).toLocaleString()}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-white/15 rounded-xl bg-[#0A0705]">
                    <button
                      type="button"
                      onClick={() => setModalQty(q => Math.max(1, q - 1))}
                      className="px-2.5 py-1 text-white/70 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2 font-mono text-xs text-white">{modalQty}</span>
                    <button
                      type="button"
                      onClick={() => setModalQty(q => q + 1)}
                      className="px-2.5 py-1 text-white/70 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={selectedVariant ? selectedVariant.stock_quantity <= 0 : false}
                    onClick={() => handleAddToCart(selectedProduct, selectedVariant || undefined, modalQty)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 disabled:opacity-40 cursor-pointer"
                  >
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart & Checkout Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#130C08] border-l border-white/15 h-full flex flex-col justify-between p-6 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E58330]" />
                  <h3 className="font-syne font-bold text-base text-white">
                    {isCheckoutStep ? 'Secure Checkout' : 'Shopping Bag'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutStep(false);
                  }}
                  className="p-1 rounded-lg text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body: Bag View OR Checkout Form */}
              <div className="my-auto py-4 space-y-4">
                {!isCheckoutStep ? (
                  /* --- STEP 1: BAG ITEMS --- */
                  <div className="space-y-3">
                    {cart.length === 0 ? (
                      <div className="py-12 text-center text-xs text-[#F5EDE4]/50 space-y-2">
                        <ShoppingBag className="w-8 h-8 mx-auto text-white/20" />
                        <div>Your bag is empty.</div>
                      </div>
                    ) : (
                      cart.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0A0705] border border-white/10 flex items-center justify-between gap-3">
                          <img src={item.product.image_url} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover bg-black" />
                          <div className="flex-1 min-w-0">
                            <div className="font-syne font-bold text-xs text-white truncate">{item.product.name}</div>
                            {item.variant && (
                              <div className="text-[10px] font-mono text-[#F5EDE4]/60 truncate">{item.variant.title}</div>
                            )}
                            <div className="text-xs font-mono text-[#E58330]">
                              {currency} {((item.variant?.price_override ?? item.product.price) * item.quantity).toLocaleString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-white/15 rounded-lg bg-[#130C08]">
                              <button onClick={() => updateCartQty(idx, -1)} className="px-2 py-0.5 text-xs text-white/60 hover:text-white">-</button>
                              <span className="px-1.5 font-mono text-xs">{item.quantity}</span>
                              <button onClick={() => updateCartQty(idx, 1)} className="px-2 py-0.5 text-xs text-white/60 hover:text-white">+</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  /* --- STEP 2: CHECKOUT FORM --- */
                  <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3.5 text-xs">
                    {orderError && (
                      <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                        {orderError}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="font-syne font-bold text-white block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="e.g. Mwape Chileshe"
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0705] border border-white/15 text-white focus:outline-none focus:border-[#B83A0A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-syne font-bold text-white block">Phone (WhatsApp) *</label>
                        <input
                          type="text"
                          required
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          placeholder="+260 97 123 4567"
                          className="w-full px-3 py-2 rounded-xl bg-[#0A0705] border border-white/15 text-white focus:outline-none focus:border-[#B83A0A]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-syne font-bold text-white block">Email</label>
                        <input
                          type="email"
                          value={custEmail}
                          onChange={(e) => setCustEmail(e.target.value)}
                          placeholder="client@mail.com"
                          className="w-full px-3 py-2 rounded-xl bg-[#0A0705] border border-white/15 text-white focus:outline-none focus:border-[#B83A0A]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-syne font-bold text-white block">Delivery Address in Lusaka</label>
                      <input
                        type="text"
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        placeholder="e.g. Plot 418, Roma Park, Lusaka"
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0705] border border-white/15 text-white focus:outline-none focus:border-[#B83A0A]"
                      />
                    </div>

                    {/* Delivery Option Selector */}
                    {deliveryConfig?.options && deliveryConfig.options.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <label className="font-syne font-bold text-white block">Choose Delivery Method:</label>
                        <div className="space-y-1.5">
                          {deliveryConfig.options.filter(o => o.enabled).map((opt) => (
                            <label 
                              key={opt.id}
                              className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer ${
                                selectedDeliveryId === opt.id 
                                  ? 'bg-[#B83A0A]/20 border-[#B83A0A] text-white' 
                                  : 'bg-[#0A0705] border-white/10 text-white/70'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="delivery_opt"
                                  checked={selectedDeliveryId === opt.id}
                                  onChange={() => setSelectedDeliveryId(opt.id)}
                                  className="accent-[#B83A0A]"
                                />
                                <span className="font-medium text-[11px]">{opt.name}</span>
                              </div>
                              <span className="font-mono text-[#E58330] font-bold text-[11px]">
                                {opt.fee === 0 ? 'FREE' : `${currency} ${opt.fee}`}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment Method Selector */}
                    {paymentConfig?.supported_methods && (
                      <div className="space-y-1.5 pt-1">
                        <label className="font-syne font-bold text-white block">Payment Method:</label>
                        <div className="grid grid-cols-2 gap-2">
                          {paymentConfig.supported_methods.map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setSelectedPaymentMethod(method)}
                              className={`p-2 rounded-xl text-center border capitalize font-mono text-[11px] cursor-pointer ${
                                selectedPaymentMethod === method 
                                  ? 'bg-[#9B2208]/30 border-[#B83A0A] text-white font-bold' 
                                  : 'bg-[#0A0705] border-white/10 text-white/60'
                              }`}
                            >
                              {method.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </form>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-[#F5EDE4]/60">
                    <span>Subtotal</span>
                    <span>{currency} {cartSubtotal.toLocaleString()}</span>
                  </div>
                  {isCheckoutStep && (
                    <div className="flex justify-between text-[#F5EDE4]/60">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `${currency} ${deliveryFee.toLocaleString()}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-white/5">
                    <span>Total</span>
                    <span className="text-[#E58330]">{currency} {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {!isCheckoutStep ? (
                  <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={() => setIsCheckoutStep(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutStep(false)}
                      className="px-4 py-3 rounded-xl bg-white/5 text-xs font-syne text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmittingOrder}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmittingOrder ? 'Placing Order...' : 'Confirm & Place Order'}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Complete Modal */}
      <AnimatePresence>
        {orderComplete && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-3xl bg-[#130C08] border border-white/20 p-6 sm:p-8 shadow-2xl text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#E58330] uppercase font-bold tracking-wider">
                  Order Successfully Placed
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-syne text-white">
                  Thank You, {orderComplete.customer_name}!
                </h3>
                <div className="text-sm font-mono text-emerald-400 font-bold pt-1">
                  Order Number: {orderComplete.order_number}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0705] border border-white/10 text-left space-y-2 text-xs font-mono">
                <div className="text-[#F5EDE4]/60">Summary:</div>
                <div className="text-white font-dm">
                  {orderComplete.items.map(it => `${it.quantity}x ${it.name} (${it.variant_title || 'Standard'})`).join(', ')}
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-[#E58330] font-bold">
                  <span>Total Amount:</span>
                  <span>{orderComplete.currency} {orderComplete.total.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-[#F5EDE4]/60 pt-1">
                  Payment Method: <span className="text-white capitalize">{orderComplete.payment_method.replace('_', ' ')}</span>
                </div>
              </div>

              {paymentConfig?.instructions?.mobile_money && orderComplete.payment_method === 'mobile_money' && (
                <div className="p-3 rounded-xl bg-[#1C1008] border border-[#B83A0A]/30 text-xs text-left space-y-1 font-mono text-[11px]">
                  <div className="text-[#E58330] font-bold">Payment Instructions:</div>
                  <div className="text-[#F5EDE4]/80">{paymentConfig.instructions.mobile_money}</div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOrderComplete(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-syne font-bold text-xs"
                >
                  Continue Shopping
                </button>
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      setOrderComplete(null);
                      onNavigate('dashboard');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs"
                  >
                    View in Dashboard
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Realtime Autonomous AI Worker Support & Sales Bubble */}
      <AiWebBubble
        connectorType="mupezeni"
        businessId={business?.id}
        visitorContext={{
          sessionId: 'sess_storefront_live',
          activePage: selectedProduct ? `Product: ${selectedProduct.name}` : `Category: ${selectedCategory}`,
          activeProductId: selectedProduct?.id,
          activeProductTitle: selectedProduct?.name,
          activeProductPrice: selectedProduct?.price,
          activeProductSku: selectedProduct?.sku,
          activeProductCategory: selectedProduct?.category,
          activeProductStock: selectedProduct?.variants && selectedProduct.variants.length > 0
            ? selectedProduct.variants.reduce((a, v) => a + v.stock_quantity, 0)
            : 5,
          activeProductImage: selectedProduct?.image_url,
          dwellTimeSeconds: 6,
          scrollDepthPercent: 50,
          cartItemCount: cart.reduce((sum, it) => sum + it.quantity, 0),
          cartTotal: cart.reduce((sum, it) => sum + (it.product.price * it.quantity), 0),
          recentSearches: [selectedCategory, store?.name || 'Ernest Sneakers'],
          visitorLocation: business?.location || 'Lusaka, Zambia',
          referrerSource: 'Direct Store Visit'
        }}
        customCatalog={products}
        storeName={store?.name || business?.name || 'Ernest Sneakers Lusaka'}
        onAddToCart={(product, variantTitle) => {
          let chosenVariant: ProductVariant | undefined;
          if (variantTitle && product.variants) {
            chosenVariant = product.variants.find(v => v.title.toLowerCase() === variantTitle.toLowerCase() || v.sku?.toLowerCase() === variantTitle.toLowerCase());
          }
          handleAddToCart(product, chosenVariant, 1);
        }}
        onCheckoutClick={() => {
          setIsCartOpen(true);
          setIsCheckoutStep(true);
        }}
      />

    </div>
  );
};
