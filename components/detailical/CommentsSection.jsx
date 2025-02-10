import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, Carousel } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment-jalaali"; // وارد کردن کتابخانه برای تاریخ شمسی

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CommentsSection({ isDarkMode }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("id, name, email, message, created_at")
      .order("created_at", { ascending: false });

    if (commentsError) {
      console.error("خطا در دریافت پیام‌ها:", commentsError.message);
      return;
    }

    const updatedComments = await Promise.all(
      comments.map(async (comment) => {
        const { data: user, error: userError } = await supabase
          .from("register")
          .select("profile_image")
          .eq("email", comment.email)
          .maybeSingle();  // استفاده از maybeSingle برای جلوگیری از خطا

        // بررسی وجود خطا یا نبود کاربر
        if (userError) {
          console.error("خطا در دریافت تصویر پروفایل:", userError.message);
        }

        // اگر کاربر پیدا نشد، از تصویر پیش‌فرض استفاده می‌کنیم
        const profileImage = user?.profile_image || "/image/coffeeShop.webp";

        // تبدیل تاریخ میلادی به شمسی
        const persianDate = moment(comment.created_at).format("jYYYY/jMM/jDD"); // تبدیل تاریخ

        return {
          ...comment,
          profile_image: profileImage, // افزودن تصویر پروفایل
          persian_date: persianDate,  // افزودن تاریخ شمسی
        };
      })
    );

    setMessages(updatedComments);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      {loading ? (
        <div className="relative z-10 mt-12 flex justify-center items-center">
          <Carousel className="w-full md:w-3/5 max-w-4xl mb-4">
            {[...Array(3)].map((_, index) => (
              <Carousel.Item key={index}>
                <Card className={`text-center p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-yellow-700":"bg-yellow-800"}`}>
                  <Card.Body className={isDarkMode ? "bg-black" : "bg-yellow-600/80"}>
                    <div className="flex items-center justify-center">
                      <Skeleton circle width={50} height={50} className="mr-4" />
                      <Skeleton width="60%" height={25} />
                    </div>
                    <Skeleton count={3} height={15} width="100%" className="mb-4" />
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="relative z-10 mt-12 flex justify-center items-center">
          <Carousel className="w-full md:w-3/5 max-w-4xl mb-4">
            {messages.map((message) => {
              return (
                <Carousel.Item key={message.id}>
                  <Card className={`text-center p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-yellow-700":"bg-yellow-800"}`}>
                    <Card.Body className={isDarkMode ? "bg-black" : "bg-yellow-600/80"}>
                      <div className="flex items-center justify-start">
                        <img
                          src={message.profile_image}
                          alt="Profile"
                          className="w-14 h-14 ml-2 rounded-full mr-4"
                          loading="lazy"
                        />
                        <h4
                          className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}
                        >
                          پیام از {message.name}:
                        </h4>
                      </div>
                      <p
                        className={`text-lg mt-3 font-bold ${isDarkMode ? "text-white" : "text-yellow-950"}`}
                      >
                        {message.message}
                      </p>
                      <p
                        className={`text-sm mt-4 ${isDarkMode ? "text-yellow-300" : "text-white"}`}
                      >
                        ارسال شده در: {message.persian_date}
                      </p>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
}
