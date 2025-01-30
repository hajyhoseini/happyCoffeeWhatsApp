import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";  // Importing moon and sun icons

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`fixed space-x-6 top-4 md:left-4   text-white px-2 py-2 rounded-full z-50 shadow-lg ${isDarkMode? " hover:bg-black" : "hover:hover:bg-yellow-500"}  transition-all duration-300 flex items-center`}>
      <label className="relative inline-flex items-center cursor-pointer ">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          className="sr-only bg-black"
        />
        {/* Background of the switch */}
        <span className="w-16 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></span>
        {/* Dot that moves left/right */}
        <span
          className={`dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition ${
            isDarkMode ? 'translate-x-8 bg-blue-500' : 'translate-x-0'
          }`}
        ></span>
        {/* Sun icon */}
        <span
          className={`absolute left-1 top-1 text-2xl text-gray-800 dark:text-white transition ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
        >
          <FaSun />
        </span>
        {/* Moon icon */}
        <span
          className={`absolute right-1 top-1 text-2xl text-gray-800 dark:text-white transition ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
        >
          <FaMoon />
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
