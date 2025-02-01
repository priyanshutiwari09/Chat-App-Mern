import React from "react";
import CurrentUser from "./CurrentUser";
import ChatSection from "./ChatSection";
import SendMessage from "./SendMessage";
import useConversation from "../../stateManage/conversationState";
import { MdArrowBack } from "react-icons/md";

function Right() {
  const { selectedConversation, messages, setSelectedConversation } =
    useConversation();
  // const isSelected = selectedConversation?._id === user._id;
  // if (selectedConversation) {
  //   console.log(selectedConversation);
  // }
  let isSelectedConversation = selectedConversation ? "" : "hidden";

  return (
    <>
      {selectedConversation && selectedConversation._id ? (
        <div
          className={`${isSelectedConversation} lg:block w-[100%] lg:w-[70%] bg-slate-300 text-zinc-950`}
        >
          {/* Back Button for Mobile */}
          {/* <div className="flex items-center p-4 lg:hidden">
            <button
              className="text-blue-600 font-medium underline"
              onClick={() => setSelectedConversation(null)}
            >
              &larr; Back to Users
            </button>
          </div> */}
          <div className=" flex bg-slate-200 items-center">
            <MdArrowBack
              className="size-7 lg:hidden"
              onClick={() => setSelectedConversation(null)}
            />
            <CurrentUser />
          </div>
          <div
            className="overflow-hidden"
            style={{ maxHeight: "calc(100vh - 17.8vh" }}
          >
            <ChatSection />
          </div>
          <SendMessage />
        </div>
      ) : (
        <div
          className="hidden lg:w-[70%] lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-full lg:text-center lg:border-l-2 lg:text-gray-700"
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
