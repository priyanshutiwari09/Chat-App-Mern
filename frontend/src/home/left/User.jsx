import React from "react";
import useConversation from "../../stateManage/conversationState.js";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } =
    useConversation();
  const isSelected = selectedConversation?._id === user._id;
  // console.log(selectedConversation)

  return (
    <div
      className={`hover:bg-slate-300 text-gray-600 duration-300 cursor-pointer ${
        isSelected ? "bg-slate-400 hover:bg-slate-400" : ""
      } `}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 p-3 cursor-pointer">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div>
          <h1 className="font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
