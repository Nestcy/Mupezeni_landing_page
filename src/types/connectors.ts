import { Product, ProductVariant, CurrencyCode, Order, CartItem } from './commerce';

export type ConnectorType = 
  | 'mupezeni' 
  | 'shopify' 
  | 'woocommerce' 
  | 'custom_api' 
  | 'whatsapp_catalog';

export type ConnectorStatus = 'connected' | 'syncing' | 'error' | 'idle';

export interface ConnectorInfo {
  type: ConnectorType;
  name: string;
  badge: string;
  icon: string;
  description: string;
  storeName: string;
  storeDomain: string;
  currency: CurrencyCode;
  totalProducts: number;
  syncLatencyMs: number;
  status: ConnectorStatus;
  lastSyncedAt: string;
  supportedFeatures: string[];
}

export interface VisitorVisionContext {
  sessionId: string;
  activePage: string;
  activeProductId?: string;
  activeProductTitle?: string;
  activeProductPrice?: number;
  activeProductSku?: string;
  activeProductCategory?: string;
  activeProductStock?: number;
  activeProductImage?: string;
  dwellTimeSeconds: number;
  scrollDepthPercent: number;
  cartItemCount: number;
  cartTotal: number;
  recentSearches: string[];
  visitorLocation: string;
  referrerSource: string;
}

export type ConversationState = 
  | 'browsing' 
  | 'discovering' 
  | 'checking_stock' 
  | 'selecting_variant' 
  | 'ready_for_checkout' 
  | 'human_handoff';

export interface WorkerCapabilityExecution {
  capability: string;
  args: Record<string, any>;
  result: Record<string, any>;
  timestamp: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  channel: 'web_bubble' | 'whatsapp' | 'instagram_dm';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  conversationState?: ConversationState;
  toolCalls?: WorkerCapabilityExecution[];
  handoff?: {
    requested: boolean;
    contactPhone?: string;
    whatsappUrl?: string;
    reason?: string;
  };
  productCard?: {
    id: string;
    title: string;
    price: number;
    currency: CurrencyCode;
    imageUrl: string;
    stockQuantity: number;
    inStock: boolean;
    sku: string;
    variants?: { title: string; stock: number; sku: string }[];
  };
  checkoutLink?: {
    url: string;
    totalAmount: number;
    currency: CurrencyCode;
    summary: string;
  };
  connectorMeta?: {
    connectorUsed: ConnectorType;
    rpcMethod: string;
    latencyMs: number;
  };
}

export interface ConnectorRpcLog {
  id: string;
  timestamp: string;
  connectorType: ConnectorType;
  action: 'fetch_catalog' | 'check_inventory' | 'visitor_signal' | 'generate_checkout' | 'sync_order';
  endpoint: string;
  payload: Record<string, any>;
  response: Record<string, any>;
  durationMs: number;
  status: 'success' | 'warn' | 'error';
}

export interface ICommerceConnector {
  getType(): ConnectorType;
  getInfo(): ConnectorInfo;
  getProducts(query?: string, category?: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  checkInventory(productId: string, variantId?: string): Promise<{ inStock: boolean; quantity: number; sku: string }>;
  generateCheckoutSession(items: { productId: string; variantId?: string; quantity: number }[], customerInfo?: { name?: string; phone?: string; email?: string }): Promise<{ checkoutUrl: string; orderId: string; total: number }>;
}
