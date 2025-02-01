import React, { useContext, useState } from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import "./index.css";
import Logout from "./home/left/leftSettings/Logout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { authUser, setAuthUser } = useContext(AuthContext);

  // console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="lg:flex lg:h-screen">
                <Left></Left>
                <Right></Right>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </>
  );
}

export default App;
