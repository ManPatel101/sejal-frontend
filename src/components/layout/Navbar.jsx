import { Link } from "react-router-dom";

export default function Navbar() {
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
  }}
>
  <img
    src="se_logo\croped.png"
    alt="Sejal Engineering Logo"
    style={{
      width: 42,
      height: 42,
      objectFit: "contain",
    }}
  />

  <span
    style={{
      fontSize: "22px",
      fontWeight: "800",
      color: "#dc2626",
      letterSpacing: "1px",
    }}
  >
    SEJAL ENGINEERING
  </span>
</Link>

        {/* NAV LINKS */}
        <nav
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
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
            style={{
              marginLeft: "10px",
              padding: "8px 14px",
              borderRadius: "8px",
              background: "#dc2626",
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              textDecoration: "none",
    
            }}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}



{/*
  import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
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

        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "800",
            color: "#dc2626",
            letterSpacing: "1px",
          }}
        >
          AEGIS FIRE
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "22px",
            alignItems: "center",
          }}
        >
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Services", "/services"],
            ["Products", "/products"],
            ["Projects", "/projects"],
            ["Contact", "/contact"],
          ].map(([name, path]) => (
            <Link
              key={name}
              to={path}
              style={{
                textDecoration: "none",
                color: "#0f172a",
                fontWeight: "500",
                fontSize: "15px",
                position: "relative",
                padding: "6px 0",
              }}
              onMouseOver={(e) => (e.target.style.color = "#dc2626")}
              onMouseOut={(e) => (e.target.style.color = "#0f172a")}
            >
              {name}
            </Link>
          ))}

          <Link
            to="/admin"
            style={{
              marginLeft: 10,
              padding: "8px 14px",
              background: "#dc2626",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
*/}