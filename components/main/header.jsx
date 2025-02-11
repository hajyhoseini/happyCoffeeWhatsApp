import React, { useEffect, useState } from 'react';  
import NavMenu from '../detailical/navMenu';
import DarkModeToggle from '../detailical/DarkModeToggle';
import { useTheme } from '@/context/ThemeContext'; // استفاده از context برای مدیریت حالت شب و روز
import MobileButton from '../detailical/MobileButton';
import SidebarMain from './sidebarMain';

const Header = () => {
  const { isDarkMode } = useTheme(); // دریافت وضعیت حالت شب و روز از context
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);

      // در حالت دسکتاپ، سایدبار همیشه باز باشد
      if (!isNowMobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false); // در حالت موبایل پیش‌فرض بسته باشد
      }
    };

    handleResize(); // برای بار اول هم بررسی می‌کنیم
    window.addEventListener("resize", handleResize);

    // پاک کردن event listener هنگام unmount شدن کامپوننت
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className={`w-full shadow-lg ${isDarkMode ? " bg-custom-coffeeShop-img" : "bg-custom-header-img"} bg-cover bg-center fixed top-0 left-0 right-0 z-30`}>
      {/* بخش خوشامدگویی */}
      <div className={`relative ${isDarkMode ? "bg-[#34495E]" : "bg-[#F4A261]"} text-white text-center py-3 px-4 font-semibold text-xs sm:text-sm shadow-lg z-10 max-w-screen-lg mx-auto rounded-xl overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full  animate-lightning z-20"></div>
        <svg 
          className="absolute top-0 left-0 w-full h-full transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill="#F39C12" d="M0,128L1440,32L1440,320L0,320Z" />
        </svg>
        <p className={`${isDarkMode ? "text-gray-100" : "text-white"} relative text-xl lg:text-xl font-bold text-gray-100 z-30`}>
          <span role="img" aria-label="coffee" className="inline mr-2 text-4xl animate-pulse">☕</span>
          <span style={{ fontFamily: 'Pacifico', fontSize: '2rem' }}>Happy Coffee</span>
          <br />
          یک فنجان قهوه‌ی خوشمزه منتظر شماست! 
          <span role="img" aria-label="smile" className="inline ml-2 text-4xl animate-bounce"></span>
        </p>
      </div>
      {/* دکمه تغییر حالت شب و روز */}
      <DarkModeToggle />
      {isMobile && !isSidebarOpen && (
          <MobileButton setIsSidebarOpen={setIsSidebarOpen} />
        )}
           <SidebarMain 
        isMobile={isMobile} 
        isOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        isSidebarOpen={isSidebarOpen} 
      />
      {/* محتوای مرکزی */}
      <div className="container mx-auto flex justify-center items-center px-3 sm:px-4">
        <div className="flex items-end text-center lg:text-left">

          <div className="mt-2 sm:mt-0 sm:ml-3 flex justify-center w-full">
            <div className={`bg-yellow-100 p-1 sm:p-0.5 rounded-2xl max-w-xs sm:max-w-sm mx-auto relative overflow-hidden transition-all duration-300 ease-in-out w-full ${isDarkMode ? "bg-yellow-800/80" : "bg-yellow-100/80"}`}>
          
            </div>
          </div>
        </div>
      </div>

      {/* منوی ناوبری */}
      <NavMenu />
    </header>
  );
};

export default Header;