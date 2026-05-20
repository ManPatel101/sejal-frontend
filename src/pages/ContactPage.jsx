import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../components/ui/FadeIn";
import axios from "axios"; // make sure this is at top

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  
const [loading, setLoading] = useState(false);
const handleSubmit = async () => {
  try {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.subject ||
      !form.message
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true); // 🔥 show instant loading

    const response = await fetch(
      "http://localhost:5000/api/inquiries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          product: form.subject,
          message: form.message,
        }),
      }
    );

    const data = await response.json();

    setLoading(false); // stop loading

    if (data.success) {
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      alert(data.message || "Failed to send inquiry");
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    alert("Server error. Try again later.");
  }
};
  return (
    <div style={{ paddingTop: 68 }}>
      <section
        style={{
          background: "linear-gradient(135deg,#fef2f2,#fff)",
          padding: "80px 24px 60px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
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
              Contact
            </div>

            <h1
              style={{
                fontFamily: "'Georgia',serif",
                fontSize: "clamp(36px,5vw,56px)",
                color: "#0f172a",
                fontWeight: 700,
                margin: "0 0 20px",
              }}
            >
              Get In Touch
            </h1>

            <p
              style={{
                color: "#475569",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              Our fire safety engineers are ready to assess your project.
              Reach out for a free consultation.
            </p>
          </FadeIn>
        </div>
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {[
                    ["name", "Your Name"],
                    ["email", "Email Address"],
                    ["phone", "Phone Number"],
                    ["subject", "Project / Service"],
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
                icon: "📍",
                title: "Registered Office",
                lines: [
                  "301, Titanium Business Park,",
                  "Prahlad Nagar, Ahmedabad – 380015",
                  "Gujarat, India",
                ],
              },
              {
                icon: "📞",
                title: "Phone",
                lines: [
                  "+91 79 4000 1234",
                  "+91 98765 43210 (Emergency AMC)",
                ],
              },
              {
                icon: "📧",
                title: "Email",
                lines: [
                  "info@aegisfiresafety.in",
                  "projects@aegisfiresafety.in",
                ],
              },
              {
                icon: "🕐",
                title: "Business Hours",
                lines: [
                  "Mon–Sat: 9:00 AM – 6:30 PM",
                  "Emergency support: 24 × 7",
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
                    fontSize: 22,
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

                  {item.lines.map((l) => (
                    <div
                      key={l}
                      style={{
                        fontSize: 14,
                        color: "#64748b",
                      }}
                    >
                      {l}
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