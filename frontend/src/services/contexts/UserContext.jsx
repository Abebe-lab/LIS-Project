import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  decodedUser: null,
  setDecodedUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: (token) => {localStorage.setItem('token', token);},
  logout: () => {
    localStorage.removeItem("user-id");
    localStorage.removeItem('token');
  },
});
