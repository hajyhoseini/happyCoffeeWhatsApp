'use client';  // این کامپوننت کلاینت است
import 'bootstrap/dist/css/bootstrap.min.css'; // وارد کردن استایل‌های Bootstrap
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "fontsource-vazir";
import "@fortawesome/fontawesome-free/css/all.css";
import Head from 'next/head';
import Contact from '@/components/main/Contact';
import Header from '@/components/main/header';
import HeaderAuth from '@/components/detailical/headerAuth';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/cartContext';
import CallToHelper from '@/components/detailical/callToHelper';
import BackgroundMusic from '@/components/detailical/BackgroundMusic';
import { UserProvider } from '@/context/userContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Layout({ children }) {
  const pathname = usePathname();
  
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forget';

  return (
    <>
      <Head>
        <title>رزومه آنلاین ابوالفضل حاجی حسینی | توسعه‌دهنده وب</title>
        {/* سایر متا تگ‌ها */}
      </Head>
      <CartProvider>
        <UserProvider>
        <ThemeProvider>
          <html lang="en" dir="rtl">
            <body>
              {/* پخش موسیقی پس‌زمینه */}
              {/* <BackgroundMusic /> */}

              {/* نمایش هدر فقط در صورتی که صفحه لاگین یا ثبت‌نام نباشد */}
              {isAuthPage ? (
                <header>
                  <HeaderAuth />
                </header>
              ) : (
                <header>
                  <Header />
                </header>
              )}

              <CallToHelper />
              {children}

              {/* نمایش فوتر فقط در صورتی که صفحه لاگین یا ثبت‌نام نباشد */}
              {!isAuthPage && (
                <footer>
                  <Contact />
                </footer>
              )}
            </body>
          </html>
        </ThemeProvider>
        </UserProvider>
      </CartProvider>
    </>
  );
}

