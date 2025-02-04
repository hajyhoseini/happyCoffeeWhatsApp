"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import emailjs from "emailjs-com";

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

  // ارسال کد تأیید به ایمیل
  const sendVerificationEmail = () => {
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
        },
        (error) => {
          console.error("خطا در ارسال ایمیل:", error);
          alert(`ارسال ایمیل با مشکل مواجه شد: ${error.text}`);
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

  return (
    <div className={`mt-16 bg-custom-image-myUser bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white/60"}`}>
      <div className={`backdrop-blur-lg rounded-lg p-5 shadow-lg w-96 mb-40 lg:mb-36 ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"}`}>
        <h2 className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? "text-white" : "text-black"}`}>
          ثبت‌نام در سایت قهوه من ❤️
        </h2>

        <form action="#" method="POST">
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
                value={field.id === "email" ? email : ""}
                onChange={(e) => {
                  if (field.id === "email") setEmail(e.target.value);
                }}
                disabled={field.id === "email" && isCodeSent}
              />
              {field.id === "email" && !isCodeSent && (
                <button
                  type="button"
                  onClick={sendVerificationEmail}
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  ارسال کد تایید
                </button>
              )}
            </div>
          ))}

          {/* فیلد کد تایید */}
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
              >
                تایید کد
              </button>
            </div>
          )}

          <div className="mb-6">
            <div className="flex justify-around items-center mt-4">
              <div>
                <input type="checkbox" id="remember" name="remember" className="text-blue-500 me-1 size-4" />
                <label htmlFor="remember" className={`text-gray-600 ${isDarkMode ? "text-white" : "text-black"}`}>
                  مرا به خاطر بسپار
                </label>
              </div>
              <a href="/login" className={`text-lg hover:text-green-400 ${isDarkMode ? "text-green-500" : "text-green-700"}`}>
                ورود
              </a>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              isCodeValid ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isCodeValid}
          >
            ثبت‌نام
          </button>
        </form>
      </div>
    </div>
  );
}
