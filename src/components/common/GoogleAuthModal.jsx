import React, { useState } from "react";
import { X, LogOut, CheckCircle, Shield, User, Mail, ArrowRight } from "lucide-react";
import { BUMDES } from "../../data/bumdes";

/*
  Modal Otentikasi Google (Google Sign-In & Akun Pengguna)
  - Pengunjung dapat login dengan akun Google mereka.
  - Membedakan pembeli umum dengan akun pengurus (bumdesmayonglor@gmail.com).
  - Menyimpan status sesi di LocalStorage dan siap dihubungkan dengan Google Identity Services (GIS).
*/
export default function GoogleAuthModal({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
  onOpenAdmin,
}) {
  const [loading, setLoading] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  if (!isOpen) return null;

  // Simulasi Google One-Tap / OAuth Login
  const handleGoogleSignIn = (role = "warga") => {
    setLoading(true);
    setTimeout(() => {
      let userData;
      if (role === "admin") {
        userData = {
          name: `${BUMDES.direktur} (Pengurus)`,
          email: BUMDES.email,
          role: "admin",
          picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          loginTime: new Date().toISOString(),
        };
      } else {
        userData = {
          name: customName.trim() || "Warga Mayong Lor",
          email: customEmail.trim() || "warga.mayonglor@gmail.com",
          role: "warga",
          picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
          loginTime: new Date().toISOString(),
        };
      }

      onLoginSuccess(userData);
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-slate-850 rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-brand-krem-gelap dark:border-slate-700 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        {user ? (
          /* Tampilan Profil Pengguna yang Sudah Login */
          <div className="text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-terakota shadow-md mx-auto"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-brand-cokelat dark:text-white">
                {user.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                <Mail size={12} />
                <span>{user.email}</span>
              </p>
              <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user.role === "admin"
                  ? "bg-brand-terakota/15 text-brand-terakota"
                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              }`}>
                {user.role === "admin" ? "Pengurus BUMDes" : "Warga / Pembeli Terdaftar"}
              </span>
            </div>

            <div className="pt-2 space-y-2">
              {user.role === "admin" && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 rounded-xl bg-brand-terakota text-white font-bold text-xs hover:bg-brand-cokelat transition flex items-center justify-center gap-1.5"
                >
                  <Shield size={14} />
                  <span>Buka Dasbor Admin</span>
                </button>
              )}

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/40 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <LogOut size={14} />
                <span>Keluar Akun (Logout)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tampilan Form Masuk dengan Akun Google */
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-krem dark:bg-slate-700 text-brand-terakota flex items-center justify-center mx-auto mb-3 shadow-inner">
                <User size={24} />
              </div>
              <h3 className="font-extrabold text-lg text-brand-cokelat dark:text-white">
                Masuk Akun
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gunakan akun Google Anda untuk kemudahan pesanan belanja dan reservasi wisata desa.
              </p>
            </div>

            {/* Tombol Utama: Masuk dengan Google */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleGoogleSignIn("warga")}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2.5 shadow-sm transition disabled:opacity-60 cursor-pointer min-h-[44px]"
              >
                {/* Google Multi-Color SVG Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{loading ? "Menghubungkan..." : "Lanjutkan dengan Google"}</span>
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
                <span className="bg-white dark:bg-slate-850 px-2 text-[10px] text-slate-400 uppercase font-semibold">
                  Atau Akses Kedinasan
                </span>
              </div>

              <button
                onClick={() => handleGoogleSignIn("admin")}
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-brand-krem dark:bg-slate-800 text-brand-cokelat dark:text-white font-semibold text-xs hover:bg-brand-krem-gelap transition flex items-center justify-center gap-1.5"
              >
                <Shield size={13} className="text-brand-terakota" />
                <span>Masuk sebagai Akun Pengurus ({BUMDES.email})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

