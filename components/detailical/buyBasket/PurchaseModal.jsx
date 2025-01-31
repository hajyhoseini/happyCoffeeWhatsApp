import CustomModal from "../customModal";

const PurchaseModal = ({ showModal, handleConfirm, setShowModal, isFormComplete }) => {
  return (
    <CustomModal
      show={showModal}
      onClose={() => setShowModal(false)} // بستن مدال
      onConfirm={handleConfirm} // تایید خرید
      isFormComplete={isFormComplete} // وضعیت تکمیل فرم
    />
  );
};

export default PurchaseModal;
