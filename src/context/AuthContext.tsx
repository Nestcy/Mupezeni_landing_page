import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient, ApiUser, BusinessRoleItem, ApiError } from '../services/apiClient';
import { authModule } from '../services/authModule';
import { Business, Store, BrandProfile, BrandContext } from '../types/commerce';

interface AuthContextType {
  user: ApiUser | null;
  businesses: BusinessRoleItem[];
  selectedBusinessId: string | null;
  selectedBusiness: BusinessRoleItem | null;
  role: 'owner' | 'admin' | 'member' | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  emailConfirmationRequired: boolean;
  confirmationEmail: string | null;
  authError: string | null;
  
  // Auth Methods
  signUp: (email: string, password: string, fullName?: string) => Promise<{ 
    success: boolean; 
    emailConfirmationRequired?: boolean; 
    email?: string; 
    businessCount?: number;
    error?: string; 
  }>;
  login: (email: string, password: string) => Promise<{ 
    success: boolean; 
    businessCount: number; 
    error?: string; 
  }>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  confirmPasswordReset: (token: string, password: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  selectBusiness: (businessId: string) => void;
  refreshMe: () => Promise<void>;
  clearEmailConfirmation: () => void;

  // Business & Store Commerce Data
  business: Business | null;
  store: Store | null;
  brandProfile: BrandProfile | null;
  brandContext: BrandContext | null;
  createBusiness: (data: Omit<Business, 'id' | 'owner_id' | 'created_at' | 'updated_at'>) => Promise<Business>;
  updateBusiness: (data: Partial<Business>) => Promise<Business>;
  saveBrandProfile: (data: Partial<BrandProfile>) => Promise<BrandProfile>;
  createStore: (data: Omit<Store, 'id' | 'business_id' | 'created_at' | 'updated_at'>) => Promise<Store>;
  updateStoreDomain: (customDomain: string, primaryDomain?: 'subdomain' | 'custom') => Promise<Store>;
  refreshBusinessAndStore: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SELECTED_BIZ_KEY = 'mupezeni_selected_business_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [businesses, setBusinesses] = useState<BusinessRoleItem[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(SELECTED_BIZ_KEY);
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Commerce store & brand state for dashboard compatibility
  const [business, setBusiness] = useState<Business | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [brandContext, setBrandContext] = useState<BrandContext | null>(null);

  // Active business and role
  const selectedBusiness = businesses.find(b => b.id === selectedBusinessId) || (businesses.length > 0 ? businesses[0] : null);
  const role = selectedBusiness?.role || null;

  // Helper to fetch commerce store metadata for active business
  const fetchCommerceData = useCallback(async (bizId?: string, ownerId?: string) => {
    try {
      const queryParam = bizId 
        ? `businessId=${encodeURIComponent(bizId)}` 
        : (ownerId ? `ownerId=${encodeURIComponent(ownerId)}` : '');
      if (!queryParam) return;

      const res = await fetch(`/api/commerce/business?${queryParam}`);
      if (res.ok) {
        const data = await res.json();
        if (data.business) {
          setBusiness(data.business);

          // Brand Profile
          const bpRes = await fetch(`/api/commerce/brand-profile?businessId=${encodeURIComponent(data.business.id)}`);
          if (bpRes.ok) {
            const bpData = await bpRes.json();
            setBrandProfile(bpData.brandProfile || null);
          }

          // Brand Context
          const bcRes = await fetch(`/api/commerce/brand-context?businessId=${encodeURIComponent(data.business.id)}`);
          if (bcRes.ok) {
            const bcData = await bcRes.json();
            setBrandContext(bcData.brandContext || null);
          }

          // Store
          const storeRes = await fetch(`/api/commerce/store?businessId=${encodeURIComponent(data.business.id)}`);
          if (storeRes.ok) {
            const storeData = await storeRes.json();
            setStore(storeData.store || null);
          }
        }
      }
    } catch (err) {
      console.warn('Commerce sync note:', err);
    }
  }, []);

  // Update selected business ID
  const selectBusiness = useCallback((bizId: string) => {
    setSelectedBusinessId(bizId);
    try {
      localStorage.setItem(SELECTED_BIZ_KEY, bizId);
    } catch {}
    fetchCommerceData(bizId);
  }, [fetchCommerceData]);

  // Fetch GET /me
  const refreshMe = useCallback(async () => {
    try {
      const meData = await apiClient.getMe();
      setUser(meData.user);
      setBusinesses(meData.businesses || []);

      if (meData.businesses && meData.businesses.length > 0) {
        // If only one business, auto-select it
        if (meData.businesses.length === 1) {
          const onlyBiz = meData.businesses[0];
          setSelectedBusinessId(onlyBiz.id);
          try {
            localStorage.setItem(SELECTED_BIZ_KEY, onlyBiz.id);
          } catch {}
          fetchCommerceData(onlyBiz.id, meData.user.id);
        } else {
          // If previous selection is valid, keep it
          const savedId = localStorage.getItem(SELECTED_BIZ_KEY);
          const found = meData.businesses.find(b => b.id === savedId);
          if (found) {
            setSelectedBusinessId(found.id);
            fetchCommerceData(found.id, meData.user.id);
          } else {
            // Keep selectedBusinessId null to let user pick in business picker
          }
        }
      } else {
        setSelectedBusinessId(null);
        setBusiness(null);
        setStore(null);
      }
    } catch (err) {
      setUser(null);
      setBusinesses([]);
      setSelectedBusinessId(null);
    }
  }, [fetchCommerceData]);

  // Session restoration on page load via POST /auth/refresh
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      setIsLoading(true);
      const refreshToken = authModule.getRefreshToken();

      if (!refreshToken) {
        if (isMounted) {
          setUser(null);
          setBusinesses([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        // Restore session via POST /auth/refresh
        const refreshRes = await apiClient.refreshToken(refreshToken);
        const newAccessToken = refreshRes.access_token || refreshRes.session?.access_token;
        if (newAccessToken) {
          authModule.setAccessToken(newAccessToken);
          const newRt = refreshRes.refresh_token || refreshRes.session?.refresh_token;
          if (newRt) {
            authModule.setRefreshToken(newRt);
          }
          // Fetch user and businesses from GET /me
          const meData = await apiClient.getMe();
          if (isMounted) {
            setUser(meData.user);
            setBusinesses(meData.businesses || []);

            if (meData.businesses?.length === 1) {
              const onlyBiz = meData.businesses[0];
              setSelectedBusinessId(onlyBiz.id);
              fetchCommerceData(onlyBiz.id, meData.user.id);
            } else if (meData.businesses?.length > 1) {
              const savedId = localStorage.getItem(SELECTED_BIZ_KEY);
              const found = meData.businesses.find(b => b.id === savedId);
              if (found) {
                setSelectedBusinessId(found.id);
                fetchCommerceData(found.id, meData.user.id);
              }
            }
          }
        } else {
          authModule.clearTokens();
          if (isMounted) {
            setUser(null);
            setBusinesses([]);
          }
        }
      } catch (err) {
        authModule.clearTokens();
        if (isMounted) {
          setUser(null);
          setBusinesses([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    // Subscribe to sign out events (e.g. 401 refresh failure)
    const unsubscribeSignOut = authModule.onSignOut(() => {
      setUser(null);
      setBusinesses([]);
      setSelectedBusinessId(null);
      setBusiness(null);
      setStore(null);
      try {
        localStorage.removeItem(SELECTED_BIZ_KEY);
      } catch {}
    });

    return () => {
      isMounted = false;
      unsubscribeSignOut();
    };
  }, [fetchCommerceData]);

  // Sign Up: POST /auth/signup
  const signUp = async (email: string, password: string, fullName?: string) => {
    setAuthError(null);
    try {
      const res = await apiClient.signup({
        email: email.trim(),
        password,
        full_name: fullName?.trim()
      });

      if (res.email_confirmation_required) {
        setEmailConfirmationRequired(true);
        setConfirmationEmail(email.trim());
        return {
          success: true,
          emailConfirmationRequired: true,
          email: email.trim()
        };
      }

      if (res.user) {
        setUser(res.user);
      }

      // Check /me
      try {
        const meData = await apiClient.getMe();
        setUser(meData.user);
        setBusinesses(meData.businesses || []);
        const bizCount = meData.businesses ? meData.businesses.length : 0;
        return {
          success: true,
          emailConfirmationRequired: false,
          businessCount: bizCount
        };
      } catch {
        return {
          success: true,
          emailConfirmationRequired: false,
          businessCount: 0
        };
      }
    } catch (err: any) {
      const msg = err instanceof ApiError ? err.message : (err?.message || 'Failed to sign up.');
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  // Login: POST /auth/login
  // Strict rule: Login errors MUST be shown as "Invalid email or password"
  const login = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const res = await apiClient.login({
        email: email.trim(),
        password
      });

      setUser(res.user);

      // Fetch GET /me to know businesses
      const meData = await apiClient.getMe();
      setUser(meData.user);
      setBusinesses(meData.businesses || []);

      const bizCount = meData.businesses ? meData.businesses.length : 0;
      if (bizCount === 1) {
        const onlyBiz = meData.businesses[0];
        selectBusiness(onlyBiz.id);
      } else if (bizCount > 1) {
        const savedId = localStorage.getItem(SELECTED_BIZ_KEY);
        const found = meData.businesses.find(b => b.id === savedId);
        if (found) {
          selectBusiness(found.id);
        }
      }

      return {
        success: true,
        businessCount: bizCount
      };
    } catch (err: any) {
      const displayMsg = 'Invalid email or password';
      setAuthError(displayMsg);
      return {
        success: false,
        businessCount: 0,
        error: displayMsg
      };
    }
  };

  // Logout: POST /auth/logout
  const logout = async () => {
    try {
      await apiClient.logout();
    } catch {}
    authModule.notifySignOut();
  };

  // Password reset request: POST /auth/password-reset
  const requestPasswordReset = async (email: string) => {
    try {
      const res = await apiClient.requestPasswordReset(email.trim());
      return { success: true, message: res.message };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to request password reset.' };
    }
  };

  // Confirm password reset: POST /auth/password-reset with token and password
  const confirmPasswordReset = async (token: string, password: string) => {
    try {
      const res = await apiClient.confirmPasswordReset(token.trim(), password);
      return { success: true, message: res.message };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to reset password.' };
    }
  };

  const clearEmailConfirmation = () => {
    setEmailConfirmationRequired(false);
    setConfirmationEmail(null);
  };

  // Commerce Store operations
  const createBusiness = async (data: Omit<Business, 'id' | 'owner_id' | 'created_at' | 'updated_at'>): Promise<Business> => {
    if (!user) throw new Error('Must be logged in to create business.');

    const newBiz: Business = {
      ...data,
      id: `biz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      owner_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const res = await fetch('/api/commerce/business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBiz)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create business');
    }

    const resData = await res.json();
    setBusiness(resData.business);
    selectBusiness(resData.business.id);
    await refreshMe();
    return resData.business;
  };

  const updateBusiness = async (data: Partial<Business>): Promise<Business> => {
    if (!business) throw new Error('No active business to update.');

    const updated = {
      ...business,
      ...data,
      updated_at: new Date().toISOString()
    };

    const res = await fetch('/api/commerce/business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update business');
    }

    const resData = await res.json();
    setBusiness(resData.business);
    return resData.business;
  };

  const saveBrandProfile = async (data: Partial<BrandProfile>): Promise<BrandProfile> => {
    if (!business) throw new Error('Business must exist before saving brand profile.');

    const payload = {
      ...brandProfile,
      ...data,
      business_id: business.id
    };

    const res = await fetch('/api/commerce/brand-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to save brand profile');
    }

    const resData = await res.json();
    setBrandProfile(resData.brandProfile);

    // Refresh context
    const bcRes = await fetch(`/api/commerce/brand-context?businessId=${encodeURIComponent(business.id)}`);
    if (bcRes.ok) {
      const bcData = await bcRes.json();
      setBrandContext(bcData.brandContext || null);
    }

    return resData.brandProfile;
  };

  const createStore = async (data: Omit<Store, 'id' | 'business_id' | 'created_at' | 'updated_at'>): Promise<Store> => {
    if (!business) throw new Error('Business must exist before creating a store.');

    const payload = {
      ...data,
      business_id: business.id
    };

    const res = await fetch('/api/commerce/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create store');
    }

    const resData = await res.json();
    setStore(resData.store);
    return resData.store;
  };

  const updateStoreDomain = async (customDomain: string, primaryDomain: 'subdomain' | 'custom' = 'custom'): Promise<Store> => {
    if (!store) throw new Error('Store must exist before updating domain.');

    const res = await fetch('/api/commerce/store/domain', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storeId: store.id,
        customDomain,
        primaryDomain
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to connect custom domain');
    }

    const resData = await res.json();
    setStore(resData.store);
    return resData.store;
  };

  const refreshBusinessAndStore = async () => {
    if (selectedBusinessId) {
      await fetchCommerceData(selectedBusinessId);
    } else if (user) {
      await fetchCommerceData(undefined, user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        businesses,
        selectedBusinessId,
        selectedBusiness,
        role,
        isLoading,
        isAuthenticated: Boolean(user),
        emailConfirmationRequired,
        confirmationEmail,
        authError,
        signUp,
        login,
        logout,
        requestPasswordReset,
        confirmPasswordReset,
        selectBusiness,
        refreshMe,
        clearEmailConfirmation,
        business,
        store,
        brandProfile,
        brandContext,
        createBusiness,
        updateBusiness,
        saveBrandProfile,
        createStore,
        updateStoreDomain,
        refreshBusinessAndStore
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
