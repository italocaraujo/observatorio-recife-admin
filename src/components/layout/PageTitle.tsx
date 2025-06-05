'use client';

import styles from '@/app/styles/layout/PageTitle.module.css';
import { useSidebar } from "@/contexts/SidebarContext";

export default function PageTitle({ title }: { title: string }) {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <div className={styles.title}>
        <button
            className={styles.hideSidebar}
            onClick={toggleSidebar}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
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
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
            </svg>
        </button>
        <h1>{title}</h1>
        </div>
    );
}