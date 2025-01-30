"use client";
import React from 'react';
import { FaHotjar, FaCoffee, FaMugHot, FaGlassWhiskey, FaLeaf, FaCocktail, FaBeer, FaPhone, FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useTheme } from "@/context/ThemeContext"; 
import BeHappyCarousel from '../detailical/happy/happyCarousel';
import HappySection from '../detailical/happy/HappySection ';
import ContactButtons from '../detailical/happy/contactButton';

const BeHappy = () => {
    const { isDarkMode, toggleTheme } = useTheme(); 

    const flavors = [
        { name: "هات چاکلت", icon: <FaHotjar className="text-yellow-800" /> },
        { name: "نسکافه", icon: <FaCoffee className="text-yellow-600" /> },
        { name: "کاپوچینو", icon: <FaMugHot className="text-red-500" /> },
        { name: "لاته", icon: <FaGlassWhiskey className="text-gray-400" /> },
        { name: "ماسالا", icon: <FaLeaf className="text-orange-500" /> },
        { name: "اسپرسو", icon: <FaCoffee className="text-gray-600" /> },
        { name: "آمریکانو", icon: <FaCocktail className="text-blue-400" /> },
        { name: "موکا", icon: <FaBeer className="text-green-600" /> },
    ];

    return (
        <div className={`text-center-padding ${isDarkMode ? 'bg-black/70 text-white' : 'bg-white/0 text-black'} transition-all duration-500`}>
            {/* Header with theme toggle */}
          <HappySection/>
         <ContactButtons/>
            {/* Gallery of Coffee Flavors */}
            <div className="mb-8">
              
               <BeHappyCarousel/>
            </div>

            {/* Contact buttons */}
            
        </div>
    );
}

export default BeHappy;
