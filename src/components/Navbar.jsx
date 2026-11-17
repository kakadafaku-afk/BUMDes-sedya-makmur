import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ExternalLink, ShoppingBag, User, LogIn } from "lucide-react";
import { BUMDES, NAV } from "../data/bumdes";
import Logo from "./common/Logo";

/*
  Navbar Responsif & Modern BUMDes Sedya Makmur
  - Desktop: Navbar transparan/blur dengan 6 menu, tombol keranjang belanja, akun Google, dan admin.
  - Mobile: Bar menu horizontal yang bisa digeser (swipeable pills) + Drawer off-canvas.
*/
export default function Navbar({
  dark,
  setDark,
  go,
  onOpenAdmin,
  cartCount = 0,
  onOpenCart,
  user,
  onOpenAuth,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("beranda");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setActiveTab(id);
    go(id);
    setMenuOpen(false);
  };

  const scrolledClass = scrolled
    ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-brand-krem-gelap/60 dark:border-slate-800"
    : "bg-transparent";

  const textClass = scrolled
    ? "text-brand-cokelat dark:text-white"
    : "text-white";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolledClass}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identitas */}
          <button
            onClick={() => handleNav("beranda")}
            className="flex items-center gap-2.5 min-h-[44px] group focus:outline-hidden"
            aria-label="Kembali ke beranda BUMDes Sedya Makmur"
          >
            <Logo variant={scrolled ? (dark ? "white" : "dark") : "white"} size="md" />
          </button>

          {/* Menu Tengah — Desktop (Maksimal 6 Menu, Satu Baris) */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigasi utama desktop"
          >
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] cursor-pointer
                  ${
                    scrolled
                      ? "text-slate-700 dark:text-slate-200 hover:bg-brand-terakota/10 hover:text-brand-terakota"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sisi Kanan — Aksi Desktop & Tablet */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Tombol Keranjang Belanja */}
            <button
              onClick={onOpenCart}
              className={`relative p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                scrolled
                  ? "text-brand-cokelat dark:text-white hover:bg-brand-krem dark:hover:bg-slate-800"
                  : "text-white hover:bg-white/15"
              }`}
              aria-label={`Keranjang belanja, ${cartCount} barang`}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-terakota text-white text-[11px] font-black flex items-center justify-center shadow-md animate-scale-up">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Tombol Akun Google / Profil */}
            <button
              onClick={onOpenAuth}
              className={`p-2 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 cursor-pointer ${
                scrolled
                  ? "text-brand-cokelat dark:text-white hover:bg-brand-krem dark:hover:bg-slate-800"
                  : "text-white hover:bg-white/15"
              }`}
              aria-label={user ? `Akun: ${user.name}` : "Masuk Akun Google"}
            >
              {user ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-brand-terakota"
                />
              ) : (
                <div className="flex items-center gap-1 px-1">
                  <User size={18} />
                  <span className="hidden sm:inline">Masuk</span>
                </div>
              )}
            </button>

            {/* Toggle Mode Gelap / Terang */}
            <button
              onClick={() => setDark((d) => !d)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                scrolled
                  ? "text-brand-cokelat dark:text-white hover:bg-brand-krem dark:hover:bg-slate-800"
                  : "text-white hover:bg-white/15"
              }`}
              aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Tombol Masuk Panel Admin (Desktop) */}
            <button
              onClick={onOpenAdmin}
              className={`hidden sm:flex px-3 py-1.5 rounded-xl text-xs font-semibold items-center gap-1 transition-all min-h-[40px] cursor-pointer ${
                scrolled
                  ? "text-slate-600 dark:text-slate-300 hover:text-brand-terakota hover:bg-brand-krem dark:hover:bg-slate-800"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
              aria-label="Masuk ke Panel Admin Internal"
            >
              <ExternalLink size={13} />
              <span>Admin</span>
            </button>

            {/* Tombol Hamburger Drawer (Mobile) */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                scrolled ? "text-brand-cokelat dark:text-white" : "text-white"
              }`}
              aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* NAVBAR MOBILE BISA DIGESER (HORIZONTAL SWIPEABLE PILL BAR) */}
      {/* ============================================================== */}
      <div
        className={`lg:hidden w-full overflow-x-auto no-scrollbar py-2 px-4 border-t transition-all ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 border-brand-krem-gelap/60 dark:border-slate-800 shadow-sm"
            : "bg-black/30 backdrop-blur-md border-white/10"
        }`}
      >
        <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
                activeTab === item.id
                  ? "bg-brand-terakota text-white shadow-sm"
                  : scrolled
                    ? "bg-brand-krem/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-brand-krem"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-xs"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE SLIDE-IN OFF-CANVAS DRAWER MENU */}
      {/* ============================================================== */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-brand-krem-gelap dark:border-slate-800">
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-brand-krem-gelap dark:border-slate-800">
                <Logo variant={dark ? "white" : "dark"} size="sm" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  aria-label="Tutup menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tautan Menu Vertikal */}
              <nav className="py-4 space-y-1">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-brand-krem dark:hover:bg-slate-800 hover:text-brand-terakota transition min-h-[44px]"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Aksi Bawah Mobile Drawer */}
            <div className="pt-4 border-t border-brand-krem-gelap dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCart?.();
                }}
                className="w-full py-3 rounded-xl bg-brand-krem dark:bg-slate-800 text-brand-cokelat dark:text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} className="text-brand-terakota" />
                <span>Keranjang ({cartCount} Barang)</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAdmin?.();
                }}
                className="w-full py-3 rounded-xl bg-brand-terakota text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <ExternalLink size={15} />
                <span>Masuk Panel Pengurus Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
