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
        <div
          className="w-[70%] flex flex-col justify-center items-center h-full text-center border-l-2 text-gray-700"
          style={{
            background: "linear-gradient(to bottom, #f0f4f8, #e0e8f9)" // Light gradient background
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712030.png"
            alt="Chat Illustration"
            className="w-52 h-52 mb-6 opacity-50"
          />
          <h2 className="text-2xl font-semibold">Welcome to ChatApp!</h2>
          <p className="mt-2 text-lg text-gray-500 max-w-md">
            Select a user to start chatting. Stay connected and enjoy seamless
            conversations!
          </p>
        </div>
      )}
    </>
  );
}
// { message: "No messages found" }
export default Right;
