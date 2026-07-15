import { useState, useEffect } from "react";
import AdminLogin from "../../pages/AdminLogin";

// 30 minutes session timeout (30 * 60 * 1000 ms)
const SESSION_TIMEOUT = 30 * 60 * 1000;

export default function ProtectedRoute({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("adminToken");
    const savedTime = localStorage.getItem("adminTokenTime");

    if (savedToken && savedTime) {
      if (Date.now() - parseInt(savedTime, 10) > SESSION_TIMEOUT) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminTokenTime");
        return null;
      }
      // If still valid, update time
      localStorage.setItem("adminTokenTime", Date.now().toString());
      return savedToken;
    }
    return savedToken;
  });

  console.log("ProtectedRoute - adminToken state is:", token);

  useEffect(() => {
    if (!token) return;

    // Update session timestamp on user activity
    const updateActivity = () => {
      const savedToken = localStorage.getItem("adminToken");
      if (savedToken) {
        localStorage.setItem("adminTokenTime", Date.now().toString());
      }
    };

    // Periodically check if session has expired
    const checkExpiration = () => {
      const savedToken = localStorage.getItem("adminToken");
      const savedTime = localStorage.getItem("adminTokenTime");

      if (savedToken && savedTime) {
        if (Date.now() - parseInt(savedTime, 10) > SESSION_TIMEOUT) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminTokenTime");
          setToken(null);
        }
      } else if (!savedToken && token) {
        setToken(null);
      }
    };

    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    
    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    const interval = setInterval(checkExpiration, 10000); // Check every 10 seconds

    const handleStorageChange = () => {
      const currentToken = localStorage.getItem("adminToken");
      const savedTime = localStorage.getItem("adminTokenTime");
      
      if (!currentToken || !savedTime || (Date.now() - parseInt(savedTime, 10) > SESSION_TIMEOUT)) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminTokenTime");
        setToken(null);
      } else {
        setToken(currentToken);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);

  if (!token || token === "undefined" || token === "null") {
    console.log("No valid token found, rendering AdminLogin inline at /admin");
    return (
      <AdminLogin
        onLoginSuccess={() => {
          localStorage.setItem("adminTokenTime", Date.now().toString());
          setToken(localStorage.getItem("adminToken"));
        }}
      />
    );
  }

  return children;
}