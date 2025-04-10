import Sidebar from "@/components/layout/Sidebar";
import HeadBar from "@/components/layout/HeadBar";
import Head from "next/head"; 
import "../globals.css";

const sidebarLinks = [
  { href: "/home", label: "Página Inicial" },
  { href: "/users", label: "Usuários" },
  { href: "/news", label: "Notícias" },
  { href: "/security", label: "Segurança" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Observatório Admin</title>
        <link rel="favicon" href="/favicon.ico" /> 
      </Head>
      <HeadBar />
      <Sidebar links={sidebarLinks} />
      <div>
        {children}
      </div>

    </>
  );
}
