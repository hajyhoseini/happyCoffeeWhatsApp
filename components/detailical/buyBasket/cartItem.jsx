import { Button } from "react-bootstrap";

const CartItem = ({ item, handleIncrease, handleDecrease, removeFromCart, isDarkMode }) => {
  return (
    <li
      className={`text-base sm:text-lg p-3 sm:p-4 my-2 rounded-md ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } border-2 border-gray-500 flex justify-between items-center`}
    >
      <span>
        {item.name} - {item.price} تومان - تعداد: {item.quantity}
      </span>
      <div className="flex items-center ml-4">
        <Button
          variant="warning"
          size="sm"
          onClick={() => handleDecrease(item.name)}
          className="mr-2"
        >
          -
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="warning"
          size="sm"
          onClick={() => handleIncrease(item.name)}
          className="ml-2"
        >
          +
        </Button>
      </div>
      <Button
        variant="danger"
        size="sm"
        className="ml-4"
        onClick={() => removeFromCart(item.name)}
      >
        حذف
      </Button>
    </li>
  );
};

export default CartItem;
