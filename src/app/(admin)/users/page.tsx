"use client";

import { useEffect, useState } from "react";
import styles from "@/app/styles/users/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import UserTable from "@/components/users/UserTable";
import UserFormModal from "@/components/users/UserFormModal";
import { UserItem } from "@/@types/admin/User";
import { useSidebar } from "@/contexts/SidebarContext";
import { sidebarData } from "@/components/layout/SidebarData";
import { fetchUsers, deleteUser } from "@/@api/http/users/usersActions";

export default function Users() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserItem | null>(null);
  const { isOpen, toggleSidebar } = useSidebar();

  // Para forçar refresh (pode ser usado se necessário)
  const [forceRefresh, setForceRefresh] = useState<number>(0);

  useEffect(() => {
    fetchUsers(setUsers, setLoading, setError);
  }, [forceRefresh]);

  // Abre modal para editar usuário
  function handleEditUser(user: UserItem) {
    setUserToEdit(user);
    setIsModalOpen(true);
  }

  // Fecha o modal
  function closeModal() {
    setIsModalOpen(false);
    setUserToEdit(null);
  }

  // Atualiza a lista local após criar ou editar usuário
  const handleSaveUser = (user: UserItem) => {
    if (user.id) {
      // Editando usuário existente
      setUsers(prev =>
        prev.map(u => (u.id === user.id ? user : u))
      );
    } else {
      // Criando novo usuário (id gerado no backend, mas aqui temporariamente geramos com Date.now)
      const newUser = { ...user, id: Date.now() };
      setUsers(prev => [...prev, newUser]);
    }
    closeModal();
  };

  // Deleta usuário, atualiza lista local e pode forçar refresh se quiser
  const handleDeleteUser = async (id: number): Promise<boolean> => {
    const success = await deleteUser(id, setUsers, setError, setForceRefresh);
    if (success) {
      // Atualiza localmente a lista removendo o usuário excluído
      setUsers(prev => prev.filter(u => u.id !== id));
    }
    return success;
  };

  return (
    <div className={additionalStyles.container}>
      <div className={additionalStyles.contentContainer}>
        <div className={additionalStyles.titleContainer}>
          <div className={additionalStyles.title}>
            <button
              className={additionalStyles.hideSidebar}
              onClick={toggleSidebar}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
              </svg>
            </button>
            <h2>Gestão de Usuários</h2>
          </div>
          <div className={additionalStyles.buttonContent}>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.newUserButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" x2="19" y1="8" y2="14"></line>
                <line x1="22" x2="16" y1="11" y2="11"></line>
              </svg>
              Novo Usuário
            </button>
          </div>
        </div>

        <section className={styles.contentSectionUsers}>
          <UserTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onClose={closeModal}
          />

          {isModalOpen && (
            <UserFormModal
              user={userToEdit}
              onClose={closeModal}
              onSave={handleSaveUser}
              pages={sidebarData.map((item) => item.label)}
            />
          )}
        </section>
      </div>
    </div>
  );
}
