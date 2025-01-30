import React from "react";
import { Carousel, Container, Card } from "react-bootstrap";
import { FaHotjar, FaCoffee, FaMugHot, FaGlassWhiskey, FaLeaf, FaCocktail, FaBeer } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext"; // استفاده از Context برای تم

const flavors = [
  { 
    name: "هات چاکلت", 
    icon: <FaHotjar className="text-yellow-700" />, 
    description: "با هر جرعه از هات چاکلت، شما دنیای شیرینی و گرما را در دل خود حس می‌کنید."
  },
  { 
    name: "نسکافه", 
    icon: <FaCoffee className="text-yellow-600" />, 
    description: "نسکافه، نوشیدنی‌ای که می‌تواند هر روز را به یک شروع تازه و انرژی‌بخش تبدیل کند."
  },
  { 
    name: "کاپوچینو", 
    icon: <FaMugHot className="text-red-500" />, 
    description: "کاپوچینو، ترکیبی از غلظت و لطافت، که برای هر لحظه از روز لذت‌بخش است."
  },
  { 
    name: "لاته", 
    icon: <FaGlassWhiskey className="text-white" />, 
    description: "لاته، انتخابی ملایم و کرمی که شما را به آرامش و لذت در هر فنجان می‌برد."
  },
  { 
    name: "ماسالا", 
    icon: <FaLeaf className="text-orange-500" />, 
    description: "ماسالا، با طعمی خاص و ترکیب ادویه‌های معطر، حس اصیل و سنتی هند را به ارمغان می‌آورد."
  },
  { 
    name: "اسپرسو", 
    icon: <FaCoffee className="text-stone-500" />, 
    description: "اسپرسو، غنی‌ترین طعم قهوه، انرژی و تمرکز را در هر قطره خود دارد."
  },
  { 
    name: "آمریکانو", 
    icon: <FaCocktail className="text-blue-400" />, 
    description: "آمریکانو، قهوه‌ای ساده و قوی که دل شما را با طعم‌های دلنشینش تسخیر می‌کند."
  },
  { 
    name: "موکا", 
    icon: <FaBeer className="text-green-600" />, 
    description: "موکا، ترکیب قهوه و شکلات، به شما تجربه‌ای شیرین و غنی می‌دهد."
  },
];

const BeHappyCarousel = () => {
  const { isDarkMode } = useTheme(); // استفاده از تم تاریک یا روشن

  return (
    <Container className="py-5 md:w-3/5">
      <h2
        className={`${
          isDarkMode ? "bg-yellow-900/95 text-white" : "text-black bg-yellow-700 backdrop-blur-lg"
        } text-4xl w-full text-center py-3 px-8 rounded-lg mb-4 shadow-lg`}
        style={{ textShadow: "2px 2px 5px rgba(255, 223, 0, 0.7)" }}
      >
        طعم‌های خوشمزه با هپی کافی!
      </h2>

      <Carousel
        className={`${
          isDarkMode ? "bg-dark text-white" : "bg-white text-black"
        } rounded-lg shadow-lg`}
      >
        {flavors.map((flavor, index) => (
          <Carousel.Item key={index} className="animate__animated animate__fadeIn">
            <Card
              className={`${
                isDarkMode ? "bg-yellow-800 text-white" : "bg-yellow-700 text-black"
              } text-center p-3 rounded-lg shadow-lg transition-all transform hover:scale-105`}
            >
              <Card.Body>
                {/* Title and Icon */}
                <Card.Title
                  className={`d-flex justify-content-center rounded-md align-items-center mb-4 min-w-min ${
                    isDarkMode ? "bg-black/60" : "bg-white/60"
                  }`}
                  style={{
                    textShadow: isDarkMode
                      ? "none"
                      : "2px 2px 8px rgba(255, 223, 0, 0.7)",
                  }}
                >
                  <div className="text-4xl me-3 transition-transform transform hover:scale-110">
                    {flavor.icon}
                  </div>
                  {flavor.name}
                </Card.Title>

                {/* Description */}
                <Card.Text
                  className={`${
                    isDarkMode
                      ? "bg-black/60 text-white"
                      : "bg-[#6F4F28] text-white"
                  } text-sm md:text-xl p-3 rounded-lg backdrop-blur-sm`}
                >
                  {flavor.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default BeHappyCarousel;
