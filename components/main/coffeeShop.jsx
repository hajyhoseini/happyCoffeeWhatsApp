import React, { useState } from "react";
import { FaHotjar, FaCoffee, FaMugHot, FaGlassWhiskey, FaLeaf, FaCocktail, FaBeer } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

const flavors = [
  { name: "هات", icon: <FaHotjar className="text-yellow-800" />, bgColor: "bg-[#f5e1c7]/60" },
  { name: "نسکافه", icon: <FaCoffee className="text-yellow-400" />, bgColor: "bg-[#e6c39e]/60" },
  { name: "کاپوچینو", icon: <FaMugHot className="text-red-500" />, bgColor: "bg-[#f3e3c3]/60" },
  { name: "لاته", icon: <FaGlassWhiskey className="text-white" />, bgColor: "bg-[#d8c79d]/60" },
  { name: "ماسالا", icon: <FaLeaf className="text-orange-500" />, bgColor: "bg-[#f5e1c7]/60" },
  { name: "اسپرسو", icon: <FaCoffee className="text-gray-600" />, bgColor: "bg-[#f3e3c3]/60" },
  { name: "آمریکانو", icon: <FaCocktail className="text-blue-400" />, bgColor: "bg-[#d6a58d]/60" },
  { name: "موکا", icon: <FaBeer className="text-green-600" />, bgColor: "bg-[#e6c39e]/60" },
];

const CoffeeShop = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [selected, setSelected] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter(); // استفاده از روتر برای هدایت به صفحه سبد خرید

  const handleFlavorSelect = (flavorName) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [flavorName]: prevSelected[flavorName] ? prevSelected[flavorName] + 1 : 1,
    }));
  };

  const handleIncrease = (flavorName) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [flavorName]: prevSelected[flavorName] + 1,
    }));
  };

  const handleDecrease = (flavorName) => {
    if (selected[flavorName] > 1) {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [flavorName]: prevSelected[flavorName] - 1,
      }));
    }
  };

  const handleCompleteOrder = () => {
    Object.keys(selected).forEach((flavorName) => {
      const quantity = selected[flavorName];
      const flavor = flavors.find((f) => f.name === flavorName);
      if (flavor) {
        addToCart(flavor.name, 350000, quantity);
      }
    });

    setShowAlert(true);

    // اسکرول صفحه به بالا
    window.scrollTo({ top: 0, behavior: "smooth" });

    // آلارم را به مدت ۵ ثانیه نمایش می‌دهیم
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleGoToCart = () => {
    // هدایت به صفحه سبد خرید
    router.push("/buyBasket");
  };

  const handleCancelOrder = (flavorName) => {
    setSelected((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      delete updatedSelected[flavorName]; // حذف نوشیدنی انتخاب شده
      return updatedSelected;
    });
  };

  return (
    <section
      className={`relative max-w-4xl mx-auto p-8 w-full py-16 px-12 ${isDarkMode ? "text-white shadow-xl" : "text-black shadow-xl"}`}
    >
      <h3
        style={{ textShadow: "2px 2px 5px rgba(255, 223, 0, 0.7)" }}
        className={`${
          isDarkMode ? "bg-yellow-900 text-white" : "bg-yellow-600 text-black"
        } text-2xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 py-3 px-8 rounded-lg shadow-md`}
      >
        <span>چرا هپی کافی؟ چون هر فنجان، لبخندی است!</span>
        <div className="smiley-container">
          <span className="smiley">😊</span>
        </div>
      </h3>

      {/* Alert برای اطلاع دادن به کاربر */}
      {showAlert && (
        <div
          className="flex justify-center items-center p-6 mb-4 bg-white text-[#6A4E23] rounded-xl border-4 border-[#6A4E23] shadow-lg shadow-[#6A4E23]/40 transition-all transform hover:scale-105 hover:shadow-[#6A4E23]/50"
          role="alert"
        >
          <span className="mr-2 text-lg">☕</span>
          سفارش شما به سبد خرید منتقل شد!
          <Button
            variant="outline-dark"
            className="ml-4 py-2 px-4 rounded-lg bg-[#6A4E23] text-white hover:bg-[#4b3e2f] transition-all"
            onClick={handleGoToCart}
          >
            مشاهده سبد خرید
          </Button>
        </div>
      )}

      <Container className="d-flex justify-content-center">
        <Row
          className={`${
            isDarkMode ? "bg-yellow-800/95 text-white" : "bg-yellow-700/95 text-black"
          } justify-content-center w-100 rounded-lg shadow-md p-6 transition-all duration-700 ease-in-out hover:scale-105`}
        >
          <Col>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {flavors.map((flavor) => (
                <div
                  key={flavor.name}
                  className={`flex flex-col items-center justify-center text-center  p-4 ${flavor.bgColor} rounded-lg transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500`}
                  style={{ minHeight: "200px" }}
                >
                  <div
                    className={`text-5xl w- sm:text-4xl mb-3 transition-transform transform hover:scale-125 hover:rotate-3d ${
                      isDarkMode ? "text-yellow-500" : flavor.icon.props.className
                    } shadow-xl`}
                  >
                    {flavor.icon}
                  </div>
                  <p
                    className={`font-semibold text-4xl sm:text-lg mb-3 ${isDarkMode ? "text-white" : "text-black"} shadow-md`}
                  >
                    {flavor.name}
                  </p>

                  <p
                    className={`text-lg font-bold sm:text-lg mb-3 ${isDarkMode ? "text-white" : "text-gray-700"} shadow-sm`}
                  >
                  پک 20 عددی
                  </p>
                  <p
                    className={`text-lg sm:text-lg mb-3 ${isDarkMode ? "text-white" : "text-gray-700"} shadow-sm`}
                  >
                    350,000 تومان
                  </p>

                  {selected[flavor.name] ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-3">
                        <button
                          onClick={() => handleDecrease(flavor.name)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-500 text-white shadow-md transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400 transform hover:rotate-3d"
                        >
                          -
                        </button>
                        <span className="mx-4 text-xl">{selected[flavor.name]}</span>
                        <button
                          onClick={() => handleIncrease(flavor.name)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-500 text-white shadow-md transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400 transform hover:rotate-3d"
                        >
                          +
                        </button>
                      </div>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleCancelOrder(flavor.name)}
                        className="mt-4 w-full py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-110 bg-red-500 text-white"
                      >
                        انصراف
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleFlavorSelect(flavor.name)}
                      className="w-full py-2 px-4 rounded-lg transform hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center"
                    >
                      انتخاب
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Button
  variant="success"
  onClick={handleCompleteOrder}
  className="mt-8 w-full py-3 px-6 rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-xl font-semibold flex justify-center items-center"
>
  <span className="mr-2">✔️</span>
  تکمیل سفارش
</Button>
    </section>
  );
};

export default CoffeeShop;
