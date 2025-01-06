import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const GetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");

        const response = await axios.get("/api/user/getUserProfile", {
          Credentials: "Include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in GetAllUser" + error);
      }
    };
    getUsers();
  }, []);

  return [ allUsers, loading ];
};

export default GetAllUsers;
