import React, { useState, useRef, useEffect } from 'react';
import styles from '@/app/styles/users/UserFormModal.module.css';

interface SelectFunctionProps {
  selectedFunction: string;
  onSelect: (selectedFunction: string) => void;
}

function SelectFunction({ selectedFunction, onSelect }: SelectFunctionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: string[] = ['Administrador', 'Editor', 'Visualizador'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleDropdown() {
    setIsOpen(prev => !prev);
  }

  function selectOption(option: string) {
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className={styles.inputContainer} ref={dropdownRef}>
      <label className={styles.label}>Função</label>
      <button
        type="button"
        className={styles.buttonFunctionUser}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedFunction ? '' : styles.placeholderButton}>
          {selectedFunction || 'Selecione uma função'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdownList} role="listbox">
          {options.map((option: string) => (
            <li
              key={option}
              className={styles.dropdownOption}
              role="option"
              aria-selected={selectedFunction === option}
              onClick={() => selectOption(option)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  selectOption(option);
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectFunction;
