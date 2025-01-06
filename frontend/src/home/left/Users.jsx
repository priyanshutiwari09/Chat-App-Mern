import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";

function Users() {
  const [ allUsers, loading ] = GetAllUsers();
  const usersToDisplay = Array.isArray(allUsers.filteredUsers) ? allUsers.filteredUsers : [];
  // console.log(usersToDisplay);

  return (
    <div style={{ maxHeight: "85vh" }} className="overflow-y-scroll">
      {usersToDisplay.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </div>
  );
}

export default Users;
