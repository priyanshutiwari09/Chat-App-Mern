import React, { useEffect, useRef } from "react";
import UserChat from "./UserChat";
import getMessage from "../../context/getMessage.js";
import useConversation from "../../stateManage/conversationState.js";
// import Loading from "../../components/Loading";

function ChatSection() {
  const { messages, loading } = getMessage();
  const { selectedConversation } = useConversation();
  console.log("chatSection", selectedConversation);
  const chatContainerRef = useRef(null);
  console.log(messages);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="">
      <div
        ref={chatContainerRef}
        className="ps-2 pe-2 pb-2  overflow-auto scroll-smooth"
        style={{
          minHeight: "calc(100vh - 17.8vh)"
        }}
      >
        {/* loading ? (
        <Loading />
      ) : ( */}

        {messages.length == 0 && selectedConversation && (
          <div
            className="flex  justify-center items-center bg-slate-500"
            style={{ minHeight: "calc(100vh - 17.8vh)" }}
          >
            "Start a conversation with {selectedConversation.name}. Say hi!"
          </div>
        )}
        {messages.length > 0 &&
          messages.map((message) => {
            // console.log(message)
            // console.log(message.senderId);
            return (
              <UserChat
                key={message._id}
                sender={message.senderId}
                message={message}
              />
            );
          })}
        {/* <UserChat/> */}
      </div>
    </div>
  );
}

export default ChatSection;
