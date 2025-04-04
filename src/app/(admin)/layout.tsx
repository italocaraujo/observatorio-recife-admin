import { Poppins } from "next/font/google";
import Sidebar from "../../../component/home/Sidebar";
import HeadBar from "../../../component/home/HeadBar";
import Head from "next/head"; // Importando o componente Head
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" /> {/* Adicionando o favicon */}
      </Head>
      <HeadBar />
      <Sidebar />
      <div>
        {children}
      </div>

    </>
  );
}
