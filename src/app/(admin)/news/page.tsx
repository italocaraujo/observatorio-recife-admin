"use client";

import React, { useState, useEffect } from "react";
import { NewsItem } from "@/@types/admin/News";
import { fetchNews, handleCreateNews, handleDeleteNews, handleSave } from "@/@api/http/news/newsActions";
import CreateNews from "@/components/news/CreateNews";
import NewsList from "@/components/news/NewsList";
import EditNews from "@/components/news/EditNews";
import styles from '@/app/styles/news/page.module.css';
import additionalStyles from '@/app/styles/layout/LayoutPage.module.css';
import PageTitle from "@/components/layout/PageTitle";

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [forceRefresh, setForceRefresh] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNews(setNewsData, setLoading, setError);
  }, [forceRefresh]);

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  const getYearFromDate = (dateString: string) => {
    if (dateString === "--") return null; // Tratando dados inválidos

    // Exemplo de data: "19 de Janeiro de 2025"
    const dateParts = dateString.split(" ");
    const year = dateParts[2]; // O ano está na posição 2 do array após o split (ex: "2025")
    return parseInt(year, 10); // Retorna o ano como número inteiro
  };

  // Obtendo o ano atual
  const currentYear = new Date().getFullYear();

  // Filtrando as notícias do ano atual
  const newsThisYear = newsData.filter(news => {
    const newsYear = getYearFromDate(news.date);
    return newsYear === currentYear;
  });


  return (
    <div className={additionalStyles.container}>
      <div className={additionalStyles.contentContainer}>
        <div className={additionalStyles.titleContainer}>
          <PageTitle title="Gestão de Notícias" />
          <div className={additionalStyles.buttonContent}>
            <button
              onClick={() => setIsModalOpen(true)} 
              className={additionalStyles.newButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Nova Notícia
            </button>
          </div>
        </div> 

        <section className={styles.contentSectionNews}>
          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}
          {isModalOpen && (
            <div className={styles.modalContainer}>
              <CreateNews 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleCreateNews={(formData) => handleCreateNews(formData, setSuccessMessage, setForceRefresh)} 
                onSuccess={() => setIsModalOpen(false)}
              />
            </div>
          )}

          <section className={styles.newsCardsContainer}>
            <div className={styles.newsCard}>
              <div className={styles.newsCardHeader}>
                <h3>Total de Notícias</h3>
                
              </div>
              <div className={styles.newsCardContent}>
                <span>{newsData.length}</span>
              </div>
            </div>
          </section>

          <section className={styles.newsList}>
            <div className={styles.newsListHeader}>
              <h3>Notícias</h3>
              <p>Gerencie todas as notícias do sistema</p>
            </div>
            <div className={styles.newsListContainer}>
              <NewsList 
                newsData={newsData} 
                onDelete={(id) => handleDeleteNews(id, newsData, setNewsData, setForceRefresh)}
                onEdit={(news) => setEditingNews(news)} 
              />
            </div>
          </section>
        </section>
      </div>

      {editingNews && (
        <EditNews
          newsToEdit={editingNews!}
          onSave={(editedNews, imageFile) => handleSave(editedNews, newsData, setNewsData, setEditingNews, setSuccessMessage, setError, imageFile, setForceRefresh)}
          onCancel={() => setEditingNews(null)}
          isOpen={!!editingNews}
          setError={setError}
          setSuccessMessage={setSuccessMessage} 
          setForceRefresh={setForceRefresh}
        />
      )}
    </div>
  );
}
