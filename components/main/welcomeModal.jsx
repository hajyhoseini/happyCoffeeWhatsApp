import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaCoffee, FaHeart } from 'react-icons/fa';

const WelcomeModal = ({ handleCloseModal }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsBrowser(true); // فقط در سمت کلاینت

    // بررسی اینکه آیا کاربر قبلاً وارد سایت شده است یا نه
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      // اگر کاربر اولین بار است که وارد می‌شود، مدال نمایش داده می‌شود
      setShowModal(true);
      localStorage.setItem('hasVisitedBefore', 'true'); // ذخیره وضعیت بازدید کاربر
    }
  }, []);

  if (!isBrowser) {
    return null; // تا زمانی که در محیط مرورگر نباشیم، رندر نشود
  }

  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => {
          handleCloseModal();
          setShowModal(false); // بسته شدن مدال بعد از کلیک
        }}
        centered
        className="transition-all duration-500 ease-in-out transform scale-105"
      >
        <Modal.Header closeButton className="bg-brown-600 text-white border-0 shadow-lg rounded-t-xl">
          <Modal.Title className="text-lg font-semibold text-center w-full">
            <FaCoffee className="inline-block text-3xl mr-2 mb-1" /> {/* آیکون قهوه */}
            خوش آمدید به هپی کافی!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light-brown text-brown-900 p-8 rounded-b-xl shadow-2xl">
          <p>
            خوش آمدید به هپی کافی! اینجا جایی است که طعم واقعی قهوه را در هر جرعه حس خواهید کرد.
            امیدواریم لحظات خوبی را در کنار ما <span className="inline-flex items-center">تجربه کنید.</span>
          </p>

          <div className="flex justify-center mt-8">
            <Button
              variant="primary"
              onClick={() => {
                setShowModal(false); // برای بستن مدال بعد از کلیک
                handleCloseModal();
              }}
              className="bg-brown-700 flex hover:bg-brown-800 text-white font-medium py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              بفرمایید<FaHeart className="heart-pulse text-red-600 text-xl mr-2" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WelcomeModal;
