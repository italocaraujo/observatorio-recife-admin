import React from 'react';
import styles from '@/app/styles/news/NewsList.module.css';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

interface NewsListProps {
  newsData: NewsItem[];
  onDelete: (id: number) => Promise<boolean>;
  onEdit?: (id: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({ 
  newsData, 
  onDelete,
  onEdit 
}) => {
  // Validação de dados
  if (!Array.isArray(newsData)) {
    return (
      <div className={styles.errorMessage}>
        Erro: Dados inválidos. Esperado array de notícias.
      </div>
    );
  }

  const sortedNews = [...newsData].sort((a, b) => b.id - a.id);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Erro ao excluir notícia:', error);
      }
    }
  };

  return (
    <div className={styles.newsContainer}>
      {sortedNews.length === 0 ? (
        <div className={styles.emptyMessage}>
          Nenhuma notícia encontrada.
        </div>
      ) : (
        <ul className={styles.newsList}>
          {sortedNews.map((news) => (
            <li key={news.id} className={styles.newsItem}>
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsDate}>{news.date}</p>
                <p className={styles.newsDescription}>{news.description}</p>
                
                {news.image && (
                  <div className={styles.newsImageContainer}>
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className={styles.newsImage}
                      loading="lazy"
                    />
                  </div>
                )}

                {news.link && (
                  <a 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.newsLink}
                  >
                    Ver notícia original
                  </a>
                )}
              </div>

              <div className={styles.newsActions}>
                {onEdit && (
                  <button 
                    onClick={() => onEdit(news.id)}
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(news.id)}
                  className={styles.deleteButton}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsList;