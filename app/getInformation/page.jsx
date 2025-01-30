"use client"
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();  // Initializing useRouter

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save form data to localStorage
        localStorage.setItem('userFormData', JSON.stringify(formData));
        localStorage.setItem('user', JSON.stringify(formData)); // ذخیره کردن اطلاعات کاربر برای لاگین

        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
            // Redirect to the "buyBasket" page after 2 seconds
            router.push('/buyBasket');
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className={`mt-6 bg-custom-image-myUser bg-cover bg-center h-64 w-full flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : ''}`}>
            <div className={`backdrop-blur-lg rounded-lg p-5 shadow-lg w-96 mb-40 lg:mb-36 ${isDarkMode ? 'bg-black/60' : 'bg-yellow-600/50'}`}>
                <h2 className={`text-3xl font-semibold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-brown-800'} shadow-xl rounded-md py-2 px-4 bg-gradient-to-r ${isDarkMode ? 'from-gray-800 to-gray-600' : 'from-orange-400 to-orange-500'} border-b-4 border-brown-900`}>
                    فرم اطلاعات مشتری
                </h2>

                <form onSubmit={handleSubmit} method="POST">
                    <div className="mb-4">
                        <label htmlFor="name" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>نام</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-300`}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>شماره تلفن</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-300`}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>آدرس</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-300`}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="city" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>شهر</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border-gray-300`}
                            required
                        />
                    </div>

                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className={`w-full p-2 rounded-lg text-white ${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-700'} hover:bg-yellow-600 transition duration-300`}
                        >
                            ثبت اطلاعات
                        </button>
                    </div>
                </form>

                {showAlert && (
                    <div className={`p-4 mb-4 text-center rounded-lg ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-black'}`}>
                        <FaCheck className="inline-block mr-2" />
                        اطلاعات شما با موفقیت ثبت شد!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
