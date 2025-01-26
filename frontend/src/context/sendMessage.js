import { useState } from "react";
import useConversation from "../stateManage/conversationState.js";
import axios from "axios";

const sendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessageInside = async (message) => {
    if (selectedConversation && selectedConversation._id) {
      try {
        const response = await axios.post(
          `/api/message/send/${selectedConversation._id}`, {message}
        );
        console.log("sendm frontend",response.data)
        setMessages([...messages, response.data]);
        setLoading(false);
      } catch (error) {
        console.log("Error in sendMessage", error);
      }
    }
  };

  return { loading, sendMessageInside };
};

export default sendMessage;
