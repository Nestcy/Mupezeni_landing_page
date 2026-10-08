import { CatalogConnector, OrderConnector, BrandContextConnector } from './connectors';
import { Product, InventoryItem, Order, OrderItem, BrandContext } from '../../types/commerce';

/**
 * MupezeniCatalogProvider
 * The primary built-in commerce provider implementing CatalogConnector, OrderConnector & BrandContextConnector.
 * Future providers (ShopifyProvider, WooCommerceProvider) will implement the same interfaces,
 * allowing the Customer Revenue Worker and Marketing Worker to interact without knowing the provider.
 */
export class MupezeniCatalogProvider implements CatalogConnector, OrderConnector, BrandContextConnector {
  public providerName = 'mupezeni';

  async searchProducts(businessId: string, query: string, category?: string): Promise<Product[]> {
    try {
      const res = await fetch(`/api/commerce/products?businessId=${encodeURIComponent(businessId)}`);
      if (!res.ok) return [];
      const data = await res.json();
      const all: Product[] = data.products || [];

      return all.filter(p => {
        const matchesQuery = query 
          ? p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
          : true;
        const matchesCat = category && category !== 'All' ? p.category.toLowerCase() === category.toLowerCase() : true;
        return matchesQuery && matchesCat;
      });
    } catch (err) {
      console.error('searchProducts error:', err);
      return [];
    }
  }

  async getProduct(businessId: string, productId: string): Promise<Product | null> {
    try {
      const res = await fetch(`/api/commerce/products?businessId=${encodeURIComponent(businessId)}`);
      if (!res.ok) return null;
      const data = await res.json();
      const found = (data.products || []).find((p: Product) => p.id === productId);
      return found || null;
    } catch (err) {
      console.error('getProduct error:', err);
      return null;
    }
  }

  async checkAvailability(
    businessId: string, 
    productId: string, 
    variantId?: string | null
  ): Promise<{ isAvailable: boolean; quantity: number; status: 'in_stock' | 'low_stock' | 'out_of_stock' }> {
    try {
      const res = await fetch(`/api/commerce/inventory?businessId=${encodeURIComponent(businessId)}`);
      if (!res.ok) return { isAvailable: false, quantity: 0, status: 'out_of_stock' };
      const data = await res.json();
      const items: InventoryItem[] = data.inventory || [];

      const match = variantId 
        ? items.find(i => i.product_id === productId && i.variant_id === variantId)
        : items.find(i => i.product_id === productId);

      if (!match) {
        return { isAvailable: false, quantity: 0, status: 'out_of_stock' };
      }

      return {
        isAvailable: match.quantity > 0,
        quantity: match.quantity,
        status: match.availability_status
      };
    } catch (err) {
      console.error('checkAvailability error:', err);
      return { isAvailable: false, quantity: 0, status: 'out_of_stock' };
    }
  }

  async getInventory(businessId: string, productId?: string): Promise<InventoryItem[]> {
    try {
      const res = await fetch(`/api/commerce/inventory?businessId=${encodeURIComponent(businessId)}`);
      if (!res.ok) return [];
      const data = await res.json();
      const items: InventoryItem[] = data.inventory || [];
      if (productId) {
        return items.filter(i => i.product_id === productId);
      }
      return items;
    } catch (err) {
      console.error('getInventory error:', err);
      return [];
    }
  }

  async updateInventory(
    businessId: string, 
    productId: string, 
    variantId: string | null | undefined, 
    newQuantity: number
  ): Promise<InventoryItem | null> {
    try {
      const itemId = variantId || productId;
      const res = await fetch('/api/commerce/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, itemId, quantity: newQuantity })
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.item || null;
    } catch (err) {
      console.error('updateInventory error:', err);
      return null;
    }
  }

  async createOrder(
    businessId: string, 
    orderData: {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      customerAddress: string;
      items: OrderItem[];
      deliveryFee: number;
      currency: string;
      paymentMethod: string;
      deliveryOption: string;
    }
  ): Promise<Order> {
    const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + orderData.deliveryFee;

    const payload = {
      business_id: businessId,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress,
      items: orderData.items,
      subtotal,
      delivery_fee: orderData.deliveryFee,
      total,
      currency: orderData.currency,
      payment_method: orderData.paymentMethod,
      delivery_option: orderData.deliveryOption,
      status: 'pending' as const
    };

    const res = await fetch('/api/commerce/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error('Failed to create order');
    }
    const data = await res.json();
    return data.order;
  }

  async getOrders(businessId: string): Promise<Order[]> {
    try {
      const res = await fetch(`/api/commerce/orders?businessId=${encodeURIComponent(businessId)}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.orders || [];
    } catch (err) {
      console.error('getOrders error:', err);
      return [];
    }
  }

  async getOrder(businessId: string, orderId: string): Promise<Order | null> {
    const all = await this.getOrders(businessId);
    return all.find(o => o.id === orderId) || null;
  }

  async updateOrderStatus(businessId: string, orderId: string, status: Order['status']): Promise<Order | null> {
    // Return updated status placeholder
    const order = await this.getOrder(businessId, orderId);
    if (!order) return null;
    order.status = status;
    return order;
  }

  async getBrandContext(businessId: string): Promise<BrandContext | null> {
    try {
      const res = await fetch(`/api/commerce/brand-context?businessId=${encodeURIComponent(businessId)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.brandContext || null;
    } catch (err) {
      console.error('getBrandContext error:', err);
      return null;
    }
  }
}

// Export singleton instance of Mupezeni catalog provider
export const mupezeniCatalogProvider = new MupezeniCatalogProvider();
