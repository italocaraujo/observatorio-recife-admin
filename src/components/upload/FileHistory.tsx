'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/upload/FileHistory.module.css';

interface UploadHistoryItem {
  id: number;
  files: string[];
  totalSize: number; 
  date: Date;
}

const FileHistory: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<UploadHistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mockHistory: UploadHistoryItem[] = [
    // {
    //   id: 1,
    //   files: ['dados_2024.parquet', 'relatorio_final.parquet'],
    //   totalSize: 1024 * 1024 * 3.5, 
    //   date: new Date('2024-10-15T10:30:00'),
    // },
    // {
    //   id: 2,
    //   files: ['backup.parquet'],
    //   totalSize: 1024 * 1024 * 1.2, 
    //   date: new Date('2024-10-14T16:45:00'),
    // },
    // {
    //   id: 3,
    //   files: ['dados_antigos.parquet', 'teste.parquet', 'exportacao.parquet'],
    //   totalSize: 1024 * 1024 * 7.8,
    //   date: new Date('2024-10-12T09:15:00'),
    // },
  ];

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDetailsClick = (item: UploadHistoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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
                <div className={styles.itemContent}>
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
                </div>

                <div className={styles.detailsButtonContainer}>
                  <button className={styles.detailsButton} onClick={() => handleDetailsClick(item)}>
                    Detalhes
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            
            <section className={styles.modalContainer}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Detalhes do Upload</h2>
                <p className={styles.modalDescription}>Informações detalhadas sobre o arquivo enviado</p>
              </div>
              
              <section className={styles.modalBody}>
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Data e Hora:</h4>
                  <p className={styles.modalFile}>
                    {selectedItem.date.toLocaleDateString()} {' '}
                    {selectedItem.date.toLocaleTimeString()}
                  </p>
                </div>
                
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Arquivos:</h4>
                  <ul className={styles.modalFileList}>
                    {selectedItem.files.map((file, index) => (
                      <li key={index} className={styles.modalFileName}>
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Tamanho Total:</h4>
                  <p className={styles.modalFile}>{formatBytes(selectedItem.totalSize)}</p>
                </div>
                
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Quantidade de Arquivos:</h4>
                  <p className={styles.modalFile}>{selectedItem.files.length}</p>
                </div>
              </section>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileHistory;