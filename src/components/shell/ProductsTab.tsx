import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  Plus, 
  Boxes, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Search, 
  X, 
  Sparkles, 
  Edit3, 
  Trash2, 
  UploadCloud, 
  Image as ImageIcon, 
  Layers, 
  Check, 
  ArrowRight,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { apiClient, formatMinorUnits, BusinessRoleItem } from '../../services/apiClient';
import { Product, ProductVariant, CurrencyCode } from '../../types/commerce';

interface ProductsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

interface VariantFormItem {
  id?: string;
  title: string;
  sku: string;
  priceMajorOverride?: number | '';
  stock_quantity: number;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ business, role }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Delete Confirmation
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Footwear');
  const [formPriceMajor, setFormPriceMajor] = useState<number | ''>(850);
  const [formSku, setFormSku] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Variants Form
  const [variants, setVariants] = useState<VariantFormItem[]>([
    { title: 'Standard', sku: '', priceMajorOverride: '', stock_quantity: 10 }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currency: CurrencyCode = (business.currency as CurrencyCode) || 'ZMW';
  const isMember = role === 'member';

  // Load products via GET /businesses/{id}/products
  const loadProducts = async () => {
    setIsLoading(true);
    setErrorNotice(null);
    try {
      const res = await apiClient.getProducts(business.id);
      setProducts(res.products || []);
    } catch (err: any) {
      console.warn('Products fetch note:', err);
      // Fallback
      try {
        const fallbackRes = await fetch(`/api/commerce/products?businessId=${encodeURIComponent(business.id)}`);
        if (fallbackRes.ok) {
          const fbData = await fallbackRes.json();
          setProducts(fbData.products || []);
        }
      } catch (e) {
        setErrorNotice(err?.message || 'Failed to load products.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [business.id]);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormDescription('Curated retail item synced with AI Worker.');
    setFormCategory('Footwear');
    setFormPriceMajor(850);
    setFormSku(`SKU-${Date.now().toString().slice(-4)}`);
    setFormImageUrl('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80');
    setVariants([
      { title: 'Standard', sku: `SKU-${Date.now().toString().slice(-4)}-STD`, priceMajorOverride: '', stock_quantity: 15 }
    ]);
    setErrorNotice(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormDescription(p.description || '');
    setFormCategory(p.category || 'General');
    // Price from minor units to major units
    // Note: p.price in products is stored in minor units per backend contract
    // or if older data stored as major, handle accordingly
    const majorPrice = p.price > 1000 ? p.price / 100 : p.price;
    setFormPriceMajor(majorPrice);
    setFormSku(p.sku || '');
    setFormImageUrl(p.image_url || '');

    if (p.variants && p.variants.length > 0) {
      setVariants(p.variants.map(v => ({
        id: v.id,
        title: v.title,
        sku: v.sku || '',
        priceMajorOverride: v.price_override != null ? (v.price_override > 1000 ? v.price_override / 100 : v.price_override) : '',
        stock_quantity: v.stock_quantity ?? 10
      })));
    } else {
      setVariants([
        { title: 'Standard', sku: p.sku || '', priceMajorOverride: '', stock_quantity: 10 }
      ]);
    }

    setErrorNotice(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Handle Image Upload via POST /businesses/{id}/media (Multipart)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError(null);

    try {
      const res = await apiClient.uploadMedia(business.id, file);
      if (res?.url) {
        setFormImageUrl(res.url);
      } else {
        throw new Error('Upload succeeded but no image URL was returned.');
      }
    } catch (err: any) {
      setUploadError(err?.message || 'Failed to upload image.');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Add Variant Row
  const handleAddVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        title: `Option ${prev.length + 1}`,
        sku: `${formSku || 'SKU'}-${prev.length + 1}`,
        priceMajorOverride: '',
        stock_quantity: 10
      }
    ]);
  };

  // Remove Variant Row
  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) return;
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  // Update Variant Row Field
  const handleUpdateVariant = (index: number, field: keyof VariantFormItem, val: any) => {
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: val } : v));
  };

  // Submit Product Form (Create or Edit)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setErrorNotice('Product name is required.');
      return;
    }
    if (formPriceMajor === '' || Number(formPriceMajor) <= 0) {
      setErrorNotice('A valid price in major units is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorNotice(null);

    try {
      // Prices are entered in major units and sent as minor units (e.g. 850 -> 85000)
      const basePriceMinor = Math.round(Number(formPriceMajor) * 100);

      const formattedVariants = variants.map((v, idx) => {
        const variantPriceOverrideMinor = v.priceMajorOverride !== '' && v.priceMajorOverride !== undefined
          ? Math.round(Number(v.priceMajorOverride) * 100)
          : undefined;

        return {
          id: v.id || `var_${Date.now()}_${idx + 1}`,
          title: v.title.trim() || `Variant ${idx + 1}`,
          sku: v.sku.trim() || `${formSku || 'SKU'}-${idx + 1}`,
          price_override: variantPriceOverrideMinor,
          stock_quantity: Number(v.stock_quantity) || 0,
          is_available: Number(v.stock_quantity) > 0,
          attributes: { title: v.title.trim() }
        };
      });

      const payload = {
        name: formName.trim(),
        description: formDescription.trim(),
        price: basePriceMinor,
        currency,
        category: formCategory.trim() || 'General',
        sku: formSku.trim() || `SKU-${Date.now().toString().slice(-4)}`,
        image_url: formImageUrl.trim(),
        is_available: formattedVariants.some(v => v.stock_quantity > 0),
        variants: formattedVariants
      };

      if (editingProduct) {
        // PATCH /businesses/{id}/products/{pid}
        await apiClient.updateProduct(business.id, editingProduct.id, payload);
        setSuccessNotice(`Product "${formName}" updated successfully!`);
      } else {
        // POST /businesses/{id}/products
        await apiClient.createProduct(business.id, payload);
        setSuccessNotice(`Product "${formName}" created and synced with AI workers!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setSuccessNotice(null), 3000);
      await loadProducts();
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (pid: string) => {
    setIsDeleting(true);
    try {
      await apiClient.deleteProduct(business.id, pid);
      setSuccessNotice('Product deleted successfully.');
      setTimeout(() => setSuccessNotice(null), 3000);
      setDeletingProductId(null);
      await loadProducts();
    } catch (err: any) {
      setErrorNotice(err?.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Categories list
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      
      {/* Onboarding Return Banner */}
      {window.location.search.includes('onboarding') && (
        <div className="p-4 rounded-2xl bg-[#1C120B] border border-[#E58330]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E58330]" />
              <span className="font-syne font-bold text-xs sm:text-sm text-white">
                Catalog Setup for Onboarding Wizard (Step 2)
              </span>
            </div>
            <p className="text-[11px] font-dm text-[#F5EDE4]/70">
              Add your store's products, variants, and images. When you're ready, return to Step 2 to connect provider "mupezeni".
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/onboarding?step=2';
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap hover:brightness-110"
          >
            <span>Return to Wizard (Step 2) →</span>
          </button>
        </div>
      )}

      {/* Notifications */}
      {successNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-dm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}
      {errorNotice && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-dm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#E58330]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Catalog & Inventory Management
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Real products & variants queried live by your autonomous AI worker when answering shoppers and processing orders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadProducts}
            disabled={isLoading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer transition-colors"
            title="Refresh Products"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {!isMember && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#9B2208]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full bg-[#0D0805] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-bold shadow-md shadow-[#9B2208]/20'
                  : 'bg-white/5 text-[#F5EDE4]/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full p-12 rounded-3xl bg-[#0D0805] border border-white/10 text-center space-y-3">
            <Package className="w-12 h-12 text-white/20 mx-auto" />
            <h3 className="text-base font-syne font-bold text-white">No Products Found</h3>
            <p className="text-xs font-dm text-[#F5EDE4]/60 max-w-md mx-auto">
              {search || selectedCategory !== 'All' 
                ? 'Try adjusting your search query or category filters.'
                : 'Click "Add Product" above to create items with images and variants for your AI workers to sell.'}
            </p>
            {!isMember && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs cursor-pointer shadow-lg hover:brightness-110"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Product</span>
              </button>
            )}
          </div>
        ) : (
          filteredProducts.map(p => {
            // Price display: product price stored as minor units
            // Display formatted major units with business currency (ZMW)
            const priceMinor = p.price > 1000 ? p.price : p.price * 100;
            const variantCount = p.variants?.length || 1;
            const totalStock = p.variants && p.variants.length > 0 
              ? p.variants.reduce((sum, v) => sum + (v.stock_quantity || 0), 0)
              : 10;

            return (
              <div 
                key={p.id}
                className="rounded-3xl bg-[#0D0805] border border-white/10 overflow-hidden hover:border-white/20 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Image banner */}
                  <div className="h-48 w-full bg-black/60 relative overflow-hidden">
                    <img 
                      src={p.image_url} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#E58330] border border-white/10">
                      {p.category || 'General'}
                    </div>
                    <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full backdrop-blur-md text-[10px] font-mono border ${
                      totalStock > 0 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      {totalStock > 0 ? `${totalStock} in stock` : 'Out of stock'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-syne font-bold text-sm text-white line-clamp-1">
                        {p.name}
                      </h3>
                      <span className="font-mono text-xs font-bold text-emerald-400 whitespace-nowrap">
                        {formatMinorUnits(priceMinor, currency)}
                      </span>
                    </div>

                    <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-2">
                      {p.description || 'No description provided.'}
                    </p>

                    {/* Variants badge breakdown */}
                    {p.variants && p.variants.length > 0 && (
                      <div className="pt-1.5 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#F5EDE4]/50">
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3 text-[#E58330]" />
                            <span>{p.variants.length} Variant{p.variants.length > 1 ? 's' : ''}</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                          {p.variants.map((v) => (
                            <span 
                              key={v.id} 
                              className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#F5EDE4]/80 flex items-center gap-1"
                            >
                              <span>{v.title}</span>
                              <span className="text-emerald-400">({v.stock_quantity})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 sm:p-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#F5EDE4]/40 text-[10.5px]">
                    SKU: {p.sku || 'N/A'}
                  </span>

                  {!isMember && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingProductId(p.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 cursor-pointer transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE & EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#130C08] border border-white/15 p-5 sm:p-7 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9B2208] to-[#CD481B] flex items-center justify-center text-white">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-base text-white">
                    {editingProduct ? 'Edit Retail Product' : 'Create New Retail Product'}
                  </h3>
                  <p className="text-[11px] font-dm text-[#F5EDE4]/60">
                    Prices entered in major units and sent as integer minor units to server.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-white/60 hover:text-white cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-dm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitProduct} className="space-y-4 text-xs font-dm">
              {/* Product Title */}
              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Men's Retro Leather Sneaker"
                  className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
                />
              </div>

              {/* Price & SKU & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Major Units Price Input */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                    Price in Major Units ({currency}) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-white/50 text-xs">
                      {currency}
                    </span>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min={0.01}
                      value={formPriceMajor}
                      onChange={(e) => setFormPriceMajor(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="850.00"
                      className="w-full bg-[#0D0805] border border-white/10 rounded-xl pl-12 pr-3 py-2 text-white font-mono focus:outline-none focus:border-[#E58330]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                    Sent as {formPriceMajor !== '' ? (Math.round(Number(formPriceMajor) * 100)).toLocaleString() : '0'} minor units
                  </span>
                </div>

                {/* SKU */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                    Base SKU
                  </label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="e.g. SNK-RETRO-01"
                    className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#E58330]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="Footwear, Apparel..."
                    className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E58330]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detail materials, sizing recommendations, and dispatch timeline..."
                  className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
                />
              </div>

              {/* Image Upload via POST .../media */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-[#0D0805] border border-white/10">
                <label className="block font-mono text-[#F5EDE4]/80">
                  Product Image (Multipart Upload or URL)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Image Preview */}
                  <div className="w-20 h-20 rounded-xl bg-black border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {formImageUrl ? (
                      <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-white/30" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="product-media-file"
                      />
                      <label
                        htmlFor="product-media-file"
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-syne font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-white/10"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-[#E58330]" />
                        <span>{isUploadingImage ? 'Uploading via /media...' : 'Upload Image File'}</span>
                      </label>
                      <span className="text-[10px] font-mono text-[#F5EDE4]/50">
                        Multipart POST /businesses/{'{id}'}/media
                      </span>
                    </div>

                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="Or paste an image URL..."
                      className="w-full bg-[#130C08] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* VARIANTS SECTION */}
              <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#0D0805] border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#E58330]" />
                    <span className="font-syne font-bold text-xs text-white">
                      Variants & SKU Inventory ({variants.length})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#E58330] font-mono text-[11px] flex items-center gap-1 cursor-pointer border border-white/10"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Variant</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {variants.map((v, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-12 gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5 items-center text-xs"
                    >
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={v.title}
                          onChange={(e) => handleUpdateVariant(index, 'title', e.target.value)}
                          placeholder="e.g. Size 42 / Black"
                          className="w-full bg-[#130C08] border border-white/10 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <div className="col-span-3">
                        <input
                          type="text"
                          value={v.sku}
                          onChange={(e) => handleUpdateVariant(index, 'sku', e.target.value)}
                          placeholder="SKU"
                          className="w-full bg-[#130C08] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          value={v.priceMajorOverride}
                          onChange={(e) => handleUpdateVariant(index, 'priceMajorOverride', e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder={`${currency} Override`}
                          title={`Price override in ${currency} major units`}
                          className="w-full bg-[#130C08] border border-white/10 rounded-lg px-2 py-1.5 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min={0}
                          value={v.stock_quantity}
                          onChange={(e) => handleUpdateVariant(index, 'stock_quantity', Number(e.target.value))}
                          placeholder="Stock"
                          className="w-full bg-[#130C08] border border-white/10 rounded-lg px-2 py-1.5 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div className="col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(index)}
                          disabled={variants.length <= 1}
                          className="text-white/40 hover:text-rose-400 disabled:opacity-20 cursor-pointer p-1"
                          title="Remove variant"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#F5EDE4]/50">
                  {editingProduct ? 'Changes will sync immediately across AI workforce.' : 'New products are auto-indexed.'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#9B2208]/20 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#130C08] border border-rose-500/30 p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-syne font-bold text-base text-white">
                Delete Product?
              </h3>
              <p className="text-xs font-dm text-[#F5EDE4]/70">
                This will remove the product and all variants from your catalog and AI retail channels.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(deletingProductId)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-syne font-bold text-xs cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
