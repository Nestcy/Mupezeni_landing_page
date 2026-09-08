export type PageId = 'home' | 'how-it-works' | 'industries' | 'about' | 'contact' | 'admin';

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
