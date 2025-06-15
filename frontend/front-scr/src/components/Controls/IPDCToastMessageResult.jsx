import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function IPDCToastMessageResult({ message, type }) {
  const showToast = () => {
    switch (type?.toLowerCase()) {
      case "success":
        return toast.success(message);
      case "error":
        return toast.error(message);
      case "info":
        return toast.info(message);
      case "warning":
        return toast.warning(message);
      default:
        return toast(message); // default style
    }
  };

  useEffect(() => {
    if (message) showToast();
  }, [message, type]);

  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      
      draggable
      pauseOnHover
    />
  );
}
