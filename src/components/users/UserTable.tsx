import { User } from "@/@types/admin/User";
import styles from "@/app/styles/users/UserTable.module.css";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number | undefined) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Usuários do Sistema
        </h3>
        <p className={styles.tableDescription}>Gerencie usuários e suas permissões no sistema</p>
      </div>
      <div className={styles.tableContent}>
        <div className={styles.tableWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Função</th>
                <th>Status</th>
                <th>Último Login</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id} className={`${styles.row} ${index === users.length - 1 ? styles.lastRow : ''}`}>
                    <td>{user.name}</td>
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
                      <div className={`${styles.tag} ${user.status === 'Ativo' ? styles.active : styles.inactive}`}>
                        {user.status}
                      </div>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td className={styles.actions}>
                      <button onClick={() => onEdit(user)} className={styles.editButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
                      </button>
                      <button onClick={() => onDelete(user.id)} className={styles.deleteButton}>
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
    </div>
  );
}