import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";

function Users() {
  const [allUsers, loading] = GetAllUsers();
  const usersToDisplay = Array.isArray(allUsers.filteredUsers)
    ? allUsers.filteredUsers
    : [];
  // console.log(usersToDisplay);

  return (
    // style={{ maxHeight: "85vh" }}
    // <div className="overflow-y-auto overflow-x-hidden h-[100%]">
    //   {usersToDisplay.map((user, index) => {
    //     return <User key={index} user={user} />;
    //   })}
    // </div>
    <div className="flex flex-col h-full last:mb-0">
      <div className="overflow-y-auto flex-1 pb-40 last:mb-0">
        {usersToDisplay.map((user, index) => {
          return <User key={index} user={user} />;
        })}
      </div>
    </div>
  );
}

export default Users;
