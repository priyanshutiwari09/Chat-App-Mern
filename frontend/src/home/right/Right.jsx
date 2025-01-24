import React from "react";
import CurrentUser from "./CurrentUser";
import ChatSection from "./ChatSection";
import SendMessage from "./SendMessage";
import useConversation from "../../stateManage/conversationState";

function Right() {
  const { selectedConversation, messages, setSelectedConversation } =
    useConversation();
  // const isSelected = selectedConversation?._id === user._id;
  if (selectedConversation) {
    console.log(selectedConversation);
  }

  return (
    <>
      {selectedConversation && selectedConversation._id ? (
        <div className="w-[70%] bg-slate-300 text-zinc-950">
          <CurrentUser />
          <div
            className="overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 17.8vh" }}
          >
            <ChatSection />
          </div>
          <SendMessage />
        </div>
      ) : (
        <div>On Start</div>
      )}
    </>
  );
}
// { message: "No messages found" }
export default Right;
