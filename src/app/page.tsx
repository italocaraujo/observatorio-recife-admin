// app/login/page.tsx
'use client'; 
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/login/LoginForm';
import styles from '@/app/styles/login/login.module.css';

export default function Login() {
  const router = useRouter();

  const handleLogin = (username: string, password: string, rememberMe: boolean) => {
    if (username === 'admin' && password === 'observatorio') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/home'); 
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <img src="/images/logos/observatorio_logo.png" alt="Observatório Logo" className={styles.logoObsLogin} />
      </div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
