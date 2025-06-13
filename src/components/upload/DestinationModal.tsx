'use client';

import styles from '@/app/styles/upload/DestinationModal.module.css';
import { DestinationOption, DestinationModalProps } from '@/@types/admin/Upload';
import { useState } from 'react';

const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedDestination,
  options,
  onReset,
  selectedSubDestination,
  onSelectSubDestination
}) => {
  const [localSelectedSub, setLocalSelectedSub] = useState<number | null>(null);
  const [showSubOptionError, setShowSubOptionError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedOption = options.find(opt => opt.id === selectedDestination);
    
    if (!selectedOption) {
      console.error('Nenhuma opção selecionada');
      return;
    }

    if (selectedOption.subOptions && selectedOption.subOptions.length > 0 && !localSelectedSub) {
      setShowSubOptionError(true);
      return;
    }

    setShowSubOptionError(false);
    
    const subOptionName = selectedOption.subOptions?.find(sub => sub.id === localSelectedSub)?.name || '';
    alert(`Destino selecionado: ${selectedOption.name}${subOptionName ? ` > ${subOptionName}` : ''}`);
    
    onReset();
    onClose();
    setLocalSelectedSub(null);
  };

  const handleSelectOption = (id: number) => {
    onSelect(id);
    setLocalSelectedSub(null);
    setShowSubOptionError(false);
  };

  const handleSelectSubOption = (id: number) => {
    setLocalSelectedSub(id);
    setShowSubOptionError(false);
  };

  const selectedOptionData = options.find(opt => opt.id === selectedDestination);
  const hasSubOptions = selectedOptionData?.subOptions && selectedOptionData.subOptions.length > 0;

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
              onClick={() => handleSelectOption(option.id)}
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

        {selectedDestination && hasSubOptions &&  (
          <div className={styles.subOptionsContainer}>
            <h2 className={styles.modalTitle}>Selecione a subcategoria</h2>
            {showSubOptionError && (
              <p className={styles.errorMessage}>Por favor, selecione uma subcategoria</p>
            )}
            <div className={styles.subOptionsGrid}>
              {selectedOptionData.subOptions?.map((subOption) => (
                <div
                  key={subOption.id}
                  className={`${styles.optionCard} ${localSelectedSub === subOption.id ? styles.selected : ''}`}
                  onClick={() => handleSelectSubOption(subOption.id)}
                >
                  <div className={styles.optionText}>
                    <h4 className={styles.subOptionName}>{subOption.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
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