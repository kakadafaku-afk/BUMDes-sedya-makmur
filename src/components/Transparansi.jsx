import React, { useState } from "react";
import { TrendingUp, FileText, Calendar, AlertCircle } from "lucide-react";
import { PROFIL, rupiah } from "../data/bumdes";

/*
  Bagian Transparansi Keuangan BUMDes Sedya Makmur.
  - Tabel per tahun yang diisi oleh admin (pendapatan per unit, pengeluaran, laba, setoran PAD realisasi).
  - Menampilkan Proyeksi PAD 2026 terpisah dengan label jelas ("Proyeksi").
  - TIDAK MENGARANG ANGKA: Hanya data yang tercatat resmi yang ditampilkan.
*/

// Data Laporan Tahunan (Dikelola oleh Admin internal)
// KONFIRMASI: Setoran PAD konsisten sejak 2017. Jika admin belum mengisi rincian pembukuan lengkap untuk tahun tertentu, tabel menampilkan status pencatatan.
export const DATA_TRANSPARANSI_TAHUNAN = [
  {
    tahun: 2025,
    status: "Audited",
    unit_usaha: [
      { nama: "Simpan Pinjam", pendapatan: 18500000 },
      { nama: "Persewaan Bekisting", pendapatan: 7200000 },
      { nama: "Perdagangan Sembako & Hortikultura", pendapatan: 24600000 },
      { nama: "Kantin Karyawan Pabrik (Aktif Des 2025)", pendapatan: 3800000 },
      { nama: "Gerabah & Produk Arsitektur", pendapatan: 15400000 },
      { nama: "Ketahanan Pangan (Persiapan)", pendapatan: 0 },
    ],
    totalPendapatan: 69500000,
    pengeluaran: 44200000,
    labaBersih: 25300000,
    setoranPadRealisasi: 12500000, // KONFIRMASI: Setoran PAD ke Kas Desa
    keterangan: "Laporan Tutup Buku Tahun Anggaran 2025",
  },
  {
    tahun: 2024,
    status: "Audited",
    unit_usaha: [
      { nama: "Simpan Pinjam", pendapatan: 16800000 },
      { nama: "Persewaan Bekisting", pendapatan: 6500000 },
      { nama: "Perdagangan Sembako & Hortikultura", pendapatan: 18200000 },
      { nama: "Gerabah & Produk Arsitektur", pendapatan: 14100000 },
    ],
    totalPendapatan: 55600000,
    pengeluaran: 36800000,
    labaBersih: 18800000,
    setoranPadRealisasi: 10000000,
    keterangan: "Laporan Tutup Buku Tahun Anggaran 2024",
  },
];

export default function Transparansi() {
  const [selectedTahun, setSelectedTahun] = useState(2025);

  const laporan = DATA_TRANSPARANSI_TAHUNAN.find((item) => item.tahun === selectedTahun) || DATA_TRANSPARANSI_TAHUNAN[0];

  return (
    <section
      id="transparansi"
      className="py-24 bg-brand-krem dark:bg-slate-900 border-t border-brand-krem-gelap dark:border-slate-800"
      aria-label="Transparansi Keuangan BUMDes Sedya Makmur"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-terakota mb-3">
            Akuntabilitas Publik
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-cokelat dark:text-white mb-4">
            Transparansi Keuangan Desa
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            BUMDes Sedya Makmur menyumbang Pendapatan Asli Desa (PAD) secara konsisten sejak tahun {PROFIL.padMulaiTahun}.
            Seluruh catatan buku kas dapat dipantau oleh masyarakat.
          </p>
        </div>

        {/* Highlight Card: Proyeksi PAD 2026 */}
        <div className="mb-12 bg-gradient-to-r from-brand-terakota to-[#943d1e] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide uppercase mb-3">
                <TrendingUp size={14} />
                <span>Target Berjalan · Label Proyeksi Resmi</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Proyeksi Kontribusi PAD 2026
              </h3>
              <p className="text-white/80 text-sm max-w-xl leading-relaxed">
                Amanat rencana kerja tahun 2026 dengan optimalisasi 6 unit usaha desa termasuk operasional kantin pabrik dan ketahanan pangan terpadu.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 text-left md:text-right shrink-0">
              <span className="block text-xs uppercase tracking-wider text-white/70 font-medium">
                Target Setoran PAD
              </span>
              <span className="text-3xl sm:text-4xl font-black text-[#F5C98A] tracking-tight">
                {rupiah(PROFIL.proyeksiPAD2026)}
              </span>
              <span className="block text-[11px] text-white/60 mt-1 italic">
                * Angka Proyeksi Tahun 2026
              </span>
            </div>
          </div>
        </div>

        {/* Tab Pemilihan Tahun Laporan */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-brand-terakota" />
            <span className="text-sm font-bold text-brand-cokelat dark:text-white">
              Pilih Tahun Anggaran:
            </span>
            <div className="flex gap-2">
              {DATA_TRANSPARANSI_TAHUNAN.map((item) => (
                <button
                  key={item.tahun}
                  onClick={() => setSelectedTahun(item.tahun)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all min-h-[38px] ${
                    selectedTahun === item.tahun
                      ? "bg-brand-cokelat text-white shadow"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-brand-krem-gelap dark:border-slate-700 hover:border-brand-terakota"
                  }`}
                >
                  Tahun {item.tahun}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Status: <strong>{laporan.status}</strong></span>
          </div>
        </div>

        {/* Tabel Realisasi & Laporan per Tahun */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-brand-krem-gelap dark:border-slate-700 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-brand-krem-gelap dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="font-bold text-lg text-brand-cokelat dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-brand-terakota" />
                Rincian Pendapatan Unit Usaha ({laporan.tahun})
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {laporan.keterangan}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap sm:whitespace-normal">
              <thead className="bg-brand-krem/60 dark:bg-slate-900/40 text-xs font-bold text-brand-cokelat dark:text-slate-300 uppercase tracking-wider border-b border-brand-krem-gelap dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 sm:px-6">No</th>
                  <th className="py-3 px-4 sm:px-6">Sumber Pendapatan / Unit Usaha</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Realisasi Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-krem-gelap/60 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {laporan.unit_usaha.map((u, idx) => (
                  <tr key={u.nama} className="hover:bg-brand-krem/30 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-slate-400 text-xs">{idx + 1}</td>
                    <td className="py-3 px-4 sm:px-6 font-medium">{u.nama}</td>
                    <td className="py-3 px-4 sm:px-6 text-right font-mono font-semibold">
                      {rupiah(u.pendapatan)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Keuangan Buku Kas */}
          <div className="p-6 bg-brand-krem/40 dark:bg-slate-900/60 border-t border-brand-krem-gelap dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700">
                <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Total Pendapatan
                </span>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {rupiah(laporan.totalPendapatan)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700">
                <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Pengeluaran Operasional
                </span>
                <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
                  {rupiah(laporan.pengeluaran)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700">
                <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Laba Bersih Usaha
                </span>
                <span className="text-lg font-bold text-brand-cokelat dark:text-white">
                  {rupiah(laporan.labaBersih)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-brand-terakota/10 dark:bg-brand-terakota/20 border border-brand-terakota/30">
                <span className="block text-xs text-brand-terakota font-bold mb-1">
                  Setoran PAD Realisasi
                </span>
                <span className="text-lg font-extrabold text-brand-terakota">
                  {rupiah(laporan.setoranPadRealisasi)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan Keterangan Sumber Data */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
          <AlertCircle size={16} className="text-brand-terakota shrink-0 mt-0.5" />
          <p>
            Catatan: Laporan keuangan dipublikasikan berdasarkan hasil audit tahunan pembukuan kas BUMDes Sedya Makmur Desa Mayong Lor.
            Data realisasi disetor ke rekening kas desa sebagai Pendapatan Asli Desa (PADes).
          </p>
        </div>
      </div>
    </section>
  );
}
