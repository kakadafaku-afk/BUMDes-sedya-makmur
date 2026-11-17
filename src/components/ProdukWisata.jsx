import React, { useState } from "react";
import { 
  MessageCircle, 
  Search, 
  ShoppingBag, 
  X, 
  Check, 
  Plus, 
  Minus, 
  Clock, 
  Users, 
  Info,
  Calendar,
  Sparkles
} from "lucide-react";
import { PRODUK, PAKET_WISATA, KATEGORI_PRODUK, BUMDES, rupiah } from "../data/bumdes";

export default function ProdukWisata({ onAddToCart }) {
  const [kat, setKat] = useState("Semua");
  const [cari, setCari] = useState("");

  // State Modal Pop-up Detail
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWisata, setSelectedWisata] = useState(null);
  const [popupQty, setPopupQty] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const produkTampil = PRODUK.filter((p) => {
    const cocokKat = kat === "Semua" || p.kat === kat;
    const cocokCari = p.nama.toLowerCase().includes(cari.toLowerCase());
    return cocokKat && cocokCari;
  });

  const handleOpenProductModal = (p) => {
    setSelectedProduct(p);
    setPopupQty(1);
    setAddedToast(false);
  };

  const handleAddFromPopup = () => {
    if (!selectedProduct) return;
    onAddToCart?.(selectedProduct, popupQty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const waPesanLangsung = (p, qty = 1) => {
    const hargaStr = p.harga !== null ? `seharga ${rupiah(p.harga * qty)}` : `(ingin menanyakan harga & ketersediaan)`;
    return `https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(
      `Halo BUMDes Sedya Makmur, saya tertarik memesan *${p.nama}* sebanyak ${qty} pcs ${hargaStr}. Mohon info selanjutnya.`
    )}`;
  };

  const waPaketWisata = (pw) => {
    return `https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(
      `Halo BUMDes Sedya Makmur, saya ingin konsultasi dan reservasi paket *${pw.nama}*. Mohon informasi ketersediaan jadwal dan kuota.`
    )}`;
  };

  return (
    <section
      id="produk-wisata"
      className="py-24 bg-brand-krem/40 dark:bg-slate-900 border-t border-brand-krem-gelap dark:border-slate-800"
      aria-label="Produk dan Paket Wisata BUMDes Sedya Makmur"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* SEKSI 1: KATALOG PRODUK DESA */}
        {/* ============================================================ */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-terakota mb-3">
            Katalog Belanja
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-cokelat dark:text-white mb-4">
            Komoditas & Produk Unggulan Desa
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Hasil panen segar ketahanan pangan, komoditas holtikultura, dan karya kriya gerabah Mayong Lor.
            Klik produk untuk melihat rincian lengkap atau memasukkan ke keranjang belanja.
          </p>
        </div>

        {/* Filter Kategori & Pencarian */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Pills Kategori */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1" role="group" aria-label="Filter kategori produk">
            {KATEGORI_PRODUK.map((k) => (
              <button
                key={k}
                onClick={() => setKat(k)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[38px] shrink-0 cursor-pointer
                  ${kat === k
                    ? "bg-brand-terakota text-white shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-brand-krem-gelap dark:border-slate-700 hover:border-brand-terakota hover:text-brand-terakota"
                  }`}
                aria-pressed={kat === k}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Kolom Pencarian */}
          <div className="relative shrink-0 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari nama produk…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800
                border border-brand-krem-gelap dark:border-slate-700 text-slate-800 dark:text-slate-100
                placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-brand-terakota min-h-[40px]"
              aria-label="Cari produk"
            />
          </div>
        </div>

        {/* Grid Kartu Produk */}
        {produkTampil.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-brand-krem-gelap dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-500">Tidak ada produk yang cocok dengan pencarian "{cari}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
            {produkTampil.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.id}
                  className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden
                    border border-brand-krem-gelap dark:border-slate-700
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div
                    onClick={() => handleOpenProductModal(p)}
                    className="cursor-pointer"
                  >
                    {/* Media Foto atau Placeholder Artistik */}
                    {p.foto ? (
                      <img
                        src={p.foto}
                        alt={p.nama}
                        loading="lazy"
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-44 bg-gradient-to-br from-brand-krem to-brand-krem-gelap dark:from-slate-700 dark:to-slate-750 flex flex-col items-center justify-center p-4">
                        {Icon && <Icon size={44} className="text-brand-terakota/70 group-hover:scale-110 transition-transform" aria-hidden="true" />}
                        <span className="text-[10px] text-slate-400 mt-2 font-medium">Lihat Detail</span>
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-terakota/10 text-brand-terakota text-[10px] font-bold">
                          {p.kat}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
                          {p.unit}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-brand-cokelat dark:text-white mb-1.5 leading-snug group-hover:text-brand-terakota transition-colors line-clamp-1">
                        {p.nama}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-2">
                        {p.deskripsi}
                      </p>

                      <div className="text-sm font-extrabold text-brand-terakota">
                        {p.harga !== null ? `Mulai ${rupiah(p.harga)}` : "Tanyakan harga"}
                      </div>
                    </div>
                  </div>

                  {/* Tombol Aksi di Kartu */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCart?.(p, 1)}
                      className="py-2.5 rounded-xl border border-brand-terakota/30 text-brand-terakota hover:bg-brand-terakota hover:text-white text-xs font-bold transition flex items-center justify-center gap-1 min-h-[40px] cursor-pointer"
                      title="Tambahkan 1 pcs ke keranjang"
                    >
                      <ShoppingBag size={14} />
                      <span>Keranjang</span>
                    </button>

                    <button
                      onClick={() => handleOpenProductModal(p)}
                      className="py-2.5 rounded-xl bg-brand-terakota text-white hover:bg-brand-cokelat text-xs font-bold transition flex items-center justify-center gap-1 min-h-[40px] cursor-pointer shadow-xs"
                    >
                      <Info size={14} />
                      <span>Rincian</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* SEKSI 2: PAKET WISATA EDUKASI DESA */}
        {/* ============================================================ */}
        <div className="text-center mb-10 pt-8 border-t border-brand-krem-gelap/80 dark:border-slate-800">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-hijau mb-3">
            Eduwisata & Kemitraan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-cokelat dark:text-white mb-4">
            Paket Wisata Desa Mayong Lor
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
            Belajar langsung pembuatan gerabah tanah liat, pertanian modern hidroponik, dan peternakan kambing etawa bersama perajin dan kelompok tani desa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAKET_WISATA.map((pw) => {
            const Icon = pw.icon;
            return (
              <article
                key={pw.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7
                  border border-brand-krem-gelap dark:border-slate-700
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-hijau/15 flex items-center justify-center mb-5 text-brand-hijau shadow-inner">
                    {Icon && <Icon size={24} aria-hidden="true" />}
                  </div>

                  <h3 className="text-base font-extrabold text-brand-cokelat dark:text-white mb-2 leading-snug">
                    {pw.nama}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {pw.deskripsi}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 pb-4 border-b border-brand-krem-gelap dark:border-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-hijau" />
                      <span>{pw.durasi || "2-3 Jam"}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-brand-hijau" />
                      <span>Min. {pw.minPeserta || "10"} Orang</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedWisata(pw)}
                    className="py-3 rounded-2xl border border-brand-hijau/40 text-brand-hijau hover:bg-brand-hijau/10 text-xs font-bold transition flex items-center justify-center gap-1 min-h-[44px] cursor-pointer"
                  >
                    <Info size={14} />
                    <span>Rincian</span>
                  </button>

                  <a
                    href={waPaketWisata(pw)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 rounded-2xl bg-brand-hijau text-white hover:bg-brand-hijau-gelap text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
                  >
                    <MessageCircle size={15} />
                    <span>Reservasi</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL POP-UP DETAIL PRODUK */}
      {/* ============================================================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white dark:bg-slate-850 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-brand-krem-gelap dark:border-slate-700 my-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center shadow-md transition"
              aria-label="Tutup detail produk"
            >
              <X size={18} />
            </button>

            {/* Banner Foto */}
            <div className="h-56 bg-brand-krem dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
              {selectedProduct.foto ? (
                <img
                  src={selectedProduct.foto}
                  alt={selectedProduct.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 text-brand-terakota/70">
                  {selectedProduct.icon && <selectedProduct.icon size={64} className="mx-auto mb-2" />}
                  <span className="text-xs font-bold">Produk Asli Desa Mayong Lor</span>
                </div>
              )}
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                {selectedProduct.kat}
              </span>
            </div>

            {/* Isi Detail */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">Unit: {selectedProduct.unit || "BUMDes Sedya Makmur"}</span>
                <h3 className="text-xl font-black text-brand-cokelat dark:text-white mt-1 leading-snug">
                  {selectedProduct.nama}
                </h3>
                <p className="text-2xl font-black text-brand-terakota mt-2">
                  {selectedProduct.harga !== null ? rupiah(selectedProduct.harga) : "Tanyakan Harga"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-krem/40 dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-bold block text-brand-cokelat dark:text-white mb-1">Deskripsi Produk:</span>
                {selectedProduct.deskripsi || "Produk berkualitas hasil karya petani dan perajin Desa Mayong Lor."}
              </div>

              {/* Pengaturan Kuantitas */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih Jumlah Pesanan:</span>
                <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                  <button
                    onClick={() => setPopupQty(Math.max(1, popupQty - 1))}
                    className="p-2 text-slate-500 hover:text-brand-terakota transition"
                    aria-label="Kurangi kuantitas"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-bold">{popupQty}</span>
                  <button
                    onClick={() => setPopupQty(popupQty + 1)}
                    className="p-2 text-slate-500 hover:text-brand-terakota transition"
                    aria-label="Tambah kuantitas"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Tombol Aksi di Modal */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddFromPopup}
                  className="py-3 px-4 rounded-2xl border-2 border-brand-terakota text-brand-terakota hover:bg-brand-terakota hover:text-white font-extrabold text-xs transition flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>{addedToast ? "Ditambahkan!" : `+ Keranjang (${popupQty})`}</span>
                </button>

                <a
                  href={waPesanLangsung(selectedProduct, popupQty)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-2xl bg-brand-terakota text-white hover:bg-brand-cokelat font-extrabold text-xs transition flex items-center justify-center gap-2 min-h-[44px] shadow-md"
                >
                  <MessageCircle size={16} />
                  <span>Pesan Langsung WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL POP-UP DETAIL WISATA EDUKASI */}
      {/* ============================================================== */}
      {selectedWisata && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white dark:bg-slate-850 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-brand-krem-gelap dark:border-slate-700 my-8">
            <button
              onClick={() => setSelectedWisata(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center shadow-md transition"
              aria-label="Tutup detail wisata"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-hijau/15 flex items-center justify-center text-brand-hijau shadow-inner shrink-0">
                  {selectedWisata.icon && <selectedWisata.icon size={26} />}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-hijau">
                    Paket Wisata Edukasi Desa
                  </span>
                  <h3 className="text-xl font-black text-brand-cokelat dark:text-white leading-tight">
                    {selectedWisata.nama}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedWisata.deskripsi}
              </p>

              {/* Rincian Fasilitas & Ketentuan */}
              <div className="p-4 rounded-2xl bg-brand-krem/40 dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700 space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-brand-krem-gelap dark:border-slate-700">
                  <span className="text-slate-500">Estimasi Durasi Kegiatan:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedWisata.durasi || "2 - 3 Jam"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-brand-krem-gelap dark:border-slate-700">
                  <span className="text-slate-500">Kapasitas Peserta:</span>
                  <span className="font-bold text-slate-800 dark:text-white">Minimal {selectedWisata.minPeserta || "10"} Orang</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Pendamping:</span>
                  <span className="font-bold text-emerald-600">Perajin & Instruktur Lokal Mayong Lor</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Fasilitas yang Didapat:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-hijau" />
                    <span>Bahan & peralatan praktik</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-hijau" />
                    <span>Hasil karya boleh dibawa pulang</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-hijau" />
                    <span>Pemandu edukasi berpengalaman</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-hijau" />
                    <span>Dokumentasi kegiatan</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href={waPaketWisata(selectedWisata)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-brand-hijau text-white font-extrabold text-xs hover:bg-brand-hijau-gelap transition flex items-center justify-center gap-2 shadow-lg min-h-[46px]"
                >
                  <MessageCircle size={17} />
                  <span>Konsultasi Tanggal & Reservasi via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
