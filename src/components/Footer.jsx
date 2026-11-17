import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { BUMDES, NAV, SOSMED } from "../data/bumdes";
import Logo from "./common/Logo";

// Icon Media Sosial SVG Resmi (Bebas Ketergantungan Eksternal)
function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

/*
  Footer BUMDes Sedya Makmur.
  - Logo resmi & Slogan penutup: "Desa Berdaya • Ekonomi Tumbuh • Masyarakat Sejahtera"
  - Tautan media sosial resmi (WhatsApp, Instagram, Facebook, YouTube, Email)
  - Navigasi cepat & Tombol WhatsApp melayang di sudut kanan bawah
*/
export default function Footer({ go }) {
  const getSosmedIcon = (nama) => {
    switch (nama) {
      case "Instagram":
        return <InstagramIcon size={16} />;
      case "Facebook":
        return <FacebookIcon size={16} />;
      case "YouTube":
        return <YoutubeIcon size={16} />;
      case "WhatsApp":
        return <MessageCircle size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  return (
    <>
      <footer className="bg-brand-cokelat text-brand-krem pt-16 pb-12 border-t border-brand-cokelat/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            {/* Kolom 1: Profil Singkat & Logo */}
            <div className="md:col-span-2 space-y-4">
              <Logo variant="white" size="lg" />
              <p className="text-xs text-white/80 leading-relaxed italic max-w-sm mt-3">
                "{BUMDES.slogan1}"
              </p>
              <p className="text-xs text-white/60 leading-relaxed max-w-md">
                {BUMDES.slogan2}. Mengelola 6 unit usaha terpadu untuk penguatan ekonomi desa Mayong Lor.
              </p>

              {/* Saluran Media Sosial */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C98A] block mb-3">
                  Ikuti Media Sosial Kami:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {SOSMED.map((s) => (
                    <a
                      key={s.nama}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-brand-terakota text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs border border-white/10"
                      aria-label={`${s.nama}: ${s.handle}`}
                    >
                      {getSosmedIcon(s.nama)}
                      <span className="hidden sm:inline">{s.nama}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Kolom 2: Tautan Pintas */}
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
                Navigasi Cepat
              </h4>
              <ul className="space-y-2 text-xs">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => go?.(n.id)}
                      className="text-white/70 hover:text-[#F5C98A] transition-colors py-1 inline-block cursor-pointer"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: Kontak & Jam Operasional */}
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
                Kontak Sekretariat
              </h4>
              <p className="text-xs text-white/75 mb-2 leading-relaxed">
                <strong>{BUMDES.direktur}</strong> (Direktur Utama)
              </p>
              <p className="text-xs text-white/75 mb-2 leading-relaxed">
                Telepon/WA:{" "}
                <a
                  href={`https://wa.me/${BUMDES.wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F5C98A] hover:underline"
                >
                  {BUMDES.telp}
                </a>
              </p>
              <p className="text-xs text-white/75 mb-2 leading-relaxed">
                Email: {BUMDES.email}
              </p>
              <p className="text-xs text-white/60 mt-3 leading-relaxed">
                {BUMDES.alamat}
              </p>
            </div>
          </div>

          {/* Bagian Bawah: Penutup Slogan Resmi */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <div className="text-center sm:text-left">
              <span className="font-extrabold tracking-wide text-brand-krem">
                {BUMDES.footerPenutup}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>© {new Date().getFullYear()} {BUMDES.nama}. Semua hak dilindungi.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Tautan Bantuan WhatsApp">
        <a
          href={`https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(
            "Halo BUMDes Sedya Makmur, saya ingin bertanya tentang layanan BUMDes."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-hidden focus:ring-4 focus:ring-emerald-400/50 min-h-[48px] min-w-[48px]"
          aria-label="Hubungi kami langsung via WhatsApp"
        >
          <MessageCircle size={26} className="fill-current" />
        </a>
      </aside>
    </>
  );
}
