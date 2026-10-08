import fs from 'fs';
import path from 'path';
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
  sender: 'customer' | 'ai' | 'human';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  business_id: string;
  channel: 'whatsapp' | 'messenger' | 'instagram' | 'web';
  customer_name: string;
  customer_phone: string;
  last_message: string;
  unread: boolean;
  needs_human: boolean;
  status: 'open' | 'pending_human' | 'resolved';
  messages_count: number;
  updated_at: string;
  messages: ConversationMessage[];
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
    needs_human: false,
    status: 'open',
    messages_count: 4,
    updated_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hello, do you have sneakers in size 42?', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
      { id: 'm2', sender: 'ai', text: 'Yes! We have the Men\'s Classic Urban Sneaker in Size 42 (Triple Black) in stock for ZMW 850.', timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
      { id: 'm3', sender: 'customer', text: 'Can I pay cash on delivery in Kabulonga or do you take Airtel Money?', timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString() }
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
    needs_human: true,
    status: 'pending_human',
    messages_count: 5,
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    messages: [
      { id: 'm2_1', sender: 'customer', text: 'Good morning, do you do wholesale pricing for 10 pairs?', timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString() },
      { id: 'm2_2', sender: 'ai', text: 'Let me connect you directly to our store manager so they can approve custom wholesale pricing for you!', timestamp: new Date(Date.now() - 1000 * 60 * 48).toISOString() },
      { id: 'm2_3', sender: 'customer', text: 'I want to speak with the store manager regarding a bulk purchase of 10 pairs.', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() }
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
    needs_human: false,
    status: 'resolved',
    messages_count: 6,
    updated_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    messages: [
      { id: 'm3_1', sender: 'customer', text: 'Hi! Is size 42 true to size?', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString() },
      { id: 'm3_2', sender: 'ai', text: 'Yes, it is standard European sizing and fits true to size.', timestamp: new Date(Date.now() - 1000 * 60 * 148).toISOString() },
      { id: 'm3_3', sender: 'customer', text: 'Ordered via web checkout! Thanks for the quick sizing advice.', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() }
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
}

const hasLoaded = loadFromDisk();
if (!hasLoaded) {
  initializeSeedData();
  saveToDisk();
} else {
  // Ensure demo business has approvals/conversations/onboarding if loaded from older disk snapshot
  if (approvals.size === 0 || conversations.size === 0 || onboardings.size === 0) {
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
  addConversationMessage: (conversationId: string, sender: 'customer' | 'ai' | 'human', text: string): Conversation | undefined => {
    const c = conversations.get(conversationId);
    if (!c) return undefined;
    const msg: ConversationMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sender,
      text,
      timestamp: new Date().toISOString()
    };
    c.messages.push(msg);
    c.last_message = text;
    c.messages_count += 1;
    c.updated_at = new Date().toISOString();
    if (sender === 'customer') {
      c.unread = true;
    } else {
      c.unread = false;
      if (sender === 'human' && c.status === 'pending_human') {
        c.status = 'open';
        c.needs_human = false;
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
        primary_domain: 'subdomain',
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
  }
};
