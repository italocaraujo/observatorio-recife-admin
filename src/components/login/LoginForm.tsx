'use client';

import { useState } from 'react';
import styles from '@/app/styles/login/login.module.css';
import '@/app/globals.css';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.logoContainer}>
        <img src="/images/logos/observatorio_logo.png" alt="Observatório Logo" className={styles.logoObsLogin} />
        <h3>Observatório Econômico do Recife</h3>
        <p>Sistema Administrativo da Prefeitura do Recife</p>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.loginLabel}>
            <label>Usuário</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="Usuário"
              className={styles.loginInput}
            />
        </div>
        <div className={styles.loginLabel}>
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Senha"
            className={styles.loginInput}
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </div>
      
    </form>
  );
};

export default LoginForm;
