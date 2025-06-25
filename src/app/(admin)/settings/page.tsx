'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/pages/page.module.css';
import additionalStyles from '@/app/styles/layout/LayoutPage.module.css';
import PageTitle from '@/components/layout/PageTitle';
import Loading from '@/components/layout/Loading';
import { removeToken } from '@/services/tokenService';

export default function Settings() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      setSuccessMessage(null);
      setError(null);

      // Simula pequeno delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      removeToken(); // Limpa o token salvo
      setSuccessMessage('Logout realizado com sucesso.');
      
      // Redireciona após curto delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      setError('Erro ao realizar logout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={additionalStyles.mainContent}>
      <div className={additionalStyles.container}>
        <div className={additionalStyles.titleContainer}>
          <PageTitle title="Configurações" />
        </div>

        <div className={styles.section}>
          <button className={styles.logoutButton} onClick={handleLogout} disabled={loading}>
            {loading ? 'Saindo...' : 'Sair da Conta'}
          </button>

          {loading && <Loading />}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </main>
  );
}
