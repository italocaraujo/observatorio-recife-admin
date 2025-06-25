import { UserItem } from "@/@types/admin/User";

const getAuthToken = () => {
  return localStorage.getItem("token") || "";
}

export const fetchUsers = async (
  setUsersData: React.Dispatch<React.SetStateAction<UserItem[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setLoading(true);
  setError(null);

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/usersData?timestamp=${Date.now()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro ao carregar usuários. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Resposta da API não é um array');
    }

    setUsersData(data);
  } catch (err) {
    setError("Erro ao buscar usuários");
    console.error("Erro ao buscar usuários", err);
  } finally {
    setLoading(false);
  }
};

export const createUser = async (
  userData: Omit<UserItem, "id" | "status">,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setForceRefresh: React.Dispatch<React.SetStateAction<number>>
): Promise<UserItem | null> => {
  setError(null);

  try {
    const token = getAuthToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Erro ao criar usuário. Status: ${response.status}`);
    }

    setForceRefresh((prev) => prev + 1);
    const createdUser: UserItem = await response.json();
    return createdUser;
  } catch (error: any) {
    setError(error.message || "Erro ao criar usuário");
    console.error("Erro ao criar usuário", error);
    return null;
  }
};

export const deleteUser = async (
  id: number,
  setUsersData: React.Dispatch<React.SetStateAction<UserItem[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setForceRefresh: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/usersData/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir usuário");
    }

    setUsersData((prev) => prev.filter((users) => users.id !== id));
    setForceRefresh((prev) => prev + 1);

    return true;
  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    return false;
  }
};

export const editUser = async (
  id: number,
  userData: Omit<UserItem, "id" | "status">,
  setUsersData: React.Dispatch<React.SetStateAction<UserItem[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setForceRefresh: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/usersData/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao editar usuário");
    }

    const updatedUser = await response.json();

    setUsersData((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
    setForceRefresh((prev) => prev + 1);
    return true;
  } catch (err) {
    console.error("Erro ao editar usuário:", err);
    setError(err instanceof Error ? err.message : "Erro desconhecido ao editar usuário");
    return false;
  }
};
