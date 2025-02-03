import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTimes, FaCheck, FaClipboardList } from "react-icons/fa";

const CustomModal = ({ show, onClose, onConfirm, isFormComplete }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="transition-all duration-500 ease-in-out transform scale-105">
      <Modal.Header className="bg-brown-600 text-white border-0 shadow-lg rounded-t-xl">
        <Modal.Title className="w-full flex justify-between items-center text-lg font-semibold">
          <span>تکمیل خرید</span>
          <FaTimes
            size={20}
            onClick={onClose}
            className="cursor-pointer hover:text-red-600"
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light-brown text-brown-900 p-8 rounded-b-xl shadow-2xl">
        <p>آیا مطمئنید که می‌خواهید فرآیند خرید خود را تکمیل کنید؟</p>
      </Modal.Body>
      <Modal.Footer className="w-full flex justify-center gap-4">
        {/* دکمه "تکمیل مشخصات" غیرفعال وقتی که فرم تکمیل شده است */}
        <Button
          variant="outline-info"
          href="/getInformation"
          className={`mx-2 bg-brown-700 hover:bg-brown-800 text-white font-medium py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
            isFormComplete ? "opacity-50 pointer-events-none" : ""
          }`}
          aria-label="تکمیل مشخصات"
        >
          <FaClipboardList className="text-xl text-white" />
          <span className="text-sm font-semibold">تکمیل مشخصات</span>
        </Button>

        {/* دکمه "تایید" فعال وقتی که فرم تکمیل شده است */}
        <Button
          variant="success"
          onClick={onConfirm}
          className={`mx-2 bg-brown-700 hover:bg-brown-800 text-white font-medium py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 ${
            isFormComplete ? "" : "opacity-50 pointer-events-none"
          }`}
        >
          <FaCheck className="mr-2 text-green-600" />
          تایید
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
