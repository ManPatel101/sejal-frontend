import { Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    
    <footer
      style={{
        background: "#0f172a",
        color: "#94a3b8",
        padding: "64px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr 1.2fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <img
                src="/se_logo/sejal_logo_cropped.png"
                alt="Sejal Engineering Logo"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                }}
              />

              <div>
                <div
                  style={{
                    fontFamily: "'Georgia',serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  Sejal Engineering
                </div>

                <div
                  style={{
                    fontSize: 9,
                    color: "#64748b",
                    fontWeight: 600,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  Fire & Safety Engineering
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                maxWidth: 300,
                marginBottom: 16,
              }}
            >
              India's trusted fire protection engineering company.
              NBC, NFPA, and FM Global compliant solutions since 2002.
            </p>

            <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: 13,
    marginTop: 18,
  }}
>
  <a
    href="tel:+919998356941"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#cbd5e1",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    <Phone size={15} color="#dc2626" />
    <span>+91 99 9835 6941</span>
  </a>

  <a
    href="mailto:sejalengineering@gmail.com"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#cbd5e1",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    <Mail size={15} color="#dc2626" />
    <span>sejalengineering@gmail.com</span>
  </a>
</div>
          </div>

          {[
  {
    title: "Services",
    links: [
      { name: "Fire Hydrant Systems", path: "/services" },
      { name: "Sprinkler Systems", path: "/services" },
      { name: "Fire Alarm Systems", path: "/services" },
      { name: "AMC Services", path: "/services" },
      { name: "Fire Safety Audits", path: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Projects", path: "/projects" },
      { name: "Products", path: "/products" },
      { name: "Certifications", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
].map((col) => (
  <div key={col.title}>
    <div
      style={{
        fontWeight: 700,
        fontSize: 13,
        color: "#fff",
        letterSpacing: 0.5,
        marginBottom: 16,
        textTransform: "uppercase",
      }}
    >
      {col.title}
    </div>

    {col.links.map((l) => (
      <div
        key={l.name}
        onClick={() => navigate(l.path)}
        style={{
          fontSize: 14,
          marginBottom: 10,
          cursor: "pointer",
          transition: "0.25s",
          color: "#94a3b8",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#dc2626";
          e.target.style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#94a3b8";
          e.target.style.transform = "translateX(0px)";
        }}
      >
        {l.name}
      </div>
    ))}
  </div>
))}
        </div>

        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
          }}
        >
          <span>
            © 2024 Sejal Engineering. All rights
            reserved.
          </span>

          <span>
            CIN: U74900GJ2006PTC049XXX | GSTIN:
            24AAXXX1234X1Z5
          </span>
        </div>
      </div>

      <style>{`
        @media(max-width:992px){
          .footer-grid{
            grid-template-columns:1fr!important;
            gap: 32px!important;
          }
        }
      `}</style>
    </footer>
  );
}