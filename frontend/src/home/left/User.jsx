import { SocketContext } from "../../context/SocketContext.jsx";
import { useUserProfile } from "../../context/UserProfile.jsx";
import getMessage from "../../context/getMessage.js";
import useConversation from "../../stateManage/conversationState.js";
import React, { useContext } from "react";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { messages } = getMessage();
  // const latestMessage = Array.isArray(messages) && messages.message[messages.message.length - 1];
  // console.log(messages)
  const { socket, onlineUsers } = useContext(SocketContext);
  // console.log(selectedConversation)
  const isOnline = onlineUsers.includes(user._id);
  // console.log("user", user);
  const { setUserProfile } = useUserProfile();

  const truncateMessage = (message, maxLength = 30) => {
    return message.length > maxLength
      ? `${message.slice(0, maxLength)}...`
      : message;
  };

  return (
    <div
      className={`hover:bg-slate-300 last:mb-0 rounded-md mb-1 text-gray-600 duration-300 cursor-pointer ${
        isSelected ? "bg-slate-400 hover:bg-slate-400" : ""
      } `}
      onClick={() => {
        setSelectedConversation(user);
        user.profileImage
          ? setUserProfile(user.profileImage)
          : setUserProfile(
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            );
      }}
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

        <div className="w-full">
          <h1 className="font-bold pe-4">{user.name}</h1>
          <div className="flex justify-between items-center">
            <div className="flex flex-grow w-[60%] overflow-hidden">
              {/* Truncated message */}
              <span className="text-gray-300">
                {truncateMessage(user.latestMessage)}
              </span>
            </div>

            {/* Time display - not truncated */}
            <span className="text-sm text-gray-400 ml-2">
              {new Date(user.latestMessageTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
