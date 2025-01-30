"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import WelcomeModal from "./welcomeModal";
import { useTheme } from "@/context/ThemeContext";
import { FaCoffee } from "react-icons/fa"; // اضافه کردن آیکون قهوه

const Description = () => {
  const [showModal, setShowModal] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // استفاده از Intersection Observer برای شناسایی ظاهر شدن متن
  useEffect(() => {
    const target = document.querySelector("#warmText");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* مدال */}
      <WelcomeModal showModal={showModal} handleCloseModal={handleCloseModal} />

      {/* محتوا */}
      <section
        id="skills"
        className={`relative max-w-3xl mx-auto rounded-xl p-8 w-full py-16 px-12 ${
          isDarkMode ? " text-white shadow-xl" : " text-black shadow-xl"
        }`}
      >
        <h3
         style={{ textShadow: "2px 2px 5px rgba(255, 223, 0, 0.7)" }}
          className={`${
            isDarkMode ? "bg-yellow-900/95 text-white" : "bg-yellow-800/95 text-black"
          } text-2xl md:text-4xl font-extrabold text-center mb-12 shadow-md py-3 px-8 rounded-lg transition-all duration-500 transform hover:scale-105 flex justify-center flex-col items-center space-x-2`}
        >
          <span>چرا هپی کافی؟ چون هر فنجان، لبخندی است! </span>
          <div className="smiley-container">
            <span className="smiley">😊</span>
          </div>
        </h3>

        <Container className="d-flex justify-content-center">
          <Row
            className={`${
              isDarkMode ? "bg-yellow-800/95 text-white" : "bg-yellow-700/95 text-black"
            } justify-content-center w-100 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-in-out hover:scale-105`}
          >
            <Col>
              <p className="md:text-lg text-center leading-relaxed transition-all duration-500 ease-in-out">
                در <strong>هپی کافی</strong>، هر فنجان قهوه بیشتر از یک نوشیدنی است؛ یک تجربه خوشایند که روز شما را بهتر می‌کند. با بهترین دانه‌های قهوه، ما هدف داریم هر جرعه لبخند و لحظات خوشی را برای شما بیاوریم. چرا که اعتقاد داریم: <strong>هر فنجان قهوه، یک لبخند است.</strong> ☕💛
                <span
                  id="warmText"
                  className={`${isVisible ? "animateWarmText" : ""} ${
                    isDarkMode ? "text-white" : "text-black"
                  } transition-all duration-500 ease-in-out`}
                >
                  دمتان گرم!
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Description;
