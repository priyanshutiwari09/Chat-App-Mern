import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";

function Users() {
  const [allUsers, loading] = GetAllUsers();
  const usersToDisplay = allUsers
  // console.log(usersToDisplay);

  return (
    // style={{ maxHeight: "85vh" }}
    // <div className="overflow-y-auto overflow-x-hidden h-[100%]">
    //   {usersToDisplay.map((user, index) => {
    //     return <User key={index} user={user} />;
    //   })}
    // </div>
    <div className="flex flex-col h-full px-1 lg:px-0 last:mb-0">
      <div className="hide-scrollbar overflow-hidden flex-1 pb-40 last:mb-0">
        {usersToDisplay.map((user, index) => {
          return <User key={index} user={user} />;
        })}
      </div>
    </div>
  );
}

export default Users;
