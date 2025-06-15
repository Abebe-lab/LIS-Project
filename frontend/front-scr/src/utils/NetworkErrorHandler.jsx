import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExecutePostWithParams } from "../services/api/ExecuteApiRequests";

let isToastDisplayed = false;
//prettier-ignore
const toastOptions = { position: toast.POSITION.TOP_RIGHT, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
  pauseOnFocusLoss: false, draggable: true, progress: undefined, onClose: () => { isToastDisplayed = false; },
};
const NetworkErrorHandler = ({ children }) => {
  axios.interceptors.response.use(
    response => {
      isToastDisplayed = false;
      return response;
    },
    error => {
      //console.log("error: ", error);
      if (!isToastDisplayed) {
        isToastDisplayed = true;

        let errorMessage = "An unknown error occurred. Please try again later.";
        let shouldLogout = false;

        if (error.code === "ECONNABORTED") {
          errorMessage = "The server is taking too long to respond. Please try again later.";
        } else if (error.code === "ERR_NETWORK") {
          errorMessage = "Unable to access the server. Please check your network connection.";
        } else if (error.code === "TOKEN_EXPIRED") {
          errorMessage = "Your session has expired. Please log in again.";
          shouldLogout = true;
        } else if (error.response) {
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        }

        toast.error(errorMessage, {
          ...toastOptions,
          onClose: () => {
            toastOptions.onClose();
            if (shouldLogout) handleTokenExpired();
          },
        });
      }
      return Promise.reject(error);
    },
  );

  axios.interceptors.request.use(
    config => {
      isToastDisplayed = false;
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      if (!isToastDisplayed) {
        isToastDisplayed = true;
        toast.error("Error in setting up the request. Please try again.", { ...toastOptions });
      }
      return Promise.reject(error);
    },
  );

  const handleTokenExpired = async () => {
    try {
      await ExecutePostWithParams("users/logout");
      ['user-id', 'token'].forEach(item => localStorage.removeItem(item));
    window.location.replace("/");
    } catch (logoutError) {
      console.error("Failed to logout on server:", logoutError);
    }    
  };

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default NetworkErrorHandler;
