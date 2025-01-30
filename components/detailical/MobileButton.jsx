import React, { useState } from 'react';
import { FaCoffee } from 'react-icons/fa'; // آیکون فنجان قهوه از Font Awesome

const MobileButton = ({ setIsSidebarOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true); // فعال کردن انیمیشن قهوه
    setTimeout(() => {
      setIsAnimating(false); // بعد از انیمیشن قهوه
      setIsSidebarOpen(true); // باز کردن سایدبار
    }, 600); // مدت زمان انیمیشن قهوه
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 left-4 bg-yellow-700 text-white px-3 py-2 rounded-full z-50 shadow-lg hover:bg-yellow-500 transition-all duration-300 flex items-center"
    >
      <FaCoffee className={isAnimating ? 'coffee-tilt' : ''} size={22} /> {/* تغییر اندازه آیکون */}
    </button>
  );
};

export default MobileButton;
