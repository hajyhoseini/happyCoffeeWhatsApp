'use client';

import MobileButton from '@/components/detailical/MobileButton';
import SidebarMain from '@/components/main/sidebarMain';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // بررسی وضعیت لاگین از localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // اگر کاربر وارد نشده بود، به صفحه لاگین هدایت شود
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);
  // تابع برای دریافت اطلاعات کاربران از API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('خطا در دریافت اطلاعات کاربران:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // شناسایی اندازه صفحه برای حالت موبایل
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);

      // در حالت دسکتاپ، سایدبار همیشه باز باشد
      if (!isNowMobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false); // در حالت موبایل پیش‌فرض بسته باشد
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // نمایش صفحه لودینگ
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-custom-image-main min-h-screen transition-all duration-300 ${
        isMobile ? 'flex flex-col' : 'grid grid-cols-[16rem,1fr]' // برای موبایل و دسکتاپ
      }`}
    >
       <Head>
          <title>اولین سایت اختصاصی من❤️</title>
          <meta name="description" content="ساخته شده توسط A.h.h.81" />
        </Head>
      {/* سایدبار */}
      < SidebarMain isMobile={isMobile} isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

      {/* دکمه باز کردن سایدبار */}
      {isMobile && !isSidebarOpen && (
        < MobileButton setIsSidebarOpen={setIsSidebarOpen} />
      )}

      {/* محتوای اصلی */}
      <main
        className={`transition-all duration-300 p-4 relative ${
          isMobile && isSidebarOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        <h3 className="bg-black/60 text-4xl font-extrabold text-center mb-12 text-white shadow-md py-3 px-8 rounded-lg">
        لیست کاربران
    </h3>
        <div className="max-w-7xl mx-auto bg-black/60 p-6 rounded-lg shadow-lg shadow-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map(user => (
              <div
                key={user.id}
                className="bg-gray-50 p-5 rounded-lg shadow-md hover:shadow-slate-400 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-gray-700">{user.name}</h3>
                <p className="text-gray-600">ایمیل: {user.email}</p>
                <p className="text-gray-600">تلفن: {user.phone}</p>
                <p className="text-gray-600">
                  وب‌سایت: <a href={`http://${user.website}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.website}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
