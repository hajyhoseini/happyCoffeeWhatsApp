import React from 'react';
import { FaHome, FaUser, FaCoffee, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link'; // وارد کردن Link از next/link
import { usePathname } from 'next/navigation'; // به جای useRouter از usePathname استفاده کنید

const NavMenu = () => {
  const { isDarkMode } = useTheme();
  const pathname = usePathname(); // استفاده از usePathname به جای useRouter

  const isActive = (path) => pathname === path; // مقایسه با مسیر فعلی

  return (
    <nav className={`w-full md:m-4 flex justify-center md:h-2/3 sticky top-8 ${isDarkMode ? "bg-[#2c1a14]" : "bg-[#603323]"}`} style={{ marginLeft: 'calc(100% / 6)' }}>
      <ul className={`grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 rounded-md shadow-lg w-full md:w-1/2 ${isDarkMode ? "bg-[#3e2c2a]" : "bg-[#6a4e2f]"}`}>
        <li className="flex items-center space-x-2 w-full">
          <Link
            href="/"
            className={`hover:bg-[#e8c8a5] hover:text-white px-4 py-2 bg-[#8e6a4d] rounded-md transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base md:text-lg w-full ${isDarkMode ? "text-white" : "text-black"} ${isActive('/') ? 'bg-[#f4a261] text-black' : ''}`}
          >
            <FaHome size={20} className={`transition-colors duration-300 me-1 ${isActive('/') ? 'text-[#2c3e50]' : 'text-[#f4a261]'}`} />
            <span className={`font-bold sm:text-base md:text-lg ${isActive('/') ? 'text-[#2c3e50]' : ''}`}>خانه</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 w-full">
          <Link
            href="/behappy"
            className={`hover:bg-[#e8c8a5] hover:text-white px-4 py-2 bg-[#8e6a4d] rounded-md transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base md:text-lg w-full ${isDarkMode ? "text-white" : "text-black"} ${isActive('/behappy') ? 'bg-[#f4a261] text-black' : ''}`}
          >
            <FaUser size={20} className={`transition-colors duration-300 me-1 ${isActive('/behappy') ? 'text-[#2c3e50]' : 'text-[#4343ff]'}`} />
            <span className={`font-bold sm:text-base md:text-lg ${isActive('/behappy') ? 'text-[#2c3e50]' : ''}`}>هپی باش</span>
          </Link>
        </li>
        
        <li className="flex hover:bg-[#e8c8a5] items-center space-x-2 w-full">
          <Link
            href="/products"
            className={`hover:bg-[#e8c8a5] hover:text-white px-4 py-2 bg-[#8e6a4d] rounded-md transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base md:text-lg w-full ${isDarkMode ? "text-white" : "text-black"} ${isActive('/products') ? 'bg-[#f4a261] text-black' : ''}`}
          >
            <FaCoffee size={20} className={`transition-colors duration-300 me-1 ${isActive('/products') ? 'text-[#2c3e50]' : 'text-[#f46161]'}`} />
            <span className={`font-bold text-sm sm:text-base md:text-lg ${isActive('/products') ? 'text-[#2c3e50]' : ''}`}>محصولات</span>
          </Link>
        </li>
        <li className="flex hover:bg-[#e8c8a5] items-center space-x-2 w-full">
          <Link
            href="/buyBasket"
            className={`hover:bg-[#e8c8a5] hover:text-white px-4 py-2 bg-[#8e6a4d] rounded-md transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base md:text-lg w-full ${isDarkMode ? "text-white" : "text-black"} ${isActive('/buyBasket') ? 'bg-[#f4a261] text-black' : ''}`}
          >
            <FaShoppingCart size={20} className={`transition-colors duration-300 me-1 ${isActive('/buyBasket') ? 'text-[#2c3e50]' : 'text-[#e7dcd9]'}`} />
            <span className={`font-bold text-sm sm:text-base md:text-lg ${isActive('/buyBasket') ? 'text-[#2c3e50]' : ''}`}>سبدخرید</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 w-full">
         
          
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
