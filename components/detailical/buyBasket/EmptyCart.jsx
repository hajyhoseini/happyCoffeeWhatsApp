import { Button, Card } from "react-bootstrap";
import { FaCoffee } from "react-icons/fa";

const EmptyCart = ({ router, isDarkMode }) => {
  return (
    <Card
      className={`text-center p-4 sm:p-5 md:p-6 rounded-xl shadow-xl transition-all transform hover:scale-105 ${
        isDarkMode ? "bg-yellow-800 text-white" : "bg-yellow-700 text-black"
      }`}
    >
      <Card.Body>
        <h3
          className={`rounded-md mb-4 sm:mb-5 flex justify-center items-center text-xl sm:text-2xl md:text-3xl ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <FaCoffee size={30} className="mr-2 text-yellow-400" />
          چرا منتظرید؟ شروع به خرید کنید!
        </h3>
        <p className="mb-4 md:text-base leading-relaxed">
          همین حالا قهوه مورد علاقه‌تان را انتخاب کرده و از طعم بی‌نظیر آن لذت ببرید.
        </p>
        <Button
          variant="dark"
          className="px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-110"
          onClick={() => router.push("/products")} // هدایت به صفحه محصولات
        >
          خرید قهوه
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmptyCart;
