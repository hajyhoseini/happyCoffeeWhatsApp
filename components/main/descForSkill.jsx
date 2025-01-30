import React from "react";
import { Carousel, Container, Card, Button } from "react-bootstrap";
import {
  FaHotjar,
  FaCoffee,
  FaMugHot,
  FaGlassWhiskey,
  FaLeaf,
  FaCocktail,
  FaBeer,
} from "react-icons/fa"; // وارد کردن آیکون‌های مورد نظر از react-icons
import { useTheme } from "@/context/ThemeContext"; // استفاده از Context برای تم

const skills = [
  {
    name: "هات چاکلت",
    icon: <FaHotjar className="text-yellow-700" />,
    description:
      "هات چاکلت یک نوشیدنی داغ و دلپذیر است که از ترکیب پودر شکلات، شیر و گاهی خامه تهیه می‌شود. این نوشیدنی، گرمای دلنشینی را به فرد می‌دهد و معمولاً در روزهای سرد محبوب است. هات چاکلت با طعم شیرین و غنی خود شناخته می‌شود.",
    link: "https://fa.wikipedia.org/wiki/Hot_chocolate",
  },
  {
    name: "نسکافه",
    icon: <FaCoffee className="text-yellow-600" />,
    description:
      "نسکافه یک نوع قهوه فوری است که به سرعت در آب یا شیر حل می‌شود و به افراد این امکان را می‌دهد که بدون نیاز به دستگاه‌های پیچیده، قهوه‌ای با طعم غنی تهیه کنند. این نوشیدنی معمولاً به دلیل سرعت و راحتی در تهیه بسیار محبوب است.",
    link: "https://fa.wikipedia.org/wiki/Nescafé",
  },
  {
    name: "کاپوچینو",
    icon: <FaMugHot className="text-red-500" />,
    description:
      "کاپوچینو یک نوشیدنی قهوه‌ای است که از ترکیب قهوه اسپرسو، شیر بخار داده‌شده و کف شیر درست می‌شود. این نوشیدنی کلاسیک به خاطر طعم ملایم و لایه‌های نرم شیر شناخته شده است.",
    link: "https://fa.wikipedia.org/wiki/Cappuccino",
  },
  {
    name: "لاته",
    icon: <FaGlassWhiskey className="text-white" />,
    description:
      "لاته یک نوع قهوه است که از ترکیب قهوه اسپرسو و شیر بخار داده‌شده ساخته می‌شود. این نوشیدنی به دلیل طعم ملایم و کرمی‌اش و همچنین مقدار زیادی شیر نسبت به سایر قهوه‌ها محبوب است.",
    link: "https://fa.wikipedia.org/wiki/Latte",
  },
  {
    name: "ماسالا",
    icon: <FaLeaf className="text-orange-500" />,
    description:
      "چای ماسالا یک نوشیدنی هندی است که از ترکیب چای سیاه و ادویه‌جات معطر مانند دارچین، زنجبیل، هل، میخک و فلفل سیاه درست می‌شود. این نوشیدنی با طعم‌های پیچیده و معطر خود محبوبیت جهانی پیدا کرده است.",
    link: "https://fa.wikipedia.org/wiki/Masala_tea",
  },
  {
    name: "اسپرسو",
    icon: <FaCoffee className="text-stone-500" />,
    description:
      "اسپرسو یک نوع قهوه بسیار غلیظ و قوی است که در آن آب با فشار از میان دانه‌های آسیاب‌شده عبور می‌کند. این قهوه به دلیل طعم غنی و معطر خود، پایه‌گذار سایر نوشیدنی‌های قهوه است.",
    link: "https://fa.wikipedia.org/wiki/Espresso",
  },
  {
    name: "آمریکانو",
    icon: <FaCocktail className="text-blue-400" />,
    description:
      "آمریکانو یک نوشیدنی قهوه‌ای است که از ترکیب اسپرسو و آب داغ درست می‌شود. طعم این نوشیدنی شبیه به قهوه فیلتر است اما غلظت کمتری دارد.",
    link: "https://fa.wikipedia.org/wiki/Americano",
  },
  {
    name: "موکا",
    icon: <FaBeer className="text-green-600" />,
    description:
      "موکا یک نوع نوشیدنی قهوه است که از ترکیب اسپرسو، شیر بخار داده‌شده و شکلات درست می‌شود. این نوشیدنی با طعم شیرین و شکلاتی خود، به‌ویژه برای علاقه‌مندان به شکلات مناسب است.",
    link: "https://fa.wikipedia.org/wiki/Mocha",
  },
];

const DescForSkill = () => {
  const { isDarkMode } = useTheme(); // استفاده از تم تاریک یا روشن

  return (
    <Container className="py-5 md:w-3/5">
      <h2
        className={`${
          isDarkMode
            ? "bg-yellow-900/95 text-white"
            : " text-black bg-yellow-800/95"
        } text-4xl w-full text-center py-3 px-8 rounded-lg mb-4 shadow-lg`}
        style={{ textShadow: "2px 2px 5px rgba(255, 223, 0, 0.7)" }}
      >
        توضیح قهوه ها
      </h2>

      <Carousel
        className={`${
          isDarkMode
            ? "bg-dark"
            : "" // رنگ طلایی با بلر برای حالت روز
        }`}
       
      >
        {skills.map((skill, index) => (
          <Carousel.Item
            key={index}
            className="animate__animated animate__fadeIn"
          >
            <Card
              className={`${
                isDarkMode ? "bg-yellow-800 text-white" : "bg-yellow-700 text-black"
              } text-center p-3 rounded-lg shadow-lg transition-all transform hover:scale-105`}
            >
              <Card.Body>
                {/* عنوان و آیکون */}
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
                    {skill.icon}
                  </div>
                  {skill.name}
                </Card.Title>

                {/* توضیحات */}
                <Card.Text
                  className={`${
                    isDarkMode
                      ? "bg-black/60 text-white"
                      : "bg-[#6F4F28] text-white" // رنگ قهوه‌ای برای روز
                  } text-sm md:text-xl p-3 rounded-lg backdrop-blur-sm`} // بلر مشکی در حالت روز
                >
                  {skill.description}
                </Card.Text>

                {/* دکمه جزئیات بیشتر */}
             
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default DescForSkill;
