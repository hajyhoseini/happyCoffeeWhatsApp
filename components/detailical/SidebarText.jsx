import { useTheme } from '@/context/ThemeContext';
import { FaCoffee, FaClipboardList, FaSignInAlt, FaUserPlus, FaEnvelopeOpenText } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';

const SidebarText = ({ isOpen, setIsSidebarOpen }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`h-full transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      ${isDarkMode ? ' text-white bg-black/30' : ' text-black'}`}
      style={{
        backgroundImage: "url('/path/to/your/background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 10,
      }}
    >
      <div className="relative py-10 h-full overflow-y-auto">
        {/* اطلاعات پروفایل */}
        <div className="flex items-center justify-center space-x-6 sm:flex-col sm:space-x-0 sm:space-y-4">
          <img
            src="/image/userMy.webp"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform"
          />
          <div className="space-y-3 text-center">
            <h1 className={`text-lg rounded-lg px-8 py-4 font-semibold shadow-md transition-transform transform hover:scale-105  ${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800 backdrop-blur-sm' : 'text-black bg-yellow-700/95 hover:bg-yellow-600'}`}>
              نام کاربری : A.h.h
            </h1>
            <h1 className={`text-lg rounded-lg px-8 py-4 font-semibold shadow-md transition-transform transform hover:scale-105${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800 backdrop-blur-sm' : 'text-black bg-yellow-700/95 hover:bg-yellow-600'}`}>
              آیدی : 810804
            </h1>
          </div>
        </div>

        {/* بخش ناوبری */}
        <Nav className="d-flex flex-wrap sm:flex-row md:flex-col justify-between py-6">
          {/* هر آیتم ناوبری */}
          <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
            <Nav.Link
              href="/products"
              className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm' : 'text-black bg-yellow-600/70 hover:bg-yellow-600'} border-4 border-black shadow-lg hover:shadow-2xl hover:scale-105 transition-shadow duration-300`}
            >
              <FaCoffee className="text-red-600 bg-black text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">
                طعم‌ها
              </span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
            <Nav.Link
              href="/buyBasket"
              className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm' : 'text-black bg-yellow-600/70 hover:bg-yellow-600'} border-4 border-black shadow-lg hover:shadow-2xl hover:scale-105 transition-shadow duration-300`}
            >
              <FaClipboardList className="text-yellow-400 bg-black text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">
                سفارشات
              </span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
            <Nav.Link
              href="/login"
              className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm' : 'text-black bg-yellow-600/70 hover:bg-yellow-600'} border-4 border-black shadow-lg hover:shadow-2xl hover:scale-105 transition-shadow duration-300`}
            >
              <FaSignInAlt className="bg-black text-blue-500  text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">
                ورود
              </span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center  my-3">
            <Nav.Link
              href="/register"
              className={` rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all  border-black duration-200 hover:scale-105 ${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm' : 'text-black bg-yellow-600/70 hover:bg-yellow-600 border-black'} border-4 border-black shadow-lg hover:shadow-2xl hover:scale-105 transition-shadow duration-300`}
            >
              <FaUserPlus className="bg-black text-green-600  text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">
                ثبت‌نام
              </span>
            </Nav.Link>
          </Nav.Item>

          {/* دکمه به ما بپیوندید: در حالت موبایل به طور کامل ردیف سوم را بگیرد */}
          <Nav.Item className="w-full sm:w-full md:w-full text-center my-3">
            <Nav.Link
              href="/behappy"
              className={`rounded-2xl d-flex align-items-center justify-content-center  text-lg transform transition-all duration-200 hover:scale-105 ${isDarkMode ? 'text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm' : 'text-black bg-yellow-600/70 hover:bg-yellow-600'} border-4 border-black shadow-lg hover:shadow-2xl hover:scale-105 transition-shadow duration-300`}
            >
              <FaEnvelopeOpenText className="text-green-300 bg-black text-2xl" />
              <span className="ps-3   bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">
                به ما بپیوند
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default SidebarText;
