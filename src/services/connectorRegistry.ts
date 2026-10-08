import { 
  ConnectorType, 
  ConnectorInfo, 
  ICommerceConnector, 
  VisitorVisionContext, 
  ConnectorRpcLog, 
  AiChatMessage 
} from '../types/connectors';
import { Product, ProductVariant, CurrencyCode } from '../types/commerce';

// Default seed catalogs for each connector type to make testing immediate and vivid
const DEFAULT_CONNECTORS_DATA: Record<ConnectorType, {
  info: ConnectorInfo;
  products: Product[];
}> = {
  mupezeni: {
    info: {
      type: 'mupezeni',
      name: 'Mupezeni Native Commerce Store',
      badge: 'Native Architecture',
      icon: 'Layers',
      description: 'Zero-latency native store builder with integrated real-time catalog & direct checkout.',
      storeName: 'Ernest Sneakers Lusaka (Native)',
      storeDomain: 'ernest-sneakers.mupezeni.com',
      currency: 'ZMW',
      totalProducts: 4,
      syncLatencyMs: 14,
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      supportedFeatures: ['Realtime Webhook', 'Stock Lock', 'Visitor Vision Radar', 'Instant WhatsApp Pay', 'Multi-variant Matrix']
    },
    products: [
      {
        id: 'mup_prod_1',
        business_id: 'biz_ernest_sneakers',
        catalog_id: 'cat_native',
        name: "Men's Classic Urban Sneaker",
        description: 'Lightweight cushioned sole, breathable upper mesh, and premium matte overlays. Perfect for daily active wear.',
        price: 850,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        sku: 'ES-CS-001',
        category: 'Footwear',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'v1', business_id: 'b1', product_id: 'mup_prod_1', title: 'Size 41 / Triple Black', sku: 'ES-CS-41-BLK', stock_quantity: 4, is_available: true, attributes: { size: '41', color: 'Triple Black' }, created_at: new Date().toISOString() },
          { id: 'v2', business_id: 'b1', product_id: 'mup_prod_1', title: 'Size 42 / Triple Black', sku: 'ES-CS-42-BLK', stock_quantity: 6, is_available: true, attributes: { size: '42', color: 'Triple Black' }, created_at: new Date().toISOString() },
          { id: 'v3', business_id: 'b1', product_id: 'mup_prod_1', title: 'Size 43 / Pure White', sku: 'ES-CS-43-WHT', stock_quantity: 2, is_available: true, attributes: { size: '43', color: 'Pure White' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'mup_prod_2',
        business_id: 'biz_ernest_sneakers',
        catalog_id: 'cat_native',
        name: 'Air Cushion Vintage Runner',
        description: 'Heritage running silhouette with responsive heel air-unit and gum rubber traction outsole.',
        price: 1250,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
        sku: 'ES-RR-002',
        category: 'Footwear',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'v4', business_id: 'b1', product_id: 'mup_prod_2', title: 'Size 40 / Retro Grey', sku: 'ES-RR-40-GRY', stock_quantity: 2, is_available: true, attributes: { size: '40', color: 'Retro Grey' }, created_at: new Date().toISOString() },
          { id: 'v5', business_id: 'b1', product_id: 'mup_prod_2', title: 'Size 42 / Retro Grey', sku: 'ES-RR-42-GRY', stock_quantity: 5, is_available: true, attributes: { size: '42', color: 'Retro Grey' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'mup_prod_3',
        business_id: 'biz_ernest_sneakers',
        catalog_id: 'cat_native',
        name: 'Streetwear Heavyweight Boxy Tee',
        description: '280 GSM luxury combed organic cotton with relaxed drop shoulder tailoring.',
        price: 450,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        sku: 'ES-TS-003',
        category: 'Apparel',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'v6', business_id: 'b1', product_id: 'mup_prod_3', title: 'Medium / Vintage Wash', sku: 'ES-TS-M-VNT', stock_quantity: 8, is_available: true, attributes: { size: 'Medium' }, created_at: new Date().toISOString() },
          { id: 'v7', business_id: 'b1', product_id: 'mup_prod_3', title: 'Large / Vintage Wash', sku: 'ES-TS-L-VNT', stock_quantity: 3, is_available: true, attributes: { size: 'Large' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'mup_prod_4',
        business_id: 'biz_ernest_sneakers',
        catalog_id: 'cat_native',
        name: 'Leather Care & Sneaker Shield Kit',
        description: 'Complete water-repellent barrier spray, gentle cleaning foam, and brass bristle brush.',
        price: 250,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        sku: 'ES-CK-004',
        category: 'Accessories',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  shopify: {
    info: {
      type: 'shopify',
      name: 'Shopify Storefront Connector',
      badge: 'GraphQL Storefront v2024-10',
      icon: 'ShoppingBag',
      description: 'Bi-directional live bridge to Shopify Storefront & Admin API with automatic inventory webhooks.',
      storeName: 'Lush Apparel Co. (Shopify)',
      storeDomain: 'lush-apparel-africa.myshopify.com',
      currency: 'USD',
      totalProducts: 4,
      syncLatencyMs: 42,
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      supportedFeatures: ['Shopify Cart Permalinks', 'Live Inventory Webhook', 'Order Webhooks', 'Customer Tagging']
    },
    products: [
      {
        id: 'sh_prod_101',
        business_id: 'biz_shopify_lush',
        catalog_id: 'cat_shopify',
        name: 'Oversized Silk Blend Bomber Jacket',
        description: 'Lined Japanese technical satin with brushed copper hardware and ribbed trims.',
        price: 180,
        currency: 'USD',
        image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
        sku: 'SH-BMB-01',
        category: 'Outerwear',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'sv1', business_id: 'b_sh', product_id: 'sh_prod_101', title: 'Small / Midnight Olive', sku: 'SH-BMB-S-OLV', stock_quantity: 3, is_available: true, attributes: { size: 'S', color: 'Olive' }, created_at: new Date().toISOString() },
          { id: 'sv2', business_id: 'b_sh', product_id: 'sh_prod_101', title: 'Medium / Midnight Olive', sku: 'SH-BMB-M-OLV', stock_quantity: 5, is_available: true, attributes: { size: 'M', color: 'Olive' }, created_at: new Date().toISOString() },
          { id: 'sv3', business_id: 'b_sh', product_id: 'sh_prod_101', title: 'Large / Midnight Olive', sku: 'SH-BMB-L-OLV', stock_quantity: 0, is_available: false, attributes: { size: 'L', color: 'Olive' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sh_prod_102',
        business_id: 'biz_shopify_lush',
        catalog_id: 'cat_shopify',
        name: 'Structured Linen Resort Shirt',
        description: '100% French flax linen with Cuban open collar and mother-of-pearl buttons.',
        price: 85,
        currency: 'USD',
        image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
        sku: 'SH-SHR-02',
        category: 'Shirts',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'sv4', business_id: 'b_sh', product_id: 'sh_prod_102', title: 'Medium / Sand Dune', sku: 'SH-SHR-M-SND', stock_quantity: 9, is_available: true, attributes: { size: 'M', color: 'Sand' }, created_at: new Date().toISOString() },
          { id: 'sv5', business_id: 'b_sh', product_id: 'sh_prod_102', title: 'Large / Sand Dune', sku: 'SH-SHR-L-SND', stock_quantity: 4, is_available: true, attributes: { size: 'L', color: 'Sand' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sh_prod_103',
        business_id: 'biz_shopify_lush',
        catalog_id: 'cat_shopify',
        name: 'Minimalist Chelsea Suede Boot',
        description: 'Italian calf suede upper with Goodyear welted crepe sole and elasticated side gussets.',
        price: 240,
        currency: 'USD',
        image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        sku: 'SH-BOT-03',
        category: 'Footwear',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'sv6', business_id: 'b_sh', product_id: 'sh_prod_103', title: 'US 9 / Warm Taupe', sku: 'SH-BOT-9-TAU', stock_quantity: 2, is_available: true, attributes: { size: 'US 9' }, created_at: new Date().toISOString() },
          { id: 'sv7', business_id: 'b_sh', product_id: 'sh_prod_103', title: 'US 10 / Warm Taupe', sku: 'SH-BOT-10-TAU', stock_quantity: 4, is_available: true, attributes: { size: 'US 10' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'sh_prod_104',
        business_id: 'biz_shopify_lush',
        catalog_id: 'cat_shopify',
        name: 'Canvas Weekender Duffle',
        description: 'Heavy duty 18oz wax canvas with full-grain bridle leather handles and brass zippers.',
        price: 135,
        currency: 'USD',
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        sku: 'SH-BAG-04',
        category: 'Accessories',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  woocommerce: {
    info: {
      type: 'woocommerce',
      name: 'WooCommerce REST v3 Connector',
      badge: 'WP REST API v3 Bridge',
      icon: 'Store',
      description: 'Synchronized with WordPress WooCommerce instance with real-time stock sync & webhook triggers.',
      storeName: 'Lusaka Tech Haven (WooCommerce)',
      storeDomain: 'www.lusakatechhaven.co.zm',
      currency: 'ZMW',
      totalProducts: 4,
      syncLatencyMs: 65,
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      supportedFeatures: ['WooCommerce Webhooks', 'Coupons Sync', 'Customer Address Pre-fill', 'COD & Mobile Money Gateways']
    },
    products: [
      {
        id: 'wc_prod_201',
        business_id: 'biz_woo_tech',
        catalog_id: 'cat_woo',
        name: 'Sony WH-CH720N Wireless ANC Headphones',
        description: 'Dual noise sensor technology, 35-hour battery life, lightweight swivel design with multipoint pairing.',
        price: 2600,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        sku: 'WC-AUD-720',
        category: 'Audio & Gadgets',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'wv1', business_id: 'b_wc', product_id: 'wc_prod_201', title: 'Matte Black', sku: 'WC-AUD-720-BLK', stock_quantity: 6, is_available: true, attributes: { color: 'Matte Black' }, created_at: new Date().toISOString() },
          { id: 'wv2', business_id: 'b_wc', product_id: 'wc_prod_201', title: 'Cloud White', sku: 'WC-AUD-720-WHT', stock_quantity: 2, is_available: true, attributes: { color: 'Cloud White' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'wc_prod_202',
        business_id: 'biz_woo_tech',
        catalog_id: 'cat_woo',
        name: '65W GaN Fast Dual Charger (Type-C + USB)',
        description: 'Ultra compact gallium nitride wall adapter for laptops, phones, and tablets with overheat safety guard.',
        price: 480,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
        sku: 'WC-PWR-65W',
        category: 'Accessories',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'wc_prod_203',
        business_id: 'biz_woo_tech',
        catalog_id: 'cat_woo',
        name: 'Ergonomic Vertical Wireless Mouse',
        description: 'Natural handshake angle to prevent wrist strain, silent click switches, and rechargeable battery.',
        price: 650,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
        sku: 'WC-ACC-MOU',
        category: 'Peripherals',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'wv3', business_id: 'b_wc', product_id: 'wc_prod_203', title: 'Graphite Grey', sku: 'WC-ACC-MOU-GRY', stock_quantity: 7, is_available: true, attributes: { color: 'Graphite' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'wc_prod_204',
        business_id: 'biz_woo_tech',
        catalog_id: 'cat_woo',
        name: 'MagSafe Magnetic PowerBank 10,000mAh',
        description: 'Snaps directly to phone back with pass-through fast charging and LED battery display.',
        price: 790,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1609592424364-58bc449339e0?auto=format&fit=crop&w=800&q=80',
        sku: 'WC-PWR-MAG',
        category: 'Accessories',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  whatsapp_catalog: {
    info: {
      type: 'whatsapp_catalog',
      name: 'WhatsApp Business DM Catalog Connector',
      badge: 'Meta Cloud API Catalog',
      icon: 'MessageSquare',
      description: 'Direct integration with WhatsApp Business Product Catalog for conversational selling & WhatsApp pay links.',
      storeName: 'Kalingalinga Artisan Wares (WhatsApp Catalog)',
      storeDomain: 'wa.me/c/260971000222',
      currency: 'ZMW',
      totalProducts: 3,
      syncLatencyMs: 25,
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      supportedFeatures: ['WhatsApp Interactive Product Messages', 'Automated Catalog Sync', 'Cart Push to WhatsApp', 'Airtel & MTN Mobile Money QR']
    },
    products: [
      {
        id: 'wa_prod_301',
        business_id: 'biz_wa_artisan',
        catalog_id: 'cat_whatsapp',
        name: 'Handwoven Zambian Ilala Palm Basket (Large)',
        description: 'Intricate geometric pattern handwoven by master rural artisans using sustainable dyed palm fibers.',
        price: 650,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
        sku: 'WA-BSK-01',
        category: 'Home Decor',
        is_available: true,
        has_variants: true,
        variants: [
          { id: 'wav1', business_id: 'b_wa', product_id: 'wa_prod_301', title: 'Earth Tone Ochre / 45cm', sku: 'WA-BSK-OCH-45', stock_quantity: 4, is_available: true, attributes: { color: 'Ochre', size: '45cm' }, created_at: new Date().toISOString() },
          { id: 'wav2', business_id: 'b_wa', product_id: 'wa_prod_301', title: 'Charcoal Minimalist / 45cm', sku: 'WA-BSK-CHR-45', stock_quantity: 1, is_available: true, attributes: { color: 'Charcoal', size: '45cm' }, created_at: new Date().toISOString() }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'wa_prod_302',
        business_id: 'biz_wa_artisan',
        catalog_id: 'cat_whatsapp',
        name: 'Raw Mukwa Hardwood Serving Board',
        description: 'Solid indigenous Mukwa timber with organic live-edge grain and beeswax food-safe polish.',
        price: 520,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
        sku: 'WA-WD-MKW',
        category: 'Kitchenware',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'wa_prod_303',
        business_id: 'biz_wa_artisan',
        catalog_id: 'cat_whatsapp',
        name: 'Organic Wild Honey (Miombo Forest, 500g)',
        description: 'Unfiltered raw floral honey harvested from pristine Miombo woodlands with rich dark amber profile.',
        price: 160,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
        sku: 'WA-HNY-500',
        category: 'Pantry',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  custom_api: {
    info: {
      type: 'custom_api',
      name: 'Custom REST / ERP API Bridge',
      badge: 'OpenAPI 3.1 Connector',
      icon: 'Code',
      description: 'Universal connector bridging legacy ERPs, custom Postgres/MySQL backends, or in-house retail inventory.',
      storeName: 'Custom Enterprise Inventory Hub',
      storeDomain: 'api.enterprise-retail.zm/v1',
      currency: 'ZMW',
      totalProducts: 3,
      syncLatencyMs: 38,
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      supportedFeatures: ['Custom Header Auth', 'Payload Transformer', 'Batch SKU Sync', 'Warehouse Multi-location']
    },
    products: [
      {
        id: 'api_prod_401',
        business_id: 'biz_custom_api',
        catalog_id: 'cat_api',
        name: 'Industrial Heavy-Duty Power Tool Set',
        description: 'Brushless 20V impact drill with dual 4.0Ah lithium battery pack and rugged hard case.',
        price: 3400,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        sku: 'API-DRL-20V',
        category: 'Hardware',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'api_prod_402',
        business_id: 'biz_custom_api',
        catalog_id: 'cat_api',
        name: 'Laser Distance Meter 100m Precision',
        description: 'Real-time Pythagorean distance calculation, backlit LCD, and IP54 dust resistance.',
        price: 950,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        sku: 'API-LSR-100',
        category: 'Measurement',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'api_prod_403',
        business_id: 'biz_custom_api',
        catalog_id: 'cat_api',
        name: 'Solar Generator Inverter 1.5kW Backup',
        description: 'Pure sine wave inverter with MPPT solar charge controller and dual AC outputs.',
        price: 7800,
        currency: 'ZMW',
        image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        sku: 'API-SOL-1500',
        category: 'Solar Energy',
        is_available: true,
        has_variants: false,
        variants: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
};

class UnifiedConnectorRegistry {
  private activeConnectorType: ConnectorType = 'mupezeni';
  private customCatalogs: Record<ConnectorType, Product[]> = {
    mupezeni: [...DEFAULT_CONNECTORS_DATA.mupezeni.products],
    shopify: [...DEFAULT_CONNECTORS_DATA.shopify.products],
    woocommerce: [...DEFAULT_CONNECTORS_DATA.woocommerce.products],
    whatsapp_catalog: [...DEFAULT_CONNECTORS_DATA.whatsapp_catalog.products],
    custom_api: [...DEFAULT_CONNECTORS_DATA.custom_api.products]
  };
  private rpcLogs: ConnectorRpcLog[] = [];
  private logListeners: ((logs: ConnectorRpcLog[]) => void)[] = [];

  constructor() {
    this.addLog({
      connectorType: 'mupezeni',
      action: 'fetch_catalog',
      endpoint: 'GET /api/connectors/mupezeni/catalog',
      payload: { syncMode: 'realtime_hydrate' },
      response: { productCount: 4, status: 'synced_ok' },
      durationMs: 14,
      status: 'success'
    });
  }

  public getActiveConnectorType(): ConnectorType {
    return this.activeConnectorType;
  }

  public setActiveConnectorType(type: ConnectorType) {
    this.activeConnectorType = type;
    this.addLog({
      connectorType: type,
      action: 'fetch_catalog',
      endpoint: `GET /api/connectors/${type}/catalog`,
      payload: { connectorSwitched: true },
      response: { 
        store: DEFAULT_CONNECTORS_DATA[type].info.storeName, 
        currency: DEFAULT_CONNECTORS_DATA[type].info.currency,
        count: this.customCatalogs[type].length 
      },
      durationMs: DEFAULT_CONNECTORS_DATA[type].info.syncLatencyMs,
      status: 'success'
    });
  }

  public getConnectorInfo(type: ConnectorType = this.activeConnectorType): ConnectorInfo {
    const data = DEFAULT_CONNECTORS_DATA[type];
    return {
      ...data.info,
      totalProducts: this.customCatalogs[type].length
    };
  }

  public getAllConnectorInfos(): ConnectorInfo[] {
    return (Object.keys(DEFAULT_CONNECTORS_DATA) as ConnectorType[]).map(type => this.getConnectorInfo(type));
  }

  public async getProducts(type: ConnectorType = this.activeConnectorType, query?: string, category?: string): Promise<Product[]> {
    let list = this.customCatalogs[type] || [];
    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q)
      );
    }
    return list;
  }

  public async getProductById(id: string, type: ConnectorType = this.activeConnectorType): Promise<Product | null> {
    const list = this.customCatalogs[type] || [];
    return list.find(p => p.id === id) || null;
  }

  public async checkInventory(
    productId: string, 
    variantId?: string, 
    type: ConnectorType = this.activeConnectorType
  ): Promise<{ inStock: boolean; quantity: number; sku: string; title: string }> {
    const start = Date.now();
    const product = await this.getProductById(productId, type);
    
    let inStock = false;
    let quantity = 0;
    let sku = product?.sku || 'UNKNOWN';
    let title = product?.name || 'Product';

    if (product) {
      if (variantId && product.variants && product.variants.length > 0) {
        const variant = product.variants.find(v => v.id === variantId);
        if (variant) {
          quantity = variant.stock_quantity;
          inStock = variant.is_available && quantity > 0;
          sku = variant.sku;
          title = `${product.name} (${variant.title})`;
        }
      } else if (product.variants && product.variants.length > 0) {
        quantity = product.variants.reduce((acc, v) => acc + (v.stock_quantity || 0), 0);
        inStock = quantity > 0;
      } else {
        quantity = 5; // Default standard single SKU stock
        inStock = product.is_available;
      }
    }

    this.addLog({
      connectorType: type,
      action: 'check_inventory',
      endpoint: `POST /api/connectors/${type}/inventory/check`,
      payload: { productId, variantId },
      response: { inStock, quantity, sku },
      durationMs: Date.now() - start + 8,
      status: inStock ? 'success' : 'warn'
    });

    return { inStock, quantity, sku, title };
  }

  public async generateCheckoutSession(
    items: { productId: string; variantId?: string; quantity: number }[],
    customerInfo?: { name?: string; phone?: string; email?: string; address?: string },
    type: ConnectorType = this.activeConnectorType
  ): Promise<{ checkoutUrl: string; orderId: string; total: number; currency: CurrencyCode; summary: string }> {
    const start = Date.now();
    const info = this.getConnectorInfo(type);
    let total = 0;
    const summaries: string[] = [];

    for (const item of items) {
      const p = await this.getProductById(item.productId, type);
      if (p) {
        let price = p.price;
        let vTitle = '';
        if (item.variantId && p.variants) {
          const v = p.variants.find(va => va.id === item.variantId);
          if (v) {
            if (v.price_override) price = v.price_override;
            vTitle = ` (${v.title})`;
          }
        }
        total += price * item.quantity;
        summaries.push(`${item.quantity}x ${p.name}${vTitle}`);
      }
    }

    const orderId = `ord_${type}_${Date.now().toString(36)}`;
    const checkoutUrl = type === 'mupezeni'
      ? `https://${info.storeDomain}/checkout/${orderId}`
      : type === 'shopify'
      ? `https://${info.storeDomain}/cart/${orderId}?discount=AUTO_APPLY`
      : type === 'woocommerce'
      ? `https://${info.storeDomain}/checkout/?order_pay=${orderId}`
      : `https://pay.mupezeni.com/link/${orderId}`;

    this.addLog({
      connectorType: type,
      action: 'generate_checkout',
      endpoint: `POST /api/connectors/${type}/checkout/create-session`,
      payload: { items, customerInfo },
      response: { checkoutUrl, orderId, total, currency: info.currency },
      durationMs: Date.now() - start + 18,
      status: 'success'
    });

    return {
      checkoutUrl,
      orderId,
      total,
      currency: info.currency,
      summary: summaries.join(', ') || 'Direct Commerce Purchase'
    };
  }

  public dispatchVisitorSignal(signal: VisitorVisionContext, type: ConnectorType = this.activeConnectorType) {
    this.addLog({
      connectorType: type,
      action: 'visitor_signal',
      endpoint: `STREAM /api/connectors/${type}/visitor/radar`,
      payload: {
        sessionId: signal.sessionId,
        page: signal.activePage,
        focusedProduct: signal.activeProductTitle,
        sku: signal.activeProductSku,
        dwellSeconds: signal.dwellTimeSeconds,
        cartItems: signal.cartItemCount,
        cartTotal: signal.cartTotal
      },
      response: {
        radarTracked: true,
        aiAware: true,
        proactiveTriggerEligible: signal.dwellTimeSeconds > 5 || signal.cartItemCount > 0
      },
      durationMs: 8,
      status: 'success'
    });
  }

  public updateProductStock(productId: string, newStock: number, variantId?: string, type: ConnectorType = this.activeConnectorType) {
    const list = this.customCatalogs[type];
    const product = list.find(p => p.id === productId);
    if (!product) return;

    if (variantId && product.variants) {
      const v = product.variants.find(va => va.id === variantId);
      if (v) {
        v.stock_quantity = newStock;
        v.is_available = newStock > 0;
      }
    } else if (product.variants && product.variants.length > 0) {
      product.variants[0].stock_quantity = newStock;
      product.variants[0].is_available = newStock > 0;
    } else {
      product.is_available = newStock > 0;
    }

    this.addLog({
      connectorType: type,
      action: 'check_inventory',
      endpoint: `PATCH /api/connectors/${type}/inventory/stock-update`,
      payload: { productId, variantId, updatedStock: newStock },
      response: { updated: true, newStock },
      durationMs: 12,
      status: 'success'
    });
  }

  public getRpcLogs(): ConnectorRpcLog[] {
    return this.rpcLogs;
  }

  // Web Channel Connector Inbound Dispatcher (POST /api/v1/channels/web/{site_key}/messages)
  public async sendWebInboundMessage(
    siteKey: string, 
    payload: { session_id: string; message_id: string; content: string }
  ): Promise<{ accepted: boolean }> {
    const start = Date.now();
    try {
      const res = await fetch(`/api/v1/channels/web/${encodeURIComponent(siteKey)}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({ accepted: true }));
      this.addLog({
        connectorType: 'mupezeni',
        action: 'visitor_signal',
        endpoint: `POST /api/v1/channels/web/${siteKey}/messages`,
        payload,
        response: data,
        durationMs: Date.now() - start,
        status: res.ok ? 'success' : 'warn'
      });
      return data;
    } catch (err: any) {
      this.addLog({
        connectorType: 'mupezeni',
        action: 'visitor_signal',
        endpoint: `POST /api/v1/channels/web/${siteKey}/messages`,
        payload,
        response: { accepted: true, localRouted: true },
        durationMs: Date.now() - start,
        status: 'warn'
      });
      return { accepted: true };
    }
  }

  // Ensure Web Connector is registered on the FastAPI backend for this business (POST /api/v1/businesses/{id}/connectors/web)
  public async ensureWebConnector(businessId: string, allowedOrigins: string[] = []): Promise<string> {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const origins = Array.from(new Set([origin, ...allowedOrigins]));
    const start = Date.now();
    try {
      const res = await fetch(`/api/v1/businesses/${encodeURIComponent(businessId)}/connectors/web`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allowed_origins: origins })
      });
      if (res.ok) {
        const data = await res.json();
        const siteKey = data.site_key || `wk_${businessId.replace(/[^a-zA-Z0-9]/g, '')}`;
        this.addLog({
          connectorType: 'mupezeni',
          action: 'visitor_signal',
          endpoint: `POST /api/v1/businesses/${businessId}/connectors/web`,
          payload: { allowed_origins: origins },
          response: { site_key: siteKey, status: 'connected' },
          durationMs: Date.now() - start,
          status: 'success'
        });
        return siteKey;
      }
    } catch (e) {}

    const fallbackKey = `wk_${businessId.replace(/[^a-zA-Z0-9]/g, '') || 'store'}`;
    this.addLog({
      connectorType: 'mupezeni',
      action: 'visitor_signal',
      endpoint: `POST /api/v1/businesses/${businessId}/connectors/web`,
      payload: { allowed_origins: origins },
      response: { site_key: fallbackKey, status: 'active_local' },
      durationMs: Date.now() - start,
      status: 'success'
    });
    return fallbackKey;
  }

  public onLogsChange(listener: (logs: ConnectorRpcLog[]) => void): () => void {
    this.logListeners.push(listener);
    return () => {
      this.logListeners = this.logListeners.filter(l => l !== listener);
    };
  }

  private addLog(log: Omit<ConnectorRpcLog, 'id' | 'timestamp'>) {
    const fullLog: ConnectorRpcLog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    this.rpcLogs = [fullLog, ...this.rpcLogs.slice(0, 49)];
    this.logListeners.forEach(l => l(this.rpcLogs));
  }
}

export const connectorRegistry = new UnifiedConnectorRegistry();
