'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/news/page.module.css';
import CreateNews from '../../../../component/news/CreateNews';
import NewsList from '../../../../component/news/NewsList';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

export default function News() {
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add state for success message
  const [forceRefresh, setForceRefresh] = useState<number>(0);

  const handleTabChange = (tab: 'create' | 'view') => {
    setActiveTab(tab);
    if (tab === 'view') {
      fetchNews();
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/newsData?timestamp=${Date.now()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`)}`,
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Erro ao carregar notícias. Status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Resposta da API não é um array');
      }

      setNewsData(data);
    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar notícias');
      
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setNewsData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [forceRefresh]);

  const handleCreateNews = async (formData: FormData): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/newsData`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`)}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar notícia');
      }

      // Mensagem de sucesso após criação
      setSuccessMessage("Notícia adicionada com sucesso!");
      setTimeout(() => {
        setSuccessMessage(null); // Limpa a mensagem após 3 segundos
      }, 3000);

      // Atualiza o estado de força de atualização
      setForceRefresh(prev => prev + 1);
      
      return true;
    } catch (err) {
      console.error('Erro ao criar notícia:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar notícia');
      return false;
    }
  };

  const handleDeleteNews = async (id: number) => {
    const confirmed = window.confirm("Você tem certeza que deseja excluir essa notícia?");
    
    if (!confirmed) return false;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/newsData/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir notícia');
      }

      setNewsData(prev => prev.filter(news => news.id !== id));
      setForceRefresh(prev => prev + 1);
      return true;
    } catch (err) {
      console.error('Erro ao excluir notícia:', err);
      setError(err instanceof Error ? err.message : 'Erro ao excluir notícia');
      return false;
    }
  };

  if (error && error.includes('Failed to fetch')) {
    return (
      <div className={styles.errorContainer}>
        <h2>Backend offline</h2>
        <p>Não foi possível conectar ao servidor. Verifique se o backend está rodando.</p>
        <button onClick={() => setForceRefresh(prev => prev + 1)}>Tentar novamente</button>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <h1>Notícias</h1>
          </div>
        </div>

        <section className={styles.contentSectionNews}>
          <div className={styles.tabButtons}>
            <div className={styles.buttonsTabContent}>
              <button 
                onClick={() => handleTabChange('create')}
                className={activeTab === 'create' ? styles.activeTab : ''}
              >
                Criar Notícia
              </button>
              <button 
                onClick={() => handleTabChange('view')}
                className={activeTab === 'view' ? styles.activeTab : ''}
              >
                Visualizar Notícias
              </button>
            </div>
          </div>

          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}

          {activeTab === 'create' ? (
            <CreateNews 
              handleCreateNews={handleCreateNews} 
              onSuccess={() => setForceRefresh(prev => prev + 1)} 
            />
          ) : (
            <NewsList 
              newsData={newsData} 
              onDelete={handleDeleteNews}
            />
          )}
        </section>
      </div>
    </div>
  );
}
