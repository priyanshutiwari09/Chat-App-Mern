// import { SocketContext } from "../../context/SocketContext.jsx";
// import { useUserProfile } from "../../context/UserProfile.jsx";
// import getMessage from "../../context/getMessage.js";
// import useConversation from "../../stateManage/conversationState.js";
// import React, { useContext, useEffect, useState } from "react";

// function User({ user }) {
//   const { selectedConversation, newMssg, setNewMssg, setSelectedConversation } =
//     useConversation();
//   const isSelected = selectedConversation?._id === user._id;
//   const { messages } = getMessage();

//   // const latestMessage = Array.isArray(messages) && messages.message[messages];
//   // let latestMessage = messages ? messages[messages.length - 1].message : "";

//   // console.log(latestMessage);
//   const { socket, onlineUsers } = useContext(SocketContext);
//   // console.log(selectedConversation)
//   const isOnline = onlineUsers.includes(user._id);
//   // console.log("user", user);
//   const { setUserProfile } = useUserProfile();

//   const [latestMessage, setLatestMessage] = useState("");

//   // console.log("user", user);
//   // console.log("messages", messages);
//   useEffect(() => {
//     if (messages && messages.length > 0) {
//       const userMessages = messages.filter(
//         (msg) => msg.receiverId === user._id || msg.senderId === user._id
//       );
//       if (userMessages.length > 0) {
//         if (messages.receiverId === user._id) {
//           setLatestMessage(
//             userMessages[userMessages.length - 1].translatedMessage ||
//               userMessages[userMessages.length - 1]
//           );
//         }
//         setLatestMessage(userMessages[userMessages.length - 1].message);
//       }
//     }
//   }, [messages, user._id]);
//   // console.log("latestMessage", latestMessage);

//   // useEffect(() => {
//   //   if (newMssg) {
//   //     // if (
//   //     //   newMssg.receiverId === user._id ||
//   //     //   newMssg.senderId === user._id
//   //     // ) {
//   //     //   setLatestMessage(newMssg.message);
//   //     // }
//   //     console.log("newMssg", newMssg);
//   //   }
//   // }, [setNewMssg,newMssg, user._id]);

//   const truncateMessage = (message, maxLength = 30) => {
//     return message.length > maxLength
//       ? `${message.slice(0, maxLength)}...`
//       : message;
//   };

//   return (
//     <div
//       className={`hover:bg-slate-300 last:mb-0 rounded-md mb-1 text-gray-600 duration-300 cursor-pointer ${
//         isSelected ? "bg-slate-400 text-black hover:bg-slate-400" : ""
//       } `}
//       onClick={() => {
//         setSelectedConversation(user);
//         // console.log("user",user)
//         user.profileImage
//           ? setUserProfile(user.profileImage)
//           : setUserProfile(
//               "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//             );
//       }}
//     >
//       <div className="flex items-center space-x-4 p-3 cursor-pointer">
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-14 rounded-full">
//             {user.profileImage ? (
//               <img src={`${user.profileImage}`} />
//             ) : (
//               <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//             )}
//           </div>
//         </div>

//         <div className="w-full">
//           <h1 className="font-semibold text-gray-800 pe-4">{user.name}</h1>
//           <div className="flex justify-between items-center">
//             <div className="flex flex-grow w-[60%] overflow-hidden">
//               {/* Truncated message */}
//               <span
//                 className={` ${isSelected ? "text-gray-700" : "text-gray-400"}`}
//               >
//                 {truncateMessage(latestMessage || user.latestMessage)}
//               </span>
//             </div>

//             {/* Time display - not truncated */}
//             <span
//               className={` ml-2 text-sm ${
//                 isSelected ? "text-gray-700" : "text-gray-400"
//               }`}
//             >
//               {new Date(user.latestMessageTime).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit"
//               })}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default User;



import { SocketContext } from "../../context/SocketContext.jsx";
import { useUserProfile } from "../../context/UserProfile.jsx";
import getMessage from "../../context/getMessage.js";
import useConversation from "../../stateManage/conversationState.js";
import { useEffect, useState, useContext } from "react";

function User({ user }) {
  const { selectedConversation, setSelectedConversation, unreadCounts } =
    useConversation();
  const { setUserProfile } = useUserProfile();
  const isSelected = selectedConversation?._id === user._id;
  const { messages } = getMessage();

  const [latestMessage, setLatestMessage] = useState("");
  const [latestTime, setLatestTime] = useState("");

  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(user._id);

  useEffect(() => {
    if (messages && messages.length > 0) {
      const userMessages = messages.filter(
        (msg) => msg.receiverId === user._id || msg.senderId === user._id
      );
      if (userMessages.length > 0) {
        const lastMessage = userMessages[userMessages.length - 1];
        setLatestMessage(lastMessage.message);
        setLatestTime(
          new Date(
            lastMessage.timestamp || lastMessage.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        );
      }
    }
  }, [messages, user._id]);

  const truncateMessage = (message, maxLength = 30) => {
    return message.length > maxLength
      ? `${message.slice(0, maxLength)}...`
      : message;
  };

  return (
    <div
      className={`hover:bg-slate-300 last:mb-0 rounded-md mb-1 text-gray-600 duration-300 cursor-pointer flex justify-between items-center ${
        isSelected ? "bg-slate-400 text-black hover:bg-slate-400" : ""
      }`}
      onClick={() => {
        setSelectedConversation(user);
        setUserProfile(
          user.profileImage ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        );
      }}
    >
      <div className="flex items-center space-x-4 p-3 cursor-pointer w-full">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            {user.profileImage ? (
              <img src={`${user.profileImage}`} />
            ) : (
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="font-semibold text-gray-800">{user.name}</h1>
            {/* <div className="flex flex-col gap-2"> */}
            <span className="text-xs text-gray-400">{latestTime}</span>
            {/* {unreadCounts[user._id] > 0 && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-6">
                  {unreadCounts[user._id] > 99 ? "99+" : unreadCounts[user._id]}
                </div>
              )}
            </div> */}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-grow justify-between w-[60%] overflow-hidden">
              <span
                className={` ${isSelected ? "text-gray-700" : "text-gray-400"}`}
              >
                {truncateMessage(latestMessage || user.latestMessage)}
              </span>

              {unreadCounts[user._id] > 0 && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-6">
                  {unreadCounts[user._id] > 99 ? "99+" : unreadCounts[user._id]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Unread Message Badge */}
      {/* {unreadCounts[user._id] > 0 && (
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-4">
          {unreadCounts[user._id] > 99 ? "99+" : unreadCounts[user._id]}
        </div>
      )} */}
    </div>
  );
}

export default User;
