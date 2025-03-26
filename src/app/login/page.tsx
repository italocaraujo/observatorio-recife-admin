'use client'; // Adiciona a diretiva 'use client' para o Next.js 13

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/login/login.module.css'; // Caminho correto para o CSS específico

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de validação de login (isso pode ser substituído por autenticação real)
    if (username === 'admin' && password === 'observatorio') {
      // Redireciona para a página principal após login bem-sucedido
      router.push('/home');  // Alterar para a sua página principal
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src="/images/logos/observatorio_logo.png" alt="Observatório Logo" className={styles.logoObsLogin} />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label className={styles.loginLabel}>
          <p>
            Usuário:
          </p>

          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.loginIcon}>
            <circle cx="12" cy="6" r="4" fill="#ccc"/>
            <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#ccc"/>
          </svg>

          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            placeholder='Usuário'
            className={styles.loginInput}
          />
        </label>
        <label className={styles.loginLabel}>
          <p>
            Senha:
          </p>

          <svg version="1.1" id="_x32_" width="800px" height="800px" viewBox="0 0 512 512" className={styles.passwordIcon} fill='#ccc'> 
            <g>
              <path d="M407.813,212.719h-9.5v-70.406c0.016-39.203-15.984-74.969-41.688-100.625C330.969,15.969,295.203-0.016,256,0   c-39.203-0.016-74.969,15.969-100.625,41.688c-25.703,25.656-41.703,61.422-41.672,100.625v70.406h-9.516   c-34.453,0-62.375,27.938-62.375,62.375v174.531c0,34.438,27.922,62.375,62.375,62.375h303.625   c34.453,0,62.375-27.938,62.375-62.375V275.094C470.188,240.656,442.266,212.719,407.813,212.719z M175.313,142.313   c0.016-22.391,8.984-42.375,23.625-57.063C213.641,70.594,233.625,61.625,256,61.625s42.359,8.969,57.047,23.625   c14.656,14.688,23.625,34.672,23.641,57.063v70.406H175.313V142.313z M274.031,381.672l9.828,63.703H256h-27.859l9.813-63.703   c-15.5-6.922-26.328-22.422-26.328-40.484c0-24.5,19.859-44.375,44.375-44.375c24.5,0,44.375,19.875,44.375,44.375   C300.375,359.25,289.531,374.75,274.031,381.672z"/>
            </g>
          </svg>

          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder='Senha'
            className={styles.loginInput}
          />
        </label>
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </div>
  );
}
