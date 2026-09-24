import {
  AiTeamMember,
  IndustrySolution,
  PhilosophyPrinciple,
  ProcessStep,
  BusinessOutcome,
  EndToEndWorkflowStep,
  EconomicComparisonData
} from '../types';

export const AI_TEAM_MEMBERS: AiTeamMember[] = [
  {
    id: 'customer-support',
    title: 'AI Customer Support Worker',
    roleDescription: 'Frontline 24/7 conversational operator answering stock questions, sizing, pricing, capturing qualified leads, and sending payment prompts on WhatsApp, Instagram & Web.',
    badge: 'Frontline AI Worker',
    avatarIcon: 'MessageSquareText',
    avatarBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    statusText: 'Active 24/7 • <3s response time',
    responsibilities: [
      'Answers repetitive product, sizing, and pricing questions instantly',
      'Follows up with warm leads who inquired but haven’t placed an order',
      'Collects customer delivery addresses and formats orders for dispatch',
      'Provides mobile money instructions (Airtel Money, MTN MoMo, Zamtel)',
      'Escalates complex requests or dispute inquiries to human staff'
    ],
    businessOutcome: 'Zero missed sales after hours. Reclaim 3+ hours every single day from answering repetitive DMs.',
    mockVisual: {
      headline: 'WhatsApp & Instagram Live Chat',
      subline: 'Real-time retail inquiry handling & order conversion',
      badges: ['WhatsApp Business', 'Instagram DM', 'Web LiveChat'],
      sampleSnippet: 'Customer: "Is the leather boot available in size 42?"\nAI Support Worker: "Yes, 3 pairs left in size 42 at K850! We offer same-day delivery across Lusaka. Would you like me to reserve a pair for you?"',
      metricsTag: '94% inquiries resolved autonomously'
    }
  },
  {
    id: 'marketing-worker',
    title: 'AI Marketing Worker',
    roleDescription: 'Dedicated creative engine producing 1 high-converting branded image and promotional caption daily (~30 posts/month) across Instagram and Facebook.',
    badge: 'Creative AI Worker',
    avatarIcon: 'Sparkles',
    avatarBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    statusText: 'Daily Content Generator • ~1 post/day',
    responsibilities: [
      'Generates branded product spotlight graphics tailored to your store colors',
      'Writes compelling, persuasive promotional copy with calls-to-action',
      'Suggests relevant hashtags and optimal posting schedules for Zambia',
      'Develops weekly promotional themes (Weekend Flash Sale, Payday Deals)',
      'Prepares copy and images ready for one-click approval or auto-posting'
    ],
    businessOutcome: 'Consistent social media presence without spending $300+ on marketing agencies or hours brainstorming captions.',
    mockVisual: {
      headline: 'Daily Retail Campaign Production',
      subline: 'Branded visuals & persuasive copy created everyday',
      badges: ['Instagram Feed', 'Facebook Posts', 'Promo Banners'],
      sampleSnippet: '"Elevate your weekend style with our signature Oxford Brogues. Handcrafted for comfort and distinction. Order today for free Lusaka delivery. Link in bio!"',
      metricsTag: '30 custom posts created monthly'
    }
  }
];

export const BUSINESS_INSIGHTS_DASHBOARD_DATA = {
  title: 'Business Insights Dashboard',
  badge: 'Included Visibility Layer',
  subtitle: 'A single unified dashboard that keeps you in complete control while your AI workers run the daily grind.',
  features: [
    {
      title: 'Real-time Order & Revenue Feed',
      description: 'See every order initiated, confirmed, and paid across all your digital channels in real time.'
    },
    {
      title: 'Product Velocity & Popularity Index',
      description: 'Understand which items attract the most inquiries and which convert the highest.'
    },
    {
      title: 'Restock & Low-Inventory Signals',
      description: 'Get automated proactive warnings before top-selling items run out of stock.'
    },
    {
      title: 'Lead Conversion Analytics',
      description: 'Track how many DMs turned into paying customers and identify channel ROI.'
    }
  ]
};

export const ECONOMIC_COMPARISON: EconomicComparisonData = {
  title: 'The Real Cost of Retail Operations',
  subtitle: 'Traditional Approach vs. Mupezeni AI Team',
  rows: [
    {
      departmentRole: 'Frontline Customer Support (24/7 DMs & WhatsApp)',
      humanStaffCost: '$250 – $400 / mo (Salaries for 2 shifts or missed after-hour sales)',
      mupezeniCost: 'Included in $100 / mo',
      mupezeniBadge: 'AI Customer Support Worker'
    },
    {
      departmentRole: 'Social Media Marketing & Daily Content Creation',
      humanStaffCost: '$200 – $350 / mo (Freelance designer or agency retainer)',
      mupezeniCost: 'Included in $100 / mo',
      mupezeniBadge: 'AI Marketing Worker (~1 post/day)'
    },
    {
      departmentRole: 'Software Tools & Analytics Subscriptions',
      humanStaffCost: '$100 – $150 / mo (Multiple disconnected SaaS tools & apps)',
      mupezeniCost: 'Included in $100 / mo',
      mupezeniBadge: 'Business Insights Dashboard'
    },
    {
      departmentRole: 'Management, Supervision & Sick Leave Coverage',
      humanStaffCost: '15+ hours/week of owner time spent micro-managing staff',
      mupezeniCost: '0 management overhead',
      mupezeniBadge: 'Always on, zero downtime'
    }
  ],
  totalRow: {
    label: 'Total Monthly Operating Commitment',
    humanTotal: '$550 – $900+ / month',
    mupezeniTotal: '$100 / month flat',
    mupezeniNote: 'No setup fee • Month-to-month • 30-day money-back guarantee',
    savingsHighlight: 'Save $450 – $800+ every month while operating 24/7'
  }
};

export const AGENTIC_FRAMEWORK_STEPS = [
  {
    step: '01',
    name: 'OBSERVE',
    action: 'Watches all retail touchpoints',
    description: 'Monitors incoming WhatsApp messages, Instagram DMs, order events, and inventory counts in real time.'
  },
  {
    step: '02',
    name: 'DECIDE',
    action: 'Evaluates context against store policies',
    description: 'Determines the right response, checks stock availability, calculates delivery costs, and assesses urgency.'
  },
  {
    step: '03',
    name: 'ACT',
    action: 'Executes the work immediately',
    description: 'Replies to customer inquiries, generates branded daily social graphics, sends payment details, and logs orders.'
  },
  {
    step: '04',
    name: 'ESCALATE',
    action: 'Alerts human team when judgment is needed',
    description: 'Seamlessly hands over high-value deals, unique custom requests, or sensitive customer complaints to the owner.'
  }
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'fashion',
    name: 'Fashion & Boutiques',
    tagline: 'Never lose a dress or shoe sale when a customer browses at 11 PM.',
    badge: 'High Inquiries • Fast Fashion',
    iconName: 'Shirt',
    challenge: 'Customers flood DMs asking for size charts, available colors, and fit comparisons. Staff take hours to reply, by which time the buyer moves on.',
    howMupezeniHelps: 'AI Support Worker instantly verifies stock by size and color, recommends matching items, and takes delivery details. AI Marketing Worker generates daily lookbook visuals.',
    keyFeatures: ['Automated size & fit advisor', 'Instant color variation previews', 'Daily outfit-of-the-day posts', 'Mobile money order confirmation'],
    sampleInteraction: {
      customerQuery: 'Do you have the emerald satin gown in size Medium, and can I get it delivered to Woodlands today?',
      aiResponse: 'Yes! We have 2 emerald satin gowns left in Medium. We can dispatch to Woodlands via Yango delivery in under 45 minutes for K650 total. Would you like our Airtel or MTN payment number to confirm?',
      outcomeNote: 'Order secured in 40 seconds before customer closed Instagram.'
    },
    metricsHighlight: '+38% increase in after-hours checkout completion'
  },
  {
    id: 'electronics',
    name: 'Electronics & Gadgets',
    tagline: 'Technical specs explained clearly, stock checked instantly.',
    badge: 'Spec-Heavy • High Ticket',
    iconName: 'Smartphone',
    challenge: 'Shoppers ask about warranty terms, RAM/storage differences, compatibility with other devices, and whether accessories are genuine.',
    howMupezeniHelps: 'AI Support Worker provides accurate spec comparisons, warranty guarantees, and accessories upselling. Generates daily tech highlight graphics.',
    keyFeatures: ['Accurate specification lookup', 'Bundle upselling (screen guards, cases)', 'Warranty documentation dispatch', 'Store pickup coordination'],
    sampleInteraction: {
      customerQuery: 'Is this iPhone 14 Pro brand new with 1-year warranty? Can I trade in my iPhone 11?',
      aiResponse: 'Yes, it is 100% factory sealed with an official 12-month warranty! For trade-ins, please share your iPhone 11 battery health and storage size so our manager can give you an instant valuation.',
      outcomeNote: 'High-ticket inquiry captured with immediate trade-in qualification.'
    },
    metricsHighlight: '2.4x faster response time on high-margin devices'
  },
  {
    id: 'beauty',
    name: 'Beauty, Skincare & Cosmetics',
    tagline: 'Personalized product matching that turns browsing into repeat orders.',
    badge: 'High Repeat Orders',
    iconName: 'Sparkles',
    challenge: 'Skincare routines require guidance on skin types, ingredients, and usage. Generic answers result in abandoned carts.',
    howMupezeniHelps: 'AI Support Worker conducts a quick skin-type consultation, suggests a complete 3-step routine, and alerts you when customer is due for a refill.',
    keyFeatures: ['Skin-type quiz logic', 'Routine bundle suggestions', 'Refill reminder automations', 'Ingredient safety checks'],
    sampleInteraction: {
      customerQuery: 'I have oily, acne-prone skin. Which cleanser and sunscreen should I use?',
      aiResponse: 'For oily and acne-prone skin, our Salicylic Acid Cleansing Gel paired with the Ultra-Light Oil-Free SPF 50 is the top-rated combo. Both are in stock for K520 as a bundle.',
      outcomeNote: 'Upsold single cleanser to complete 2-step bundle.'
    },
    metricsHighlight: '+42% higher average order value with bundle recommendations'
  },
  {
    id: 'furniture',
    name: 'Furniture & Home Decor',
    tagline: 'Showcase dimensions, materials, and delivery timelines effortlessly.',
    badge: 'Custom Orders • High Value',
    iconName: 'Armchair',
    challenge: 'Buyers need exact room measurements, fabric swatches, custom color availability, and bulky delivery cost calculations.',
    howMupezeniHelps: 'AI provides precise dimensions, explains wood/fabric care, estimates delivery based on Lusaka neighborhood, and schedules showroom visits.',
    keyFeatures: ['Dimension & space clearance guides', 'Neighborhood-based delivery fees', 'Showroom appointment scheduling', 'Custom carpentry lead capture'],
    sampleInteraction: {
      customerQuery: 'Can the 6-seater oak dining set fit in a 3.5m by 3m dining room? How much is delivery to Silverest?',
      aiResponse: 'The 6-seater requires 2.8m by 2.2m including chair pull-out space, so it will fit comfortably in your 3.5m x 3m dining area! Delivery and setup to Silverest is K250.',
      outcomeNote: 'Customer booked showroom viewing and placed deposit next morning.'
    },
    metricsHighlight: 'Zero hesitation on bulky furniture inquiries'
  },
  {
    id: 'groceries',
    name: 'Supermarkets & Specialty Foods',
    tagline: 'Manage daily fresh stock alerts, bulk discounts, and rapid delivery.',
    badge: 'High Frequency • Fast Inventory Turn',
    iconName: 'ShoppingBag',
    challenge: 'Daily price changes, fresh produce availability, and quick WhatsApp order lists take up immense time for store clerks.',
    howMupezeniHelps: 'AI parses raw customer shopping lists, checks product availability, sums the total with delivery fee, and generates a mobile money payment link.',
    keyFeatures: ['Bulk shopping list parser', 'Fresh stock alerts to VIP customers', 'Automated packing slips for store crew', 'Daily grocery deal broadcasts'],
    sampleInteraction: {
      customerQuery: 'I need: 10kg breakfast mealie meal, 2L cooking oil, 1 tray of eggs, and 1kg beef stew. How much total?',
      aiResponse: 'Your order total is K385: Breakfast Mealie Meal (K210) + Cooking Oil (K95) + Tray Eggs (K60) + 1kg Beef Stew (K110) with special combo discount! Delivery to Kabulonga is K30.',
      outcomeNote: 'Complex multi-item shopping list processed in 5 seconds.'
    },
    metricsHighlight: '35 minutes saved per grocery order processing'
  },
  {
    id: 'hardware',
    name: 'Hardware & Building Supplies',
    tagline: 'Empower contractors and homeowners with instant quote generation.',
    badge: 'B2B & Trade • Bulk Purchasing',
    iconName: 'Wrench',
    challenge: 'Contractors send long lists of cement bags, rebar steel, roofing sheets, and paint cans demanding rapid quotes before choosing a supplier.',
    howMupezeniHelps: 'AI instantly quotes standard building materials, calculates volume discounts, confirms warehouse location for pickup, and forwards large BOQs to the owner.',
    keyFeatures: ['Bill of quantities (BOQ) parser', 'Truck dispatch coordination', 'Tiered bulk pricing calculations', 'VAT invoice data collection'],
    sampleInteraction: {
      customerQuery: 'Quote for 150 bags of Dangote 42.5 cement and 20 sheets of IBR iron roofing to Roma site.',
      aiResponse: 'Dangote 42.5 Cement: 150 bags @ K162/bag = K24,300. IBR 0.4mm (20 sheets @ K190) = K3,800. Offloading truck delivery to Roma: K600. Total: K28,700. Shall I hold this allocation for today’s dispatch?',
      outcomeNote: 'Contractor selected store due to instant formal quote turnaround.'
    },
    metricsHighlight: 'K180,000+ in contractor quotes processed monthly'
  }
];

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    id: 'agentic-work',
    title: 'AI Workers, Not Just Chatbots',
    quote: 'Software shouldn’t just chat. It should do the work.',
    explanation: 'Traditional chatbots regurgitate canned answers. Mupezeni AI workers take actions: they check stock, capture addresses, create social content, calculate delivery costs, and follow up with leads.',
    iconName: 'Zap'
  },
  {
    id: 'owner-liberation',
    title: 'Free the Retail Owner',
    quote: 'Your job is inventory, sourcing, and growth — not replying to "How much?" 40 times a day.',
    explanation: 'Retail business owners in Zambia are overworked. When your AI workers manage digital operations, you get your evenings back and can focus on supplier relations and expansion.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'zero-bloat',
    title: 'One Fixed Price. Zero Surprises.',
    quote: 'No hiring fees, no PAYE, no sick days, no hidden percentages.',
    explanation: 'At $100/month flat, you get a dedicated AI Customer Support Worker, an AI Marketing Worker, and a real-time Business Insights Dashboard with no setup fee and month-to-month freedom.',
    iconName: 'CheckCircle2'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Sign Agreement & Knowledge Ingestion',
    timeline: 'Weeks 1 – 2',
    summary: 'Sign a low-risk agreement to secure your slot, then share your product catalog, pricing rules, and brand policies.',
    detailedPoints: [
      'Simple, low-risk merchant onboarding agreement signed',
      'Inventory catalogue, prices, sizes, and stock rules ingested',
      'Store tone of voice, greeting style, and payment channels customized'
    ],
    retailerAction: 'Sign agreement and share product catalog or price sheet.',
    mupezeniExecution: 'We audit your customer inflow and architect your dedicated AI knowledge base.',
    iconName: 'Database'
  },
  {
    stepNumber: '02',
    title: 'Build & Hands-on Implementation',
    timeline: 'Weeks 3 – 4',
    summary: 'We build your custom AI workers and work closely with your team to connect messaging channels and test edge cases.',
    detailedPoints: [
      'Custom build of AI Customer Support and AI Marketing Worker models',
      'WhatsApp Business API and Instagram Direct Message integrations linked',
      'Collaborative testing on live order flows and dispute escalations'
    ],
    retailerAction: 'Review sample customer dialogues and approve marketing graphics.',
    mupezeniExecution: 'We work side-by-side with you to ensure high accuracy and smooth staff coordination.',
    iconName: 'Sliders'
  },
  {
    stepNumber: '03',
    title: 'Go Live, Installment & 30-Day Guarantee',
    timeline: 'Weeks 5 – 6',
    summary: 'Deploy live to customers. Pay in flexible installments with a 30-day money-back guarantee for complete peace of mind.',
    detailedPoints: [
      '24/7 customer support and daily promotional marketing go live',
      'Flexible installment payment schedule ($100/mo) activated',
      '100% 30-Day Money-Back Guarantee from launch day'
    ],
    retailerAction: 'Pack and dispatch incoming orders captured by your AI team.',
    mupezeniExecution: 'Continuous weekly prompt tuning, revenue tracking, and proactive optimization.',
    iconName: 'Rocket'
  }
];

export const BUSINESS_OUTCOMES: BusinessOutcome[] = [
  {
    id: 'revenue-recovery',
    title: 'Zero Missed Sales After Hours',
    tagline: 'Turn late-night Instagram scrollers into paid morning orders.',
    description: 'Over 40% of retail inquiries in Zambia happen between 7 PM and 11 PM when physical stores are closed. Your AI Support Worker replies in seconds, shares payment instructions, and locks in orders before morning.',
    bulletPoints: [
      'Immediate responses to night-time shoppers',
      'Automated mobile money payment details provided',
      'Delivery details gathered ready for first-wave morning dispatch'
    ],
    iconName: 'Moon',
    accentBadge: '+30-45% Captured Revenue'
  },
  {
    id: 'consistent-marketing',
    title: 'Daily Marketing on Autopilot',
    tagline: 'Stay top-of-mind without spending hours staring at a blank screen.',
    description: 'Your AI Marketing Worker crafts ~1 post every single day (up to 30 posts/month) complete with branded graphics, persuasive copy, and clear call-to-actions tailored to your Zambian audience.',
    bulletPoints: [
      'Consistent daily social presence on Instagram and Facebook',
      'Custom branded product spotlight visuals',
      'Persuasive captions and hashtags that drive direct messages'
    ],
    iconName: 'Sparkles',
    accentBadge: '30 Posts Every Month'
  },
  {
    id: 'owner-freedom',
    title: '15+ Hours Saved Every Week',
    tagline: 'Stop typing the same product details 50 times every day.',
    description: 'Reclaim your focus. Stop acting as a full-time messaging operator. Focus your energy where human intellect matters most: finding hot inventory, negotiating supplier deals, and expanding your footprint.',
    bulletPoints: [
      'Eliminate repetitive DM answering',
      'Automatic lead qualification and address formatting',
      'Peace of mind knowing your digital store is fully covered'
    ],
    iconName: 'Clock',
    accentBadge: '15+ Hours Weekly Back'
  }
];

export const END_TO_END_WORKFLOW: EndToEndWorkflowStep[] = [
  {
    stepNumber: '01',
    stageTitle: 'Customer Inquires',
    actor: 'Shopper on WhatsApp / Instagram',
    action: 'Sends message asking about product or price',
    description: 'A shopper spots your item on social media and messages: "Is this dress in stock and how much is delivery to Kabwata?"',
    details: ['Triggered instantly on any incoming message', 'No waiting in queue'],
    businessImpact: 'Zero friction first contact',
    iconName: 'MessageCircle'
  },
  {
    stepNumber: '02',
    stageTitle: 'AI Support Worker Engages',
    actor: 'AI Customer Support Worker',
    action: 'Checks inventory, confirms details, asks for order',
    description: 'Within 3 seconds, AI confirms stock in real-time, quotes accurate delivery cost to Kabwata (K30), and provides mobile money payment details.',
    details: ['Under 3 seconds response', 'Accurate stock and delivery verification'],
    businessImpact: 'Captures intent while interest is at its peak',
    iconName: 'Zap'
  },
  {
    stepNumber: '03',
    stageTitle: 'Order Secured & Formatted',
    actor: 'AI Worker + Payment System',
    action: 'Collects customer address, phone & payment proof',
    description: 'Shopper sends payment reference. AI logs the customer details, delivery location, and alerts the store dispatch team via WhatsApp notification.',
    details: ['Automated delivery slip creation', 'Payment receipt verification'],
    businessImpact: 'Zero manual order entry',
    iconName: 'CheckCircle2'
  },
  {
    stepNumber: '04',
    stageTitle: 'Daily Marketing & Re-engagement',
    actor: 'AI Marketing Worker',
    action: 'Posts daily content and re-engages past buyers',
    description: 'Meanwhile, the Marketing Worker publishes today’s product highlight and pings customers who inquired 3 days ago with a limited-time stock alert.',
    details: ['Daily fresh creative', 'Automated follow-up sequences'],
    businessImpact: 'Compound repeat sales and brand visibility',
    iconName: 'TrendingUp'
  }
];
