import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "./postUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const login = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", true);
    setLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  const fetchUser = async () => {
    try {
      const response = await getUser(localStorage.getItem("token"));
      //console.log(response)
      if (response.status === 200) {
        setUser(response?.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(token){
      fetchUser()
    }
  },[token]);
  return (
    <AuthContext.Provider value={{ user, loggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
