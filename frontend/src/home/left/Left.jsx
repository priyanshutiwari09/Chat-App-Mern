import React, { useContext } from "react";
import UserSearch from "./UserSearch";
import Users from "./Users";
import Logout from "./leftSettings/Logout";
import LanguageSettings from "../../components/LanguageSettings";
import { AuthContext } from "../../context/AuthProvider";
import useConversation from "../../stateManage/conversationState";

function Left() {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation } = useConversation();

  let isSelectedConversation = selectedConversation ? "hidden" : "";

  return (
    <div
      className={`${isSelectedConversation} lg:block overflow-hidden h-full w-full  lg:w-[35%] lg:border-cyan-800`}
    >
      <div className="lg:flex lg:h-full">
        <div className="hidden lg:min-w-[65px] lg:bg-custom-light-red lg:flex lg:flex-col lg:justify-end lg:items-center lg:pb-5 lg:gap-5">
          <LanguageSettings authUser={authUser} />
          <Logout />
        </div>

        <div className="flex-1 lg:w-full lg:me-3 lg:ms-3">
          {/* Responsive Header */}
          <div className="lg:hidden flex justify-between">
            <h1 className="px-4 pt-4 text-3xl text-zinc-950 font-semibold">
              Chats
            </h1>
            <LanguageSettings authUser={authUser} />
          </div>

          {/* Title for LG screens */}
          <h1 className="hidden lg:block lg:px-4 lg:pt-4 text-3xl text-zinc-950 font-semibold lg:font-bold">
            Chats
          </h1>

          {/* User Search and Scrollable Users */}
          <UserSearch />

          <div className="overflow-y-auto h-[calc(100vh)]">
            {" "}
            {/* Adjust height */}
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Left;
