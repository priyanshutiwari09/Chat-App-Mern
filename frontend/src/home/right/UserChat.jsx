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

  const isSender = message.senderId === authUser.user._id;
  return (
    <div className="pt-3 pb-3">
      {isSender ? (
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-error">
            {message.message}
          </div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-bubble bg-white text-black">
            {message.message}
          </div>
        </div>
      )}
       <p>{isSender ? 'Sender' : 'Receiver'}</p>
    </div>
  );
}

export default UserChat;
