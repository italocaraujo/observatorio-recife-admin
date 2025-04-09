import React, { useState } from 'react';
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
  onEdit?: (news: NewsItem) => void;
}

const NewsList: React.FC<NewsListProps> = ({ 
  newsData, 
  onDelete,
  onEdit 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtra as notícias com base no título ou descrição
  const filteredNews = newsData.filter((news) => {
    return (
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Validação de dados
  if (!Array.isArray(newsData)) {
    return (
      <div className={styles.errorMessage}>
        Erro: Dados inválidos. Esperado array de notícias.
      </div>
    );
  }

  const sortedNews = [...filteredNews].sort((a, b) => b.id - a.id);

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
      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <svg width="24px" height="24px" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.49 19l-5.73-5.73C15.53 12.2 16 10.91 16 9.5A6.5 6.5 0 1 0 9.5 16c1.41 0 2.7-.47 3.77-1.24L19 20.49 20.49 19zM5 9.5C5 7.01 7.01 5 9.5 5S14 7.01 14 9.5 11.99 14 9.5 14 5 11.99 5 9.5z"></path>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Pesquisar notícias..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

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
                    onClick={() => onEdit(news)}
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
