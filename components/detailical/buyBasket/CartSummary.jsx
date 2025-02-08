const CartSummary = ({ totalAmount, totalItems, isDarkMode }) => {
  return (
    <div
      className={`mt-4 text-xl sm:text-2xl md:text-3xl font-bold ${
        isDarkMode ? "text-yellow-300" : "text-black"
      } bg-gradient-to-r ${isDarkMode ? "bg-black" : "bg-white"} rounded-lg p-4 sm:p-5 md:p-6 shadow-lg shadow-yellow-400`}
    >
      <div>{`مجموع اقلام خرید: ${totalItems} عدد`}</div>
      <div>{`مجموع خرید شما: ${totalAmount.toLocaleString()} تومان`}</div>
    </div>
  );
};

export default CartSummary;
