"use client";

import styles from '@/app/styles/users/page.module.css';
import additionalStyles from '@/app/styles/layout/LayoutPage.module.css';

export default function Users() {

  return (
    <div className={additionalStyles.container}>
      <div className={additionalStyles.contentContainer}>
        <div className={additionalStyles.titleContainer}>
          <div className={additionalStyles.title}>
            <h1>Usuários</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
