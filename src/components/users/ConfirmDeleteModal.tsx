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
      <div className="modal">
        <p>{message}</p>
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onCancel}>Não</button>
      </div>
    );
  }