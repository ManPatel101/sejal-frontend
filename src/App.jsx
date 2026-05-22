import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import ScrollToTop from "./components/utils/ScrollToTop"; // ✅ ADD THIS

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />

      {/* ✅ THIS FIXES YOUR HALF/MIDDLE PAGE ISSUE */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;