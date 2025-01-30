"use client";
import React from 'react';
import { useTheme } from '@/context/ThemeContext'; // استفاده از context برای مدیریت حالت شب و روز

export default function Forget() {
  const { isDarkMode } = useTheme(); // استفاده از context برای وضعیت شب و روز

  return (
    <div className="mb-3 bg-custom-image bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen flex-col">
      <div className={`p-5 shadow-lg w-96 lg:w-2/4 lg:h-3/5 mb-36 lg:mb-10 rounded-lg backdrop-blur-lg ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'}`}>
        <h2 className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          بازیابی اطلاعات
        </h2>

        {/* فرم فراموشی رمز عبور */}
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

          <div className="mb-6">
            <label htmlFor="password" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>شماره تلفن همراه</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="شماره تلفن خود را وارد کنید"
            />
          </div>

          <div className="flex justify-around items-center mb-6">
            <div>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>مرا به خاطر بسپار</label>
            </div>
            <a href="/register" className="text-blue-500 text-md">ثبت نام</a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            بازیابی
          </button>
        </form>
      </div>
    </div>
  );
}
