/**
 * Typed API Client for Mupezeni REST API
 * All requests talk to API_URL/api/v1
 * Per Hard Rules 1, 2, 3, 8:
 * - Talks ONLY to REST API at API_URL/api/v1
 * - In-memory access token, refresh token in authModule
 * - Handles 401 -> POST /auth/refresh -> retry once or sign out
 * - Typed error parsing ({detail} or {error:{code,message}})
 */

import { authModule } from './authModule';

// Base API URL from environment variable or relative origin
const getApiBaseUrl = (): string => {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const envUrl = metaEnv.VITE_API_URL || metaEnv.VITE_RENDER_BACKEND_URL || '';
  return envUrl.replace(/\/+$/, '');
};

export interface ApiUser {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
  [key: string]: any;
}

export interface ApiSession {
  access_token: string;
  refresh_token?: string;
  expires_at?: number | string;
}

export interface BusinessRoleItem {
  id: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  currency?: string;
  location?: string;
  phone?: string;
  slug?: string;
  created_at?: string;
}

export interface MeResponse {
  user: ApiUser;
  businesses: BusinessRoleItem[];
}

export interface SignupResponse {
  user?: ApiUser;
  session?: ApiSession;
  email_confirmation_required?: boolean;
  message?: string;
}

export interface LoginResponse {
  user: ApiUser;
  session: ApiSession;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token?: string;
  expires_at?: number | string;
  session?: ApiSession;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

export class ApiError extends Error {
  code?: string;
  status: number;
  detail?: any;

  constructor(message: string, status: number, code?: string, detail?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.detail = detail;
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

export class ApiClient {
  private basePrefix = '/api/v1';

  private getFullUrl(path: string): string {
    const base = getApiBaseUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${this.basePrefix}${cleanPath}`;
  }

  private async parseError(res: Response): Promise<ApiError> {
    let errorMessage = `Request failed (${res.status})`;
    let errorCode: string | undefined;
    let detail: any;

    try {
      const data = await res.json();
      if (typeof data.detail === 'string') {
        errorMessage = data.detail;
      } else if (Array.isArray(data.detail)) {
        errorMessage = data.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
        detail = data.detail;
      } else if (data.error) {
        if (typeof data.error === 'string') {
          errorMessage = data.error;
        } else if (typeof data.error === 'object') {
          errorMessage = data.error.message || errorMessage;
          errorCode = data.error.code;
        }
      } else if (data.message) {
        errorMessage = data.message;
      }
    } catch {
      // response body was not json
    }

    return new ApiError(errorMessage, res.status, errorCode, detail);
  }

  public async request<T>(
    path: string,
    options: RequestInit = {},
    isRetry = false
  ): Promise<T> {
    const url = this.getFullUrl(path);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    const accessToken = authModule.getAccessToken();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers
      });
    } catch (networkErr: any) {
      throw new ApiError(
        networkErr?.message || 'Network request failed. Please check your connection.',
        0
      );
    }

    // Handle 401 Unauthorized
    if (response.status === 401 && !isRetry && !path.includes('/auth/login') && !path.includes('/auth/refresh')) {
      const refreshToken = authModule.getRefreshToken();
      if (!refreshToken) {
        authModule.notifySignOut();
        throw await this.parseError(response);
      }

      if (isRefreshing) {
        // Wait for the ongoing refresh
        return new Promise<T>((resolve, reject) => {
          refreshSubscribers.push(async (newToken) => {
            if (newToken) {
              try {
                const retryRes = await this.request<T>(path, options, true);
                resolve(retryRes);
              } catch (e) {
                reject(e);
              }
            } else {
              reject(new ApiError('Session expired', 401));
            }
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshResult = await this.refreshToken(refreshToken);
        const newAccessToken = refreshResult.access_token || refreshResult.session?.access_token;
        if (!newAccessToken) {
          throw new Error('Refresh did not return access token');
        }

        authModule.setAccessToken(newAccessToken);
        const newRefreshToken = refreshResult.refresh_token || refreshResult.session?.refresh_token;
        if (newRefreshToken) {
          authModule.setRefreshToken(newRefreshToken);
        }

        isRefreshing = false;
        onRefreshed(newAccessToken);

        // Retry the original request once
        return this.request<T>(path, options, true);
      } catch (refreshErr) {
        isRefreshing = false;
        onRefreshed(null);
        authModule.notifySignOut();
        throw new ApiError('Session expired. Please log in again.', 401);
      }
    }

    if (!response.ok) {
      throw await this.parseError(response);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // ================= AUTH ENDPOINTS =================

  /**
   * POST /auth/signup
   * May return email_confirmation_required = true
   */
  async signup(data: { email: string; password: string; full_name?: string }): Promise<SignupResponse> {
    const res = await this.request<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.session?.access_token) {
      authModule.setAccessToken(res.session.access_token);
      if (res.session.refresh_token) {
        authModule.setRefreshToken(res.session.refresh_token);
      }
    }

    return res;
  }

  /**
   * POST /auth/login
   * Returns { user, session { access_token, refresh_token, expires_at } }
   * Note: Callers should catch ApiError and display "Invalid email or password"
   */
  async login(data: { email: string; password: string }): Promise<LoginResponse> {
    const res = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.session?.access_token) {
      authModule.setAccessToken(res.session.access_token);
      if (res.session.refresh_token) {
        authModule.setRefreshToken(res.session.refresh_token);
      }
    }

    return res;
  }

  /**
   * POST /auth/refresh
   */
  async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    return this.request<RefreshResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken })
    });
  }

  /**
   * POST /auth/password-reset (Request reset instructions)
   */
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    return this.request<PasswordResetResponse>('/auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  /**
   * POST /auth/password-reset (Confirm reset with token and new password)
   */
  async confirmPasswordReset(token: string, password: string): Promise<PasswordResetResponse> {
    return this.request<PasswordResetResponse>('/auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
  }

  /**
   * POST /auth/logout
   */
  async logout(): Promise<{ success: boolean }> {
    try {
      await this.request<{ success: boolean }>('/auth/logout', {
        method: 'POST'
      });
    } catch {
      // Ignore network errors during logout
    } finally {
      authModule.notifySignOut();
    }
    return { success: true };
  }

  // ================= USER & BUSINESS ENDPOINTS =================

  /**
   * GET /me
   * Returns { user, businesses: [{ id, name, role }] }
   */
  async getMe(): Promise<MeResponse> {
    return this.request<MeResponse>('/me', {
      method: 'GET'
    });
  }

  /**
   * Business-scoped requests helper
   * URLs look like /api/v1/businesses/{id}/...
   */
  async businessRequest<T>(businessId: string, subPath: string, options: RequestInit = {}): Promise<T> {
    const cleanSubPath = subPath.startsWith('/') ? subPath : `/${subPath}`;
    return this.request<T>(`/businesses/${encodeURIComponent(businessId)}${cleanSubPath}`, options);
  }

  // ================= APPROVALS =================
  /**
   * GET /businesses/{id}/approvals?status=pending
   */
  async getApprovals(businessId: string, status?: string): Promise<{ approvals: ApprovalItem[]; pending_count: number }> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.businessRequest<{ approvals: ApprovalItem[]; pending_count: number }>(businessId, `/approvals${query}`);
  }

  /**
   * POST /businesses/{id}/approvals/{approvalId}/approve
   */
  async approveApproval(businessId: string, approvalId: string): Promise<{ success: boolean; approval: ApprovalItem }> {
    return this.businessRequest<{ success: boolean; approval: ApprovalItem }>(businessId, `/approvals/${encodeURIComponent(approvalId)}/approve`, {
      method: 'POST'
    });
  }

  /**
   * POST /businesses/{id}/approvals/{approvalId}/reject
   */
  async rejectApproval(businessId: string, approvalId: string): Promise<{ success: boolean; approval: ApprovalItem }> {
    return this.businessRequest<{ success: boolean; approval: ApprovalItem }>(businessId, `/approvals/${encodeURIComponent(approvalId)}/reject`, {
      method: 'POST'
    });
  }

  // ================= ONBOARDING & CONNECTORS =================
  /**
   * POST /onboarding/businesses (Step 1)
   */
  async createOnboardingBusiness(data: {
    name: string;
    path: 'existing_retail' | 'mupezeni_managed';
    country: string;
    currency: string;
    phone: string;
    email: string;
  }): Promise<{ success: boolean; business: BusinessRoleItem; id: string }> {
    return this.request<{ success: boolean; business: BusinessRoleItem; id: string }>('/onboarding/businesses', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * POST /businesses/{id}/connectors/catalog (Step 2)
   */
  async connectCatalog(
    businessId: string, 
    data: { provider: 'shopify' | 'woocommerce' | 'mupezeni'; config?: any; credentials?: any }
  ): Promise<{ success: boolean; connector: any }> {
    return this.businessRequest<{ success: boolean; connector: any }>(businessId, '/connectors/catalog', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * POST /businesses/{id}/connectors/{provider}/authorize (Step 3: Meta authorize)
   */
  async authorizeChannel(
    businessId: string, 
    provider: 'whatsapp' | 'facebook' | 'instagram'
  ): Promise<{ authorize_url: string; state: string; code?: string }> {
    return this.businessRequest<{ authorize_url: string; state: string; code?: string }>(businessId, `/connectors/${encodeURIComponent(provider)}/authorize`, {
      method: 'POST'
    });
  }

  /**
   * GET /businesses/{id}/connectors/{provider}/assets (Step 3: Asset picker)
   */
  async getChannelAssets(
    businessId: string, 
    provider: 'whatsapp' | 'facebook' | 'instagram',
    code?: string,
    state?: string
  ): Promise<{ assets: Array<{ id: string; name: string; phone_number?: string }> }> {
    const params = new URLSearchParams();
    if (code) params.set('code', code);
    if (state) params.set('state', state);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.businessRequest<{ assets: Array<{ id: string; name: string; phone_number?: string }> }>(
      businessId, 
      `/connectors/${encodeURIComponent(provider)}/assets${query}`
    );
  }

  /**
   * POST /businesses/{id}/connectors/{provider}/complete (Step 3: Complete meta connection)
   */
  async completeChannelConnection(
    businessId: string, 
    provider: 'whatsapp' | 'facebook' | 'instagram',
    data: { code: string; state: string; external_account_id: string }
  ): Promise<{ success: boolean; connector: any }> {
    return this.businessRequest<{ success: boolean; connector: any }>(
      businessId, 
      `/connectors/${encodeURIComponent(provider)}/complete`, 
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * POST /businesses/{id}/connectors/web (Step 3: Website chat)
   */
  async connectWebChat(
    businessId: string, 
    data: { allowed_origins: string[] }
  ): Promise<{ site_key: string; script_tag: string; status: string; allowed_origins?: string[] }> {
    return this.businessRequest<{ site_key: string; script_tag: string; status: string; allowed_origins?: string[] }>(
      businessId, 
      '/connectors/web', 
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  /**
   * GET /businesses/{id}/connectors
   */
  async getConnectors(
    businessId: string
  ): Promise<{ connectors: Array<{ id: string; provider: string; status: string; name?: string; external_account_id?: string; connected_at?: string }> }> {
    return this.businessRequest<{ connectors: Array<{ id: string; provider: string; status: string; name?: string; external_account_id?: string; connected_at?: string }> }>(
      businessId, 
      '/connectors'
    );
  }

  /**
   * DELETE /businesses/{id}/connectors/{provider} (Disconnect action)
   */
  async disconnectConnector(
    businessId: string, 
    provider: string
  ): Promise<{ success: boolean; provider: string; status: string }> {
    return this.businessRequest<{ success: boolean; provider: string; status: string }>(
      businessId, 
      `/connectors/${encodeURIComponent(provider)}`, 
      {
        method: 'DELETE'
      }
    );
  }

  /**
   * GET /businesses/{id}/onboarding (Step 4)
   */
  async getOnboarding(businessId: string): Promise<OnboardingResponse> {
    return this.businessRequest<OnboardingResponse>(businessId, '/onboarding');
  }

  /**
   * POST /businesses/{id}/onboarding/activate (Step 4: Activate button)
   */
  async activateOnboarding(businessId: string): Promise<{ success: boolean; status: 'active'; completed_at?: string }> {
    return this.businessRequest<{ success: boolean; status: 'active'; completed_at?: string }>(businessId, '/onboarding/activate', {
      method: 'POST'
    });
  }

  /**
   * POST /businesses/{id}/onboarding/steps/{stepId}
   */
  async updateOnboardingStep(businessId: string, stepId: string, completed: boolean = true): Promise<OnboardingResponse> {
    return this.businessRequest<OnboardingResponse>(businessId, `/onboarding/steps/${encodeURIComponent(stepId)}`, {
      method: 'POST',
      body: JSON.stringify({ completed })
    });
  }

  /**
   * POST /businesses/{id}/onboarding/status
   */
  async setOnboardingStatus(businessId: string, status: 'pending' | 'in_progress' | 'active'): Promise<OnboardingResponse> {
    return this.businessRequest<OnboardingResponse>(businessId, '/onboarding/status', {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  }

  // ================= CONVERSATIONS / INBOX =================
  /**
   * GET /businesses/{id}/conversations
   */
  async getConversations(
    businessId: string, 
    params?: { status?: string; channel?: string; needs_human?: boolean }
  ): Promise<ConversationsResponse> {
    const q = new URLSearchParams();
    if (params?.status && params.status !== 'all') q.set('status', params.status);
    if (params?.channel && params.channel !== 'all') q.set('channel', params.channel);
    if (params?.needs_human) q.set('needs_human', 'true');
    const queryString = q.toString() ? `?${q.toString()}` : '';
    return this.businessRequest<ConversationsResponse>(businessId, `/conversations${queryString}`);
  }

  /**
   * GET /businesses/{id}/conversations/{convoId}/messages?after=
   */
  async getConversationMessages(
    businessId: string, 
    convoId: string, 
    after?: string
  ): Promise<{ messages: ConversationMessage[]; conversation?: ConversationItem }> {
    const query = after ? `?after=${encodeURIComponent(after)}` : '';
    return this.businessRequest<{ messages: ConversationMessage[]; conversation?: ConversationItem }>(
      businessId, 
      `/conversations/${encodeURIComponent(convoId)}/messages${query}`
    );
  }

  /**
   * POST /businesses/{id}/conversations/{convoId}/takeover (Pauses the AI)
   */
  async takeoverConversation(
    businessId: string, 
    convoId: string
  ): Promise<{ success: boolean; ai_paused: boolean; conversation: ConversationItem }> {
    return this.businessRequest<{ success: boolean; ai_paused: boolean; conversation: ConversationItem }>(
      businessId, 
      `/conversations/${encodeURIComponent(convoId)}/takeover`, 
      { method: 'POST' }
    );
  }

  /**
   * POST /businesses/{id}/conversations/{convoId}/release (Hand back to AI)
   */
  async releaseConversation(
    businessId: string, 
    convoId: string
  ): Promise<{ success: boolean; ai_paused: boolean; conversation: ConversationItem }> {
    return this.businessRequest<{ success: boolean; ai_paused: boolean; conversation: ConversationItem }>(
      businessId, 
      `/conversations/${encodeURIComponent(convoId)}/release`, 
      { method: 'POST' }
    );
  }

  /**
   * POST /businesses/{id}/conversations/{convoId}/messages
   */
  async sendConversationMessage(
    businessId: string, 
    convoId: string, 
    data: { text: string; sender_type?: 'customer' | 'worker' | 'owner'; sender?: 'human' | 'ai'; is_template?: boolean } | string
  ): Promise<{ success?: boolean; message?: ConversationMessage; conversation?: ConversationItem } | ConversationItem> {
    const payload = typeof data === 'string' 
      ? { text: data, sender_type: 'owner' } 
      : { 
          text: data.text, 
          sender_type: data.sender_type || (data.sender === 'ai' ? 'worker' : 'owner'),
          is_template: data.is_template 
        };

    return this.businessRequest<any>(businessId, `/conversations/${encodeURIComponent(convoId)}/messages`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /**
   * POST /businesses/{id}/conversations/{convoId}/resolve
   */
  async resolveConversation(businessId: string, convoId: string): Promise<ConversationItem> {
    return this.businessRequest<ConversationItem>(businessId, `/conversations/${encodeURIComponent(convoId)}/resolve`, {
      method: 'POST'
    });
  }

  /**
   * GET /businesses/{id}/ai-settings
   */
  async getAiSettings(businessId: string): Promise<{ ai_settings: AiSettings }> {
    return this.businessRequest<{ ai_settings: AiSettings }>(businessId, '/ai-settings');
  }

  /**
   * PATCH /businesses/{id}/ai-settings
   */
  async updateAiSettings(businessId: string, data: Partial<AiSettings>): Promise<{ success: boolean; ai_settings: AiSettings }> {
    return this.businessRequest<{ success: boolean; ai_settings: AiSettings }>(businessId, '/ai-settings', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // ================= DASHBOARD STATS =================
  /**
   * GET /businesses/{id}/dashboard-stats
   */
  async getDashboardStats(businessId: string): Promise<DashboardStats> {
    return this.businessRequest<DashboardStats>(businessId, '/dashboard-stats');
  }

  // ================= PRODUCTS CRUD =================
  /**
   * GET /businesses/{id}/products
   */
  async getProducts(businessId: string): Promise<{ products: any[] }> {
    return this.businessRequest<{ products: any[] }>(businessId, '/products');
  }

  /**
   * GET /businesses/{id}/products/{pid}
   */
  async getProduct(businessId: string, productId: string): Promise<{ product: any }> {
    return this.businessRequest<{ product: any }>(businessId, `/products/${encodeURIComponent(productId)}`);
  }

  /**
   * POST /businesses/{id}/products
   * Note: Prices sent as minor units
   */
  async createProduct(businessId: string, data: any): Promise<{ success: boolean; product: any }> {
    return this.businessRequest<{ success: boolean; product: any }>(businessId, '/products', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PATCH /businesses/{id}/products/{pid}
   */
  async updateProduct(businessId: string, productId: string, data: any): Promise<{ success: boolean; product: any }> {
    return this.businessRequest<{ success: boolean; product: any }>(businessId, `/products/${encodeURIComponent(productId)}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE /businesses/{id}/products/{pid}
   */
  async deleteProduct(businessId: string, productId: string): Promise<{ success: boolean; id: string }> {
    return this.businessRequest<{ success: boolean; id: string }>(businessId, `/products/${encodeURIComponent(productId)}`, {
      method: 'DELETE'
    });
  }

  /**
   * POST /businesses/{id}/media (Multipart file upload)
   */
  async uploadMedia(businessId: string, file: File): Promise<{ url: string; id?: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const base = getApiBaseUrl();
    const url = `${base}/api/v1/businesses/${encodeURIComponent(businessId)}/media`;
    const token = authModule.getAccessToken();

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(err?.error?.message || err?.message || 'Media upload failed', res.status);
    }
    return res.json();
  }

  // ================= STORE SETTINGS =================
  /**
   * GET /businesses/{id}/store
   */
  async getStore(businessId: string): Promise<{ store: any }> {
    return this.businessRequest<{ store: any }>(businessId, '/store');
  }

  /**
   * PATCH /businesses/{id}/store (name, slug, logo, colors, about, contact)
   */
  async updateStore(businessId: string, data: any): Promise<{ success: boolean; store: any }> {
    return this.businessRequest<{ success: boolean; store: any }>(businessId, '/store', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  /**
   * POST /businesses/{id}/store/publish
   */
  async publishStore(businessId: string): Promise<{ success: boolean; is_published: boolean; store: any }> {
    return this.businessRequest<{ success: boolean; is_published: boolean; store: any }>(businessId, '/store/publish', {
      method: 'POST'
    });
  }

  // ================= PUBLIC STOREFRONT ENDPOINTS =================
  /**
   * GET /public/stores/{slug}
   */
  async getPublicStore(slug: string): Promise<{ store: any; business: any; brandProfile?: any }> {
    return this.request<{ store: any; business: any; brandProfile?: any }>(`/public/stores/${encodeURIComponent(slug)}`);
  }

  /**
   * GET /public/stores/{slug}/products
   */
  async getPublicProducts(slug: string): Promise<{ products: any[] }> {
    return this.request<{ products: any[] }>(`/public/stores/${encodeURIComponent(slug)}/products`);
  }

  /**
   * GET /public/stores/{slug}/products/{productSlug}
   */
  async getPublicProduct(slug: string, productSlug: string): Promise<{ product: any }> {
    return this.request<{ product: any }>(`/public/stores/${encodeURIComponent(slug)}/products/${encodeURIComponent(productSlug)}`);
  }

  /**
   * POST /public/stores/{slug}/checkout
   */
  async publicCheckout(slug: string, orderData: any): Promise<{ success: boolean; order: any; whatsapp_url: string; whatsapp_message: string }> {
    return this.request<{ success: boolean; order: any; whatsapp_url: string; whatsapp_message: string }>(`/public/stores/${encodeURIComponent(slug)}/checkout`, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  // ==========================================
  // MARKETING CAMPAIGNS & CONTENT
  // ==========================================

  /**
   * POST /businesses/{id}/marketing/plans
   * Returns 202 with campaign id and initial 'generating' status
   */
  async createMarketingPlan(businessId: string, plan: MarketingPlanPayload): Promise<{ status: string; campaign_id: string; campaign: MarketingCampaign; items_count: number }> {
    return this.request<{ status: string; campaign_id: string; campaign: MarketingCampaign; items_count: number }>(`/businesses/${encodeURIComponent(businessId)}/marketing/plans`, {
      method: 'POST',
      body: JSON.stringify(plan)
    });
  }

  /**
   * GET /businesses/{id}/marketing/campaigns/{cid}
   * Polls campaign status (e.g. generating -> ready)
   */
  async getMarketingCampaign(businessId: string, campaignId: string): Promise<{ campaign: MarketingCampaign }> {
    return this.request<{ campaign: MarketingCampaign }>(`/businesses/${encodeURIComponent(businessId)}/marketing/campaigns/${encodeURIComponent(campaignId)}`);
  }

  /**
   * GET /businesses/{id}/marketing/campaigns
   */
  async getMarketingCampaigns(businessId: string): Promise<{ campaigns: MarketingCampaign[] }> {
    return this.request<{ campaigns: MarketingCampaign[] }>(`/businesses/${encodeURIComponent(businessId)}/marketing/campaigns`);
  }

  /**
   * GET /businesses/{id}/marketing/content?campaign_id=
   */
  async getMarketingContent(businessId: string, campaignId?: string): Promise<{ items: MarketingContentItem[]; campaign?: MarketingCampaign | null }> {
    const q = campaignId ? `?campaign_id=${encodeURIComponent(campaignId)}` : '';
    return this.request<{ items: MarketingContentItem[]; campaign?: MarketingCampaign | null }>(`/businesses/${encodeURIComponent(businessId)}/marketing/content${q}`);
  }

  /**
   * PATCH /businesses/{id}/marketing/content/{contentId}
   * Marks content item as "needs re-approval" and updates content_hash
   */
  async updateMarketingContent(businessId: string, contentId: string, updates: { caption?: string; scheduled_at?: string; image_url?: string; platform?: string }): Promise<{ success: boolean; item: MarketingContentItem }> {
    return this.request<{ success: boolean; item: MarketingContentItem }>(`/businesses/${encodeURIComponent(businessId)}/marketing/content/${encodeURIComponent(contentId)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  /**
   * POST /businesses/{id}/marketing/campaigns/{cid}/approve
   * Approves all items with their content hashes
   */
  async approveMarketingCampaignAll(businessId: string, campaignId: string, items?: Array<{ id: string; content_hash: string }>): Promise<{ success: boolean; approved_count: number; items: MarketingContentItem[] }> {
    return this.request<{ success: boolean; approved_count: number; items: MarketingContentItem[] }>(`/businesses/${encodeURIComponent(businessId)}/marketing/campaigns/${encodeURIComponent(campaignId)}/approve`, {
      method: 'POST',
      body: JSON.stringify({ items })
    });
  }

  /**
   * POST /businesses/{id}/marketing/content/{contentId}/approve
   */
  async approveMarketingContent(businessId: string, contentId: string, contentHash?: string): Promise<{ success: boolean; item: MarketingContentItem }> {
    return this.request<{ success: boolean; item: MarketingContentItem }>(`/businesses/${encodeURIComponent(businessId)}/marketing/content/${encodeURIComponent(contentId)}/approve`, {
      method: 'POST',
      body: JSON.stringify({ content_hash: contentHash })
    });
  }

  /**
   * POST /businesses/{id}/marketing/content/{contentId}/reject
   */
  async rejectMarketingContent(businessId: string, contentId: string, reason?: string): Promise<{ success: boolean; item: MarketingContentItem }> {
    return this.request<{ success: boolean; item: MarketingContentItem }>(`/businesses/${encodeURIComponent(businessId)}/marketing/content/${encodeURIComponent(contentId)}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }

  /**
   * Campaign Controls: Pause, Resume, Cancel
   */
  async pauseMarketingCampaign(businessId: string, campaignId: string): Promise<{ success: boolean; campaign: MarketingCampaign }> {
    return this.request<{ success: boolean; campaign: MarketingCampaign }>(`/businesses/${encodeURIComponent(businessId)}/marketing/campaigns/${encodeURIComponent(campaignId)}/pause`, {
      method: 'POST'
    });
  }

  async resumeMarketingCampaign(businessId: string, campaignId: string): Promise<{ success: boolean; campaign: MarketingCampaign }> {
    return this.request<{ success: boolean; campaign: MarketingCampaign }>(`/businesses/${encodeURIComponent(businessId)}/marketing/campaigns/${encodeURIComponent(campaignId)}/resume`, {
      method: 'POST'
    });
  }

  async cancelMarketingCampaign(businessId: string, campaignId: string): Promise<{ success: boolean; campaign: MarketingCampaign }> {
    return this.request<{ success: boolean; campaign: MarketingCampaign }>(`/businesses/${encodeURIComponent(businessId)}/marketing/campaigns/${encodeURIComponent(campaignId)}/cancel`, {
      method: 'POST'
    });
  }

  /**
   * Explicit Publish Now for approved/scheduled items
   */
  async publishMarketingContent(businessId: string, contentId: string): Promise<{ success: boolean; item: MarketingContentItem }> {
    return this.request<{ success: boolean; item: MarketingContentItem }>(`/businesses/${encodeURIComponent(businessId)}/marketing/content/${encodeURIComponent(contentId)}/publish`, {
      method: 'POST'
    });
  }

  /**
   * Retry failed post publication
   */
  async retryMarketingContent(businessId: string, contentId: string): Promise<{ success: boolean; item: MarketingContentItem }> {
    return this.request<{ success: boolean; item: MarketingContentItem }>(`/businesses/${encodeURIComponent(businessId)}/marketing/content/${encodeURIComponent(contentId)}/retry`, {
      method: 'POST'
    });
  }

  // ==========================================
  // ADS & META CONNECTOR METHODS
  // ==========================================

  /**
   * Connect flow: POST .../connectors/meta_ads/authorize
   */
  async authorizeMetaAds(businessId: string): Promise<{ success: boolean; redirect_url: string; state: string }> {
    return this.request<{ success: boolean; redirect_url: string; state: string }>(`/businesses/${encodeURIComponent(businessId)}/connectors/meta_ads/authorize`, {
      method: 'POST'
    });
  }

  /**
   * GET .../connectors/meta_ads/assets to pick an ad account and Page
   */
  async getMetaAdsAssets(businessId: string): Promise<{ ad_accounts: any[]; pages: any[] }> {
    return this.request<{ ad_accounts: any[]; pages: any[] }>(`/businesses/${encodeURIComponent(businessId)}/connectors/meta_ads/assets`);
  }

  /**
   * Complete connector setup: POST .../connectors/meta_ads/complete
   */
  async completeMetaAds(businessId: string, payload: { ad_account_id: string; page_id: string }): Promise<{ success: boolean; connector: MetaAdsConnectorState }> {
    return this.request<{ success: boolean; connector: MetaAdsConnectorState }>(`/businesses/${encodeURIComponent(businessId)}/connectors/meta_ads/complete`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /**
   * GET .../connectors/meta_ads
   */
  async getMetaAdsConnector(businessId: string): Promise<{ connector: MetaAdsConnectorState }> {
    return this.request<{ connector: MetaAdsConnectorState }>(`/businesses/${encodeURIComponent(businessId)}/connectors/meta_ads`);
  }

  /**
   * POST .../connectors/meta_ads/disconnect
   */
  async disconnectMetaAds(businessId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/businesses/${encodeURIComponent(businessId)}/connectors/meta_ads/disconnect`, {
      method: 'POST'
    });
  }

  /**
   * Show account currency and hard caps from GET .../ads/accounts
   */
  async getAdAccounts(businessId: string): Promise<{ accounts: AdAccount[] }> {
    return this.request<{ accounts: AdAccount[] }>(`/businesses/${encodeURIComponent(businessId)}/ads/accounts`);
  }

  /**
   * Admins edit caps via PUT .../ads/accounts/{aid}/limits
   */
  async updateAdAccountLimits(
    businessId: string, 
    accountId: string, 
    limits: { hard_cap_minor_units?: number; monthly_spend_cap_minor_units?: number; auto_pause_at_cap?: boolean }
  ): Promise<{ success: boolean; account: AdAccount }> {
    return this.request<{ success: boolean; account: AdAccount }>(`/businesses/${encodeURIComponent(businessId)}/ads/accounts/${encodeURIComponent(accountId)}/limits`, {
      method: 'PUT',
      body: JSON.stringify(limits)
    });
  }

  /**
   * "New ad" form creates a draft with POST .../ads/drafts
   */
  async createAdDraft(businessId: string, payload: {
    goal: string;
    product_id?: string;
    product_name?: string;
    daily_budget_minor_units: number;
    start_date: string;
    end_date: string;
    audience?: any;
    prompt_notes?: string;
  }): Promise<{ success: boolean; draft: AdDraft }> {
    return this.request<{ success: boolean; draft: AdDraft }>(`/businesses/${encodeURIComponent(businessId)}/ads/drafts`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /**
   * GET .../ads/drafts
   */
  async getAdDrafts(businessId: string): Promise<{ drafts: AdDraft[] }> {
    return this.request<{ drafts: AdDraft[] }>(`/businesses/${encodeURIComponent(businessId)}/ads/drafts`);
  }

  /**
   * Explicit approval click: POST .../ads/drafts/{id}/approve
   * "Ads never start without approval"
   */
  async approveAdDraft(businessId: string, draftId: string, selectedCreativeId?: string): Promise<{ success: boolean; campaign: AdCampaign; message: string }> {
    return this.request<{ success: boolean; campaign: AdCampaign; message: string }>(`/businesses/${encodeURIComponent(businessId)}/ads/drafts/${encodeURIComponent(draftId)}/approve`, {
      method: 'POST',
      body: JSON.stringify({ selected_creative_id: selectedCreativeId })
    });
  }

  /**
   * Reject draft
   */
  async rejectAdDraft(businessId: string, draftId: string, reason?: string): Promise<{ success: boolean; draft: AdDraft }> {
    return this.request<{ success: boolean; draft: AdDraft }>(`/businesses/${encodeURIComponent(businessId)}/ads/drafts/${encodeURIComponent(draftId)}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }

  /**
   * Campaign list with status: GET .../ads/campaigns
   */
  async getAdCampaigns(businessId: string): Promise<{ campaigns: AdCampaign[] }> {
    return this.request<{ campaigns: AdCampaign[] }>(`/businesses/${encodeURIComponent(businessId)}/ads/campaigns`);
  }

  /**
   * Daily insights from GET .../ads/campaigns/{id}/insights (spend, clicks, conversions)
   */
  async getAdCampaignInsights(businessId: string, campaignId: string): Promise<{ insights: AdCampaignInsights }> {
    return this.request<{ insights: AdCampaignInsights }>(`/businesses/${encodeURIComponent(businessId)}/ads/campaigns/${encodeURIComponent(campaignId)}/insights`);
  }

  /**
   * Pause campaign: POST .../ads/campaigns/{id}/pause
   */
  async pauseAdCampaign(businessId: string, campaignId: string): Promise<{ success: boolean; campaign: AdCampaign }> {
    return this.request<{ success: boolean; campaign: AdCampaign }>(`/businesses/${encodeURIComponent(businessId)}/ads/campaigns/${encodeURIComponent(campaignId)}/pause`, {
      method: 'POST'
    });
  }

  /**
   * Resume campaign: POST .../ads/campaigns/{id}/resume
   */
  async resumeAdCampaign(businessId: string, campaignId: string): Promise<{ success: boolean; campaign: AdCampaign; message?: string }> {
    return this.request<{ success: boolean; campaign: AdCampaign; message?: string }>(`/businesses/${encodeURIComponent(businessId)}/ads/campaigns/${encodeURIComponent(campaignId)}/resume`, {
      method: 'POST'
    });
  }
}

// Interfaces for Business APIs
export interface ApprovalItem {
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

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action_tab: string;
}

export interface OnboardingResponse {
  status: 'pending' | 'in_progress' | 'active';
  steps: OnboardingStep[];
  completed_steps: string[];
  total_steps: number;
  can_activate?: boolean;
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

export interface ConversationItem {
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

export interface ConversationsResponse {
  conversations: ConversationItem[];
  unread_count: number;
  needs_human_count: number;
  today_messages_count: number;
  counts?: {
    all: number;
    open: number;
    needs_human: number;
    resolved: number;
    unread: number;
    whatsapp: number;
    web: number;
    instagram: number;
    messenger: number;
  };
}

export interface AiSettings {
  business_id: string;
  ai_enabled: boolean;
  auto_reply: boolean;
  takeover_timeout_minutes: number;
  confidence_threshold: number;
  updated_at: string;
}

export interface DashboardStats {
  today_messages_count: number;
  open_conversations_needing_human: number;
  unread_conversations_count: number;
  orders_count: number;
  total_revenue_minor_units: number;
  pending_approvals_count: number;
  pending_approvals: ApprovalItem[];
  conversations_needing_human: ConversationItem[];
}

export interface MarketingPlanPayload {
  platforms: string[];
  number_of_posts: number;
  start_date: string;
  cadence: 'daily' | 'twice_daily' | 'three_per_week' | 'weekly';
  products_to_feature?: string[];
  product_ids?: string[];
  tone_notes?: string;
}

export interface MarketingCampaign {
  id: string;
  business_id: string;
  name: string;
  status: 'generating' | 'ready' | 'active' | 'paused' | 'cancelled' | 'completed';
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

export interface MarketingContentItem {
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

// ==========================================
// Ads Interfaces
// ==========================================
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
  hard_cap_minor_units: number;
  monthly_spend_cap_minor_units: number;
  current_spend_minor_units: number;
  auto_pause_at_cap: boolean; // UI must show cap and "auto-pauses at cap"
  is_connected: boolean;
  updated_at: string;
}

export interface AdDraftCreative {
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
  max_possible_spend_minor_units: number;
  currency: string;
  audience: {
    locations: string[];
    age_min: number;
    age_max: number;
    interests: string[];
    gender: string;
  };
  ai_creatives: AdDraftCreative[];
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
  creative: AdDraftCreative;
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

/**
 * Currency Minor Units Formatter
 * Per Hard Rule 6:
 * "Money is integer minor units. Display as major units with the business currency (default ZMW)."
 */
export function formatMinorUnits(minorUnits: number | undefined | null, currency = 'ZMW'): string {
  if (minorUnits === undefined || minorUnits === null || isNaN(minorUnits)) {
    return `${currency} 0.00`;
  }
  const major = minorUnits / 100;
  return `${currency} ${major.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const apiClient = new ApiClient();
