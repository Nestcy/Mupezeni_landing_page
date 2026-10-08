import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Boxes, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Search,
  X,
  Sparkles
} from 'lucide-react';
import { formatMinorUnits } from '../../services/apiClient';
import { BusinessRoleItem } from '../../services/apiClient';
import { Product, ProductVariant, InventoryItem, CurrencyCode } from '../../types/commerce';

interface ProductsTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ business, role }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newPriceMajor, setNewPriceMajor] = useState(850);
  const [newCategory, setNewCategory] = useState('Footwear');
  const [newStock, setNewStock] = useState(12);
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80');

  const currency: CurrencyCode = (business.currency as CurrencyCode) || 'ZMW';
  const isMember = role === 'member';

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const [pRes, iRes] = await Promise.all([
        fetch(`/api/commerce/products?businessId=${encodeURIComponent(business.id)}`),
        fetch(`/api/commerce/inventory?businessId=${encodeURIComponent(business.id)}`)
      ]);
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData.products || []);
      }
      if (iRes.ok) {
        const iData = await iRes.json();
        setInventory(iData.inventory || []);
      }
    } catch (err) {
      console.warn('Products fetch note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [business.id]);

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const prodId = `prod_${Date.now()}`;
    const variantId = `var_${Date.now()}`;
    const variant: ProductVariant = {
      id: variantId,
      business_id: business.id,
      product_id: prodId,
      title: 'Standard',
      sku: `SKU-${Date.now().toString().slice(-4)}`,
      attributes: { option: 'Standard' },
      stock_quantity: Number(newStock),
      is_available: Number(newStock) > 0,
      created_at: new Date().toISOString()
    };

    const newProd: Product = {
      id: prodId,
      business_id: business.id,
      catalog_id: 'cat_default',
      name: newTitle.trim(),
      description: 'Curated retail item synced with AI Worker.',
      price: Number(newPriceMajor),
      currency,
      image_url: newImg,
      sku: `SKU-${Date.now().toString().slice(-4)}`,
      category: newCategory,
      is_available: Number(newStock) > 0,
      has_variants: true,
      variants: [variant],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await fetch('/api/commerce/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd)
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    loadProducts();
  };

  const filteredProducts = products.filter(p => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#B83A0A]" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Catalog & Inventory Management
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Real products & variants queried live by your autonomous AI worker when answering shoppers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadProducts}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
            title="Refresh Products"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] hover:brightness-110 text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#9B2208]/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name or SKU..."
          className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full p-12 rounded-3xl bg-[#0D0805] border border-white/10 text-center space-y-2">
            <Package className="w-10 h-10 text-white/20 mx-auto" />
            <h3 className="text-sm font-syne font-bold text-white">No Products Found</h3>
            <p className="text-xs font-dm text-[#F5EDE4]/60">
              Click "Add Product" above to publish items for your AI worker to sell.
            </p>
          </div>
        ) : (
          filteredProducts.map(p => {
            const priceMinor = p.price * 100;
            const variantCount = p.variants?.length || 1;
            const totalStock = p.variants?.reduce((sum, v) => sum + v.stock_quantity, 0) ?? 10;

            return (
              <div 
                key={p.id}
                className="rounded-2xl bg-[#0D0805] border border-white/10 overflow-hidden hover:border-white/20 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full bg-black/60 relative overflow-hidden">
                    <img 
                      src={p.image_url} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center" 
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#E58330] border border-white/10">
                      {p.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                      {totalStock > 0 ? `${totalStock} In Stock` : 'Out of Stock'}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-syne font-bold text-sm text-white line-clamp-1">
                        {p.name}
                      </h3>
                      <span className="font-mono text-xs font-bold text-emerald-400 whitespace-nowrap">
                        {formatMinorUnits(priceMinor, currency)}
                      </span>
                    </div>

                    <p className="text-[11px] font-dm text-[#F5EDE4]/60 line-clamp-2">
                      {p.description}
                    </p>

                    {p.variants && p.variants.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {p.variants.map(v => (
                          <span key={v.id} className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#F5EDE4]/80">
                            {v.title}: {v.stock_quantity} left
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-white/[0.04] mt-2 flex items-center justify-between text-[11px] font-mono text-[#F5EDE4]/40">
                  <span>SKU: {p.sku}</span>
                  <span className="text-emerald-400">● Synced with AI</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#130C08] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-syne font-bold text-lg text-white">
                Add New Retail Product
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Men's Retro Leather Sneaker"
                  className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">Price ({currency})</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPriceMajor}
                    onChange={(e) => setNewPriceMajor(Number(e.target.value))}
                    className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                  <span className="text-[10px] font-mono text-[#F5EDE4]/40">Minor units: {newPriceMajor * 100}</span>
                </div>

                <div>
                  <label className="block font-mono text-[#F5EDE4]/70 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Footwear, Apparel, Accessories..."
                  className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-mono text-[#F5EDE4]/70 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                  className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-syne text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white font-syne font-bold text-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
