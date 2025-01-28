import React, { useContext } from "react";
import useConversation from "../../stateManage/conversationState.js";
import { SocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const { socket, onlineUsers } = useContext(SocketContext);
  // console.log(selectedConversation)
  const isOnline = onlineUsers.includes(user._id);
  // console.log("user", user);

  return (
    <div
      className={`hover:bg-slate-300 rounded-md mb-1 text-gray-600 duration-300 cursor-pointer ${
        isSelected ? "bg-slate-400 hover:bg-slate-400" : ""
      } `}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 p-3 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            {user.profileImage ? (
              <img src={`${user.profileImage}`} />
            ) : (
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            )}
          </div>
        </div>

        <div className="max-w-[80%] break-words pe-4">
          <h1 className="font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
