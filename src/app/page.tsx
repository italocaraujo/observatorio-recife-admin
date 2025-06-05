'use client'; 
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/login/LoginForm';
import styles from '@/app/styles/login/login.module.css';

export default function Login() {
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();

      localStorage.setItem('authToken', data.token);
 
      router.push('/home');

    } catch (error) {
      alert((error as Error).message);
    }
  };


  return (
    <div className={styles.loginContainer}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
