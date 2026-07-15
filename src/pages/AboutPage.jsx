import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/ui/FadeIn.jsx";
import Counter from "../components/ui/Counter.jsx";
import { STATS } from "../data/index.js";
import {
  Building2,
  Factory,
  ShieldCheck,
  Boxes,
  Truck,
  MonitorCog,
  RadioTower,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

/* ─────────────────────────────── helpers ─────────────────────────────── */
function Tag({ children }) {
  return (
    <span style={{ display: "inline-block", background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.25)", color: "#dc2626", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, padding: "3px 10px" }}>
      {children}
    </span>
  );
}

function SectionLabel({ children, light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ width: 32, height: 2, background: "#dc2626" }} />
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2.5, color: light ? "#ef4444" : "#dc2626", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

/* ─────────────── Certificate data ────────────────────────────────────── */
const CERTS = [
  { id: 1, title: "ISO 9001:2015", authority: "Bureau Veritas Certification", scope: "Design, Engineering, Supply, Installation & Maintenance of Fire Protection Systems", issued: "March 2022", valid: "March 2025", ref: "BV-QMS-GJ-2022-1043", accent: "#ef4444", seal: "🏅", bgFrom: "#fffbeb", bgTo: "#fef3c7", detail: "Sejal Engineering holds ISO 9001:2015 Quality Management System certification from Bureau Veritas — one of the world's most respected conformity assessment bodies. The certificate covers every operational function: design review, material procurement, installation methodology, testing protocols, and post-commissioning AMC services. Our QMS is re-audited annually with zero major non-conformances recorded since first certification in 2011." },
  { id: 2, title: "BIS / ISI Mark Licence", authority: "Bureau of Indian Standards", scope: "Manufacture of Fire Extinguishers (IS 15683) & Hose Reels (IS 884)", issued: "January 2018", valid: "Perpetual (Annual Renewal)", ref: "CM/L-7310XXX · CM/L-6812XXX", accent: "#ef4444", seal: "⭐", bgFrom: "#f0f9ff", bgTo: "#e0f2fe", detail: "Sejal Engineering holds ISI Mark licences from the Bureau of Indian Standards for two manufactured product categories. Licence CM/L-7310XXX covers our DCP fire extinguisher range (IS 15683) in 2kg–9kg capacities. Licence CM/L-6812XXX covers our swinging-type hose reel drums (IS 884) in 19mm and 25mm bore. Both licences require BIS factory audits and batch sampling tests every six months." },
  { id: 3, title: "DGFASLI Empanelment", authority: "Directorate General, Factory Advice Service & Labour Institutes", scope: "Empanelled Contractor for Fire Fighting System Installation in Factories", issued: "June 2016", valid: "Renewed Biennially", ref: "DGFASLI/GJ/FFS/2016/048", accent: "#ef4444", seal: "🔴", bgFrom: "#fff1f2", bgTo: "#ffe4e6", detail: "DGFASLI empanelment authorises Sejal Engineering to execute fire fighting system installations in factories regulated under the Factories Act 1948. This registration is mandatory for industrial clients seeking compliance under Schedule 8 of the Gujarat Factories Rules. Our empanelment is renewed every two years following inspection of completed projects and verification of technical manpower." },
  { id: 4, title: "Gujarat Fire NOC Liaison", authority: "Gujarat State Fire & Emergency Services", scope: "Recognised Agency for Fire NOC Plan Submission & Approval", issued: "2009", valid: "Active (22nd year)", ref: "GSFES/AMD/LA/2009/017", accent: "#ef4444", seal: "🛡️", bgFrom: "#faf5ff", bgTo: "#ede9fe", detail: "Sejal Engineering has been a recognised liaison agency with the Gujarat State Fire & Emergency Services since 2009 — one of only a select number of private firms authorised to submit and represent fire safety plans for plan sanction in Ahmedabad, Surat, Vadodara, and Rajkot fire authority jurisdictions. This recognition substantially reduces plan sanction time for our clients." },
  { id: 5, title: "NFPA Member & Certified", authority: "National Fire Protection Association, USA", scope: "Engineering team certified in NFPA 13, NFPA 14, NFPA 20, NFPA 72", issued: "2014 (ongoing)", valid: "Annual renewal per standard update", ref: "NFPA-IND-GJ-SE-2014", accent: "#ef4444", seal: "🌐", bgFrom: "#f0fdf4", bgTo: "#dcfce7", detail: "Sejal Engineering's senior engineering team holds NFPA certifications across four critical standards: NFPA 13 (Sprinkler Systems), NFPA 14 (Standpipe & Hose Systems), NFPA 20 (Stationary Pumps), and NFPA 72 (Fire Alarm & Signaling). These certifications are renewed with each edition cycle ensuring our designs always reflect the latest international best practices." },
  { id: 6, title: "MSME Udyam Registration", authority: "Ministry of Micro, Small & Medium Enterprises, Govt. of India", scope: "Manufacturing & Service Enterprise Registration", issued: "August 2020", valid: "Perpetual", ref: "UDYAM-GJ-01-XXXXXXX", accent: "#ef4444", seal: "🏭", bgFrom: "#fff7ed", bgTo: "#ffedd5", detail: "Sejal Engineering is registered under the MSME Udyam scheme as a manufacturing and service enterprise, making us eligible for government procurement preferences, PSU vendor lists, and priority credit facilities. Our MSME status reflects our roots as a Gujarat-based enterprise and our commitment to building indigenous fire safety manufacturing capability within India." },
  { id: 7, title: "FM Global Compliance", authority: "Factory Mutual Global (FM Approvals)", scope: "Sprinkler & Suppression System Design — FM Data Sheet Compliance", issued: "2019", valid: "Project-wise verification", ref: "FM-DS-2-0/8-9/10-2 Compliant", accent: "#ef4444", seal: "✅", bgFrom: "#ecfeff", bgTo: "#cffafe", detail: "Several Sejal Engineering clients carry FM Global property insurance which requires fire protection systems to comply with FM Global data sheets (DS 2-0, DS 8-9, DS 10-2 etc.). Our engineering team is trained in FM Global loss prevention standards and has delivered FM-compliant sprinkler and foam suppression systems for petrochemical and warehousing clients." },
  { id: 8, title: "IS / NBC Standards Compliance", authority: "Bureau of Indian Standards & CPWD", scope: "IS 884, IS 636, IS 2175, IS 2189, IS 12469, IS 1239 — full portfolio", issued: "Since inception", valid: "Continuous", ref: "Multi-standard compliance portfolio", accent: "#ef4444", seal: "📋", bgFrom: "#fdf2f8", bgTo: "#fce7f3", detail: "Every Sejal Engineering system and manufactured product complies with the full suite of relevant BIS codes. Our fabricated piping meets IS 1239, hose reels meet IS 884, hose boxes meet IS 636, smoke detectors meet IS 2175, alarm panels meet IS 2189, and our pumps meet IS 12469. Compliance is verified at every stage of production and installation." },
];

/* ─────────────────── CertLogo Component (SVGs) ───────────────────────── */
function CertLogo({ id }) {
  switch (id) {
    case 1: // ISO 9001
      return (
        <img
          src="/certificates_logo/ISO.jpg"
          alt="ISO 9001 Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}
        />
      );
    case 2: // BIS / ISI Mark
      return (
        <img
          src="/certificates_logo/BIS.jpg"
          alt="BIS Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}
        />
      );
    case 3: // DGFASLI
      return (
        <svg viewBox="0 0 100 100" style={{ width: "80%", height: "80%" }}>
          <path d="M50 15 L80 25 V55 C80 72 50 85 50 85 C50 85 20 72 20 55 V25 Z" fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <path d="M50 15 L80 25 V55 C80 72 50 85 50 85 C50 85 20 72 20 55 V25 Z" fill="#dc2626" opacity="0.06" />
          <line x1="32" y1="40" x2="68" y2="40" stroke="#f97316" strokeWidth="3" />
          <line x1="32" y1="48" x2="68" y2="48" stroke="#16a34a" strokeWidth="3" />
          <text x="50" y="65" fontSize="7" fontWeight="bold" fill="#dc2626" textAnchor="middle" style={{ fontFamily: "sans-serif" }}>GOVT OF INDIA</text>
          <text x="50" y="33" fontSize="8" fontWeight="900" fill="#dc2626" textAnchor="middle" style={{ fontFamily: "sans-serif" }}>DGFASLI</text>
        </svg>
      );
    case 4: // Gujarat Fire NOC
      return (
        <svg viewBox="0 0 100 100" style={{ width: "80%", height: "80%" }}>
          <path d="M50 15 C65 15 80 25 80 50 C80 75 50 85 50 85 C50 85 20 75 20 50 C20 25 35 15 50 15 Z" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
          <path d="M50 30 C58 38 62 48 58 56 C54 64 46 64 42 56 C38 48 42 38 50 30 Z" fill="#7c3aed" />
          <path d="M50 40 C54 45 56 50 54 54 C52 58 48 58 46 54 C44 50 46 45 50 40 Z" fill="#f59e0b" />
          <text x="50" y="75" fontSize="7" fontWeight="900" fill="#7c3aed" textAnchor="middle" style={{ fontFamily: "sans-serif" }}>GSFES NOC</text>
        </svg>
      );
    case 5: // NFPA
      return (
        <svg viewBox="0 0 100 100" style={{ width: "85%", height: "85%" }}>
          <g transform="rotate(45 50 50)">
            <rect x="25" y="25" width="50" height="50" stroke="#16a34a" strokeWidth="2" fill="none" />
            <rect x="25" y="25" width="25" height="25" fill="#2563eb" />
            <rect x="50" y="25" width="25" height="25" fill="#dc2626" />
            <rect x="25" y="50" width="25" height="25" fill="#eab308" />
            <rect x="50" y="50" width="25" height="25" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" />
          </g>
          <text x="50" y="54" fontSize="9" fontWeight="900" fill="#16a34a" textAnchor="middle" stroke="#ffffff" strokeWidth="1" paintOrder="stroke" style={{ fontFamily: "sans-serif" }}>NFPA</text>
        </svg>
      );
    case 6: // MSME
      return (
        <svg viewBox="0 0 100 100" style={{ width: "80%", height: "80%" }}>
          <circle cx="50" cy="50" r="28" fill="none" stroke="#ea580c" strokeWidth="2.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect key={angle} x="47" y="15" width="6" height="10" fill="#ea580c" transform={`rotate(${angle} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="16" fill="#fff" />
          <text x="50" y="53" fontSize="8" fontWeight="900" fill="#ea580c" textAnchor="middle" style={{ fontFamily: "sans-serif" }}>UDYAM</text>
        </svg>
      );
    case 7: // FM Global
      return (
        <img
          src="/certificates_logo/FM.jfif"
          alt="FM Global Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}
        />
      );
    case 8: // IS Compliance
      return (
        <svg viewBox="0 0 100 100" style={{ width: "75%", height: "75%" }}>
          <rect x="25" y="20" width="50" height="60" rx="5" fill="none" stroke="#be185d" strokeWidth="2.5" />
          <line x1="35" y1="35" x2="65" y2="35" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="48" x2="65" y2="48" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="61" x2="55" y2="61" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
          <circle cx="70" cy="70" r="13" fill="#be185d" />
          <path d="M65 70 l3 3 l6 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─────────────────── CertCard component ─────────────────────────────── */
function CertCard({ cert /*, onClick */ }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      /* onClick={() => onClick && onClick(cert)} */
      style={{
        position: "relative",
        background: "#ffffff",
        borderRadius: 18,
        border: "1px solid rgba(15,23,42,0.08)",
        overflow: "hidden",
        padding: "28px 26px",
        boxShadow: "0 8px 30px rgba(15,23,42,0.05)",
        height: 260,
        display: "flex",
        flexDirection: "column",
        /* cursor: "pointer", */
      }}
    >
      {/* top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 4,
          background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}80)`,
        }}
      />

      {/* subtle glow */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `${cert.accent}10`,
          filter: "blur(55px)",
          right: -70,
          top: -70,
          pointerEvents: "none",
        }}
      />

      {/* icon */}
      <div
        style={{
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 22,
          position: "relative",
          zIndex: 1,
        }}
      >
        <CertLogo id={cert.id} />
      </div>

      {/* title */}
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.35,
          margin: "0 0 10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {cert.title}
      </h3>

      {/* authority */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: cert.accent,
          marginBottom: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        {cert.authority}
      </div>

      {/* description */}
      <p
        style={{
          fontSize: 13.5,
          color: "#64748b",
          lineHeight: 1.8,
          margin: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {cert.scope}
      </p>
    </motion.div>
  );
}
/* ─────────────────── CertModal component ────────────────────────────── */
function CertModal({ cert, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{
          width: "100%",
          maxWidth: 700,
          background: "#ffffff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          border: "1px solid rgba(15,23,42,0.08)",
        }}
      >
        {/* Top Accent */}
        <div
          style={{
            height: 5,
            background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}90)`,
          }}
        />

        <div style={{ padding: "42px 42px 38px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
              marginBottom: 28,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: cert.accent,
                  marginBottom: 10,
                }}
              >
                Certification Details
              </div>

              <h2
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {cert.title}
              </h2>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "#64748b",
                  fontWeight: 600,
                  lineHeight: 1.7,
                }}
              >
                Issued by {cert.authority}
              </div>
            </div>

            <div
              style={{
                width: 72,
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CertLogo id={cert.id} />
            </div>
          </div>

          {/* Info Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 26,
            }}
          >
            {[
              ["Scope", cert.scope],
              ["Issued", cert.issued],
              ["Validity", cert.valid],
              ["Reference No.", cert.ref],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: "16px 18px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: cert.accent,
                    marginBottom: 6,
                  }}
                >
                  {label}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    color: "#0f172a",
                    lineHeight: 1.6,
                    fontWeight: 600,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: 14,
              padding: "22px 22px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.4,
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: 10,
              }}
            >
              About this Certification
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.9,
                color: "#475569",
              }}
            >
              {cert.detail}
            </p>
          </div>

          {/* Footer */}
          <button
            onClick={onClose}
            style={{
              marginTop: 28,
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: "#0f172a",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
/* ─────────────────────────── Reusable LeadershipCard component ─────────────────────────────── */
const LEADERSHIP_TEAM = [
  {
    name: "Pragnesh Patel",
    designation: "Managing Director & Founder",
    image: "/staff_photo/CEO & MD.jpeg"
  },
  {
    name: "Harshad Patel",
    designation: "Head — Quality Control",
    image: "/staff_photo/QC.jpeg"
  },
  {
    name: "Mayur Patel",
    designation: "Head — Projects & Production",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Akshita ",
    designation: "Head — Marketing & Business Dev.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

function LeadershipCard({ name, designation, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 h-full justify-between group"
    >
      {/* Centered Circular Photo Container */}
      <div className="relative mb-6 flex-shrink-0">
        {/* Outer Ring & Soft Shadow */}
        <div className="w-[148px] h-[148px] rounded-full border border-[#E5E7EB] flex items-center justify-center p-[3px] bg-white shadow-sm overflow-hidden">
          {/* Inner Photo with 4px White Border */}
          <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-white">
            <motion.img
              src={image}
              alt={name}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        <h3 className="text-xl font-bold text-[#0B1F3A] mb-2 font-serif">
          {name}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#0056D2]">
          {designation}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── Timeline ───────────────────────────────── */
function TimelineItem({ year, title, desc, side, last }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = side === "left";
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr" }}>
      <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
        style={{ padding: "0 32px 48px 0", textAlign: "right", visibility: isLeft ? "visible" : "hidden" }}>
        {isLeft && <TLContent year={year} title={title} desc={desc} />}
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 }}
          style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#dc2626,#991b1b)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0, boxShadow: "0 0 0 6px #fef2f2" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>{year.slice(2)}</span>
        </motion.div>
        {!last && <div style={{ width: 2, flex: 1, background: "linear-gradient(180deg,#dc2626,#fee2e2)", marginTop: 4 }} />}
      </div>
      <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
        style={{ padding: "0 0 48px 32px", visibility: !isLeft ? "visible" : "hidden" }}>
        {!isLeft && <TLContent year={year} title={title} desc={desc} />}
      </motion.div>
    </div>
  );
}
function TLContent({ year, title, desc }) {
  return (
    <div>
      <div style={{ fontFamily: "'Georgia',serif", fontWeight: 800, fontSize: 13, color: "#dc2626", marginBottom: 6 }}>{year}</div>
      <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

/* ═══════════════════════════ ABOUT PAGE ═══════════════════════════════ */
export default function AboutPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div style={{ paddingTop: 68, overflowX: "hidden" }}>

      {/* ══ HERO ══ */}
      <section ref={heroRef} style={{ position: "relative", height: "62vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: yBg, backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80")', backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.55)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,23,42,0.7) 0%,rgba(15,23,42,0.35) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <Tag>Established 2002 · Ahmedabad, Gujarat</Tag>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(38px,6vw,72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: "20px 0 24px", maxWidth: 700 }}>
              Two Decades of <span style={{ color: "#ef4444" }}>Fire Safety</span> Excellence
            </h1>
            <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, maxWidth: 560, margin: 0 }}>
              From a Vision of Safety to a Trusted Fire Protection Leader Across Gujarat — This is the Story of Sejal Engineering.
            </p>
          </motion.div>
        </div>
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.20)", pointerEvents: "none" }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.10)", pointerEvents: "none" }} />
      </section>

      {/* ══ RED STAT STRIP ══ */}


      {/* ══ COMPANY STORY ══ */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 80, alignItems: "start" }} className="two-col">
            <FadeIn>
              <SectionLabel>Our Story</SectionLabel>
              <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, margin: "0 0 32px" }}>Born in Ahmedabad.<br />Built for India's Toughest Facilities.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {["Sejal Engineering was founded in 2002 by Pragnesh Patel, a fire safety engineer and industry professional, who identified a critical gap in Gujarat’s rapidly industrialising landscape — the absence of specialist fire protection consultants capable of designing, supplying, and commissioning compliant systems under one roof. Starting from a modest office in Ahmedabad, the company began its journey by serving residential buildings and small-scale industries with reliable and standards-driven fire safety solutions.",
                  "Over the following decade, Sejal Engineering expanded its technical expertise and operational reach across Gujarat. By 2008, the company was successfully executing turnkey fire protection projects for industrial facilities, commercial developments, and residential infrastructures throughout the state. A major milestone came when Sejal Engineering earned the opportunity to work with reputed national-level companies, including projects associated with the Jamshed Tata group in Kolkata — reinforcing the company’s reputation for quality, reliability, and engineering excellence in the fire safety industry.",
                  "Today, Sejal Engineering stands as one of western India’s trusted fire safety companies with expertise spanning project execution, manufacturing, testing, and long-term maintenance services. Alongside executing large-scale fire protection projects and government tenders, the company manufactures high-quality fire safety products supported by an in-house testing laboratory to ensure performance, reliability, and compliance with industry standards. We also provide comprehensive Annual Maintenance Contract (AMC) services and currently manage a portfolio of 200+ active sites across industrial, commercial, and residential sectors.",
                  "What has never changed since 2002 is our founding principle: fire safety is not a compliance checkbox — it is a moral commitment to every person who enters a building we have protected. That philosophy drives every system we design, every product we manufacture, and every service we deliver.",
                ].map((p, i) => (<p key={i} style={{ fontSize: 16, color: "#475569", lineHeight: 1.85, margin: 0 }}>{p}</p>))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 100 }}>
                {[
                  { label: "Founded", value: "2002", sub: "Ahmedabad, Gujarat" },
                  { label: "Registered Office", value: "Ahmedabad", sub: "Gujarat, India — PIN 380015" },
                  /*{label:"CIN",value:"U74900GJ2002PTC049XXX",sub:"Company Identification Number"}*/,
                  { label: "GSTIN", value: "24AAXXX1234X1Z5", sub: "Gujarat State GST Registration" },
                  { label: "Warehouse", value: "Sukhram Estate, Virat Nagar", sub: "Fire Safety Operations Center" },
                  /*{label:"ISI Licences",value:"2 Active Licences",sub:"IS 15683 (Extinguisher) · IS 884 (Hose Reel)"}*/,
                  { label: "Team Strength", value: "120+ Professionals", sub: "Engineers · Technicians · QC · Sales" },
                 /* {label:"Turnover Range",value:"₹50 Cr+",sub:"Annual consolidated revenue"}*/,
                ].map(c => (
                  <div key={c.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "13px 16px", background: "#f8fafc", borderRadius: 10, borderLeft: "3px solid #dc2626" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{c.label}</div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{c.value}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:900px){.two-col{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ══ MISSION / VISION / VALUES ══ */}
      <section style={{ padding: "100px 24px", background: "#0f172a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)", backgroundSize: "30px 30px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>

          <FadeIn>
            <SectionLabel light>What We Stand For</SectionLabel>

            <h2
              style={{
                fontFamily: "'Georgia',serif",
                fontSize: "clamp(26px,3.5vw,40px)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 52px",
                maxWidth: 520,
                lineHeight: 1.2,
              }}
            >
              Mission, Vision &amp; Core Values
            </h2>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
            className="mvv-grid"
          >
            {[
              {
                title: "Our Mission",
                color: "#dc2626",
                body: "To deliver engineering-grade fire protection systems that are code-compliant, reliable, and affordable — making every facility in India a safer place. We accomplish this through honest advice, precise engineering, and zero-compromise installation and manufacturing."
              },

              {
                title: "Our Vision",
                color: "#2563eb",
                body: "To be India's most trusted independent fire safety partner — known not for the size of our projects but for the certainty of our outcomes. We aspire to set the benchmark for technical excellence, manufacturing quality, and post-installation accountability."
              },

              {
                title: "Our Values",
                color: "#16a34a",
                body: null,
                values: [
                  "Safety above profit — always",
                  "Engineering honesty over commercial convenience",
                  "Lifelong accountability for every system we install",
                  "Continuous learning in a rapidly evolving field",
                  "Respect for every client, every site, every life"
                ]
              },
            ].map(card => (
              <FadeIn key={card.title} delay={0.1}>

                <motion.div
                  whileHover={{
                    y: -6,
                    borderColor: `${card.color}55`,
                    boxShadow: `0 16px 45px rgba(0,0,0,0.32)`,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(180deg,#1e293b 0%, #172033 100%)",
                    borderRadius: 20,
                    border: `1px solid ${card.color}25`,
                    padding: "28px 26px",

                    /* same size for all cards */
                    minHeight: 340,
                    height: "100%",

                    boxSizing: "border-box",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.20)",
                    transition: "all 0.35s ease",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >

                  {/* premium top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: 3,
                      background: `linear-gradient(
                  90deg,
                  ${card.color} 0%,
                  ${card.color}cc 25%,
                  transparent 100%
                )`,
                      boxShadow: `0 0 18px ${card.color}44`,
                    }}
                  />

                  {/* top glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: -40,
                      left: -40,
                      width: 180,
                      height: 120,
                      background: `${card.color}10`,
                      filter: "blur(60px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* icon box */}
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      background: `linear-gradient(135deg, ${card.color}18, ${card.color}08)`,
                      border: `1px solid ${card.color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 22,
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: `0 8px 24px ${card.color}12`,
                      flexShrink: 0,
                    }}
                  >

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(circle at top left, ${card.color}25, transparent 70%)`,
                      }}
                    />

                    <div
                      style={{
                        width: 15,
                        height: 15,
                        background: card.color,
                        borderRadius: 4,
                        transform: "rotate(45deg)",
                        boxShadow: `0 0 14px ${card.color}55`,
                        zIndex: 1,
                      }}
                    />
                  </div>

                  {/* title */}
                  <div
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#fff",
                      marginBottom: 14,
                      letterSpacing: 0.2,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </div>

                  {/* content */}
                  {card.body ? (
                    <p
                      style={{
                        fontSize: 13.8,
                        color: "#94a3b8",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {card.body}
                    </p>
                  ) : (
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {card.values.map(v => (
                        <li
                          key={v}
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                          }}
                        >

                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: card.color,
                              marginTop: 7,
                              flexShrink: 0,
                              boxShadow: `0 0 10px ${card.color}66`,
                            }}
                          />

                          <span
                            style={{
                              fontSize: 13.5,
                              color: "#94a3b8",
                              lineHeight: 1.7,
                            }}
                          >
                            {v}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* corner glow */}
                  <div
                    style={{
                      position: "absolute",
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      background: `${card.color}08`,
                      filter: "blur(70px)",
                      right: -90,
                      bottom: -90,
                      pointerEvents: "none",
                    }}
                  />

                </motion.div>

              </FadeIn>
            ))}
          </div>
        </div>

        <style>{`
    @media(max-width:900px){
      .mvv-grid{
        grid-template-columns:1fr!important;
      }
    }
  `}</style>
      </section>

      {/* ══ TIMELINE ══ */}
      {/* <section style={{ padding:"100px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:72 }}>
              <SectionLabel>Our Journey</SectionLabel>
              <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"#0f172a", margin:0 }}>Two Decades of Milestones</h2>
            </div>
          </FadeIn>
          {[
            {year:"2002",title:"Company Founded",desc:"Sejal Engineering incorporated in Ahmedabad. First contracts: fire extinguisher supply for local textile mills and chemical units in the GIDC Vatva industrial estate.",side:"left"},
            {year:"2005",title:"First Turnkey Installation",desc:"Executed first complete fire hydrant system for a 12,000 m² pharmaceutical manufacturing unit in Naroda — marking our shift from supply-only to design-and-build.",side:"right"},
            {year:"2008",title:"Gujarat-Wide Expansion",desc:"Opened satellite offices in Surat and Vadodara. Secured first petrochemical client (foam suppression system for GIDC Ankleshwar) and crossed ₹5 Cr annual turnover.",side:"left"},
            {year:"2011",title:"ISO 9001 Certification",desc:"Achieved ISO 9001:2008 quality management certification, formalising QC processes for design, installation, and AMC operations.",side:"right"},
            {year:"2012",title:"Manufacturing Unit Launched",desc:"Established in-house fire extinguisher and hose reel manufacturing plant at Naroda GIDC. Received BIS ISI Mark licence for IS 15683 (extinguishers) and IS 884 (hose reels).",side:"left"},
            {year:"2014",title:"NFPA Compliance Capability",desc:"Team trained and certified in NFPA 13, 14, 20, and 72 standards. Began accepting pan-India projects. First healthcare sector project — 400-bed hospital in Surat.",side:"right"},
            {year:"2017",title:"AMC Division Launched",desc:"Formally launched the Annual Maintenance Contract division with 50 active sites. Introduced 24×7 emergency breakdown response. AMC now contributes 35% of revenue.",side:"left"},
            {year:"2020",title:"Digital Engineering Upgrade",desc:"Adopted AutoCAD MEP and Revit MEP for all fire engineering designs. Launched digital NOC documentation service. Crossed 600 cumulative project completions.",side:"right"},
            {year:"2024",title:"850+ Projects & Counting",desc:"Today, Sejal Engineering operates across 120+ cities with 120+ team members and a live AMC portfolio of 200+ sites. Revenues exceed ₹50 Cr. The mission remains unchanged.",side:"left",last:true},
          ].map((item,i)=><TimelineItem key={i} {...item} last={!!item.last} />)}
        </div>
      </section> */}

      {/* ══ OUR DIFFERENTIATORS — manufacturing-focused, unique content ══ */}
      <section style={{ padding: "90px 22px", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <SectionLabel>Our Differentiators</SectionLabel>

              <h2
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 14px",
                  lineHeight: 1.2,
                }}
              >
                What Makes Sejal Engineering Different
              </h2>

              <p
                style={{
                  color: "#64748b",
                  fontSize: 15,
                  maxWidth: 650,
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                Engineering expertise, manufacturing capability, and long-term
                accountability combined under one trusted fire protection partner.
              </p>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 22,
            }}
          >
            {[
              {
                no: "01",
                tag: "Manufacturing",
                title: "Integrated Manufacturing",
                body:
                  "In-house manufacturing of ISI-certified extinguishers and hose reels with turnkey execution support.",
                color: "#ef4444",
              },

              {
                no: "02",
                tag: "Testing Lab",
                title: "Advanced Testing Facility",
                body:
                  "Dedicated testing systems for pressure checks, discharge verification, and quality inspection.",
                color: "#ef4444",
              },

              {
                no: "03",
                tag: "Compliance",
                title: "BIS Licensed Products",
                body:
                  "Products certified under IS standards with strict BIS compliance and audited production processes.",
                color: "#ef4444",
              },

              {
                no: "04",
                tag: "Cost Efficiency",
                title: "Factory-Direct Supply",
                body:
                  "Direct manufacturing capability delivering better pricing with controlled engineering quality.",
                color: "#ef4444",
              },

              {
                no: "05",
                tag: "Quality Control",
                title: "Material Traceability",
                body:
                  "Complete traceability of production batches with certified raw material documentation.",
                color: "#ef4444",
              },

              {
                no: "06",
                tag: "Service Support",
                title: "Certified Refilling Systems",
                body:
                  "Factory-standard DCP and CO₂ refilling support for reliable AMC maintenance services.",
                color: "#ef4444",
              },
            ].map((item, i) => (
              <FadeIn key={item.no} delay={i * 0.05}>
                <motion.div
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(239, 68, 68, 0.35)",
                    boxShadow: "0 18px 50px rgba(15,23,42,0.10)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "relative",
                    background: "#ffffff",
                    borderRadius: 20,
                    border: "1px solid rgba(15,23,42,0.08)",
                    overflow: "hidden",
                    padding: "26px 24px",
                    boxShadow: "0 8px 32px rgba(15,23,42,0.05)",
                    transition: "all 0.35s ease",

                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* side accent */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: 4,
                      height: "100%",
                      background: item.color,
                    }}
                  />

                  {/* glow */}
                  <div
                    style={{
                      position: "absolute",
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      background: `${item.color}10`,
                      filter: "blur(55px)",
                      right: -70,
                      top: -70,
                      pointerEvents: "none",
                    }}
                  />

                  {/* number */}
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 18,
                      fontSize: 48,
                      fontWeight: 700,
                      fontFamily: "'Georgia', serif",
                      color: "#f8fafc",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {item.no}
                  </div>

                  {/* top badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 18,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        background: item.color,
                        boxShadow: `0 0 14px ${item.color}55`,
                      }}
                    />

                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                        textTransform: "uppercase",
                        color: item.color,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* title */}
                  <h3
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      marginBottom: 14,
                      maxWidth: 260,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* divider */}
                  <div
                    style={{
                      width: 48,
                      height: 2,
                      background: item.color,
                      marginBottom: 16,
                      borderRadius: 10,
                    }}
                  />

                  {/* body */}
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "#64748b",
                      lineHeight: 1.7,
                      margin: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {item.body}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* ══ MANUFACTURED PRODUCTS ══ */}

      {/* ══ CERTIFICATIONS — photo-style cards with click modal ══ */}
      <section style={{ padding: "100px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <SectionLabel>Accreditations</SectionLabel>
              <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>Our Certifications &amp; Licences</h2>

            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 20 }}>
            {/* {CERTS.map((cert,i)=>(<FadeIn key={cert.id} delay={i*0.07}><CertCard cert={cert} onClick={setActiveCert} /></FadeIn>))} */}
            {CERTS.map((cert, i) => (<FadeIn key={cert.id} delay={i * 0.07}><CertCard cert={cert} /></FadeIn>))}
          </div>
        </div>
      </section>

      {/* Certificate modal — rendered at root level */}
      {/* <AnimatePresence>
        {activeCert && <CertModal cert={activeCert} onClose={()=>setActiveCert(null)} />}
      </AnimatePresence> */}
      {/* ══ INFRASTRUCTURE ══ */}
      <section style={{ padding: "100px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center"
            }}
            className="two-col"
          >

            {/* LEFT SIDE */}
            <FadeIn>
              <SectionLabel light>Infrastructure</SectionLabel>

              <h2
                style={{
                  fontFamily: "'Georgia',serif",
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 32px"
                }}
              >
                Built to Deliver at Scale
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {[
                  {
                    icon: <Building2 size={18} strokeWidth={1.8} />,
                    label: "Head Office",
                    val: "Ahmedabad, Gujarat "
                  },
                  {
                    icon: <Factory size={18} />,
                    label: "Warehouse",
                    val: "26-Sukhram Estate, NH-8, Ahmedabad, Gujarat"
                  },
                  {
                    icon: <ShieldCheck size={18} strokeWidth={1.8} />,
                    label: "QC Testing Lab",
                    val: "In-house product testing lab"
                  },
                  {
                    icon: <BriefcaseBusiness size={18} strokeWidth={1.8} />,
                    label: "Branch Offices",
                    val: "Surat"
                  },

                  // {
                  //   icon:<Truck size={18} strokeWidth={1.8} />,
                  //   label:"Fleet",
                  //   val:"12 service vehicles for site inspection and emergency response"
                  // },
                  // {
                  //   icon:<MonitorCog size={18} strokeWidth={1.8} />,
                  //   label:"Engineering Software",
                  //   val:"AutoCAD MEP · Revit MEP · HydraCAD · AutoSPRINK"
                  // },
                  // {
                  //   icon:<RadioTower size={18} strokeWidth={1.8} />,
                  //   label:"AMC Management",
                  //   val:"Digital site register with scheduled inspection alerts"
                  // }
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start"
                    }}
                  >

                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: "#111827",
                        border: "1px solid #334155",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ef4444",
                        flexShrink: 0
                      }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#f1f5f9",
                          marginBottom: 3
                        }}
                      >
                        {item.label}
                      </div>

                      <div
                        style={{
                          fontSize: 13,
                          color: "#64748b",
                          lineHeight: 1.6
                        }}
                      >
                        {item.val}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </FadeIn>

            {/* RIGHT SIDE */}
            <FadeIn delay={0.2}>
              <div>

                <SectionLabel light>Sectors We Serve</SectionLabel>

                <h2
                  style={{
                    fontFamily: "'Georgia',serif",
                    fontSize: "clamp(24px,3vw,36px)",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 28px"
                  }}
                >
                  Every Occupancy, Every Scale
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14
                  }}
                >

                  {[
                    "Industrial & Manufacturing",
                    "Commercial & IT Parks",
                    "Healthcare & Pharma",
                    "Oil, Gas & Petrochemical",
                    "Education & Institutions",
                    "Hospitality & Retail",
                    "Infrastructure & Logistics",
                    "Residential High-Rise"
                  ].map((lb) => (
                    <div
                      key={lb}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        padding: "14px 16px",
                        background: "linear-gradient(180deg,#1e293b,#172033)",
                        borderRadius: 12,
                        border: "1px solid #334155"
                      }}
                    >

                      {/* CLEAN INDUSTRIAL DOT (NO EMOJI, NO ICON LIBRARY) */}
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#dc2626",
                          boxShadow: "0 0 10px rgba(220,38,38,0.45)",
                          flexShrink: 0
                        }}
                      />

                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#cbd5e1",
                          letterSpacing: "0.3px"
                        }}
                      >
                        {lb}
                      </span>

                    </div>
                  ))}

                </div>

              </div>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, textAlign: "center" }} className="stats-grid">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ color: "#fff" }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(40px,5vw,64px)", fontWeight: 700, lineHeight: 1 }}><Counter value={s.value} suffix={s.suffix} /></div>
                  <div style={{ fontSize: 14, opacity: 0.85, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-[100px] px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0B1F3A] mb-4">
                Leadership Team
              </h2>
              <p className="text-[#64748B] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Meet the experienced professionals leading our organization with excellence, innovation, and commitment.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch justify-center">
            {LEADERSHIP_TEAM.map((member) => (
              <LeadershipCard
                key={member.name}
                {...member}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding: "100px 24px", background: "#0f172a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(220,38,38,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <Tag>Talk to Our Team</Tag>
            <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,44px)", color: "#fff", fontWeight: 700, margin: "24px 0 20px", lineHeight: 1.2 }}>Ready to Work with Gujarat's Most Trusted Fire Protection Partner?</h2>
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.75, margin: "0 0 40px" }}>Get a no-obligation site assessment from our senior engineers. We'll evaluate your facility, identify gaps, and deliver a clear, competitive proposal — typically within 72 hours.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button 
                whileHover={{ scale: 1.04, backgroundColor: "#b91c1c" }} 
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/contact")}
                style={{ padding: "16px 40px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "background-color 0.2s ease" }}>
                Request Site Assessment →
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "#dc2626" }} 
                whileTap={{ scale: 0.96 }}
                onClick={() => window.location.href = "tel:+919998356941"}
                style={{ padding: "16px 40px", background: "transparent", color: "#fff", border: "1.5px solid #334155", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", transition: "all 0.2s ease" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="#dc2626" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99983 56941
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}