'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/home/HeadBar.module.css'; // Importando os estilos

const Headbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Verifica se o localStorage contém uma preferência de tema
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
      
      // Aplica o tema no body, baseado no localStorage
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode); // Atualiza o estado corretamente
    // Altera a classe 'dark-mode' no body
    document.body.classList.toggle('dark-mode', newMode);
    // Atualiza o localStorage para persistir a preferência de tema
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (isDarkMode === null) {
    return null; // Ou um componente de carregamento, enquanto o estado é decidido
  }

  return (
    <header className={styles.headbar}>
      <div className={styles.icons}>
        <button className={styles.iconButton} onClick={toggleDarkMode} aria-label="Modo Claro/Escuro">
          {isDarkMode ? (
            <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="M255.996,127.577c-70.925,0-128.42,57.495-128.42,128.42c0,70.933,57.496,128.428,128.42,128.428   s128.428-57.495,128.428-128.428C384.424,185.072,326.921,127.577,255.996,127.577z"/>
                <path d="M512,255.996c-78.109-49.042-98.052-93.51-75.065-180.932c-87.414,22.995-131.89,3.036-180.939-75.057   c-49.042,78.093-93.51,98.052-180.932,75.057C98.06,162.487,78.109,206.954,0,255.996c78.109,49.049,98.06,93.525,75.065,180.939   c87.422-22.987,131.89-3.036,180.932,75.057c49.049-78.093,93.525-98.044,180.939-75.057   C413.948,349.522,433.891,305.046,512,255.996z M255.996,423.766c-92.666,0-167.762-75.112-167.762-167.77   c0-92.65,75.096-167.762,167.762-167.762c92.65,0,167.769,75.112,167.769,167.762C423.766,348.654,348.646,423.766,255.996,423.766   z"/>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5287 15.9294C21.3687 15.6594 20.9187 15.2394 19.7987 15.4394C19.1787 15.5494 18.5487 15.5994 17.9187 15.5694C15.5887 15.4694 13.4787 14.3994 12.0087 12.7494C10.7087 11.2994 9.90873 9.40938 9.89873 7.36938C9.89873 6.22938 10.1187 5.12938 10.5687 4.08938C11.0087 3.07938 10.6987 2.54938 10.4787 2.32938C10.2487 2.09938 9.70873 1.77938 8.64873 2.21938C4.55873 3.93938 2.02873 8.03938 2.32873 12.4294C2.62873 16.5594 5.52873 20.0894 9.36873 21.4194C10.2887 21.7394 11.2587 21.9294 12.2587 21.9694C12.4187 21.9794 12.5787 21.9894 12.7387 21.9894C16.0887 21.9894 19.2287 20.4094 21.2087 17.7194C21.8787 16.7894 21.6987 16.1994 21.5287 15.9294Z"/>
            </svg>
          )}
        </button>

        <button className={styles.iconButton} aria-label="Notificações">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M640 832a128 128 0 0 1-256 0h256zm192-64H134.4a38.4 38.4 0 0 1 0-76.8H192V448c0-154.88 110.08-284.16 256.32-313.6a64 64 0 1 1 127.36 0A320.128 320.128 00 0 1 832 448v243.2h57.6a38.4 38.4 0 0 1 0 76.8H832z"/>
          </svg>
        </button>

        <button className={styles.iconButton} aria-label="Foto do Usuário">
          <img 
            src="/images/assets/user_8742495.png" 
            alt="Usuário" 
            className={styles.userPhoto}
          />
        </button>
      </div>
    </header>
  );
};

export default Headbar;
