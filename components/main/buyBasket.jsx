"use client"
import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { FaCoffee } from "react-icons/fa";
import CustomModal from "../detailical/customModal";

const BuyBasket = () => {
  const { isDarkMode } = useTheme();
  const { cart, setCart, removeFromCart, addToCart } = useCart();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false); // وضعیت برای نمایش مدال
  const [isLoggedIn, setIsLoggedIn] = useState(false); // وضعیت لاگین
  const [isFormComplete, setIsFormComplete] = useState(false); // بررسی تکمیل فرم

  // چک کردن وضعیت لاگین از localStorage
  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // اگر کاربر وجود داشته باشد، لاگین است
  };

  // چک کردن وضعیت تکمیل فرم از localStorage
  const checkFormCompletion = () => {
    const userFormData = localStorage.getItem("userFormData");
    setIsFormComplete(!!userFormData); // اگر داده‌های فرم موجود باشد، فرم تکمیل شده است
  };

  useEffect(() => {
    checkLoginStatus(); // هنگام بارگذاری صفحه وضعیت لاگین را چک می‌کنیم
    checkFormCompletion(); // چک کردن وضعیت تکمیل فرم
  }, []);

  // دکمه تکمیل خرید
  const handleCompletePurchaseClick = () => {
    setShowModal(true); // نمایش مدال
  };

  // تایید خرید
  const handleConfirm = () => {
    if (isLoggedIn) {
      // دریافت اطلاعات فرم از localStorage
      const userFormData = JSON.parse(localStorage.getItem('userFormData'));

      // ساخت پیام شامل اطلاعات فرم و اقلام خرید
      const userMessage = `
          اطلاعات مشتری:
          نام: ${userFormData.name}
          شماره تلفن: ${userFormData.phone}
          آدرس: ${userFormData.address}
          شهر: ${userFormData.city}

          اقلام خرید:
          ${cart.map((item, index) => `${index + 1}. ${item.name} - ${item.quantity} عدد`).join('\n')}

          مجموع خرید: ${totalAmount.toLocaleString()} تومان
      `;

      // URL encode کردن پیام
      const encodedMessage = encodeURIComponent(userMessage);

      // شماره واتساپ مقصد
      const whatsappNumber = '989388780198'; // شماره واتساپ شما بدون صفر اول

      // لینک ارسال به واتساپ
      const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

      // ارسال پیام به واتساپ و باز کردن لینک
      window.open(whatsappLink, '_blank');  // باز کردن لینک در تب جدید
    }

    setShowModal(false); // بستن مدال
    router.push("/checkout"); // هدایت به صفحه تکمیل خرید (در صورت نیاز)
  };

  const handleIncrease = (productName) => {
    const product = cart.find(item => item.name === productName);
    if (product) {
      addToCart(productName, product.price, 1);
    }
  };

  const handleDecrease = (productName) => {
    const product = cart.find(item => item.name === productName);
    if (product && product.quantity > 1) {
      addToCart(productName, product.price, -1);
    }
  };

  // محاسبه مجموع قیمت سبد خرید
  const totalAmount = cart.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <Container className="py-5 md:w-3/5">
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-center py-4 sm:py-3 md:py-4 px-6 sm:px-8 rounded-lg mb-4 sm:mb-6 shadow-xl transition-all ${
          isDarkMode
            ? "text-white bg-black/70 backdrop-blur-md"
            : "text-black font-bold bg-white/90"
        }`}
      >
        {cart.length === 0
          ? "سبد خرید شما خالی است! چرا منتظرید؟ شروع به خرید کنید!"
          : "سبد خرید شما"}
        <FaCoffee
          size={40}
          className="inline-block mr-3"
          style={{
            animation: "glow 1.5s ease-in-out infinite alternate",
            color: "#ffcc00",
          }}
        />
      </h2>

      {cart.length > 0 ? (
        <Card
          className={`text-center p-4 sm:p-5 md:p-6 rounded-xl shadow-xl transition-all transform hover:scale-105 ${
            isDarkMode ? "bg-yellow-800/70 text-white" : "bg-yellow-700/80 text-black"
          }`}
        >
          <Card.Body>
            <ul className="mb-4 sm:mb-5">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className={`text-base sm:text-lg p-3 sm:p-4 my-2 rounded-md ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } border-2 border-gray-500 flex justify-between items-center`}
                >
                  <span>
                    {item.name} - {item.price} تومان - تعداد: {item.quantity}
                  </span>
                  <div className="flex items-center ml-4">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleDecrease(item.name)}
                      className="mr-2"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleIncrease(item.name)}
                      className="ml-2"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-4"
                    onClick={() => removeFromCart(item.name)}
                  >
                    حذف
                  </Button>
                </li>
              ))}
            </ul>

            <div
              className={`mt-4 text-xl sm:text-2xl md:text-3xl font-bold ${
                isDarkMode ? "text-yellow-300" : "text-black"
              } bg-gradient-to-r ${isDarkMode ? " bg-black" : " bg-white"} rounded-lg p-4 sm:p-5 md:p-6 shadow-lg shadow-yellow-400`}
            >
              <span>مجموع خرید شما: </span>
              <span>{totalAmount.toLocaleString()} تومان</span>
            </div>

            <Button
              variant="dark"
              className="px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-110 mt-4 sm:mt-6"
              onClick={handleCompletePurchaseClick} // اینجا مدال را نشان می‌دهیم
            >
              تکمیل خرید
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card
          className={`text-center p-4 sm:p-5 md:p-6 rounded-xl shadow-xl transition-all transform hover:scale-105 ${
            isDarkMode ? "bg-yellow-800 text-white" : "bg-yellow-700 text-black"
          }`}
        >
          <Card.Body>
            <h3
              className={`rounded-md mb-4 sm:mb-5 flex justify-center items-center text-xl sm:text-2xl md:text-3xl ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <FaCoffee size={30} className="mr-2 text-yellow-400" />
              چرا منتظرید؟ شروع به خرید کنید!
            </h3>
            <p className="mb-4 md:text-base leading-relaxed">
              همین حالا قهوه مورد علاقه‌تان را انتخاب کرده و از طعم بی‌نظیر آن لذت ببرید.
            </p>
            <Button
              variant="dark"
              className="px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-110"
              onClick={() => router.push("/products")} // هدایت به صفحه محصولات
            >
              خرید قهوه
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* استفاده از کامپوننت مدال */}
      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)} // بستن مدال
        onConfirm={handleConfirm} // تایید خرید
        isFormComplete={isFormComplete} // وضعیت تکمیل فرم
      />
    </Container>
  );
};

export default BuyBasket;
