import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,

        // 🔥 Premium glass effect
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        borderBottom: "1px solid rgba(226,232,240,0.6)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 1001,
          }}
        >
          <img
            src="/se_logo/croped.png"
            alt="Sejal Engineering Logo"
            style={{
              width: 42,
              height: 42,
              objectFit: "contain",
            }}
          />

          <span
            style={{
              fontSize: window.innerWidth < 500 ? "16px" : "22px",
              fontWeight: "800",
              color: "#dc2626",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
            }}
          >
            SEJAL ENGINEERING
          </span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: window.innerWidth <= 900 ? "block" : "none",
            background: "transparent",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "#dc2626",
            zIndex: 1001,
          }}
        >
          ☰
        </button>

        {/* NAV LINKS */}
        <nav
          style={{
            display:
              window.innerWidth > 900
                ? "flex"
                : menuOpen
                ? "flex"
                : "none",

            flexDirection: window.innerWidth <= 900 ? "column" : "row",

            position: window.innerWidth <= 900 ? "absolute" : "static",

            top: window.innerWidth <= 900 ? "80px" : "auto",
            left: 0,

            width: window.innerWidth <= 900 ? "100%" : "auto",

            background:
              window.innerWidth <= 900
                ? "rgba(255,255,255,0.96)"
                : "transparent",

            padding: window.innerWidth <= 900 ? "20px 0" : "0",

            gap: "10px",
            alignItems: "center",

            boxShadow:
              window.innerWidth <= 900
                ? "0 10px 30px rgba(0,0,0,0.08)"
                : "none",
          }}
        >
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Services", "/services"],
            ["Products", "/products"],
            ["Projects", "/projects"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <Link
              key={label}
              to={path}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#0f172a",
                fontWeight: "600",
                fontSize: "14px",
                padding: "10px 16px",
                borderRadius: "8px",
                transition: "0.3s",
                width: window.innerWidth <= 900 ? "90%" : "auto",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#dc2626";
                e.target.style.color = "#fff";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#0f172a";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              {label}
            </Link>
          ))}

          {/* Admin Button */}
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            style={{
              marginLeft: window.innerWidth <= 900 ? "0" : "10px",
              padding: "10px 16px",
              borderRadius: "8px",
              background: "#dc2626",
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              textDecoration: "none",
              width: window.innerWidth <= 900 ? "90%" : "auto",
              textAlign: "center",
            }}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}