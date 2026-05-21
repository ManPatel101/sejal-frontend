import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/ui/FadeIn.jsx";
import Badge from "../components/ui/Badge.jsx";
import { CATEGORIES } from "../data/index.js";
import { useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("All");
  const [modal, setModal] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", phone: "", message: "" });
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

    console.log(res.data);  
    console.log(res.data.products);

    setProducts(res.data.products || []);
  } catch (error) {
    console.log(error);
  }
};

 const filtered = products.filter(
  (p) =>
    (
      cat === "All" ||
      (p.category || "").trim().toLowerCase() ===
      cat.trim().toLowerCase()
    ) &&
    (
      (p.title || p.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (p.category || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
);

  const sendInquiry = async () => {
  // ✅ VALIDATION FIRST
  if (
    !inquiryForm.name ||
    !inquiryForm.email ||
    !inquiryForm.phone ||
    !inquiryForm.message
  ) {
    alert("⚠️ Please fill all fields before submitting inquiry");
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
          product: modal?.title || modal?.name,
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
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    alert("Server error");
  } finally {
    setSending(false);
  }
};

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#fef2f2,#fff)", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#dc2626", textTransform: "uppercase", marginBottom: 12 }}>Products</div>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(36px,5vw,56px)", color: "#0f172a", fontWeight: 700, margin: "0 0 20px" }}>
              Fire Safety Equipment
            </h1>
            <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.7 }}>
              BIS / UL / FM approved fire protection equipment from globally certified manufacturers.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Search & Filter */}
          <FadeIn>
            <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  style={{ width: "100%", padding: "12px 14px 12px 42px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, color: "#0f172a", boxSizing: "border-box", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CATEGORIES.map(c => (
                  <motion.button key={c} whileHover={{ scale: 1.03 }} onClick={() => setCat(c)}
                    style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${cat === c ? "#dc2626" : "#e2e8f0"}`, background: cat === c ? "#dc2626" : "#fff", color: cat === c ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    {c}
                
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeIn>

          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 22 }}>
            {filtered.map((p, i) => (
              <FadeIn key={p._id || i}delay={i * 0.05}>
                <motion.div whileHover={{ y: -5 }} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ background: "#fef2f2", height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 62 }}><img
  src={p.image || "https://via.placeholder.com/600"}
  alt={p.title || p.name}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/></div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <Badge>{p.badge}</Badge>
                      <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{p.category}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: "0 0 8px", lineHeight: 1.4 }}>{p.title || p.name}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>{(p.shortDesc || "").slice(0, 90)}…</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setModal(p)}
                        style={{ flex: 1, padding: "9px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 7, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                        Inquire
                      </button>
                      <button onClick={() => setModal(p)}
                        style={{ padding: "9px 14px", background: "#f8fafc", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 7, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) setModal(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: "#fff", borderRadius: 18, maxWidth: 580, width: "100%", maxHeight: "90vh", overflow: "auto" }}
            >
              <div style={{ background: "#fef2f2", padding: 40, textAlign: "center", borderRadius: "18px 18px 0 0", fontSize: 80 }}><img
  src={modal.image || "https://via.placeholder.com/400"}
  alt={modal.title || modal.name}
  style={{
    width: "100%",
    maxHeight: 260,
    objectFit: "cover",
    borderRadius: "18px 18px 0 0",
  }}
/></div>
              <div style={{ padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <Badge>{modal.badge}</Badge>
                    <h2 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 22, color: "#0f172a", margin: "10px 0 0" }}>{modal.title || modal.name}</h2>
                  </div>
                  <button onClick={() => setModal(null)}
                    style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 18 }}>✕</button>
                </div>
                <div style={{ margin: "0 0 24px" }}>
  <p
    style={{
      color: "#0f172a",
      fontSize: 15,
      fontWeight: 600,
      lineHeight: 1.7,
      margin: "0 0 10px",
    }}
  >
    {modal.shortDesc || modal.description}
  </p>

  <p
    style={{
      color: "#475569",
      fontSize: 15,
      lineHeight: 1.75,
      margin: 0,
    }}
  >
    {modal.fullDesc || modal.description}
  </p>
</div>
                <div style={{ background: "#f8fafc", borderRadius: 10, padding: 20, marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Send Inquiry</div>
                  {sent ? (
                    <div style={{ textAlign: "center", padding: 20, color: "#16a34a", fontWeight: 700 }}>
                      ✅ Inquiry sent! We'll contact you within 24 hours.
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[["name", "text", "Your Name"], ["email", "email", "Email"], ["phone", "text", "Phone"]].map(([field, type, ph]) => (
                        <input key={field} type={type} placeholder={ph}
                          value={inquiryForm[field]}
                          onChange={e => setInquiryForm(f => ({ ...f, [field]: e.target.value }))}
                          style={{ padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none" }}
                        />
                      ))}
                      <textarea placeholder="Message"
                        value={inquiryForm.message}
                        onChange={e => setInquiryForm(f => ({ ...f, message: e.target.value }))}
                        style={{ gridColumn: "1/-1", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, height: 80, resize: "none", outline: "none" }}
                      />
                      <motion.button
                        whileHover={{ scale: sending ? 1 : 1.02 }}
                        onClick={sendInquiry}
                        disabled={sending}
                        style={{
                          gridColumn: "1/-1",
                          padding: "12px",
                          background: sending ? "#f87171" : "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 15,
                          cursor: sending ? "not-allowed" : "pointer",
                          opacity: sending ? 0.8 : 1,
                        }}
                    >
                        {sending ? "Sending Inquiry..." : "Submit Inquiry"}
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}