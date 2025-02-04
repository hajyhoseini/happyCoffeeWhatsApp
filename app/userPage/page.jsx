"use client"
import { useUser } from '@/context/userContext';
import React from 'react';

const Page = () => {
  const { user } = useUser(); // دریافت اطلاعات کاربر

  return (
    <div className="user-page">
      <h2>خوش آمدید، {user.username}!</h2>

      {/* نمایش اطلاعات تخفیف */}
      <div className="discount">
        <h3>تخفیف شما: {user.discount}%</h3>
      </div>

      {/* نمایش سه خرید آخر */}
      <div className="last-purchases">
        <h3>خریدهای اخیر شما:</h3>
        <ul>
          {user.lastPurchases.map((purchase, index) => (
            <li key={index}>
              <p><strong>محصول:</strong> {purchase.item}</p>
              <p><strong>تاریخ خرید:</strong> {purchase.date}</p>
              <p><strong>قیمت:</strong> {purchase.price.toLocaleString()} تومان</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
