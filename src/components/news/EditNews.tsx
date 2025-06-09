import React, { useState, useEffect } from 'react';
import { handleSave } from '@/@api/http/news/newsActions';
import styles from '@/app/styles/news/EditNews.module.css';
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import { NewsItem } from "@/@types/admin/News";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    const handleStatusChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      status: checked,
    }));
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
                <div className={styles.titleContainer}>
                  <h2 className={styles.title}>Editar Notícia</h2>
                  <p className={styles.subtitle}>Atualize as informações da notícia.</p>
                </div>

                <button 
                  className={styles.buttonClose} 
                  onClick={onCancel}
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 512 512" version="1.1">
                    <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                      <g id="add" transform="translate(134.248389, 134.248389)">
                        <path d="M213.333333,2.84217094e-14 L243.503223,30.1698893 L151.921,121.751 L243.503223,213.333333 L213.333333,243.503223 L121.751,151.921 L30.1698893,243.503223 L2.84217094e-14,213.333333 L91.582,121.751 L2.84217094e-14,30.1698893 L30.1698893,2.84217094e-14 L121.751,91.582 L213.333333,2.84217094e-14 Z" id="Combined-Shape"></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.formEditNews}>
                <div className={styles.inputContainer}>
                  <label htmlFor="title">Título</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={additionalStyles.input}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={additionalStyles.input}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={additionalStyles.input}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="link">Link</label>
                  <input
                    type="url"
                    id="link"
                    value={formData.link}
                    onChange={handleChange}
                    className={additionalStyles.input}
                  />
                </div>

                <div className={styles.inputImageContainer}>
                  <label htmlFor="image" className={styles.labelImage}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 984.6 984.6">
                      <g>
                        <path d="M984.6,580.149c0-46.899-38.1-85-85-85c-46.899,0-85,38.101-85,85V812.75c0,0.6-0.5,1.1-1.1,1.1H171.1   c-0.6,0-1.1-0.5-1.1-1.1V580.149c0-46.899-38.1-85-85-85c-46.9,0-85,38.101-85,85V812.75c0.1,94.3,76.8,171.1,171.1,171.1h642.4   c94.3,0,171.1-76.7,171.1-171.1V580.149L984.6,580.149z"/>
                        <path d="M729.7,25.65c-33.2-33.2-87-33.2-120.2,0c-33.2,33.2-33.2,87,0,120.2l46.2,46.2H547.5c-39.9,0-78.601,7.9-115.3,23.4   c-35.2,15-66.801,36.3-94,63.5c-27.2,27.2-48.5,58.8-63.5,94c-15.5,36.6-23.4,75.4-23.4,115.2v107.1c0,46.899,38.1,85,85,85   c46.9,0,85-38.101,85-85v-107c0-33.5,13.2-65.101,37.2-89.101c24-24,55.6-37.2,89.1-37.2h106.9l-44.9,44.9   c-33.2,33.2-33.2,87,0,120.2c16.601,16.6,38.4,24.9,60.101,24.9c21.699,0,43.5-8.301,60.1-24.9l190.7-190.7   c33.2-33.2,33.2-87,0-120.2L729.7,25.65z"/>
                      </g>
                    </svg>
                    Alterar Imagem
                  </label>
                  <div className={styles.imageUploadWrapper}>
                    <label className={styles.imageUploadLabel}>
                      <span>{formData.image || "Nenhum imagem anexada"}</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className={styles.imageInput}
                    />
                  </div>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>
                    Status
                  </label>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={formData.status}
                      onChange={e => handleStatusChange(e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>


                <div className={additionalStyles.buttonContainer}>
                  <button type="button" onClick={onCancel} className={additionalStyles.strokeButton}>
                    Cancelar
                  </button>
                  <button type="submit" className={additionalStyles.fillButton}>
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
