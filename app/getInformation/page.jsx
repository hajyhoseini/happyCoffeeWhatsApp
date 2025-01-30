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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="نام خود را وارد کنید"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>شماره تلفن</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="شماره تلفن خود را وارد کنید"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="آدرس خود را وارد کنید"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="city" className={`block font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>شهر</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="شهر خود را وارد کنید"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        ارسال اطلاعات
                    </button>
                </form>
            </div>

            {/* alert */}
            {showAlert && (
                <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-5 rounded-lg flex items-center gap-3 transition-all duration-500 ease-out scale-105 shadow-2xl opacity-100 ${isDarkMode ? 'bg-yellow-700/90 text-white' : 'bg-yellow-500/80 text-white'}`}>
                    <FaCheck className={`text-green-500 `} size={20} />
                    <span className="font-semibold">اطلاعات با موفقیت ثبت شد!</span>
                </div>
            )}

        </div>
    );
}

export default Page;
