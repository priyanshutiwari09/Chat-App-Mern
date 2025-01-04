import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = Cookies.get("jwt") || localStorage.getItem("messenger");

  // Parse the user data and storing in state
  //const one = 1 gC
  const [authUser, setAuthUser] = useState(
    initialState ? JSON.parse(initialState) : undefined
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};