export type PageId = 
  | 'home' 
  | 'solutions' 
  | 'pricing' 
  | 'how-it-works' 
  | 'industries' 
  | 'about' 
  | 'contact' 
  | 'admin'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'storefront'
  | 'ai-workers-test'
  | 'reset-password'
  | 'business-picker'
  | 'connect-callback';

export interface ConsultationBookingData {
  businessName: string;
  ownerName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  email: string;
  city: string;
  businessCategory: string;
  currentSalesChannels: string[];
  monthlyEnquiries: '<50' | '50-200' | '200-500' | '500-1000' | '1000+';
  biggestChallenge: string;
  preferredConsultationMethod: 'Google Meet' | 'Zoom' | 'Phone' | 'In Person';
  implementationPath?: 'path1-build' | 'path2-upgrade' | 'undecided';
  additionalDetails?: string;
}

export type ConsultationStatus = 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export interface ConsultationRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  storeName: string;
  city: string;
  businessCategory: string;
  channels: string[];
  monthlyOrders: string;
  primaryGoal: string;
  preferredFormat: string;
  status: ConsultationStatus;
  createdAt: string;
  implementationPath?: 'path1-build' | 'path2-upgrade' | 'undecided';
  adminNotes?: string;
  source?: string;
  emailDispatched?: boolean;
}

export interface AiTeamMember {
  id: string;
  title: string;
  roleDescription: string;
  badge: string;
  avatarIcon: string;
  avatarBg: string;
  statusText: string;
  responsibilities: string[];
  businessOutcome: string;
  mockVisual: {
    headline: string;
    subline: string;
    badges: string[];
    sampleSnippet: string;
    metricsTag: string;
  };
}

export interface IndustrySolution {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  iconName: string;
  challenge: string;
  howMupezeniHelps: string;
  keyFeatures: string[];
  sampleInteraction: {
    customerQuery: string;
    aiResponse: string;
    outcomeNote: string;
  };
  metricsHighlight: string;
}

export interface PhilosophyPrinciple {
  id: string;
  title: string;
  quote: string;
  explanation: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  timeline: string;
  summary: string;
  detailedPoints: string[];
  retailerAction: string;
  mupezeniExecution: string;
  iconName: string;
}

export interface BusinessOutcome {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  iconName: string;
  accentBadge: string;
}

export interface EndToEndWorkflowStep {
  stepNumber: string;
  stageTitle: string;
  actor: string;
  action: string;
  description: string;
  details: string[];
  businessImpact: string;
  iconName: string;
  accentColor?: string;
}

export interface EconomicComparisonRow {
  departmentRole: string;
  humanStaffCost: string;
  mupezeniCost: string;
  mupezeniBadge: string;
}

export interface EconomicComparisonData {
  title: string;
  subtitle: string;
  rows: EconomicComparisonRow[];
  totalRow: {
    label: string;
    humanTotal: string;
    mupezeniTotal: string;
    mupezeniNote: string;
    savingsHighlight: string;
  };
}

export interface PricingCategoryGroup {
  categoryName: string;
  items: string[];
}

export type CurrencyMode = 'ZMW' | 'USD';

export interface PricingTier {
  id: 'start' | 'grow' | 'scale';
  name: string;
  emoji: string;
  price: string;
  period: string;
  priceUsd: string;
  priceZmw: string;
  periodUsd: string;
  periodZmw: string;
  roleTitle: string;
  tagline: string;
  isPopular?: boolean;
  accentBadge?: string;
  accentColor: string;
  worksAcross: string[];
  handles: string[];
  categories?: PricingCategoryGroup[];
  limitations?: string[];
  customFeatures?: string[];
}

