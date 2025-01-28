import React, { useContext } from "react";

function UserChat({ sender, message }) {
  // const { authUser } = useContext(AuthContext);
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  // // console.log(authUser.user._id)
  // // console.log(message.senderId)
  // const loggedUser = (sender === authUser.user._id);
  // let alignMessages = loggedUser ? "chat-end" : "chat-start";
  // console.log("senderId", sender)
  // console.log("loggedUser", authUser.user._id)
  // console.log(sender === authUser.user._id)

  console.log("userChat", message);
  console.log("time", message.createdAt);
  const isSender = message.senderId === authUser.user._id;
  return (
    <div className="pt-3 pb-3">
      {isSender ? (
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-error max-w-[60%] break-words">
            {message.message}
            <p className="text-xs self-end place-items-end text-gray-700">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // hour12: true
              })}
            </p>
          </div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-bubble bg-white text-black max-w-[60ch] break-words">
            {message.message}
            <p className="text-xs self-end place-items-end text-gray-700">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // hour12: true
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserChat;
