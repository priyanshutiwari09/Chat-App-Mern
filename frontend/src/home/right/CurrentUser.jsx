import React from "react";

function CurrentUser(){

  return (
    <div className="bg-slate-200 flex p-3 ps-5 items-center cursor-pointer h-[8.8vh]">
        <div className="avatar online">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <div className="ps-4">
        <h1 className="font-bold">Priyanshu Tiwari</h1>
        <span className="font-light text-sm">online now</span>
      </div>
    </div>
  )
}

export default CurrentUser;