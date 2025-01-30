import React, { useContext } from "react";
import UserSearch from "./UserSearch";
import Users from "./Users";
import Logout from "./leftSettings/Logout";
import LanguageSettings from "../../components/LanguageSettings";
import { AuthContext } from "../../context/AuthProvider";

function Left() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="w-[35%] border-cyan-800">
      <div className="flex h-full">
        <div className="min-w-[65px] bg-custom-light-red flex flex-col justify-end items-center pb-5 gap-5">
          <LanguageSettings authUser={authUser}/>
          <Logout />
        </div>
        <div className="w-full me-3 ms-3">
          <h1 className="px-4 pt-4 text-3xl text-zinc-950 font-bold">Chats</h1>
          <UserSearch />
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Left;
