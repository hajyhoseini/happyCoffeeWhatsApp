import React from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { FaHotjar, FaCoffee, FaMugHot, FaGlassWhiskey, FaLeaf, FaCocktail, FaBeer } from "react-icons/fa"; // آیکون‌های قهوه
import { useTheme } from "@/context/ThemeContext"; // استفاده از Context برای تم

const flavors = [
  { name: "هات " , icon: <FaHotjar className="text-yellow-950 animate-flash" />, level: 90 },
  { name: "نسکافه", icon: <FaCoffee className="text-yellow-500 animate-flash" />, level: 85 },
  { name: "کاپوچینو", icon: <FaMugHot className="text-red-500 animate-flash" />, level: 90 },
  { name: "لاته", icon: <FaGlassWhiskey className="text-yellow-400 animate-flash" />, level: 75 },
  { name: "ماسالا", icon: <FaLeaf className="text-orange-500 animate-flash" />, level: 80 },
  { name: "اسپرسو", icon: <FaCoffee className="text-gray-500 animate-flash" />, level: 85 },
  { name: "آمریکانو", icon: <FaCocktail className="text-blue-400 animate-flash" />, level: 75 },
  { name: "موکا", icon: <FaBeer className="text-green-600 animate-flash" />, level: 80 },
];

const Tastes = () => {
  const { isDarkMode } = useTheme(); // استفاده از تم تاریک یا روشن

  return (
    <section
      id="skills"
      className={`relative max-w-3xl mx-auto rounded-lg p-5 w-full py-16 px-10 ${
        isDarkMode
          ? " text-white"
          : " text-black"
      } shadow-lg transition-all duration-500`}
    >
      <h3  style={{ textShadow: "2px 2px 5px rgba(255, 223, 0, 0.7)" }}        className={`${
          isDarkMode ? "bg-yellow-900/95 text-white" : "bg-yellow-800/95 text-black"
        } text-3xl md:text-4xl font-extrabold text-center mb-12 shadow-md py-3 px-8 rounded-lg transition-all duration-500 transform hover:scale-105`}
      >
        طعم‌ها و میزان رضایت
      </h3>

      <Container className="d-flex justify-content-center">
        <Row
          className={`${
            isDarkMode ? "bg-yellow-800/80 text-white" : "bg-yellow-700/80 text-black"
          } justify-content-center w-100 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-in-out hover:scale-105`}
        >
          {flavors.map((flavor) => {
            // انتخاب رنگ نوار پیشرفت بر اساس سطح
            const barColor =
              flavor.level > 80
                ? "success"
                : flavor.level > 60
                ? "warning"
                : "danger";

            return (
              <Col
                key={flavor.name}
                xs={6}
                sm={4}
                lg={4}
                className="d-flex flex-column align-items-center text-center text-lg mb-5"
              >
                <div
                  className="text-6xl lg:text-8xl mb-4 transition-transform transform hover:scale-110"
                >
                  {flavor.icon} {/* رنگ آیکون ثابت است */}
                </div>

                <p
                  className={`font-semibold text-xl mb-4 transition-all duration-500 ease-in-out ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {flavor.name}
                </p>

                <ProgressBar
                  now={flavor.level * 0.75} // اندازه نوار درجه به سه چهارم کاهش یافته است
                  variant={barColor}
                  className="w-100"
                  style={{ height: "10px", borderRadius: "20px" }}
                />

                <div
                  className={`text-lg mt-2 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {flavor.level}%
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Tastes;
