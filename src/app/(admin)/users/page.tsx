"use client";

import { useState } from "react";
import styles from "@/app/styles/users/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import UserTable from "@/components/users/UserTable";
import UserFormModal from "@/components/users/UserFormModal";
import ConfirmDeleteModal from "@/components/users/ConfirmDeleteModal";
import { User } from "@/@types/admin/User";

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      permissions: ["dashboard", "settings"],
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria@example.com",
      permissions: ["dashboard"],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleSaveUser = (user: User) => {
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
            <h1>Usuários</h1>
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)}>Novo Usuário</button>

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
            }}
            onSave={handleSaveUser}
          />
        )}

        {userToDelete !== null && (
          <ConfirmDeleteModal
            message="Tem certeza que deseja excluir este usuário?"
            onConfirm={handleDeleteUser}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </div>
    </div>
  );
}