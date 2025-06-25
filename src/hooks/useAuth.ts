import { useState } from 'react';
import { saveToken } from '@/services/tokenService';

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function login(username: string, password: string): Promise<boolean> {
    if (!username.trim() || !password.trim()) {
      setError("Usuário e senha são obrigatórios");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Falha no login');
      }

      if (!data.accessToken) {
        throw new Error('Token não fornecido pela API');
      }

      saveToken(data.accessToken);
      return true;

    } catch (err) {
      console.error('Erro no login:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, error, isLoading };
}
