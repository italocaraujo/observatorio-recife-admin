import styles from "@/app/styles/users/UserFormModal.module.css";

interface Props {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function ConfirmDeleteModal({
    message,
    onConfirm,
    onCancel,
  }: Props) {
    return (
      <div className={styles.modal}>
        <form className={styles.form}>
          <p className={styles.title}>{message}</p>
          <div className={styles.buttons}>
            <button className={styles.saveButton} onClick={onConfirm}>Sim</button>
            <button className={styles.cancelButton} onClick={onCancel}>Não</button>
          </div>
        </form>
      </div>
    );
  }