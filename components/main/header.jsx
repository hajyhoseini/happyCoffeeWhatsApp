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
      <div className={`relative ${isDarkMode ? "bg-[#34495E]" : "bg-[#F4A261]"} text-white text-center py-1 px-4 font-semibold text-xs sm:text-sm shadow-lg z-10 max-w-screen-lg mx-auto rounded-xl overflow-hidden`}>
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
          <span style={{ fontFamily: 'Pacifico', fontSize: '1.5rem' }}>Happy Coffee</span>
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
     

      {/* منوی ناوبری */}
      <NavMenu />
    </header>
  );
};

export default Header;