/**
 * FastAPI Client for Mupezeni AI Backend (github.com/Nestcy/mupezeni.ai)
 * Connects directly to FastAPI endpoints deployed on Render.
 */

const getBaseUrl = () => {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  return metaEnv.VITE_RENDER_BACKEND_URL || 'https://mupezeni-ai.onrender.com';
};

export interface StartBusinessPayload {
  name: string;
  path: 'existing_retail' | 'mupezeni_managed';
  country?: string;
  currency?: string;
  phone?: string;
  email?: string;
}

export interface CatalogConnectPayload {
  provider: 'mupezeni' | 'shopify' | 'woocommerce';
  config?: Record<string, any>;
  credentials?: Record<string, string>;
}

export interface WebConnectPayload {
  allowed_origins: string[];
}

export interface CartItemIn {
  product_id: string;
  variant_id?: string;
  variant_name?: string;
  quantity: number;
}

export interface CheckoutCreatePayload {
  customer_id: string;
  cart_id: string;
  items: CartItemIn[];
  currency?: string;
  shipping_minor?: number;
}

export interface PaymentCreatePayload {
  checkout_id: string;
  payment_method_type?: string;
}

export class FastApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || getBaseUrl()).replace(/\/+$/, '');
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
    token?: string | null
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers
    });

    if (!res.ok) {
      let errorMsg = `FastAPI request failed (${res.status})`;
      try {
        const errorJson = await res.json();
        errorMsg = errorJson.detail || errorJson.error?.message || errorJson.message || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }

    return res.json();
  }

  // Health
  async checkHealth(): Promise<{ status: string; version: string; supabase_configured: boolean; dev_auth: boolean }> {
    return this.request('/health');
  }

  // Onboarding
  async startBusiness(payload: StartBusinessPayload, token: string) {
    return this.request('/api/v1/onboarding/businesses', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token);
  }

  async getOnboardingStatus(businessId: string, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/onboarding`, {
      method: 'GET'
    }, token);
  }

  async connectCatalog(businessId: string, payload: CatalogConnectPayload, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/connectors/catalog`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token);
  }

  async connectWeb(businessId: string, payload: WebConnectPayload, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/connectors/web`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token);
  }

  async activateBusiness(businessId: string, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/onboarding/activate`, {
      method: 'POST'
    }, token);
  }

  // Commerce & Checkouts
  async createCheckout(businessId: string, payload: CheckoutCreatePayload, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/checkouts`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token);
  }

  async completeCheckout(businessId: string, checkoutId: string, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/checkouts/${encodeURIComponent(checkoutId)}/complete`, {
      method: 'POST'
    }, token);
  }

  async createPayment(businessId: string, payload: PaymentCreatePayload, token: string) {
    return this.request(`/api/v1/businesses/${encodeURIComponent(businessId)}/payments`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }, token);
  }

  // Inbound Web Message
  async sendWebMessage(siteKey: string, payload: { session_id: string; message_id: string; content: string }) {
    return this.request(`/api/v1/channels/web/${encodeURIComponent(siteKey)}/messages`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
}

export const fastApiClient = new FastApiClient();
