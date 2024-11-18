import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";

function Logout() {
  return (
    <>
        <div className="min-w-[90px] bg-custom-light-red flex flex-col justify-end items-center pb-5">
            <div style={{boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(10, 10, 10, 0.23) 0px 0px 6px"}} className="rounded-full p-1 cursor-pointer">
                <RiLogoutCircleLine className="text-4xl  fill-white"/>
            </div>
        </div>
    </>
  );
}

export default Logout;