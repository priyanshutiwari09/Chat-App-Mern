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
    <div className="overflow-y-scroll overflow-x-hidden h-[100%]">
      {usersToDisplay.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </div>
  );
}

export default Users;
