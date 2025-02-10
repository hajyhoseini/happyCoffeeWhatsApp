import React from 'react';  
import NavMenu from '../detailical/navMenu';
import DarkModeToggle from '../detailical/DarkModeToggle';
import { useTheme } from '@/context/ThemeContext'; // استفاده از context برای مدیریت حالت شب و روز

const HeaderAuth = () => {
  const { isDarkMode } = useTheme(); // دریافت وضعیت حالت شب و روز از context

  return (
    <header className={`w-full shadow-lg pb-10 ${isDarkMode ? " bg-custom-coffeeShop-img" : "bg-custom-header-img"} bg-cover bg-center fixed top-0 left-0 right-0 z-30`}>
      {/* بخش خوشامدگویی */}
      <div className={`relative ${isDarkMode ? "bg-black" : "bg-orange-600"} text-white text-center py-1 px-2 font-semibold text-xs sm:text-xs shadow-md z-10 max-w-screen-lg mx-auto rounded-xl overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-full  animate-lightning z-20"></div>
        <svg 
          className="absolute top-0 left-0 w-full h-full transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            fill="#FF7F50" 
            d="M0,128L1440,32L1440,320L0,320Z"
          />
        </svg>
        <p className={`${isDarkMode? "text-yellow-200":"text-white"} py-2  relative text-xs sm:text-xs lg:text-base font-extrabold text-gray-100 z-30{}`}>
          🎉 به "هپی کافی" خوش آمدید! 🎉 <br /> قهوه‌ی شما در انتظار است!
        </p>
      </div>

      {/* دکمه تغییر حالت شب و روز */}
      <DarkModeToggle />

      {/* محتوای مرکزی */}
      <div className="container mx-auto flex justify-center items-center px-3 sm:px-4">
        <div className="flex items-end text-center lg:text-left">
          <div className="mt-2 sm:mt-0 sm:ml-3 flex justify-center w-full">
            <div className={`bg-yellow-100  sm:p-0.5 rounded-2xl max-w-xs sm:max-w-sm mx-auto relative overflow-hidden transition-all duration-300 ease-in-out w-full ${isDarkMode ? "bg-yellow-800/80" : "bg-yellow-100/70"}`}>
              <div className="relative z-10 text-center sm:text-left">
                <h1 className={`text-base sm:text-base lg:text-lg py-4   font-extrabold ${isDarkMode ? "text-white " : "text-gray-800"}`}>
                  سلام، به دنیای خوشمزه "هپی کافی" خوش آمدید!
                </h1>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* منوی ناوبری */}
    </header>
  );
};

export default HeaderAuth;
