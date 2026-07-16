import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/ui/FadeIn.jsx";
import { PROJECTS } from "../data/index.js";

const TYPE_COLORS = {
  Industrial: "#dc2626",
  Commercial: "#2563eb",
  Healthcare: "#16a34a",
  Warehousing: "#d97706",
  Educational: "#7c3aed",
  Hospitality: "#db2777",
  Petrochemical: "#ea580c",
  Retail: "#0891b2",
};

const PROJECT_IMAGES = {
  1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", 
  2: "/project/yazaki-india-pvt-ltd.avif", 
  3: "/project/acume chemi.jpg", 
  4: "/project/hudco bhavan.webp", 
  5: "/project/shri jag.png", 
  6: "/project/shri jag.png", 
  7: "/project/techtex.png", 
  8: "/project/DAIICT.webp", 
  9: "/project/prayosha.jpg",
  10: "/project/devshree.jfif",
  11: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
  12: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
  13: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
};

export default function ProjectsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const [activeType, setActiveType] = useState("All");
  const types = ["All", ...new Set(PROJECTS.map(p => p.type))];
  const filtered = activeType === "All" ? PROJECTS : PROJECTS.filter(p => p.type === activeType);

  return (
    <div style={{ paddingTop: 68, overflowX: "hidden" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: "relative", height: "62vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Parallax Background Image */}
        <motion.div style={{ position: "absolute", inset: 0, y: yBg, backgroundImage: 'url("/page_photo/project.png")', backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.55)" }} />
        {/* Dark Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,23,42,0.7) 0%,rgba(15,23,42,0.35) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span style={{ display: "inline-block", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, padding: "3px 10px", marginBottom: 16 }}>
              Projects
            </span>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", maxWidth: 750 }}>
              Our Landmark Projects
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.7, maxWidth: 650, margin: 0 }}>
              850+ completed projects across industrial, commercial, healthcare, and infrastructure sectors — each delivered on time and to the highest safety standards.
            </p>
          </motion.div>
        </div>

        {/* Spinning Rings */}
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.20)", pointerEvents: "none" }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.10)", pointerEvents: "none" }} />
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Filter */}
          <FadeIn>
            <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
              {types.map(t => (
                <button key={t} onClick={() => setActiveType(t)}
                  style={{
                    padding: "10px 24px", borderRadius: 100,
                    border: `1.5px solid ${activeType === t ? "#dc2626" : "#cbd5e1"}`,
                    background: activeType === t ? "#dc2626" : "#fff",
                    color: activeType === t ? "#fff" : "#475569",
                    fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s ease",
                    boxShadow: activeType === t ? "0 4px 12px rgba(220,38,38,0.2)" : "0 2px 4px rgba(0,0,0,0.02)"
                  }}
                  onMouseEnter={(e) => {
                    if (activeType !== t) {
                      e.currentTarget.style.borderColor = "#dc2626";
                      e.currentTarget.style.color = "#dc2626";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeType !== t) {
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.color = "#475569";
                    }
                  }}
                  >
                  {t}
                </button>
              ))}
            </div>
          </FadeIn>
          <style dangerouslySetInnerHTML={{ __html: `
            .projects-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
            }
            @media (max-width: 1024px) {
              .projects-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (max-width: 768px) {
              .projects-grid {
                grid-template-columns: 1fr;
              }
            }
          `}} />
          <motion.div layout className="projects-grid">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id} layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <motion.div
                    whileHover="hover"
                    style={{
                      position: "relative",
                      borderRadius: 16,
                      overflow: "hidden",
                      height: 300,
                      cursor: "pointer",
                      boxShadow: "0 10px 25px -12px rgba(15, 23, 42, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}>
                    
                    {/* Background Company Photo */}
                    <motion.div
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("${PROJECT_IMAGES[p.id] || "/page_photo/project.png"}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: 0
                      }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.45) 50%, rgba(10, 15, 30, 0.1) 100%)",
                        zIndex: 1
                      }}
                    />

                    {/* Bottom Left Corner Text Content */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        padding: "24px 28px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        pointerEvents: "none"
                      }}
                    >
                      {/* Company Category · Location */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)"
                      }}>
                        {/* Category Name in Custom Accent Color (All Caps) */}
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          color: TYPE_COLORS[p.type] || "#dc2626"
                        }}>
                          {p.type}
                        </span>
                        
                        {/* Dot Separator */}
                        <span style={{
                          color: "#94a3b8",
                          margin: "0 6px",
                          fontSize: "11px",
                          fontWeight: 700
                        }}>
                          ·
                        </span>

                        {/* Location Name in Light Grey (All Caps) */}
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          color: "#cbd5e1"
                        }}>
                          {p.location.split(",")[0].trim()}
                        </span>
                      </div>

                      {/* Company Name (All Caps) */}
                      <h3 style={{
                        fontWeight: 800,
                        fontSize: "18px",
                        color: "#ffffff",
                        margin: "2px 0 4px",
                        lineHeight: 1.25,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontFamily: "'Inter', sans-serif",
                        textShadow: "0 2px 8px rgba(10, 15, 30, 0.9)"
                      }}>
                        {p.name}
                      </h3>

                      {/* What we worked on (Scope - Mixed Case) */}
                      <p style={{
                        fontSize: "13px",
                        color: "#86b6de",
                        fontWeight: 500,
                        lineHeight: 1.4,
                        margin: 0,
                        textShadow: "0 1px 4px rgba(10, 15, 30, 0.8)",
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {p.scope}
                      </p>
                    </div>

                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      {/* <section style={{ background: "#0f172a", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 32, textAlign: "center" }}>
              {[
                { value: "850+", label: "Projects Completed" },
                { value: "18+", label: "Years Experience" },
                { value: "120+", label: "Cities Covered" },
                { value: "500+", label: "Industrial Clients" },
              ].map((s, i) => (
                <div key={i} style={{ color: "#fff" }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: 44, fontWeight: 700, color: "#dc2626", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section> */}
    </div>
  );
}