import useConversation from "../stateManage/conversationState.js";
import { AuthContext } from "./AuthProvider.jsx";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";


const getMessage = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/getMessage/${selectedConversation._id}`
          );

          if (response.data && response.data.length > 0) {
            // console.log("getMssgFront", response.data);

            const loggedInUser = authUser.user._id;
            const updatedMessages = response.data.map((message) => {
              // If the user is the receiver, show the translated message; else, show the original
              const displayMessage =
                message.receiverId === loggedInUser
                  ? message.translatedMessage || message.message
                  : message.message;

              return {
                ...message,
                displayMessage // Add the correct message to display
              };
            });

            setMessages(updatedMessages);
          } else {
            setMessages([]);
          }
        } catch {
          // Silence errors without logging
          setMessages([]);
        } finally {
          setLoading(false);
        }
      } else {
        setMessages([]);
        setLoading(false);
      }
      // } catch (error){
      //   console.log(
      //     "Error in getMessage",
      //     error.response ? error.response.data : error.message
      //   );
      //   setMessages([]);
      //   setLoading(false);
      // }
      // } else {
      // If no conversation is selected, clear messages
      // setMessages([]);
      // setLoading(false);
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};

export default getMessage;
