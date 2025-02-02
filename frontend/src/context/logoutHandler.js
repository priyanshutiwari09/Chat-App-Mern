import axios from "axios";
import Cookies from "js-cookie";

const handleLogout = async (setAuthUser) => {
  try {
    const response = await axios.post("/api/user/logout");

    if (response.status === 200) {
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      setAuthUser(undefined);
    }
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export default handleLogout;
