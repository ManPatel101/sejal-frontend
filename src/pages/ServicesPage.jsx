import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/ui/FadeIn.jsx";
import { SERVICES } from "../data/index.js";
import { useNavigate } from "react-router-dom";
import { 
  Flame, Droplet, Bell, Eye, Shield, Activity, Wind, Layers, Zap, 
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


export default function ServicesPage({ setPage }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div style={{ paddingTop: 68, overflowX: "hidden" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: "relative", height: "62vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Parallax Background Image */}
        <motion.div style={{ position: "absolute", inset: 0, y: yBg, backgroundImage: 'url("/page_photo/service.png")', backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.55)" }} />
        {/* Dark Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,23,42,0.7) 0%,rgba(15,23,42,0.35) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span style={{ display: "inline-block", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, padding: "3px 10px", marginBottom: 16 }}>
              Services
            </span>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", maxWidth: 750 }}>
              Comprehensive Fire Protection Services
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.7, maxWidth: 650, margin: 0 }}>
              From initial engineering design to ongoing maintenance — we cover every aspect of your facility's fire safety lifecycle.
            </p>
          </motion.div>
        </div>

        {/* Spinning Rings */}
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.20)", pointerEvents: "none" }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.10)", pointerEvents: "none" }} />
      </section>

      {/* Services Grid */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 32 }}>
            {SERVICES.map((s, i) => {
              const IconComponent = ICON_MAP[s.id] || Shield;
              return (
                <FadeIn key={s.id} delay={i * 0.06}>
                  <motion.div
                    className="service-card"
                    whileHover={{
                      borderColor: "#dc2626"
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 18,
                      padding: 20,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                      minHeight: 490,
                      height: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
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

                    <h2 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", margin: "0 0 6px", lineHeight: 1.35 }}>{s.title}</h2>
                    <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.55, margin: "0 0 14px" }}>{s.desc}</p>
                    
                    {/* Features List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                      {s.features && s.features.map((item, index) => (
                        <div key={index} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <Check size={14} strokeWidth={3} style={{ color: "#dc2626", marginTop: 2, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: "#64748b", lineHeight: 1.4 }}>{item}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      onClick={() => navigate("/contact")}
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
                      Get Quote →
                    </motion.button>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>How We Work</div>
              <h2 style={{ fontFamily: "'Georgia',serif", fontSize: 36, color: "#0f172a", fontWeight: 700, margin: 0 }}>Our Delivery Process</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 24 }}>
            {[
              { step: "01", title: "Site Survey", desc: "Our engineers conduct a detailed site assessment and risk analysis to understand your specific fire hazards and project requirements." },
              { step: "02", title: "Engineering Design", desc: "We prepare hydraulic calculations, AutoCAD drawings, and BOQ compliant with NBC 2016 and NFPA standards." },
              { step: "03", title: "Authority Approval", desc: "We liaise with local fire departments for plan sanction and obtain required provisional and final Fire NOC clearances on your behalf." },
              { step: "04", title: "Equipment Supply", desc: "We source and procure certified high-grade fire safety equipment (ISI, UL/FM, and CE marked) matching your project specifications." },
              { step: "05", title: "System Installation", desc: "Our certified technicians execute professional turnkey installations with quality checks at every stage of the project." },
              { step: "06", title: "Testing & Commissioning", desc: "Full system testing, hydrostatic pressure tests, and functional checks before handing over to ensure absolute safety." },
              { step: "07", title: "Safety Training", desc: "We conduct hands-on fire extinguisher usage training, emergency evacuation drills, and safety protocols for your staff." },
              { step: "08", title: "AMC & Support", desc: "Ongoing annual maintenance, 24×7 emergency response, routine safety audits, and compliance reporting throughout asset life." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(220,38,38,0.06)", borderColor: "#fecaca" }}
                  transition={{ duration: 0.2 }}
                  style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 28, height: "100%", boxSizing: "border-box" }}
                >
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: 36, fontWeight: 700, color: "#dc262620", marginBottom: 12 }}>{p.step}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{p.desc}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Georgia',serif", fontSize: 36, color: "#fff", fontWeight: 700, margin: "0 0 20px" }}>Need a Custom Fire Safety Solution?</h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, margin: "0 0 32px" }}>
              Every facility is unique. Our engineers will assess your site and design a compliant, cost-effective protection strategy.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/contact")}
              style={{ padding: "15px 40px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer" }}
            >
              Request Site Assessment
            </motion.button>
          </FadeIn>
        </div>
      </section>

      <style>{`
        .service-card:hover img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}