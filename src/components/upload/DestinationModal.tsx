'use client';

import styles from '@/app/styles/upload/DestinationModal.module.css';
import { DestinationOption, DestinationModalProps } from '@/@types/admin/Upload';

const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedDestination,
  options,
  onReset
}) => {
    if (!isOpen) return null;
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Destino selecionado: ${selectedDestination}`);
        onReset();
        onClose();
    };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Selecione o Destino</h2>
            <p className={styles.modalDescription}>Selecione o destino para onde deseja enviar os arquivos.</p>
        </div>
        
        
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.optionCard} ${selectedDestination === option.id ? styles.selected : ''}`}
              onClick={() => onSelect(option.id)}
            >
              <div className={styles.optionIcon}>{option.icon}</div>
              <div className={styles.optionText}>
                <h4 className={styles.optionName}>{option.name}</h4>
              </div>
              {selectedDestination === option.id && (
                <div className={styles.selectedIndicator}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.modalFooter}>
            <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                Enviar
            </button> 
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;