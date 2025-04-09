export interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    link: string;
}

export const fetchNews = async (setNewsData: React.Dispatch<React.SetStateAction<NewsItem[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/newsData?timestamp=${Date.now()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`)}`,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro ao carregar notícias. Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Resposta da API não é um array');
    }

    setNewsData(data);
  } catch (err) {
    setError("Erro ao buscar notícias");
    console.error("Erro ao buscar notícias", err);
  } finally {
    setLoading(false);
  }
};

export const handleCreateNews = async (formData: FormData, setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>, setForceRefresh: React.Dispatch<React.SetStateAction<number>>) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/newsData`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`)}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar notícia');
    }

    setSuccessMessage("Notícia adicionada com sucesso!");
    setTimeout(() => {
      setSuccessMessage(null); // Limpa a mensagem após 3 segundos
    }, 3000);

    setForceRefresh(prev => prev + 1);
    
    return true;
  } catch (err) {
    console.error('Erro ao criar notícia:', err);
    setError(err instanceof Error ? err.message : 'Erro ao criar notícia');
    return false;
  }
};

export const handleDeleteNews = async (id: number, newsData: NewsItem[], setNewsData: React.Dispatch<React.SetStateAction<NewsItem[]>>, setForceRefresh: React.Dispatch<React.SetStateAction<number>>) => {
  const confirmed = window.confirm("Você tem certeza que deseja excluir essa notícia?");
  
  if (!confirmed) return false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/newsData/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`)}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir notícia');
    }

    setNewsData(prev => prev.filter(news => news.id !== id));
    setForceRefresh(prev => prev + 1);
    return true;
  } catch (err) {
    console.error('Erro ao excluir notícia:', err);
    return false;
  }
};

export const handleSave = (editedNews: NewsItem, newsData: NewsItem[], setNewsData: React.Dispatch<React.SetStateAction<NewsItem[]>>, setEditingNews: React.Dispatch<React.SetStateAction<NewsItem | null>>, setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>) => {
  const updatedNewsData = newsData.map(news => 
    news.id === editedNews.id ? editedNews : news
  );
  setNewsData(updatedNewsData);
  setEditingNews(null); // Fecha o modal após salvar
  setSuccessMessage('Notícia atualizada com sucesso!');
  setTimeout(() => {
    setSuccessMessage(null);
  }, 3000);
};
function setError(arg0: string) {
    throw new Error("Function not implemented.");
}

