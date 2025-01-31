const CartSummary = ({ totalAmount, isDarkMode }) => {
    return (
      <div
        className={`mt-4 text-xl sm:text-2xl md:text-3xl font-bold ${
          isDarkMode ? "text-yellow-300" : "text-black"
        } bg-gradient-to-r ${isDarkMode ? "bg-black" : "bg-white"} rounded-lg p-4 sm:p-5 md:p-6 shadow-lg shadow-yellow-400`}
      >
        <span>مجموع خرید شما: </span>
        <span>{totalAmount.toLocaleString()} تومان</span>
      </div>
    );
  };
  
  export default CartSummary;
  