import { useEffect } from "react";
const Modal = (props: { message: string; closeModal: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.closeModal();
    }, 3000);
    return () => clearTimeout(timer);
  });
  return <div className="bg-green-200 px-3 py-3">{props.message}</div>;
};

export default Modal;
