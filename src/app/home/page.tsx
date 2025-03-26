// /app/home/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');  // Redireciona para o login se não estiver autenticado
    }
  }, [router]);

  return (
    <div>
      <h1>Bem-vindo à página inicial!</h1>
    </div>
  );
}
