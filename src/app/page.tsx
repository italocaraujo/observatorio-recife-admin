'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/login/LoginForm';
import styles from '@/app/styles/login/login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    try {
      const success = await login(username, password);
      if (success) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Erro no login:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm onSubmit={handleLogin} />
      {isLoading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
