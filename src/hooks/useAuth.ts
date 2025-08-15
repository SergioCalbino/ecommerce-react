import { useAuthStore } from '@/store/useAuthStore'
import  { useEffect } from 'react'

export function useAuth() {

    const { token, user, getMyProfile, isHydrated, accessToken } = useAuthStore();

    useEffect(() => {
       if (isHydrated && (token || accessToken) && !user) {
      getMyProfile();
    }
  }, [isHydrated, token, accessToken, user, getMyProfile]);

  return {
    user

  }

    
  

 
}
