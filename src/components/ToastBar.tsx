import { ToastContainer, Flip } from "react-toastify";

const ToastBar: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      draggable
      pauseOnHover
      theme="colored"
      transition={Flip}
    />
  );
};

export default ToastBar;
