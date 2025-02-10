import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, Carousel } from "react-bootstrap"; // فرض بر این است که از react-bootstrap استفاده می‌کنید

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CommentsSection({ isDarkMode }) {
  const [messages, setMessages] = useState([]);
  
  // خواندن پیام‌ها از سوپابیس
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("comments")  // جدول نظرات
      .select("id, name, email, message")  // تغییر "comment" به "message"
      .order("created_at", { ascending: false });  // ترتیب بر اساس زمان ارسال

    if (error) {
      console.error("خطا در دریافت پیام‌ها:", error.message);  // چاپ پیغام خطا
      return;  // اگر خطا بود، تابع را خاتمه بده
    }

    if (data && data.length > 0) {
      setMessages(data);  // اگر داده‌ای بود، آن را تنظیم می‌کنیم
    } else {
      setMessages([]);  // اگر داده‌ای نبود، یک آرایه خالی تنظیم می‌کنیم
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // تابع برای ارسال پیام جدید
  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    // ارسال داده‌ها به Supabase
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

    if (error) {
      console.error("خطا در ارسال پیام:", error.message);
      return;
    }

    // پس از ارسال، پیام جدید را به صورت دستی به لیست پیام‌ها اضافه می‌کنیم
    setMessages((prevMessages) => [data[0], ...prevMessages]); // پیام جدید در ابتدا اضافه می‌شود
  };

  return (
    <>
      {messages.length > 0 ? (
        <div className="relative z-10 mt-12 flex justify-center items-center">
          <Carousel className="w-full md:w-3/5 max-w-4xl mb-4">
            {messages.map((message) => {
              return (
                <Carousel.Item key={message.id}>
                  <Card className="text-center p-6 rounded-lg shadow-lg">
                    <Card.Body className={isDarkMode ? "bg-black" : "bg-red-100"}>
                      <h4
                        className={`text-xl font-semibold ${
                          isDarkMode ? "text-yellow-500" : "text-yellow-950"
                        }`}
                      >
                        پیام از {message.name}
                      </h4>
                      <p
                        className={`text-lg ${
                          isDarkMode ? "text-yellow-500" : "text-yellow-950"
                        }`}
                      >
                        {message.message}
                      </p>
                      <p
                        className={`text-md ${
                          isDarkMode ? "text-yellow-500" : "text-yellow-950"
                        }`}
                      >
                        <strong>{message.email}</strong>
                      </p>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 mt-8">
          هیچ پیامی برای نمایش وجود ندارد.
        </div>
      )}
    </>
  );
}
