import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://sejal-backend.onrender.com";
      const res = await axios.post(
        `${apiBase}/api/admin/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#090d16", // Premium deep dark theme
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Dynamic radial gradient for fire/safety theme glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(9, 13, 22, 0) 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <form
        onSubmit={login}
        style={{
          background: "rgba(15, 23, 42, 0.65)", // Glassmorphism
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "45px 35px",
          borderRadius: 24,
          width: 380,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <img
            src="/se_logo/croped.png"
            alt="Sejal Engineering Logo"
            style={{
              width: "64px",
              height: "64px",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3))",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 8,
            letterSpacing: "0.5px",
          }}
        >
          Admin Portal
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: 28,
            lineHeight: "1.5",
          }}
        >
          Sign in to access the Aegis Fire & Safety dashboard
        </p>

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#f87171",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        {/* USERNAME FIELD */}
        <label
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#94a3b8",
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Username or Email
        </label>
        <input
          type="text"
          placeholder="Enter username"
          value={email}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "13px 16px",
            marginBottom: 20,
            borderRadius: 12,
            background: "rgba(30, 41, 59, 0.4)",
            border: focusedField === "email" ? "1.5px solid #dc2626" : "1.5px solid rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            fontSize: "14px",
            outline: "none",
            transition: "0.2s ease",
            boxShadow: focusedField === "email" ? "0 0 12px rgba(220, 38, 38, 0.2)" : "none",
          }}
        />

        {/* PASSWORD FIELD */}
        <label
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#94a3b8",
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "13px 16px",
            marginBottom: 28,
            borderRadius: 12,
            background: "rgba(30, 41, 59, 0.4)",
            border: focusedField === "password" ? "1.5px solid #dc2626" : "1.5px solid rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            fontSize: "14px",
            outline: "none",
            transition: "0.2s ease",
            boxShadow: focusedField === "password" ? "0 0 12px rgba(220, 38, 38, 0.2)" : "none",
          }}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: 12,
            fontSize: "15px",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
            opacity: loading ? 0.8 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-1.5px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.45)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(220, 38, 38, 0.3)";
            }
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  border: "2px solid #ffffff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Authenticating...
            </>
          ) : (
            "Access Panel"
          )}
        </button>

        {/* CSS animation inline helper */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />

        {/* BACK TO HOMEPAGE LINK */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a
            href="/"
            style={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.target.style.color = "#64748b")}
          >
            ← Return to Homepage
          </a>
        </div>
      </form>
    </div>
  );
}