import React from "react";
import { LuFiles } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";

function SendMessage() {
  return (
    <div className="bg-slate-200 flex justify-around items-center h-[9vh]">

        <button className="cursor-pointer ps-10">
            <LuFiles className="text-2xl text-gray-500"/>
        </button>

        <div className="w-[90%] ps-4 text-gray-500">
            <input type="text" placeholder="Send Message" className="input border bg-transparent w-full focus:outline-none text-gray-800" />
        </div>

        <button className="text-2xl ps-4 pe-10">
            <VscSend className="text-gray-500"/>
        </button>
    </div>
  );
}

export default SendMessage;