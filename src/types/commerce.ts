export type CurrencyCode = 'ZMW' | 'USD' | 'EUR' | 'GBP' | 'KES' | 'ZAR';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface BusinessSocialLinks {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  industry: string;
  country: string;
  location?: string; // e.g. "Lusaka, Zambia" or "East Park Mall"
  currency: CurrencyCode;
  phone: string;
  email: string;
  social_links?: BusinessSocialLinks;
  has_existing_store: boolean | null;
  store_provider: 'mupezeni' | 'shopify' | 'woocommerce' | 'custom' | null;
  created_at: string;
  updated_at: string;
}

export interface BrandColors {
  primary: string;       // Primary brand color, e.g. #110B07
  secondary: string;     // Secondary background/card tone, e.g. #1A110B or #F5EDE4
  accent: string;        // Accent highlight, e.g. #B83A0A or #E58330
  background: string;    // Main canvas background, e.g. #070403
  text: string;          // Main typography color, e.g. #FAFAF9
}

export interface BrandTypography {
  heading_font: string;  // e.g. 'Syne' | 'Space Grotesk' | 'Inter' | 'Playfair Display' | 'Cabinet Grotesk'
  body_font: string;     // e.g. 'DM Sans' | 'Inter' | 'Plus Jakarta Sans' | 'System Sans'
  accent_font?: string;  // e.g. 'Space Grotesk' | 'Mono'
}

export interface BrandImageryPreferences {
  style: string;         // e.g. "Clean product photography", "Lifestyle in-context", "Editorial studio"
  background: string;    // e.g. "Neutral studio", "Minimal dark canvas", "Warm terracotta"
  composition: string;   // e.g. "Spacious and product-focused", "Dynamic angles with texture"
  graphic_style?: string; // e.g. "Minimalist Swiss typography", "Bold neon badges"
}

export interface BrandGuidelines {
  always: string[];      // e.g. ["Show prices in ZMW", "Include business logo", "Mention free delivery in Lusaka"]
  avoid: string[];       // e.g. ["Exaggerated claims", "Excessive emojis", "Cluttered designs", "Low-res images"]
}

export interface BrandProfile {
  id: string;
  business_id: string;
  logo_url: string;
  alternate_logo_url?: string;
  favicon_url?: string;
  colors: BrandColors;
  typography: BrandTypography;
  personality: string[]; // e.g. ['Bold', 'Premium', 'Streetwear Classic', 'Friendly']
  voice_summary: string; // e.g. "Confident but friendly. Keep captions conversational. Clear prices in ZMW."
  visual_style: string[]; // e.g. ['Minimal', 'Editorial', 'Product-focused', 'Modern']
  imagery: BrandImageryPreferences;
  guidelines: BrandGuidelines;
  created_at: string;
  updated_at: string;
}

/**
 * Structured Brand Context interface
 * Consumed by the Marketing Worker when generating posts, copy, advertisements and campaigns.
 * The Marketing Worker interacts through this context rather than querying raw DB tables.
 */
export interface BrandContext {
  brand_name: string;
  tone: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background?: string;
    text?: string;
  };
  typography: {
    heading: string;
    body: string;
    accent?: string;
  };
  visual_style: string[];
  imagery: {
    style: string;
    background: string;
    composition?: string;
  };
  guidelines: {
    always: string[];
    avoid: string[];
  };
  voice_summary?: string;
}

export interface DomainDnsRecord {
  type: 'A' | 'CNAME' | 'TXT';
  host: string;
  value: string;
  status: 'verified' | 'pending';
}

export interface Store {
  id: string;
  business_id: string;
  name: string;
  slug: string;
  default_subdomain: string; // e.g. "ernest-sneakers.mupezeni.com"
  custom_domain?: string;    // e.g. "www.ernestsneakers.com"
  custom_domain_status: 'not_configured' | 'pending_verification' | 'connected' | 'failed';
  primary_domain: 'subdomain' | 'custom';
  ssl_status: 'active' | 'provisioning' | 'pending';
  domain_dns_records?: DomainDnsRecord[];
  description: string;
  logo_url?: string;
  contact_email: string;
  contact_phone: string;
  social_links: BusinessSocialLinks;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Catalog {
  id: string;
  business_id: string;
  name: string;
  provider: 'mupezeni' | 'shopify' | 'woocommerce' | 'custom';
  is_active: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  business_id: string;
  product_id: string;
  title: string;
  sku: string;
  price_override?: number;
  attributes: Record<string, string>; // e.g. { size: '42', color: 'Black' }
  stock_quantity: number;
  is_available: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  catalog_id: string;
  name: string;
  description: string;
  price: number;
  currency: CurrencyCode;
  image_url: string;
  sku: string;
  category: string;
  is_available: boolean;
  has_variants: boolean;
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  business_id: string;
  product_id: string;
  variant_id?: string | null;
  product_name: string;
  variant_title?: string;
  sku: string;
  quantity: number;
  availability_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  updated_at: string;
}

export type PaymentMethodType = 'mobile_money' | 'bank_transfer' | 'cash_on_delivery' | 'card';

export interface PaymentConfig {
  id: string;
  business_id: string;
  supported_methods: PaymentMethodType[];
  instructions: {
    mobile_money?: string;
    bank_transfer?: string;
    cash_on_delivery?: string;
    card?: string;
  };
  provider_type: 'manual_mock' | 'paychangu' | 'stripe';
  updated_at: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  fee: number;
  estimated_time: string;
  enabled: boolean;
}

export interface DeliveryConfig {
  id: string;
  business_id: string;
  options: DeliveryOption[];
  provider_type: 'business_delivery' | 'yango' | 'dhl';
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  variant_id?: string;
  name: string;
  variant_title?: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  business_id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  currency: CurrencyCode;
  payment_method: PaymentMethodType | string;
  delivery_option: string;
  status: OrderStatus;
  created_at: string;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export type CommerceEventType = 
  | 'customer.created'
  | 'product.created'
  | 'product.updated'
  | 'inventory.updated'
  | 'cart.created'
  | 'cart.abandoned'
  | 'order.created'
  | 'payment.completed'
  | 'brand.updated'
  | 'store.published'
  | 'domain.connected';

export interface CommerceEvent {
  id: string;
  business_id: string;
  type: CommerceEventType;
  payload: Record<string, any>;
  created_at: string;
}
