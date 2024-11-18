import React from "react";
import CurrentUser from "./CurrentUser";
import ChatSection from "./ChatSection";
import SendMessage from "./SendMessage";

function Right(){

  return (
    <div className="w-[70%] bg-slate-300 text-zinc-950">
        <CurrentUser/>
        <div className="overflow-y-scroll" style={{maxHeight: "calc(100vh - 17.8vh"}}>
            <ChatSection/>
        </div>
        <SendMessage/>
    </div>
  )
}

export default Right;