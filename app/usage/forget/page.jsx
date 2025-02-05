"use client";
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext'; 
import emailjs from "emailjs-com";
import { createClient } from '@supabase/supabase-js'; // اتصال به Supabase

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Forget() {
  const { isDarkMode } = useTheme(); 

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userInputCode, setUserInputCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ارسال کد تایید به ایمیل
  const sendVerificationEmail = () => {
    setIsLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // کد تصادفی ۶ رقمی
    const templateParams = {
      to_email: email,
      from_name: "تیم پشتیبانی",
      message: `کد تایید شما: ${code}`,
      reply_to: "support@yourwebsite.com",
    };

    emailjs.send(
      "service_o5rmi8o", 
      "template_hm9zg5j", 
      templateParams,
      "BKulszS0HgKfSs23J"
    )
    .then(
      (response) => {
        console.log("ایمیل ارسال شد:", response);
        setVerificationCode(code);
        setIsCodeSent(true);
        setIsLoading(false);
      },
      (error) => {
        console.error("خطا در ارسال ایمیل:", error);
        setIsLoading(false);
        alert(`ارسال ایمیل با مشکل مواجه شد: ${error.text}`);
      }
    );
  };

  // بررسی صحت کد تایید
  const validateCode = () => {
    if (userInputCode === verificationCode) {
      setIsCodeValid(true);
      alert("کد تایید صحیح است!");
    } else {
      alert("کد وارد شده صحیح نیست.");
    }
  };

  // به‌روزرسانی رمز عبور در Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // بررسی تطابق رمزهای عبور
    if (newPassword !== confirmNewPassword) {
      alert("رمز عبور و تایید رمز عبور باید یکسان باشند.");
      return;
    }

    if (isCodeValid) {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("register")  // تغییر به نام جدول شما
        .update({ password: newPassword, confirm_password: confirmNewPassword }) // تغییر رمز عبور
        .eq("email", email) // جستجو بر اساس ایمیل
        .eq("verification_code", userInputCode); // بررسی صحت کد تایید

      if (error) {
        console.error("Error updating password:", error.message);
        alert("خطا در به‌روزرسانی رمز عبور. لطفا دوباره تلاش کنید.");
      } else {
        alert("رمز عبور با موفقیت تغییر کرد.");
      }
      setIsLoading(false);
    } else {
      alert("لطفا کد تایید را وارد کنید.");
    }
  };

  return (
    <div className="mb-3 bg-custom-image-myUser bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen flex-col">
      <div className={`p-5 shadow-lg w-96 lg:w-2/4 lg:h-3/5 mb-36 lg:mb-10 rounded-lg backdrop-blur-lg ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'}`}>
        <h2 className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          بازیابی اطلاعات
        </h2>

        {/* فرم بازیابی رمز عبور */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ایمیل</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* دکمه ارسال کد تایید */}
          {!isCodeSent && (
            <button
              type="button"
              onClick={sendVerificationEmail}
              className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
            </button>
          )}

          {/* فیلد کد تایید */}
          {isCodeSent && !isCodeValid && (
            <div className="mb-4">
              <label htmlFor="verificationCode" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>کد تایید</label>
              <input
                type="text"
                id="verificationCode"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="کد تایید را وارد کنید"
                value={userInputCode}
                onChange={(e) => setUserInputCode(e.target.value)}
              />
              <button
                type="button"
                onClick={validateCode}
                className="mt-2 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                تایید کد
              </button>
            </div>
          )}

          {/* فیلد رمز عبور جدید */}
          {isCodeValid && (
            <>
              <div className="mb-4">
                <label htmlFor="newPassword" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>رمز عبور جدید</label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="رمز عبور جدید را وارد کنید"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              {/* فیلد تایید رمز عبور جدید */}
              <div className="mb-6">
                <label htmlFor="confirmNewPassword" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>تأیید رمز عبور جدید</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="رمز عبور جدید را مجدداً وارد کنید"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              {/* دکمه ارسال تغییرات */}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
