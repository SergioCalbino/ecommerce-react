import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { myProfile } from '@/api/Auth';
import { useEffect } from 'react';

export function useAuth() {

  const { accessToken, isHydrated, logout } = useAuthStore();


  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: myProfile,
    enabled: !!accessToken && isHydrated,
  });


  useEffect(() => {
    if (isError) {
      console.error("Error fetching user profile. Logging out...");
      logout();
    }
  }, [isError, logout]);

  
  return {
    user,
    isLoading,
    isAuthenticated: !!accessToken,
  };
}