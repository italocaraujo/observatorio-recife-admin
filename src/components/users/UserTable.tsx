import { UserItem } from "@/@types/admin/User";
import styles from "@/app/styles/users/UserTable.module.css";
import { useState, useEffect } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface Props {
  users: UserItem[];
  onClose: () => void;
  onEdit: (user: UserItem) => void;
  onDelete: (id: number) => Promise<boolean>; 
}

export default function UserTable({ users, onEdit, onDelete, onClose }: Props) {
  const [usersData, setUsersData] = useState<UserItem[]>(users);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);

  // Sincroniza o estado local se a props users mudar
  useEffect(() => {
    setUsersData(users);
  }, [users]);

  function openConfirmDelete(user: UserItem) {
    setUserToDelete(user);
    setShowConfirmDelete(true);
  }

  function closeConfirmDelete() {
    setUserToDelete(null);
    setShowConfirmDelete(false);
  }

  async function handleConfirmDelete() {
    if (!userToDelete) return;

    try {
      const success = await onDelete(userToDelete.id);

      if (success) {
        setUsersData(prev => prev.filter(u => u.id !== userToDelete.id));
        closeConfirmDelete();
      } else {
        alert("Erro ao excluir usuário");
      }
    } catch (err) {
      alert("Erro inesperado ao excluir usuário");
      console.error(err);
    }
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Usuários do Sistema</h3>
        <p className={styles.tableDescription}>Gerencie usuários e suas permissões no sistema</p>
      </div>
      <div className={styles.tableContent}>
        <div className={styles.tableWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>User</th>
                <th>Email</th>
                <th>Função</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {usersData.length === 0 ? (
                <tr className={styles.rowNoData}>
                  <td colSpan={6} className={styles.noData}>
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                usersData.map((user, index) => (
                  <tr key={user.id} className={`${styles.row} ${index === usersData.length - 1 ? styles.lastRow : ''}`}>
                    <td>{user.name}</td>
                    <td>{user.user}</td>
                    <td>{user.email}</td>
                    <td>
                      <div
                        className={`${styles.tag} ${
                          user.function === 'Administrador'
                            ? styles.admin
                            : user.function === 'Editor'
                            ? styles.edit
                            : user.function === 'Visualizador'
                            ? styles.viewer
                            : ''
                        }`}
                      >
                        {user.function}
                      </div>
                    </td>
                    <td>
                      <div className={`${styles.tag} ${user.status ? styles.active : styles.inactive}`}>
                        {user.status ? 'Ativo' : 'Inativo'}
                      </div>
                    </td>
                    <td className={styles.actions}>
                      <button onClick={() => onEdit(user)} className={styles.editButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
                      </button>
                      <button onClick={() => openConfirmDelete(user)} className={styles.deleteButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirmDelete && userToDelete && (
        <ConfirmDeleteModal
          message={`Você tem certeza que deseja excluir o usuário "${userToDelete.name}"?`}
          onConfirm={e => {
            e.preventDefault();
            handleConfirmDelete();
          }}
          onCancel={e => {
            e.preventDefault();
            closeConfirmDelete();
          }}
        />
      )}
    </div>
  );
}
