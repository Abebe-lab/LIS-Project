import { useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { UserContext } from "./services/contexts/UserContext";
import UserContextProvider from "./services/contexts/UserContextProvider";
import LoginUI from "./pages/Auth/LoginUI";
import GetRoutesBasedOnUser from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NetworkErrorHandler from "./utils/NetworkErrorHandler";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const { isLoggedIn, user, logout } = useContext(UserContext);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    const getSubscription = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const serviceWorker = await navigator?.serviceWorker?.getRegistration(
            "/", // Replace with your service worker scope if different
          );
          const pushSubscription = await serviceWorker?.pushManager?.getSubscription();
          if (pushSubscription) setSubscription(pushSubscription);
        } catch (error) {
          console.error("Error getting push subscription:", error);
        }
      }
    };

    getSubscription();
    // Token expiration check
    const checkTokenExpiration = () => {
      if (isLoggedIn && user) {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
          logout();
        }
      }
    };
    // Check token every minute
    const tokenCheckInterval = setInterval(checkTokenExpiration, 120000);
    // Clean up interval on component unmount
    return () => clearInterval(tokenCheckInterval);
  }, [isLoggedIn, user, logout]);

  const routes = GetRoutesBasedOnUser();
  const renderContent = () => {
    if (isLoggedIn && user) {
      return (
        <UserContextProvider>
          <RouterProvider router={routes} fallbackElement={<LoginUI />} />
        </UserContextProvider>
      );
    } else if (!window.location.href.includes("/forgotPassword")) {
      return <LoginUI />;
    }
    return null;
  };
  return (
    <>
      <NetworkErrorHandler>
        {renderContent()}
        <ToastContainer />
      </NetworkErrorHandler>
    </>
  );
};

export default App;
