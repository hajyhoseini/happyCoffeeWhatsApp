"use client";
import React from 'react';
import { useTheme } from '@/context/ThemeContext'; // استفاده از context برای مدیریت حالت شب و روز

export default function Register() {
  const { isDarkMode } = useTheme(); // استفاده از context برای وضعیت شب و روز

  return (
    <div className={`mt-16 bg-custom-image bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className={`bg-white/60 backdrop-blur-lg rounded-lg p-5 shadow-lg w-96 mb-40 lg:mb-36 ${isDarkMode ? 'bg-gray-800/60' : ''}`}>
        <h2 className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          ثبت‌نام در سایت قهوه من❤️
        </h2>

        {/* فرم ثبت‌نام */}
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="username" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>نام کاربری</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ایمیل</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>رمز عبور</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>تأیید رمز عبور</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="رمز عبور خود را مجدداً وارد کنید"
            />
            <div className="flex justify-around items-center mt-4">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="text-blue-500 me-1 size-4"
                />
                <label htmlFor="remember" className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>مرا به خاطر بسپار</label>
              </div>
              <a href="/login" className={`text-green-500 text-lg hover:text-green-400 ${isDarkMode ? 'text-gray-300' : ''}`}>ورود</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ثبت‌نام
          </button>
        </form>
      </div>
    </div>
  );
}
