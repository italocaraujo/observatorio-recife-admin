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
    setFiles([]); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 12v6"></path><path d="m15 15-3-3-3 3"></path></svg>
          Novo Upload
        </h3>
        <p className={styles.subtitle}>Faça upload de arquivos Parquet para o sistema</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.dropzoneContainer}>
          <label htmlFor="file-upload" className={styles.dropzoneLabel}>Arquivo Parquet</label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
          > 
            <p className={styles.dropzoneText}>Arraste e solte arquivos aqui ou clique para selecionar</p>
            <input
              type="file"
              accept=".parquet"
              multiple
              onChange={handleFileChange}
              id="file-upload"
              className={styles.fileInput}
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className={styles.fileListContainer}>
            <h3 className={styles.fileListTitle}>Arquivos selecionados:</h3>
            <ul className={styles.fileList}>
              {files.map((file, index) => (
                <li key={index} className={styles.fileItem}>
                  <span className={styles.fileName}>
                    <span role="img" aria-label="file" className={styles.fileIcon}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.65 7C4.65 6.58579 4.31421 6.25 3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7H4.65ZM3.9 17.353L4.65 17.3539V17.353H3.9ZM4.36838 18.5168L4.90602 17.9939L4.90602 17.9939L4.36838 18.5168ZM5.50192 19L5.50099 19.75H5.50192V19ZM17.8981 19L17.8981 19.75L17.899 19.75L17.8981 19ZM19.0316 18.5168L18.494 17.9939L18.494 17.9939L19.0316 18.5168ZM19.5 17.353L18.75 17.353L18.75 17.3539L19.5 17.353ZM19.5 8.647L18.75 8.64611V8.647H19.5ZM19.0316 7.48322L18.494 8.00615L18.494 8.00615L19.0316 7.48322ZM17.8981 7L17.899 6.25H17.8981V7ZM12.2226 6.25C11.8084 6.25 11.4726 6.58579 11.4726 7C11.4726 7.41421 11.8084 7.75 12.2226 7.75V6.25ZM3.15 7C3.15 7.41421 3.48578 7.75 3.9 7.75C4.31421 7.75 4.65 7.41421 4.65 7H3.15ZM3.9 5.647L4.65 5.647L4.64999 5.64611L3.9 5.647ZM5.50192 4L5.50192 3.25L5.50099 3.25L5.50192 4ZM10.6207 4L10.6216 3.25H10.6207V4ZM12.2226 5.647L11.4726 5.64611V5.647H12.2226ZM11.4726 7C11.4726 7.41421 11.8084 7.75 12.2226 7.75C12.6368 7.75 12.9726 7.41421 12.9726 7H11.4726ZM3.9 6.25C3.48578 6.25 3.15 6.58579 3.15 7C3.15 7.41421 3.48578 7.75 3.9 7.75V6.25ZM12.2226 7.75C12.6368 7.75 12.9726 7.41421 12.9726 7C12.9726 6.58579 12.6368 6.25 12.2226 6.25V7.75ZM3.15 7V17.353H4.65V7H3.15ZM3.15 17.3521C3.14925 17.9813 3.39203 18.5886 3.83074 19.0397L4.90602 17.9939C4.74389 17.8272 4.64971 17.5973 4.64999 17.3539L3.15 17.3521ZM3.83074 19.0397C4.27008 19.4914 4.87049 19.7492 5.50099 19.75L5.50285 18.25C5.28261 18.2497 5.06751 18.1599 4.90602 17.9939L3.83074 19.0397ZM5.50192 19.75H17.8981V18.25H5.50192V19.75ZM17.899 19.75C18.5295 19.7492 19.1299 19.4914 19.5692 19.0397L18.494 17.9939C18.3325 18.1599 18.1174 18.2497 17.8971 18.25L17.899 19.75ZM19.5692 19.0397C20.008 18.5886 20.2507 17.9813 20.25 17.3521L18.75 17.3539C18.7503 17.5973 18.6561 17.8272 18.494 17.9939L19.5692 19.0397ZM20.25 17.353V8.647H18.75V17.353H20.25ZM20.25 8.64789C20.2507 8.01874 20.008 7.41136 19.5692 6.9603L18.494 8.00615C18.6561 8.17283 18.7503 8.4027 18.75 8.64611L20.25 8.64789ZM19.5692 6.9603C19.1299 6.5086 18.5295 6.25079 17.899 6.25L17.8971 7.75C18.1174 7.75027 18.3325 7.8401 18.494 8.00615L19.5692 6.9603ZM17.8981 6.25H12.2226V7.75H17.8981V6.25ZM4.65 7V5.647H3.15V7H4.65ZM4.64999 5.64611C4.64971 5.4027 4.74389 5.17283 4.90602 5.00615L3.83074 3.9603C3.39203 4.41136 3.14925 5.01874 3.15 5.64789L4.64999 5.64611ZM4.90602 5.00615C5.06751 4.8401 5.28261 4.75027 5.50285 4.75L5.50099 3.25C4.87048 3.25079 4.27008 3.5086 3.83074 3.9603L4.90602 5.00615ZM5.50192 4.75H10.6207V3.25H5.50192V4.75ZM10.6197 4.75C10.84 4.75027 11.0551 4.8401 11.2166 5.00615L12.2918 3.9603C11.8525 3.5086 11.2521 3.25079 10.6216 3.25L10.6197 4.75ZM11.2166 5.00615C11.3787 5.17283 11.4729 5.4027 11.4726 5.64611L12.9726 5.64789C12.9733 5.01874 12.7306 4.41136 12.2918 3.9603L11.2166 5.00615ZM11.4726 5.647V7H12.9726V5.647H11.4726ZM3.9 7.75H12.2226V6.25H3.9V7.75Z" fill="#000000"/>
                        <path d="M9.213 11.4764C8.92384 11.773 8.92985 12.2478 9.22642 12.537C9.523 12.8262 9.99784 12.8202 10.287 12.5236L9.213 11.4764ZM12.237 10.5236C12.5262 10.227 12.5202 9.75216 12.2236 9.463C11.927 9.17384 11.4522 9.17985 11.163 9.47642L12.237 10.5236ZM12.237 9.47642C11.9478 9.17985 11.473 9.17384 11.1764 9.463C10.8798 9.75216 10.8738 10.227 11.163 10.5236L12.237 9.47642ZM13.113 12.5236C13.4022 12.8202 13.877 12.8262 14.1736 12.537C14.4702 12.2478 14.4762 11.773 14.187 11.4764L13.113 12.5236ZM12.45 10C12.45 9.58579 12.1142 9.25 11.7 9.25C11.2858 9.25 10.95 9.58579 10.95 10H12.45ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM10.287 12.5236L12.237 10.5236L11.163 9.47642L9.213 11.4764L10.287 12.5236ZM11.163 10.5236L13.113 12.5236L14.187 11.4764L12.237 9.47642L11.163 10.5236ZM10.95 10V16H12.45V10H10.95Z" fill="#000000"/>
                      </svg>
                    </span> 
                    {file.name}
                    <p className={styles.fileSize}>
                      {file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : `${(file.size / 1024).toFixed(2)} KB`}
                    </p>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={styles.removeButton}
                  >
                    <svg viewBox="0 0 512 512" version="1.1">
                      <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                        <g id="add" transform="translate(134.248389, 134.248389)">
                          <path d="M213.333333,2.84217094e-14 L243.503223,30.1698893 L151.921,121.751 L243.503223,213.333333 L213.333333,243.503223 L121.751,151.921 L30.1698893,243.503223 L2.84217094e-14,213.333333 L91.582,121.751 L2.84217094e-14,30.1698893 L30.1698893,2.84217094e-14 L121.751,91.582 L213.333333,2.84217094e-14 Z" id="Combined-Shape"></path>
                        </g>
                      </g>
                    </svg>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                disabled={files.length === 0}
                className={styles.chooseDestinationButton}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.45" d="M12 17V19.38C12 21.25 11.25 22 9.37 22H4.62C2.75 22 2 21.25 2 19.38V14.63C2 12.75 2.75 12 4.62 12H7V14.37C7 16.25 7.75 17 9.62 17H12Z" fill="#0052D4"/>
                  <path opacity="0.7" d="M17 12V14.37C17 16.25 16.25 17 14.37 17H9.62C7.75 17 7 16.25 7 14.37V9.62C7 7.75 7.75 7 9.62 7H12V9.37C12 11.25 12.75 12 14.62 12H17Z" fill="#4364F7"/>
                  <path d="M22 4.62V9.37C22 11.25 21.25 12 19.37 12H14.62C12.75 12 12 11.25 12 9.37V4.62C12 2.75 12.75 2 14.62 2H19.37C21.25 2 22 2.75 22 4.62Z" fill="#2563eb"/>
                </svg>
                Escolher Destino
              </button>

              {/* <button
                type="submit"
                disabled={files.length === 0}
                className={styles.submitButton}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                Enviar
              </button> */}
            </div>
          </div>
          
        )}

       
      </form>
    </div>
  );
};

export default ParquetUploader;