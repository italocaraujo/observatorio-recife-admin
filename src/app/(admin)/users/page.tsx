"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "@/app/styles/users/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import UserTable from "@/components/users/UserTable";
import UserFormModal from "@/components/users/UserFormModal";
import { UserCreate, UserItem } from "@/@types/admin/User";
import { sidebarData } from "@/components/layout/SidebarData";
import { fetchUsers, deleteUser, editUser, createUser } from "@/@api/http/users/usersActions";
import { UserFilterType } from "@/@types/admin/UserFilter";
import PageTitle from "@/components/layout/PageTitle";

export default function Users() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserItem | null>(null);
  const [forceRefresh, setForceRefresh] = useState<number>(0);
  const [filter, setFilter] = useState<UserFilterType>({});


  useEffect(() => {
    fetchUsers(setUsers, setLoading, setError);
  }, [forceRefresh]);

  function handleEditUser(user: UserItem) {
    setUserToEdit(user);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setUserToEdit(null);
  }

  const filteredUsers = useMemo(() => {
  return users.filter((user) => {
    if (filter.name && !user.name.toLowerCase().includes(filter.name.toLowerCase())) {
      return false;
    }

    if (filter.email && !user.email.toLowerCase().includes(filter.email.toLowerCase())) {
      return false;
    }

    if (filter.role && !user.role.toLowerCase().includes(filter.role.toLowerCase())) {
      return false;
    }

    if (filter.status !== undefined && filter.status !== null && user.status !== filter.status) {
      return false;
    }

    return true;
  });
}, [users, filter]);

const handleSaveUser = async (userData: Omit<UserItem, "id"> & { id?: number }) => {
  try {
    if (!userData.name || !userData.email || !userData.role) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    let success: boolean = false;

    if ('id' in userData && typeof userData.id === 'number' && !isNaN(userData.id) && userData.id > 0) {
      success = await editUser(
        userData.id,
        userData,
        setUsers,
        setError,
        setForceRefresh
      );
    } else {
      const createdUser = await createUser(userData as UserCreate, setError, setForceRefresh);
      success = createdUser !== null;
    }

    if (success) {
      closeModal();
    }
  } catch (err) {
    console.error('Erro ao salvar usuário:', err);
    setError(err instanceof Error ? err.message : 'Erro ao salvar usuário');
  }
};

  const handleDeleteUser = async (id: number): Promise<boolean> => {
    const success = await deleteUser(id, setUsers, setError, setForceRefresh);
    if (success) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
    return success;
  };

  return (
    <div className={additionalStyles.container}>
      <div className={additionalStyles.contentContainer}>
        <div className={additionalStyles.titleContainer}>
          <PageTitle title="Usuários" />
          <div className={additionalStyles.buttonContent}>
            <button
              onClick={() => setIsModalOpen(true)}
              className={additionalStyles.newButton}
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
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />

          {isModalOpen && (
            <UserFormModal
              isOpen={isModalOpen}
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
