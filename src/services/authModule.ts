/**
 * Auth Token Management Module
 * Per Hard Rule 2:
 * "Keep the access token in memory and the refresh token in one auth module
 *  (so we can later move it to an httpOnly cookie)."
 */

const REFRESH_TOKEN_STORAGE_KEY = 'mupezeni_rt';

let inMemoryAccessToken: string | null = null;
let onSignOutListener: (() => void) | null = null;

export const authModule = {
  getAccessToken: (): string | null => {
    return inMemoryAccessToken;
  },

  setAccessToken: (token: string | null): void => {
    inMemoryAccessToken = token;
  },

  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  setRefreshToken: (token: string | null): void => {
    try {
      if (token) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      }
    } catch {
      // Storage unavailable / private mode
    }
  },

  clearTokens: (): void => {
    inMemoryAccessToken = null;
    try {
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch {}
  },

  onSignOut: (listener: () => void): (() => void) => {
    onSignOutListener = listener;
    return () => {
      if (onSignOutListener === listener) {
        onSignOutListener = null;
      }
    };
  },

  notifySignOut: (): void => {
    authModule.clearTokens();
    if (onSignOutListener) {
      onSignOutListener();
    }
  }
};
