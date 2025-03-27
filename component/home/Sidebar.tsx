'use client'; // Adiciona a diretiva 'use client' para o Next.js 13

import { useState, useEffect, useRef } from 'react';
import styles from '@/app/styles/home/Sidebar.module.css'; // Caminho para o CSS da Sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Ref para a sidebar

  // Função para alternar a sidebar no mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Função para fechar a sidebar ao clicar fora dela
  const handleClickOutside = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsOpen(false); // Fecha a sidebar se o clique for fora dela
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Adiciona o listener de clique fora

    // Remove o event listener ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Apenas no primeiro render

  return (
    <div>
      {/* Sidebar fixa para desktop e móvel */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} ref={sidebarRef}>
        <nav className={styles.nav}>
          <ul>
            <li><a href="/">Página Inicial</a></li>
            <li><a href="/sobre">Usuários</a></li>
            <li><a href="/serviços">Notícias</a></li>
            <li><a href="/contato">Segurança</a></li>
          </ul>
        </nav>
      </div>

      {/* Botão para abrir a sidebar apenas em dispositivos móveis */}
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? 'Fechar' : 'Abrir'}
      </button>
    </div>
  );
};

export default Sidebar;
