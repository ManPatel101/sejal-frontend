import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "../components/ui/Badge.jsx";
import {
  SERVICES,
  CATEGORIES,
} from "../data/index.js";

import axios from "axios";

export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");
  const [productSearch, setProductSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");
  /* ─────────────────────────────────────────────
     STATES
  ───────────────────────────────────────────── */
  const [products, setProducts] = useState([]);

  const [inquiries, setInquiries] = useState([]);

  const [editProduct, setEditProduct] =
    useState(null);

  const [showAddProduct, setShowAddProduct] =
    useState(false);

  const [newProduct, setNewProduct] = useState({
  title: "",
  shortDesc: "",
  fullDesc: "",
  category: "Extinguishers",
  badge: "ISI Certified",
  image: "",
});

  /* ─────────────────────────────────────────────
     API URLS
  ───────────────────────────────────────────── */
  const INQUIRY_API = "http://localhost:5000/api/inquiries";
  const PRODUCT_API = "http://localhost:5000/api/products";

/* FETCH INQUIRIES */
const fetchInquiries = async () => {
  try {
    const res = await axios.get(INQUIRY_API);

    console.log("INQUIRY API:", res.data);

    const data = res.data.inquiries || [];

    const formatted = data.map((item) => ({
      id: item._id,
      name: item.name || "-",
      email: item.email || "-",
      phone: item.phone || "-",
      product: item.product || "-",
      message: item.message || "-",
      status: item.status || "Pending",
      date: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "-",
    }));

    setInquiries(formatted);
  } catch (error) {
    console.error("Error fetching inquiries:", error);

    setInquiries([]);
  }
};
/* LOAD DATA */
const fetchProducts = async () => {
  try {
    const res = await axios.get(PRODUCT_API);

    setProducts(res.data.products || []);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchInquiries();

  fetchProducts();

  const interval = setInterval(() => {
    fetchInquiries();
    fetchProducts();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  /* ─────────────────────────────────────────────
     UPDATE STATUS
  ───────────────────────────────────────────── */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${INQUIRY_API}/${id}`,
        { status }
      );

      setInquiries((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, status }
            : i
        )
      );
    } catch (error) {
      console.error(
        "Error updating status:",
        error
      );
    }
  };

  /* ─────────────────────────────────────────────
     DELETE INQUIRY
  ───────────────────────────────────────────── */
  const deleteInquiry = async (id) => {
    try {
      await axios.delete(
        `${INQUIRY_API}/${id}`
      );

      await fetchInquiries();
    } catch (error) {
      console.error(
        "Delete Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  /* ─────────────────────────────────────────────
     PRODUCT FUNCTIONS
  ───────────────────────────────────────────── */
  const deleteProduct = async (id) => {
  try {
    await axios.delete(
      `${PRODUCT_API}/${id}`
    );

    setProducts((prev) =>
      prev.filter((p) => p._id !== id)
    );
  } catch (error) {
    console.log(error);
  }
};

  const addProduct = async () => {
    if (
    !newProduct.title ||
    !newProduct.shortDesc ||
    !newProduct.fullDesc ||
    !newProduct.image
  ) {
    alert("Please fill all fields");
    return;
  }
  try {
    const res = await axios.post(
      PRODUCT_API,
      newProduct
    );

    setProducts((prev) => [
      res.data.product,
      ...prev,
    ]);

    setNewProduct({
      title: "",
      shortDesc: "",
      fullDesc: "",
      category: "Extinguishers",
      badge: "ISI Certified",
      image: "",
    });

    setShowAddProduct(false);
  } catch (error) {
    console.log(error);
  }
};

  const updateProduct = async () => {
     if (
    !editProduct.title ||
    !editProduct.shortDesc ||
    !editProduct.fullDesc ||
    !editProduct.image
  ) {
    alert("Please fill all fields");
    return;
  }
  try {
    const res = await axios.put(
      `${PRODUCT_API}/${editProduct._id}`,
      editProduct
    );

    setProducts((prev) =>
      prev.map((p) =>
        p._id === editProduct._id
          ? res.data.product
          : p
      )
    );

    setEditProduct(null);
  } catch (error) {
    console.log(error);
  }
};

  /* ─────────────────────────────────────────────
     SIDEBAR
  ───────────────────────────────────────────── */
  const sidebarItems = [
    {
      id: "dashboard",
      icon: "📊",
      label: "Dashboard",
    },
    {
      id: "products",
      icon: "📦",
      label: "Products",
    },
    {
      id: "services",
      icon: "🔧",
      label: "Services",
    },
    {
      id: "inquiries",
      icon: "📨",
      label: "Inquiries",
    },
  ];
  const filteredProducts = products.filter((p) =>
  p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
  p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
  p.badge.toLowerCase().includes(productSearch.toLowerCase())
);

const filteredInquiries = inquiries.filter((inq) =>
  inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
  inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
  inq.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
  inq.product.toLowerCase().includes(inquirySearch.toLowerCase()) ||
  inq.status.toLowerCase().includes(inquirySearch.toLowerCase())
);

  const statusColors = {
    Pending: "#f59e0b",
    Contacted: "#3b82f6",
    Converted: "#16a34a",
  };

  return (
    <div
      style={{
        paddingTop: 68,
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      {/* ───────────────── Sidebar ───────────────── */}
      <div
        style={{
          width: 240,
          background: "#0f172a",
          padding: "24px 0",
          position: "sticky",
          top: 68,
          height: "calc(100vh - 68px)",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "0 20px 24px",
            borderBottom:
              "1px solid #1e293b",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: "#475569",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Admin Panel
          </div>

          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
            }}
          >
            Aegis Fire & Safety
          </div>
        </div>

        <div style={{ padding: "16px 12px" }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setSection(item.id)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "11px 14px",
                borderRadius: 8,
                border: "none",
                background:
                  section === item.id
                    ? "#dc2626"
                    : "transparent",
                color:
                  section === item.id
                    ? "#fff"
                    : "#94a3b8",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                marginBottom: 4,
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 18 }}>
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ───────────────── MAIN ───────────────── */}
      <div
        style={{
          flex: 1,
          padding: 32,
          overflowY: "auto",
        }}
      >
        {/* ───────────────── DASHBOARD ───────────────── */}
        {section === "dashboard" && (
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Dashboard Overview
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(220px,1fr))",
                gap: 20,
                marginBottom: 30,
              }}
            >
      
              {[
                {
                  label: "Total Products",
                  value: products.length,
                  color: "#dc2626",
                },
                {
                  label: "Total Inquiries",
                  value: inquiries.length,
                  color: "#2563eb",
                },
                {
                  label: "Pending",
                  value: inquiries.filter(
                    (i) =>
                      i.status ===
                      "Pending"
                  ).length,
                  color: "#f59e0b",
                },
                {
                  label: "Converted",
                  value: inquiries.filter(
                    (i) =>
                      i.status ===
                      "Converted"
                  ).length,
                  color: "#16a34a",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: 24,
                    borderRadius: 14,
                    border:
                      "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      color: "#64748b",
                      marginBottom: 10,
                    }}
                  >
                    {card.label}
                  </div>

                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: card.color,
                    }}
                  >
                    {card.value}
                  </div>
                </div>
              ))}
            </div>
            {/* ───────── Recent Inquiries List (Dashboard) ───────── */}
{/* ───────── Recent Inquiries TABLE (Dashboard Only) ───────── */}
<div
  style={{
    marginTop: 20,
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  }}
>
  {/* Header */}
  <div
    style={{
      padding: 16,
      fontWeight: 700,
      fontSize: 16,
      borderBottom: "1px solid #f1f5f9",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <span>Recent Inquiries</span>
    <span style={{ fontSize: 12, color: "#64748b" }}>
      Latest {Math.min(inquiries.length, 5)} records
    </span>
  </div>

  {/* Table */}
  <div style={{ overflowX: "auto" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 14,
      }}
    >
      <thead>
        <tr style={{ background: "#f8fafc" }}>
          {["Name", "Product", "Date", "Status"].map((h) => (
            <th
              key={h}
              style={{
                padding: 12,
                textAlign: "left",
                fontSize: 13,
                color: "#374151",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {inquiries.slice(0, 5).map((inq) => (
          <tr
            key={inq.id}
            style={{
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <td style={{ padding: 12, fontWeight: 600 }}>
              {inq.name}
            </td>

            <td style={{ padding: 12, color: "#475569" }}>
              {inq.product}
            </td>

            <td style={{ padding: 12, color: "#64748b" }}>
              {inq.date}
            </td>

            <td style={{ padding: 12 }}>
              <span
                style={{
                  background: `${statusColors[inq.status]}20`,
                  color: statusColors[inq.status],
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {inq.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
          </div>

        )}

        {/* ───────────────── PRODUCTS ───────────────── */}
        {section === "products" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    margin:
                      "0 0 4px",
                  }}
                >
                  Product Management
                </h1>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  {products.length} products
                  listed
                </p>
                <div style={{ marginTop: 18 }}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) =>
                    setProductSearch(e.target.value)
                  }
                 style={{
                   width: 320,
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 14,
                    outline: "none",
                  }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setShowAddProduct(
                    true
                  );

                  setEditProduct(
                    null
                  );
                }}
                style={{
                  padding:
                    "10px 22px",
                  background:
                    "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + Add Product
              </button>
            </div>

            {(showAddProduct ||
              editProduct) && (
              <div
                style={{
                  background:
                    "#fff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: 14,
                  }}
                >
                  <input
                    placeholder="Product title"
                    value={
                      editProduct
                        ? editProduct.title
                        : newProduct.title
                    }
                    onChange={(e) =>
                      editProduct
                        ? setEditProduct(
                            {
                              ...editProduct,
                              title:
                                e
                                  .target
                                  .value,
                            }
                          )
                        : setNewProduct(
                            {
                              ...newProduct,
                              title:
                                e
                                  .target
                                  .value,
                            }
                          )
                    }
                    style={{
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: 8,
                    }}
                  />

                  <input
                    placeholder="Badge"
                    value={
                      editProduct
                        ? editProduct.badge
                        : newProduct.badge
                    }
                    onChange={(e) =>
                      editProduct
                        ? setEditProduct(
                            {
                              ...editProduct,
                              badge:
                                e
                                  .target
                                  .value,
                            }
                          )
                        : setNewProduct(
                            {
                              ...newProduct,
                              badge:
                                e
                                  .target
                                  .value,
                            }
                          )
                    }
                    style={{
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: 8,
                    }}
                  />

                  <select
                    value={
                      editProduct
                        ? editProduct.category
                        : newProduct.category
                    }
                    onChange={(e) =>
                      editProduct
                        ? setEditProduct(
                            {
                              ...editProduct,
                              category:
                                e
                                  .target
                                  .value,
                            }
                          )
                        : setNewProduct(
                            {
                              ...newProduct,
                              category:
                                e
                                  .target
                                  .value,
                            }
                          )
                    }
                    style={{
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: 8,
                    }}
                  >
                    {CATEGORIES.filter(
                      (c) =>
                        c !== "All"
                    ).map((c) => (
                      <option key={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (editProduct) {
        setEditProduct({
          ...editProduct,
          image: reader.result,
        });
      } else {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      }
    };

    reader.readAsDataURL(file);
  }}
  style={{
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
  }}
/>

                  <textarea
  placeholder="Short Description"
  value={
    editProduct
      ? editProduct.shortDesc
      : newProduct.shortDesc
  }
  onChange={(e) =>
    editProduct
      ? setEditProduct({
          ...editProduct,
          shortDesc:
            e.target.value,
        })
      : setNewProduct({
          ...newProduct,
          shortDesc:
            e.target.value,
        })
  }
  style={{
    gridColumn: "1/-1",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    height: 70,
  }}
/>

<textarea
  placeholder="Full Details"
  value={
    editProduct
      ? editProduct.fullDesc
      : newProduct.fullDesc
  }
  onChange={(e) =>
    editProduct
      ? setEditProduct({
          ...editProduct,
          fullDesc:
            e.target.value,
        })
      : setNewProduct({
          ...newProduct,
          fullDesc:
            e.target.value,
        })
  }
  style={{
    gridColumn: "1/-1",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    height: 120,
  }}
/>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                    }}
                  >
                    <button
                      onClick={
                        editProduct
                          ? updateProduct
                          : addProduct
                      }
                      style={{
                        padding:
                          "10px 24px",
                        background:
                          "#dc2626",
                        color:
                          "#fff",
                        border:
                          "none",
                        borderRadius: 8,
                        cursor:
                          "pointer",
                      }}
                    >
                      {editProduct
                        ? "Save Changes"
                        : "Add Product"}
                    </button>

                    <button
                      onClick={() => {
                        setShowAddProduct(
                          false
                        );

                        setEditProduct(
                          null
                        );
                      }}
                      style={{
                        padding:
                          "10px 24px",
                        background:
                          "#f1f5f9",
                        border:
                          "none",
                        borderRadius: 8,
                        cursor:
                          "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                border:
                  "1px solid #e2e8f0",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "#f8fafc",
                    }}
                  >
                    {[
                      "Icon",
                      "Name",
                      "Category",
                      "Badge",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: 14,
                          textAlign:
                            "left",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((p) => (  
                    <tr
                      key={p._id}
                      style={{
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <td
                        style={{
                          padding: 14,
                        }}
                      >
                        <img
  src={p.image || "https://via.placeholder.com/60"}
  alt={p.title}
  style={{
    width: 60,
    height: 60,
    objectFit: "cover",
    borderRadius: 8,
  }}
/>
                      </td>

                      <td
                        style={{
                          padding: 14,
                        }}
                      >
                        {p.title}
                      </td>

                      <td
                        style={{
                          padding: 14,
                        }}
                      >
                        <Badge>
                          {p.category}
                        </Badge>
                      </td>

                      <td
                        style={{
                          padding: 14,
                        }}
                      >
                        {p.badge}
                      </td>

                      <td
                        style={{
                          padding: 14,
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            gap: 8,
                          }}
                        >
                          <button
                            onClick={() => {
                              setEditProduct(
                                p
                              );

                              setShowAddProduct(
                                false
                              );
                            }}
                            style={{
                              padding:
                                "6px 14px",
                              border:
                                "none",
                              borderRadius: 6,
                              background:
                                "#2563eb20",
                              color:
                                "#2563eb",
                              cursor:
                                "pointer",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(
                                 p._id
                          )
                            }
                            style={{
                              padding:
                                "6px 14px",
                              border:
                                "none",
                              borderRadius: 6,
                              background:
                                "#dc262620",
                              color:
                                "#dc2626",
                              cursor:
                                "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ───────────────── SERVICES ───────────────── */}
        {section === "services" && (
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 28,
              }}
            >
              Services Management
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(300px,1fr))",
                gap: 20,
              }}
            >
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: 24,
                    border:
                      "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                    }}
                  >
                    {s.icon}
                  </div>

                  <h3
                    style={{
                      fontWeight: 700,
                      marginTop: 12,
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      color: "#64748b",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── INQUIRIES ───────────────── */}
        {section === "inquiries" && (
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              Inquiry Management
            </h1>
            <div style={{ marginBottom: 20 }}>
  <input
    type="text"
    placeholder="Search inquiries..."
    value={inquirySearch}
    onChange={(e) =>
      setInquirySearch(e.target.value)
    }
    style={{
      width: 340,
      padding: "10px 14px",
      border: "1px solid #e2e8f0",
      borderRadius: 8,
      fontSize: 14,
      outline: "none",
      background: "#fff",
    }}
  />
</div>

            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                border:
                  "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse:
                      "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background:
                          "#f8fafc",
                      }}
                    >
                      {[
                        "Name",
                        "Email",
                        "Phone",
                        "Product",
                        "Message",
                        "Date",
                        "Status",
                        "Action",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: 14,
                            textAlign:
                              "left",
                            fontSize: 13,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInquiries.map(
                      (inq) => (
                        <tr
                          key={inq.id}
                          style={{
                            borderBottom:
                              "1px solid #f1f5f9",
                          }}
                        >
                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            {inq.name}
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            {inq.email}
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            {inq.phone}
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            {inq.product}
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            {inq.message}
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            {inq.date}
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            <select
                              value={
                                inq.status
                              }
                              onChange={(
                                e
                              ) =>
                                updateStatus(
                                  inq.id,
                                  e
                                    .target
                                    .value
                                )
                              }
                              style={{
                                padding:
                                  "6px 10px",
                                borderRadius: 6,
                              }}
                            >
                              <option>
                                Pending
                              </option>

                              <option>
                                Contacted
                              </option>

                              <option>
                                Converted
                              </option>
                            </select>
                          </td>

                          <td
                            style={{
                              padding: 14,
                            }}
                          >
                            <button
                              onClick={() =>
                                deleteInquiry(
                                  inq.id
                                )
                              }
                              style={{
                                background:
                                  "#dc2626",
                                color:
                                  "#fff",
                                border:
                                  "none",
                                padding:
                                  "7px 14px",
                                borderRadius: 6,
                                cursor:
                                  "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}