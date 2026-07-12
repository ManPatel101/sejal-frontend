import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/ui/FadeIn.jsx";
import { SERVICES } from "../data/index.js";
import { useNavigate } from "react-router-dom";

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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 28 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16,
                    padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                    minHeight: 480, height: "100%", boxSizing: "border-box",
                    display: "flex", flexDirection: "column"
                  }}
                >
                  <div style={{ width: 60, height: 60, background: "#fef2f2", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                    <img
                      src={s.image}
                      alt={s.title}
                      style={{ width: "70%", height: "70%", objectFit: "contain" }}
                    />
                  </div>
                  <h2 style={{ fontWeight: 700, fontSize: 20, color: "#0f172a", margin: "0 0 12px" }}>{s.title}</h2>
                  <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.75, margin: "0 0 24px" }}>{s.desc}</p>
                  <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>
                    {s.id === 1 && ["Internal hydrant systems", "External ring mains", "Underground piping networks", "Hose box & monitor nozzle supply"].map(item => <li key={item}>{item}</li>)}
                    {s.id === 2 && ["Wet pipe sprinkler systems", "Deluge & foam-water systems", "ESFR storage rack systems", "Mist suppression systems"].map(item => <li key={item}>{item}</li>)}
                    {s.id === 3 && ["Addressable loop systems", "Conventional zone panels", "Voice evacuation systems", "Gas suppression tie-in"].map(item => <li key={item}>{item}</li>)}
                    {s.id === 4 && ["DCP & CO2 extinguishers", "Foam & water extinguishers", "Clean agent (HFC-227ea)", "Annual recharge & tagging"].map(item => <li key={item}>{item}</li>)}
                    {s.id === 5 && ["Quarterly inspection visits", "Emergency breakdown support", "Spare parts management", "Insurance compliance reports"].map(item => <li key={item}>{item}</li>)}
                    {s.id === 6 && ["Fire risk assessment", "Escape route analysis", "NOC documentation support", "Staff fire safety training"].map(item => <li key={item}>{item}</li>)}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate("/contact")}
                    style={{ marginTop: "auto", padding: "10px 22px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}
                  >
                    Get Quote →
                  </motion.button>
                </motion.div>
              </FadeIn>
            ))}
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
              { step: "01", title: "Site Survey", desc: "Our engineers conduct a detailed site assessment and risk analysis to understand your exact requirements." },
              { step: "02", title: "Engineering Design", desc: "We prepare hydraulic calculations, AutoCAD drawings, and BOQ compliant with NBC 2016 and NFPA standards." },
              { step: "03", title: "Authority Approval", desc: "We liaise with local fire departments for plan sanction and obtain required NOC clearances on your behalf." },
              { step: "04", title: "Installation", desc: "Certified technicians execute the installation with quality checks at every stage of the project." },
              { step: "05", title: "Testing & Commissioning", desc: "Full system testing, hydrostatic pressure tests, and functional checks before handing over." },
              { step: "06", title: "AMC & Support", desc: "Ongoing annual maintenance, 24×7 emergency response, and compliance reporting throughout asset life." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 28 }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: 36, fontWeight: 700, color: "#dc262620", marginBottom: 12 }}>{p.step}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{p.desc}</div>
                </div>
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
              onClick={() => setPage("Contact")}
              style={{ padding: "15px 40px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer" }}
            >
              Request Site Assessment
            </motion.button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}