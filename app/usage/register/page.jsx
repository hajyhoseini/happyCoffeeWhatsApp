"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import emailjs from "emailjs-com";

// اتصال به Supabase
import { createClient } from '@supabase/supabase-js';
import Spinner from "@/components/detailical/spinner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Register() {
  const { isDarkMode } = useTheme();

  const formFields = [
    { id: "username", label: "نام کاربری", type: "text", placeholder: "نام کاربری خود را وارد کنید" },
    { id: "email", label: "ایمیل", type: "email", placeholder: "ایمیل خود را وارد کنید" },
    { id: "password", label: "رمز عبور", type: "password", placeholder: "رمز عبور خود را وارد کنید" },
    { id: "confirmPassword", label: "تأیید رمز عبور", type: "password", placeholder: "رمز عبور خود را مجدداً وارد کنید" },
  ];

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userInputCode, setUserInputCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ارسال کد تأیید به ایمیل
  const sendVerificationEmail = () => {
    setIsLoading(true); // شروع لودینگ
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // کد ۶ رقمی تصادفی
    const templateParams = {
      to_email: email,
      from_name: "تیم قهوه من",
      message: `کد تایید شما: ${code}`,
      reply_to: "support@yourwebsite.com",
    };

    emailjs
      .send(
        "service_o5rmi8o", // جایگزین با Service ID شما
        "template_hm9zg5j", // جایگزین با Template ID شما
        templateParams,
        "BKulszS0HgKfSs23J" // جایگزین با Public Key شما
      )
      .then(
        (response) => {
          console.log("ایمیل ارسال شد:", response);
          setVerificationCode(code);
          setIsCodeSent(true);
          setIsLoading(false); // پایان لودینگ
        },
        (error) => {
          console.error("خطا در ارسال ایمیل:", error);
          alert(`ارسال ایمیل با مشکل مواجه شد: ${error.text}`);
          setIsLoading(false); // پایان لودینگ
        }
      );
  };

  // بررسی صحت کد واردشده
  const validateCode = () => {
    if (userInputCode === verificationCode) {
      setIsCodeValid(true);
      alert("کد تایید صحیح است!");
    } else {
      alert("کد وارد شده صحیح نیست");
    }
  };

  // ارسال اطلاعات به سوپابیس
  const handleSubmit = async (e) => {
    e.preventDefault();

    // بررسی اینکه رمزها همخوانی دارند یا نه
    if (password !== confirmPassword) {
      alert("رمز عبور و تأیید رمز عبور با هم تطابق ندارند.");
      return;
    }

    if (isCodeValid) {
      setIsLoading(true); // شروع لودینگ

      const { data, error } = await supabase
        .from("register")  // نام تیبل شما در سوپابیس
        .insert([
          {
            username,
            email,
            password,
            confirm_password: confirmPassword,  // ارسال confirm_password به Supabase
            verification_code: verificationCode, // ارسال verification_code به Supabase
          },
        ]);

      if (error) {
        console.error("Error inserting data:", error.message);
        alert("خطا در ثبت‌نام. لطفا دوباره تلاش کنید.");
      } else {
        alert("ثبت‌نام با موفقیت انجام شد!");
      }

      setIsLoading(false); // پایان لودینگ
    } else {
      alert("لطفاً کد تایید را وارد کنید.");
    }
  };

  return (
<div className={`bg-custom-image-myUser bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white/60"}`}>
  <div className={`mt-28 backdrop-blur-lg rounded-lg p-5 shadow-lg w-96 mb-40 lg:mb-36 ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"}`}>
    <h2 className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
      ثبت‌نام در سایت قهوه من ❤️
    </h2>

    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className={`block font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.placeholder}
            value={field.id === "email" ? email : field.id === "username" ? username : field.id === "password" ? password : field.id === "confirmPassword" ? confirmPassword : ""}
            onChange={(e) => {
              if (field.id === "email") setEmail(e.target.value);
              if (field.id === "username") setUsername(e.target.value);
              if (field.id === "password") setPassword(e.target.value);
              if (field.id === "confirmPassword") setConfirmPassword(e.target.value);
            }}
            disabled={field.id === "email" && isCodeSent}
          />
          {field.id === "email" && !isCodeSent && (
            <button
              type="button"
              onClick={sendVerificationEmail}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "ارسال کد تایید"}
            </button>
          )}
        </div>
      ))}

      {isCodeSent && !isCodeValid && (
        <div className="mb-4">
          <label htmlFor="verificationCode" className={`block font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
            کد تایید
          </label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="کد تایید خود را وارد کنید"
            onChange={(e) => setUserInputCode(e.target.value)}
          />
          <button
            type="button"
            onClick={validateCode}
            className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "تایید کد"}
          </button>
        </div>
      )}

      <button
        type="submit"
        className={`w-full py-2 rounded-lg ${isCodeValid ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
        disabled={!isCodeValid || isLoading}
      >
        {isLoading ? <Spinner /> : "ثبت‌نام"}
      </button>

      {/* دکمه‌های ورود و بازیابی اطلاعات */}
      <div className="mt-4 flex justify-between items-center">
        <p className={`text-sm ${isDarkMode ? "text-white" : "text-black"} font-semibold`}>
          <a href="/login" className="text-green-800 hover:underline">
            ورود به حساب کاربری
          </a>
        </p>
        <p className={`text-sm ${isDarkMode ? "text-white" : "text-black"} font-semibold`}>
          <a href="/forget" className="text-blue-800 hover:underline">
            بازیابی رمز عبور
          </a>
        </p>
      </div>
    </form>
  </div>
</div>


  );
}
