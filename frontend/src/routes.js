import { useEffect, useState, useMemo } from "react";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import LoginUI from "./pages/Auth/LoginUI";
import GetAppropriateLayout from "./routes/GetAppropriateLayout";
import GetAppropriateRoute from "./routes/GetAppropriateRoute";
import useDecodedUser from "./services/hooks/useDecodedUser";

export default function GetRoutesBasedOnUser() {
  const [initialView, setInitialView] = useState(<LoginUI />);
  const decodedUser = useDecodedUser();

  useEffect(() => {
    if(decodedUser){
      const userId=decodedUser?.id;
      localStorage.setItem('user-id', userId);
      GetAppropriateLayout({ setInitialView, user: decodedUser });
    }
    
  }, [decodedUser]);

  const router = useMemo(() => {
    if (!decodedUser) return null;
    return createBrowserRouter(
      createRoutesFromElements(GetAppropriateRoute({ initialView, decodedUser }))
    );
  }, [decodedUser, initialView]);

  return router;
}
