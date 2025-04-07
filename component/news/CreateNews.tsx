import React, { useState } from "react";
import styles from "@/app/styles/news/CreateNews.module.css";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

interface CreateNewsProps {
  handleCreateNews: (formData: FormData) => Promise<boolean>;
  onSuccess: () => void;
}

const CreateNews: React.FC<CreateNewsProps> = ({ handleCreateNews, onSuccess }) => {
  const [formData, setFormData] = useState<Omit<NewsItem, 'id'>>({
    title: "",
    description: "",
    image: "",
    date: "",
    link: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file.name }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
  
    if (!formData.title || !formData.description || !formData.date || !formData.link || !imageFile) {
      setError("Todos os campos são obrigatórios, incluindo a imagem");
      return;
    }

    // Criação do FormData
    const formDataToSend = new FormData();
    formDataToSend.append('news', JSON.stringify(formData));  // Adiciona os dados da notícia
    formDataToSend.append('image', imageFile);  // Adiciona a imagem

    try {
      const success = await handleCreateNews(formDataToSend);  // Passando o FormData para a função

      if (success) {
        setSuccessMessage("Notícia adicionada com sucesso!");
        onSuccess();
        resetForm();
        setFormData({
          title: '',
          description: '',
          image: '',
          date: '',
          link: ''
        });
        setImageFile(null);

        // Limpa a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000); // Mensagem desaparecerá após 3 segundos
      } else {
        throw new Error("Falha ao criar notícia");
      }
    } catch (err) {
      console.error("Erro ao criar notícia:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido ao criar notícia");
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      date: "",
      link: ""
    });
    setImagePreview(null);
  };

  return (
    <div className={styles.createNewsContainer}>
      <h1 className={styles.titleCreateNews}>Adicionar Nova Notícia</h1>
      <form onSubmit={handleSubmit} className={styles.formCreateNews}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Título*</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="description">Descrição*</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            maxLength={500}
          />
        </div>

        <div className={styles.inputImageContainer}>
          <label htmlFor="image">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 984.6 984.6">
              <g>
                <path d="M984.6,580.149c0-46.899-38.1-85-85-85c-46.899,0-85,38.101-85,85V812.75c0,0.6-0.5,1.1-1.1,1.1H171.1   c-0.6,0-1.1-0.5-1.1-1.1V580.149c0-46.899-38.1-85-85-85c-46.9,0-85,38.101-85,85V812.75c0.1,94.3,76.8,171.1,171.1,171.1h642.4   c94.3,0,171.1-76.7,171.1-171.1V580.149L984.6,580.149z"/>
                <path d="M729.7,25.65c-33.2-33.2-87-33.2-120.2,0c-33.2,33.2-33.2,87,0,120.2l46.2,46.2H547.5c-39.9,0-78.601,7.9-115.3,23.4   c-35.2,15-66.801,36.3-94,63.5c-27.2,27.2-48.5,58.8-63.5,94c-15.5,36.6-23.4,75.4-23.4,115.2v107.1c0,46.899,38.1,85,85,85   c46.9,0,85-38.101,85-85v-107c0-33.5,13.2-65.101,37.2-89.101c24-24,55.6-37.2,89.1-37.2h106.9l-44.9,44.9   c-33.2,33.2-33.2,87,0,120.2c16.601,16.6,38.4,24.9,60.101,24.9c21.699,0,43.5-8.301,60.1-24.9l190.7-190.7   c33.2-33.2,33.2-87,0-120.2L729.7,25.65z"/>
              </g>
            </svg>
            Escolha sua imagem*
          </label>
          <div className={styles.imageUploadWrapper}>
            <label className={styles.imageUploadLabel}>
              <span>{formData.image || "Nenhum imagem anexada"}</span>
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              required
              accept="image/*"
              className={styles.imageInput}
            />
          </div>
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
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
            pattern="https?://.*"
            placeholder="https://exemplo.com"
          />
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={resetForm}
            className={styles.resetButton}
            disabled={loading}
          >
            Limpar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Adicionando...
              </>
            ) : "Adicionar Notícia"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
