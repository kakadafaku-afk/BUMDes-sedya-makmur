import React from 'react';
import { 
  Landmark, 
  FileCheck2, 
  Download, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import type { TransparencySnapshot } from '../../types/finance';
import { formatRupiah } from '../../utils/formatters';

interface TransparencySnapshotSectionProps {
  snapshot: TransparencySnapshot;
  onViewAllReports: () => void;
}

export const TransparencySnapshotSection: React.FC<TransparencySnapshotSectionProps> = ({
  snapshot,
  onViewAllReports,
}) => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-[#0F5132] to-[#092e1c] rounded-3xl text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
          <Landmark className="w-96 h-96" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Progress & Realization */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Transparansi Kas & Akuntabilitas Publik Desa</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Capaian Kontribusi PADes Tahun Anggaran {snapshot.tahun_anggaran}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl">
                BUMDes Mayong Lor mengelola seluruh perputaran kas 4 unit usaha secara terbuka. Setiap rupiah laba dialokasikan untuk penambahan Pendapatan Asli Desa (PADes), dividen warga, dan peremajaan infrastruktur air bersih.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-emerald-200 font-semibold">
                  Realisasi Setoran PADes:
                </span>
                <span className="text-amber-300 font-extrabold text-base">
                  {formatRupiah(snapshot.realisasi_pades)}
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-1000 shadow-xs"
                  style={{ width: `${Math.min(snapshot.persentase_capaian, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-emerald-200/90 font-medium">
                <span>Target Pagu Tahunan: {formatRupiah(snapshot.target_pades)}</span>
                <span className="font-bold text-white bg-emerald-700/80 px-2 py-0.5 rounded">
                  {snapshot.persentase_capaian}% Tercapai
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-emerald-300/80 text-[11px] block">Saldo Giro Bank Jateng</span>
                <span className="text-sm font-bold text-white">
                  {formatRupiah(snapshot.saldo_giro_kas)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-emerald-300/80 text-[11px] block">Belanja Modal Unit</span>
                <span className="text-sm font-bold text-white">
                  {formatRupiah(snapshot.alokasi_belanja_modal)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-emerald-300/80 text-[11px] block">Alokasi Dividen Warga</span>
                <span className="text-sm font-bold text-white">
                  {formatRupiah(snapshot.alokasi_dividen_warga)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Audit Badge & PDF Downloads */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-300 shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Audit Akuntabilitas Resmi BPD
                  </h4>
                  <p className="text-[11px] text-emerald-200">
                    Opini WTP (Wajar Tanpa Pengecualian)
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Warga dan mitra usaha berhak memeriksa neraca keuangan tahunan, laporan laba rugi, dan bukti transfer setoran ke kas desa.
              </p>

              {/* Download Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href="#unduh-laporan-q3-2026"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Mengunduh Berkas PDF: Laporan Realisasi Anggaran BUMDes Triwulan III 2026.');
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Laporan Realisasi Triwulan III 2026 (.PDF)</span>
                  </span>
                  <span className="text-[10px] text-emerald-200">2.4 MB</span>
                </a>

                <a
                  href="#unduh-audit-bpd-2025"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Mengunduh Berkas PDF: Laporan Hasil Pemeriksaan Pengawas BPD 2025.');
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Laporan Audit BPD & Neraca 2025 (.PDF)</span>
                  </span>
                  <span className="text-[10px] text-emerald-200">3.8 MB</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onViewAllReports}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Buka Portal Transparansi Lengkap (SCREEN_6)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
