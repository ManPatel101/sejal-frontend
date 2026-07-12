import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Products", "/products"],
    ["Projects", "/projects"],
    ["Contact", "/contact"],
  ];

  return (
    <>
      {/* NAVBAR */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(226,232,240,0.6)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "10px 18px", // 🔥 Reduced navbar height
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
              gap: "8px",
              zIndex: 1100,
            }}
          >
            <img
              src="/se_logo/croped.png"
              alt="Sejal Engineering Logo"
              style={{
                width: isMobile ? "34px" : "38px",
                height: isMobile ? "34px" : "38px",
                objectFit: "contain",
              }}
            />

            <span
              style={{
                fontSize: isMobile ? "15px" : "20px",
                fontWeight: "800",
                color: "#dc2626",
                letterSpacing: "0.5px",
                whiteSpace: "nowrap",
              }}
            >
              SEJAL ENGINEERING
            </span>
          </Link>

          {/* DESKTOP NAV */}
          {!isMobile && (
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {navLinks.map(([label, path]) => (
                <Link
                  key={label}
                  to={path}
                  style={{
                    textDecoration: "none",
                    color: "#0f172a",
                    fontWeight: "600",
                    fontSize: "14px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#dc2626";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#0f172a";
                  }}
                >
                  {label}
                </Link>
              ))}

            </nav>
          )}

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#dc2626",
                zIndex: 1100,
              }}
            >
              ☰
            </button>
          )}
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 999,
          }}
        />
      )}

      {/* RIGHT SIDE MOBILE MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: menuOpen ? "0" : "-280px",
          width: "260px",
          height: "100vh",
          background: "#ffffff",
          zIndex: 1001,
          padding: "80px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          transition: "0.35s ease",
          boxShadow: "-5px 0 25px rgba(0,0,0,0.1)",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "transparent",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "#dc2626",
          }}
        >
          ✕
        </button>

        {navLinks.map(([label, path]) => (
          <Link
            key={label}
            to={path}
            onClick={() => setMenuOpen(false)}
            style={{
              textDecoration: "none",
              color: "#0f172a",
              fontWeight: "600",
              fontSize: "15px",
              padding: "12px 16px",
              borderRadius: "10px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#dc2626";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#0f172a";
            }}
          >
            {label}
          </Link>
        ))}

      </div>
    </>
  );
}