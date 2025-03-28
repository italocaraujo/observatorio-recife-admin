'use client';

import styles from '../styles/news/page.module.css';
import Sidebar from '../../../component/home/Sidebar';
import HeadBar from '../../../component/home/HeadBar';

export default function News() {

  return (
    <div className={styles.container}>
      <Sidebar/>
      <HeadBar/>
    </div>
  );
}
