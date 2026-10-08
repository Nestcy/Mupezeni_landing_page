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
  async getConversations(businessId: string): Promise<ConversationsResponse> {
    return this.businessRequest<ConversationsResponse>(businessId, '/conversations');
  }

  /**
   * POST /businesses/{id}/conversations/{convoId}/messages
   */
  async sendConversationMessage(
    businessId: string, 
    convoId: string, 
    text: string, 
    sender: 'human' | 'ai' = 'human'
  ): Promise<ConversationItem> {
    return this.businessRequest<ConversationItem>(businessId, `/conversations/${encodeURIComponent(convoId)}/messages`, {
      method: 'POST',
      body: JSON.stringify({ text, sender })
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

  // ================= DASHBOARD STATS =================
  /**
   * GET /businesses/{id}/dashboard-stats
   */
  async getDashboardStats(businessId: string): Promise<DashboardStats> {
    return this.businessRequest<DashboardStats>(businessId, '/dashboard-stats');
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
  sender: 'customer' | 'ai' | 'human';
  text: string;
  timestamp: string;
}

export interface ConversationItem {
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

export interface ConversationsResponse {
  conversations: ConversationItem[];
  unread_count: number;
  needs_human_count: number;
  today_messages_count: number;
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
