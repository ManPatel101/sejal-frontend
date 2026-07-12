import { useState, useEffect } from "react";
import AdminLogin from "../../pages/AdminLogin";

export default function ProtectedRoute({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  console.log("ProtectedRoute - adminToken state is:", token);

  useEffect(() => {
    // Keep state in sync with localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem("adminToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!token || token === "undefined" || token === "null") {
    console.log("No valid token found, rendering AdminLogin inline at /admin");
    return <AdminLogin onLoginSuccess={() => setToken(localStorage.getItem("adminToken"))} />;
  }

  return children;
}