import { useState } from "react";
import styles from "@/app/styles/users/UserFilter.module.css";
import { UserFilterType } from "@/@types/admin/UserFilter";

interface Props {
  onFilterChange: (filter: UserFilterType) => void;
}

export default function UserFilter({ onFilterChange }: Props) {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<boolean | null>(null);

  const applyFilter = () => {
    onFilterChange({
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      role: role.trim() || undefined,
      status: status === null ? undefined : status,
    });
  };

  const resetFilter = () => {
    setName("");
    setEmail("");
    setRole("");
    setStatus(null);
    onFilterChange({});
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Filtrar Usuários</h3>

      <div className={styles.filterFields}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Função"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          value={status === null ? "" : status ? "true" : "false"}
          onChange={(e) =>
            setStatus(
              e.target.value === ""
                ? null
                : e.target.value === "true"
            )
          }
        >
          <option value="">Todos os status</option>
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>

      <div className={styles.buttons}>
        <button onClick={applyFilter} className={styles.applyButton}>
          Aplicar Filtro
        </button>
        <button onClick={resetFilter} className={styles.resetButton}>
          Limpar
        </button>
      </div>
    </div>
  );
}