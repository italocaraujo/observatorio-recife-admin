// app/login/page.tsx
'use client'; // Adiciona a diretiva 'use client' para o Next.js 13

import { useRouter } from 'next/navigation';
import LoginForm from '../../component/login/LoginForm'; // Caminho correto para o componente LoginForm
import styles from '@/app/styles/login/login.module.css';

export default function Login() {
  const router = useRouter();

  const handleLogin = (username: string, password: string, rememberMe: boolean) => {
    // Simulação de validação de login (isso pode ser substituído por autenticação real)
    if (username === 'admin' && password === 'observatorio') {
      // Salvar o estado de autenticação no localStorage
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/home');  // Redireciona para a página inicial após login bem-sucedido
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
