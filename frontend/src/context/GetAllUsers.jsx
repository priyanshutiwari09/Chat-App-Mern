import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const GetAllUsers = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");

        // Check if token exists before making a request
        if (!token) {
          console.log("No token found. User might need to log in again.");
          setLoading(false);
        }

        const response = await axios.get("/api/user/getUserProfile", {
          withCredentials: true,
          Credentials: "Include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        setAuthUser(null);
        navigate("/login");
        console.log("Error in GetAllUser" + error);
      }
    };
    getUsers();
  }, [setAuthUser, navigate]);

  return [allUsers, loading];
};

export default GetAllUsers;
