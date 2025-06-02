"use client";

import { useEffect, useState } from "react";
import styles from "@/app/styles/users/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import UserTable from "@/components/users/UserTable";
import UserFormModal from "@/components/users/UserFormModal";
import ConfirmDeleteModal from "@/components/users/ConfirmDeleteModal";
import { UserItem } from "@/@types/admin/User";
import { useSidebar } from "@/contexts/SidebarContext";
import { sidebarData } from "@/components/layout/SidebarData";
import { fetchUsers } from "@/@api/http/users/usersActions";

interface Props {
  user: UserItem | null;
  onClose: () => void;
  onSave: (user: UserItem) => void;
}


export default function Users() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserItem | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const { isOpen, toggleSidebar } = useSidebar();
  const [forceRefresh, setForceRefresh] = useState<number>(0);

  useEffect(() => {
    fetchUsers(setUsers, setLoading, setError);
  }, [forceRefresh]);

  const handleSaveUser = (user: UserItem) => {
    if (user.id) {
      // Editando
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? user : u))
      );
    } else {
      // Criando novo
      const newUser = { ...user, id: Date.now() };
      setUsers((prev) => [...prev, newUser]);
    }
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleDeleteUser = () => {
    if (userToDelete !== null) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
      setUserToDelete(null);
    }
  };


  return (
    <div className={additionalStyles.container}>
      <div className={additionalStyles.contentContainer}>
        <div className={additionalStyles.titleContainer}>
          <div className={additionalStyles.title}>
            <button className={additionalStyles.hideSidebar} onClick={toggleSidebar} aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path></svg>
            </button>
            <h2>Gestão de Usuários</h2>
          </div>
          <div className={additionalStyles.buttonContent}>
            <button onClick={() => setIsModalOpen(true)} className={styles.newUserButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
              Novo Usuário
            </button>
          </div>
        </div>

        <section className={styles.contentSectionUsers}>

          <UserTable
          users={users}
          onEdit={(user) => {
            setUserToEdit(user);
            setIsModalOpen(true);
          }}
          onDelete={(id) => setUserToDelete(id ?? null)}
          />

          {isModalOpen && (
            <UserFormModal
              user={userToEdit}
              onClose={() => {
                setIsModalOpen(false);
                setUserToEdit(null);
              } }
              onSave={handleSaveUser} 
              pages={sidebarData.map((item) => item.label)}            
              />
          )}

          {userToDelete !== null && (
            <ConfirmDeleteModal
              message="Tem certeza que deseja excluir este usuário?"
              onConfirm={handleDeleteUser}
              onCancel={() => setUserToDelete(null)}
            />
          )}
        </section>
      </div>
    </div>
  );
}