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

  // Fetch news data when the page loads or when forceRefresh changes
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
          <PageTitle title="Notícias" />
          <div className={additionalStyles.buttonContent}>
            <button
              onClick={() => setIsModalOpen(true)}  // Open modal for creating news
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
          

          {/* NewsList component to display list of news */}
          <NewsList 
            newsData={newsData} 
            onDelete={(id) => handleDeleteNews(id, newsData, setNewsData, setForceRefresh)}
            onEdit={(news) => setEditingNews(news)} 
          />
        </section>
      </div>

      {/* EditNews component for editing news */}
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
