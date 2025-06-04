"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import styles from "@/app/styles/users/UserTable.module.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import UserFilter from "@/components/users/UserFilter";
import { UserItem } from "@/@types/admin/User";
import { UserFilterType } from "@/@types/admin/UserFilter";

interface Props {
  users: UserItem[];
  onEdit: (user: UserItem) => void;
  onDelete: (id: number) => Promise<boolean>;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [filter, setFilter] = useState<UserFilterType>({});
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Se o filtro estiver aberto e o clique for fora do filtro E fora do botão
      if (
        showFilter &&
        filterRef.current &&
        !filterRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (filter.name && !user.name.toLowerCase().includes(filter.name.toLowerCase())) return false;
      if (filter.email && !user.email.toLowerCase().includes(filter.email.toLowerCase())) return false;
      if (filter.role && !user.role.toLowerCase().includes(filter.role.toLowerCase())) return false;
      if (filter.status !== undefined && filter.status !== null && user.status !== filter.status) return false;

      return true;
    });
  }, [users, filter]);

  function openConfirmDelete(user: UserItem) {
    setUserToDelete(user);
    setShowConfirmDelete(true);
  }

  function closeConfirmDelete() {
    setUserToDelete(null);
    setShowConfirmDelete(false);
  }

  async function handleConfirmDelete(e: React.FormEvent) {
    e.preventDefault();

    if (!userToDelete) return;

    try {
      const success = await onDelete(userToDelete.id);

      if (success) {
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
        <div className={styles.tableTitleContainer}>
          <h3 className={styles.tableTitle}>Usuários do Sistema</h3>
          <p className={styles.tableDescription}>Gerencie usuários e suas permissões no sistema</p>
        </div>

        <div className={styles.filterControl}>
          <button
            ref={buttonRef}
            className={styles.filterToggleButton}
            onClick={() => setShowFilter((prev) => !prev)}
            type="button"
            aria-expanded={showFilter}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>{showFilter ? "Esconder Filtros" : "Mostrar Filtros"}</span>
          </button>

          {showFilter && (
            <div className={styles.filterWrapper} ref={filterRef}>
              <UserFilter onFilterChange={setFilter} />
            </div>
          )}
        </div>

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
              {filteredUsers.length === 0 ? (
                <tr className={styles.rowNoData}>
                  <td colSpan={6} className={styles.noData}>
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={`${styles.row} ${filteredUsers.indexOf(user) === filteredUsers.length - 1 ? styles.lastRow : ''}`}>
                    <td>{user.name}</td>
                    <td>{user.user}</td>
                    <td>{user.email}</td>
                    <td>
                      <div
                        className={`${styles.tag} ${
                          user.role === 'Administrador'
                            ? styles.admin
                            : user.role === 'Editor'
                            ? styles.edit
                            : user.role === 'Visualizador'
                            ? styles.viewer
                            : ''
                        }`}
                      >
                        {user.role}
                      </div>
                    </td>
                    <td>
                      <div className={`${styles.tag} ${user.status ? styles.active : styles.inactive}`}>
                        {user.status ? 'Ativo' : 'Inativo'}
                      </div>
                    </td>
                    <td className={styles.actions}>
                      <button onClick={() => onEdit(user)} className={styles.editButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                        </svg>
                      </button>
                      <button onClick={() => openConfirmDelete(user)} className={styles.deleteButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
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
          onConfirm={(e) => {
            e.preventDefault();
            handleConfirmDelete(e);
          }}
          onCancel={(e) => {
            e.preventDefault();
            closeConfirmDelete();
          }}
        />
      )}
    </div>
  );
}