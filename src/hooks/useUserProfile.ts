import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axiosConfig';
import { useAuth } from '@/contexts/AuthContext';

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  href: string;
  type: string;
  uri: string;
}

export const useUserProfile = () => {
  const { isAuthenticated, user, login } = useAuth();


  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async (): Promise<SpotifyUser> => {
      const response = await api.get('/spotify/me');
      return response.data;
    },
    enabled: isAuthenticated && !user?.display_name, // Only fetch if authenticated but no user data
    // @ts-ignore
    onSuccess: (data: { id: any; display_name: any; email: any; images: any; }) => {
      // Update the auth context with user data
      const token = localStorage.getItem('spotify_token');
      if (token) {
        login(token, {
          id: data.id,
          display_name: data.display_name,
          email: data.email,
          images: data.images,
        });
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 