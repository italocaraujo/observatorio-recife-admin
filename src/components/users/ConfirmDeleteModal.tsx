import styles from "@/app/styles/users/UserFormModal.module.css";

interface Props {
  message: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ConfirmDeleteModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div className={styles.modal}>
      <form className={styles.form}>
        <p className={styles.title}>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={onConfirm} type="button">Sim</button>
          <button className={styles.cancelButton} onClick={onCancel} type="button">Não</button>
        </div>
      </form>
    </div>
  );
}
