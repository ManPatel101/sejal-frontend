import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import FadeIn from "../components/ui/FadeIn.jsx";
import Counter from "../components/ui/Counter.jsx";
import Badge from "../components/ui/Badge.jsx";
import { SERVICES, PRODUCTS_DATA, TESTIMONIALS, CLIENTS, STATS } from "../data/index.js";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

export default function HomePage({ setPage }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(null);

const [inquiryForm, setInquiryForm] = useState({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const [sent, setSent] = useState(false);
const [sending, setSending] = useState(false);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const res = await axios.get(
      "https://sejal-backend.onrender.com/api/products"
    );

    setProducts(res.data.products || []);
  } catch (error) {
    console.log(error);
  }
};
const sendInquiry = async () => {
  if (
    !inquiryForm.name ||
    !inquiryForm.email ||
    !inquiryForm.phone ||
    !inquiryForm.message
  ) {
    alert("Please fill all fields");
    return;
  }

  setSending(true);

  try {
    const response = await fetch(
      "https://sejal-backend.onrender.com/api/inquiries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inquiryForm,
          product: modal?.title,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setSent(true);

      setTimeout(() => {
        setSent(false);
        setModal(null);

        setInquiryForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setSending(false);
  }
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

  return (
    <div>
    {/* Hero */}
<section
  style={{
    height: "100vh",
    backgroundImage: `url("img/BG(1)_ChatGPT.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    paddingTop: 68,
  }}
>

  {/* Dark Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.55))",
      zIndex: 1,
    }}
  />

  {/* ✨ Animated Glow Layer */}
  <motion.div
    animate={{
      opacity: [0.25, 0.45, 0.25],
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{
      position: "absolute",
      width: 700,
      height: 700,
      background:
        "radial-gradient(circle, rgba(220,38,38,0.25), transparent 65%)",
      top: "15%",
      left: "50%",
      transform: "translateX(-50%)",
      filter: "blur(60px)",
      zIndex: 1,
    }}
  />

  {/* ✨ Soft Floating Light Dot */}
  <motion.div
    animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 6, repeat: Infinity }}
    style={{
      position: "absolute",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#ef4444",
      top: "30%",
      left: "20%",
      filter: "blur(2px)",
      zIndex: 1,
    }}
  />

  {/* MAIN CONTENT */}
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.9 }}
    style={{
      maxWidth: 1100,
      width: "100%",
      margin: "0 auto",
      padding: "20px 24px",
      position: "relative",
      zIndex: 2,
      textAlign: "center",
    }}
  >

    {/* Company Name */}
<motion.h1
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  style={{
    fontSize: "clamp(48px, 8vw, 95px)",
    fontWeight: 900,
    margin: 0,
    lineHeight: 1,
    letterSpacing: 4,
    textTransform: "uppercase",
    textShadow:
      "0 2px 10px rgba(0,0,0,0.4), 0 15px 50px rgba(0,0,0,0.6)",
  }}
>
  <span style={{ color: "#ffffff" }}>SEJAL</span>{" "}
  <span style={{ color: "#ffffff" }}>ENGINEERING</span>
</motion.h1>

    {/* Subtitle */}
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7 }}
      style={{
        fontSize: "clamp(16px, 2vw, 26px)",
        color: "#f3f4f6",
        marginTop: 18,
        marginBottom: 14,
        fontWeight: 700,
        lineHeight: 1.4,
        textShadow: "0 3px 15px rgba(0,0,0,0.5)",
      }}
    >
      Complete Fire Protection Solutions for Modern Industry
    </motion.h2>

    {/* TRUST LINE */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: "#e5e7eb",
        marginBottom: 12,
        letterSpacing: 2,
        textTransform: "uppercase",
        opacity: 0.9,
      }}
    >
      INDIA'S TRUSTED FIRE PROTECTION PARTNER
    </motion.div>

    {/* DESCRIPTION */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.7 }}
      style={{
        maxWidth: 750,
        margin: "0 auto",
        fontSize: 14,
        color: "#cbd5e1",
        lineHeight: 1.8,
        fontWeight: 400,
        letterSpacing: 0.2,
        textShadow: "0 2px 12px rgba(0,0,0,0.35)",
      }}
    >
      Engineering-grade fire safety systems for industrial,
      commercial, and infrastructure projects since 2010.
      Compliant with NBC and Gujarat Fire Safety Rules.
    </motion.p>

    {/* BUTTONS */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 18,
        flexWrap: "wrap",
        marginTop: 32,
      }}
    >
      {/* Primary Button */}
      {/* Primary Button */}
<motion.button
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{ scale: 0.96 }}
  onClick={() => navigate("/services")}
  style={{
    padding: "14px 30px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  Explore Services →
</motion.button>

{/* Secondary Button */}
<motion.button
  whileHover={{
    scale: 1.03,
    background: "rgba(255,255,255,0.12)",
  }}
  whileTap={{ scale: 0.96 }}
  onClick={() => navigate("/contact")}
  style={{
    padding: "14px 30px",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  }}
>
  Get Expert Consultation
</motion.button>
    </motion.div>
  </motion.div>
</section>

{/* Company Intro */}
<section
  style={{
    background: "#f8fafc",
    padding: "110px 24px",
    position: "relative",
    overflow: "hidden",
  }}
>
  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}
      className="two-col"
    >

      {/* LEFT CONTENT */}
      <FadeIn>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#dc262612",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 18,
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              color: "#dc2626",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            WHO WE ARE
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(34px,4vw,48px)",
            color: "#0f172a",
            fontWeight: 700,
            lineHeight: 1.15,
            margin: "0 0 24px",
            letterSpacing: -1,
          }}
        >
          Engineering Safety.
          <br />
          Protecting Lives.
        </h2>

        <p
          style={{
            color: "#475569",
            fontSize: 16,
            lineHeight: 1.9,
            margin: "0 0 18px",
          }}
        >
          Sejal Engineering, established in 2010 and based in Ahmedabad,
          Gujarat, is a fire safety engineering and consultancy firm offering
          reliable fire protection solutions. The company combines strong
          engineering expertise with compliance-focused practices to deliver
          efficient, standards-compliant safety systems for industrial,
          commercial, and infrastructure projects.
        </p>

        <p
          style={{
            color: "#475569",
            fontSize: 16,
            lineHeight: 1.9,
            margin: "0 0 32px",
          }}
        >
          From greenfield industrial projects to high-rise commercial buildings
          and healthcare facilities, we provide end-to-end fire protection
          solutions including design, supply, installation, and maintenance of
          integrated systems in compliance with NBC, NFPA, IS, and FM Global
          standards.
        </p>

        {/* TAGS */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {[
            "NBC 2016 Compliant",
            "NFPA 13/72 Certified",
            "ISO 9001:2015",
            "DGFASLI Empanelled",
          ].map((t) => (
            <span
              key={t}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 600,
                color: "#334155",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
              }}
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* RIGHT IMAGE CARDS */}
      <FadeIn delay={0.2}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {[
            {
              img: "/img/turnkey_project.jpg",
              title: "Turnkey Projects",
              desc:
                "End-to-end fire protection from design to commissioning and NOC",
            },
            {
              img: "/img/eng_design.jpg",
              title: "Engineering Design",
              desc:
                "Hydraulic calculations, isometrics, AutoCAD/Revit fire drawings",
            },
            {
              img: "/img/noc.jpeg",
              title: "NOC Assistance",
              desc:
                "Coordination with fire authorities for statutory approvals, compliance clearance, and occupancy NOC.",
            },
            {
              img: "/img/service.jpg",
              title: "24×7 Support",
              desc:
                "Round-the-clock emergency breakdown response across all AMC sites",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative",
                height: 240,
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
              }}
            >

              {/* IMAGE */}
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* DARK OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.2))",
                }}
              />

              {/* TEXT */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: 22,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 8,
                    lineHeight: 1.3,
                    textShadow: "0 2px 12px rgba(0,0,0,0.45)",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  </div>

  {/* MOBILE RESPONSIVE */}
  <style>
    {`
      @media(max-width: 768px){

        .two-col{
          grid-template-columns: 1fr !important;
        }

        .two-col h2{
          font-size: 34px !important;
        }

      }
    `}
  </style>
</section>

      {/* Services Preview */}
      <section style={{ padding: "100px 24px", background: "#f4ecec" }}>
  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#dc2626",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          What We Do
        </div>

        <h2
          style={{
            fontFamily: "'Georgia',serif",
            fontSize: 40,
            color: "#0f172a",
            fontWeight: 700,
            margin: "0 0 16px",
          }}
        >
          Our Core Services
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: 16,
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Integrated fire protection services engineered for
          safety-critical environments.
        </p>
      </div>
    </FadeIn>

    {/* Service Cards */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
        gap: 24,
      }}
    >
      {SERVICES.map((s, i) => (
        <FadeIn key={s.id} delay={i * 0.07}>
          <motion.div
            whileHover={{
              y: -8,
              boxShadow: "0 20px 60px rgba(220,38,38,0.12)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#ffffff",
              border: "1px solid #eceff3",
              borderRadius: 18,
              padding: 30,
              cursor: "pointer",
              height: "100%",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 4,
                background:
                  "linear-gradient(90deg,#dc2626,#ef4444,#f87171)",
              }}
            />

            {/* Icon / Small Image */}
            <div
              style={{
                width: 58,
                height: 58,
                background: "#fef2f2",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                border: "1px solid #fee2e2",
                boxShadow: "0 4px 12px rgba(220,38,38,0.08)",
              }}
            >
              <img
                src={s.image}
                alt={s.title}
                style={{
                  width: "70%",
                  height: "70%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Title */}
            <h3
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "#0f172a",
                margin: "0 0 12px",
                lineHeight: 1.4,
              }}
            >
              {s.title}
            </h3>

            {/* Description */}
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                lineHeight: 1.8,
                margin: "0 0 24px",
              }}
            >
              {s.desc}
            </p>

            {/* Learn More */}
          <button
  onClick={() => navigate("/services")}
  style={{
    color: "#dc2626",
    fontWeight: 700,
    fontSize: 14,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    gap: 6,
  }}
>
  Learn More
  <span style={{ fontSize: 18 }}>→</span>
</button>

            {/* Glow Effect */}
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                background:
                  "radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </FadeIn>
      ))}
    </div>

    {/* Bottom Button */}
    <FadeIn delay={0.3}>
      <div style={{ textAlign: "center", marginTop: 52 }}>
        <motion.button
          whileHover={{
            scale: 1.04,
            boxShadow: "0 15px 40px rgba(220,38,38,0.25)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/services")}
          style={{
            padding: "15px 38px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(220,38,38,0.18)",
          }}
        >
          View All Services
        </motion.button>
      </div>
    </FadeIn>
  </div>
</section>

      {/* Stats */}
      <section style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, textAlign: "center" }} className="stats-grid">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ color: "#fff" }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(40px,5vw,64px)", fontWeight: 700, lineHeight: 1 }}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.85, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </section>

      {/* Featured Products */}
      {/* Featured Products */}
<section style={{ padding: "100px 24px", background: "#f8fafc" }}>
  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#dc2626",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Our Products
        </div>

        <h2
          style={{
            fontFamily: "'Georgia',serif",
            fontSize: 40,
            color: "#0f172a",
            fontWeight: 700,
            margin: "0 0 16px",
          }}
        >
          Featured Equipment
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: 16,
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          BIS, UL, FM approved fire protection equipment
          from trusted manufacturers.
        </p>
      </div>
    </FadeIn>

    {/* Product Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
        gap: 24,
      }}
    >
      {products.slice(0, 6).map((p, i) => (
        <FadeIn key={p._id} delay={i * 0.07}>
          <motion.div
            whileHover={{
              y: -6,
              boxShadow: "0 20px 50px rgba(220,38,38,0.12)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              height: "100%",
            }}
          >
            {/* Product Image */}
            <div
              style={{
                height: 180,
                background: "#f8fafc",
                overflow: "hidden",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: 18 }}>
              
              {/* Category Badge */}
              {/* Top Tags */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  }}
>
  {/* Badge */}
  <div
    style={{
      background: "#dc2626",
      color: "#fff",
      padding: "5px 12px",
      borderRadius: 999,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
    }}
  >
    {p.badge}
  </div>

  {/* Category */}
  <div
    style={{
      background: "#fef2f2",
      color: "#dc2626",
      padding: "5px 12px",
      borderRadius: 999,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
      border: "1px solid #fee2e2",
    }}
  >
    {p.category}
  </div>
</div>

              {/* Product Name */}
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#0f172a",
                  margin: "0 0 10px",
                  lineHeight: 1.4,
                }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {p.shortDesc?.slice(0, 90)}...
              </p>

              {/* Button */}
              <button
                onClick={() => setModal(p)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                View Product
              </button>
            </div>
          </motion.div>
        </FadeIn>
      ))}
    </div>

    {/* Bottom Button */}
    <FadeIn delay={0.3}>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <motion.button
          whileHover={{
            scale: 1.04,
            boxShadow: "0 15px 40px rgba(220,38,38,0.20)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/products")}
          style={{
            padding: "15px 38px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          View All Products
        </motion.button>
      </div>
    </FadeIn>

  </div>
</section>
<AnimatePresence>
  {modal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setModal(null);
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: 620,
          borderRadius: 22,
          overflow: "hidden",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            height: 280,
            overflow: "hidden",
            background: "#f8fafc",
          }}
        >
          <img
            src={modal.image}
            alt={modal.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* CONTENT */}
        <div style={{ padding: 32 }}>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 18,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "#fef2f2",
                  color: "#dc2626",
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {modal.category}
              </div>

              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {modal.title}
              </h2>
            </div>

            <button
              onClick={() => setModal(null)}
              style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: 10,
                width: 40,
                height: 40,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ marginBottom: 28 }}>

  {/* SHORT DESCRIPTION */}
  <p
    style={{
      color: "#0f172a",
      lineHeight: 1.8,
      fontSize: 15,
      fontWeight: 600,
      marginBottom: 14,
    }}
  >
    {modal.shortDesc}
  </p>

  {/* FULL DESCRIPTION */}
  <p
    style={{
      color: "#475569",
      lineHeight: 1.9,
      fontSize: 15,
      margin: 0,
    }}
  >
    {modal.fullDesc}
  </p>

</div>
          {/* INQUIRY FORM */}
          <div
            style={{
              background: "#f8fafc",
              padding: 22,
              borderRadius: 16,
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 18,
                color: "#0f172a",
              }}
            >
              Send Inquiry
            </h3>

            {sent ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#16a34a",
                  fontWeight: 700,
                  padding: 20,
                }}
              >
                Inquiry Submitted Successfully
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                <input
                  placeholder="Your Name"
                  value={inquiryForm.name}
                  onChange={(e) =>
                    setInquiryForm({
                      ...inquiryForm,
                      name: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  placeholder="Email Address"
                  value={inquiryForm.email}
                  onChange={(e) =>
                    setInquiryForm({
                      ...inquiryForm,
                      email: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  placeholder="Phone Number"
                  value={inquiryForm.phone}
                  onChange={(e) =>
                    setInquiryForm({
                      ...inquiryForm,
                      phone: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <textarea
                  placeholder="Message"
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm({
                      ...inquiryForm,
                      message: e.target.value,
                    })
                  }
                  style={{
                    ...inputStyle,
                    height: 110,
                    resize: "none",
                  }}
                />

                <button
  onClick={sendInquiry}
  disabled={sending}
  style={{
    background: sending ? "#f87171" : "#dc2626",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: sending ? "not-allowed" : "pointer",
    fontSize: 15,
    opacity: sending ? 0.8 : 1,
    transition: "0.3s",
  }}
>
  {sending ? "Sending Inquiry..." : "Submit Inquiry"}
</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Testimonials */}
      <section style={{ padding: "100px 24px", background: "#f4ecec" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>Testimonials</div>
              <h2 style={{ fontFamily: "'Georgia',serif", fontSize: 40, color: "#0f172a", fontWeight: 700, margin: 0 }}>What Our Clients Say</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
  style={{
    background: "#f8fafc",
    border: "1px solid #f1f5f9",
    borderRadius: 14,
    padding: 28,
    height: "100%",
    minHeight: 320,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
  }}
>
                  <div style={{ color: "#dc2626", fontSize: 22, marginBottom: 14 }}>{"★".repeat(t.rating)}</div>
                  <p
  style={{
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.75,
    margin: "0 0 20px",
    fontStyle: "italic",
    flexGrow: 1,
  }}
>"{t.text}"</p>
                  <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section style={{ padding: "60px 24px", background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#94a3b8", textTransform: "uppercase", marginBottom: 36 }}>Trusted by Industry Leaders</p>
          </FadeIn>
          <div
  style={{
    overflow: "hidden",
    position: "relative",
    width: "100%",
  }}
>
  <motion.div
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      display: "flex",
      gap: 16,
      width: "max-content",
    }}
  >
    {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div
  style={{
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "18px 28px",
    minWidth: 180,
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  }}
>
  <img
    src={c}
    alt="Client Logo"
    style={{
      maxWidth: "120px",
      maxHeight: "50px",
      objectFit: "contain",
      filter: "none",
      opacity: 1,
    }}
  />
</div>
              </FadeIn>
            ))}
              </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
  <FadeIn>
    <h2 style={{ fontFamily: "'Georgia',serif", fontSize: 42, color: "#fff", fontWeight: 700, margin: "0 0 20px" }}>
      Ready to Protect Your Facility?
    </h2>

    <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, margin: "0 0 36px" }}>
      Get a professional site assessment and customized fire protection engineering proposal tailored to your project requirements.
    </p>

    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
      
      <motion.button
        whileHover={{ scale: 1.04 }}
        onClick={() => navigate("/contact")}
        style={{
          padding: "15px 36px",
          background: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Get Expert Consultation →
      </motion.button>

<motion.button
  whileHover={{ scale: 1.04 }}
  onClick={() => window.location.href = "tel:+919998356941"}
  style={{
    padding: "15px 36px",
    background: "transparent",
    color: "#fff",
    border: "1.5px solid #334155",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10
  }}
>
  <Phone size={18} color="#dc2626" />
  +91 9998356941
</motion.button>

    </div>
  </FadeIn>
</div>
      </section>
    </div>
  );
}
