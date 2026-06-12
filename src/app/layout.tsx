import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import FloatingActionButton from "@/components/layout/FloatingActionButton";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Astrologer CRM",
  description: "Premium CRM for Astrologers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>
              <Header />
              <div style={{ padding: '0 2rem 2rem 2rem' }}>
                {children}
              </div>
            </main>
            <FloatingActionButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
