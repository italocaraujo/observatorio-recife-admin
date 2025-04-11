import React, { useState, useEffect } from 'react';
import { handleSave } from '@/@api/http/news/newsActions';
import styles from '@/app/styles/news/EditNews.module.css';
import additionalStyles from '@/app/styles/news/CreateNews.module.css';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

interface EditNewsProps {
  newsToEdit: NewsItem;
  onSave: (editedNews: NewsItem, imageFile: File | null) => void;
  onCancel: () => void;
  isOpen: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setForceRefresh: React.Dispatch<React.SetStateAction<number>>;
}

const EditNews: React.FC<EditNewsProps> = ({ newsToEdit, onCancel, isOpen, setError, setSuccessMessage, setForceRefresh, }) => {
  const [formData, setFormData] = useState<NewsItem>(newsToEdit);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setFormData(newsToEdit);
  }, [newsToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(
      formData, 
      [],  
      () => {},  
      () => {},
      () => {},  
      setError,  
      imageFile,
      setForceRefresh
    ).then(() => {
      onCancel();
      
      setSuccessMessage('Notícia alterada com sucesso!');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }).catch((err) => {
      console.error('Erro ao salvar a notícia:', err);
      setError('Erro ao salvar a notícia');
    });
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h1 className={styles.titleCreateNews}>Editar Notícia</h1>
                <button className={styles.closeButtonX} onClick={onCancel}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className={additionalStyles.formCreateNews}>
                <div className={additionalStyles.inputContainer}>
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className={additionalStyles.inputContainer}>
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className={additionalStyles.inputContainer}>
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className={additionalStyles.inputContainer}>
                  <label htmlFor="link">Link</label>
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={handleChange}
                  />
                </div>

                <div className={additionalStyles.inputImageContainer}>
                  <label htmlFor="image">Alterar Imagem</label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                  />
                </div>

                <div className={additionalStyles.formActions}>
                  <button type="button" onClick={onCancel} className={additionalStyles.resetButton}>
                    Cancelar
                  </button>
                  <button type="submit" className={additionalStyles.submitButton}>
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNews;
