// import sound from "../../Audio/notif.mp3";
// import { AuthContext } from "../context/AuthProvider.jsx";
// import useConversation from "../stateManage/conversationState.js";
// import { SocketContext } from "./SocketContext.jsx";
// import { set } from "mongoose";
// import { useContext, useEffect } from "react";

// const useSocketMessage = () => {
//   const { socket } = useContext(SocketContext);
//   const { messages, setMessages } = useConversation();
//   const { authUser } = useContext(AuthContext);

//   useEffect(() => {
//     // if (!socket) return;
//     socket.on("newMessage", (newMessage) => {
//       const isSender = newMessage.senderId === authUser.user._id;

//       // setNewMssg(newMessage);
//       const notification = new Audio(sound);
//       notification.play();

//       setMessages([...messages, newMessage]);
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [socket, messages, setMessages]);
// };

// export default useSocketMessage;

import sound from "../../Audio/notif.mp3";
import { AuthContext } from "../context/AuthProvider.jsx";
import useConversation from "../stateManage/conversationState.js";
import { SocketContext } from "./SocketContext.jsx";
import { useContext, useEffect } from "react";

const useSocketMessage = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages, selectedConversation, addUnreadMessage } = useConversation();
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (!socket || !selectedConversation || !selectedConversation._id) return;

    socket.on("newMessage", (newMessage) => {
      const isRelevantMessage =
        (newMessage.senderId === authUser.user._id &&
          newMessage.receiverId === selectedConversation._id) ||
        (newMessage.senderId === selectedConversation._id &&
          newMessage.receiverId === authUser.user._id);

      if (newMessage.senderId !== authUser.user._id) {
        const notification = new Audio(sound);
        notification.play();
      }

      if (isRelevantMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        addUnreadMessage(newMessage.senderId) //Track Unread Messages
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, authUser.user._id, selectedConversation, setMessages, addUnreadMessage]);
};

export default useSocketMessage;
