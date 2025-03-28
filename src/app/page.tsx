'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/home/page.module.css';
import Sidebar from '../../component/home/Sidebar';
import HeadBar from '../../component/home/HeadBar';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');  // Redireciona para o login se não estiver autenticado
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Sidebar/>
      <HeadBar/>
    </div>
  );
}
