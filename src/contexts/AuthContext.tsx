import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { setLogoutHandler } from '@/lib/axiosConfig';
import { authUtils } from '@/lib/authUtils';

interface User {
  id: string;
  email?: string;
  display_name?: string;
  images?: Array<{ url: string }>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData?: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = (): boolean => {
    // Check if user is authenticated based on token presence
    const isAuth = authUtils.isAuthenticated();
    console.log('AuthContext: checkAuth - isAuth:', isAuth);
    
    if (isAuth) {
      // Try to load user data if available
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log('AuthContext: checkAuth - loaded user data:', parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Don't logout here, just clear the invalid user data
          localStorage.removeItem('user_data');
        }
      }
      return true;
    }
    
    // Clear user state if not authenticated
    setUser(null);
    return false;
  };

  const login = (token: string, userData?: User) => {
    console.log('AuthContext: login called with token:', !!token, 'userData:', userData);
    authUtils.setToken(token);
    
    if (userData) {
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
    }
    
    // Navigate to dashboard after successful login
    console.log('AuthContext: navigating to dashboard');
    navigate('/dashboard');
  };

  const logout = () => {
    console.log('AuthContext: logout called');
    // Clear all auth-related data using auth utils
    authUtils.clearAuth();
    
    // Reset state
    setUser(null);
    
    // Navigate to login
    navigate('/login');
  };

  useEffect(() => {
    console.log('AuthContext: useEffect - checking auth on mount');
    // Set the logout handler in axios config
    setLogoutHandler(logout);
    
    // Check authentication status on mount
    const isAuth = checkAuth();
    setIsLoading(false);
    
    console.log('AuthContext: useEffect - isAuth:', isAuth, 'pathname:', window.location.pathname);
    
    // If not authenticated and not on login page, redirect to login
    if (!isAuth && window.location.pathname !== '/login' && window.location.pathname !== '/auth/callback') {
      console.log('AuthContext: redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  const isAuthenticated = authUtils.isAuthenticated();
  console.log('AuthContext: isAuthenticated:', isAuthenticated, 'user:', user);

  const value: AuthContextType = {
    user,
    isAuthenticated, // Use token-based authentication check
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 