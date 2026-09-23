import { IndustrySolution, PhilosophyPrinciple, ProcessStep, BusinessOutcome, AiTeamMember, EndToEndWorkflowStep, EconomicComparisonData, EconomicComparisonRow } from '../types';

export const ECONOMIC_COMPARISON_TABLE: EconomicComparisonData = {
  title: 'Traditional Approach vs Mupezeni',
  subtitle: 'The Digital Workload Problem',
  rows: [
    {
      departmentRole: 'Customer Support & Inquiries',
      humanStaffCost: 'Manual replies, missed evening messages & hiring staff',
      mupezeniCost: 'AI Support Worker: 24/7 continuous response & lead capture',
      mupezeniBadge: '24/7 Continuous'
    },
    {
      departmentRole: 'Marketing & Content Creation',
      humanStaffCost: 'Freelance designers, agency fees & inconsistent posting',
      mupezeniCost: 'AI Marketing Worker: Daily branded visuals, copy & promotions',
      mupezeniBadge: 'Daily Content'
    },
    {
      departmentRole: 'Business Tracking & Visibility',
      humanStaffCost: 'Manual spreadsheets, fragmented chats & disconnected tools',
      mupezeniCost: 'Business Insights Dashboard: Centralized real-time visibility',
      mupezeniBadge: 'Included Layer'
    }
  ],
  totalRow: {
    label: 'Overall Approach',
    humanTotal: 'Fragmented tools, multiple people & heavy coordination',
    mupezeniTotal: 'K2,000 / month',
    mupezeniNote: '2 AI Workers + 1 Business Insights Dashboard',
    savingsHighlight: 'One AI team. One simple price.'
  }
};

export const AI_TEAM_MEMBERS: AiTeamMember[] = [
  {
    id: 'customer-support',
    title: 'AI Customer Support Worker',
    roleDescription: "Your customers don't have to wait.",
    badge: 'AI Worker 01',
    avatarIcon: 'Headphones',
    avatarBg: 'from-[#9B2208] to-[#D95A1A]',
    statusText: 'Always Online • Continuous Operation',
    responsibilities: [
      'Answers customer questions and handles routine FAQs.',
      'Provides accurate product information, sizing and stock status.',
      'Captures leads and follows up with interested customers.',
      'Helps move casual enquiries toward completed purchases.',
      'Operates continuously around the clock without delays.',
      'Works across existing digital channels where integrated (WhatsApp, Instagram, Facebook, Web).'
    ],
    businessOutcome: 'Serve customer inquiries instantly around the clock while you focus on products and growth.',
    mockVisual: {
      headline: 'Live Customer Support & Sales Assistance',
      subline: 'WhatsApp • Instagram • Facebook • Web (where integrated)',
      badges: ['Instant Reply <2s', 'Stock Verified', 'Lead Follow-Up Active'],
      sampleSnippet: '"Yes! We have the Chelsea Boots in Size 42 in stock (K650). Delivery to Woodlands is K40 tomorrow morning. Would you like me to lock this in for you?"',
      metricsTag: 'Continuous 24/7 Coverage'
    }
  },
  {
    id: 'marketing-specialist',
    title: 'AI Marketing Worker',
    roleDescription: 'Your business stays visible every day.',
    badge: 'AI Worker 02',
    avatarIcon: 'Megaphone',
    avatarBg: 'from-[#B83A0A] to-[#F57C00]',
    statusText: 'Active • Daily Marketing Output',
    responsibilities: [
      'Creates daily social media content (approximately 1 post per day, up to 30 posts/month).',
      'Generates branded marketing images and product visuals.',
      'Writes engaging captions and persuasive promotional copy.',
      'Promotes products, special offers and seasonal campaigns.',
      'Maintains a structured content calendar.',
      'Prepares all content for owner review and approval before publishing.'
    ],
    businessOutcome: 'Keep your business consistently visible every single day without having to personally create every post.',
    mockVisual: {
      headline: 'Daily Branded Content Studio',
      subline: 'Images • Captions • Promotional Copy • Content Calendar',
      badges: ['Daily Content (~1 Post/Day)', 'Owner Approval Flow', 'Branded Visuals'],
      sampleSnippet: '"Weekend Special Drop: 3 branded promotional images with launch captions ready for your review in your content calendar."',
      metricsTag: 'Up to 30 Posts / Month'
    }
  },
  {
    id: 'business-dashboard',
    title: 'Business Insights Dashboard',
    roleDescription: "Know what's happening without digging through spreadsheets and messages.",
    badge: 'Included Visibility Layer',
    avatarIcon: 'BarChart3',
    avatarBg: 'from-[#D95A1A] to-[#25D366]',
    statusText: 'Real-Time Sync • Centralized Visibility',
    responsibilities: [
      'Tracks live order activity and daily customer purchases.',
      'Monitors sales trends and revenue momentum over time.',
      'Highlights product performance and identifies bestsellers.',
      'Observes customer inquiry volumes and channel activity.',
      'Delivers timely restock signals and low-inventory alerts.',
      'Provides a clean, centralized visibility layer so you stay fully in control.'
    ],
    businessOutcome: 'Complete operational visibility into sales, orders and inventory without digging through messages.',
    mockVisual: {
      headline: 'Centralized Business Visibility Layer',
      subline: 'Orders • Sales Trends • Product Performance • Restock Signals',
      badges: ['Live Order Feed', 'Sales Analytics', 'Restock Signals', 'Zero Extra Cost'],
      sampleSnippet: '"Morning briefing: 14 weekend orders recorded. 2 products approaching low-stock threshold. Restock signal generated."',
      metricsTag: 'Included with AI Workers'
    }
  }
];
export const GROWTH_COMPARISON = {
  traditional: [
    'Assembling separate human staff for customer inquiries and social media',
    'Multiple disconnected software subscriptions and manual tools',
    'Manual customer follow-up and delayed replies after hours',
    'Manual content creation consuming hours of the owner’s time',
    'Time lost coordinating, managing, and troubleshooting fragmented workflows',
    'Work that abruptly stops whenever people are busy or unavailable'
  ],
  mupezeni: [
    'AI Customer Support Worker: 24/7 continuous responses, FAQs & lead capture',
    'AI Marketing Worker: Daily branded visuals, captions & content calendar',
    'Business Insights Dashboard: Live centralized visibility into orders & stock',
    'Total Monthly Investment: K2,000/month for your unified AI team',
    'Continuous operation with human approval and escalation when required',
    'Zero setup fees, month-to-month flexibility & 30-day money-back guarantee'
  ],
  conclusion: 'Instead of assembling separate people, tools and workflows for customer support and marketing, deploy one AI team for K2,000/month.'
};

export const END_TO_END_WORKFLOW: EndToEndWorkflowStep[] = [
  {
    stepNumber: '01',
    stageTitle: 'Customer Enquiry',
    actor: 'Customer',
    action: 'Customer sends an enquiry',
    description: 'A prospective customer reaches out across WhatsApp, Instagram DM, Facebook, or your online store asking about products, sizing, or delivery.',
    details: [
      'Messages arrive at all hours—even late nights and weekends',
      'Customer seeks immediate answers before considering a competitor',
      'No customer is left waiting in an unread queue'
    ],
    businessImpact: 'Capture every inbound opportunity the moment intent is highest.',
    iconName: 'MessageSquare',
    accentColor: 'from-[#9B2208] to-[#D95A1A]'
  },
  {
    stepNumber: '02',
    stageTitle: 'Instant Response',
    actor: 'AI Customer Support Agent',
    action: 'AI Customer Support Agent responds instantly',
    description: 'Your digital support and sales agent answers questions in under two seconds, recommends matching products, and guides the customer toward checkout.',
    details: [
      'Verifies available stock and sizing in real time',
      'Answers policy, delivery, and pricing questions with human-like warmth',
      'Recommends complementary items to increase order value'
    ],
    businessImpact: 'Instant consultation converts curious browsers into committed buyers.',
    iconName: 'Headphones',
    accentColor: 'from-[#D95A1A] to-[#F57C00]'
  },
  {
    stepNumber: '03',
    stageTitle: 'Order Placed',
    actor: 'Customer',
    action: 'Customer places an order',
    description: 'The customer confirms their purchase via mobile money, payment card, or store collection reservation with zero friction.',
    details: [
      'Payment details verified and confirmed instantly',
      'Delivery address and customer contact saved accurately',
      'Customer receives instant order verification and delivery schedule'
    ],
    businessImpact: 'Fast, frictionless closing without requiring the owner to pick up the phone.',
    iconName: 'ShoppingBag',
    accentColor: 'from-[#7A1804] to-[#9B2208]'
  },
  {
    stepNumber: '04',
    stageTitle: 'Operations & Tracking',
    actor: 'Business Insights Dashboard',
    action: 'Dashboard records activity & generates delivery slips',
    description: 'Your included command dashboard logs the transaction, updates available stock, prepares delivery notes for riders, and alerts you on low stock.',
    details: [
      'Creates clean packing lists and delivery notes for riders',
      'Alerts the owner when popular products run low',
      'Maintains clean sales logs and daily performance summaries'
    ],
    businessImpact: 'Complete digital order while you focus on finding great products from suppliers and delivering them to your customers.',
    iconName: 'BarChart3',
    accentColor: 'from-[#B83A0A] to-[#D95A1A]'
  },
  {
    stepNumber: '05',
    stageTitle: 'Marketing Follow-Up',
    actor: 'AI Marketing Agent',
    action: 'AI Marketing Agent creates campaigns and promotions',
    description: 'Your marketing agent creates tailored social posts, VIP restock drops, and targeted promotional campaigns to bring customers back.',
    details: [
      'Generates daily branded marketing visuals, captions, and promotional graphics',
      'Sends personalized WhatsApp broadcasts based on past purchase history',
      'Keeps your business top of mind without you having to plan posts'
    ],
    businessImpact: 'Consistent, professional marketing running continuously in the background.',
    iconName: 'Sparkles',
    accentColor: 'from-[#D95A1A] to-[#F57C00]'
  },
  {
    stepNumber: '06',
    stageTitle: 'Customer Returns',
    actor: 'Customer',
    action: 'Customer returns for repeat purchases',
    description: 'Delighted by exceptional service speed, accurate deliveries, and timely marketing drops, the customer becomes a loyal repeat buyer.',
    details: [
      'Higher customer lifetime value and retention',
      'Positive word-of-mouth recommendations across social networks',
      'Repeat orders flow through existing automated channels'
    ],
    businessImpact: 'Compounding revenue growth with decreasing customer acquisition costs.',
    iconName: 'RotateCcw',
    accentColor: 'from-[#9B2208] to-[#B83A0A]'
  },
  {
    stepNumber: '07',
    stageTitle: 'Business Growth',
    actor: 'Retailer & AI Team',
    action: 'Business grows without expanding payroll',
    description: 'The retailer scales sales volume, expands product lines, and serves thousands of customers while digital operating costs remain lean and predictable.',
    details: [
      'AI Team scales effortlessly with spikes in demand',
      'The business owner focuses on sourcing great products and delivering them to customers',
      'Profit margins expand as overhead remains controlled'
    ],
    businessImpact: 'Scale your business, not your overhead.',
    iconName: 'TrendingUp',
    accentColor: 'from-[#B83A0A] to-[#E65100]'
  }
];

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    id: 'scale-not-payroll',
    title: 'Scale Without Payroll Bloat',
    quote: 'Businesses shouldn\'t have to increase payroll every time demand increases.',
    explanation: 'Growth naturally creates more enquiries, support requests, and marketing tasks. Traditionally this required hiring and managing more staff. Mupezeni lets you scale digital operations with intelligent AI Teams instead.',
    iconName: 'TrendingUp'
  },
  {
    id: 'level-playing-field',
    title: 'Democratic Leverage',
    quote: 'Technology should help retailers compete with much larger businesses.',
    explanation: 'Large corporate retail chains maintain massive call centres and marketing departments. Mupezeni gives independent retailers scalable AI Teams with equivalent digital firepower.',
    iconName: 'Zap'
  },
  {
    id: 'amplify-not-replace',
    title: 'Amplify the Business Owner',
    quote: 'AI should amplify business owners instead of replacing them.',
    explanation: 'Retailers are masters of finding great products from suppliers and serving their customers. Our AI Teams lift the heavy digital burden so owners can lead with greater focus and freedom.',
    iconName: 'Sparkles'
  },
  {
    id: 'human-ai-harmony',
    title: 'Human Judgment + AI Teams',
    quote: 'The future belongs to retailers combining human judgement with intelligent AI Teams.',
    explanation: 'AI Teams provide relentless speed, memory, and 24/7 consistency. The retailer provides vision, curation, and relationship building. Together, they create an unbeatable retail enterprise.',
    iconName: 'Users'
  }
];


export const BUSINESS_OUTCOMES: BusinessOutcome[] = [
  {
    id: 'increase-sales',
    title: 'Increase Sales',
    tagline: 'Never lose a customer to slow replies',
    description: 'Convert high-intent browsers into confirmed paying customers immediately, even at 11:00 PM or during peak in-store hours.',
    bulletPoints: [
      'Instant product recommendations & pricing lookups',
      'Automated checkout links & mobile money/card guidance',
      'Proactive re-engagement with abandoned carts & idle chats'
    ],
    iconName: 'TrendingUp',
    accentBadge: 'Revenue Engine'
  },
  {
    id: 'respond-every-customer',
    title: 'Respond to Every Customer',
    tagline: 'Zero unread messages, zero lost opportunities',
    description: 'Every WhatsApp message, Instagram DM, and website inquiry is acknowledged in seconds with human-like warmth and context.',
    bulletPoints: [
      'Sub-5 second response time 24 hours a day, 7 days a week',
      'Accurate answers on stock levels, colors, sizes, and store hours',
      'Seamless escalation to you only when human approval is needed'
    ],
    iconName: 'MessageSquareCheck',
    accentBadge: 'Instant Response'
  },
  {
    id: 'market-consistently',
    title: 'Market Consistently',
    tagline: 'Promotions, drops, and broadcasts that never stop',
    description: 'Keep your customer list engaged with targeted product spotlights, VIP restock alerts, and seasonal campaigns generated by AI.',
    bulletPoints: [
      'Tailored WhatsApp broadcast copywriting based on purchase history',
      'Social post copy and promo campaigns planned in minutes',
      'Automated reactivation of dormant customers after 30 days'
    ],
    iconName: 'Sparkles',
    accentBadge: 'Growth Marketing'
  },
  {
    id: 'reduce-repetitive-work',
    title: 'Reduce Repetitive Work',
    tagline: 'Automate admin so you can focus on high-value retail',
    description: 'Stop spending hours copying customer delivery addresses, re-explaining sizing charts, or manually checking what is in stock.',
    bulletPoints: [
      'Automated capture of customer delivery addresses and rider slips',
      'Structured FAQs for sizing, delivery rates, and return policies',
      'Daily summaries of top-selling items and low-stock reminders'
    ],
    iconName: 'Layers',
    accentBadge: 'Operational Freedom'
  },
  {
    id: 'grow-beyond-hours',
    title: 'Grow Beyond Business Hours',
    tagline: 'Your shop stays open around the clock',
    description: 'Nighttime, weekends, and public holidays turn into peak sales windows while you and your staff rest peacefully.',
    bulletPoints: [
      'Capture late-night shoppers when physical counters are closed',
      'Wake up to paid orders and customer inquiries neatly organized',
      'Maintain continuous customer rapport across all digital timezones'
    ],
    iconName: 'Moon',
    accentBadge: '24/7 Operations'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Get Your AI Growth Team',
    timeline: 'Step 1 • Initial Connection',
    summary: 'Click the button, message us on WhatsApp or submit your store details to begin your AI transformation.',
    detailedPoints: [
      'Reach out directly via WhatsApp (+260 973 732 409) or our simple booking form',
      'Share your retail category, current channels (shop, WhatsApp, social, web), and top bottlenecks',
      'Receive instant confirmation and consultation schedule'
    ],
    retailerAction: 'Click Get Your AI Growth Team and tell us about your retail shop.',
    mupezeniExecution: 'We review your business profile and prepare a custom audit ahead of our discussion.',
    iconName: 'Sparkles'
  },
  {
    stepNumber: '02',
    title: 'Consultation & Strategic Audit',
    timeline: 'Step 2 • Real Conversation',
    summary: 'A direct, hands-on conversation about your specific store, sales channels, customer volume, and operational bottlenecks.',
    detailedPoints: [
      'Review your current sales channels (Physical shop, WhatsApp, Instagram, Facebook, Web)',
      'Analyze inquiry volume, peak customer shopping hours, and average order values',
      'Map catalogue complexity, payment preferences, and delivery rider logistics'
    ],
    retailerAction: 'Share your retail workflow, product catalogue, and everyday operational challenges.',
    mupezeniExecution: 'We determine feasibility, map your multi-channel customer journey, and outline tailored AI architecture.',
    iconName: 'CalendarCheck'
  },
  {
    stepNumber: '03',
    title: 'Setup & Digital Foundation',
    timeline: 'Step 3 • 4–6 Weeks Build',
    summary: 'We build your digital storefront or connect directly to your existing Shopify/WooCommerce store and train your AI agents.',
    detailedPoints: [
      'Path 1 (Physical Shop): Complete digital store build, catalogue upload, and payment rails (4–6 weeks go-live)',
      'Path 2 (Already Online): Seamless Shopify / WooCommerce API integration and product sync (4–6 weeks go-live)',
      'Train AI Customer Support and Marketing agents on your exact products, sizes, prices, and FAQs'
    ],
    retailerAction: 'Test-drive your AI agents in a private staging preview and verify accuracy.',
    mupezeniExecution: 'We calibrate system guardrails, payment webhooks, and human-in-the-loop escalation safeguards.',
    iconName: 'Cpu'
  },
  {
    stepNumber: '04',
    title: 'Go-Live & First Orders Handled',
    timeline: 'Step 4 • Official Launch',
    summary: 'Your AI agents go live across your channels, instantly answering customer messages and securing confirmed sales.',
    detailedPoints: [
      'Active 24/7 across WhatsApp, Instagram, Facebook, and Web storefronts',
      'Instant sub-second replies, live stock lookups, and frictionless checkout links',
      'Real-time delivery slip preparation and customer notifications'
    ],
    retailerAction: 'Fulfill customer orders and watch enquiries convert without being glued to your phone.',
    mupezeniExecution: 'We monitor live interactions, fine-tune accuracy, and ensure 100% operational uptime.',
    iconName: 'Zap'
  },
  {
    stepNumber: '05',
    title: 'Ongoing Optimization & Growth',
    timeline: 'Step 5 • Monthly Reviews & Scale',
    summary: 'Dedicated monthly performance reviews, continuous prompt tuning, and option to add the Marketing agent anytime.',
    detailedPoints: [
      'Monthly business review: inquiry volume, conversion rates, and revenue trends',
      'Continuous prompt tuning and seasonal catalogue updates',
      'Add the AI Marketing Agent anytime with zero setup fees'
    ],
    retailerAction: 'Focus on sourcing great products from suppliers and delivering them to your customers.',
    mupezeniExecution: 'We provide ongoing technical maintenance, AI model enhancements, and growth strategies.',
    iconName: 'TrendingUp'
  }
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    tagline: '24/7 Personal Stylist, Sizing Advisor & Flash Drop Assistant',
    badge: 'Apparel & Boutiques',
    iconName: 'Shirt',
    challenge: 'Customers ask endless sizing questions ("Will size M fit a 38-inch bust?"), request photos from different angles, and inquiries drop off when replies take longer than 5 minutes.',
    howMupezeniHelps: 'Our AI Sales & Styling Worker matches measurements with your size charts, sends matching accessory recommendations, and secures order deposits directly in WhatsApp.',
    keyFeatures: [
      'Accurate fit guidance based on garment elasticity & sizing charts',
      'Outfit coordination & lookbook recommendations',
      'Instant VIP restock notifications & flash drop broadcasts',
      'Multi-colorway stock verification in milliseconds'
    ],
    sampleInteraction: {
      customerQuery: 'Hey! I love the burgundy linen dress. Do you have it in size Medium, and can I get it delivered to Woodlands by tomorrow morning?',
      aiResponse: 'Hi Chileshe! Yes, we have 3 pieces of the Burgundy Linen Dress in Medium ready in-store. If you confirm your order before 6:00 PM today, our rider will deliver to Woodlands tomorrow between 9:00 AM and 11:00 AM for K40 delivery fee. Would you like me to reserve it and send the Airtel Money / MTN prompt?',
      outcomeNote: 'Order secured in 45 seconds with delivery window and payment ready.'
    },
    metricsHighlight: '3.4x faster order closure on late-night Instagram & WhatsApp inquiries.'
  },
  {
    id: 'electronics',
    name: 'Electronics & Gadgets',
    tagline: 'Technical Spec Advisor, Warranty Guide & Accessory Cross-Sell Engine',
    badge: 'Tech & Devices',
    iconName: 'Smartphone',
    challenge: 'Customers ask highly detailed technical questions regarding compatibility, battery health, processor specs, warranty, and authentic origin before making high-ticket commitments.',
    howMupezeniHelps: 'The AI Electronics Worker possesses instant recall of all device specifications, compares models side-by-side, and offers appropriate screen protectors and chargers.',
    keyFeatures: [
      'Detailed spec comparisons (e.g. iPhone 13 vs 14 battery and camera specs)',
      'Clear explanation of warranty terms, repair policies, and receipts',
      'Automatic accessory bundling (cases, fast chargers, power banks)',
      'Serial number and IMEI verification workflows'
    ],
    sampleInteraction: {
      customerQuery: 'Is this Samsung Galaxy S23 Ultra original with dual SIM, and does it come with a local warranty?',
      aiResponse: 'Yes! All our Samsung Galaxy S23 Ultra units are brand new, 100% original dual-SIM models, backed by our 12-Month Official Store Warranty. We also include a free 45W fast-charging adapter this week. We have Phantom Black and Green in stock at our Kamwala branch. Would you like to pick it up or arrange rider delivery?',
      outcomeNote: 'Instant reassurance on authenticity and warranty converted a high-ticket sale.'
    },
    metricsHighlight: 'Zero missed evening inquiries for high-ticket flagship gadgets.'
  },
  {
    id: 'furniture',
    name: 'Furniture & Home Decor',
    tagline: 'Custom Dimensions Advisor, Fabric Selector & Showroom Scheduler',
    badge: 'Home & Living',
    iconName: 'Armchair',
    challenge: 'High-ticket pieces require measuring room clearances, selecting wood/fabric swatches, calculating custom delivery logistics, and booking in-person showroom viewings.',
    howMupezeniHelps: 'Your AI Furniture Worker assists with custom dimensions, explains upholstery fabrics, calculates furniture transport rates, and schedules showroom appointments.',
    keyFeatures: [
      'Room clearance & dimension checking for L-shape sofas and dining sets',
      'Fabric & wood finish recommendations (velvet, genuine leather, mahogany)',
      'Accurate truck transport & assembly fee estimations',
      'Automated showroom VIP viewing appointments'
    ],
    sampleInteraction: {
      customerQuery: 'Can the 6-seater Nordic dining table fit in a 3.5m dining room? And can you customize the wood finish in dark walnut?',
      aiResponse: 'Absolutely! The Nordic 6-Seater is 1.8m in length, leaving over 0.85m on all sides in a 3.5m room—providing comfortable chair clearance. We can finish it in our signature Dark Walnut within 5 working days. Would you like to see photos of our recent walnut finishes or book a showroom visit?',
      outcomeNote: 'Customer educated on spatial fit and invited to showroom with high intent.'
    },
    metricsHighlight: '65% higher showroom consultation show-up rate with automated reminders.'
  },
  {
    id: 'hardware',
    name: 'Hardware & Building Supplies',
    tagline: 'Part Number Matching, Contractor Bulk Orders & Delivery Logistics',
    badge: 'Hardware & Materials',
    iconName: 'Wrench',
    challenge: 'Builders and technicians send messy lists of technical part numbers, paint codes, pipe gauges, and cement quantities that overwhelm counter staff during morning rushes.',
    howMupezeniHelps: 'The AI Hardware Worker instantly digests handwritten or bulleted material lists, checks stock availability, calculates tonnage/bulk discounts, and creates ready-to-deliver quotes.',
    keyFeatures: [
      'Rapid bulk quote generation from contractor material lists',
      'Part number cross-referencing and substitute recommendations',
      'Tonnage calculation & flatbed truck logistics coordination',
      'Tiered contractor pricing management'
    ],
    sampleInteraction: {
      customerQuery: 'Need a quote for 50 bags 42.5R Dangote cement, 20 lengths 12mm rebar, and 4 rolls binding wire to Silverest site.',
      aiResponse: 'Hello Mr. Banda! Here is your instant quotation: 50x Dangote 42.5R @ K165 = K8,250; 20x 12mm High-Tensile Rebar @ K195 = K3,900; 4x Binding Wire @ K120 = K480. Total Materials: K12,630. Site delivery to Silverest by 2-ton truck: K450. Total: K13,080. Shall I lock in this quote and send payment details for delivery to your site?',
      outcomeNote: 'Contractor quotation generated in under 10 seconds before counter opens.'
    },
    metricsHighlight: 'Under 1-minute quote turnaround for complex contractor orders.'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy & Wellness',
    tagline: 'OTC Availability Checker, Refill Reminders & Store Policy Navigator',
    badge: 'Health & Pharmacy',
    iconName: 'HeartPulse',
    challenge: 'Customers desperately need to know if emergency OTC medicines, baby wellness formulas, or specific supplements are in stock without driving across town.',
    howMupezeniHelps: 'The AI Pharmacy Assistant confirms OTC medicine and vitamin availability, shares branch locations/hours, explains prescription collection guidelines, and sets refill alerts.',
    keyFeatures: [
      'Instant OTC stock availability & pricing lookups across branches',
      'Automated recurring monthly vitamin & wellness refill reminders',
      'Clear guidance on prescription upload & pharmacist verification',
      'First-aid supplies & pediatric supplement categorization'
    ],
    sampleInteraction: {
      customerQuery: 'Do you have Aptamil Stage 2 baby formula in stock at your Woodlands branch, and what is the price?',
      aiResponse: 'Hi there! Yes, we have Aptamil Stage 2 (800g) in stock at Woodlands branch for K380. Our pharmacy counter is open until 9:30 PM tonight. We can also send a rider directly to your home within 45 minutes. Would you like to place a delivery order or reserve a tin for pickup?',
      outcomeNote: 'Immediate relief for parents looking for urgent baby supplies.'
    },
    metricsHighlight: '100% responsiveness to late-evening health and OTC inquiries.'
  },
  {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    tagline: 'Skin Routine Guide, Shade Matcher & Repeat Bundle Marketer',
    badge: 'Cosmetics & Skincare',
    iconName: 'Sparkle',
    challenge: 'Shoppers need shade-matching assistance for foundations, skincare regimen advice for oily/dry skin, and ingredient checks for sensitive skin.',
    howMupezeniHelps: 'The AI Beauty Worker consults customers on their skin type, matches undertones with matching foundation codes, builds personalized routines, and sends automated 60-day restock reminders.',
    keyFeatures: [
      'Personalized skincare routine builder (Cleanse $\\rightarrow$ Tone $\\rightarrow$ Hydrate $\\rightarrow$ Protect)',
      'Foundation shade cross-referencing across global beauty brands',
      'Cruelty-free, vegan, and active ingredient (Niacinamide, Retinol) guides',
      'Automated 60-day refill reminders when serums typically run low'
    ],
    sampleInteraction: {
      customerQuery: 'I have hyperpigmentation and oily skin. What routine do you recommend from the Ordinary or CeraVe products you sell?',
      aiResponse: 'Hello gorgeous! For oily skin with hyperpigmentation, here is the proven 3-step routine we have in stock: 1. CeraVe Foaming Cleanser (K320), 2. The Ordinary Niacinamide 10% + Zinc 1% to regulate oil & fade dark spots (K280), 3. Biore UV Aqua Rich SPF 50 (K310). When bundled together, we offer free delivery across Lusaka. Shall I set up your beauty parcel?',
      outcomeNote: 'Single product query transformed into a 3-item K910 bundle order.'
    },
    metricsHighlight: '2.8x higher average order value through personalized skincare bundles.'
  },
  {
    id: 'grocery',
    name: 'Grocery & Supermarkets',
    tagline: 'Weekly Specials Broadcast, Bulk Pantry Builder & Quick Re-order',
    badge: 'Supermarkets & Food',
    iconName: 'ShoppingBag',
    challenge: 'High transaction frequency, fast-moving items requiring daily clearance, and customers who want to send a quick bulleted grocery list on WhatsApp.',
    howMupezeniHelps: 'The AI Grocery Worker digests bulleted shopping lists, calculates cart totals, broadcasts weekly fresh produce specials, and coordinates pickup or express delivery.',
    keyFeatures: [
      'Rapid conversion of casual text lists into itemized digital carts',
      'Automated Tuesday/Friday fresh produce & butcher specials broadcasts',
      'Repeat "1-Tap" monthly pantry replenishment orders',
      'Express same-day customer delivery rider integration'
    ],
    sampleInteraction: {
      customerQuery: 'Hey! Here is my weekly list: 10kg Pembe mealie meal, 2 trays eggs, 5L cooking oil, 2kg sugar, and 1kg chicken breasts. How much is everything and can I get it today?',
      aiResponse: 'Good morning! Here is your itemized grocery basket: 1. Pembe 10kg: K185, 2. 2x Farm Fresh Egg Trays: K130, 3. 5L D\'lite Oil: K260, 4. 2kg White Sugar: K58, 5. 1kg Fresh Chicken Breasts: K95. Subtotal: K728. Delivery to your address: K30. Total: K758. Our next delivery van departs at 1:30 PM. Would you like to confirm?',
      outcomeNote: '12-minute WhatsApp interaction compressed into a 15-second completed order.'
    },
    metricsHighlight: '4x faster customer checkout for weekly repeat grocery runs.'
  }
];

export const MARQUEE_CHANNELS = [
  { name: 'Physical Shop', type: 'In-Store Counter', icon: 'Store' },
  { name: 'WhatsApp', type: 'Direct Messaging', icon: 'MessageCircle' },
  { name: 'Facebook', type: 'Pages & Messenger', icon: 'Share2' },
  { name: 'Instagram', type: 'DMs & Stories', icon: 'Instagram' },
  { name: 'Shopify', type: 'eCommerce Store', icon: 'ShoppingBag' },
  { name: 'WooCommerce', type: 'WordPress Store', icon: 'Globe' },
  { name: 'TikTok Shop', type: 'Social Commerce', icon: 'Video' },
  { name: 'Amazon', type: 'Marketplace', icon: 'Box' },
  { name: 'eBay', type: 'Marketplace', icon: 'Layers' }
];
