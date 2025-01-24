import axios from "axios";
import React, { useContext } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useConversation from "../../../stateManage/conversationState";

function Logout() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      const response = await axios.post("/api/user/logout");

      if (response.status === 200) {
        localStorage.removeItem("messenger");
        Cookies.remove("jwt");
        setAuthUser(undefined);
        // useConversation.setState({ selectedConversation: null, messages: [] });
        // useConversation.persist.clearStorage();
        // console.log("Navigating to /login");
        // navigate("/login");
        // console.log("Navigation triggered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-w-[70px] bg-custom-light-red flex flex-col justify-end items-center pb-5">
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(10, 10, 10, 0.23) 0px 0px 6px"
          }}
          className="rounded-full p-1 cursor-pointer"
        >
          <RiLogoutCircleLine
            onClick={handleClick}
            className="text-4xl  fill-white"
          />
        </div>
      </div>
    </>
  );
}

export default Logout;
