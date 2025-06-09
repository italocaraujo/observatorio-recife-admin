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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
              </div>
              <div className={styles.newsCardContent}>
                <p>{newsData.length}</p>
              </div>
            </div>
            <div className={styles.newsCard}>
              <div className={styles.newsCardHeader}>
                <h3>Notícias Ativas</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
              </div>
              <div className={styles.newsCardContent}>
                <p>
                  {newsData.filter(news => news.status === true).length}
                </p>
              </div>
            </div>
            <div className={styles.newsCard}>
              <div className={styles.newsCardHeader}>
                <h3>Notícias Inativas</h3>
                <svg width="24" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.iconInactive}>
                  <g id="inactive">
                    <path d="M13.6,23.9c-7.8,1-14.5-5.6-13.5-13.5c0.7-5.3,5-9.7,10.3-10.3c7.8-1,14.5,5.6,13.5,13.5C23.2,18.9,18.9,23.2,13.6,23.9z    M13.7,2.1C6.9,1,1,6.9,2.1,13.7c0.7,4.1,4,7.5,8.2,8.2C17.1,23,23,17.1,21.9,10.3C21.2,6.2,17.8,2.8,13.7,2.1z"/>
                    <polyline points="5.6,4.2 19.8,18.3 18.4,19.8 4.2,5.6  "/>
                  </g>
                </svg>
              </div>
              <div className={styles.newsCardContent}>
                <p>
                  {newsData.filter(news => news.status === false).length}
                </p>
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
