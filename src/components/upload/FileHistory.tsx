'use client';

import React from 'react';
import styles from '@/app/styles/upload/FileHistory.module.css';

interface UploadHistoryItem {
  id: number;
  files: string[];
  totalSize: number; 
  date: Date;
}

const FileHistory: React.FC = () => {
  // Dados simulados (mock)
  const mockHistory: UploadHistoryItem[] = [
    {
      id: 1,
      files: ['dados_2024.parquet', 'relatorio_final.parquet'],
      totalSize: 1024 * 1024 * 3.5, 
      date: new Date('2024-10-15T10:30:00'),
    },
    {
      id: 2,
      files: ['backup.parquet'],
      totalSize: 1024 * 1024 * 1.2, 
      date: new Date('2024-10-14T16:45:00'),
    },
    {
      id: 3,
      files: ['dados_antigos.parquet', 'teste.parquet', 'exportacao.parquet'],
      totalSize: 1024 * 1024 * 7.8,
      date: new Date('2024-10-12T09:15:00'),
    },
  ];

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeader}>
        <h2 className={styles.historyTitle}>Histórico de Uploads</h2>
        <p className={styles.historyDescription}> Acompanhe todos os uploads realizados no sistema</p>
      </div>

      <div className={styles.historyContent}>
        {mockHistory.length === 0 ? (
          <p className={styles.emptyText}>Nenhum envio realizado ainda.</p>
        ) : (
          <ul className={styles.historyList}>
            {mockHistory.map((item) => (
              <li key={item.id} className={styles.historyItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.dateBadge}>
                    {item.date.toLocaleDateString()}{' '}
                    <span className={styles.time}>{item.date.toLocaleTimeString()}</span>
                  </span>
                </div>

                <ul className={styles.fileList}>
                  {item.files.map((file, index) => (
                    <li key={index} className={styles.fileName}>
                      {file}
                    </li>
                  ))}
                </ul>

                <div className={styles.itemFooter}>
                  <span className={styles.totalSize}>
                    Total: {formatBytes(item.totalSize)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileHistory;