"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaCoffee } from "react-icons/fa";
import CartSummary from "../detailical/buyBasket/CartSummary";
import EmptyCart from "../detailical/buyBasket/EmptyCart";
import PurchaseModal from "../detailical/buyBasket/PurchaseModal";
import CartItem from "../detailical/buyBasket/cartItem";


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
    checkLoginStatus();
    checkFormCompletion();
  }, []);

  // دکمه تکمیل خرید
  const handleCompletePurchaseClick = () => {
    setShowModal(true); // نمایش مدال
  };

  // تایید خرید
  const handleConfirm = () => {
    if (isLoggedIn) {
      const userFormData = JSON.parse(localStorage.getItem('userFormData'));
  
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
  
      const encodedMessage = encodeURIComponent(userMessage);
      const whatsappNumber = '989388780198'; // شماره واتساپ شما
      const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  
      // باز کردن لینک در پنجره جدید
      window.open(whatsappLink, '_blank');
  
      // حذف سبد خرید از localStorage و تنظیم مجدد سبد خرید
      localStorage.removeItem("cart");
      setCart([]);
  
      // ریدایرکت به صفحه اصلی بعد از 2 ثانیه
      setTimeout(() => {
        router.push("/");  // ریدایرکت به صفحه اصلی
      }, 2000);  // 2 ثانیه تاخیر
  
    } else {
      console.log("کاربر وارد سیستم نشده است.");
    }
  
    setShowModal(false); // بستن مدال
  };
  

  // محاسبه مجموع قیمت سبد خرید
  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <Container className="py-5 md:w-3/5">
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-center py-4 sm:py-3 md:py-4 px-6 sm:px-8 rounded-lg mb-4 sm:mb-6 shadow-xl transition-all ${
          isDarkMode ? "text-white bg-black/70 backdrop-blur-md" : "text-black font-bold bg-white/90"
        }`}
      >
        {cart.length === 0 ? "سبد خرید شما خالی است! چرا منتظرید؟ شروع به خرید کنید!" : "سبد خرید شما"}
        <FaCoffee size={40} className="inline-block mr-3" style={{ animation: "glow 1.5s ease-in-out infinite alternate", color: "#ffcc00" }} />
      </h2>

      {cart.length > 0 ? (
        <Card className={`text-center p-4 sm:p-5 md:p-6 rounded-xl shadow-xl transition-all transform hover:scale-105 ${isDarkMode ? "bg-yellow-800/70 text-white" : "bg-yellow-700/80 text-black"}`}>
          <Card.Body>
            <ul className="mb-4 sm:mb-5">
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  handleIncrease={addToCart}
                  handleDecrease={addToCart}
                  removeFromCart={removeFromCart}
                  isDarkMode={isDarkMode}
                />
              ))}
            </ul>
            <CartSummary totalAmount={totalAmount} isDarkMode={isDarkMode} />
            <Button variant="dark" className="px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-110 mt-4 sm:mt-6" onClick={handleCompletePurchaseClick}>
              تکمیل خرید
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <EmptyCart router={router} isDarkMode={isDarkMode} />
      )}

      <PurchaseModal showModal={showModal} handleConfirm={handleConfirm} setShowModal={setShowModal} isFormComplete={isFormComplete} />
    </Container>
  );
};

export default BuyBasket;
