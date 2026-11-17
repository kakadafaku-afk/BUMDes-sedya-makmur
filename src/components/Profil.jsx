import { ShieldCheck, Target, BookOpen, Users } from "lucide-react";
import { PROFIL, PENGURUS, rupiah } from "../data/bumdes";

/*
  Halaman Profil: visi, misi, dasar hukum pendirian, struktur pengurus.
  KONFIRMASI: Semua data hukum bersumber dari dokumen resmi BUMDes Sedya Makmur.
*/
function SectionLabel({ children }) {
  return (
    <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-terakota mb-3">
      {children}
    </span>
  );
}

export default function Profil() {
  return (
    <section
      id="profil"
      className="py-24 bg-brand-krem dark:bg-slate-900"
      aria-label="Profil BUMDes Sedya Makmur"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul Bagian */}
        <div className="text-center mb-16">
          <SectionLabel>Tentang Kami</SectionLabel>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-cokelat dark:text-white mb-4">
            Profil BUMDes Sedya Makmur
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Badan Usaha Milik Desa yang tumbuh dari potensi lokal Desa Mayong Lor untuk kesejahteraan bersama.
          </p>
        </div>

        {/* Grid Utama */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 mb-16">
          {/* Visi */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-brand-krem-gelap dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-terakota/15 flex items-center justify-center">
                <Target size={20} className="text-brand-terakota" />
              </div>
              <h3 className="text-lg font-bold text-brand-cokelat dark:text-white">Visi</h3>
            </div>
            {/* KONFIRMASI */}
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{PROFIL.visi}"
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-brand-krem-gelap dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-hijau/15 flex items-center justify-center">
                <BookOpen size={20} className="text-brand-hijau" />
              </div>
              <h3 className="text-lg font-bold text-brand-cokelat dark:text-white">Misi</h3>
            </div>
            <ol className="space-y-2.5">
              {/* KONFIRMASI */}
              {PROFIL.misi.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-terakota/15 text-brand-terakota
                    text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {m}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Dasar Pendirian */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-brand-krem-gelap dark:border-slate-700 shadow-sm mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-cokelat/10 flex items-center justify-center">
              <ShieldCheck size={20} className="text-brand-cokelat dark:text-brand-krem" />
            </div>
            <h3 className="text-lg font-bold text-brand-cokelat dark:text-white">Dasar Pendirian</h3>
          </div>

          {/* KONFIRMASI: semua data hukum di bawah ini dari dokumen resmi BUMDes */}
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Dasar Hukum", value: PROFIL.perdes },
              { label: "Akta Notaris", value: `${PROFIL.aktaNotaris}, ${PROFIL.nomorAkta}` },
              { label: "Tanggal Akta", value: PROFIL.tanggalAkta },
              { label: "Mulai Beroperasi", value: PROFIL.tanggalBeroperasi },
              { label: "Modal Awal", value: rupiah(PROFIL.modalAwal) + " (Simpan Pinjam)" },
              { label: "PAD Sejak Tahun", value: String(PROFIL.padMulaiTahun) },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  {label}
                </dt>
                <dd className="text-sm font-medium text-brand-cokelat dark:text-brand-krem">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Proyeksi PAD 2026 */}
        <div className="bg-brand-terakota/10 dark:bg-brand-terakota/20 rounded-2xl p-6 border border-brand-terakota/20 mb-12 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-terakota flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">📈</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-terakota mb-1">
              Proyeksi PAD 2026 {/* KONFIRMASI */}
            </p>
            {/* KONFIRMASI: Rp 30.000.000 */}
            <p className="text-2xl font-bold text-brand-cokelat dark:text-white">
              {rupiah(PROFIL.proyeksiPAD2026)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Target Pendapatan Asli Desa dari BUMDes — angka proyeksi, akan diperbarui setelah realisasi.
            </p>
          </div>
        </div>

        {/* Struktur Pengurus & Bagan Organisasi */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-hijau/15 flex items-center justify-center">
              <Users size={20} className="text-brand-hijau" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-brand-cokelat dark:text-white">
                Bagan Struktur Organisasi & Pengurus
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tata kelola akuntabel berlandaskan PP No. 11/2021 dan Peraturan Desa Mayong Lor No. 7/2014
              </p>
            </div>
          </div>

          {/* Bagan Hierarki Visual */}
          <div className="space-y-6">
            {/* Level 1: Pembina & Pengawas */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-brand-terakota/40 dark:border-slate-700">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-terakota block mb-1">
                  Penasihat (Ex-Officio)
                </span>
                <p className="font-extrabold text-sm text-brand-cokelat dark:text-white">
                  Kepala Desa Mayong Lor
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Fungsi Pembinaan & Pengayoman Kebijakan Desa</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-brand-hijau/40 dark:border-slate-700">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-hijau block mb-1">
                  Badan Pengawas
                </span>
                <p className="font-extrabold text-sm text-brand-cokelat dark:text-white">
                  Ketua BPD Desa Mayong Lor
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Fungsi Audit Kepatuhan & Pengawasan Kinerja</p>
              </div>
            </div>

            {/* Garis Penghubung Tengah */}
            <div className="w-0.5 h-6 bg-brand-terakota/40 mx-auto" />

            {/* Level 2: Direktur Utama */}
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-terakota to-[#943d1e] text-white shadow-xl text-center relative overflow-hidden border border-white/20">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider mb-2">
                  Direktur Utama Operasional (KONFIRMASI)
                </span>
                <h4 className="text-xl font-black">{PROFIL.visi ? "Mulyono" : "Mulyono"}</h4>
                <p className="text-xs text-white/80 mt-1">Penanggung Jawab Eksekutif 6 Unit Usaha BUMDes</p>
              </div>
            </div>

            {/* Garis Penghubung Tengah */}
            <div className="w-0.5 h-6 bg-brand-terakota/40 mx-auto" />

            {/* Level 3: Sekretaris & Bendahara */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700 text-center">
                <span className="text-[10px] font-bold uppercase text-brand-terakota block">Sekretaris</span>
                <p className="font-bold text-sm text-brand-cokelat dark:text-white mt-0.5">GANTI</p>
                <span className="text-[11px] text-slate-400">Tata Administrasi & Arsip</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700 text-center">
                <span className="text-[10px] font-bold uppercase text-brand-terakota block">Bendahara</span>
                <p className="font-bold text-sm text-brand-cokelat dark:text-white mt-0.5">GANTI</p>
                <span className="text-[11px] text-slate-400">Tata Usaha Kas & Pembukuan</span>
              </div>
            </div>

            {/* Level 4: 6 Manajer Unit Usaha */}
            <div className="pt-4 border-t border-brand-krem-gelap dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center mb-4">
                Pelaksana Teknis 6 Unit Usaha
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                {[
                  { unit: "Simpan Pinjam", pj: "Pengelola Unit SP" },
                  { unit: "Bekisting", pj: "Koordinator Alat" },
                  { unit: "SPPG / MBG", pj: "Supplier Pangan" },
                  { unit: "Kantin PT TBS", pj: "Mitra Jatrasmol" },
                  { unit: "Gerabah & Kriya", pj: "Sentra Perajin" },
                  { unit: "Ketahanan Pangan", pj: "Kelompok Ternak & NFT" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-brand-krem/30 dark:bg-slate-800/60 border border-brand-krem-gelap dark:border-slate-700">
                    <span className="block font-bold text-xs text-brand-cokelat dark:text-white line-clamp-1">{item.unit}</span>
                    <span className="text-[10px] text-brand-terakota block mt-1">{item.pj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 text-center">
            * Nama-nama yang ditandai "GANTI" akan diperbarui saat penetapan Surat Keputusan (SK) resmi pengurus lengkap disahkan.
          </p>
        </div>
      </div>
    </section>
  );
}

