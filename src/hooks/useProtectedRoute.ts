import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/services/tokenService';

export function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);
}