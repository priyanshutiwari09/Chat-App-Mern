import React, { useContext } from "react";

function UserChat({ message }) {
  // console.log("");
  // const { authUser } = useContext(AuthContext);
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  // // console.log(authUser.user._id)
  // // console.log(message.senderId)
  // const loggedUser = (sender === authUser.user._id);
  // let alignMessages = loggedUser ? "chat-end" : "chat-start";
  // console.log("senderId", sender)
  // console.log("loggedUser", authUser.user._id)
  // console.log(sender === authUser.user._id)

  // console.log("userChat", message.translatedMessage);
  // console.log("userChat", message.translatedMessage);
  // console.log("time", message.createdAt);
  // console.log("userchat", message);
  // console.log("receiverm", receiverMessage);
  // console.log("createat", createdAtt);
  // console.log("senderm", senderMessage);
  // console.log("senderm", senderMessage);
  // const displayMessage = message || "No message available"; // Prevent undefined error

  // console.log("Rendering message in UserChat:", displayMessage); // Log the message to check its value

  const isSender = message.senderId === authUser.user._id;
  // const latestMessage = message[message.length];
  // console.log(latestMessage)
  return (
    <div className="pt-1 pb-1 ps-1 pe-1 lg:ps-0 lg:pe-0 lg:pt-3 lg:pb-3">
      {isSender ? (
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-error max-w-[60%] break-words">
            {message.message || "No message available"}
            <p className="text-xs self-end place-items-end text-gray-700">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
                // hour12: true
              })}
            </p>
          </div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-bubble bg-white text-black max-w-[60ch] break-words">
            {message.translatedMessage || "No message available"}
            <p className="text-xs self-end place-items-end text-gray-700">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
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
