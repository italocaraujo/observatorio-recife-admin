import { UserItem } from "@/@types/admin/User"

function setError(_arg0: string) {
  throw new Error("Function not implemented.");
}

export const fetchUsers = async (setUsersData: React.Dispatch<React.SetStateAction<UserItem[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/usersData?timestamp=${Date.now()}`, {
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

    setUsersData(data);
  } catch (err) {
    setError("Erro ao buscar notícias");
    console.error("Erro ao buscar notícias", err);
  } finally {
    setLoading(false);
  }
};