import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Profil from "./components/Profil";
import UnitUsaha from "./components/UnitUsaha";
import ProdukWisata from "./components/ProdukWisata";
import Transparansi from "./components/Transparansi";
import Warta from "./components/Warta";
import Kontak from "./components/Kontak";
import Footer from "./components/Footer";
import CartDrawer from "./components/public/CartDrawer";
import GoogleAuthModal from "./components/common/GoogleAuthModal";
import { Screen4_AdminLogin } from "./pages/admin/Screen4_AdminLogin";
import { Screen2_AdminDashboard } from "./pages/admin/Screen2_AdminDashboard";
import { WARTA } from "./data/bumdes";

const THEME_KEY = "sedya-makmur-tema";
const CART_KEY = "sedya-makmur-cart";
const USER_KEY = "sedya-makmur-user";

export default function App() {
  // Mode Gelap / Terang (Default: Terang)
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === "dark";
    } catch {
      return false;
    }
  });

  // State Keranjang Belanja
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State Akun Pengguna / Google Login
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // State tampilan Admin: 'none' | 'login' | 'dashboard'
  const [adminView, setAdminView] = useState("none");

  // Simpan preferensi tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  // Simpan keranjang belanja ke LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Simpan sesi pengguna
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {}
  }, [user]);

  // Listener rute /admin atau hash #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.hash === "#admin" || window.location.pathname === "/admin") {
        if (user && user.role === "admin") {
          setAdminView("dashboard");
        } else {
          setAdminView("login");
        }
      }
    };
    checkAdminRoute();
    window.addEventListener("hashchange", checkAdminRoute);
    return () => window.removeEventListener("hashchange", checkAdminRoute);
  }, [user]);

  // Fungsi Tambah Barang ke Keranjang
  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    if (userData.role === "admin") {
      setAdminView("dashboard");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAdminView("none");
  };

  const go = (id) => {
    if (adminView !== "none") {
      setAdminView("none");
      if (window.location.hash === "#admin") {
        window.history.pushState(null, "", window.location.pathname);
      }
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenAdmin = () => {
    window.location.hash = "admin";
    if (user && user.role === "admin") {
      setAdminView("dashboard");
    } else {
      setAdminView("login");
    }
  };

  const handleBackToPublic = () => {
    setAdminView("none");
    if (window.location.hash === "#admin") {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  // 1. Tampilan Dasbor Manajemen Admin Internal
  if (adminView === "dashboard") {
    return (
      <div className="min-h-screen bg-brand-krem/40 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans">
        <Screen2_AdminDashboard
          onLogout={handleBackToPublic}
          onViewPublic={handleBackToPublic}
        />
      </div>
    );
  }

  // 2. Tampilan Form Login Masuk Admin
  if (adminView === "login") {
    return (
      <div className="min-h-screen bg-brand-krem dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans flex flex-col justify-center items-center py-12 px-4">
        <Screen4_AdminLogin
          onSuccessLogin={() => setAdminView("dashboard")}
          onBackToPublic={handleBackToPublic}
        />
      </div>
    );
  }

  // 3. Tampilan Portal Publik Resmi BUMDes Sedya Makmur
  return (
    <div className="min-h-screen bg-[#FAF8FF] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-brand-terakota selection:text-white">
      <Navbar
        dark={dark}
        setDark={setDark}
        go={go}
        onOpenAdmin={handleOpenAdmin}
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <main>
        {/* 1. Hero Sambutan Resmi */}
        <Hero go={go} />

        {/* 2. Stats Bar (4 Metrik Data) */}
        <Stats />

        {/* 3. Profil Kelembagaan, Legalitas Hukum & Bagan Organisasi */}
        <Profil />

        {/* 4. 6 Unit Usaha Resmi */}
        <UnitUsaha />

        {/* 5. Produk Unggulan & Paket Wisata Edukasi */}
        <ProdukWisata onAddToCart={handleAddToCart} />

        {/* 6. Transparansi & Akuntabilitas Keuangan */}
        <Transparansi />

        {/* 7. Warta Kabar Desa (Hanya tampil jika ada artikel) */}
        {WARTA && WARTA.length > 0 && <Warta />}

        {/* 8. Kontak, Peta & Formulir Pengaduan */}
        <Kontak />
      </main>

      {/* 9. Footer & Tombol WhatsApp Melayang */}
      <Footer go={go} />

      {/* Drawer Keranjang Belanja */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Modal Otentikasi Google */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onOpenAdmin={handleOpenAdmin}
      />
    </div>
  );
}
