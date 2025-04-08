import React, { useState, useEffect } from 'react';
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
  onSave: (editedNews: NewsItem) => void;
  onCancel: () => void;
  isOpen: boolean;  // Controle para abrir ou fechar o modal
}

const EditNews: React.FC<EditNewsProps> = ({ newsToEdit, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState<NewsItem>(newsToEdit);

  useEffect(() => {
    setFormData(newsToEdit); // Preenche os campos com os dados da notícia
  }, [newsToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Chama a função de salvar com os dados atualizados
  };

  return (
    <>
      {/* Modal Wrapper */}
      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <h1 className={styles.titleCreateNews}>Editar Notícia</h1>

              <form onSubmit={handleSubmit} className={styles.formCreateNews}>
                <div className={styles.inputContainer}>
                  <label htmlFor="title">Título*</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="description">Descrição*</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="date">Data*</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="link">Link*</label>
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
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
