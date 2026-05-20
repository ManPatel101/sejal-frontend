import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function ProjectsPage() {
  const [activeType, setActiveType] = useState("All");
  const types = ["All", ...new Set(PROJECTS.map(p => p.type))];
  const filtered = activeType === "All" ? PROJECTS : PROJECTS.filter(p => p.type === activeType);

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#fef2f2,#fff)", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>Projects</div>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(36px,5vw,56px)", color: "#0f172a", fontWeight: 700, margin: "0 0 20px" }}>
              Our Landmark Projects
            </h1>
            <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.7, maxWidth: 650 }}>
              850+ completed projects across industrial, commercial, healthcare, and infrastructure sectors — each delivered on time and to the highest safety standards.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Filter */}
          <FadeIn>
            <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
              {types.map(t => (
                <button key={t} onClick={() => setActiveType(t)}
                  style={{
                    padding: "8px 20px", borderRadius: 8,
                    border: `1.5px solid ${activeType === t ? "#dc2626" : "#e2e8f0"}`,
                    background: activeType === t ? "#dc2626" : "#fff",
                    color: activeType === t ? "#fff" : "#374151",
                    fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s"
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id} layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.div whileHover={{ y: -5 }}
                    style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                    <div style={{
                      background: `linear-gradient(135deg,${TYPE_COLORS[p.type] || "#dc2626"}18,${TYPE_COLORS[p.type] || "#dc2626"}08)`,
                      height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70, position: "relative"
                    }}>
                      {p.img}
                      <span style={{
                        position: "absolute", top: 14, right: 14,
                        background: TYPE_COLORS[p.type] || "#dc2626",
                        color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100
                      }}>
                        {p.type}
                      </span>
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", margin: "0 0 12px", lineHeight: 1.4 }}>{p.name}</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 13 }}>📍</span>
                          <span style={{ fontSize: 13, color: "#64748b" }}>{p.location}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 13 }}>🔧</span>
                          <span style={{ fontSize: 13, color: "#64748b" }}>{p.scope}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 13 }}>📐</span>
                          <span style={{ fontSize: 13, color: "#64748b" }}>{p.size}</span>
                        </div>
                      </div>
                      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>Completed</span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#dc2626" }}>{p.year}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section style={{ background: "#0f172a", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 32, textAlign: "center" }}>
              {[
                { value: "850+", label: "Projects Completed" },
                { value: "18+", label: "Years Experience" },
                { value: "120+", label: "Cities Covered" },
                { value: "96%", label: "Client Retention" },
              ].map((s, i) => (
                <div key={i} style={{ color: "#fff" }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: 44, fontWeight: 700, color: "#dc2626", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}