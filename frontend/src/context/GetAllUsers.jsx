import { AuthContext } from "./AuthProvider";
import { SocketContext } from "./SocketContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, data } from "react-router-dom";

const GetAllUsers = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();
  // const { socket } = useContext(SocketContext);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");

        // Check if token exists before making a request
        // if (!token) {
        //   console.log("No token found. User might need to log in again.");
        //   setLoading(false);
        // }

        const response = await axios.get("/api/user/getUserProfile", {
          withCredentials: true,
          Credentials: "Include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("getallusers", response.data)
        setAllUsers(response.data.users);
        // console.log(response.data.users);
        setLoading(false);
      } catch (error) {
        setAuthUser(null);
        navigate("/login");
        // console.log("Error in GetAllUser" + error);
      }
    };
    getUsers();


  }, [setAuthUser, navigate]);

  return [allUsers, loading];
};

export default GetAllUsers;
