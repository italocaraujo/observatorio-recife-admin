"use client";

import React, { useState, useEffect } from "react";
import { NewsItem, fetchNews, handleCreateNews, handleDeleteNews, handleSave } from "@/@api/http/news/newsActions";
import CreateNews from "@/components/news/CreateNews";
import NewsList from "@/components/news/NewsList";
import EditNews from "@/components/news/EditNews";
import styles from '@/app/styles/news/page.module.css';
import additionalStyles from '@/app/styles/layout/LayoutPage.module.css';


export default function News() {
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [forceRefresh, setForceRefresh] = useState<number>(0);

  const handleTabChange = (tab: 'create' | 'view') => {
    setActiveTab(tab);
    if (tab === 'view') {
      fetchNews(setNewsData, setLoading, setError);
    }
  };

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
          <div className={additionalStyles.title}>
            <h1>Notícias</h1>
          </div>
        </div>

        <section className={styles.contentSectionNews}>
          <div className={styles.tabButtons}>
            <div className={styles.buttonsTabContent}>
              <button 
                onClick={() => handleTabChange('create')}
                className={activeTab === 'create' ? styles.activeTab : styles.tabButton}
              >
                Criar Notícia
              </button>
              <button 
                onClick={() => handleTabChange('view')}
                className={activeTab === 'view' ? styles.activeTab : styles.tabButton}
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
              handleCreateNews={(formData) => handleCreateNews(formData, setSuccessMessage, setForceRefresh)} 
              onSuccess={() => {}}/>
          ) : (
            <NewsList 
              newsData={newsData} 
              onDelete={(id) => handleDeleteNews(id, newsData, setNewsData, setForceRefresh)}
              onEdit={(news) => setEditingNews(news)} 
            />
          )}
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
