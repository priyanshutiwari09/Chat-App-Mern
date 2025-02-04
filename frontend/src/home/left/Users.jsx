// import React from "react";
// import User from "./User";
// import GetAllUsers from "../../context/GetAllUsers";

// function Users() {
//   const [allUsers, loading] = GetAllUsers();
//   const usersToDisplay = allUsers
//   // console.log(usersToDisplay);

//   return (
//     // style={{ maxHeight: "85vh" }}
//     // <div className="overflow-y-auto overflow-x-hidden h-[100%]">
//     //   {usersToDisplay.map((user, index) => {
//     //     return <User key={index} user={user} />;
//     //   })}
//     // </div>
//     <div className="flex flex-col h-full px-1 lg:px-0 last:mb-0">
//       <div className="hide-scrollbar overflow-hidden flex-1 pb-40 last:mb-0">
//         {usersToDisplay.map((user, index) => {
//           return <User key={index} user={user} />;
//         })}
//       </div>
//     </div>
//   );
// }

// export default Users;

import Loading from "../../components/Loading";
import GetAllUsers from "../../context/GetAllUsers";
import User from "./User";
import UserSearch from "./UserSearch";
import React, { useState, useEffect } from "react";

function Users() {
  const [allUsers, loading] = GetAllUsers(); // Fetch users from the context
  const [filteredUsers, setFilteredUsers] = useState(allUsers); // State to hold filtered users

  // Update filtered users whenever allUsers or the search query changes
  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredUsers(allUsers); // If the search query is empty, show all users
    } else {
      setFilteredUsers(
        allUsers.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredUsers(allUsers); // Initialize filtered users when allUsers is first loaded
  }, [allUsers]);

  return (
    <div className="flex flex-col h-full px-1 lg:px-0 last:mb-0">
      <UserSearch allUsers={allUsers} onSearch={handleSearch} />
      {/* Pass search handler */}

      {loading ? (
        <Loading />
      ) : (
        <div className="hide-scrollbar overflow-hidden flex-1 pb-40 last:mb-0">
          {filteredUsers.map((user, index) => {
            return <User key={index} user={user} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Users;
