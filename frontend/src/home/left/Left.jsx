import React from "react";
import UserSearch from "./UserSearch";
import Users from "./Users";
import Logout from "./leftSettings/Logout";

function Left() {
  return (
    <div className="w-[35%] border-cyan-800">
      <div className="flex h-full">
        <Logout />
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
