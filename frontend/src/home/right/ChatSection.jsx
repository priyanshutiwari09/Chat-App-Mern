import getMessage from "../../context/getMessage.js";
import useSocketMessage from "../../context/useSocketMessage.js";
import useConversation from "../../stateManage/conversationState.js";
import UserChat from "./UserChat";
import React, { useContext, useEffect, useRef } from "react";

// import Loading from "../../components/Loading";

function ChatSection() {
  const { messages, loading } = getMessage();
  // console.log("loading", loading)
  // const [loading] = getMessage();
  const { selectedConversation } = useConversation();
  // console.log("chatSection", selectedConversation);

  const chatContainerRef = useRef(null);

  useSocketMessage();
  // console.log("New message to be displayed:", messages);

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  // console.log("chatsectionfile", messages);

  return (
    <div
      ref={chatContainerRef}
      className="overflow-y-auto scroll-smooth"
      style={{
        height: "calc(100vh - 17.8vh - 0.1vh)",
        overflowAnchor: "none"
      }}
    >
      {/* loading ? (
        <Loading />
      ) : ( */}

      {Array.isArray(messages) &&
        messages.length == 0 &&
        selectedConversation && (
          <div
            className="flex flex-col justify-center items-center text-center border-l-2 text-gray-700"
            style={{
              height: "calc(99vh - 17.8vh)"
            }}

            // style={{
            //   background: "linear-gradient(to bottom, #f0f4f8, #e0e8f9)" // Light gradient background
            // }}
          >
            <img
              src="/images/undraw_begin-chat_4wy6.svg"
              alt="Chat Illustration"
              className="w-52 h-52 mb-6 opacity-75"
            />
            <h2 className="text-2xl font-semibold">Say hi!</h2>
            <p className="mt-2 text-lg text-gray-500 max-w-md">
              Start a conversation with {selectedConversation.name}
            </p>
          </div>
        )}
      {Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message, index) => {
          // console.log("chatsection",message)
          // console.log(message.senderId);
          return (
            <UserChat
              key={
                message._id ||
                `${message.senderId}-${message.createdAt}-${index}`
              }
              message={message}
            />
          );
        })}
      {/* <div ref={bottomRef} style={{ height: "1px" }} /> */}
      {/* <UserChat/> */}
      <div style={{ height: "1px" }} />
    </div>
  );
}

export default ChatSection;
