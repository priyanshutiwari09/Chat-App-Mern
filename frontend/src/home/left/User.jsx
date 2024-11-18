import React from "react";

function User() {
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-slate-300 text-gray-600 duration-300 cursor-pointer">
      <div className="avatar online">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <div>
        <h1 className="font-bold">Name</h1>
        <span>New Message</span>
      </div>
    </div>
  );
}

export default User;
