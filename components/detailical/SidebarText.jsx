import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaSignOutAlt } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import { createClient } from "@supabase/supabase-js";
import { FaCoffee, FaClipboardList, FaSignInAlt, FaUserPlus, FaEnvelopeOpenText } from "react-icons/fa";
import { useRouter } from "next/navigation";

// ایجاد ارتباط با سوپابیس
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const SidebarText = ({ isOpen }) => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/image/defaultProfile.webp"); // تصویر پیش‌فرض
  const router = useRouter(); // استفاده از router برای هدایت به صفحه لاگین

  useEffect(() => {
    if (typeof window !== "undefined") {
      // دریافت اطلاعات از localStorage
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");

      if (isLoggedIn && username && email) {
        setUser({ username, email });
        // فراخوانی برای دریافت تصویر پروفایل از سوپابیس
        getProfileImage(email);
      }
    }
  }, []);

  // دریافت تصویر پروفایل از سوپابیس
  const getProfileImage = async (email) => {
    try {
      const { data, error } = await supabase
        .from("register") // استفاده از جدول "register" برای دریافت اطلاعات
        .select("profile_image") // انتخاب فقط ستون تصویر پروفایل
        .eq("email", email) // جستجو بر اساس ایمیل
        .single(); // دریافت یک رکورد

      if (error) {
        console.error("خطا در دریافت تصویر پروفایل:", error.details || error.message); // چاپ پیام خطا
      } else {
        setProfileImage(data.profile_image || "/image/defaultProfile.webp"); // اگر تصویری وجود نداشت، تصویر پیش‌فرض
      }
    } catch (err) {
      console.error("خطا در دریافت تصویر پروفایل:", err.message); // چاپ خطاهای احتمالی
    }
  };

  // تابع خروج از حساب
  const handleLogout = () => {
    // پاک کردن اطلاعات از localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  
    // پاکسازی تصویر پروفایل
    setProfileImage("/image/defaultProfile.webp");
  
    // تنظیم حالت کاربر به null
    setUser(null);
  };

  // تابع هدایت به صفحه ورود
  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div
      className={`h-full transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} ${
        isDarkMode ? "text-white bg-black/30" : "text-black"
      }`}
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
        <div className="flex items-center justify-center space-x-6 sm:flex-col sm:space-x-0 sm:space-y-4 mb-2">
          <img
            src={user ? profileImage : "/image/userMy.webp"} // تصویر پروفایل
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform"
            style={{
              backgroundImage: user ? "none" : "url('/image/defaultProfileBackground.webp')", // پس‌زمینه زمانی که کاربر وارد نشده باشد
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="space-y-1 flex flex-col justify-center items-center">
          {user ? (
            <>
              <h1
                className={`w-max  text-lg rounded-lg px-8 py-4 font-semibold shadow-md transition-transform transform hover:scale-105 ${
                  isDarkMode
                    ? "text-white hover:bg-brown-700 bg-brown-800 backdrop-blur-sm"
                    : "text-black bg-yellow-700/95 hover:bg-yellow-600"
                }`}
              >
                نام کاربری : {user.username}
              </h1>
              <h1
                className={`w-max text-xl  lg:text-xs rounded-lg px-8 py-4 font-semibold shadow-md transition-transform transform hover:scale-105 ${
                  isDarkMode
                    ? "text-white hover:bg-brown-700 bg-brown-800 backdrop-blur-sm"
                    : "text-black bg-yellow-700/95 hover:bg-yellow-600"
                }`}
              >
                ایمیل : {user.email}
              </h1>
  
              {/* دکمه خروج */}
              <button
                onClick={handleLogout}
                className={`w-max text-lg rounded-lg px-8 py-4 font-semibold shadow-md transition-transform transform hover:scale-105 ${
                  isDarkMode
                    ? "text-white bg-red-600 hover:bg-red-500"
                    : "text-black bg-red-500 hover:bg-red-400"
                }`}
              >
                خروج از حساب
              </button>
            </>
          ) : (
            <div className="text-center">
              <h1
                className={`w-max text-lg rounded-lg px-8 py-4 font-semibold shadow-md transition-transform transform hover:scale-105 ${
                  isDarkMode
                    ? "text-white hover:bg-brown-700 bg-brown-800 backdrop-blur-sm"
                    : "text-black bg-yellow-700/95 hover:bg-yellow-600"
                }`}
              >
                <span
                  onClick={handleLoginRedirect}
                  className={`cursor-pointer ${isDarkMode? " text-white border-b-2 border-white":" text-black border-b-2 border-black"}`}
                >
                  کاربر موجود نیست. لطفا وارد حساب خود شوید.
                </span>
              </h1>
            </div>
          )}
        </div>
  
        {/* بخش ناوبری */}
        <Nav className="d-flex flex-wrap sm:flex-row md:flex-col justify-between py-6">
          <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
            <Nav.Link
              href="/products"
              className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${
                isDarkMode ? "text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm" : "text-black bg-yellow-600/70 hover:bg-yellow-600"
              } border-4 border-black shadow-lg hover:shadow-2xl`}
            >
              <FaCoffee className="text-red-600 bg-black text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">طعم‌ها</span>
            </Nav.Link>
          </Nav.Item>
  
          <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
            <Nav.Link
              href="/buyBasket"
              className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${
                isDarkMode ? "text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm" : "text-black bg-yellow-600/70 hover:bg-yellow-600"
              } border-4 border-black shadow-lg hover:shadow-2xl`}
            >
              <FaClipboardList className="text-yellow-400 bg-black text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">سفارشات</span>
            </Nav.Link>
          </Nav.Item>
  
          <Nav.Item className="w-full sm:w-full md:w-full text-center my-3">
            <Nav.Link
              href="/behappy"
              className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${
                isDarkMode ? "text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm" : "text-black bg-yellow-600/70 hover:bg-yellow-600"
              } border-4 border-black shadow-lg hover:shadow-2xl`}
            >
              <FaEnvelopeOpenText className="text-green-300 bg-black text-2xl" />
              <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">به ما بپیوند</span>
            </Nav.Link>
          </Nav.Item>
  
          {!user ? (
            <>
              <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
                <Nav.Link
                  href="/login"
                  className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all duration-200 hover:scale-105 ${
                    isDarkMode ? "text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm" : "text-black bg-yellow-600/70 hover:bg-yellow-600"
                  } border-4 border-black shadow-lg hover:shadow-2xl`}
                >
                  <FaSignInAlt className="bg-black text-blue-500 text-2xl" />
                  <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">ورود</span>
                </Nav.Link>
              </Nav.Item>
  
              <Nav.Item className="flex-1 sm:w-1/2 md:w-full text-center my-3">
                <Nav.Link
                  href="/register"
                  className={`rounded-2xl d-flex align-items-center justify-content-center text-lg transform transition-all border-black duration-200 hover:scale-105 ${
                    isDarkMode ? "text-white hover:bg-brown-700 bg-brown-800/80 backdrop-blur-sm" : "text-black bg-yellow-600/70 hover:bg-yellow-600 border-black"
                  } border-4 border-black shadow-lg hover:shadow-2xl`}
                >
                  <FaUserPlus className="bg-black text-green-600 text-2xl" />
                  <span className="ps-3 bg-yellow-700 rounded-lg px-6 py-3 font-medium ms-2">ثبت‌نام</span>
                </Nav.Link>
              </Nav.Item>
            </>
          ) : null}
        </Nav>
      </div>
    </div>
  );
};

export default SidebarText;
