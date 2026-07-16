import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/ui/FadeIn.jsx";
import Badge from "../components/ui/Badge.jsx";
import { CATEGORIES } from "../data/index.js";
import axios from "axios";

export default function ProductsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [isGrouped, setIsGrouped] = useState(false);
  const [cat, setCat] = useState("All");
  const [modal, setModal] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products from backend
  const fetchProducts = async (currentPage, currentCat, currentSearch, append = false) => {
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://sejal-backend.onrender.com";

      const params = {
        page: currentPage,
        limit: 8,
        category: currentCat,
        search: currentSearch,
      };

      // If we are loading more on "All" category without active search, exclude currently loaded products to prevent duplication and appending chronologically at the bottom
      if (append && currentCat === "All" && !currentSearch) {
        const excludeIds = products.map((p) => p._id).join(",");
        params.exclude = excludeIds;
      }

      const res = await axios.get(`${apiBase}/api/products`, { params });

      if (res.data.isGrouped) {
        setIsGrouped(true);
        setGroupedProducts(res.data.grouped || {});
        
        // Initial load for "All": display flattened array of grouped items (up to 4 per category)
        const grouped = res.data.grouped || {};
        const flattened = Object.values(grouped).flat();
        setProducts(flattened);
        setTotal(flattened.length);
        setHasMore(res.data.hasMore || false);
      } else {
        setIsGrouped(false);
        setGroupedProducts({});
        if (append) {
          setProducts((prev) => [...prev, ...(res.data.products || [])]);
        } else {
          setProducts(res.data.products || []);
        }
        setTotal(res.data.total || 0);
        setHasMore(res.data.hasMore || false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when category or debounced search changes
  useEffect(() => {
    setPage(1);
    fetchProducts(1, cat, debouncedSearch, false);
  }, [cat, debouncedSearch]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, cat, debouncedSearch, true);
  };

  const handleMainViewMore = () => {
    if (cat === "All" && !debouncedSearch) {
      // Fetch next set of products excluding currently loaded products
      fetchProducts(1, cat, debouncedSearch, true);
    } else {
      loadMore();
    }
  };

  const renderProductCard = (p, i) => (
    <FadeIn key={p._id || i} delay={i * 0.05}>
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
        {/* Image Container */}
        <div
          style={{
            background: "#fff",
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #f1f5f9",
            padding: "0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={p.image || "https://via.placeholder.com/600"}
            alt={p.title || p.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Body Content */}
        <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
              {p.category}
            </span>
            <Badge>{p.badge}</Badge>
          </div>

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
            {p.title || p.name}
          </h3>

          <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#b91c1c" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModal(p)}
              style={{
                flex: 1,
                padding: "10px",
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
              }}
            >
              Inquire
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#f1f5f9" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModal(p)}
              style={{
                padding: "10px 16px",
                background: "#f8fafc",
                color: "#475569",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );

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
            product: modal?.title || modal?.name,
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
        setErrorMsg(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Server error. Try again later.");
    } finally {
      setSending(false);
    }
  };

  const displayProducts = isGrouped
    ? Object.values(groupedProducts).flat()
    : products;

  return (
    <div style={{ paddingTop: 68, overflowX: "hidden" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position: "relative", height: "62vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Parallax Background Image */}
        <motion.div style={{ position: "absolute", inset: 0, y: yBg, backgroundImage: 'url("/page_photo/product.png")', backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.55)" }} />
        {/* Dark Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,23,42,0.7) 0%,rgba(15,23,42,0.35) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span style={{ display: "inline-block", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", borderRadius: 4, padding: "3px 10px", marginBottom: 16 }}>
              Products
            </span>
            <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", maxWidth: 750 }}>
              Fire Safety Equipment
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.7, maxWidth: 650, margin: 0 }}>
              BIS / UL / FM approved fire protection equipment from globally certified manufacturers.
            </p>
          </motion.div>
        </div>

        {/* Spinning Rings */}
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.20)", pointerEvents: "none" }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", right: "8%", top: "15%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(220,38,38,0.10)", pointerEvents: "none" }} />
      </section>

      {/* Products */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Search & Filter */}
          <FadeIn>
            <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
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

          {!isGrouped && (
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              {total} product{total !== 1 ? "s" : ""} found
            </p>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
            {displayProducts.map((p, i) => renderProductCard(p, i))}
          </div>

          {hasMore && (
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#b91c1c" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMainViewMore}
                disabled={loading}
                style={{
                  padding: "12px 32px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
                }}
              >
                {loading ? "Loading..." : "View More"}
              </motion.button>
            </div>
          )}

        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 12 : 24 }}
            onClick={e => { if (e.target === e.currentTarget) { setModal(null); setErrorMsg(""); } }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: "#fff", borderRadius: 18, maxWidth: 580, width: "100%", maxHeight: isMobile ? "95vh" : "90vh", overflow: "auto" }}
            >
              <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "16px", textAlign: "center", borderRadius: "18px 18px 0 0", display: "flex", justifyContent: "center", alignItems: "center", height: isMobile ? 180 : 280, position: "relative" }}><img
                src={modal.image || "https://via.placeholder.com/400"}
                alt={modal.title || modal.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              /></div>
              <div style={{ padding: isMobile ? 20 : 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <Badge>{modal.badge}</Badge>
                    <h2 style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: isMobile ? 19 : 22, color: "#0f172a", margin: "10px 0 0" }}>{modal.title || modal.name}</h2>
                  </div>
                  <button onClick={() => { setModal(null); setErrorMsg(""); }}
                    style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 18 }}>✕</button>
                </div>
                <div style={{ margin: "0 0 24px" }}>
                  <p
                    style={{
                      color: "#0f172a",
                      fontSize: 14.5,
                      fontWeight: 600,
                      lineHeight: 1.7,
                      margin: "0 0 10px",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {modal.shortDesc || modal.description}
                  </p>

                  <p
                    style={{
                      color: "#475569",
                      fontSize: 14,
                      lineHeight: 1.75,
                      margin: 0,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {modal.fullDesc || modal.description}
                  </p>
                </div>
                <div style={{ background: "#f8fafc", borderRadius: 10, padding: isMobile ? 14 : 20, marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Send Inquiry</div>
                  {sent ? (
                    <div style={{ textAlign: "center", padding: 20, color: "#16a34a", fontWeight: 700 }}>
                      ✅ Inquiry sent! We'll contact you within 24 hours.
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                      {errorMsg && (
                        <div style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, gridColumn: "1/-1", marginBottom: 4 }}>
                          ⚠️ {errorMsg}
                        </div>
                      )}
                      {[["name", "text", "Your Name"], ["company", "text", "Company Name"], ["email", "email", "Email"], ["phone", "text", "Phone"]].map(([field, type, ph]) => (
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