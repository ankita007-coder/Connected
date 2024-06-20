import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Account,
  FriendRequests,
  FriendsList,
  Groups,
  Home,
  LoginRegister,
  Page404,
  Profile,
} from "./pages";
import customFetch from "./utils/customFetch";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";

const App = () => {
  const { loggedIn, login, logout } = useAuth();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login(storedToken);
    }
    else{
      logout()
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={loggedIn? <Home/>:<Navigate to={"/login"}/>}/>
      <Route path="/login" element={<LoginRegister/>} />
      <Route path="/groups" element={loggedIn?<Groups />:<Navigate to={"/login"}/>} />
      <Route path="/friends-list" element={loggedIn?<FriendsList />:<Navigate to={"/login"}/>} />
      <Route path="/friend-requests" element={loggedIn?<FriendRequests />:<Navigate to={"/login"}/>} />
      <Route path="/profile" element={loggedIn?<Profile />:<Navigate to={"/login"}/>} />
      <Route path="/account" element={loggedIn?<Account />:<Navigate to={"/login"}/>} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
