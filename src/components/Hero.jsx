import React from "react";
import { MapPin, Clock, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { BUMDES, cekStatusOperasional } from "../data/bumdes";
import heroImg from "../assets/hero-sawah.jpg";

/*
  Hero layar penuh BUMDes Sedya Makmur.
  - Tata letak, judul, tombol, dan kartu kantor dikembalikan seperti semula.
  - Foto pemandangan sawah & Muria tetap cerah alami.
  - Overlay gradien tipis terarah agar teks tetap terbaca jelas tanpa membuat foto gelap.
*/
export default function Hero({ go }) {
  const statusOperasional = cekStatusOperasional();
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-cokelat"
      aria-label="Beranda BUMDes Sedya Makmur"
    >
      {/* 1. Foto Asli Pemandangan Desa Mayong Lor */}
      <img
        src={heroImg}
        alt="Petani dan hamparan persawahan Desa Mayong Lor berlatar Pegunungan Muria"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* 2. Overlay Gradien Halus: Hanya tipis di sisi teks (kiri), area sawah & kanan tetap cerah */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Gradien Halus Atas & Bawah untuk Transisi Navbar */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. Konten Utama Hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-32 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Kolom Kiri: Teks Sambutan & Tombol Aksi (7 Kolom) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-brand-krem text-xs font-semibold tracking-wide uppercase border border-white/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F5C98A] animate-pulse" />
              <span>{BUMDES.desa} · {BUMDES.kec} · {BUMDES.kab}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
              Selamat Datang di{" "}
              <span className="text-[#F5C98A] block sm:inline">
                {BUMDES.nama}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed mb-3 max-w-2xl">
              {BUMDES.slogan1}.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-9 max-w-xl">
              {BUMDES.slogan2}.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Tombol Utama */}
              <button
                onClick={() => go("unit")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl
                  bg-[#F5C98A] text-brand-cokelat font-bold text-sm
                  hover:bg-[#f0bc70] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
                aria-label="Lihat Unit Usaha BUMDes Sedya Makmur"
              >
                <span>Lihat Unit Usaha</span>
                <ArrowRight size={16} />
              </button>

              {/* Tombol Sekunder — WhatsApp */}
              <a
                href={`https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(
                  "Halo BUMDes Sedya Makmur, saya ingin mengetahui lebih lanjut tentang unit usaha dan layanan desa."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl
                  bg-black/35 backdrop-blur-md text-white font-semibold text-sm
                  border border-white/30 hover:bg-black/50 transition-all shadow-lg min-h-[44px]"
                aria-label="Hubungi kami via WhatsApp"
              >
                <MessageCircle size={16} />
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Kartu Kaca Info Kantor (5 Kolom) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div
              className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-3xl
                border border-white/20 p-5 sm:p-7 shadow-2xl relative overflow-hidden text-white"
              aria-label="Informasi Kantor BUMDes"
            >
              {/* Header Kartu */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-lg shadow-inner">
                    🏢
                  </div>
                  <div>
                    <h2 className="font-bold text-base sm:text-lg leading-tight">
                      Kantor BUMDes
                    </h2>
                    <span className="text-xs text-white/80">
                      Pusat Pelayanan & Informasi
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${
                    statusOperasional.buka
                      ? "bg-emerald-600/50 border-emerald-400/60 text-[#F5C98A]"
                      : "bg-amber-600/50 border-amber-400/60 text-white"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusOperasional.badgeColor} ${statusOperasional.buka ? "animate-pulse" : ""}`} />
                    <span>{statusOperasional.label}</span>
                  </span>
                  <span className="block text-[10px] text-white/70 mt-0.5">
                    {statusOperasional.detail}
                  </span>
                </div>
              </div>

              {/* Rincian Kontak */}
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#F5C98A] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">
                    {BUMDES.alamat}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-[#F5C98A] mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold">Jam Operasional Pelayanan:</span>
                    <span className="text-white/85 text-xs leading-relaxed">{BUMDES.jam}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#F5C98A] shrink-0" />
                  <a
                    href={`https://wa.me/${BUMDES.wa}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F5C98A] transition-colors font-medium break-all sm:break-normal"
                    aria-label={`WhatsApp ${BUMDES.direktur}: ${BUMDES.telp}`}
                  >
                    {BUMDES.direktur} (Direktur) — {BUMDES.telp}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#F5C98A] shrink-0" />
                  <a
                    href={`mailto:${BUMDES.email}`}
                    className="hover:text-[#F5C98A] transition-colors break-all sm:break-normal"
                  >
                    {BUMDES.email}
                  </a>
                </li>
              </ul>

              {/* Tombol Google Maps */}
              <a
                href={BUMDES.mapsEmbed}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl
                  bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold
                  transition-all border border-white/30 shadow-md min-h-[44px]"
                aria-label="Lihat lokasi kantor BUMDes di Google Maps"
              >
                <span>📍 Lihat Lokasi di Google Maps</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}