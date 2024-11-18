import React from "react";

function UserChat() {
  return (
    <div className="pt-3">
      <div className="chat chat-start">
        <div className="chat-bubble bg-white text-black">
          What kind of nonsense is this
        </div>
      </div>

      <div className="chat chat-end">
        <div className="chat-bubble  bg-custom-light-red text-white">Calm down, Anakin.</div>
      </div>
    </div>
  );
}

export default UserChat;