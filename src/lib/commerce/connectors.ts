import { Product, ProductVariant, InventoryItem, Order, OrderItem, BrandContext } from '../../types/commerce';

/**
 * CatalogConnector Interface
 * Core capability contract that AI Workers (e.g. Customer Support & Sales, Customer Revenue Worker)
 * and Storefront consume. Workers interact through connectors rather than direct DB queries.
 */
export interface CatalogConnector {
  providerName: string;

  searchProducts(businessId: string, query: string, category?: string): Promise<Product[]>;

  getProduct(businessId: string, productId: string): Promise<Product | null>;

  checkAvailability(
    businessId: string, 
    productId: string, 
    variantId?: string | null
  ): Promise<{ 
    isAvailable: boolean; 
    quantity: number; 
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
  }>;

  getInventory(businessId: string, productId?: string): Promise<InventoryItem[]>;

  updateInventory(
    businessId: string, 
    productId: string, 
    variantId: string | null | undefined, 
    newQuantity: number
  ): Promise<InventoryItem | null>;
}

/**
 * OrderConnector Interface
 * Core contract for order capture and fulfillment status.
 */
export interface OrderConnector {
  providerName: string;

  createOrder(
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
  ): Promise<Order>;

  getOrders(businessId: string): Promise<Order[]>;

  getOrder(businessId: string, orderId: string): Promise<Order | null>;

  updateOrderStatus(businessId: string, orderId: string, status: Order['status']): Promise<Order | null>;
}

/**
 * BrandContextConnector Interface
 * Capability contract for the Marketing Worker.
 * Enables the Marketing Worker to retrieve structured Brand Context
 * without direct raw database table queries.
 */
export interface BrandContextConnector {
  getBrandContext(businessId: string): Promise<BrandContext | null>;
}
