import React, { createContext, useState, useContext } from 'react';

// ایجاد context برای اطلاعات کاربر
const UserContext = createContext();

// ایجاد پروایدر برای context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Ali', // نام کاربری
    lastPurchases: [
      { item: 'کاپوچینو', date: '2025-01-15', price: 350000 },
      { item: 'لاته', date: '2025-01-10', price: 320000 },
      { item: 'نسکافه', date: '2025-01-05', price: 300000 }
    ],
    discount: 10, // درصد تخفیف
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook برای استفاده از context
export const useUser = () => useContext(UserContext);
