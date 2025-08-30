import { myProfile } from '@/api/customer';
import { authStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

export function useAuth() {

  const { accessToken, isHydrated, logout } = authStore();


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