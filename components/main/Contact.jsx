import React from "react";
import { FaCoffee, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { Carousel, Container, Card } from "react-bootstrap";

// کامپوننتی برای نمایش هر بخش از اطلاعات تماس
const ContactInfo = ({ icon, title, children, bgColor, textColor }) => (
  <div
    className={`text-center mb-8 p-6 rounded-lg shadow-lg ${bgColor} flex items-center justify-center flex-col w-full`}
  >
    <div className="flex justify-center items-center mb-3">
      {icon}
    </div>
    <h4 className={`text-xl font-semibold ${textColor}`}>{title}</h4>
    <p className={`text-lg ${textColor}`}>{children}</p>
  </div>
);

const Contact = () => {
  const { isDarkMode } = useTheme();

  const bgColorContact = isDarkMode ? "bg-yellow-700 text-white" : "bg-yellow-800 text-black";
  const inputStyle = "rounded-lg py-3 px-4 border-2 border-[#6A4E23] bg-[#F5E1C7] text-black shadow-lg focus:ring-4 focus:ring-[#6A4E23] transition-all duration-300";

  return (
    <section
      className={`relative bg-custom-image-myUser bg-cover bg-center w-full mx-auto p-8 py-16 px-12 ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 flex justify-center items-center`}
    >
      {/* لایه بلور پس‌زمینه */}
      <div
        className={`absolute inset-0 ${isDarkMode ? "bg-black/40" : "bg-white/30"} backdrop-blur-xs rounded-lg`}
      ></div>

      <div className="relative z-10 w-full max-w-6xl">
      <h3
  className={`text-4xl lg:text-5xl font-semibold text-center mb-12 ${isDarkMode ? "text-yellow-400 bg-yellow-700" : "text-white bg-yellow-800"} 
  p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 w-full lg:w-3/5 mx-auto`}
>
  <FaCoffee className="inline-block mb-3 text-3xl" />
  تماس با ما
</h3>




        <div className="relative z-10 mb-12 flex justify-center items-center">
          {/* کرول (Carousel) برای اطلاعات تماس */}
          <Carousel className="w-full md:w-3/5 max-w-4xl">
            {/* آدرس */}
            <Carousel.Item>
              <Card className={`${bgColorContact} text-center p-6 rounded-lg shadow-lg `}>
                <Card.Body className={`${isDarkMode ? "bg-black" :"bg-red-100"}`}>
                  <div className="flex justify-center items-center mb-3">
                    <FaMapMarkerAlt className={`text-4xl ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`} />
                  </div>
                  <h4 className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}>آدرس ما</h4>
                  <p className={`text-lg ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}>
                    تهران، میدان ولیعصر، خیابان انقلاب، کافی‌شاپ هپی
                  </p>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* تلفن */}
            <Carousel.Item>
              <Card className={`${bgColorContact} text-center p-6 rounded-lg shadow-lg`}>
                <Card.Body className={`${isDarkMode ? "bg-black" :"bg-red-100"}`}>
                  <div className="flex justify-center items-center mb-3">
                    <FaPhoneAlt className={`text-4xl ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`} />
                  </div>
                  <h4 className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}>تلفن</h4>
                  <p className={`text-lg ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}>
                    (+98) 21 1234 5678
                  </p>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* ایمیل */}
            <Carousel.Item>
              <Card className={`${bgColorContact} text-center p-6 rounded-lg shadow-lg`}>
                <Card.Body className={`${isDarkMode ? "bg-black" :"bg-red-100"}`}>
                  <div className="flex justify-center items-center mb-3">
                    <FaEnvelope className={`text-4xl ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`} />
                  </div>
                  <h4 className={`text-xl font-semibold ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}>ایمیل</h4>
                  <p className={`text-lg ${isDarkMode ? "text-yellow-500" : "text-yellow-950"}`}>
                    contact@happycoffee.com
                  </p>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </div>

        {/* فرم تماس */}
        <div className={`w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto relative p-8 rounded-lg shadow-md ${bgColorContact}`}>
          <h4 className="text-2xl font-semibold text-center mb-6">
            پیام خود را برای ما ارسال کنید
          </h4>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">نام شما</label>
              <input type="text" id="name" placeholder="نام خود را وارد کنید" className={`${inputStyle} w-full`} />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">ایمیل شما</label>
              <input type="email" id="email" placeholder="ایمیل خود را وارد کنید" className={`${inputStyle} w-full`} />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">پیام شما</label>
              <textarea id="message" rows="4" placeholder="پیام خود را اینجا بنویسید" className={`${inputStyle} w-full`}></textarea>
            </div>

            <button
  type="submit"
  className="w-full py-3 mt-4 text-white rounded-lg shadow-md 
    bg-[#F7C400] hover:bg-[#F39C00] hover:shadow-lg focus:outline-none 
    transform hover:scale-105 transition-all duration-300"
>
  ارسال پیام <FaCoffee className="inline-block ml-2" />
</button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
