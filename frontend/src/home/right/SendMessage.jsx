import React, { useState } from "react";
import { LuFiles } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";
import sendMessage from "../../context/sendMessage.js";

function SendMessage() {
  const { loading, sendMessageInside } = sendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageInside(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-slate-200 flex justify-around items-center h-[9vh]">
        <button className="cursor-pointer ps-10">
          <LuFiles className="text-2xl text-gray-500" />
        </button>

        <div className="w-[90%] ps-4 text-gray-500">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send Message"
            className="input border bg-transparent w-full focus:outline-none text-gray-800"
          />
        </div>

        <button className="text-2xl ps-4 pe-10" type="submit">
          <VscSend className="text-gray-500" />
        </button>
      </div>
    </form>
  );
}

export default SendMessage;
