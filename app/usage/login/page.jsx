"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // تغییر در نسخه‌های جدید
import { useTheme } from '@/context/ThemeContext'; // استفاده از context برای مدیریت حالت شب و روز

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { isDarkMode } = useTheme(); // دریافت وضعیت حالت شب و روز از context

  // استفاده از useEffect برای اطمینان از دسترسی به localStorage فقط در کلاینت
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      // if (isLoggedIn) {
      //   router.push('/users'); // هدایت به صفحه کاربران اگر لاگین شده باشد
      // }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username === 'hajy' && password === 'A6387640h') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      router.push('/users');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="mb-3 bg-custom-image bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen flex-col">
      <div className={`p-5 shadow-lg w-96 lg:w-2/4 lg:h-3/5 mb-36 lg:mb-10 rounded-lg backdrop-blur-lg ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'}`}>
        <h2 className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          ورود به سایت قهوه من
        </h2>

        {/* فرم لاگین */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>نام کاربری</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>رمز عبور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-between items-center mb-6">
  <div>
    <input
      type="checkbox"
      id="remember"
      name="remember"
      className="text-blue-500"
    />
    <label htmlFor="remember" className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      مرا به خاطر بسپار
    </label>
  </div>
  <a href="/forget" className="text-blue-500 text-md">فراموشی رمز عبور</a>
  <a href="/register" className="text-blue-500 text-md">ثبت نام</a>
</div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
