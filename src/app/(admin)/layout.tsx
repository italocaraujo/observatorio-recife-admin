import Sidebar from "@/components/layout/Sidebar";
import HeadBar from "@/components/layout/HeadBar";
import Head from "next/head"; 
import "../globals.css";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/news", label: "Notícias" },
];

const sidebarLinksAdmin = [
  { href: "/pages", label: "Páginas" },
  { href: "/upload", label: "Upload" },
  { href: "/users", label: "Usuários" },
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
      <Sidebar links={sidebarLinks} linksAdmin={sidebarLinksAdmin} />
      <div>
        {children}
      </div>

    </>
  );
}
