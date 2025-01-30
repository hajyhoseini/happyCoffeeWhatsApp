import React, { createContext, useContext, useState, useEffect } from "react";

// ایجاد context
const CartContext = createContext();

// یک hook برای استفاده از context
export const useCart = () => {
  return useContext(CartContext);
};

// کامپوننت برای مدیریت سبد خرید
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // وقتی که کامپوننت لود می‌شود، سبد خرید از localStorage بارگذاری می‌شود
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addToCart = (productName, price, quantity) => {
    setCart((prevCart) => {
      // چک میکنیم که آیا محصول با همین نام قبلاً در سبد خرید موجود هست یا نه
      const existingProduct = prevCart.find(item => item.name === productName);

      if (existingProduct) {
        // اگر محصول موجود بود، تعدادش رو افزایش میدیم
        return prevCart.map(item =>
          item.name === productName ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // در غیر این صورت محصول جدید به سبد خرید اضافه میشه
        return [...prevCart, { name: productName, price, quantity }];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCart(cart.filter(item => item.name !== productName));
  };

  // وقتی که وضعیت سبد خرید تغییر می‌کند، آن را در localStorage ذخیره می‌کنیم
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
