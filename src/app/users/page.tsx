'use client';

import styles from '../styles/users/page.module.css';
import Sidebar from '../../../component/home/Sidebar';
import HeadBar from '../../../component/home/HeadBar';

export default function Users() {

  return (
    <div className={styles.container}>
      <Sidebar/>
      <HeadBar/>
    </div>
  );
}
