'use client';

import styles from '@/app/styles/upload/DestinationModal.module.css';
import { DestinationOption, DestinationModalProps, SubOption } from '@/@types/admin/Upload';
import { useState } from 'react';

const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedDestination,
  options,
  onReset,
}) => {
  const [selectedSubOptions, setSelectedSubOptions] = useState<number[]>([]);
  const [showSubOptionError, setShowSubOptionError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedOption = options.find(opt => opt.id === selectedDestination);
    
    if (!selectedOption) {
      console.error('Nenhuma opção selecionada');
      return;
    }

    // Verifica se todas as subopções necessárias foram selecionadas
    const hasUnselectedRequiredSubOptions = checkRequiredSubOptions(selectedOption);
    if (hasUnselectedRequiredSubOptions) {
      setShowSubOptionError(true);
      return;
    }

    setShowSubOptionError(false);
    
    const selectedPath = getSelectedPath();
    alert(`Destino selecionado: ${selectedPath}`);
    
    onReset();
    onClose();
    setSelectedSubOptions([]);
  };

  const checkRequiredSubOptions = (option: DestinationOption): boolean => {
    let currentOptions: any = option;
    for (let i = 0; i < selectedSubOptions.length; i++) {
      const subId = selectedSubOptions[i];
      currentOptions = currentOptions.subOptions?.find((sub: any) => sub.id === subId);
      if (!currentOptions) break;
    }
    
    return currentOptions?.subOptions?.length > 0;
  };

  const getSelectedPath = (): string => {
    let path = '';
    let currentOption = options.find(opt => opt.id === selectedDestination);
    
    if (!currentOption) return '';
    
    path = currentOption.name;
    let currentSubOptions = [...selectedSubOptions];
    
    while (currentSubOptions.length > 0 && currentOption) {
      const subId = currentSubOptions.shift();
      const subOption = currentOption.subOptions?.find(sub => sub.id === subId);
      
      if (subOption) {
        path += ` > ${subOption.name}`;
        currentOption = subOption as any;
      }
    }
    
    return path;
  };

  const handleSelectOption = (id: number) => {
    onSelect(id);
    setSelectedSubOptions([]);
    setShowSubOptionError(false);
  };

  const handleSelectSubOption = (id: number, level: number) => {
    const newSelectedSubOptions = [...selectedSubOptions];
    newSelectedSubOptions[level] = id;
    newSelectedSubOptions.length = level + 1;
    setSelectedSubOptions(newSelectedSubOptions);
    setShowSubOptionError(false);
  };

  const selectedOptionData = options.find(opt => opt.id === selectedDestination);

  const renderSubOptions = (parentOptions: SubOption[] | undefined, level: number) => {
    if (!parentOptions || parentOptions.length === 0) return null;

    const currentSelection = selectedSubOptions[level];

    return (
      <div className={styles.subOptionsContainer} key={`sub-level-${level}`}>
        <h3 className={styles.subOptionsTitle}>
          {level === 0 ? 'Selecione a subcategoria' : 'Selecione a categoria'}
        </h3>
        
        {showSubOptionError && level === selectedSubOptions.length && (
          <p className={styles.errorMessage}>Por favor, selecione uma opção</p>
        )}

        <div className={styles.subOptionsGrid}>
          {parentOptions.map((subOption) => (
            <div
              key={subOption.id}
              className={`${styles.optionCard} ${currentSelection === subOption.id ? styles.selected : ''}`}
              onClick={() => handleSelectSubOption(subOption.id, level)}
            >
              <div className={styles.subOptionText}>
                <h4 className={styles.subOptionName}>{subOption.name}</h4>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    );
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

        {selectedDestination && selectedOptionData?.subOptions && (
          <>
            {renderSubOptions(selectedOptionData.subOptions, 0)}
            
            {selectedSubOptions.length >= 1 && (
              renderSubOptions(
                selectedOptionData.subOptions
                  .find(sub => sub.id === selectedSubOptions[0])?.subOptions,
                1
              )
            )}
          </>
        )}
        
        <div className={styles.modalFooter}>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
            Enviar
          </button> 
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;