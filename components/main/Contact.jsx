import React, { useState } from "react";
import { FaCoffee, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { Carousel, Card } from "react-bootstrap";
import ContactForm from "../detailical/ContactForm";
import CommentsSection from "../detailical/CommentsSection";  // کامپوننت نظرات را وارد می‌کنیم

const Contact = () => {
  const { isDarkMode } = useTheme();
  const bgColorContact = isDarkMode ? "bg-yellow-700 text-white" : "bg-yellow-800 text-black";

  // وضعیت ذخیره پیام‌ها
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // مدیریت تغییرات فرم
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ارسال پیام
  const handleSubmit = (e) => {
    e.preventDefault();
    // در اینجا می‌توانید پیام جدید را به Supabase ارسال کنید
    // فرض کنید که شما تابعی به نام ارسال پیام به Supabase دارید
    // مثلا sendMessageToSupabase(formData);

    setFormData({ name: "", email: "", message: "" }); // پاک کردن فرم پس از ارسال
  };

  return (
    <section className={`relative bg-custom-image-myUser bg-cover bg-center w-full mx-auto p-8 py-16 px-12 ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 flex justify-center items-center`}>
      {/* لایه بلور پس‌زمینه */}
      <div className={`absolute inset-0 ${isDarkMode ? "bg-black/40" : "bg-white/30"} backdrop-blur-xs rounded-lg`}></div>

      <div className="relative z-10 w-full max-w-6xl">
        <h3 className={`text-4xl lg:text-5xl font-semibold text-center mb-12 ${isDarkMode ? "text-yellow-400 bg-yellow-700" : "text-white bg-yellow-800"} p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 w-full lg:w-3/5 mx-auto`}>
          <FaCoffee className="inline-block mb-3 text-3xl" />
          تماس با ما
        </h3>

        {/* کرول (Carousel) برای اطلاعات تماس */}
        <div className="relative z-10 mb-12 flex justify-center items-center">
          <Carousel className="w-full md:w-3/5 max-w-4xl">
            {/* آدرس */}
            <Carousel.Item>
              <Card className={`${bgColorContact} text-center p-6 rounded-lg shadow-lg`}>
                <Card.Body>
                  <div className="flex justify-center items-center mb-3">
                    <FaMapMarkerAlt className={`text-4xl ${isDarkMode ? "text-yellow-500" : "text-white"}`} />
                  </div>
                  <h4 className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-white"}`}>آدرس ما</h4>
                  <p className={`text-lg ${isDarkMode ? "text-yellow-500" : "text-white"}`}>
                    تهران، میدان ولیعصر، خیابان انقلاب، کافی‌شاپ هپی کافی
                  </p>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/* تلفن */}
            <Carousel.Item>
              <Card className={`${bgColorContact} text-center p-6 rounded-lg shadow-lg`}>
                <Card.Body>
                  <div className="flex justify-center items-center mb-3">
                    <FaPhoneAlt className={`text-4xl ${isDarkMode ? "text-yellow-500" : "text-white"}`} />
                  </div>
                  <h4 className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-white"}`}>تلفن</h4>
                  <p className={`text-lg ${isDarkMode ? "text-yellow-500" : "text-white"}`}>09388780198</p>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/* ایمیل */}
            <Carousel.Item>
              <Card className={`${bgColorContact} text-center p-6 rounded-lg shadow-lg`}>
                <Card.Body>
                  <div className="flex justify-center items-center mb-3">
                    <FaEnvelope className={`text-4xl ${isDarkMode ? "text-yellow-500" : "text-white"}`} />
                  </div>
                  <h4 className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-white"}`}>ایمیل</h4>
                  <p className={`text-lg ${isDarkMode ? "text-yellow-500" : "text-white"}`}>hajy3843@gmail.com</p>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </div>

        {/* اضافه کردن کامپوننت نظرات بین فرم و Carousel */}
        <CommentsSection isDarkMode={isDarkMode} /> {/* نمایش کامپوننت نظرات */}

        {/* نمایش فرم ارسال نظر */}
        <ContactForm onSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange} />
      </div>
    </section>
  );
};

export default Contact;
