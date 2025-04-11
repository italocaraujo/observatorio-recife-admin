import React, { useState, useEffect } from 'react';
import { handleSave } from '@/@api/http/news/newsActions';
import styles from '@/app/styles/news/CreateNews.module.css';

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
              <h1 className={styles.titleCreateNews}>Editar Notícia</h1>

              <form onSubmit={handleSubmit} className={styles.formCreateNews}>
                <div className={styles.inputContainer}>
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="link">Link</label>
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="image">Alterar Imagem</label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={onCancel} className={styles.resetButton}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitButton}>
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
