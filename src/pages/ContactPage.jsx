import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/ui/FadeIn";
import axios from "axios";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    const nameTrimmed = form.name.trim();
    const companyTrimmed = form.company.trim();
    const emailTrimmed = form.email.trim();
    const phoneTrimmed = form.phone.trim();
    const subjectTrimmed = form.subject.trim();
    const messageTrimmed = form.message.trim();

    if (!nameTrimmed || !companyTrimmed || !emailTrimmed || !phoneTrimmed || !subjectTrimmed || !messageTrimmed) {
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
      setErrorMsg("Please enter a valid 10-digit");
      return;
    }

    if (messageTrimmed.length < 10) {
      setErrorMsg("Please write a descriptive message (at least 10 characters).");
      return;
    }

    setErrorMsg("");
    setLoading(true);

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
            name: form.name,
            company: form.company,
            email: form.email,
            phone: form.phone,
            product: form.subject,
            message: form.message,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        setSubmitted(true);
        setErrorMsg("");
        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Show success message for 4 seconds, then show the empty form again
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      } else {
        setErrorMsg(data.message || "Failed to submit. Try again.");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMsg("Server error. Try again later.");
    }
  };

  return (
    <div style={{ paddingTop: 68, overflowX: "hidden" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: "relative", height: "62vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Parallax Background Image */}
        <motion.div style={{ position: "absolute", inset: 0, y: yBg, backgroundImage: 'url("/page_photo/contact.png")', backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.55)" }} />
        {/* Dark Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,23,42,0.7) 0%,rgba(15,23,42,0.35) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span style={{ display: "inline-block", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, padding: "3px 10px", marginBottom: 16 }}>
              Contact
            </span>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", maxWidth: 750 }}>
              Get In Touch
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.7, maxWidth: 650, margin: 0 }}>
              Our fire safety engineers are ready to assess your project. Reach out for a expert consultation.
            </p>
          </motion.div>
        </div>
        
        {/* Spinning Rings */}
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.20)", pointerEvents: "none" }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.10)", pointerEvents: "none" }} />
      </section>

      <section
        style={{
          padding: "80px 24px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
          }}
          className="two-col"
        >
          {/* Form */}
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Georgia',serif",
                fontSize: 28,
                color: "#0f172a",
                fontWeight: 700,
                margin: "0 0 28px",
              }}
            >
              Send Us a Message
            </h2>

            {submitted ? (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{
      background: "#f0fdf4",
      border: "1.5px solid #22c55e",
      borderRadius: 14,
      padding: 28,
      color: "#166534",
      fontWeight: 600,
    }}
  >
    ✅ Thank you! Your inquiry has been submitted successfully.
    Our team will contact you shortly.
  </motion.div>
) : loading ? (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      background: "#fffbeb",
      border: "1.5px solid #f59e0b",
      borderRadius: 14,
      padding: 28,
      color: "#92400e",
      fontWeight: 600,
    }}
  >
    ⏳ Sending your message...
  </motion.div>
) : (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}
  >
    {errorMsg && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "#fef2f2",
          border: "1.5px solid #ef4444",
          borderRadius: 10,
          padding: "12px 16px",
          color: "#b91c1c",
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        ⚠️ {errorMsg}
      </motion.div>
    )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {[
                    ["name", "Your Name"],
                    ["company", "Company Name"],
                    ["email", "Email Address"],
                    ["phone", "Phone Number"],
                    ["subject", "Project / Service Required"],
                  ].map(([field, placeholder]) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          [field]: e.target.value,
                        }))
                      }
                      style={{
                        padding: "12px 16px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 10,
                        fontSize: 14,
                        color: "#0f172a",
                        outline: "none",
                        gridColumn: field === "subject" ? "span 2" : "auto",
                      }}
                    />
                  ))}
                </div>

                <textarea
                  placeholder="Describe your project or query."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      message: e.target.value,
                    }))
                  }
                  style={{
                    padding: "14px 16px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 10,
                    fontSize: 14,
                    color: "#0f172a",
                    height: 140,
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  style={{
                    padding: "14px",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px #dc262640",
                  }}
                >
                  Send Message →
                </motion.button>
              </div>
            )}
          </FadeIn>

          {/* Info */}
          <FadeIn delay={0.15}>
            <h2
              style={{
                fontFamily: "'Georgia',serif",
                fontSize: 28,
                color: "#0f172a",
                fontWeight: 700,
                margin: "0 0 28px",
              }}
            >
              Company Information
            </h2>

            {[
              {
                icon: <MapPin size={20} strokeWidth={1.8} />,
                title: "Registered Office",
                lines: [
                  {
                    text: "shop no-3, jay vijay flet, Sardar Chowk, opp. Rugved Hospital, Krishnanagar, Nava Naroda, Ahmedabad, Gujarat 382345",
                    url: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("sejal engineering shop no-3, jay vijay flet, Sardar Chowk, opp. Rugved Hospital, Krishnanagar, Nava Naroda, Ahmedabad, Gujarat 382345"),
                  },
                ],
              },
              {
                icon: <Phone size={20} strokeWidth={1.8} />,
                title: "Phone",
                lines: [
                  { text: "+91 99983 56941", url: "tel:+919998356941" },
                  { text: "+91 99090 46826", url: "tel:+919909046826" },
                ],
              },
              {
                icon: <Mail size={20} strokeWidth={1.8} />,
                title: "Email",
                lines: [
                  { text: "sejalengineering@gmail.com", url: "mailto:sejalengineering@gmail.com" },
                ],
              },
              {
                icon: <Clock size={20} strokeWidth={1.8} />,
                title: "Business Hours",
                lines: [
                  { text: "Mon–Sat: 9:00 AM – 7:00 PM" },
                  { text: "Emergency support: 24 × 7" },
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 18,
                  marginBottom: 24,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    background: "#fef2f2",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#dc2626",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </div>

                  {item.lines.map((l, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: 14,
                        color: "#64748b",
                      }}
                    >
                      {l.url ? (
                        <a
                          href={l.url}
                          target={l.url.startsWith("http") ? "_blank" : undefined}
                          rel={l.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          style={{
                            color: "#64748b",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "#dc2626")}
                          onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                        >
                          {l.text}
                        </a>
                      ) : (
                        l.text
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .two-col{
            grid-template-columns:1fr!important;
          }
        }
      `}</style>
    </div>
  );
}
