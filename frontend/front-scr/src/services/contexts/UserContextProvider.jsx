import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

import { jwtDecode } from "jwt-decode";
//import { decodeJwt } from "../../utils/Helpers";

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [decodedUser, setDecodedUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const extractUser = () => {
      const storedUser = localStorage.getItem("token");
      if (storedUser) {
        setUser(storedUser);
        setDecodedUser(jwtDecode(storedUser));
        setIsLoggedIn(true);
      }
    };
    extractUser();
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("token", userData);
    setUser(userData);
    setDecodedUser(jwtDecode(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setDecodedUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUser,
        isLoggedIn,
        decodedUser,
        setDecodedUser: setDecodedUser,
        setIsLoggedIn: setIsLoggedIn,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
