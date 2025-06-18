'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/app/styles/layout/Sidebar.module.css';
import ObsAdmin from '../ui/logo';

interface SidebarProps {
  links: { href: string; label: string; icon: React.ReactNode }[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ links, isOpen, toggleSidebar }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (window.innerWidth < 768) {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
          if (isOpen) toggleSidebar();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const isActiveLink = (href: string) => (pathname === href ? styles.activeLink : '');

  return (
    <aside  className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} ref={sidebarRef}>
        <div className={styles.sidebarContent}>
          <div className={styles.logoContainer}>
            <div className={styles.logoSubContainer}>
              <div className={styles.logoAdminObs}>
                <ObsAdmin />
              </div>
            </div>
          </div>

          <button 
            className={styles.toggleButtonClose} 
            onClick={toggleSidebar}
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

          <section className={styles.menuSection}>
            <nav className={styles.nav}>
              <p className={styles.menuTitle}>Menu Principal</p>
              <div className={styles.menuContainer}>
                <ul className={styles.menu}>
                  {links.map(({ href, label, icon }) => (
                    <li key={href}>
                      <a href={href} className={isActiveLink(href)}>
                        {icon}
                        <span className={styles.menuLabel}>{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className={styles.divider}>
              <nav className={styles.nav}>
                <div className={styles.menuContainer}>
                  <ul className={styles.menu}>
                    <li key="/settings">
                      <a href="/settings" className={isActiveLink("/settings")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <span className={styles.menuLabel}>Configurações</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </section>
        </div>

        <button className={styles.toggleButtonOpen} onClick={toggleSidebar}>
          {isOpen ? 
          '' 
          : 
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18H10" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 12L16 12" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 6L20 6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          }
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;