import React from "react";
import { FaCoffee, FaSmile } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const HappySection = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center mb-8">
      {/* Header with Icon */}
      <div className="flex justify-center mb-4 items-center">
        <h2
          className={`theme-header ${
            isDarkMode
              ? "bg-[#6D4C41] text-white backdrop-blur-sm"
              : "bg-[#D9C9A1] text-gray-800"
          } text-2xl md:text-4xl font-extrabold py-4 px-8 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 transform hover:translate-y-1`}
        >
          <FaCoffee
            className={`inline-block mr-3 text-5xl transition-all duration-300 ease-in-out transform hover:text-yellow-500 hover:scale-110 shadow-2xl ${
              isDarkMode ? "text-yellow-400" : "text-[#6F4F28]"
            }`}
          />
          همراه با هپی کافی، همیشه خوشحال باشید!
          <FaSmile
            className={`inline-block ml-3 text-5xl transition-all duration-300 ease-in-out transform hover:text-[#D2691E] hover:scale-110 shadow-2xl ${
              isDarkMode ? "text-[#d7b780]" : "text-[#6F4F28]"
            } animate-spinMove`} // انیمیشن چرخش و حرکت افقی
          />
        </h2>
      </div>

      {/* Content */}
      <p
        className={`theme-text ${
          isDarkMode
            ? "bg-[#5D4037] text-white backdrop-blur-sm"
            : "bg-[#F4E1C1] text-gray-800"
        } text-lg md:text-xl leading-relaxed p-4 rounded-lg md:w-2/4 shadow-md transition-all duration-500`}
      >
NEXT_PUBLIC_SUPABASE_URL=https://ymtlhrkazymcesiehmmf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdGxocmthenltY2VzaWVobW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDMyMzMsImV4cCI6MjA1NDAxOTIzM30.F8rjfxNatt7ax0jheUREH5ccknSPJ41z7L4KjluDqvE

      </p>
    </div>
  );
};

export default HappySection;
