import React, { useState } from 'react';
import { 
  Sparkles, 
  Droplets, 
  Coins, 
  Compass, 
  Search, 
  FileCheck, 
  Info 
} from 'lucide-react';
import { mockPotteryProducts, mockPotteryCategories } from '../../../services/mockData/catalogData';
import { B2BOrderModal } from '../../../components/public/B2BOrderModal';
import { ProductDetailModal } from '../../../components/public/ProductDetailModal';
import type { PotteryProduct } from '../../../types/catalog';
import { formatRupiah } from '../../../utils/formatters';

export const Screen7_BusinessCatalog: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<'gerabah' | 'pamsimas' | 'usp' | 'wisata'>('gerabah');
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<PotteryProduct | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<PotteryProduct | null>(null);

  const filteredProducts = mockPotteryProducts.filter((p) => {
    const matchCategory = selectedCategory === 1 || p.category_id === selectedCategory;
    const matchQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#FAF8FF] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-xs font-bold text-[#0F5132]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unit Usaha & E-Katalog Komoditas Terpadu Mayong Lor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            E-Katalog Resmi & Pengadaan B2B BUMDes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Jelajahi seluruh lini produk dan jasa dari 4 unit usaha BUMDes Mayong Lor. Siap melayani pemesanan skala dinas, korporasi, perhotelan, maupun pelanggan masyarakat umum.
          </p>
        </div>

        {/* 4 Commodity Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedCommodity('gerabah')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
              selectedCommodity === 'gerabah'
                ? 'bg-white border-[#C85A32] shadow-md shadow-orange-950/5 ring-2 ring-[#C85A32]/20'
                : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C85A32] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Kriya Gerabah</h4>
              <p className="text-[11px] text-slate-500">Katalog Pot & Guci B2B</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedCommodity('pamsimas')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
              selectedCommodity === 'pamsimas'
                ? 'bg-white border-blue-500 shadow-md shadow-blue-950/5 ring-2 ring-blue-500/20'
                : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">PAMSIMAS Tirta</h4>
              <p className="text-[11px] text-slate-500">Pasang Sambungan PAM</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedCommodity('usp')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
              selectedCommodity === 'usp'
                ? 'bg-white border-emerald-600 shadow-md shadow-emerald-950/5 ring-2 ring-emerald-600/20'
                : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">USP Syariah</h4>
              <p className="text-[11px] text-slate-500">Paket Modal Usaha</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedCommodity('wisata')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
              selectedCommodity === 'wisata'
                ? 'bg-white border-amber-500 shadow-md shadow-amber-950/5 ring-2 ring-amber-500/20'
                : 'bg-white/80 border-slate-200 hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Desa Wisata</h4>
              <p className="text-[11px] text-slate-500">Paket Workshop Kriya</p>
            </div>
          </button>
        </div>

        {/* Commodity 1: Kriya Gerabah E-Katalog View */}
        {selectedCommodity === 'gerabah' && (
          <div className="space-y-6">
            {/* Filter Bar & Search */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category tabs */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                {mockPotteryCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#0F5132] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari guci, pot, SKU..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={p.image_urls[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-700 font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                      {p.sku}
                    </span>
                    <span className="absolute top-3 right-3 bg-[#C85A32] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Siap B2B
                    </span>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded flex justify-between">
                      <span>Kapasitas: {p.production_capacity_monthly} pcs/bln</span>
                      <span>Lead Time: {p.lead_time_days} hari</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {p.category_name}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F5132] transition-colors mt-0.5">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 flex justify-between">
                      <span>Dimensi: <b className="text-slate-800">{p.dimensions}</b></span>
                      <span>Stok: <b className="text-emerald-700">{p.stock_ready} pcs</b></span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Harga Satuan Retail:</span>
                        <span className="line-through text-slate-500">{formatRupiah(p.price)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#C85A32]">Grosir B2B (Min {p.min_b2b_qty} pcs):</span>
                        <span className="text-base font-extrabold text-[#0F5132]">
                          {formatRupiah(p.b2b_wholesale_price)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedProductForDetail(p)}
                        className="py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Detail Spek</span>
                      </button>
                      <button
                        onClick={() => setSelectedProductForOrder(p)}
                        className="py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F5132] hover:bg-[#0b3e26] transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-amber-300" />
                        <span>Ajukan PO B2B</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commodity 2: PAMSIMAS Information & Form */}
        {selectedCommodity === 'pamsimas' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                Layanan Utilitas Air Bersih Mayong Lor
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Permohonan Pasang Sambungan Baru PAMSIMAS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Biaya instalasi resmi BUMDes: Rp 1.250.000 (termasuk water meteran segel SNI, pipa transmisi hingga 15 meter, stop kran, dan biaya survei petugas).
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Permohonan instalasi sambungan baru PAMSIMAS berhasil dikirim! Tim teknisi akan menghubungi nomor Anda dalam 1x24 jam kerja.');
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Pemohon (Sesuai KTP) *</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor Induk Kependudukan (NIK) *</label>
                <input
                  type="text"
                  placeholder="16 Digit NIK"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxx"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Wilayah Dusun *</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]">
                  <option>Dusun Krajan (RT 01 - RT 04)</option>
                  <option>Dusun Kauman (RT 01 - RT 03)</option>
                  <option>Dusun Pancur Lor (RT 01 - RT 03)</option>
                  <option>Dusun Karang Anyar (RT 01 - RT 02)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Rumah *</label>
                <input
                  type="text"
                  placeholder="Nama jalan, RT/RW, dan patokan rumah"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0F5132] text-white font-bold text-xs hover:bg-[#0b3e26] transition-colors"
                >
                  Kirim Pengajuan Sambungan Air Baru
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Commodity 3: USP Syariah Information & Form */}
        {selectedCommodity === 'usp' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                Layanan Keuangan Mikro Syariah Desa
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Pengajuan Permodalan Usaha (Akad Mudharabah / Murabahah)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Plafon pembiayaan hingga Rp 25.000.000 dengan proses verifikasi survei lapangan maksimal 3 hari kerja dan nisbah bagi hasil yang adil tanpa denda riba.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F5132]">1. Pedagang Pasar Mayong</span>
                <p className="text-slate-500 text-[11px]">Modal kulakan sembako, sayuran, dan bumbu dapur harian.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F5132]">2. Pengrajin Gerabah</span>
                <p className="text-slate-500 text-[11px]">Pembelian bahan tanah liat super dan kayu bakar asam jawa.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F5132]">3. Industri Rumahan & Jasa</span>
                <p className="text-slate-500 text-[11px]">Pengadaan mesin produksi dan etalase toko warga.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between flex-wrap gap-2">
              <span>Konsultasikan pengajuan modal usaha langsung dengan Staf USP Mekar Syariah di Kantor BUMDes.</span>
              <a
                href="https://wa.me/6281228908423"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0F5132] text-white font-bold text-xs hover:bg-[#0b3e26]"
              >
                Chat WhatsApp USP: 0812-2890-8423
              </a>
            </div>
          </div>
        )}

        {/* Commodity 4: Desa Wisata Packages */}
        {selectedCommodity === 'wisata' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
                  alt="Workshop Gerabah"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0F5132] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Paket Edukasi Sekolah & Mahasiswa
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  Paket Workshop Kriya Gerabah Tradisional
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Durasi 4 jam: Pemaparan sejarah tanah liat Mayong, praktik memutar guci didampingi maestro pengrajin sepuh, dan hasil karya boleh dibawa pulang setelah dibakar.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="font-extrabold text-[#0F5132] text-sm">Rp 45.000 / Peserta (Min. 15 Pax)</span>
                <button
                  onClick={() => alert('Menghubungi koordinator wisata Mayong Lor di 0812-2890-8424.')}
                  className="px-4 py-2 rounded-xl bg-[#0F5132] text-white font-bold text-xs"
                >
                  Reservasi Paket
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                  alt="Homestay Desa"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#C85A32] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Paket Live-In Homestay 2 Hari 1 Malam
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  Live-In Homestay & Budaya Pesisir Mayong Lor
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menginap di rumah pengrajin pedesaan khas arsitektur Jawa Jepara, makan masakan tradisional pesisir 3x sehari, dan jelajah sentra produksi kriya terakota.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="font-extrabold text-[#0F5132] text-sm">Rp 220.000 / Orang / Malam</span>
                <button
                  onClick={() => alert('Menghubungi koordinator wisata Mayong Lor di 0812-2890-8424.')}
                  className="px-4 py-2 rounded-xl bg-[#0F5132] text-white font-bold text-xs"
                >
                  Reservasi Homestay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {selectedProductForOrder && (
          <B2BOrderModal
            product={selectedProductForOrder}
            onClose={() => setSelectedProductForOrder(null)}
          />
        )}

        {selectedProductForDetail && (
          <ProductDetailModal
            product={selectedProductForDetail}
            onClose={() => setSelectedProductForDetail(null)}
            onOrderNow={(p) => {
              setSelectedProductForDetail(null);
              setSelectedProductForOrder(p);
            }}
          />
        )}
      </div>
    </div>
  );
};
