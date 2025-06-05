import { useState, useEffect } from "react";
import { UserItem } from "@/@types/admin/User";
import styles from "@/app/styles/users/UserFormModal.module.css";
import SelectFunction from "./SelectFunction";

interface Props {
  isOpen: boolean;
  user: UserItem | null;
  onClose: () => void;
  onSave: (user: UserItem) => void;
  pages: string[];
}

export default function UserFormModal({ user, onClose, onSave, pages }: Props) {
  const isEditing = Boolean(user);

  const userWithDefaults = user
  ? { ...user, permissions: user.permissions ?? [], status: user.status ?? true }
  : null;
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<UserItem>(
    userWithDefaults ?? {
    name: "",
    email: "",
    permissions: [],
    user: "",
    password: "",
    role: "",
    status: true,
    id: 0,
  }
  );

  const handleStatusChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      status: checked,
    }));
  };

  const handleFunctionChange = (selectedFunction: string) => {
    setFormData(prev => ({ ...prev, role: selectedFunction }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "permissions") {
      setFormData(prev => {
        let newPermissions = [...prev.permissions];

        if (checked) {
          if (!newPermissions.includes(value)) {
            newPermissions.push(value);
          }
        } else {
          newPermissions = newPermissions.filter(p => p !== value);
        }

        return { ...prev, permissions: newPermissions };
      });
      return;
    }

    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const userToSend = {
      name: formData.name,
      user: formData.user, 
      email: formData.email,
      role: formData.role,
      password: formData.password,
      permissions: formData.permissions,
      status: formData.status,
      id: formData.id, 
    };

    try {
      onSave(userToSend);
    } catch (error) {
      alert("Erro ao salvar usuário: " + (error as Error).message);
    }
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
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {isEditing && (
            <div className={styles.inputContainer}>
              <label className={styles.label}>Nome de Usuário</label>
              <input
                className={styles.input}
                type="text"
                name="user"
                value={formData.user}
                readOnly
              />
            </div>
          )}

          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <SelectFunction
            selectedFunction={formData.role}
            onSelect={handleFunctionChange}
          />

          <div className={styles.inputContainer} style={{ alignItems: "flex-start" }}>
            <label className={styles.label}>Permissões</label>
            <div className={styles.checkboxContainer}>
              {pages.map((page, index) => (
                <div key={index} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id={`perm-${index}`}
                    name="permissions"
                    value={page}
                    checked={formData.permissions.includes(page)}
                    onChange={handleChange}
                    className={styles.checkboxButton}
                  />
                  <label htmlFor={`perm-${index}`} className={styles.checkboxLabel}>
                    {page}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className={styles.togglePasswordButton}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? 
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> :
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            </button>
          </div>

          {isEditing && (
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Status
              </label>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={formData.status}
                  onChange={e => handleStatusChange(e.target.checked)}
                />
                <span className={styles.slider}></span>
            </label>
            </div>
          )}
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveButton}>
            {user ? "Salvar" : "Criar Usuário"}
          </button>
        </div>
      </form>
    </div>
  );
}
