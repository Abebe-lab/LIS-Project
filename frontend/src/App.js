
import UserContextProvider from "./services/contexts/UserContextProvider";
import NetworkErrorHandler from "./utils/NetworkErrorHandler";
import React, { useContext } from "react";
import { UserContext } from "./services/contexts/UserContext";
import GetRoutesComponent from "./GetRouteComponent";
import LoginUI from "./pages/Auth/LoginUI";

const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {!isLoggedIn ? <LoginUI /> :(<NetworkErrorHandler><GetRoutesComponent /></NetworkErrorHandler>) }
    </>
  );
};

export default App;