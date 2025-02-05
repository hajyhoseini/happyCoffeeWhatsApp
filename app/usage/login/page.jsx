"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ابتدا بررسی می‌کنیم که نام کاربری، ایمیل و کد اعتبارسنجی صحیح است یا نه.
    if (newPassword !== confirmPassword) {
      setError("رمز عبور جدید و تایید آن یکسان نیست.");
      return;
    }

    // تبدیل verificationCode به عدد
    const verificationCodeInt = parseInt(verificationCode);

    // بررسی صحت وارد کردن کد تایید به صورت عدد
    if (isNaN(verificationCodeInt)) {
      setError("کد تایید باید یک عدد باشد.");
      return;
    }

    const { data, error } = await supabase
      .from("register") // نام جدول شما باید درست باشد
      .select("*")
      .eq("username", username)
      .eq("email", email)
      .eq("verification_code", verificationCodeInt); // فیلتر کد تایید به صورت عددی

    if (error) {
      setError("خطا در برقراری ارتباط با سرور");
      console.error("Error:", error.message);
      return;
    }

    console.log(data); // اینجا داده‌های دریافتی از سرور را چاپ می‌کنیم

    if (data.length > 0) {
      // اگر داده یافت شد، رمز عبور جدید را بروز رسانی می‌کنیم
      const { updateError } = await supabase
        .from("register")
        .update({ password: newPassword }) // بروزرسانی رمز عبور
        .eq("id", data[0].id);

      if (updateError) {
        setError("خطا در بروز رسانی رمز عبور.");
        console.error("Error:", updateError.message);
        return;
      }

      // اگر موفقیت‌آمیز بود، کاربر را هدایت به صفحه لاگین می‌کنیم.
      router.push("/login");
    } else {
      setError("اطلاعات وارد شده صحیح نیست.");
    }
  };

  return (
    <div className="mb-3 bg-custom-image-myUser bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen flex-col">
      <div
        className={`p-5 shadow-lg w-96 lg:w-2/4 lg:h-3/5 mb-36 lg:mb-10 rounded-lg backdrop-blur-lg ${
          isDarkMode ? "bg-gray-800/60" : "bg-white/60"
        }`}
      >
        <h2
          className={`text-2xl font-semibold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          بازیابی رمز عبور
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className={`block font-semibold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              نام کاربری
            </label>
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

          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block font-semibold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="verificationCode"
              className={`block font-semibold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              کد تایید
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="کد تایید را وارد کنید"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className={`block font-semibold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              رمز عبور جدید
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="رمز عبور جدید را وارد کنید"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className={`block font-semibold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              تایید رمز عبور جدید
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="رمز عبور جدید را تایید کنید"
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
