import React, { useContext, useState } from "react";
import useConversation from "../../stateManage/conversationState";
import { SocketContext } from "../../context/SocketContext";
import GetAllUsers from "../../context/GetAllUsers";
import { useUserProfile } from "../../context/UserProfile";


function CurrentUser() {
  const { selectedConversation, messages, setSelectedConversation } =
    useConversation();
    const { userProfile } = useUserProfile();

  const { socket, onlineUsers } = useContext(SocketContext);
  // console.log("current", selectedConversation._id, selectedConversation.name)

  const isOnline = onlineUsers.includes(selectedConversation._id);

  const [allUsers, loading] = GetAllUsers();

  return (
    <div className="bg-slate-200 flex p-3 ps-5 items-center cursor-pointer h-[8.8vh]">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-14 rounded-full">
          <img src={`${userProfile}`} />
        </div>
      </div>

      <div className="ps-4">
        <h1 className="font-bold">{selectedConversation.name}</h1>
        <span className="font-light text-sm">
          {isOnline ? "online now" : ""}
        </span>
      </div>
    </div>
  );
}

export default CurrentUser;
