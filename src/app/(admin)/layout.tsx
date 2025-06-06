"use client";

import Sidebar from "@/components/layout/Sidebar";
import Head from "next/head"; 
import "../globals.css";
import styles from "@/app/styles/layout/LayoutPage.module.css";
import { sidebarData } from "@/components/layout/SidebarData";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <Head>
        <title>Observatório Admin</title>
        <link rel="icon" href="/favicon.ico" /> {/* Corrigi a tag de favicon */}
      </Head>
      <div className={styles.mainPageContainer}>
        <Sidebar links={sidebarData} isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <main className={isOpen ? styles.contentShifted : styles.content}>
          {children}
        </main>
      </div>
    </>
  );
}
