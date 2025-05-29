'use client';

import additionalStyles from "@/app/styles/layout/LayoutPage.module.css";
// import styles from '@/app/styles/home/page.module.css';

export default function Home() {
  return (
        <div className={additionalStyles.container}>
          <div className={additionalStyles.titleContainer}>
            <div className={additionalStyles.title}>
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
  );
}
