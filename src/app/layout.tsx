import { Poppins } from "next/font/google";
import Head from "next/head";

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
    <html lang="en">
      <head>
        <Head>
          <title>Observatório Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </head>
      <body className={`${poppins.variable}`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
