import React from "react";
import {
  Wallet,
  Wrench,
  ShoppingBasket,
  Utensils,
  Landmark,
  Leaf,
  ArrowRight,
  Info
} from "lucide-react";
import { BUMDES } from "../data/bumdes";

// Data 6 Unit Usaha dengan penambahan field "aksi" untuk membedakan tombol CTA
const dataUnitUsaha = [
  {
    id: 1,
    nama_unit: "Simpan Pinjam",
    deskripsi: "Dukungan modal usaha bagi warga desa. Modal awal Rp 25 juta berkembang menjadi sekitar Rp 38 juta dan telah membantu 50+ nasabah.",
    icon: Wallet,
    badge: "50+ nasabah terbantu",
    aksi: "whatsapp" // Akan menampilkan tombol WA
  },
  {
    id: 2,
    nama_unit: "Persewaan Bekisting",
    deskripsi: "Penyewaan bekisting (formwork) untuk kebutuhan konstruksi bangunan warga dan pelaku jasa konstruksi di sekitar Mayong Lor.",
    icon: Wrench,
    badge: "",
    aksi: "whatsapp" // Akan menampilkan tombol WA
  },
  {
    id: 3,
    nama_unit: "Perdagangan Sembako & Hortikultura",
    deskripsi: "Supplier SPPG — mendukung program Makan Bergizi Gratis (MBG) dengan menyuplai sayur, tahu, buah lokal, dan komoditas pangan ke beberapa SPPG di Mayong Lor.",
    icon: ShoppingBasket,
    badge: "Supplier resmi MBG",
    aksi: "whatsapp" // Akan menampilkan tombol WA
  },
  {
    id: 4,
    nama_unit: "Kantin Karyawan Pabrik",
    deskripsi: "Sejak Desember 2025, mengelola kantin karyawan di PT. TBS Industrial Indo bekerja sama dengan Perkumpulan UMKM Jatrasmol.",
    icon: Utensils,
    badge: "",
    aksi: "internal" // Akan menampilkan label khusus
  },
  {
    id: 5,
    nama_unit: "Gerabah & Produk Arsitektur",
    deskripsi: "Melestarikan produk lokal unggulan: gerabah, genteng, dan produk arsitektur khas Mayong Lor.",
    icon: Landmark,
    badge: "",
    aksi: "katalog" // Akan scroll ke bawah
  },
  {
    id: 6,
    nama_unit: "Ketahanan Pangan",
    deskripsi: "Sejak Februari 2026, amanat Perdes: pertanian hidroponik, peternakan kambing peranakan, dan hortikultura terintegrasi.",
    icon: Leaf,
    badge: "",
    aksi: "katalog" // Akan scroll ke bawah
  }
];

export default function UnitUsaha() {
  // Fungsi untuk scroll otomatis ke bagian katalog produk
  const scrollToKatalog = () => {
    // Pastikan pada komponen <ProdukWisata /> Anda memberikan id="produk"
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="unit" className="py-24 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            6 Bidang Usaha Kami
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
            BUMDes Sedya Makmur mengelola enam unit usaha yang saling mendukung
            untuk menggerakkan ekonomi Desa Mayong Lor.
          </p>
        </div>

        {/* Grid 6 Kartu Unit Usaha */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataUnitUsaha.map((unit) => (
            <div
              key={unit.id}
              className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl flex flex-col h-full hover:bg-slate-800 transition-colors"
            >
              {/* Ikon Kartu */}
              <div className="w-12 h-12 rounded-xl bg-[#B5532F] flex items-center justify-center mb-6 shrink-0 shadow-lg">
                <unit.icon size={24} className="text-white" />
              </div>

              {/* Teks Konten */}
              <h3 className="text-xl font-bold text-white mb-3">
                {unit.nama_unit}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-6 flex-grow">
                {unit.deskripsi}
              </p>

              {/* Badge (Jika Ada) */}
              {unit.badge && (
                <div className="mb-6">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold text-[#B5532F] bg-[#B5532F]/10 border border-[#B5532F]/20 rounded-full">
                    {unit.badge}
                  </span>
                </div>
              )}

              {/* Divider Pembatas */}
              <div className="w-full h-px bg-slate-700 mb-5 mt-auto" />

              {/* LOGIKA TOMBOL BERDASARKAN JENIS AKSI */}

              {unit.aksi === "whatsapp" && (
                <a
                  href={`https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(
                    `Halo BUMDes Sedya Makmur, saya tertarik dan ingin bertanya lebih lanjut mengenai layanan ${unit.nama_unit}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C98A] hover:text-white transition-colors min-h-[44px]"
                >
                  <span>Hubungi via WhatsApp</span>
                  <ArrowRight size={16} />
                </a>
              )}

              {unit.aksi === "katalog" && (
                <button
                  onClick={scrollToKatalog}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C98A] hover:text-white transition-colors text-left min-h-[44px] cursor-pointer"
                >
                  <span>Lihat Katalog Produk</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {unit.aksi === "internal" && (
                <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 cursor-not-allowed min-h-[44px]">
                  <Info size={16} />
                  <span>Khusus Internal B2B</span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}