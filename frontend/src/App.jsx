import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import './index.css'
import Logout from "./home/left/leftSettings/Logout";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App(){

  return (
    <>
    <div className="flex h-screen">
      {/* <Left></Left>
      <Right></Right> */}
      <SignUp/>
      {/* <Login/> */}
    </div>
    </>
  )
}

export default App;