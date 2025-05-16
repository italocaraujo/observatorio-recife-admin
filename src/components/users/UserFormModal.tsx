// app/admin/users/components/UserFormModal.tsx
import { useState } from "react";
import { User } from "@/@types/admin/User";

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const PERMISSION_OPTIONS = ["dashboard", "settings", "users", "reports"];

export default function UserFormModal({ user, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<User>(
    user || {
      name: "",
      email: "",
      permissions: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    if (name === "permissions" && e.target instanceof HTMLSelectElement) {
      // Agora garantimos que é um select
      const options = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, permissions: options });
    } else if (type === "text" || type === "email") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{user ? "Editar Usuário" : "Novo Usuário"}</h2>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Permissões:
          <select
            name="permissions"
            multiple
            value={formData.permissions}
            onChange={handleChange}
          >
            {PERMISSION_OPTIONS.map((perm) => (
              <option key={perm} value={perm}>
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}