import { User } from "@/@types/admin/User";
import styles from "@/app/styles/users/UserTable.module.css";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number | undefined) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Permissões</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.noData}>
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className={styles.row}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.permissions.join(", ")}</td>
                <td className={styles.actions}>
                  <button onClick={() => onEdit(user)} className={styles.editButton}>
                    Editar
                  </button>
                  <button onClick={() => onDelete(user.id)} className={styles.deleteButton}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}