import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://sejal-backend.onrender.com/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      navigate("/admin");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <form
        onSubmit={login}
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 16,
          width: 350,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}