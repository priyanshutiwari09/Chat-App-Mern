import { useContext, useEffect } from "react";
import useConversation from "../stateManage/conversationState.js";
import { SocketContext } from "./SocketContext.jsx";
import sound from "../../Audio/notif.mp3";
import { AuthContext } from "../context/AuthProvider.jsx";

const useSocketMessage = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    // if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      // console.log("Received real-time message:", newMessage);
      // console.log("Sender ID:", newMessage.senderId);
      // console.log("Receiver ID:", newMessage.receiverId);
      // console.log("Logged-in User ID:", authUser.user._id);
      // Check if it's the sender or receiver
      const isSender = newMessage.senderId === authUser.user._id;
      // console.log(
      //   isSender ? "This is your message" : "This is the receiver's message"
      // );

      const notification = new Audio(sound);
      notification.play();
      setMessages([...messages, newMessage]);
      // console.log("Latest Message:", messages[messages.length - 1]);
    });
    

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useSocketMessage;
