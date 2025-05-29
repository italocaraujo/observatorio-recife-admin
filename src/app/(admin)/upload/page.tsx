'use client';

import styles from "@/app/styles/upload/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import ParquetUploader from "@/components/upload/ParquetUploader";
import { useState } from "react";
import FileHistory from "@/components/upload/FileHistory";
// import styles from '@/app/styles/home/page.module.css';


export default function SendFiles() {
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTabChange = (tab: 'upload' | 'history') => {
    setActiveTab(tab);
    if (tab === 'history') {
      // Lógica para exibir o histórico
    }
  };

  return (
    <main className={additionalStyles.mainContent}>
      <div className={additionalStyles.container}>
        <div className={additionalStyles.titleContainer}>
          <div className={additionalStyles.title}>
            <h1>Upload</h1>
          </div>
        </div>

        <section className={styles.contentSectionUpload}>
          <div className={additionalStyles.tabButtons}>
            <div className={additionalStyles.buttonsTabContent}>
              <button 
                onClick={() => handleTabChange('upload')}
                className={activeTab === 'upload' ? additionalStyles.activeTab : additionalStyles.tabButton}
              >
                Upload
              </button>
              <button 
                onClick={() => handleTabChange('history')}
                className={activeTab === 'history' ? additionalStyles.activeTab : additionalStyles.tabButton}
              >
                Histórico
              </button>
            </div>
          </div>

          {successMessage && (
            <div className={additionalStyles.successMessage}>
              {successMessage}
            </div>
          )}

          {activeTab === 'upload' ? (
            <ParquetUploader />
          ) : (
            <FileHistory />
          )}
        </section>
      </div>
    </main>
  );
}
