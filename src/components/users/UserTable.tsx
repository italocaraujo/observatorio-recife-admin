import { User } from "@/@types/admin/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number | undefined) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Permissões</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.permissions.join(", ")}</td>
            <td>
              <button onClick={() => onEdit(user)}>Editar</button>
              <button onClick={() => onDelete(user.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}