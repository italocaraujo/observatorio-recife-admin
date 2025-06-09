'use client';

import styles from "@/app/styles/upload/page.module.css";
import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
import ParquetUploader from "@/components/upload/ParquetUploader";
import { useState } from "react";
import FileHistory from "@/components/upload/FileHistory";
import PageTitle from "@/components/layout/PageTitle";

export default function SendFiles() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <main className={additionalStyles.mainContent}>
      <div className={additionalStyles.container}>
        <div className={additionalStyles.titleContainer}>
          <PageTitle title="Upload de Arquivos" />
        </div>

        <section className={styles.contentSectionUpload}>
          {successMessage && (
            <div className={additionalStyles.successMessage}>
              {successMessage}
            </div>
          )}
          <section className={styles.uploadSection}>
            <ParquetUploader />
          </section>

          <section className={styles.historySection}>
            <FileHistory />
          </section>
        </section>
      </div>
    </main>
  );
}
