import { useEffect } from "react";
const Modal = (props: { message: string; closeModal: () => {} }) => {
  useEffect(() => {
    setTimeout(() => {
      props.closeModal();
    }, 3000);
  });
  return <div>{props.message}</div>;
};

export default Modal;
