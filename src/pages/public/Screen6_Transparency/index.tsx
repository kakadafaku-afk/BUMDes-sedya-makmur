import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { mockTransparencySnapshot, mockFinancialReports, mockRecentCashMutations } from '../../../services/mockData/financeData';
import { formatRupiah, formatDate } from '../../../utils/formatters';

export const Screen6_Transparency: React.FC = () => {
  const [complaintName, setComplaintName] = useState('');
  const [complaintPhone, setComplaintPhone] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('aduan_keuangan');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const handleSubmitAspiration = (e: React.FormEvent) => {
    e.preventDefault();
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintTitle('');
      setComplaintDesc('');
      setComplaintName('');
      setComplaintPhone('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0F5132] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
            <span>Keterbukaan Informasi Publik (SCREEN_6)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparansi Keuangan & Laporan Kas Desa
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Sesuai amanat Permendesa PDTT No. 3/2021 dan PP No. 11/2021, seluruh perputaran anggaran, laba usaha, dan kontribusi dividen PADes disajikan secara terbuka untuk diawasi bersama oleh warga.
          </p>
        </div>

        {/* Realisasi PADes & APBDes Banner */}
        <div className="bg-[#0F5132] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
            <div>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                Tahun Anggaran {mockTransparencySnapshot.tahun_anggaran}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Realisasi Kontribusi PADes Mayong Lor
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-200">Saldo Giro Terverifikasi Bank Jateng:</span>
              <p className="text-xl font-extrabold text-amber-300 font-mono">
                {formatRupiah(mockTransparencySnapshot.saldo_giro_kas)}
              </p>
            </div>
          </div>

          {/* Progress Bar Detail */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-emerald-200">
                Pencapaian: {formatRupiah(mockTransparencySnapshot.realisasi_pades)} dari Target {formatRupiah(mockTransparencySnapshot.target_pades)}
              </span>
              <span className="font-bold text-white bg-emerald-800 px-2.5 py-0.5 rounded-full text-xs">
                {mockTransparencySnapshot.persentase_capaian}% Tercapai
              </span>
            </div>
            <div className="w-full h-3 bg-emerald-950/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full"
                style={{ width: `${mockTransparencySnapshot.persentase_capaian}%` }}
              />
            </div>
          </div>

          {/* Alokasi Anggaran */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-emerald-300 block text-[11px]">Belanja Modal Produksi</span>
              <span className="text-base font-bold text-white">
                {formatRupiah(mockTransparencySnapshot.alokasi_belanja_modal)}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-emerald-300 block text-[11px]">Dividen Kemakmuran Warga</span>
              <span className="text-base font-bold text-white">
                {formatRupiah(mockTransparencySnapshot.alokasi_dividen_warga)}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-emerald-300 block text-[11px]">Pagu Anggaran APBDes</span>
              <span className="text-base font-bold text-white">
                {formatRupiah(mockTransparencySnapshot.target_apbdes)}
              </span>
            </div>
          </div>
        </div>

        {/* Arsip Berkas Laporan Publik & Audit BPD */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5132] flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Unduhan Berkas Pertanggungjawaban Resmi (PDF)
              </h3>
              <p className="text-xs text-slate-500">
                Arsip audit pengawas BPD, laporan triwulanan, dan neraca laba rugi.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {mockFinancialReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F5132] bg-emerald-100 px-2 py-0.5 rounded">
                      {report.report_type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">
                      Terbit: {formatDate(report.published_at)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {report.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {report.summary}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Mengunduh berkas resmi: ${report.title} (.PDF)`)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#0F5132]" />
                  <span>Unduh PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mutasi Kas Terkini */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Catatan Mutasi Kas Masuk & Keluar Terkini
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan real-time dari 4 unit usaha yang telah diverifikasi bendahara
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">No. Transaksi</th>
                  <th className="py-3 px-4 font-bold">Tanggal</th>
                  <th className="py-3 px-4 font-bold">Unit Usaha</th>
                  <th className="py-3 px-4 font-bold">Kategori & Keterangan</th>
                  <th className="py-3 px-4 font-bold text-right">Nominal</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockRecentCashMutations.map((mut) => (
                  <tr key={mut.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{mut.transaction_no}</td>
                    <td className="py-3 px-4 text-slate-500">{mut.transaction_date}</td>
                    <td className="py-3 px-4 font-semibold text-[#0F5132]">{mut.unit_code}</td>
                    <td className="py-3 px-4 text-slate-700">{mut.description}</td>
                    <td className={`py-3 px-4 text-right font-bold ${mut.transaction_type === 'IN' ? 'text-emerald-700' : 'text-red-600'}`}>
                      {mut.transaction_type === 'IN' ? '+' : '-'} {formatRupiah(mut.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Terverifikasi
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kanal Aspirasi & Whistleblowing */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200 uppercase tracking-wider">
              Kanal Pengaduan Warga
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Formulir Aspirasi & Pengaduan Keuangan Desa
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Warga dapat menyampaikan masukan, laporan dugaan pungutan liar, kebocoran pipa air, atau saran perbaikan layanan. Identitas pelapor dapat dirahasiakan (anonim).
            </p>
          </div>

          <form onSubmit={handleSubmitAspiration} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Pelapor (Opsional / Boleh Dikosongkan)</label>
              <input
                type="text"
                value={complaintName}
                onChange={(e) => setComplaintName(e.target.value)}
                placeholder="Anonim / Nama Anda"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Kontak / WhatsApp (Untuk Konfirmasi Jawaban)</label>
              <input
                type="tel"
                value={complaintPhone}
                onChange={(e) => setComplaintPhone(e.target.value)}
                placeholder="08xxxxxxxx"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Kategori Laporan *</label>
              <select
                value={complaintCategory}
                onChange={(e) => setComplaintCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              >
                <option value="aduan_keuangan">Laporan Keuangan & Akuntabilitas Kas</option>
                <option value="layanan_pam">Kendala Teknis / Kebocoran Air PAMSIMAS</option>
                <option value="saran_produk">Saran Kriya Gerabah & Desa Wisata</option>
                <option value="pungli_fraud">Dugaan Pelanggaran & Pungutan Tidak Resmi</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Judul Laporan *</label>
              <input
                type="text"
                value={complaintTitle}
                onChange={(e) => setComplaintTitle(e.target.value)}
                placeholder="Contoh: Laporan pipa bocor di RT 03 Dusun Krajan"
                required
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Uraian Detail Laporan *</label>
              <textarea
                rows={4}
                value={complaintDesc}
                onChange={(e) => setComplaintDesc(e.target.value)}
                placeholder="Jelaskan secara runtut kronologi atau aspirasi Anda..."
                required
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
              />
            </div>
            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#0b3e26] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirimkan Aduan Secara Aman</span>
              </button>
            </div>
            {complaintSubmitted && (
              <div className="sm:col-span-2 p-3 rounded-xl bg-emerald-100 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Laporan pengaduan telah diterima sistem dan dicatat dengan nomor tiket rahasia.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
