import React, { useEffect, useState } from "react";
import useConversation from "../stateManage/conversationState.js";
import axios from "axios";

const getMessage = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/getMessage/${selectedConversation._id}`
          );

          if (response.data && response.data.length > 0) {
            setMessages(response.data);
          } else {
            // console.log("No messages found for this conversation.");
            setMessages([]);
            setLoading(false); // Handle empty state or display a message
          }
        } catch (error) {
          console.log(
            "Error in getMessage",
            error.response ? error.response.data : error.message
          );
          setMessages([]);
          setLoading(false);
        }
      } else {
        // If no conversation is selected, clear messages
        setMessages([]);
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};

export default getMessage;
