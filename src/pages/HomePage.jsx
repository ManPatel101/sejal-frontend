import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import FadeIn from "../components/ui/FadeIn.jsx";
import Counter from "../components/ui/Counter.jsx";
import Badge from "../components/ui/Badge.jsx";
import { SERVICES, PRODUCTS_DATA, TESTIMONIALS, CLIENTS, STATS } from "../data/index.js";
import { useNavigate } from "react-router-dom";
import { 
  Phone, Flame, Droplet, Bell, Eye, Shield, Activity, Wind, Layers, Zap, 
  Briefcase, FileText, Award, Users, ClipboardCheck, Wrench, PenTool, 
  Settings, Package, Check 
} from "lucide-react";

const ICON_MAP = {
  1: Flame,
  2: Droplet,
  3: Bell,
  4: Eye,
  5: Shield,
  6: Activity,
  7: Wind,
  8: Layers,
  9: Zap,
  10: Briefcase,
  11: FileText,
  12: Award,
  13: Users,
  14: ClipboardCheck,
  15: Wrench,
  16: PenTool,
  17: Settings,
  18: Package
};

export default function HomePage({ setPage }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(null);

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://sejal-backend.onrender.com";
      const res = await axios.get(
        `${apiBase}/api/products`
      );

      let fetchedProducts = res.data.products || [];
      if (res.data.isGrouped) {
        fetchedProducts = Object.values(res.data.grouped || {}).flat();
      }

      if (fetchedProducts.length === 0) {
        fetchedProducts = PRODUCTS_DATA.map(p => ({
          _id: String(p.id),
          title: p.name,
          category: p.category,
          shortDesc: p.desc,
          fullDesc: p.desc,
          badge: p.badge,
          image: p.img === "🧯" ? "/img/esting.jfif" : 
                 p.img === "🔴" ? "/img/esting.jfif" :
                 p.img === "🔍" ? "/img/fire_detection.png" :
                 p.img === "🌡️" ? "/img/fire_detection.png" :
                 p.img === "🖥️" ? "/img/alarm_systems.png" :
                 p.img === "📟" ? "/img/alarm_systems.png" :
                 p.img === "🌀" ? "/img/sprinkler_systems_v2.png" :
                 p.img === "🗄️" ? "/img/sprinkler_systems_v2.png" :
                 p.img === "💦" ? "/img/sprinkler_systems_v2.png" :
                 p.img === "⬆️" ? "/img/sprinkler_systems_v2.png" :
                 p.img === "⚙️" ? "/img/fire_pumps.png" :
                 p.img === "🔌" ? "/img/fire_pumps.png" : "/img/esting.jfif"
        }));
      }

      let hasAbc = false;
      let hasCo2 = false;
      const filteredProducts = fetchedProducts.filter(p => {
        const title = (p.title || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        if (cat.includes("extinguisher") || title.includes("extinguisher")) {
          if (title.includes("abc") && !hasAbc) {
            hasAbc = true;
            return true;
          }
          if (title.includes("co2") && !hasCo2) {
            hasCo2 = true;
            return true;
          }
          return false;
        }
        return true;
      });

      const sorted = [...filteredProducts].sort((a, b) => {
        const getPriority = (p) => {
          const cat = (p.category || "").toLowerCase();
          const title = (p.title || "").toLowerCase();
          if (title.includes("abc") && (title.includes("extinguisher") || cat.includes("extinguisher"))) return 1;
          if (title.includes("co2") && (title.includes("extinguisher") || cat.includes("extinguisher"))) return 2;
          if (title.includes("smoke") || title.includes("detector")) return 3;
          if (title.includes("hooter") || title.includes("siren") || title.includes("sounder")) return 4;
          if (title.includes("mcp") || title.includes("manual call point") || title.includes("call point")) return 5;
          if (title.includes("sprinkler") || cat.includes("sprinkler")) return 6;
          return 7;
        };
        return getPriority(a) - getPriority(b);
      });

      setProducts(sorted);
    } catch (error) {
      console.log(error);
      const fallback = PRODUCTS_DATA.map(p => ({
        _id: String(p.id),
        title: p.name,
        category: p.category,
        shortDesc: p.desc,
        fullDesc: p.desc,
        badge: p.badge,
        image: p.img === "🧯" ? "/img/esting.jfif" : 
               p.img === "🔴" ? "/img/esting.jfif" :
               p.img === "🔍" ? "/img/fire_detection.png" :
               p.img === "🌡️" ? "/img/fire_detection.png" :
               p.img === "🖥️" ? "/img/alarm_systems.png" :
               p.img === "📟" ? "/img/alarm_systems.png" :
               p.img === "🌀" ? "/img/sprinkler_systems_v2.png" :
               p.img === "🗄️" ? "/img/sprinkler_systems_v2.png" :
               p.img === "💦" ? "/img/sprinkler_systems_v2.png" :
               p.img === "⬆️" ? "/img/sprinkler_systems_v2.png" :
               p.img === "⚙️" ? "/img/fire_pumps.png" :
               p.img === "🔌" ? "/img/fire_pumps.png" : "/img/esting.jfif"
      }));

      let fallbackHasAbc = false;
      let fallbackHasCo2 = false;
      const filteredFallback = fallback.filter(p => {
        const title = (p.title || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        if (cat.includes("extinguisher") || title.includes("extinguisher")) {
          if (title.includes("abc") && !fallbackHasAbc) {
            fallbackHasAbc = true;
            return true;
          }
          if (title.includes("co2") && !fallbackHasCo2) {
            fallbackHasCo2 = true;
            return true;
          }
          return false;
        }
        return true;
      });

      const sorted = [...filteredFallback].sort((a, b) => {
        const getPriority = (p) => {
          const cat = (p.category || "").toLowerCase();
          const title = (p.title || "").toLowerCase();
          if (title.includes("abc") && (title.includes("extinguisher") || cat.includes("extinguisher"))) return 1;
          if (title.includes("co2") && (title.includes("extinguisher") || cat.includes("extinguisher"))) return 2;
          if (title.includes("smoke") || title.includes("detector")) return 3;
          if (title.includes("hooter") || title.includes("siren") || title.includes("sounder")) return 4;
          if (title.includes("mcp") || title.includes("manual call point") || title.includes("call point")) return 5;
          if (title.includes("sprinkler") || cat.includes("sprinkler")) return 6;
          return 7;
        };
        return getPriority(a) - getPriority(b);
      });

      setProducts(sorted);
    }
  };
  const sendInquiry = async () => {
    const nameTrimmed = inquiryForm.name.trim();
    const companyTrimmed = inquiryForm.company.trim();
    const emailTrimmed = inquiryForm.email.trim();
    const phoneTrimmed = inquiryForm.phone.trim();
    const messageTrimmed = inquiryForm.message.trim();

    if (!nameTrimmed || !companyTrimmed || !emailTrimmed || !phoneTrimmed || !messageTrimmed) {
      setErrorMsg("All fields (including Company Name) are required.");
      return;
    }

    if (nameTrimmed.length < 2) {
      setErrorMsg("Please enter a valid name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[789]\d{9}$/;
    if (!phoneRegex.test(phoneTrimmed)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number starting with 7, 8, or 9.");
      return;
    }

    if (messageTrimmed.length < 10) {
      setErrorMsg("Please write a descriptive message (at least 10 characters).");
      return;
    }

    setErrorMsg("");
    setSending(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://sejal-backend.onrender.com";
      const response = await fetch(
        `${apiBase}/api/inquiries`,
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
        setErrorMsg("");

        setTimeout(() => {
          setSent(false);
          setModal(null);

          setInquiryForm({
            name: "",
            company: "",
            email: "",
            phone: "",
            message: "",
          });
        }, 2000);
      } else {
        setErrorMsg(data.message || "Failed to submit. Try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Server error. Try again later.");
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
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden pt-[80px] md:pt-[68px]"
        style={{ backgroundImage: `url("img/BG(1)_ChatGPT.png")` }}
      >

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 to-black/55 z-[1]" />

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
          className="absolute w-[700px] h-[700px] top-[15%] left-1/2 -translate-x-1/2 blur-[60px] z-[1]"
          style={{
            background:
              "radial-gradient(circle, rgba(220,38,38,0.25), transparent 65%)",
          }}
        />

        {/* ✨ Soft Floating Dot */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-2.5 h-2.5 rounded-full bg-red-500 blur-[2px] top-[30%] left-[20%] z-[1]"
        />

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative z-[10] max-w-[1100px] w-full mx-auto px-4 sm:px-6 text-center"
        >

          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-black uppercase tracking-[3px] sm:tracking-[4px] leading-[1.05] text-white text-[40px] sm:text-[60px] md:text-[80px] lg:text-[95px] drop-shadow-[0_15px_50px_rgba(0,0,0,0.6)] break-words"
          >
            <span>SEJAL</span>{" "}
            <span>ENGINEERING</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-4 sm:mt-[18px] mb-3 sm:mb-[14px] font-bold text-gray-100 text-[14px] sm:text-[18px] md:text-[26px] leading-snug"
          >
            Complete Fire Protection Solutions for Modern Industry
          </motion.h2>

          {/* TRUST LINE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-[11px] font-semibold text-gray-300 uppercase tracking-[2px] mb-3 opacity-90"
          >
            INDIA'S TRUSTED FIRE PROTECTION PARTNER
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-[750px] mx-auto text-[12px] sm:text-[14px] text-slate-300 leading-6 sm:leading-7 tracking-wide"
          >
            Engineering-grade fire safety systems for industrial,
            commercial, and infrastructure projects since 2002.
            Compliant with NBC and Gujarat Fire Safety Rules.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
          >

            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/services")}
              className="px-6 sm:px-7 py-3 bg-red-600 text-white font-bold rounded-lg text-sm w-full sm:w-auto"
            >
              Explore Services →
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/contact")}
              className="px-6 sm:px-7 py-3 text-white font-semibold text-sm rounded-lg border border-white/25 bg-white/10 backdrop-blur-md w-full sm:w-auto"
            >
              Get Expert Consultation
            </motion.button>

          </motion.div>

        </motion.div>
      </section>

      {/* Company Intro */}
      <section className="bg-slate-50 py-[110px] px-6 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[80px] items-center">

            {/* LEFT CONTENT */}
            <FadeIn>
              <div
                className="inline-flex items-center gap-2 bg-red-600/10 rounded-full px-4 py-1 mb-5 backdrop-blur-md"
              >
                <span className="text-red-600 text-[11px] font-bold tracking-[1.5px]">
                  WHO WE ARE
                </span>
              </div>

              <h2
                className="font-serif text-[34px] md:text-[clamp(34px,4vw,48px)] text-slate-900 font-bold leading-[1.15] mb-6 tracking-[-1px]"
              >
                Engineering Safety.
                <br />
                Protecting Lives.
              </h2>

              <p className="text-slate-600 text-[15px] md:text-[16px] leading-[1.9] mb-4">
                Sejal Engineering, established in 2002 and based in Ahmedabad,
                Gujarat, is a fire safety engineering and consultancy firm offering
                reliable fire protection solutions. The company combines strong
                engineering expertise with compliance-focused practices to deliver
                efficient, standards-compliant safety systems for industrial,
                commercial, and infrastructure projects.
              </p>

              <p className="text-slate-600 text-[15px] md:text-[16px] leading-[1.9] mb-8">
                From greenfield industrial projects to high-rise commercial buildings
                and healthcare facilities, we provide end-to-end fire protection
                solutions including design, supply, installation, and maintenance of
                integrated systems in compliance with NBC, NFPA, IS, and FM Global
                standards.
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-3">
                {[
                  "NBC 2016 Compliant",
                  "ISO 9001:2015",
      
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* RIGHT IMAGE CARDS */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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
                    className="relative h-[220px] md:h-[240px] rounded-[20px] overflow-hidden cursor-pointer shadow-lg"
                  >

                    {/* IMAGE */}
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />

                    {/* TEXT */}
                    <div className="absolute bottom-0 left-0 p-5 md:p-[22px] z-10">
                      <div className="text-white text-[16px] md:text-[18px] font-bold mb-2 leading-[1.3] drop-shadow-lg">
                        {item.title}
                      </div>

                      <div className="text-white/80 text-[12px] md:text-[13px] leading-[1.6]">
                        {item.desc}
                      </div>
                    </div>

                  </motion.div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-[100px] px-6 bg-[#f4ecec]">
        <div className="max-w-[1280px] mx-auto">

          <FadeIn>
            <div className="text-center mb-[60px]">

              <div className="text-[12px] font-bold tracking-[2px] text-red-600 uppercase mb-3">
                What We Do
              </div>

              <h2 className="font-serif text-[32px] md:text-[40px] text-slate-900 font-bold mb-4">
                Our Core Services
              </h2>

              <p className="text-slate-600 text-[15px] md:text-[16px] max-w-[500px] mx-auto leading-[1.8]">
                Integrated fire protection services engineered for
                safety-critical environments.
              </p>

            </div>
          </FadeIn>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {SERVICES.slice(0, 6).map((s, i) => {
              const IconComponent = ICON_MAP[s.id] || Shield;
              return (
                <FadeIn key={s.id} delay={i * 0.07}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 60px rgba(220,38,38,0.12)",
                      borderColor: "#dc2626"
                    }}
                    onClick={() => navigate("/services")}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 18,
                      padding: 24,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                      minHeight: 460,
                      height: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "border-color 0.3s ease"
                    }}
                  >
                    {/* Image Cover */}
                    <div style={{ height: 165, borderRadius: 12, overflow: "hidden", position: "relative", marginBottom: 16 }}>
                      <img
                        src={s.image}
                        alt={s.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 80%)" }} />
                      
                      {/* Floating Icon */}
                      <div style={{ position: "absolute", bottom: 10, left: 10, width: 38, height: 38, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                        <IconComponent size={18} strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", margin: "0 0 8px", lineHeight: 1.35 }}>
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.55, margin: "0 0 16px" }}>
                      {s.desc}
                    </p>

                    {/* Features List Preview (first 2 features) */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                      {s.features && s.features.slice(0, 2).map((item, index) => (
                        <div key={index} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <Check size={13} strokeWidth={3} style={{ color: "#dc2626", marginTop: 2, flexShrink: 0 }} />
                          <span style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.4 }}>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/services");
                      }}
                      style={{
                        marginTop: "auto",
                        padding: "9px 18px",
                        background: "transparent",
                        border: "1.5px solid #dc2626",
                        color: "#dc2626",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        width: "100%"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#dc2626";
                        e.target.style.color = "#fff";
                        e.target.style.boxShadow = "0 6px 20px rgba(220,38,38,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#dc2626";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Learn More &rarr;
                    </button>
                  </motion.div>
                </FadeIn>
              );
            })}

          </div>

          {/* Bottom Button */}
          <FadeIn delay={0.3}>
            <div className="text-center mt-[52px]">

              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 15px 40px rgba(220,38,38,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/services")}
                className="px-[38px] py-[15px] bg-red-600 text-white rounded-[10px] font-bold text-[15px] shadow-lg"
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
                  whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.03)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #f1f5f9",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      height: 250,
                      background: "#fff",
                      borderBottom: "1px solid #f1f5f9",
                      padding: "0",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={p.image}
                      alt={p.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                        {p.category}
                      </span>
                      <Badge>{p.badge}</Badge>
                    </div>

                    {/* Product Name */}
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#0f172a",
                        margin: "0 0 16px",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        height: 44,
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#b91c1c" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setModal(p)}
                      style={{
                        width: "100%",
                        padding: "11px",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
                        transition: "background-color 0.2s ease",
                        marginTop: "auto",
                      }}
                    >
                      View Product
                    </motion.button>
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
                setErrorMsg("");
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
                  background: "#fff",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={modal.image}
                  alt={modal.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "16px",
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
                    onClick={() => { setModal(null); setErrorMsg(""); }}
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
                      whiteSpace: "pre-line",
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
                      whiteSpace: "pre-line",
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
                      {errorMsg && (
                        <div style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                          ⚠️ {errorMsg}
                        </div>
                      )}
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
                        placeholder="Company Name"
                        value={inquiryForm.company}
                        onChange={(e) =>
                          setInquiryForm({
                            ...inquiryForm,
                            company: e.target.value,
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
                +91 99983 56941
              </motion.button>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
