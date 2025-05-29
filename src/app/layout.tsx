import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Head>
          <title>Observatório Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </head>
      <body className={`${inter.variable}`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
