'use client';

import styles from "@/app/styles/upload/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import ParquetUploader from "@/components/upload/ParquetUploader";
import { useState } from "react";
import FileHistory from "@/components/upload/FileHistory";
import PageTitle from "@/components/layout/PageTitle";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

        </section>
      </div>
    </main>
  );
}
