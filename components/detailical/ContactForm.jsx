import React, { useState } from "react";
import { FaMagic, FaCoffee } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// تنظیم اتصال به Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // تغییرات ورودی فرم
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ارسال فرم به Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // فعال کردن بارگذاری

    const { name, email, message } = formData;

    // ارسال داده‌ها به Supabase
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          name,
          email,
          message,
        },
      ]);

    setLoading(false); // غیرفعال کردن بارگذاری

    if (error) {
      console.error("خطا در ارسال پیام:", error.message);
      return;
    }

    // پاک کردن فرم بعد از ارسال موفق
    setFormData({ name: "", email: "", message: "" });
    alert("نظر شما با موفقیت ارسال شد!"); // نمایش پیام موفقیت

    // رفرش کردن صفحه برای بارگذاری مجدد پیام‌ها
    window.location.reload();
  };

  const inputStyle =
    "rounded-lg py-3 px-4 border-2 border-[#6A4E23] bg-[#F5E1C7] text-black shadow-lg focus:ring-4 focus:ring-[#6A4E23] transition-all duration-300";

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto relative p-8 rounded-lg shadow-md bg-yellow-700 text-white">
      <h4 className="text-2xl font-semibold text-center mb-6 bg-black rounded-md p-2">
        پیام خود را برای ما ارسال کنید<FaMagic className="inline-block mr-2" />
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            نام شما
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="نام خود را وارد کنید"
            className={`${inputStyle} w-full`}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            ایمیل شما
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            className={`${inputStyle} w-full`}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">
            پیام شما
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="پیام خود را اینجا بنویسید"
            className={`${inputStyle} w-full`}
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 text-lg text-white rounded-lg shadow-md 
            bg-[#F7C400] hover:bg-[#F39C00] hover:shadow-lg focus:outline-none 
            transform hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "ارسال نظر"}
          <FaCoffee className="inline-block ml-2 text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
