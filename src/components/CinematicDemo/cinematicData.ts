export interface CinematicSceneStep {
  id: string;
  timeOffsetMs: number; // relative timing in the scene
  agent: 'support' | 'marketing' | 'operations' | 'shopper';
  agentName: string;
  actionType: 'message' | 'thought' | 'tool_call' | 'tool_result' | 'metric_update' | 'visual_generate' | 'order_complete';
  title?: string;
  content: string;
  toolDetails?: {
    toolName: string;
    input: string;
    output: string;
    latencyMs: number;
  };
  metrics?: {
    revenue?: string;
    orders?: number;
    responseTime?: string;
    activeAgents?: number;
  };
  visualCard?: {
    imageUrl?: string;
    badge: string;
    caption: string;
    headline: string;
    discount?: string;
  };
}

export interface CinematicScene {
  id: string;
  sceneNumber: string;
  timeTag: string;
  title: string;
  subtitle: string;
  focusAgent: 'support' | 'marketing' | 'operations';
  durationSeconds: number;
  steps: CinematicSceneStep[];
}

export interface IndustryScenario {
  id: string;
  label: string;
  storeName: string;
  city: string;
  tagline: string;
  avatarBadge: string;
  scenes: CinematicScene[];
}

export const CINEMATIC_INDUSTRIES: IndustryScenario[] = [
  {
    id: 'fashion',
    label: 'Fashion & Apparel',
    storeName: 'Kabulonga Luxe Boutique',
    city: 'Lusaka, Zambia',
    tagline: 'High-end streetwear & premium linen sets',
    avatarBadge: '👗 Fashion AI',
    scenes: [
      {
        id: 'fashion-scene-1',
        sceneNumber: '01',
        timeTag: '11:47 PM · Customer Surge',
        title: 'Instant Midnight WhatsApp Sale',
        subtitle: 'Shopper inquires while the merchant sleeps; AI completes checkout in 18 seconds.',
        focusAgent: 'support',
        durationSeconds: 14,
        steps: [
          {
            id: 'f1',
            timeOffsetMs: 400,
            agent: 'shopper',
            agentName: 'Natasha M. (WhatsApp)',
            actionType: 'message',
            content: 'Hello! Are the Italian Linen Two-Piece sets in Champagne Gold still available in Size M? Can I get delivery to Woodlands tomorrow?'
          },
          {
            id: 'f2',
            timeOffsetMs: 1400,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'thought',
            content: 'Analyzing inquiry: Item="Italian Linen Two-Piece (Champagne Gold)", Size="M", Location="Woodlands, Lusaka". Querying live catalog database...'
          },
          {
            id: 'f3',
            timeOffsetMs: 2400,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'tool_call',
            content: 'Checking inventory & dispatch availability',
            toolDetails: {
              toolName: 'store.inventory.query',
              input: '{ sku: "LIN-GLD-M", storeId: "kabulonga-01", suburb: "Woodlands" }',
              output: '✓ In Stock (4 remaining). Base Price: K850. Lusaka Central rider delivery: K40. Guaranteed delivery slot: Tomorrow 11:00 AM.',
              latencyMs: 120
            }
          },
          {
            id: 'f4',
            timeOffsetMs: 4000,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'message',
            content: 'Hi Natasha! ✨ Yes, we have 4 units left of the Champagne Gold Linen Set in Size Medium (K850). Delivery to Woodlands is K40 tomorrow before 12:00 PM (Total: K890).\n\nWould you like me to reserve yours with Airtel Money or MTN MoMo?'
          },
          {
            id: 'f5',
            timeOffsetMs: 6500,
            agent: 'shopper',
            agentName: 'Natasha M. (WhatsApp)',
            actionType: 'message',
            content: 'Yes please! Generate the MTN MoMo prompt for 0966-XXX-421.'
          },
          {
            id: 'f6',
            timeOffsetMs: 7600,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'tool_call',
            content: 'Initiating Zambian Mobile Money push prompt',
            toolDetails: {
              toolName: 'momo.zambia.createPrompt',
              input: '{ network: "MTN", phone: "+260966000421", amount: 890, ref: "ORD-8921" }',
              output: '✓ Prompt dispatched to phone. USSD approval received (TXN #MTN-9941203). Status: PAID.',
              latencyMs: 340
            }
          },
          {
            id: 'f7',
            timeOffsetMs: 9800,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'order_complete',
            content: 'Order #ORD-8921 Confirmed! K890 received. Customer notified via WhatsApp with live tracking receipt.'
          }
        ]
      },
      {
        id: 'fashion-scene-2',
        sceneNumber: '02',
        timeTag: '07:15 AM · Marketing Engine',
        title: 'Autonomous Campaign & Broadcast Studio',
        subtitle: 'AI Marketing Agent detects weekend inventory patterns and crafts high-converting social drops.',
        focusAgent: 'marketing',
        durationSeconds: 12,
        steps: [
          {
            id: 'fm1',
            timeOffsetMs: 500,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'thought',
            content: 'Scanning 48-hour sales velocity: 22 Linen Sets sold. Weekend coming up. Generating VIP Broadcast creative targeting 450 past shoppers.'
          },
          {
            id: 'fm2',
            timeOffsetMs: 2000,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'visual_generate',
            content: 'Synthesizing Weekend Drop visual & multi-channel copy...',
            visualCard: {
              badge: 'Weekend VIP Drop',
              headline: 'Pure Linen Season · 15% VIP Access',
              caption: '✨ Step into effortless luxury with our breathable Linen Co-ords. Free Lusaka express delivery on orders over K1,500 this weekend only.',
              discount: 'PROMO CODE: WEEKENDLUXE'
            }
          },
          {
            id: 'fm3',
            timeOffsetMs: 5500,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'tool_call',
            content: 'Scheduling targeted WhatsApp & Instagram broadcast',
            toolDetails: {
              toolName: 'marketing.broadcast.dispatch',
              input: '{ segment: "VIP_REPEAT_FASHION_BUYERS", audienceSize: 480, channel: ["WhatsApp", "IG_DM"] }',
              output: '✓ 480 Personalized Messages queued for 08:30 AM. Expected conversion rate: 14.2% (+K18,500 GMV).',
              latencyMs: 180
            }
          },
          {
            id: 'fm4',
            timeOffsetMs: 8000,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'metric_update',
            content: 'Marketing campaign armed and queued. Merchant review dashboard updated with 1-click approval.'
          }
        ]
      },
      {
        id: 'fashion-scene-3',
        sceneNumber: '03',
        timeTag: '08:00 AM · Merchant Ops Command',
        title: 'Morning Briefing & Rider Dispatch',
        subtitle: 'Automated order reconciliation, low-stock alerts, and delivery slips formatted for riders.',
        focusAgent: 'operations',
        durationSeconds: 12,
        steps: [
          {
            id: 'fo1',
            timeOffsetMs: 400,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'thought',
            content: 'Reconciling overnight transactions from WhatsApp & Web. Grouping deliveries by Lusaka delivery zones (Woodlands, Roma, Kabulonga, Makeni)...'
          },
          {
            id: 'fo2',
            timeOffsetMs: 2200,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'tool_call',
            content: 'Generating rider dispatch route slips',
            toolDetails: {
              toolName: 'logistics.dispatch.generateManifest',
              input: '{ ordersCount: 16, overnightRevenueZMW: 14250, riders: 2 }',
              output: '✓ Manifest generated: Rider 1 (East Zone: 9 deliveries), Rider 2 (West Zone: 7 deliveries). All waybills printed.',
              latencyMs: 210
            }
          },
          {
            id: 'fo3',
            timeOffsetMs: 5000,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'message',
            content: '☀️ Morning Briefing for Store Owner:\n• Overnight Sales: K14,250 (16 orders)\n• Average AI Response Time: 1.6 seconds\n• Low Stock Alert: Silk Kimono Black (only 2 left — reorder recommended)\n• 16 Delivery waybills dispatched to riders.'
          },
          {
            id: 'fo4',
            timeOffsetMs: 8000,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'metric_update',
            content: 'All systems 100% synchronized. Store owner saved 4.5 hours of manual customer chatting and order logging.'
          }
        ]
      }
    ]
  },
  {
    id: 'electronics',
    label: 'Phones & Tech',
    storeName: 'Kamwala Smart Tech Hub',
    city: 'Lusaka, Zambia',
    tagline: 'Flagship smartphones, laptops & accessories',
    avatarBadge: '📱 Tech Hub AI',
    scenes: [
      {
        id: 'elec-scene-1',
        sceneNumber: '01',
        timeTag: '12:15 AM · Midnight Inquiry',
        title: 'Technical Specs & Warranty Validation',
        subtitle: 'AI clarifies dual-SIM, original warranty, and closes K18,500 flagship sale instantly.',
        focusAgent: 'support',
        durationSeconds: 14,
        steps: [
          {
            id: 'e1',
            timeOffsetMs: 400,
            agent: 'shopper',
            agentName: 'Chileshe B. (WhatsApp)',
            actionType: 'message',
            content: 'Evening boss! Do you have Samsung S24 Ultra 512GB in Titanium Gray? Is it original dual physical SIM or eSIM? Does it come with 1-year warranty?'
          },
          {
            id: 'e2',
            timeOffsetMs: 1500,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'thought',
            content: 'Parsing tech request: Brand="Samsung", Model="Galaxy S24 Ultra 512GB", Color="Titanium Gray", Warranty & SIM specifications requested.'
          },
          {
            id: 'e3',
            timeOffsetMs: 2800,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'tool_call',
            content: 'Querying serialized device catalog & warranty terms',
            toolDetails: {
              toolName: 'tech.catalog.verifyDevice',
              input: '{ sku: "SM-S928B-512-GRY", branch: "Kamwala Main" }',
              output: '✓ In Stock (3 units). Dual Physical Nano-SIM + eSIM. Official 12-Month Samsung Warranty included + Free 45W Charger promotion.',
              latencyMs: 140
            }
          },
          {
            id: 'e4',
            timeOffsetMs: 4600,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'message',
            content: 'Hi Chileshe! ⚡ Yes, we have 3 brand new, sealed Samsung S24 Ultra 512GB in Titanium Gray at our Kamwala store.\n\n• Spec: Dual Physical Nano-SIM + eSIM capability\n• Warranty: 12-Month Official Store Warranty included\n• Bonus: Free 45W Samsung Fast Charger in the box this week!\n• Price: K21,500 with complimentary Lusaka rider delivery.\n\nShall I reserve your serial number now?'
          },
          {
            id: 'e5',
            timeOffsetMs: 7200,
            agent: 'shopper',
            agentName: 'Chileshe B. (WhatsApp)',
            actionType: 'message',
            content: 'Super! Send the Airtel Money checkout details, I want it delivered to Rhodespark by 10 AM.'
          },
          {
            id: 'e6',
            timeOffsetMs: 8400,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'tool_call',
            content: 'Processing Airtel Money merchant collection',
            toolDetails: {
              toolName: 'airtel.zambia.paymentRequest',
              input: '{ amount: 21500, phone: "+260977000184", note: "Samsung S24 Ultra Titanium" }',
              output: '✓ Payment Approved (TXN #AIR-7729104). Serial #SM-928-8841 reserved.',
              latencyMs: 290
            }
          },
          {
            id: 'e7',
            timeOffsetMs: 10200,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'order_complete',
            content: 'Order #TECH-4412 Confirmed! K21,500 collected. Serialized warranty card and receipt sent to customer.'
          }
        ]
      },
      {
        id: 'elec-scene-2',
        sceneNumber: '02',
        timeTag: '07:30 AM · Automated Up-Sell',
        title: 'Cross-Sell & Accessory Broadcast',
        subtitle: 'AI analyzes new phone owners and recommends matching Galaxy Buds & rugged cases.',
        focusAgent: 'marketing',
        durationSeconds: 12,
        steps: [
          {
            id: 'em1',
            timeOffsetMs: 500,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'thought',
            content: 'Identified 34 customers who purchased flagship phones in the last 14 days without wireless earbuds. Generating targeted bundle campaign.'
          },
          {
            id: 'em2',
            timeOffsetMs: 2200,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'visual_generate',
            content: 'Crafting ANC Audio Bundle campaign...',
            visualCard: {
              badge: 'Flagship Companion',
              headline: 'ANC Pro Earbuds · Pair with Your Flagship',
              caption: '🎧 Experience studio sound with 32-hour battery and Active Noise Cancellation. Exclusive 20% discount for existing phone buyers.',
              discount: 'K1,200 (Was K1,500)'
            }
          },
          {
            id: 'em3',
            timeOffsetMs: 5600,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'tool_call',
            content: 'Deploying dynamic segment broadcast',
            toolDetails: {
              toolName: 'marketing.segmentedUpsell',
              input: '{ targetSku: "BUDS-ANC-02", recipientCohort: "RECENT_FLAGSHIP_BUYERS", count: 34 }',
              output: '✓ 34 direct WhatsApp VIP offers staged. Estimated uptake: 28% (+K11,424 incremental margin).',
              latencyMs: 160
            }
          }
        ]
      },
      {
        id: 'elec-scene-3',
        sceneNumber: '03',
        timeTag: '08:00 AM · Automated Inventory & Dispatch',
        title: 'Real-Time Tech Logistics & Warranty Sync',
        subtitle: 'IMEI registration, security seal verification, and morning rider route dispatch.',
        focusAgent: 'operations',
        durationSeconds: 12,
        steps: [
          {
            id: 'eo1',
            timeOffsetMs: 400,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'thought',
            content: 'Reconciling high-value electronics orders. Registering device IMEIs into warranty portal.'
          },
          {
            id: 'eo2',
            timeOffsetMs: 2000,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'tool_call',
            content: 'Registering IMEI & generating tamper-evident dispatch slip',
            toolDetails: {
              toolName: 'tech.warranty.registerImei',
              input: '{ imei: "359812110948211", customer: "Chileshe B.", deliveryTime: "10:00 AM" }',
              output: '✓ Digital Warranty active until Sept 2027. Rider route assigned with signature verification requirement.',
              latencyMs: 190
            }
          },
          {
            id: 'eo3',
            timeOffsetMs: 4800,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'message',
            content: '⚡ Daily Briefing:\n• Overnight Sales: K38,400 (4 Flagship devices + 8 accessories)\n• All IMEIs catalogued and logged\n• Low Stock Alert: iPhone 15 Pro Max 256GB Natural (0 stock — 6 pending customer waitlists)'
          }
        ]
      }
    ]
  },
  {
    id: 'grocery',
    label: 'Grocery & Market',
    storeName: 'Woodlands Fresh Market',
    city: 'Lusaka, Zambia',
    tagline: 'Fresh farm produce, pantry staples & bulk essentials',
    avatarBadge: '🛒 Grocery AI',
    scenes: [
      {
        id: 'groc-scene-1',
        sceneNumber: '01',
        timeTag: '06:30 AM · Early Morning List',
        title: 'Bulleted Shopping List to 1-Click Cart',
        subtitle: 'Customer pastes messy text list; AI parses 7 items, calculates kg weights, and confirms delivery.',
        focusAgent: 'support',
        durationSeconds: 14,
        steps: [
          {
            id: 'g1',
            timeOffsetMs: 400,
            agent: 'shopper',
            agentName: 'Mrs. Tembo (WhatsApp)',
            actionType: 'message',
            content: 'Good morning! Can I get: 10kg Pembe mealie meal, 2 trays fresh eggs, 5L cooking oil, 2kg sugar, and 1kg beef stew cuts. How much is everything?'
          },
          {
            id: 'g2',
            timeOffsetMs: 1500,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'thought',
            content: 'Parsing multi-item grocery list: Pembe 10kg, Eggs (2 trays), 5L Oil, 2kg Sugar, 1kg Beef Stew. Calculating exact total and weight tiers...'
          },
          {
            id: 'g3',
            timeOffsetMs: 2700,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'tool_call',
            content: 'Calculating grocery cart subtotal & delivery fee',
            toolDetails: {
              toolName: 'grocery.cart.calculate',
              input: '{ items: ["Pembe 10kg", "Eggs x2", "Cooking Oil 5L", "Sugar 2kg", "Beef Stew 1kg"] }',
              output: '✓ Total Items: 5. Subtotal: K745. Fresh butchery weight verified. Heavy goods delivery fee: K35.',
              latencyMs: 110
            }
          },
          {
            id: 'g4',
            timeOffsetMs: 4500,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'message',
            content: 'Good morning Mrs. Tembo! 🥕 We have everything freshly packed and in stock:\n\n• 10kg Pembe Breakfast: K185\n• 2 Trays Fresh Farm Eggs: K170\n• 5L D’lite Cooking Oil: K195\n• 2kg Sugar: K65\n• 1kg Tender Beef Stew: K130\n• Express Delivery to Woodlands: K35\n👉 Total: K780\n\nWould you like me to send the MoMo prompt for delivery by 09:00 AM?'
          },
          {
            id: 'g5',
            timeOffsetMs: 7000,
            agent: 'shopper',
            agentName: 'Mrs. Tembo (WhatsApp)',
            actionType: 'message',
            content: 'Yes please, send Airtel Money prompt!'
          },
          {
            id: 'g6',
            timeOffsetMs: 8200,
            agent: 'support',
            agentName: 'Mupezeni Support Agent',
            actionType: 'order_complete',
            content: 'Order #GROC-9102 Confirmed! K780 collected. Grocery packing slip routed to butchery & dispatch.'
          }
        ]
      },
      {
        id: 'groc-scene-2',
        sceneNumber: '02',
        timeTag: '08:00 AM · Weekly Farm Specials',
        title: 'Weekly Farm Fresh Broadcast',
        subtitle: 'AI creates bulk pantry specials broadcast sent to 620 neighborhood households.',
        focusAgent: 'marketing',
        durationSeconds: 12,
        steps: [
          {
            id: 'gm1',
            timeOffsetMs: 500,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'thought',
            content: 'Farm delivery arrived: Fresh Chisamba Tomatoes (50 crates) and Irish Potatoes. Formulating Saturday Morning Family Pantry deal.'
          },
          {
            id: 'gm2',
            timeOffsetMs: 2200,
            agent: 'marketing',
            agentName: 'Mupezeni Marketing Agent',
            actionType: 'visual_generate',
            content: 'Generating Farm Fresh produce bundle...',
            visualCard: {
              badge: 'Fresh Farm Drop',
              headline: 'Weekend Family Pantry Bundle',
              caption: '🍅 Farm-fresh Chisamba tomatoes, 10kg potatoes, and farm eggs bundled at 20% discount. Delivered in chilled crates before lunch.',
              discount: 'K399 (Save K85)'
            }
          }
        ]
      },
      {
        id: 'groc-scene-3',
        sceneNumber: '03',
        timeTag: '08:30 AM · Route Optimization',
        title: 'Neighborhood Delivery Clustering',
        subtitle: 'AI clusters 42 morning grocery deliveries into optimal fuel-saving rider routes.',
        focusAgent: 'operations',
        durationSeconds: 12,
        steps: [
          {
            id: 'go1',
            timeOffsetMs: 400,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'tool_call',
            content: 'Clustering delivery routes by Lusaka neighborhood',
            toolDetails: {
              toolName: 'logistics.routes.clusterMap',
              input: '{ stops: 42, clusters: ["Woodlands", "Ibex Hill", "Kabulonga", "New Kasama"] }',
              output: '✓ 4 Optimized Routes generated. Estimated delivery completion: 11:30 AM. Fuel savings: 32%.',
              latencyMs: 250
            }
          },
          {
            id: 'go2',
            timeOffsetMs: 3800,
            agent: 'operations',
            agentName: 'Mupezeni Operations Agent',
            actionType: 'message',
            content: '🥦 Store Operations Overview:\n• Morning Orders: 42 bags packed and loaded\n• Revenue: K16,840\n• Perishables wastage reduced by 94% through AI demand forecasting.'
          }
        ]
      }
    ]
  }
];
