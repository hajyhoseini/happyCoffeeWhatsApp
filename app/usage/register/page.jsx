"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import emailjs from "emailjs-com";
import { createClient } from "@supabase/supabase-js";
import Spinner from "@/components/detailical/spinner";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Register() {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userInputCode, setUserInputCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [adminCode, setAdminCode] = useState(""); // فیلد کد ادمین
  const [isAdmin, setIsAdmin] = useState(false); // شناسایی کاربر ادمین

  const router = useRouter();

  // ارسال کد تایید
  const sendVerificationEmail = async () => {
    const isEmailUnique = await checkEmailUnique();
    if (!isEmailUnique) return;

    setIsLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const templateParams = {
      to_email: email,
      from_name: "تیم قهوه من",
      message: `کد تایید شما: ${code}`,
      reply_to: "support@yourwebsite.com",
    };

    emailjs
      .send(
        "service_o5rmi8o",
        "template_hm9zg5j",
        templateParams,
        "BKulszS0HgKfSs23J"
      )
      .then(() => {
        setVerificationCode(code);
        setIsCodeSent(true);
        setIsLoading(false);
      })
      .catch(() => {
        alert("خطا در ارسال ایمیل!");
        setIsLoading(false);
      });
  };

  // تایید کد
  const validateCode = () => {
    if (userInputCode === verificationCode) {
      setIsCodeValid(true);
      alert("کد تایید صحیح است!");
    } else {
      alert("کد وارد شده صحیح نیست");
    }
  };

  // آپلود تصویر
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("لطفا یک تصویر انتخاب کنید.");
      return;
    }

    setIsLoading(true);
    const fileName = `${Date.now()}_${selectedFile.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, selectedFile);

    if (error) {
      console.error("خطای آپلود:", error);
      alert(`خطا در آپلود تصویر! ${error.message}`);
      setIsLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    setImageUrl(publicUrlData.publicUrl);
    alert("تصویر آپلود شد!");
    setIsLoading(false);
  };

  // بررسی ایمیل تکراری
  const checkEmailUnique = async () => {
    const { data, error } = await supabase
      .from("register")
      .select("email")
      .eq("email", email);

    if (error) {
      console.error("خطا در بررسی ایمیل:", error);
      return false;
    }

    if (data.length > 0) {
      alert("این ایمیل قبلاً ثبت شده است!");
      return false;
    }

    return true;
  };

  // بررسی کد ادمین
  const validateAdminCode = () => {
    if (adminCode === "A6387640h") {
      setIsAdmin(true);
      alert("شما به عنوان ادمین شناخته شدید!");
    } else {
      alert("کد ادمین وارد شده صحیح نیست.");
    }
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("رمز عبور و تأیید رمز عبور یکسان نیستند.");
      return;
    }

    if (!isCodeValid) {
      alert("کد تایید را وارد کنید.");
      return;
    }

    // چک کردن کد ادمین
    if (adminCode && !isAdmin) {
      validateAdminCode();
      if (!isAdmin) return; // اگر کد ادمین صحیح نبود، ارسال را متوقف می‌کنیم
    }

    setIsLoading(true);

    const { error } = await supabase.from("register").insert([
      {
        username,
        email,
        password,
        confirm_password: confirmPassword,
        verification_code: parseInt(verificationCode), // تبدیل به عدد
        profile_image: imageUrl,
        role: isAdmin ? "admin" : "user", // استفاده از role به جای is_admin
      },
    ]);

    if (error) {
      alert("خطا در ثبت‌نام!");
    } else {
      alert("ثبت‌نام با موفقیت انجام شد!");
      router.push("/login");
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`bg-custom-image-myUser bg-cover bg-center h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-white/60"
      }`}
    >
      <div
        className={`backdrop-blur-lg mt-16 rounded-lg p-5 shadow-lg w-96 ${
          isDarkMode ? "bg-gray-800/50" : "bg-white/50"
        }`}
      >
        <h2
          className={`text-2xl font-semibold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          ثبت‌نام در سایت قهوه من ❤️
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              نام کاربری
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className={`block font-semibold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              ایمیل
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isCodeSent && (
              <button
                type="button"
                onClick={sendVerificationEmail}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg"
              >
                {isLoading ? <Spinner /> : "ارسال کد تایید"}
              </button>
            )}
          </div>

          {isCodeSent && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">کد تایید</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUserInputCode(e.target.value)}
              />
              <button
                type="button"
                onClick={validateCode}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg"
              >
                تایید کد
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="block font-semibold mb-2">رمز عبور</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">تأیید رمز عبور</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">انتخاب تصویر پروفایل</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={handleFileUpload}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {isLoading ? <Spinner /> : "آپلود تصویر"}
            </button>
          </div>

          {/* بخش کد ادمین */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">در صورت ادمین بودن کد را وارد کنید</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 ${isCodeValid ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"} rounded-lg`}
          >
            {isLoading ? <Spinner /> : "ثبت‌نام"}
          </button>
        </form>
      </div>
    </div>
  );
}
