import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { 
  User, 
  Business, 
  Store, 
  BrandProfile, 
  BrandContext, 
  Product, 
  ProductVariant, 
  InventoryItem, 
  PaymentConfig, 
  DeliveryConfig, 
  Order, 
  CommerceEvent, 
  CommerceEventType 
} from '../types/commerce';

// Durable file-backed persistent data store for commerce server backend
const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'commerce_db.json');

const users: Map<string, { user: User; passwordHash: string }> = new Map();
const businesses: Map<string, Business> = new Map();
const stores: Map<string, Store> = new Map();
const brandProfiles: Map<string, BrandProfile> = new Map();
const products: Map<string, Product> = new Map();
const inventory: Map<string, InventoryItem> = new Map();
const paymentConfigs: Map<string, PaymentConfig> = new Map();
const deliveryConfigs: Map<string, DeliveryConfig> = new Map();
const orders: Map<string, Order> = new Map();
const approvals: Map<string, Approval> = new Map();
const conversations: Map<string, Conversation> = new Map();
const onboardings: Map<string, OnboardingState> = new Map();
const connectors: Map<string, ConnectorRecord> = new Map();
const aiSettingsMap: Map<string, AiSettings> = new Map();
const marketingCampaigns: Map<string, MarketingCampaign> = new Map();
const marketingContents: Map<string, MarketingContent> = new Map();
const adAccounts: Map<string, AdAccount> = new Map();
const adDrafts: Map<string, AdDraft> = new Map();
const adCampaigns: Map<string, AdCampaign> = new Map();
const metaAdsConnectors: Map<string, MetaAdsConnectorState> = new Map();
const events: CommerceEvent[] = [];
const resetTokens: Map<string, { email: string; expiresAt: number }> = new Map();
const activeSessions: Map<string, { userId: string; email: string; expiresAt: number }> = new Map();
const activeRefreshTokens: Map<string, { userId: string; email: string; expiresAt: number }> = new Map();

export interface ConnectorRecord {
  id: string;
  business_id: string;
  provider: 'shopify' | 'woocommerce' | 'mupezeni' | 'whatsapp' | 'facebook' | 'instagram' | 'web';
  status: 'connected' | 'disconnected' | 'pending';
  config?: any;
  credentials?: any;
  external_account_id?: string;
  name?: string;
  connected_at: string;
}

export interface Approval {
  id: string;
  business_id: string;
  type: 'discount' | 'refund' | 'campaign' | 'message';
  title: string;
  description: string;
  requested_by: string;
  status: 'pending' | 'approved' | 'rejected';
  amount_minor_units?: number;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

export interface ConversationMessage {
  id: string;
  conversation_id?: string;
  sender_type?: 'customer' | 'worker' | 'owner';
  sender?: 'customer' | 'ai' | 'human';
  text: string;
  status?: 'sent' | 'delivered' | 'read';
  timestamp: string;
  is_template?: boolean;
}

export interface Conversation {
  id: string;
  business_id: string;
  channel: 'whatsapp' | 'messenger' | 'instagram' | 'web';
  customer_name: string;
  customer_phone: string;
  last_message: string;
  unread: boolean;
  unread_count?: number;
  needs_human: boolean;
  status: 'open' | 'pending_human' | 'resolved';
  ai_paused?: boolean;
  window_open?: boolean;
  window_expires_at?: string;
  cart?: {
    id: string;
    items_count: number;
    subtotal: number;
    items: Array<{ name: string; quantity: number; price: number; variant_title?: string }>;
  };
  order?: {
    id: string;
    order_number: string;
    total: number;
    status: string;
    payment_status: string;
    created_at: string;
  };
  messages_count: number;
  updated_at: string;
  messages: ConversationMessage[];
}

export interface AiSettings {
  business_id: string;
  ai_enabled: boolean;
  auto_reply: boolean;
  takeover_timeout_minutes: number;
  confidence_threshold: number;
  updated_at: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action_tab: string;
}

export interface OnboardingState {
  business_id: string;
  status: 'pending' | 'in_progress' | 'active';
  steps: OnboardingStep[];
  completed_at?: string;
  can_activate?: boolean;
}

export interface MarketingPlanInput {
  platforms: string[];
  number_of_posts: number;
  start_date: string;
  cadence: 'daily' | 'twice_daily' | 'three_per_week' | 'weekly';
  product_ids?: string[];
  products_to_feature?: string[];
  tone_notes?: string;
}

export interface MarketingCampaign {
  id: string;
  business_id: string;
  status: 'generating' | 'ready' | 'active' | 'paused' | 'cancelled' | 'completed';
  name: string;
  platforms: string[];
  number_of_posts: number;
  start_date: string;
  cadence: string;
  tone_notes: string;
  featured_product_names: string[];
  created_at: string;
  updated_at: string;
  approved_at?: string | null;
  content_count: number;
  approved_count: number;
  published_count: number;
}

export interface MarketingContent {
  id: string;
  campaign_id: string;
  business_id: string;
  platform: 'instagram' | 'facebook' | 'whatsapp' | 'tiktok' | 'x';
  caption: string;
  image_url: string;
  scheduled_at: string;
  scheduled_at_lusaka: string;
  status: 'pending_approval' | 'needs_reapproval' | 'approved' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'rejected';
  content_hash: string;
  approval_required: boolean;
  approved_at?: string | null;
  published_at?: string | null;
  failure_reason?: string | null;
  retry_available?: boolean;
  retry_count?: number;
  last_retried_at?: string | null;
  created_at: string;
  updated_at: string;
}

export function computeContentHash(content: {
  platform: string;
  image_url: string;
  caption: string;
  scheduled_at: string;
}): string {
  const normPlatform = (content.platform || '').trim().toLowerCase();
  const normImg = (content.image_url || '').trim();
  const normCap = (content.caption || '').trim();
  const normDate = (content.scheduled_at || '').trim();
  const payload = `${normPlatform}::${normImg}::${normCap}::${normDate}`;
  return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

export function formatAfricaLusakaTime(dateInput: Date | string | number): string {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lusaka',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(d) + ' CAT (Africa/Lusaka)';
  } catch {
    return d.toISOString().replace('T', ' ').slice(0, 16) + ' CAT (Africa/Lusaka)';
  }
}

// Ads System Interfaces
export interface MetaAdsConnectorState {
  business_id: string;
  is_connected: boolean;
  auth_state: 'idle' | 'authorized' | 'connected';
  selected_ad_account_id?: string;
  selected_page_id?: string;
  ad_accounts: Array<{
    id: string;
    name: string;
    currency: string;
    timezone: string;
    status: string;
    balance_minor_units: number;
  }>;
  pages: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  connected_at?: string;
}

export interface AdAccount {
  id: string;
  business_id: string;
  account_name: string;
  currency: string;
  timezone: string;
  status: 'active' | 'paused' | 'disabled';
  hard_cap_minor_units: number; // The hard ceiling, e.g. 500,000 minor units (5,000 ZMW)
  monthly_spend_cap_minor_units: number; // e.g. 1,500,000 minor units (15,000 ZMW)
  current_spend_minor_units: number; // e.g. 145,000 minor units (1,450 ZMW)
  auto_pause_at_cap: boolean; // hard rule: UI must show cap & auto-pauses at cap
  is_connected: boolean;
  updated_at: string;
}

export interface AdDraftInput {
  goal: 'click_to_whatsapp' | 'catalog_sales' | 'store_traffic' | 'lead_generation';
  product_id?: string;
  product_name?: string;
  daily_budget_minor_units: number;
  start_date: string;
  end_date: string;
  audience?: {
    locations?: string[];
    age_min?: number;
    age_max?: number;
    interests?: string[];
    gender?: string;
  };
  prompt_notes?: string;
}

export interface AdCreative {
  id: string;
  headline: string;
  primary_text: string;
  call_to_action: string;
  image_url: string;
  description: string;
}

export interface AdDraft {
  id: string;
  business_id: string;
  goal: string;
  product_id?: string;
  product_name?: string;
  daily_budget_minor_units: number;
  start_date: string;
  end_date: string;
  total_days: number;
  max_possible_spend_minor_units: number; // clearly stated on approval screen
  currency: string;
  audience: {
    locations: string[];
    age_min: number;
    age_max: number;
    interests: string[];
    gender: string;
  };
  ai_creatives: AdCreative[];
  selected_creative_id?: string;
  status: 'draft_review' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface AdCampaign {
  id: string;
  business_id: string;
  ad_account_id: string;
  draft_id?: string;
  name: string;
  goal: string;
  status: 'active' | 'paused' | 'completed' | 'capped';
  daily_budget_minor_units: number;
  max_possible_spend_minor_units: number;
  current_spend_minor_units: number;
  hard_cap_minor_units: number;
  auto_pause_at_cap: boolean;
  currency: string;
  start_date: string;
  end_date: string;
  creative: AdCreative;
  audience: any;
  approved_at: string;
  approved_by: string;
  created_at: string;
  updated_at: string;
}

export interface DailyInsightPoint {
  date: string;
  spend_minor_units: number;
  clicks: number;
  conversions: number;
  impressions: number;
  ctr: number;
}

export interface AdCampaignInsights {
  campaign_id: string;
  total_spend_minor_units: number;
  total_clicks: number;
  total_conversions: number;
  total_impressions: number;
  average_ctr: number;
  cpc_minor_units: number;
  cost_per_conversion_minor_units: number;
  currency: string;
  daily: DailyInsightPoint[];
}

function saveToDisk() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const payload = {
      users: Array.from(users.entries()),
      businesses: Array.from(businesses.entries()),
      stores: Array.from(stores.entries()),
      brandProfiles: Array.from(brandProfiles.entries()),
      products: Array.from(products.entries()),
      inventory: Array.from(inventory.entries()),
      paymentConfigs: Array.from(paymentConfigs.entries()),
      deliveryConfigs: Array.from(deliveryConfigs.entries()),
      orders: Array.from(orders.entries()),
      approvals: Array.from(approvals.entries()),
      conversations: Array.from(conversations.entries()),
      onboardings: Array.from(onboardings.entries()),
      connectors: Array.from(connectors.entries()),
      marketingCampaigns: Array.from(marketingCampaigns.entries()),
      marketingContents: Array.from(marketingContents.entries()),
      adAccounts: Array.from(adAccounts.entries()),
      adDrafts: Array.from(adDrafts.entries()),
      adCampaigns: Array.from(adCampaigns.entries()),
      metaAdsConnectors: Array.from(metaAdsConnectors.entries()),
      events: events.slice(0, 100)
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save commerce data to disk:', err);
  }
}

function loadFromDisk(): boolean {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (data.users) users.clear();
      data.users?.forEach(([k, v]: [string, any]) => users.set(k, v));
      data.businesses?.forEach(([k, v]: [string, any]) => businesses.set(k, v));
      data.stores?.forEach(([k, v]: [string, any]) => stores.set(k, v));
      data.brandProfiles?.forEach(([k, v]: [string, any]) => brandProfiles.set(k, v));
      data.products?.forEach(([k, v]: [string, any]) => products.set(k, v));
      data.inventory?.forEach(([k, v]: [string, any]) => inventory.set(k, v));
      data.paymentConfigs?.forEach(([k, v]: [string, any]) => paymentConfigs.set(k, v));
      data.deliveryConfigs?.forEach(([k, v]: [string, any]) => deliveryConfigs.set(k, v));
      data.orders?.forEach(([k, v]: [string, any]) => orders.set(k, v));
      data.approvals?.forEach(([k, v]: [string, any]) => approvals.set(k, v));
      data.conversations?.forEach(([k, v]: [string, any]) => conversations.set(k, v));
      data.onboardings?.forEach(([k, v]: [string, any]) => onboardings.set(k, v));
      data.connectors?.forEach(([k, v]: [string, any]) => connectors.set(k, v));
      if (data.marketingCampaigns) {
        marketingCampaigns.clear();
        data.marketingCampaigns.forEach(([k, v]: [string, any]) => marketingCampaigns.set(k, v));
      }
      if (data.marketingContents) {
        marketingContents.clear();
        data.marketingContents.forEach(([k, v]: [string, any]) => marketingContents.set(k, v));
      }
      if (data.adAccounts) {
        adAccounts.clear();
        data.adAccounts.forEach(([k, v]: [string, any]) => adAccounts.set(k, v));
      }
      if (data.adDrafts) {
        adDrafts.clear();
        data.adDrafts.forEach(([k, v]: [string, any]) => adDrafts.set(k, v));
      }
      if (data.adCampaigns) {
        adCampaigns.clear();
        data.adCampaigns.forEach(([k, v]: [string, any]) => adCampaigns.set(k, v));
      }
      if (data.metaAdsConnectors) {
        metaAdsConnectors.clear();
        data.metaAdsConnectors.forEach(([k, v]: [string, any]) => metaAdsConnectors.set(k, v));
      }
      if (Array.isArray(data.events)) {
        events.length = 0;
        events.push(...data.events);
      }
      return true;
    }
  } catch (err) {
    console.warn('Failed to load commerce db from disk, falling back to seed data:', err);
  }
  return false;
}

// Helper to seed an initial demo business and store so the platform is immediately explorable
function initializeSeedData() {
  const demoUserId = 'usr_ernest_demo';
  const demoBusinessId = 'biz_ernest_sneakers';
  const demoStoreId = 'store_ernest_sneakers';

  // Seed User
  users.set('demo@mupezeni.ai', {
    user: {
      id: demoUserId,
      email: 'demo@mupezeni.ai',
      fullName: 'Ernest Zimba',
      createdAt: new Date().toISOString()
    },
    passwordHash: 'password123'
  });

  // Seed Business
  businesses.set(demoBusinessId, {
    id: demoBusinessId,
    owner_id: demoUserId,
    name: 'Ernest Sneakers Lusaka',
    description: 'Premier curated streetwear & classic sneakers in Lusaka, Zambia.',
    industry: 'Fashion & Footwear',
    country: 'Zambia',
    location: 'East Park & Cairo Road, Lusaka',
    currency: 'ZMW',
    phone: '+260 77 609 1393',
    email: 'ernest@sneakers.zm',
    social_links: {
      whatsapp: '260776091393',
      instagram: '@ernestsneakers_zm',
      facebook: 'Ernest Sneakers Lusaka',
      tiktok: '@ernestsneakers'
    },
    has_existing_store: false,
    store_provider: 'mupezeni',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Seed Brand Profile (First-Class Citizen)
  brandProfiles.set(demoBusinessId, {
    id: 'brand_ernest_sneakers',
    business_id: demoBusinessId,
    logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    alternate_logo_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    favicon_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=128&q=80',
    colors: {
      primary: '#110B07',
      secondary: '#1A110B',
      accent: '#B83A0A',
      background: '#070403',
      text: '#FAFAF9'
    },
    typography: {
      heading_font: 'Syne',
      body_font: 'DM Sans',
      accent_font: 'Space Grotesk'
    },
    personality: ['Bold', 'Premium', 'Streetwear Classic', 'Friendly'],
    voice_summary: 'Confident, direct and warm. Clear prices in Zambian Kwacha. Fast local delivery focus. Keep captions conversational.',
    visual_style: ['Minimal', 'Editorial', 'Product-focused', 'Modern'],
    imagery: {
      style: 'Clean product photography with dramatic studio lighting',
      background: 'Neutral studio and rich dark canvas',
      composition: 'Spacious and product-focused with high texture detail',
      graphic_style: 'Minimalist editorial badges with contrast accents'
    },
    guidelines: {
      always: [
        'Always show prices in Zambian Kwacha (ZMW)',
        'Highlight same-day Lusaka motorcycle dispatch',
        'Include official authentic guarantee stamp',
        'Feature WhatsApp direct support number +260 77 609 1393'
      ],
      avoid: [
        'Avoid exaggerated claims like 100% best in world',
        'Never make unverified shipping promises outside Lusaka',
        'Avoid cluttered layouts or low-resolution imagery',
        'Avoid excessive emojis (max 2 per post)'
      ]
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Seed Store with Custom Domain Architecture
  stores.set(demoStoreId, {
    id: demoStoreId,
    business_id: demoBusinessId,
    name: 'Ernest Sneakers',
    slug: 'ernest-sneakers',
    default_subdomain: 'ernest-sneakers.mupezeni.com',
    custom_domain: 'www.ernestsneakers.com',
    custom_domain_status: 'connected',
    primary_domain: 'subdomain',
    ssl_status: 'active',
    domain_dns_records: [
      { type: 'CNAME', host: 'www', value: 'cname.mupezeni.com', status: 'verified' },
      { type: 'A', host: '@', value: '76.76.21.21', status: 'verified' },
      { type: 'TXT', host: '_mupezeni-verify', value: 'mpz_verify_ernest_sneakers_9381', status: 'verified' }
    ],
    description: 'Authentic classic kicks, runners & streetwear with instant dispatch across Lusaka.',
    logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    contact_email: 'sales@ernestsneakers.com',
    contact_phone: '+260 77 609 1393',
    social_links: {
      whatsapp: '260776091393',
      instagram: '@ernestsneakers_zm',
      facebook: 'Ernest Sneakers Lusaka',
      tiktok: '@ernestsneakers'
    },
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Seed Products
  const prod1Id = 'prod_classic_sneaker';
  const prod1Variants: ProductVariant[] = [
    {
      id: 'var_cs_41_blk',
      business_id: demoBusinessId,
      product_id: prod1Id,
      title: 'Size 41 / Triple Black',
      sku: 'ES-CS-41-BLK',
      attributes: { size: '41', color: 'Triple Black' },
      stock_quantity: 4,
      is_available: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'var_cs_42_blk',
      business_id: demoBusinessId,
      product_id: prod1Id,
      title: 'Size 42 / Triple Black',
      sku: 'ES-CS-42-BLK',
      attributes: { size: '42', color: 'Triple Black' },
      stock_quantity: 6,
      is_available: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'var_cs_43_wht',
      business_id: demoBusinessId,
      product_id: prod1Id,
      title: 'Size 43 / Pure White',
      sku: 'ES-CS-43-WHT',
      attributes: { size: '43', color: 'Pure White' },
      stock_quantity: 3,
      is_available: true,
      created_at: new Date().toISOString()
    }
  ];

  products.set(prod1Id, {
    id: prod1Id,
    business_id: demoBusinessId,
    catalog_id: 'cat_default',
    name: "Men's Classic Urban Sneaker",
    description: 'Lightweight cushioned sole, breathable upper mesh, and premium matte overlays. Perfect for daily active wear.',
    price: 850,
    currency: 'ZMW',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    sku: 'ES-CS-001',
    category: 'Footwear',
    is_available: true,
    has_variants: true,
    variants: prod1Variants,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Inventory for prod1
  prod1Variants.forEach(v => {
    inventory.set(v.id, {
      id: `inv_${v.id}`,
      business_id: demoBusinessId,
      product_id: prod1Id,
      variant_id: v.id,
      product_name: "Men's Classic Urban Sneaker",
      variant_title: v.title,
      sku: v.sku,
      quantity: v.stock_quantity,
      availability_status: 'in_stock',
      updated_at: new Date().toISOString()
    });
  });

  const prod2Id = 'prod_retro_runner';
  const prod2Variants: ProductVariant[] = [
    {
      id: 'var_rr_40_gry',
      business_id: demoBusinessId,
      product_id: prod2Id,
      title: 'Size 40 / Retro Grey',
      sku: 'ES-RR-40-GRY',
      attributes: { size: '40', color: 'Retro Grey' },
      stock_quantity: 2,
      is_available: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'var_rr_42_gry',
      business_id: demoBusinessId,
      product_id: prod2Id,
      title: 'Size 42 / Retro Grey',
      sku: 'ES-RR-42-GRY',
      attributes: { size: '42', color: 'Retro Grey' },
      stock_quantity: 5,
      is_available: true,
      created_at: new Date().toISOString()
    }
  ];

  products.set(prod2Id, {
    id: prod2Id,
    business_id: demoBusinessId,
    catalog_id: 'cat_default',
    name: 'Air Cushion Vintage Runner',
    description: 'Heritage running silhouette with responsive heel air-unit and gum rubber traction outsole.',
    price: 1100,
    currency: 'ZMW',
    image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    sku: 'ES-RR-002',
    category: 'Footwear',
    is_available: true,
    has_variants: true,
    variants: prod2Variants,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  prod2Variants.forEach(v => {
    inventory.set(v.id, {
      id: `inv_${v.id}`,
      business_id: demoBusinessId,
      product_id: prod2Id,
      variant_id: v.id,
      product_name: 'Air Cushion Vintage Runner',
      variant_title: v.title,
      sku: v.sku,
      quantity: v.stock_quantity,
      availability_status: v.stock_quantity <= 2 ? 'low_stock' : 'in_stock',
      updated_at: new Date().toISOString()
    });
  });

  const prod3Id = 'prod_street_slides';
  products.set(prod3Id, {
    id: prod3Id,
    business_id: demoBusinessId,
    catalog_id: 'cat_default',
    name: 'Molded Comfort Street Slides',
    description: 'Ultra-cushioned EVA foam slides for relaxation, post-workout recovery or warm-day streetwear.',
    price: 350,
    currency: 'ZMW',
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    sku: 'ES-SS-003',
    category: 'Footwear',
    is_available: true,
    has_variants: false,
    variants: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  inventory.set(prod3Id, {
    id: `inv_${prod3Id}`,
    business_id: demoBusinessId,
    product_id: prod3Id,
    variant_id: null,
    product_name: 'Molded Comfort Street Slides',
    sku: 'ES-SS-003',
    quantity: 12,
    availability_status: 'in_stock',
    updated_at: new Date().toISOString()
  });

  // Seed Payment Config
  paymentConfigs.set(demoBusinessId, {
    id: 'pay_cfg_ernest',
    business_id: demoBusinessId,
    supported_methods: ['mobile_money', 'cash_on_delivery', 'bank_transfer'],
    instructions: {
      mobile_money: 'Airtel Money or MTN Mobile Money to +260 77 609 1393 (Ernest Zimba). Use your Order Number as Reference.',
      bank_transfer: 'FNB Zambia: Account #62819283929, Branch: Commercial Center Lusaka.',
      cash_on_delivery: 'Pay cash or Mobile Money on rider delivery inside Lusaka.'
    },
    provider_type: 'manual_mock',
    updated_at: new Date().toISOString()
  });

  // Seed Delivery Config
  deliveryConfigs.set(demoBusinessId, {
    id: 'del_cfg_ernest',
    business_id: demoBusinessId,
    options: [
      {
        id: 'del_local_express',
        name: 'Lusaka Same-Day Express (Motorcycle)',
        description: 'Dispatched via motorcycle rider within 2 to 4 hours inside Lusaka.',
        fee: 45,
        estimated_time: '2-4 hours',
        enabled: true
      },
      {
        id: 'del_store_pickup',
        name: 'East Park Storefront Pickup',
        description: 'Collect in-person from our East Park collection booth.',
        fee: 0,
        estimated_time: 'Instant / Same day',
        enabled: true
      },
      {
        id: 'del_nationwide_post',
        name: 'Nationwide Courier (Intercity)',
        description: 'Dispatch to Ndola, Kitwe, Livingstone, Solwezi via local courier.',
        fee: 95,
        estimated_time: '24-48 hours',
        enabled: true
      }
    ],
    provider_type: 'business_delivery',
    updated_at: new Date().toISOString()
  });

  // Seed Orders
  const order1Id = 'ord_demo_101';
  orders.set(order1Id, {
    id: order1Id,
    business_id: demoBusinessId,
    order_number: '#MPZ-4819',
    customer_name: 'Mwape Chanda',
    customer_email: 'mwape.c@gmail.com',
    customer_phone: '+260 97 881 2910',
    customer_address: 'Plot 42, Woodlands, Lusaka',
    items: [
      {
        product_id: prod1Id,
        variant_id: 'var_cs_42_blk',
        name: "Men's Classic Urban Sneaker",
        variant_title: 'Size 42 / Triple Black',
        price: 850,
        quantity: 1,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 850,
    delivery_fee: 45,
    total: 895,
    currency: 'ZMW',
    payment_method: 'mobile_money',
    delivery_option: 'Lusaka Same-Day Express (Motorcycle)',
    status: 'dispatched',
    created_at: new Date(Date.now() - 3600 * 1000 * 3).toISOString()
  });

  // Seed Approvals
  approvals.set('appr_1', {
    id: 'appr_1',
    business_id: demoBusinessId,
    type: 'discount',
    title: '15% Off VIP Courtesy Discount',
    description: 'AI Worker drafted 15% discount for repeat customer Mwamba Banda inquiring about Men Classic Urban Sneaker (Size 42)',
    requested_by: 'AI Sales Worker (WhatsApp)',
    status: 'pending',
    amount_minor_units: 12750, // ZMW 127.50
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString()
  });

  approvals.set('appr_2', {
    id: 'appr_2',
    business_id: demoBusinessId,
    type: 'refund',
    title: 'Delivery Fee Waiver Approval',
    description: 'Customer in Woodlands Lusaka requested waiver on late afternoon courier dispatch',
    requested_by: 'AI Customer Care',
    status: 'pending',
    amount_minor_units: 4500, // ZMW 45.00
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  });

  // Seed Conversations
  conversations.set('conv_1', {
    id: 'conv_1',
    business_id: demoBusinessId,
    channel: 'whatsapp',
    customer_name: 'Chileshe Mulenga',
    customer_phone: '+260 97 123 4567',
    last_message: 'Can I pay cash on delivery in Kabulonga or do you take Airtel Money?',
    unread: true,
    unread_count: 1,
    needs_human: false,
    status: 'open',
    ai_paused: false,
    window_open: true,
    window_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString(),
    cart: {
      id: 'cart_1',
      items_count: 1,
      subtotal: 85000,
      items: [
        { name: "Men's Classic Urban Sneaker", quantity: 1, price: 85000, variant_title: 'Size 42 - Triple Black' }
      ]
    },
    messages_count: 4,
    updated_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    messages: [
      { 
        id: 'm1', 
        conversation_id: 'conv_1',
        sender_type: 'customer', 
        sender: 'customer', 
        text: 'Hello, do you have sneakers in size 42?', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() 
      },
      { 
        id: 'm2', 
        conversation_id: 'conv_1',
        sender_type: 'worker', 
        sender: 'ai', 
        text: 'Yes! We have the Men\'s Classic Urban Sneaker in Size 42 (Triple Black) in stock for ZMW 850. Would you like me to reserve a pair for delivery?', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString() 
      },
      { 
        id: 'm3', 
        conversation_id: 'conv_1',
        sender_type: 'customer', 
        sender: 'customer', 
        text: 'Can I pay cash on delivery in Kabulonga or do you take Airtel Money?', 
        status: 'delivered',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString() 
      }
    ]
  });

  conversations.set('conv_2', {
    id: 'conv_2',
    business_id: demoBusinessId,
    channel: 'whatsapp',
    customer_name: 'Mutale Phiri',
    customer_phone: '+260 96 987 6543',
    last_message: 'I want to speak with the store manager regarding a bulk purchase of 10 pairs.',
    unread: true,
    unread_count: 2,
    needs_human: true,
    status: 'pending_human',
    ai_paused: false,
    window_open: false, // 24-hour window closed!
    window_expires_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    order: {
      id: 'ord_wholesale_01',
      order_number: 'MPZ-88910',
      total: 750000,
      status: 'pending',
      payment_status: 'unpaid',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString()
    },
    messages_count: 4,
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    messages: [
      { 
        id: 'm2_1', 
        conversation_id: 'conv_2',
        sender_type: 'customer', 
        sender: 'customer', 
        text: 'Good morning, do you do wholesale pricing for 10 pairs of the retro sneakers?', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() 
      },
      { 
        id: 'm2_2', 
        conversation_id: 'conv_2',
        sender_type: 'worker', 
        sender: 'ai', 
        text: 'Hello Mutale! For orders above 5 pairs, our owner provides a 15% wholesale discount. Connecting you now!', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString() 
      },
      { 
        id: 'm2_3', 
        conversation_id: 'conv_2',
        sender_type: 'customer', 
        sender: 'customer', 
        text: 'I want to speak with the store manager regarding a bulk purchase of 10 pairs.', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString() 
      }
    ]
  });

  conversations.set('conv_3', {
    id: 'conv_3',
    business_id: demoBusinessId,
    channel: 'instagram',
    customer_name: 'Kondwani Tembo',
    customer_phone: '+260 77 444 1122',
    last_message: 'Ordered via web checkout! Thanks for the quick sizing advice.',
    unread: false,
    unread_count: 0,
    needs_human: false,
    status: 'resolved',
    ai_paused: false,
    window_open: true,
    order: {
      id: 'ord_sample_99',
      order_number: 'MPZ-44109',
      total: 85000,
      status: 'confirmed',
      payment_status: 'paid',
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    messages_count: 4,
    updated_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    messages: [
      { 
        id: 'm3_1', 
        conversation_id: 'conv_3',
        sender_type: 'customer', 
        sender: 'customer', 
        text: 'Hi! Is size 42 true to size or should I size up?', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString() 
      },
      { 
        id: 'm3_2', 
        conversation_id: 'conv_3',
        sender_type: 'worker', 
        sender: 'ai', 
        text: 'Hi Kondwani! It fits true to size with genuine leather that softens nicely.', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 148).toISOString() 
      },
      { 
        id: 'm3_3', 
        conversation_id: 'conv_3',
        sender_type: 'customer', 
        sender: 'customer', 
        text: 'Ordered via web checkout! Thanks for the quick sizing advice.', 
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() 
      },
      {
        id: 'm3_4',
        conversation_id: 'conv_3',
        sender_type: 'worker',
        sender: 'ai',
        text: 'You\'re welcome! Your dispatch tracking will be shared here once packaged. Enjoy your sneakers!',
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString()
      }
    ]
  });

  conversations.set('conv_4', {
    id: 'conv_4',
    business_id: demoBusinessId,
    channel: 'web',
    customer_name: 'Thandiwe Banda',
    customer_phone: '+260 97 888 3344',
    last_message: 'Do you deliver to Roma Lusaka within 2 hours?',
    unread: true,
    unread_count: 1,
    needs_human: false,
    status: 'open',
    ai_paused: false,
    window_open: true,
    cart: {
      id: 'cart_4',
      items_count: 2,
      subtotal: 135000,
      items: [
        { name: "Retro Leather Lows", quantity: 1, price: 90000, variant_title: 'Size 43' },
        { name: "Sneaker Protect Spray", quantity: 1, price: 45000 }
      ]
    },
    messages_count: 3,
    updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    messages: [
      {
        id: 'm4_1',
        conversation_id: 'conv_4',
        sender_type: 'customer',
        sender: 'customer',
        text: 'Good afternoon, is same-day delivery available?',
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
      },
      {
        id: 'm4_2',
        conversation_id: 'conv_4',
        sender_type: 'worker',
        sender: 'ai',
        text: 'Good afternoon Thandiwe! Yes, we offer Same-Day Express Dispatch in Lusaka for ZMW 75.',
        status: 'read',
        timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString()
      },
      {
        id: 'm4_3',
        conversation_id: 'conv_4',
        sender_type: 'customer',
        sender: 'customer',
        text: 'Do you deliver to Roma Lusaka within 2 hours?',
        status: 'delivered',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      }
    ]
  });

  // Seed Onboarding
  onboardings.set(demoBusinessId, {
    business_id: demoBusinessId,
    status: 'in_progress',
    steps: [
      {
        id: 'step_connect_channel',
        title: 'Connect WhatsApp or Web Chat Widget',
        description: 'Link your WhatsApp Business Cloud API number or embed the chat bubble on your storefront.',
        completed: true,
        action_tab: 'connections'
      },
      {
        id: 'step_add_products',
        title: 'Add Retail Products & Inventory Stock',
        description: 'Publish your items with variants, sizing, and pricing in minor integer units.',
        completed: true,
        action_tab: 'products'
      },
      {
        id: 'step_delivery_payment',
        title: 'Configure Delivery Zones & Mobile Money',
        description: 'Set Lusaka / Copperbelt dispatch fees and Airtel / MTN Mobile Money numbers.',
        completed: true,
        action_tab: 'settings'
      },
      {
        id: 'step_ai_worker_voice',
        title: 'Set AI Worker Personality & Guidelines',
        description: 'Customize tone of voice, greeting messages, and human escalation triggers.',
        completed: false,
        action_tab: 'settings'
      },
      {
        id: 'step_test_ai_sales',
        title: 'Test Autonomous Sales in Live Simulator',
        description: 'Run sample queries to verify stock availability check and auto-checkout generation.',
        completed: false,
        action_tab: 'dashboard'
      }
    ]
  });

  // Seed Marketing Campaign & Content
  const seedCampaignId = 'cmp_lusaka_launch';
  const now = new Date();
  const scheduledTime1 = new Date(now.getTime() - 86400000 * 2).toISOString();
  const scheduledTime2 = new Date(now.getTime() + 86400000 * 1).toISOString();
  const scheduledTime3 = new Date(now.getTime() + 86400000 * 2).toISOString();
  const scheduledTime4 = new Date(now.getTime() + 86400000 * 3).toISOString();

  marketingCampaigns.set(seedCampaignId, {
    id: seedCampaignId,
    business_id: demoBusinessId,
    name: 'Lusaka Sneakerheads Autumn Drop',
    status: 'active',
    platforms: ['instagram', 'whatsapp', 'facebook', 'tiktok'],
    number_of_posts: 4,
    start_date: new Date().toISOString().slice(0, 10),
    cadence: 'daily',
    tone_notes: 'Streetwear culture, friendly Zambian English, highlight fast local delivery and Airtel/MTN mobile money.',
    featured_product_names: ['Nike Air Force 1 Classic', 'Adidas Samba OG', 'Air Jordan 4 Retro', 'New Balance 550'],
    created_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString(),
    approved_at: new Date(now.getTime() - 86400000 * 2).toISOString(),
    content_count: 4,
    approved_count: 2,
    published_count: 1
  });

  const post1: MarketingContent = {
    id: 'cnt_post_001',
    campaign_id: seedCampaignId,
    business_id: demoBusinessId,
    platform: 'instagram',
    caption: '🔥 Nike Air Force 1 Low Classic - Crisp Triple White restock just touched down in Lusaka! 🇿🇲 Same-day dispatch to East Park, Woodlands, and Kabulonga. Nationwide delivery via ZamPost courier. Order via WhatsApp or tap the link in bio! #LusakaSneakers #ZambiaStreetwear #AirForce1ZM',
    image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    scheduled_at: scheduledTime1,
    scheduled_at_lusaka: formatAfricaLusakaTime(scheduledTime1),
    status: 'published',
    content_hash: computeContentHash({
      platform: 'instagram',
      image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      caption: '🔥 Nike Air Force 1 Low Classic - Crisp Triple White restock just touched down in Lusaka! 🇿🇲 Same-day dispatch to East Park, Woodlands, and Kabulonga. Nationwide delivery via ZamPost courier. Order via WhatsApp or tap the link in bio! #LusakaSneakers #ZambiaStreetwear #AirForce1ZM',
      scheduled_at: scheduledTime1
    }),
    approval_required: true,
    approved_at: new Date(now.getTime() - 86400000 * 2).toISOString(),
    published_at: scheduledTime1,
    created_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString()
  };

  const post2: MarketingContent = {
    id: 'cnt_post_002',
    campaign_id: seedCampaignId,
    business_id: demoBusinessId,
    platform: 'whatsapp',
    caption: '👟 Exclusive Drop: Adidas Samba OG Cloud White & Core Black is here! The timeless terrace silhouette you\'ve been asking for. We accept Airtel Money and MTN MoMo on dispatch. Reply directly to this WhatsApp to lock in your UK size today!',
    image_url: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
    scheduled_at: scheduledTime2,
    scheduled_at_lusaka: formatAfricaLusakaTime(scheduledTime2),
    status: 'scheduled',
    content_hash: computeContentHash({
      platform: 'whatsapp',
      image_url: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
      caption: '👟 Exclusive Drop: Adidas Samba OG Cloud White & Core Black is here! The timeless terrace silhouette you\'ve been asking for. We accept Airtel Money and MTN MoMo on dispatch. Reply directly to this WhatsApp to lock in your UK size today!',
      scheduled_at: scheduledTime2
    }),
    approval_required: true,
    approved_at: new Date().toISOString(),
    created_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString()
  };

  const post3: MarketingContent = {
    id: 'cnt_post_003',
    campaign_id: seedCampaignId,
    business_id: demoBusinessId,
    platform: 'facebook',
    caption: '✨ Air Jordan 4 Retro \'White Cement\' - Premium tumbled leather, iconic cement speckling, and unmatched street presence. Strictly limited quantities available for in-store pickup at Cairo Road or express delivery anywhere across Zambia. Tap to chat with our AI team for instant sizing advice.',
    image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    scheduled_at: scheduledTime3,
    scheduled_at_lusaka: formatAfricaLusakaTime(scheduledTime3),
    status: 'pending_approval',
    content_hash: computeContentHash({
      platform: 'facebook',
      image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      caption: '✨ Air Jordan 4 Retro \'White Cement\' - Premium tumbled leather, iconic cement speckling, and unmatched street presence. Strictly limited quantities available for in-store pickup at Cairo Road or express delivery anywhere across Zambia. Tap to chat with our AI team for instant sizing advice.',
      scheduled_at: scheduledTime3
    }),
    approval_required: true,
    created_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString()
  };

  const post4: MarketingContent = {
    id: 'cnt_post_004',
    campaign_id: seedCampaignId,
    business_id: demoBusinessId,
    platform: 'tiktok',
    caption: '🎥 Lusaka Unboxing Drop: New Balance 550 Vintage White / Dark Green! On-feet styling video. Rate the drip from 1-10 in the comments! Cop yours via WhatsApp bio link. #NewBalance550 #LusakaDrip #ZedTikTok #ZambiaSneakers',
    image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    scheduled_at: scheduledTime4,
    scheduled_at_lusaka: formatAfricaLusakaTime(scheduledTime4),
    status: 'failed',
    failure_reason: 'Meta/TikTok Graph API connection timeout (504 Gateway Timeout) - Lusaka endpoint response delay. Ready for retry.',
    retry_available: true,
    retry_count: 1,
    content_hash: computeContentHash({
      platform: 'tiktok',
      image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      caption: '🎥 Lusaka Unboxing Drop: New Balance 550 Vintage White / Dark Green! On-feet styling video. Rate the drip from 1-10 in the comments! Cop yours via WhatsApp bio link. #NewBalance550 #LusakaDrip #ZedTikTok #ZambiaSneakers',
      scheduled_at: scheduledTime4
    }),
    approval_required: true,
    approved_at: new Date().toISOString(),
    created_at: new Date(now.getTime() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString()
  };

  marketingContents.set(post1.id, post1);
  marketingContents.set(post2.id, post2);
  marketingContents.set(post3.id, post3);
  marketingContents.set(post4.id, post4);

  // Seed Meta Ads Connector & Assets
  const metaConnector: MetaAdsConnectorState = {
    business_id: demoBusinessId,
    is_connected: true,
    auth_state: 'connected',
    selected_ad_account_id: 'act_ernest_meta_01',
    selected_page_id: 'page_ernest_sneakers',
    ad_accounts: [
      {
        id: 'act_ernest_meta_01',
        name: 'Ernest Sneakers Meta Ads (Zambia)',
        currency: 'ZMW',
        timezone: 'Africa/Lusaka',
        status: 'ACTIVE',
        balance_minor_units: 54000
      },
      {
        id: 'act_ernest_meta_backup',
        name: 'Ernest Commerce Secondary',
        currency: 'ZMW',
        timezone: 'Africa/Lusaka',
        status: 'ACTIVE',
        balance_minor_units: 20000
      }
    ],
    pages: [
      {
        id: 'page_ernest_sneakers',
        name: 'Ernest Sneakers Lusaka',
        category: 'Footwear & Fashion'
      },
      {
        id: 'page_ernest_lifestyle',
        name: 'Ernest Lifestyle & Drip',
        category: 'Apparel & Streetwear'
      }
    ],
    connected_at: new Date(now.getTime() - 86400000 * 14).toISOString()
  };
  metaAdsConnectors.set(demoBusinessId, metaConnector);

  // Seed Ad Account with currency, hard caps, and auto-pause settings
  const seedAdAccount: AdAccount = {
    id: 'act_ernest_meta_01',
    business_id: demoBusinessId,
    account_name: 'Ernest Sneakers Meta Ads (Zambia)',
    currency: 'ZMW',
    timezone: 'Africa/Lusaka',
    status: 'active',
    hard_cap_minor_units: 500000, // 5,000 ZMW hard limit
    monthly_spend_cap_minor_units: 1500000, // 15,000 ZMW monthly cap
    current_spend_minor_units: 145000, // 1,450 ZMW spent to date
    auto_pause_at_cap: true, // Hard Rule: auto-pauses at cap
    is_connected: true,
    updated_at: new Date().toISOString()
  };
  adAccounts.set(seedAdAccount.id, seedAdAccount);

  // Seed Ad Campaigns
  const liveCampaign1: AdCampaign = {
    id: 'ad_cmp_001',
    business_id: demoBusinessId,
    ad_account_id: seedAdAccount.id,
    draft_id: 'draft_ad_af1',
    name: 'Air Force 1 - Lusaka WhatsApp Inflow',
    goal: 'click_to_whatsapp',
    status: 'active',
    daily_budget_minor_units: 12000, // 120 ZMW/day
    max_possible_spend_minor_units: 84000, // 840 ZMW max
    current_spend_minor_units: 48000, // 480 ZMW spent
    hard_cap_minor_units: 500000,
    auto_pause_at_cap: true,
    currency: 'ZMW',
    start_date: new Date(now.getTime() - 86400000 * 4).toISOString().slice(0, 10),
    end_date: new Date(now.getTime() + 86400000 * 3).toISOString().slice(0, 10),
    creative: {
      id: 'cr_af1_01',
      headline: '🔥 Triple White Air Force 1 Low Restock',
      primary_text: 'Get authentic Nike Air Force 1 delivered directly to your doorstep in Lusaka today. Chat directly with our AI assistant on WhatsApp for instant sizing & dispatch!',
      call_to_action: 'Send WhatsApp Message',
      image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      description: 'ZMW 1,850.00 · Same-day delivery in Lusaka'
    },
    audience: {
      locations: ['Lusaka (+25km)'],
      age_min: 18,
      age_max: 45,
      interests: ['Sneakers', 'Streetwear', 'Fashion'],
      gender: 'all'
    },
    approved_at: new Date(now.getTime() - 86400000 * 4).toISOString(),
    approved_by: 'usr_ernest_demo',
    created_at: new Date(now.getTime() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString()
  };

  const pausedCampaign2: AdCampaign = {
    id: 'ad_cmp_002',
    business_id: demoBusinessId,
    ad_account_id: seedAdAccount.id,
    draft_id: 'draft_ad_samba',
    name: 'Samba OG Weekend Flash Retargeting',
    goal: 'catalog_sales',
    status: 'paused',
    daily_budget_minor_units: 15000, // 150 ZMW/day
    max_possible_spend_minor_units: 75000, // 750 ZMW max
    current_spend_minor_units: 30000, // 300 ZMW spent
    hard_cap_minor_units: 500000,
    auto_pause_at_cap: true,
    currency: 'ZMW',
    start_date: new Date(now.getTime() - 86400000 * 6).toISOString().slice(0, 10),
    end_date: new Date(now.getTime() - 86400000 * 1).toISOString().slice(0, 10),
    creative: {
      id: 'cr_samba_01',
      headline: '👟 Adidas Samba OG Cloud White Restock',
      primary_text: 'The iconic terrace classic is back in Lusaka! Pay on delivery via Airtel Money or MTN MoMo.',
      call_to_action: 'View Catalog & Chat',
      image_url: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
      description: 'ZMW 1,950.00 · Limited sizing available'
    },
    audience: {
      locations: ['Lusaka', 'Kitwe', 'Ndola'],
      age_min: 20,
      age_max: 40,
      interests: ['Football fashion', 'Terrace wear', 'Sneakers'],
      gender: 'all'
    },
    approved_at: new Date(now.getTime() - 86400000 * 6).toISOString(),
    approved_by: 'usr_ernest_demo',
    created_at: new Date(now.getTime() - 86400000 * 7).toISOString(),
    updated_at: new Date().toISOString()
  };

  adCampaigns.set(liveCampaign1.id, liveCampaign1);
  adCampaigns.set(pausedCampaign2.id, pausedCampaign2);

  // Seed Draft ready for review with AI-written creatives and approval screen
  const draftAd: AdDraft = {
    id: 'draft_ad_jordan4',
    business_id: demoBusinessId,
    goal: 'click_to_whatsapp',
    product_id: 'prod_aj4_cement',
    product_name: "Air Jordan 4 Retro 'White Cement'",
    daily_budget_minor_units: 15000, // 150 ZMW/day
    start_date: new Date(now.getTime() + 86400000 * 1).toISOString().slice(0, 10),
    end_date: new Date(now.getTime() + 86400000 * 8).toISOString().slice(0, 10),
    total_days: 7,
    max_possible_spend_minor_units: 105000, // 1,050 ZMW
    currency: 'ZMW',
    audience: {
      locations: ['Lusaka (+25km)', 'Kitwe', 'Ndola'],
      age_min: 18,
      age_max: 42,
      interests: ['Sneaker collecting', 'Basketball', 'Streetwear', 'Fashion'],
      gender: 'all'
    },
    ai_creatives: [
      {
        id: 'cr_jordan4_opt1',
        headline: "Air Jordan 4 Retro 'White Cement' Has Landed 🇿🇲",
        primary_text: 'Strictly limited pairs! Premium tumbled leather and iconic cement speckle wings. Tap below to chat instantly with our AI assistant on WhatsApp to secure your size before sold out.',
        call_to_action: 'Send WhatsApp Message',
        image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
        description: 'ZMW 2,400.00 · Cairo Road Store & Nationwide ZamPost Delivery'
      },
      {
        id: 'cr_jordan4_opt2',
        headline: 'Elevate Your Lusaka Sneaker Rotation',
        primary_text: 'Looking for 100% authentic Jordan 4s in Zambia? Reserve your size directly on WhatsApp in under 30 seconds. Same-day courier dispatch across Lusaka.',
        call_to_action: 'Chat on WhatsApp Now',
        image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
        description: 'Cash on delivery & Mobile Money accepted on arrival'
      }
    ],
    selected_creative_id: 'cr_jordan4_opt1',
    status: 'draft_review',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  adDrafts.set(draftAd.id, draftAd);
}

const hasLoaded = loadFromDisk();
if (!hasLoaded) {
  initializeSeedData();
  saveToDisk();
} else {
  // Ensure demo business has approvals/conversations/onboarding/marketing/ads if loaded from older disk snapshot
  if (
    approvals.size === 0 || 
    conversations.size === 0 || 
    onboardings.size === 0 || 
    marketingCampaigns.size === 0 ||
    adAccounts.size === 0
  ) {
    initializeSeedData();
    saveToDisk();
  }
}

export const commerceStore = {
  // Users
  createUser: (user: User, passwordHash: string) => {
    users.set(user.email.toLowerCase(), { user, passwordHash });
    saveToDisk();
    return user;
  },
  findUserByEmail: (email: string) => {
    return users.get(email.toLowerCase());
  },
  findUserById: (id: string) => {
    for (const record of users.values()) {
      if (record.user.id === id) return record;
    }
    return undefined;
  },
  updateUserPassword: (email: string, newPasswordHash: string) => {
    const record = users.get(email.toLowerCase());
    if (record) {
      record.passwordHash = newPasswordHash;
      saveToDisk();
      return true;
    }
    return false;
  },

  // Sessions & Auth Tokens
  createSession: (userId: string, email: string) => {
    const accessToken = `at_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const refreshToken = `rt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const expiresAt = Date.now() + 3600 * 1000 * 24; // 24 hours
    activeSessions.set(accessToken, { userId, email, expiresAt });
    activeRefreshTokens.set(refreshToken, { userId, email, expiresAt: Date.now() + 3600 * 1000 * 24 * 30 }); // 30 days
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt
    };
  },
  verifyAccessToken: (token: string) => {
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
    const session = activeSessions.get(cleanToken);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      activeSessions.delete(cleanToken);
      return null;
    }
    return session;
  },
  verifyRefreshToken: (token: string) => {
    const cleanToken = token.trim();
    const session = activeRefreshTokens.get(cleanToken);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      activeRefreshTokens.delete(cleanToken);
      return null;
    }
    return session;
  },
  revokeToken: (token: string) => {
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
    activeSessions.delete(cleanToken);
    activeRefreshTokens.delete(cleanToken);
  },
  createPasswordResetToken: (email: string) => {
    const token = `rst_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
    resetTokens.set(token, { email: email.toLowerCase(), expiresAt: Date.now() + 3600 * 1000 * 2 }); // 2 hours
    return token;
  },
  verifyPasswordResetToken: (token: string) => {
    const cleanToken = token.trim();
    const data = resetTokens.get(cleanToken);
    if (!data) return null;
    if (Date.now() > data.expiresAt) {
      resetTokens.delete(cleanToken);
      return null;
    }
    return data.email;
  },
  consumePasswordResetToken: (token: string) => {
    const cleanToken = token.trim();
    const email = resetTokens.get(cleanToken)?.email;
    resetTokens.delete(cleanToken);
    return email || null;
  },

  // Business
  getBusiness: (id: string): Business | undefined => businesses.get(id),
  getBusinessesByUser: (userId: string) => {
    const list = [];
    for (const biz of businesses.values()) {
      if (biz.owner_id === userId) {
        list.push({
          id: biz.id,
          name: biz.name,
          role: 'owner' as const,
          currency: biz.currency || 'ZMW',
          location: biz.location,
          phone: biz.phone
        });
      }
    }
    return list;
  },
  getBusinessByOwner: (ownerId: string): Business | undefined => {
    for (const biz of businesses.values()) {
      if (biz.owner_id === ownerId) return biz;
    }
    return undefined;
  },
  saveBusiness: (business: Business): Business => {
    businesses.set(business.id, business);
    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: business.id,
      type: 'customer.created',
      payload: { businessName: business.name },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return business;
  },

  // Brand Profile
  getBrandProfile: (businessId: string): BrandProfile | undefined => {
    return brandProfiles.get(businessId);
  },
  saveBrandProfile: (profile: BrandProfile): BrandProfile => {
    brandProfiles.set(profile.business_id, profile);
    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: profile.business_id,
      type: 'brand.updated',
      payload: { 
        colors: profile.colors, 
        typography: profile.typography, 
        personality: profile.personality 
      },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return profile;
  },
  getBrandContext: (businessId: string): BrandContext | null => {
    const biz = businesses.get(businessId);
    const profile = brandProfiles.get(businessId);
    if (!profile) return null;

    return {
      brand_name: biz?.name || 'Retail Brand',
      tone: profile.personality || ['Professional', 'Friendly'],
      colors: {
        primary: profile.colors?.primary || '#110B07',
        secondary: profile.colors?.secondary || '#F5EDE4',
        accent: profile.colors?.accent || '#B83A0A',
        background: profile.colors?.background || '#070403',
        text: profile.colors?.text || '#FAFAF9'
      },
      typography: {
        heading: profile.typography?.heading_font || 'Syne',
        body: profile.typography?.body_font || 'DM Sans',
        accent: profile.typography?.accent_font || 'Space Grotesk'
      },
      visual_style: profile.visual_style || ['Minimal', 'Product-focused'],
      imagery: {
        style: profile.imagery?.style || 'Clean product photography',
        background: profile.imagery?.background || 'Neutral studio',
        composition: profile.imagery?.composition || 'Product-focused'
      },
      guidelines: {
        always: profile.guidelines?.always || ['Show prices in ZMW'],
        avoid: profile.guidelines?.avoid || ['Exaggerated claims']
      },
      voice_summary: profile.voice_summary
    };
  },

  // Store
  getStore: (id: string): Store | undefined => stores.get(id),
  getStoreByBusiness: (businessId: string): Store | undefined => {
    for (const store of stores.values()) {
      if (store.business_id === businessId) return store;
    }
    return undefined;
  },
  getStoreBySlug: (slug: string): Store | undefined => {
    const cleanSlug = slug.toLowerCase().trim();
    for (const store of stores.values()) {
      if (store.slug.toLowerCase() === cleanSlug) return store;
    }
    return undefined;
  },
  getStoreByDomain: (domain: string): Store | undefined => {
    const clean = domain.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    for (const store of stores.values()) {
      if (store.default_subdomain?.toLowerCase() === clean) return store;
      if (store.custom_domain?.toLowerCase() === clean) return store;
      if (store.slug.toLowerCase() === clean) return store;
    }
    return undefined;
  },
  saveStore: (store: Store): Store => {
    stores.set(store.id, store);
    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: store.business_id,
      type: 'store.published',
      payload: { 
        slug: store.slug, 
        subdomain: store.default_subdomain,
        custom_domain: store.custom_domain 
      },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return store;
  },
  patchStore: (businessId: string, updates: Partial<Store>): Store => {
    let s = commerceStore.getStoreByBusiness(businessId);
    if (!s) {
      const biz = businesses.get(businessId);
      const name = updates.name || biz?.name || 'Retail Store';
      const slug = updates.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `store-${Date.now()}`;
      s = {
        id: `store_${businessId}`,
        business_id: businessId,
        name,
        slug,
        default_subdomain: `${slug}.mupezeni.com`,
        custom_domain_status: 'not_configured',
        primary_domain: 'subdomain',
        ssl_status: 'active',
        description: updates.description || `${name} online storefront`,
        about: updates.about || '',
        logo_url: updates.logo_url || '',
        colors: updates.colors || { primary: '#B83010', accent: '#E58330', background: '#070402', text: '#F7F5F0' },
        contact: updates.contact || { phone: biz?.phone || '+260 77 609 1393', email: biz?.email || 'store@mupezeni.ai' },
        contact_email: updates.contact_email || updates.contact?.email || biz?.email || 'store@mupezeni.ai',
        contact_phone: updates.contact_phone || updates.contact?.phone || biz?.phone || '+260 77 609 1393',
        social_links: {},
        is_published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    // Apply updates
    if (updates.name !== undefined) s.name = updates.name;
    if (updates.slug !== undefined) {
      s.slug = updates.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      s.default_subdomain = `${s.slug}.mupezeni.com`;
    }
    if (updates.logo_url !== undefined) s.logo_url = updates.logo_url;
    if (updates.colors !== undefined) s.colors = { ...s.colors, ...updates.colors };
    if (updates.about !== undefined) {
      s.about = updates.about;
      s.description = updates.about;
    }
    if (updates.contact !== undefined) {
      s.contact = { ...s.contact, ...updates.contact };
      if (updates.contact.phone) s.contact_phone = updates.contact.phone;
      if (updates.contact.email) s.contact_email = updates.contact.email;
    }
    if (updates.description !== undefined) s.description = updates.description;
    if (updates.is_published !== undefined) s.is_published = updates.is_published;
    s.updated_at = new Date().toISOString();

    stores.set(s.id, s);
    saveToDisk();
    return s;
  },
  publishStore: (businessId: string): Store => {
    let s = commerceStore.getStoreByBusiness(businessId);
    if (!s) {
      s = commerceStore.patchStore(businessId, { is_published: true });
    } else {
      s.is_published = true;
      s.updated_at = new Date().toISOString();
      stores.set(s.id, s);
      commerceStore.emitEvent({
        id: `evt_${Date.now()}`,
        business_id: businessId,
        type: 'store.published',
        payload: { slug: s.slug },
        created_at: new Date().toISOString()
      });
      saveToDisk();
    }
    return s;
  },
  updateStoreDomain: (
    storeId: string, 
    customDomain: string, 
    primaryDomain: 'subdomain' | 'custom' = 'custom'
  ): Store | undefined => {
    const s = stores.get(storeId);
    if (!s) return undefined;
    s.custom_domain = customDomain.trim().toLowerCase();
    s.custom_domain_status = 'connected';
    s.primary_domain = primaryDomain;
    s.ssl_status = 'active';
    s.domain_dns_records = [
      { type: 'CNAME', host: 'www', value: 'cname.mupezeni.com', status: 'verified' },
      { type: 'A', host: '@', value: '76.76.21.21', status: 'verified' },
      { type: 'TXT', host: '_mupezeni-verify', value: `mpz_verify_${s.slug}_${Date.now()}`, status: 'verified' }
    ];
    s.updated_at = new Date().toISOString();
    stores.set(storeId, s);

    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: s.business_id,
      type: 'domain.connected',
      payload: { domain: customDomain },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return s;
  },

  // Products
  getAllProducts: (): Product[] => {
    return Array.from(products.values());
  },
  getProductById: (id: string): Product | undefined => products.get(id),
  getProductsByBusiness: (businessId: string): Product[] => {
    const result: Product[] = [];
    for (const prod of products.values()) {
      if (prod.business_id === businessId) {
        result.push(prod);
      }
    }
    return result;
  },
  saveProduct: (product: Product): Product => {
    products.set(product.id, product);

    // Sync inventory entries
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach(variant => {
        inventory.set(variant.id, {
          id: `inv_${variant.id}`,
          business_id: product.business_id,
          product_id: product.id,
          variant_id: variant.id,
          product_name: product.name,
          variant_title: variant.title,
          sku: variant.sku,
          quantity: variant.stock_quantity,
          availability_status: variant.stock_quantity > 0 ? (variant.stock_quantity < 3 ? 'low_stock' : 'in_stock') : 'out_of_stock',
          updated_at: new Date().toISOString()
        });
      });
    } else {
      inventory.set(product.id, {
        id: `inv_${product.id}`,
        business_id: product.business_id,
        product_id: product.id,
        variant_id: null,
        product_name: product.name,
        sku: product.sku,
        quantity: 10,
        availability_status: 'in_stock',
        updated_at: new Date().toISOString()
      });
    }

    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: product.business_id,
      type: 'product.created',
      payload: { productId: product.id, name: product.name, price: product.price },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return product;
  },
  patchProduct: (productId: string, updates: Partial<Product>): Product | undefined => {
    const prod = products.get(productId);
    if (!prod) return undefined;
    const updated: Product = {
      ...prod,
      ...updates,
      updated_at: new Date().toISOString()
    };
    products.set(productId, updated);

    // Sync inventory
    if (updated.variants && updated.variants.length > 0) {
      updated.variants.forEach(variant => {
        inventory.set(variant.id, {
          id: `inv_${variant.id}`,
          business_id: updated.business_id,
          product_id: updated.id,
          variant_id: variant.id,
          product_name: updated.name,
          variant_title: variant.title,
          sku: variant.sku,
          quantity: variant.stock_quantity,
          availability_status: variant.stock_quantity > 0 ? (variant.stock_quantity < 3 ? 'low_stock' : 'in_stock') : 'out_of_stock',
          updated_at: new Date().toISOString()
        });
      });
    } else {
      const invItem = inventory.get(productId) || inventory.get(`inv_${productId}`);
      if (invItem) {
        invItem.product_name = updated.name;
        invItem.sku = updated.sku;
        invItem.updated_at = new Date().toISOString();
      }
    }

    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: updated.business_id,
      type: 'product.updated',
      payload: { productId: updated.id, name: updated.name, price: updated.price },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return updated;
  },
  deleteProduct: (productId: string): boolean => {
    const prod = products.get(productId);
    if (!prod) return false;
    products.delete(productId);
    if (prod.variants) {
      prod.variants.forEach(v => {
        inventory.delete(v.id);
        inventory.delete(`inv_${v.id}`);
      });
    }
    inventory.delete(productId);
    inventory.delete(`inv_${productId}`);
    saveToDisk();
    return true;
  },

  // Inventory
  getInventoryByBusiness: (businessId: string): InventoryItem[] => {
    const result: InventoryItem[] = [];
    for (const inv of inventory.values()) {
      if (inv.business_id === businessId) {
        result.push(inv);
      }
    }
    return result;
  },
  updateInventoryQuantity: (businessId: string, itemId: string, quantity: number): InventoryItem | undefined => {
    const item = inventory.get(itemId);
    if (!item || item.business_id !== businessId) return undefined;
    item.quantity = Math.max(0, quantity);
    item.availability_status = item.quantity === 0 ? 'out_of_stock' : item.quantity <= 2 ? 'low_stock' : 'in_stock';
    item.updated_at = new Date().toISOString();
    inventory.set(itemId, item);

    // Also sync product variant if applicable
    const prod = products.get(item.product_id);
    if (prod && prod.variants) {
      const v = prod.variants.find(varItem => varItem.id === item.variant_id);
      if (v) {
        v.stock_quantity = item.quantity;
        v.is_available = item.quantity > 0;
      }
    }

    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: businessId,
      type: 'inventory.updated',
      payload: { itemId, quantity: item.quantity, status: item.availability_status },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return item;
  },

  // Payment Config
  getPaymentConfig: (businessId: string): PaymentConfig | undefined => paymentConfigs.get(businessId),
  savePaymentConfig: (config: PaymentConfig): PaymentConfig => {
    paymentConfigs.set(config.business_id, config);
    saveToDisk();
    return config;
  },

  // Delivery Config
  getDeliveryConfig: (businessId: string): DeliveryConfig | undefined => deliveryConfigs.get(businessId),
  saveDeliveryConfig: (config: DeliveryConfig): DeliveryConfig => {
    deliveryConfigs.set(config.business_id, config);
    saveToDisk();
    return config;
  },

  // Orders
  getOrdersByBusiness: (businessId: string): Order[] => {
    const result: Order[] = [];
    for (const ord of orders.values()) {
      if (ord.business_id === businessId) {
        result.push(ord);
      }
    }
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },
  saveOrder: (order: Order): Order => {
    orders.set(order.id, order);

    // Deduct inventory
    order.items.forEach(orderItem => {
      const invKey = orderItem.variant_id || orderItem.product_id;
      const invItem = inventory.get(invKey);
      if (invItem) {
        invItem.quantity = Math.max(0, invItem.quantity - orderItem.quantity);
        invItem.availability_status = invItem.quantity === 0 ? 'out_of_stock' : invItem.quantity <= 2 ? 'low_stock' : 'in_stock';
        invItem.updated_at = new Date().toISOString();
      }
    });

    commerceStore.emitEvent({
      id: `evt_${Date.now()}`,
      business_id: order.business_id,
      type: 'order.created',
      payload: { orderId: order.id, orderNumber: order.order_number, total: order.total },
      created_at: new Date().toISOString()
    });
    saveToDisk();
    return order;
  },

  // Events
  emitEvent: (event: CommerceEvent) => {
    events.unshift(event);
    if (events.length > 200) events.pop();
  },
  getEventsByBusiness: (businessId: string): CommerceEvent[] => {
    return events.filter(e => e.business_id === businessId);
  },

  // Approvals (GET /businesses/{id}/approvals?status=pending)
  getApprovals: (businessId: string, status?: string): Approval[] => {
    const list: Approval[] = [];
    for (const app of approvals.values()) {
      if (app.business_id === businessId) {
        if (!status || app.status === status) {
          list.push(app);
        }
      }
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },
  getApprovalById: (id: string): Approval | undefined => approvals.get(id),
  updateApprovalStatus: (id: string, status: 'approved' | 'rejected', resolvedBy?: string): Approval | undefined => {
    const app = approvals.get(id);
    if (!app) return undefined;
    app.status = status;
    app.resolved_at = new Date().toISOString();
    if (resolvedBy) app.resolved_by = resolvedBy;
    approvals.set(id, app);
    saveToDisk();
    return app;
  },
  createApproval: (approval: Approval): Approval => {
    approvals.set(approval.id, approval);
    saveToDisk();
    return approval;
  },

  // Conversations (Inbox live data & polling)
  getConversations: (businessId: string): Conversation[] => {
    const list: Conversation[] = [];
    for (const c of conversations.values()) {
      if (c.business_id === businessId) {
        list.push(c);
      }
    }
    return list.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  },
  getConversationById: (id: string): Conversation | undefined => conversations.get(id),
  getConversationMessages: (conversationId: string, after?: string): ConversationMessage[] => {
    const c = conversations.get(conversationId);
    if (!c) return [];
    if (!after) return c.messages;
    const afterTime = new Date(after).getTime();
    if (!isNaN(afterTime)) {
      return c.messages.filter(m => new Date(m.timestamp).getTime() > afterTime);
    }
    const idx = c.messages.findIndex(m => m.id === after);
    if (idx >= 0) {
      return c.messages.slice(idx + 1);
    }
    return c.messages;
  },
  takeoverConversation: (conversationId: string): Conversation | undefined => {
    const c = conversations.get(conversationId);
    if (!c) return undefined;
    c.ai_paused = true;
    c.needs_human = false;
    c.status = 'open';
    c.updated_at = new Date().toISOString();
    conversations.set(conversationId, c);
    saveToDisk();
    return c;
  },
  releaseConversation: (conversationId: string): Conversation | undefined => {
    const c = conversations.get(conversationId);
    if (!c) return undefined;
    c.ai_paused = false;
    c.updated_at = new Date().toISOString();
    conversations.set(conversationId, c);
    saveToDisk();
    return c;
  },
  addConversationMessage: (
    conversationId: string, 
    senderTypeOrSender: 'customer' | 'worker' | 'owner' | 'ai' | 'human', 
    text: string,
    isTemplate?: boolean
  ): Conversation | undefined => {
    const c = conversations.get(conversationId);
    if (!c) return undefined;

    let senderType: 'customer' | 'worker' | 'owner' = 'customer';
    if (senderTypeOrSender === 'customer') senderType = 'customer';
    else if (senderTypeOrSender === 'worker' || senderTypeOrSender === 'ai') senderType = 'worker';
    else senderType = 'owner';

    const msg: ConversationMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      conversation_id: conversationId,
      sender_type: senderType,
      sender: senderType === 'worker' ? 'ai' : senderType === 'owner' ? 'human' : 'customer',
      text,
      status: senderType === 'customer' ? 'delivered' : 'read',
      timestamp: new Date().toISOString(),
      is_template: Boolean(isTemplate)
    };
    c.messages.push(msg);
    c.last_message = text;
    c.messages_count += 1;
    c.updated_at = new Date().toISOString();

    if (senderType === 'customer') {
      c.unread = true;
      c.unread_count = (c.unread_count || 0) + 1;
      c.window_open = true;
      c.window_expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    } else {
      c.unread = false;
      c.unread_count = 0;
      if (senderType === 'owner') {
        c.needs_human = false;
      }
      if (isTemplate) {
        c.window_open = true;
        c.window_expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
      }
    }

    conversations.set(conversationId, c);
    saveToDisk();
    return c;
  },
  resolveConversation: (conversationId: string): Conversation | undefined => {
    const c = conversations.get(conversationId);
    if (!c) return undefined;
    c.status = 'resolved';
    c.needs_human = false;
    c.unread = false;
    c.updated_at = new Date().toISOString();
    conversations.set(conversationId, c);
    saveToDisk();
    return c;
  },

  // AI Settings (GET /businesses/{id}/ai-settings, PATCH)
  getAiSettings: (businessId: string): AiSettings => {
    let settings = aiSettingsMap.get(businessId);
    if (!settings) {
      settings = {
        business_id: businessId,
        ai_enabled: true,
        auto_reply: true,
        takeover_timeout_minutes: 30,
        confidence_threshold: 0.85,
        updated_at: new Date().toISOString()
      };
      aiSettingsMap.set(businessId, settings);
    }
    return settings;
  },
  updateAiSettings: (businessId: string, updates: Partial<AiSettings>): AiSettings => {
    const current = commerceStore.getAiSettings(businessId);
    const updated = {
      ...current,
      ...updates,
      updated_at: new Date().toISOString()
    };
    aiSettingsMap.set(businessId, updated);
    saveToDisk();
    return updated;
  },

  // Connectors (GET /businesses/{id}/connectors, POST, DELETE)
  saveConnector: (connector: ConnectorRecord): ConnectorRecord => {
    connectors.set(`${connector.business_id}_${connector.provider}`, connector);
    saveToDisk();
    return connector;
  },
  getConnectors: (businessId: string): ConnectorRecord[] => {
    const list: ConnectorRecord[] = [];
    for (const c of connectors.values()) {
      if (c.business_id === businessId && c.status === 'connected') {
        list.push(c);
      }
    }
    return list;
  },
  getConnector: (businessId: string, provider: string): ConnectorRecord | undefined => {
    return connectors.get(`${businessId}_${provider}`);
  },
  deleteConnector: (businessId: string, provider: string): boolean => {
    let deleted = false;
    for (const [key, c] of connectors.entries()) {
      if (c.business_id === businessId && c.provider === provider) {
        connectors.delete(key);
        deleted = true;
      }
    }
    const directKey = `${businessId}_${provider}`;
    if (connectors.has(directKey)) {
      connectors.delete(directKey);
      deleted = true;
    }
    if (deleted) {
      saveToDisk();
    }
    return deleted;
  },

  // Onboarding (GET /businesses/{id}/onboarding, POST activate)
  getOnboarding: (businessId: string): OnboardingState => {
    let ob = onboardings.get(businessId);
    
    // Check connector state
    const bizConnectors = commerceStore.getConnectors(businessId);
    const hasCatalog = bizConnectors.some(c => ['shopify', 'woocommerce', 'mupezeni'].includes(c.provider));
    const hasChannel = bizConnectors.some(c => ['whatsapp', 'facebook', 'instagram', 'web'].includes(c.provider));
    
    // can_activate is true when catalog and at least one channel are connected
    const canActivate = hasCatalog && hasChannel;

    if (!ob) {
      ob = {
        business_id: businessId,
        status: 'in_progress',
        steps: [
          {
            id: 'step_business_details',
            title: 'Business Details & Operational Path',
            description: 'Store information, country, currency, and retail path configured.',
            completed: true,
            action_tab: 'settings'
          },
          {
            id: 'step_catalog_connect',
            title: 'Catalog Connected',
            description: 'Catalog connected via Shopify, WooCommerce, or Mupezeni storefront.',
            completed: hasCatalog,
            action_tab: 'products'
          },
          {
            id: 'step_channels_connect',
            title: 'Channels Connected',
            description: 'WhatsApp Cloud API, Meta, or Website Chat widget connected.',
            completed: hasChannel,
            action_tab: 'connections'
          },
          {
            id: 'step_activate_worker',
            title: 'AI Worker Activated',
            description: 'Autonomous retail worker live and ready to take customer inquiries.',
            completed: false,
            action_tab: 'dashboard'
          }
        ],
        can_activate: canActivate
      };
      onboardings.set(businessId, ob);
      saveToDisk();
    } else {
      // Sync dynamic step completions and can_activate
      const stepBiz = ob.steps.find(s => s.id === 'step_business_details');
      if (stepBiz) stepBiz.completed = true;
      const stepCat = ob.steps.find(s => s.id === 'step_catalog_connect');
      if (stepCat) stepCat.completed = hasCatalog;
      const stepChan = ob.steps.find(s => s.id === 'step_channels_connect');
      if (stepChan) stepChan.completed = hasChannel;
      const stepAct = ob.steps.find(s => s.id === 'step_activate_worker');
      if (stepAct) stepAct.completed = ob.status === 'active';

      ob.can_activate = canActivate || ob.status === 'active';
      if (ob.status === 'active') {
        ob.steps.forEach(s => s.completed = true);
      }
    }

    return ob;
  },
  activateOnboarding: (businessId: string): OnboardingState => {
    const ob = commerceStore.getOnboarding(businessId);
    ob.status = 'active';
    ob.can_activate = true;
    ob.completed_at = new Date().toISOString();
    ob.steps.forEach(s => s.completed = true);
    onboardings.set(businessId, ob);
    saveToDisk();
    return ob;
  },
  updateOnboardingStep: (businessId: string, stepId: string, completed: boolean): OnboardingState => {
    const ob = commerceStore.getOnboarding(businessId);
    const step = ob.steps.find(s => s.id === stepId);
    if (step) {
      step.completed = completed;
    }
    const allCompleted = ob.steps.every(s => s.completed);
    if (allCompleted) {
      ob.status = 'active';
      ob.completed_at = new Date().toISOString();
    }
    onboardings.set(businessId, ob);
    saveToDisk();
    return ob;
  },
  setOnboardingStatus: (businessId: string, status: 'pending' | 'in_progress' | 'active'): OnboardingState => {
    const ob = commerceStore.getOnboarding(businessId);
    ob.status = status;
    if (status === 'active') {
      ob.steps.forEach(s => s.completed = true);
      ob.completed_at = new Date().toISOString();
      ob.can_activate = true;
    }
    onboardings.set(businessId, ob);
    saveToDisk();
    return ob;
  },

  // Onboarding Business Creation (Step 1)
  createOnboardingBusiness: (data: {
    name: string;
    path: 'existing_retail' | 'mupezeni_managed';
    country: string;
    currency: string;
    phone: string;
    email: string;
    userId?: string;
  }): Business => {
    const bizId = `biz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newBiz: Business = {
      id: bizId,
      owner_id: data.userId || 'usr_ernest_demo',
      name: data.name.trim(),
      description: data.path === 'existing_retail' 
        ? 'Connected retail store powered by Mupezeni AI workers.' 
        : 'Mupezeni managed storefront and autonomous retail catalog.',
      industry: 'Retail & Consumer Goods',
      country: data.country || 'Zambia',
      location: 'Lusaka, Zambia',
      currency: (data.currency as any) || 'ZMW',
      phone: data.phone || '+260 77 609 1393',
      email: data.email || 'store@mupezeni.ai',
      has_existing_store: data.path === 'existing_retail',
      store_provider: data.path === 'existing_retail' ? 'shopify' : 'mupezeni',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    businesses.set(bizId, newBiz);

    // If mupezeni_managed, automatically provision a store shell
    if (data.path === 'mupezeni_managed') {
      const storeId = `store_${bizId}`;
      const slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || `store-${Date.now()}`;
      stores.set(storeId, {
        id: storeId,
        business_id: bizId,
        name: data.name,
        slug,
        default_subdomain: `${slug}.mupezeni.com`,
        custom_domain_status: 'not_configured',
        primary_domain: 'subdomain',
        ssl_status: 'active',
        description: `${data.name} online storefront`,
        contact_email: data.email || 'store@mupezeni.ai',
        contact_phone: data.phone || '+260 77 609 1393',
        social_links: {},
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }

    // Initialize fresh onboarding state
    commerceStore.getOnboarding(bizId);
    saveToDisk();
    return newBiz;
  },

  // Dashboard Stats
  getDashboardStats: (businessId: string) => {
    const bizApprovals = commerceStore.getApprovals(businessId);
    const pendingApprovals = bizApprovals.filter(a => a.status === 'pending');
    const bizConversations = commerceStore.getConversations(businessId);
    const needingHuman = bizConversations.filter(c => c.needs_human || c.status === 'pending_human');
    const unreadConvos = bizConversations.filter(c => c.unread);
    
    // Count today's messages
    const todayStr = new Date().toISOString().slice(0, 10);
    let todayMessages = 0;
    bizConversations.forEach(c => {
      c.messages.forEach(m => {
        if (m.timestamp && m.timestamp.slice(0, 10) === todayStr) {
          todayMessages += 1;
        }
      });
    });
    // Add baseline activity if early morning
    if (todayMessages === 0) {
      todayMessages = bizConversations.reduce((acc, c) => acc + c.messages_count, 0);
    }

    const bizOrders = commerceStore.getOrdersByBusiness(businessId);
    // Money is integer minor units per Hard Rule 6
    const totalMinorUnits = bizOrders.reduce((sum, o) => sum + (o.total * 100), 0);

    return {
      today_messages_count: todayMessages,
      open_conversations_needing_human: needingHuman.length,
      unread_conversations_count: unreadConvos.length,
      orders_count: bizOrders.length,
      total_revenue_minor_units: totalMinorUnits,
      pending_approvals_count: pendingApprovals.length,
      pending_approvals: pendingApprovals.slice(0, 5),
      conversations_needing_human: needingHuman.slice(0, 5)
    };
  },

  // ==========================================
  // AUTONOMOUS MARKETING & CAMPAIGNS
  // ==========================================

  // Create Marketing Plan: POST /businesses/{id}/marketing/plans (returns 202)
  createMarketingPlan: (businessId: string, input: MarketingPlanInput): { campaign: MarketingCampaign; items: MarketingContent[] } => {
    const cid = `cmp_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const platforms = input.platforms && input.platforms.length > 0 
      ? (input.platforms as any[]) 
      : ['instagram', 'facebook', 'whatsapp', 'tiktok'];
    const postCount = Math.max(1, Math.min(Number(input.number_of_posts) || 5, 30));
    const cadence = input.cadence || 'daily';
    const startDateStr = input.start_date || new Date().toISOString().slice(0, 10);
    const toneNotes = input.tone_notes || 'Warm, energetic Zambian retail tone highlighting Lusaka same-day delivery & Airtel/MTN mobile money.';

    // Fetch existing products to feature realistic catalog items
    const storeProducts: Product[] = commerceStore.getProductsByBusiness(businessId);
    const productNames = input.products_to_feature && input.products_to_feature.length > 0
      ? input.products_to_feature
      : storeProducts.length > 0
        ? storeProducts.map((p: Product) => p.name)
        : ['Nike Air Force 1 Classic', 'Adidas Samba OG', 'Air Jordan 4 Retro', 'New Balance 550', 'Molded Comfort Slides'];

    const curatedImages = [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
    ];

    const generatedItems: MarketingContent[] = [];
    const baseDate = new Date(startDateStr);
    if (isNaN(baseDate.getTime())) {
      baseDate.setTime(Date.now());
    }

    for (let i = 0; i < postCount; i++) {
      const platform = platforms[i % platforms.length] as 'instagram' | 'facebook' | 'whatsapp' | 'tiktok' | 'x';
      const prodName = productNames[i % productNames.length];
      
      // Calculate scheduled date based on cadence in Lusaka time
      const itemDate = new Date(baseDate.getTime());
      if (cadence === 'daily') {
        itemDate.setDate(itemDate.getDate() + i);
        itemDate.setHours(10, 0, 0, 0);
      } else if (cadence === 'twice_daily') {
        const dayOffset = Math.floor(i / 2);
        itemDate.setDate(itemDate.getDate() + dayOffset);
        if (i % 2 === 0) {
          itemDate.setHours(10, 0, 0, 0);
        } else {
          itemDate.setHours(18, 0, 0, 0);
        }
      } else if (cadence === 'three_per_week') {
        itemDate.setDate(itemDate.getDate() + (i * 2));
        itemDate.setHours(11, 0, 0, 0);
      } else {
        // weekly
        itemDate.setDate(itemDate.getDate() + (i * 7));
        itemDate.setHours(10, 0, 0, 0);
      }

      const scheduledIso = itemDate.toISOString();
      const scheduledLusaka = formatAfricaLusakaTime(itemDate);

      // Match image from product if available or curated list
      const matchedProd = storeProducts.find((p: Product) => p.name.toLowerCase() === prodName.toLowerCase());
      const imageUrl = matchedProd?.image_url || curatedImages[i % curatedImages.length];

      // Tailor copy according to platform, product, and tone
      let caption = '';
      if (platform === 'whatsapp') {
        caption = `👟 Exclusive WhatsApp Drop: ${prodName} is now in stock at our Lusaka hub!\n\n` +
          `• 100% Verified Genuine\n` +
          `• Same-day express dispatch across Lusaka (East Park, Woodlands, Kabulonga)\n` +
          `• We accept Airtel Money & MTN Mobile Money on delivery\n\n` +
          `Reply directly with your shoe size to reserve your pair before sizes sell out! 📦🇿🇲`;
      } else if (platform === 'instagram') {
        caption = `🔥 Streetwear essential: ${prodName} just landed! Clean silhouette, premium comfort, and unmistakable style.\n\n` +
          `Available now at our store. Tap link in bio or message our WhatsApp for instant sizing support.\n\n` +
          `#LusakaSneakers #ZambiaFashion #ZedStreetwear #SneakersLusaka #EastParkMall #LusakaDelivery #AirtelMoneyZM`;
      } else if (platform === 'facebook') {
        caption = `✨ Attention Lusaka Sneaker Lovers! Fresh drop of ${prodName} is officially available for orders.\n\n` +
          `Visit our Cairo Road showroom or order online with same-day express delivery anywhere in Lusaka. Copperbelt & Ndola delivery via ZamPost courier within 24 hours.\n\n` +
          `Order via our WhatsApp button below or pay easily via Mobile Money.`;
      } else if (platform === 'tiktok') {
        caption = `🎥 On-feet look: ${prodName} unboxing in Lusaka! Check the stitching and detail. Rate this pair 1-10 in the comments! 👇 Tap bio link or WhatsApp for available UK sizes. #ZedTikTok #LusakaSneakers #SneakerheadZM #ZambiaDrip`;
      } else {
        caption = `Fresh drop: ${prodName} now in stock in Lusaka! Same-day dispatch & Mobile Money accepted. Order via WhatsApp catalog now. #LusakaFashion`;
      }

      const contentHash = computeContentHash({
        platform,
        image_url: imageUrl,
        caption,
        scheduled_at: scheduledIso
      });

      const contentItem: MarketingContent = {
        id: `cnt_${Date.now().toString(36)}_${i}_${Math.random().toString(36).substring(2, 6)}`,
        campaign_id: cid,
        business_id: businessId,
        platform,
        caption,
        image_url: imageUrl,
        scheduled_at: scheduledIso,
        scheduled_at_lusaka: scheduledLusaka,
        status: 'pending_approval', // "Never publish without an explicit approval click."
        content_hash: contentHash,
        approval_required: true,
        approved_at: null,
        published_at: null,
        failure_reason: null,
        retry_available: false,
        retry_count: 0,
        last_retried_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      generatedItems.push(contentItem);
      marketingContents.set(contentItem.id, contentItem);
    }

    const newCampaign: MarketingCampaign = {
      id: cid,
      business_id: businessId,
      name: `${cadence.replace('_', ' ').toUpperCase()} Promo - ${platforms.join(', ')}`,
      status: 'generating', // Starts generating for polling requirement
      platforms,
      number_of_posts: postCount,
      start_date: startDateStr,
      cadence,
      tone_notes: toneNotes,
      featured_product_names: productNames.slice(0, 5),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      approved_at: null,
      content_count: postCount,
      approved_count: 0,
      published_count: 0
    };

    marketingCampaigns.set(cid, newCampaign);
    saveToDisk();

    // Transition from 'generating' to 'ready' after 1200ms so polling GET .../campaigns/{cid} observes generating state
    setTimeout(() => {
      const camp = marketingCampaigns.get(cid);
      if (camp && camp.status === 'generating') {
        camp.status = 'ready';
        camp.updated_at = new Date().toISOString();
        saveToDisk();
      }
    }, 1200);

    return { campaign: newCampaign, items: generatedItems };
  },

  // GET /businesses/{id}/marketing/campaigns/{cid}
  getMarketingCampaign: (campaignId: string): MarketingCampaign | null => {
    return marketingCampaigns.get(campaignId) || null;
  },

  // GET all campaigns for business
  getMarketingCampaignsByBusiness: (businessId: string): MarketingCampaign[] => {
    const list: MarketingCampaign[] = [];
    for (const c of marketingCampaigns.values()) {
      if (c.business_id === businessId) {
        // Compute live counts
        const allItems = commerceStore.getMarketingContent(c.id, businessId);
        c.content_count = allItems.length;
        c.approved_count = allItems.filter(i => i.status === 'approved' || i.status === 'scheduled' || i.status === 'published').length;
        c.published_count = allItems.filter(i => i.status === 'published').length;
        list.push(c);
      }
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  // GET /businesses/{id}/marketing/content?campaign_id=
  getMarketingContent: (campaignId?: string, businessId?: string): MarketingContent[] => {
    const list: MarketingContent[] = [];
    for (const item of marketingContents.values()) {
      if (campaignId && item.campaign_id !== campaignId) continue;
      if (businessId && item.business_id !== businessId) continue;
      list.push(item);
    }
    return list.sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
  },

  getMarketingContentById: (contentId: string): MarketingContent | null => {
    return marketingContents.get(contentId) || null;
  },

  // PATCH /businesses/{id}/marketing/content/{contentId}
  // Editing copy/date/image calls PATCH and marks it "needs re-approval"
  updateMarketingContent: (
    contentId: string, 
    updates: { caption?: string; scheduled_at?: string; image_url?: string; platform?: string }
  ): MarketingContent | null => {
    const item = marketingContents.get(contentId);
    if (!item) return null;

    if (updates.caption !== undefined) {
      item.caption = updates.caption;
    }
    if (updates.scheduled_at !== undefined) {
      item.scheduled_at = updates.scheduled_at;
      item.scheduled_at_lusaka = formatAfricaLusakaTime(updates.scheduled_at);
    }
    if (updates.image_url !== undefined) {
      item.image_url = updates.image_url;
    }
    if (updates.platform !== undefined) {
      item.platform = updates.platform as any;
    }

    // Recompute content_hash
    item.content_hash = computeContentHash({
      platform: item.platform,
      image_url: item.image_url,
      caption: item.caption,
      scheduled_at: item.scheduled_at
    });

    // Mark as "needs re-approval" per Hard Requirement
    item.status = 'needs_reapproval';
    item.approval_required = true;
    item.approved_at = null;
    item.updated_at = new Date().toISOString();

    // Also update campaign stats
    const camp = marketingCampaigns.get(item.campaign_id);
    if (camp) {
      camp.updated_at = new Date().toISOString();
    }

    saveToDisk();
    return item;
  },

  // POST /campaigns/{cid}/approve with content ids and their content_hash
  approveMarketingCampaignAll: (
    campaignId: string,
    itemsToApprove?: Array<{ id: string; content_hash: string }>
  ): { success: boolean; approved_count: number; items: MarketingContent[] } => {
    const allItems = commerceStore.getMarketingContent(campaignId);
    let approvedCount = 0;
    const nowIso = new Date().toISOString();

    const lookupMap = new Map<string, string>();
    if (itemsToApprove && itemsToApprove.length > 0) {
      itemsToApprove.forEach(i => lookupMap.set(i.id, i.content_hash));
    }

    allItems.forEach(item => {
      // If specific payload provided, verify content_hash match
      if (lookupMap.size > 0) {
        const expectedHash = lookupMap.get(item.id);
        if (expectedHash && expectedHash === item.content_hash) {
          if (item.status === 'pending_approval' || item.status === 'needs_reapproval') {
            item.status = 'approved';
            item.approved_at = nowIso;
            item.updated_at = nowIso;
            approvedCount++;
          }
        }
      } else {
        // Approve all pending or needs_reapproval
        if (item.status === 'pending_approval' || item.status === 'needs_reapproval') {
          item.status = 'approved';
          item.approved_at = nowIso;
          item.updated_at = nowIso;
          approvedCount++;
        }
      }
    });

    const camp = marketingCampaigns.get(campaignId);
    if (camp) {
      camp.status = 'active';
      camp.approved_at = nowIso;
      camp.updated_at = nowIso;
    }

    saveToDisk();
    return {
      success: true,
      approved_count: approvedCount,
      items: allItems
    };
  },

  // POST /businesses/{id}/marketing/content/{contentId}/approve
  approveMarketingContent: (contentId: string, contentHash?: string): MarketingContent | null => {
    const item = marketingContents.get(contentId);
    if (!item) return null;

    if (contentHash && contentHash !== item.content_hash) {
      throw new Error('CONTENT_HASH_MISMATCH: Content was modified since last retrieved. Please review latest content.');
    }

    const nowIso = new Date().toISOString();
    item.status = 'approved';
    item.approved_at = nowIso;
    item.updated_at = nowIso;

    saveToDisk();
    return item;
  },

  // POST /businesses/{id}/marketing/content/{contentId}/reject
  rejectMarketingContent: (contentId: string, reason?: string): MarketingContent | null => {
    const item = marketingContents.get(contentId);
    if (!item) return null;

    item.status = 'rejected';
    item.failure_reason = reason || 'Rejected during brand review';
    item.updated_at = new Date().toISOString();

    saveToDisk();
    return item;
  },

  // Campaign controls: Pause, Resume, Cancel
  pauseMarketingCampaign: (campaignId: string): MarketingCampaign | null => {
    const camp = marketingCampaigns.get(campaignId);
    if (!camp) return null;
    camp.status = 'paused';
    camp.updated_at = new Date().toISOString();
    saveToDisk();
    return camp;
  },

  resumeMarketingCampaign: (campaignId: string): MarketingCampaign | null => {
    const camp = marketingCampaigns.get(campaignId);
    if (!camp) return null;
    camp.status = 'active';
    camp.updated_at = new Date().toISOString();
    saveToDisk();
    return camp;
  },

  cancelMarketingCampaign: (campaignId: string): MarketingCampaign | null => {
    const camp = marketingCampaigns.get(campaignId);
    if (!camp) return null;
    camp.status = 'cancelled';
    camp.updated_at = new Date().toISOString();
    saveToDisk();
    return camp;
  },

  // Publish content: explicit publication
  // "Never publish without an explicit approval click."
  publishMarketingContent: (contentId: string): MarketingContent | null => {
    const item = marketingContents.get(contentId);
    if (!item) return null;

    if (item.status !== 'approved' && item.status !== 'scheduled') {
      throw new Error('CANNOT_PUBLISH_UNAPPROVED: Item must be explicitly approved before publishing.');
    }

    const nowIso = new Date().toISOString();
    item.status = 'publishing';
    item.updated_at = nowIso;

    // Simulate instant publication completing successfully
    item.status = 'published';
    item.published_at = nowIso;
    item.failure_reason = null;
    item.retry_available = false;

    // Update campaign counts
    const camp = marketingCampaigns.get(item.campaign_id);
    if (camp) {
      camp.published_count = (camp.published_count || 0) + 1;
      camp.updated_at = nowIso;
    }

    saveToDisk();
    return item;
  },

  // Retry failed post publication
  retryMarketingContent: (contentId: string): MarketingContent | null => {
    const item = marketingContents.get(contentId);
    if (!item) return null;

    const nowIso = new Date().toISOString();
    item.status = 'publishing';
    item.failure_reason = null;
    item.retry_count = (item.retry_count || 0) + 1;
    item.last_retried_at = nowIso;

    // Transition to published
    item.status = 'published';
    item.published_at = nowIso;
    item.retry_available = false;
    item.updated_at = nowIso;

    saveToDisk();
    return item;
  },

  // ==========================================
  // Meta Ads Connectors & Assets
  // ==========================================
  getMetaAdsConnector: (businessId: string): MetaAdsConnectorState => {
    let state = metaAdsConnectors.get(businessId);
    if (!state) {
      state = {
        business_id: businessId,
        is_connected: false,
        auth_state: 'idle',
        ad_accounts: [],
        pages: []
      };
      metaAdsConnectors.set(businessId, state);
      saveToDisk();
    }
    return state;
  },

  authorizeMetaAdsConnector: (businessId: string): { redirect_url: string; state: string } => {
    let state = metaAdsConnectors.get(businessId);
    if (!state) {
      state = {
        business_id: businessId,
        is_connected: false,
        auth_state: 'idle',
        ad_accounts: [],
        pages: []
      };
      metaAdsConnectors.set(businessId, state);
    }
    state.auth_state = 'authorized';
    // Provide simulated OAuth authorization callback
    const redirect_url = `/connectors/meta_ads/callback?business_id=${encodeURIComponent(businessId)}&auth_token=meta_oauth_${Date.now()}`;
    saveToDisk();
    return { redirect_url, state: 'authorized' };
  },

  getMetaAdsAssets: (businessId: string): { ad_accounts: any[]; pages: any[] } => {
    const biz = businesses.get(businessId);
    const bizName = biz?.name || 'Ernest Sneakers';
    const currency = biz?.currency || 'ZMW';

    let state = metaAdsConnectors.get(businessId);
    if (!state || state.ad_accounts.length === 0) {
      const defaultAccounts = [
        {
          id: `act_${businessId.slice(-6)}_01`,
          name: `${bizName} Meta Ads (Official)`,
          currency,
          timezone: 'Africa/Lusaka',
          status: 'ACTIVE',
          balance_minor_units: 54000
        },
        {
          id: `act_${businessId.slice(-6)}_backup`,
          name: `${bizName} Secondary Ad Account`,
          currency,
          timezone: 'Africa/Lusaka',
          status: 'ACTIVE',
          balance_minor_units: 20000
        }
      ];

      const defaultPages = [
        {
          id: `page_${businessId.slice(-6)}_fb`,
          name: `${bizName} Zambia Official`,
          category: 'Retail & Footwear'
        },
        {
          id: `page_${businessId.slice(-6)}_lifestyle`,
          name: `${bizName} Lifestyle & Drip`,
          category: 'Fashion & Apparel'
        }
      ];

      if (!state) {
        state = {
          business_id: businessId,
          is_connected: false,
          auth_state: 'authorized',
          ad_accounts: defaultAccounts,
          pages: defaultPages
        };
      } else {
        state.ad_accounts = defaultAccounts;
        state.pages = defaultPages;
        state.auth_state = 'authorized';
      }
      metaAdsConnectors.set(businessId, state);
      saveToDisk();
    }

    return {
      ad_accounts: state.ad_accounts,
      pages: state.pages
    };
  },

  completeMetaAdsConnector: (
    businessId: string, 
    payload: { ad_account_id: string; page_id: string }
  ): MetaAdsConnectorState => {
    let state = metaAdsConnectors.get(businessId);
    if (!state) {
      state = {
        business_id: businessId,
        is_connected: false,
        auth_state: 'idle',
        ad_accounts: [],
        pages: []
      };
    }

    state.selected_ad_account_id = payload.ad_account_id;
    state.selected_page_id = payload.page_id;
    state.is_connected = true;
    state.auth_state = 'connected';
    state.connected_at = new Date().toISOString();
    metaAdsConnectors.set(businessId, state);

    // Ensure ad account exists in adAccounts map
    const biz = businesses.get(businessId);
    const currency = biz?.currency || 'ZMW';
    const existing = adAccounts.get(payload.ad_account_id);
    if (!existing) {
      const selectedMetaAcc = state.ad_accounts.find(a => a.id === payload.ad_account_id);
      const newAcc: AdAccount = {
        id: payload.ad_account_id,
        business_id: businessId,
        account_name: selectedMetaAcc?.name || `${biz?.name || 'Ernest'} Meta Ads`,
        currency: selectedMetaAcc?.currency || currency,
        timezone: selectedMetaAcc?.timezone || 'Africa/Lusaka',
        status: 'active',
        hard_cap_minor_units: 500000, // 5,000 ZMW default hard cap
        monthly_spend_cap_minor_units: 1500000,
        current_spend_minor_units: 0,
        auto_pause_at_cap: true,
        is_connected: true,
        updated_at: new Date().toISOString()
      };
      adAccounts.set(newAcc.id, newAcc);
    } else {
      existing.is_connected = true;
      existing.updated_at = new Date().toISOString();
    }

    saveToDisk();
    return state;
  },

  disconnectMetaAdsConnector: (businessId: string): boolean => {
    const state = metaAdsConnectors.get(businessId);
    if (!state) return false;
    state.is_connected = false;
    state.auth_state = 'idle';
    state.selected_ad_account_id = undefined;
    state.selected_page_id = undefined;
    saveToDisk();
    return true;
  },

  // ==========================================
  // Ad Accounts & Hard Caps
  // ==========================================
  getAdAccounts: (businessId: string): AdAccount[] => {
    const result: AdAccount[] = [];
    for (const acc of adAccounts.values()) {
      if (acc.business_id === businessId) {
        result.push(acc);
      }
    }
    // If empty and business exists, seed default ad account
    if (result.length === 0) {
      const biz = businesses.get(businessId);
      const currency = biz?.currency || 'ZMW';
      const defaultAcc: AdAccount = {
        id: `act_${businessId.slice(-6)}_01`,
        business_id: businessId,
        account_name: `${biz?.name || 'Ernest Sneakers'} Meta Ads (Zambia)`,
        currency,
        timezone: 'Africa/Lusaka',
        status: 'active',
        hard_cap_minor_units: 500000,
        monthly_spend_cap_minor_units: 1500000,
        current_spend_minor_units: 48000,
        auto_pause_at_cap: true,
        is_connected: true,
        updated_at: new Date().toISOString()
      };
      adAccounts.set(defaultAcc.id, defaultAcc);
      result.push(defaultAcc);
      saveToDisk();
    }
    return result;
  },

  getAdAccountById: (aid: string): AdAccount | null => {
    return adAccounts.get(aid) || null;
  },

  updateAdAccountLimits: (
    businessId: string,
    aid: string,
    limits: {
      hard_cap_minor_units?: number;
      monthly_spend_cap_minor_units?: number;
      auto_pause_at_cap?: boolean;
    }
  ): AdAccount | null => {
    let acc = adAccounts.get(aid);
    if (!acc) {
      const list = Array.from(adAccounts.values()).filter(a => a.business_id === businessId);
      if (list.length > 0) acc = list[0];
    }
    if (!acc) return null;

    if (limits.hard_cap_minor_units !== undefined) {
      acc.hard_cap_minor_units = Number(limits.hard_cap_minor_units);
    }
    if (limits.monthly_spend_cap_minor_units !== undefined) {
      acc.monthly_spend_cap_minor_units = Number(limits.monthly_spend_cap_minor_units);
    }
    if (limits.auto_pause_at_cap !== undefined) {
      acc.auto_pause_at_cap = Boolean(limits.auto_pause_at_cap);
    }
    acc.updated_at = new Date().toISOString();

    // Check all active campaigns against new cap
    for (const cmp of adCampaigns.values()) {
      if (cmp.business_id === businessId && cmp.status === 'active') {
        cmp.hard_cap_minor_units = acc.hard_cap_minor_units;
        if (cmp.current_spend_minor_units >= acc.hard_cap_minor_units) {
          cmp.status = 'capped';
          cmp.updated_at = new Date().toISOString();
        }
      }
    }

    saveToDisk();
    return acc;
  },

  // ==========================================
  // Ad Drafts & AI-written Creatives
  // ==========================================
  createAdDraft: (businessId: string, input: AdDraftInput): AdDraft => {
    const biz = businesses.get(businessId);
    const currency = biz?.currency || 'ZMW';
    const draftId = `draft_ad_${Date.now()}`;

    // Calculate dates & duration
    const startDate = input.start_date ? new Date(input.start_date) : new Date();
    const endDate = input.end_date ? new Date(input.end_date) : new Date(startDate.getTime() + 86400000 * 7);
    const diffTime = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const dailyBudgetMinor = Math.max(2000, Number(input.daily_budget_minor_units) || 12000); // min 20 ZMW, default 120 ZMW
    const maxPossibleSpendMinor = dailyBudgetMinor * diffTime;

    // Look up product if provided
    let prodName = input.product_name || 'Featured Sneakers & Streetwear';
    let prodImg = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';
    let prodPrice = 'ZMW 1,850.00';

    if (input.product_id) {
      const prod = products.get(input.product_id);
      if (prod) {
        prodName = prod.name;
        if (prod.image_url) prodImg = prod.image_url;
        if (prod.price) prodPrice = `${currency} ${Number(prod.price).toFixed(2)}`;
      }
    } else {
      // Pick first store product
      const bizProds = Array.from(products.values()).filter(p => p.business_id === businessId);
      if (bizProds.length > 0) {
        prodName = bizProds[0].name;
        if (bizProds[0].image_url) prodImg = bizProds[0].image_url;
        if (bizProds[0].price) prodPrice = `${currency} ${Number(bizProds[0].price).toFixed(2)}`;
      }
    }

    const audience = {
      locations: input.audience?.locations?.length ? input.audience.locations : ['Lusaka (+25km)', 'Kitwe', 'Ndola'],
      age_min: input.audience?.age_min || 18,
      age_max: input.audience?.age_max || 45,
      interests: input.audience?.interests?.length ? input.audience.interests : ['Sneakerheads', 'Streetwear Fashion', 'Urban Lifestyle'],
      gender: input.audience?.gender || 'all'
    };

    // Generate intelligent AI-written creatives tailored to the goal
    const goalTitle = input.goal === 'click_to_whatsapp' 
      ? 'WhatsApp Direct Inflow' 
      : input.goal === 'catalog_sales' 
      ? 'Catalog Retargeting' 
      : input.goal === 'store_traffic'
      ? 'Cairo Road Store Traffic'
      : 'Customer Inquiries';

    const aiCreatives: AdCreative[] = [
      {
        id: `cr_${draftId}_01`,
        headline: `🔥 ${prodName} - Official Restock in Lusaka!`,
        primary_text: `Looking for authentic ${prodName} with same-day delivery in Lusaka? Tap below to chat instantly with our AI worker on WhatsApp for real-time stock, sizing, and courier dispatch across Zambia.`,
        call_to_action: input.goal === 'click_to_whatsapp' ? 'Send WhatsApp Message' : 'Shop Catalog Now',
        image_url: prodImg,
        description: `${prodPrice} · Pay on delivery via Airtel Money & MTN MoMo`
      },
      {
        id: `cr_${draftId}_02`,
        headline: `Upgrade Your Rotation: ${prodName} 🇿🇲`,
        primary_text: `Limited quantities available for in-store pickup or door-to-door delivery. Verified authentic, crisp quality. Chat directly on WhatsApp to reserve your pair before sizes run out!`,
        call_to_action: input.goal === 'click_to_whatsapp' ? 'Chat on WhatsApp' : 'View Products',
        image_url: prodImg,
        description: `Verified Authentic · Cairo Road & Nationwide ZamPost Delivery`
      }
    ];

    const draft: AdDraft = {
      id: draftId,
      business_id: businessId,
      goal: input.goal || 'click_to_whatsapp',
      product_id: input.product_id,
      product_name: prodName,
      daily_budget_minor_units: dailyBudgetMinor,
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10),
      total_days: diffTime,
      max_possible_spend_minor_units: maxPossibleSpendMinor,
      currency,
      audience,
      ai_creatives: aiCreatives,
      selected_creative_id: aiCreatives[0].id,
      status: 'draft_review',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    adDrafts.set(draft.id, draft);
    saveToDisk();
    return draft;
  },

  getAdDraft: (draftId: string): AdDraft | null => {
    return adDrafts.get(draftId) || null;
  },

  getAdDraftsByBusiness: (businessId: string): AdDraft[] => {
    return Array.from(adDrafts.values()).filter(d => d.business_id === businessId);
  },

  // Hard Rule: Ads never start without approval!
  approveAdDraft: (
    businessId: string,
    draftId: string,
    selectedCreativeId?: string,
    actorId?: string
  ): { success: boolean; campaign: AdCampaign; message: string } => {
    const draft = adDrafts.get(draftId);
    if (!draft) {
      throw new Error('Ad draft not found.');
    }
    if (draft.business_id !== businessId) {
      throw new Error('Unauthorized draft approval for this business.');
    }

    const creative = (draft.ai_creatives || []).find(c => c.id === (selectedCreativeId || draft.selected_creative_id)) 
      || draft.ai_creatives[0];

    // Find ad account
    const accounts = Array.from(adAccounts.values()).filter(a => a.business_id === businessId);
    const account = accounts.length > 0 ? accounts[0] : null;
    const hardCapMinor = account ? account.hard_cap_minor_units : 500000;

    // Check if account already reached hard cap
    const currentAccountSpend = account ? account.current_spend_minor_units : 0;
    const isAlreadyCapped = currentAccountSpend >= hardCapMinor;

    const campaignId = `ad_cmp_${Date.now()}`;
    const newCampaign: AdCampaign = {
      id: campaignId,
      business_id: businessId,
      ad_account_id: account?.id || `act_${businessId.slice(-6)}_01`,
      draft_id: draft.id,
      name: `${draft.product_name || 'Campaign'} - ${draft.goal === 'click_to_whatsapp' ? 'WhatsApp Direct' : 'Social Boost'}`,
      goal: draft.goal,
      status: isAlreadyCapped ? 'capped' : 'active',
      daily_budget_minor_units: draft.daily_budget_minor_units,
      max_possible_spend_minor_units: draft.max_possible_spend_minor_units,
      current_spend_minor_units: 0,
      hard_cap_minor_units: hardCapMinor,
      auto_pause_at_cap: true, // Hard Rule: auto-pauses at cap
      currency: draft.currency,
      start_date: draft.start_date,
      end_date: draft.end_date,
      creative,
      audience: draft.audience,
      approved_at: new Date().toISOString(),
      approved_by: actorId || 'authorized_user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Update draft status
    draft.status = 'approved';
    draft.selected_creative_id = creative.id;
    draft.updated_at = new Date().toISOString();

    adCampaigns.set(newCampaign.id, newCampaign);
    saveToDisk();

    return {
      success: true,
      campaign: newCampaign,
      message: isAlreadyCapped 
        ? 'Campaign approved but immediately paused: Account hard cap reached (auto-pauses at cap).' 
        : 'Campaign approved and launched successfully. Hard cap protection active.'
    };
  },

  rejectAdDraft: (draftId: string, reason?: string): AdDraft | null => {
    const draft = adDrafts.get(draftId);
    if (!draft) return null;
    draft.status = 'rejected';
    draft.rejection_reason = reason || 'Draft rejected by administrator.';
    draft.updated_at = new Date().toISOString();
    saveToDisk();
    return draft;
  },

  // ==========================================
  // Ad Campaigns & Daily Insights
  // ==========================================
  getAdCampaigns: (businessId: string): AdCampaign[] => {
    const list: AdCampaign[] = [];
    for (const cmp of adCampaigns.values()) {
      if (cmp.business_id === businessId) {
        list.push(cmp);
      }
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getAdCampaign: (campaignId: string): AdCampaign | null => {
    return adCampaigns.get(campaignId) || null;
  },

  getAdCampaignInsights: (campaignId: string): AdCampaignInsights => {
    const cmp = adCampaigns.get(campaignId);
    const currency = cmp?.currency || 'ZMW';

    if (campaignId === 'ad_cmp_001') {
      const daily: DailyInsightPoint[] = [
        { date: 'Day 1', spend_minor_units: 12000, clicks: 82, conversions: 7, impressions: 1420, ctr: 5.77 },
        { date: 'Day 2', spend_minor_units: 12000, clicks: 95, conversions: 9, impressions: 1580, ctr: 6.01 },
        { date: 'Day 3', spend_minor_units: 12000, clicks: 78, conversions: 6, impressions: 1390, ctr: 5.61 },
        { date: 'Day 4 (Today)', spend_minor_units: 12000, clicks: 104, conversions: 8, impressions: 1650, ctr: 6.30 }
      ];
      return {
        campaign_id: campaignId,
        total_spend_minor_units: 48000,
        total_clicks: 359,
        total_conversions: 30,
        total_impressions: 6040,
        average_ctr: 5.94,
        cpc_minor_units: 134, // ~1.34 ZMW per click
        cost_per_conversion_minor_units: 1600, // ~16.00 ZMW per WhatsApp inquiry
        currency,
        daily
      };
    }

    if (campaignId === 'ad_cmp_002') {
      const daily: DailyInsightPoint[] = [
        { date: 'Day 1', spend_minor_units: 15000, clicks: 72, conversions: 4, impressions: 1100, ctr: 6.55 },
        { date: 'Day 2', spend_minor_units: 15000, clicks: 70, conversions: 4, impressions: 1150, ctr: 6.09 }
      ];
      return {
        campaign_id: campaignId,
        total_spend_minor_units: 30000,
        total_clicks: 142,
        total_conversions: 8,
        total_impressions: 2250,
        average_ctr: 6.31,
        cpc_minor_units: 211,
        cost_per_conversion_minor_units: 3750,
        currency,
        daily
      };
    }

    // Dynamic generation for user-created campaigns
    const spendMinor = cmp ? cmp.current_spend_minor_units || 12000 : 12000;
    const clicks = Math.max(14, Math.floor(spendMinor / 140));
    const conversions = Math.max(2, Math.floor(clicks * 0.085));
    const impressions = clicks * 16;
    const ctr = impressions > 0 ? Number(((clicks / impressions) * 100).toFixed(2)) : 5.8;
    const cpc = clicks > 0 ? Math.round(spendMinor / clicks) : 150;
    const costPerConv = conversions > 0 ? Math.round(spendMinor / conversions) : 1800;

    return {
      campaign_id: campaignId,
      total_spend_minor_units: spendMinor,
      total_clicks: clicks,
      total_conversions: conversions,
      total_impressions: impressions,
      average_ctr: ctr,
      cpc_minor_units: cpc,
      cost_per_conversion_minor_units: costPerConv,
      currency,
      daily: [
        {
          date: 'Day 1',
          spend_minor_units: spendMinor,
          clicks,
          conversions,
          impressions,
          ctr
        }
      ]
    };
  },

  pauseAdCampaign: (campaignId: string): AdCampaign | null => {
    const cmp = adCampaigns.get(campaignId);
    if (!cmp) return null;
    cmp.status = 'paused';
    cmp.updated_at = new Date().toISOString();
    saveToDisk();
    return cmp;
  },

  resumeAdCampaign: (campaignId: string): { success: boolean; campaign: AdCampaign | null; message: string } => {
    const cmp = adCampaigns.get(campaignId);
    if (!cmp) return { success: false, campaign: null, message: 'Campaign not found.' };

    // Check hard cap
    if (cmp.current_spend_minor_units >= cmp.hard_cap_minor_units) {
      cmp.status = 'capped';
      saveToDisk();
      return {
        success: false,
        campaign: cmp,
        message: 'Cannot resume: Account hard cap reached (auto-pauses at cap). Increase limits to resume.'
      };
    }

    cmp.status = 'active';
    cmp.updated_at = new Date().toISOString();
    saveToDisk();
    return {
      success: true,
      campaign: cmp,
      message: 'Campaign resumed and active.'
    };
  }
};
