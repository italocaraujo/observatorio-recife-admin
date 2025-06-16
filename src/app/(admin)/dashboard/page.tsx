'use client';

import styles from "@/app/styles/upload/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import { useEffect, useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import { NewsItem } from "@/@types/admin/News";
import { fetchNews } from "@/@api/http/news/newsActions";
import { fetchUsers } from "@/@api/http/users/usersActions";
import { UserItem } from "@/@types/admin/User";
import Loading from "@/components/layout/Loading";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [forceRefresh, setForceRefresh] = useState<number>(0);
  const [users, setUsers] = useState<UserItem[]>([]);
  
  useEffect(() => {
    fetchNews(setNewsData, setLoading, setError);
    fetchUsers(setUsers, setLoading, setError);
  }, [forceRefresh]);

  const usersActive = users.filter(user => user.status);
  const usersActiveLength = usersActive.length;

  if (loading) {
    return (
      <Loading message="Carregando dados..." />
    );
  }

  return (
    <main className={additionalStyles.mainContent}>
      <div className={additionalStyles.container}>
        <div className={additionalStyles.titleContainer}>
          <PageTitle title="Dashboard" />
          <div className={additionalStyles.buttonContent}>
            <button
              className={additionalStyles.newButton}
            >
              Gerar Relatório
            </button>
          </div>
        </div>

        <section className={styles.contentSectionDashboard}>
          <section className={additionalStyles.cardsContainer}>
            <div className={additionalStyles.card}>
              <div className={additionalStyles.cardHeader}>
                <h3>Uploads Realizados</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 12v6"></path><path d="m15 15-3-3-3 3"></path></svg>
              </div>
              <div className={additionalStyles.cardContent}>
                <p>NaN</p>
              </div>
            </div>
            <div className={additionalStyles.card}>
              <div className={additionalStyles.cardHeader}>
                <h3>Usuários Ativos</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className={additionalStyles.cardContent}>
                <p>
                  {usersActiveLength}
                </p>
              </div>
            </div>
            <div className={additionalStyles.card}>
              <div className={additionalStyles.cardHeader}>
                <h3>Notícias Ativas</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
              </div>
              <div className={additionalStyles.cardContent}>
                <p>
                  {newsData.filter(news => news.status === true).length}
                </p>
              </div>
            </div>
            
          </section>
        </section>
      </div>
    </main>
  );
}
