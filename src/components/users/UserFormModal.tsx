import { useState } from "react";
import { User } from "@/@types/admin/User";
import styles from "@/app/styles/users/UserFormModal.module.css";

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
  pages: string[];
}

export default function UserFormModal({ user, onClose, onSave, pages }: Props) {
  const [formData, setFormData] = useState<User>(
    user ?? { name: "", email: "", permissions: [] }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "permissions" && type === "checkbox") {
      const permissions = checked
        ? [...formData.permissions, value]
        : formData.permissions.filter((p) => p !== value);

      setFormData({ ...formData, permissions });
      return;
    }

    if (type === "text" || type === "email") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{user ? "Editar Usuário" : "Criar Novo Usuário"}</h2>
          <p className={styles.subtitle}>{user ? "Atualize as informações e permissões do usuário." : "Adicione um novo usuário ao sistema e defina suas permissões."}</p>
        </div>

        <button 
          className={styles.buttonClose} 
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 512 512" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
              <g id="add" transform="translate(134.248389, 134.248389)">
                <path d="M213.333333,2.84217094e-14 L243.503223,30.1698893 L151.921,121.751 L243.503223,213.333333 L213.333333,243.503223 L121.751,151.921 L30.1698893,243.503223 L2.84217094e-14,213.333333 L91.582,121.751 L2.84217094e-14,30.1698893 L30.1698893,2.84217094e-14 L121.751,91.582 L213.333333,2.84217094e-14 Z" id="Combined-Shape"></path>
              </g>
            </g>
          </svg>
        </button>

        <div className={styles.formFields}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Nome
            </label>
            <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Email
            </label>
            <input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Função
            </label>
            <button type="button" className={styles.buttonFunctionUser}>
              <span className={styles.placeholderButton}>Selecione uma função</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
          </div>

          <div className={styles.inputContainer} style={{ alignItems: "flex-start" }}>
            <label className={styles.label}>
              Permissões
            </label>
            <div className={styles.checkboxContainer}>
              {pages.map((page, index) => (
                <div key={index} className={styles.checkbox} >
                  <button className={styles.checkboxButton}></button>
                  <label className={styles.checkboxLabel}>{page}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
          <button type="submit" className={styles.saveButton}>{user ? "Salvar" : "Criar Usuário"}</button>
        </div>
      </form>
    </div>
  );
}
