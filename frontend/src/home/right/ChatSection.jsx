import React from "react";
import UserChat from "./UserChat";

function ChatSection() {
  return (
    <div className="ps-2 pe-2" style={{minHeight: "calc(100vh - 17.8vh)"}}>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
    </div>
  );
}

export default ChatSection;