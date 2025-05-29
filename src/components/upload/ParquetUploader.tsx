'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/upload/ParquetUploader.module.css';

interface FileWithPreview extends File {
  preview?: string;
}

const ParquetUploader: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).filter(file =>
        file.name.endsWith('.parquet')
      );
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.name.endsWith('.parquet')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Arquivos enviados:', files);
    alert(`${files.length} arquivo(s) .parquet enviado(s) com sucesso!`);
    setFiles([]); // Limpa os arquivos após o envio
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📤 Enviar Arquivos Parquet</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        >
          <p className={styles.dropzoneText}>
            📁 Arraste e solte seus arquivos <strong>.parquet</strong> aqui ou clique para selecionar
          </p>
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              accept=".parquet"
              multiple
              onChange={handleFileChange}
              id="file-upload"
              className={styles.fileInput}
            />
            <label htmlFor="file-upload" className={styles.uploadButton}>
              🔍 Selecionar Arquivo(s)
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className={styles.fileListContainer}>
            <h3 className={styles.fileListTitle}>📄 Arquivos selecionados:</h3>
            <ul className={styles.fileList}>
              {files.map((file, index) => (
                <li key={index} className={styles.fileItem}>
                  <span className={styles.fileName}>
                    <span role="img" aria-label="file">📂</span> {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={styles.removeButton}
                  >
                    ❌ Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            disabled={files.length === 0}
            className={
              files.length > 0 ? styles.submitButton : styles.submitButtonDisabled
            }
          >
            Enviar Arquivos
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParquetUploader;