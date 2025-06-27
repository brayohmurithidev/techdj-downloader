import api from './axiosConfig';

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export const authUtils = {
  // Check if token is expired (if we have expiration info)
  isTokenExpired: (): boolean => {
    const tokenExpiry = localStorage.getItem('token_expiry');
    if (!tokenExpiry) return false;
    
    const expiryTime = parseInt(tokenExpiry, 10);
    return Date.now() >= expiryTime;
  },

  // Set token with optional expiry
  setToken: (token: string, expiresIn?: number) => {
    localStorage.setItem('spotify_token', token);
    
    if (expiresIn) {
      const expiryTime = Date.now() + (expiresIn * 1000);
      localStorage.setItem('token_expiry', expiryTime.toString());
    }
  },

  // Clear all auth data
  clearAuth: () => {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expiry');
  },

  // Attempt to refresh token (if backend supports it)
  refreshToken: async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken
      });

      const { access_token, refresh_token, expires_in } = response.data;
      
      authUtils.setToken(access_token, expires_in);
      
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token);
      }
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  },

  // Get current token
  getToken: (): string | null => {
    return localStorage.getItem('spotify_token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    return !!token && !authUtils.isTokenExpired();
  }
}; 