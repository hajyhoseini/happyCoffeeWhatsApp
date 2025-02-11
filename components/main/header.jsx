import React, { useEffect, useState } from 'react';  
import NavMenu from '../detailical/navMenu';
import DarkModeToggle from '../detailical/DarkModeToggle';
import { useTheme } from '@/context/ThemeContext'; 
import MobileButton from '../detailical/MobileButton';
import SidebarMain from './sidebarMain';
import { FaCoffee } from 'react-icons/fa'; 

// وارد کردن فونت Pacifico
import 'typeface-pacifico';

const Header = () => {
  const { isDarkMode } = useTheme(); 
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setIsSidebarOpen(true); // در حالت دسکتاپ سایدبار همیشه باز باشد
    };

    handleResize(); // برای بار اول هم بررسی می‌کنیم
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`w-full shadow-2xl transition-all duration-500 ${isDarkMode ? "bg-gradient-to-r from-[#2F3A47] to-[#4E5C67]" : "bg-gradient-to-r from-[#F39C12] to-[#D47B2D]"} bg-cover bg-center fixed top-0 left-0 right-0 z-30`}
    >
      {/* خوشامدگویی با افکت روشنایی */}
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
  
      {/* دکمه موبایل برای باز و بسته کردن سایدبار */}
      {isMobile && !isSidebarOpen && (
        <MobileButton setIsSidebarOpen={setIsSidebarOpen} />
      )}
  
      {/* سایدبار */}
      <SidebarMain 
        isMobile={isMobile} 
        isOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />
  
      {/* منوی ناوبری */}
      <NavMenu />
    </header>
  );
};

export default Header;
