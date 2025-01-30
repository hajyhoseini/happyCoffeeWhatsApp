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
  
  // بررسی مسیر فعلی برای مخفی کردن هدر و فوتر در صفحات خاص
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forget';

  return (
    <>


   <Head>
   {isAuthPage && (
          <meta name="robots" content="noindex, nofollow" />
        )}
  <title>رزومه آنلاین ابوالفضل حاجی حسینی | توسعه‌دهنده وب</title>
  <meta name="description" content="رزومه آنلاین ابوالفضل حاجی حسینی شامل مهارت‌ها، تجربیات کاری، پروژه‌ها و مقالات توسعه‌دهنده وب." />
  <meta name="keywords" content="پروفایل توسعه‌دهنده وب , ابوالفضل حاجی حسینی, توسعه‌دهنده وب, برنامه‌نویس, React, Next.js" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="رزومه آنلاین ابوالفضل حاجی حسینی | توسعه‌دهنده وب" />
  <meta property="og:description" content="رزومه آنلاین ابوالفضل حاجی حسینی شامل مهارت‌ها، تجربیات کاری، پروژه‌ها و مقالات توسعه‌دهنده وب." />
  <meta property="og:image" content="https://centerproject.vercel.app/images/og-image.jpg" />
  <meta property="og:url" content="https://centerproject.vercel.app/" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="رزومه آنلاین ابوالفضل حاجی حسینی" />
  <meta name="twitter:description" content="رزومه آنلاین و مهارت‌های برنامه‌نویسی وب من." />
  <meta name="twitter:image" content="https://centerproject.vercel.app/images/twitter-image.jpg" />
  
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "JobPosting",
        title: "توسعه‌دهنده وب",
        description: "توسعه و نگهداری اپلیکیشن‌های وب با استفاده از React، Node.js و Next.js.",
        hiringOrganization: {
          "@type": "Organization",
          name: "شرکت XYZ",
          sameAs: "https://companyxyz.com"
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: "خیابان فلان، تهران، ایران",
            addressLocality: "تهران",
            addressCountry: "IR"
          }
        },
        datePosted: "2024-01-01",
        validThrough: "2024-12-31",
        employmentType: "تمام‌وقت",
        skills: ["React", "Node.js", "Next.js", "JavaScript"],
      }),
    }}
  />


</Head>
<CartProvider>
<ThemeProvider>

      <html lang="en" dir="rtl">
        <body>
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
          
          {/* محتوای اصلی صفحه */}
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
      </CartProvider>
    </>
  );
}
