import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";
import { UserProfileProvider } from "./context/UserProfile.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProfileProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </UserProfileProvider>
    </AuthProvider>
    ,
  </BrowserRouter>
);
