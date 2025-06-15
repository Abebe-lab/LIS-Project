// GetRoutesComponent.js
import { UserContext } from "./services/contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginUI from "./pages/Auth/LoginUI";
import GetAppropriateLayout from "./routes/GetAppropriateLayout";
import GetAppropriateRoute from "./routes/GetAppropriateRoute";
import useDecodedUser from "./services/hooks/useDecodedUser";
import { RouterRounded } from "@mui/icons-material";
import UserContextProvider from "./services/contexts/UserContextProvider";

const GetRoutesComponent = () => {
    const [initialView, setInitialView] = useState(null);
    const [router, setRouter] = useState(null);
    const decodedUser = useDecodedUser();
    const { isLoggedIn, user, logout } = useContext(UserContext);
  
    // Effect 1: Set initial layout view ONCE when decodedUser is available
    useEffect(() => {
      if (isLoggedIn) {
        const userId = decodedUser?.id;
        localStorage.setItem("user-id", userId);
        GetAppropriateLayout({ setInitialView, user: decodedUser });
      }
      
    }, []);
  
    // Effect 2: Create router AFTER initial view is set
    useEffect(() => {
      if (decodedUser && initialView && !router) {
        const createdRouter = createBrowserRouter(
          createRoutesFromElements(GetAppropriateRoute({ initialView, decodedUser }))
        );
        setRouter(createdRouter);
        console.log("route:",createdRouter)
      }
      console.log("route:",router)
    }, [decodedUser, initialView, router]);
    // console.log("user",decodedUser, "routing", router)
    if (!decodedUser || !router) return <div>Routing Problem...</div>;
  
    return(
      <UserContextProvider>

        <RouterProvider router={router} />
      </UserContextProvider>)
  };
  
  export default GetRoutesComponent;