import React from "react";
import CustomModal from "../customModal";

const PurchaseModal = ({
  showModal,
  handleConfirm,
  setShowModal,
  isFormComplete,
}) => {
  return (
    <CustomModal
      show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleConfirm}
      isFormComplete={isFormComplete} // برای تغییر وضعیت دکمه‌ها
    />
  );
};

export default PurchaseModal;
