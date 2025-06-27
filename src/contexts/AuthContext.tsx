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
    const userData = localStorage.getItem('user_data');
    
    if (authUtils.isAuthenticated() && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        return true;
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
        return false;
      }
    }
    return false;
  };

  const login = (token: string, userData?: User) => {
    authUtils.setToken(token);
    
    if (userData) {
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    // Clear all auth-related data using auth utils
    authUtils.clearAuth();
    
    // Reset state
    setUser(null);
    
    // Navigate to login
    navigate('/login');
  };

  useEffect(() => {
    // Set the logout handler in axios config
    setLogoutHandler(logout);
    
    // Check authentication status on mount
    const isAuth = checkAuth();
    setIsLoading(false);
    
    // If not authenticated and not on login page, redirect to login
    if (!isAuth && window.location.pathname !== '/login' && window.location.pathname !== '/auth/callback') {
      navigate('/login');
    }
  }, [navigate]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
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