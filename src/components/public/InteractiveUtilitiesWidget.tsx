import React, { useState } from 'react';
import { 
  Droplets, 
  Coins, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { api } from '../../services/api';
import type { PamsimasBill } from '../../types/pamsimas';
import { formatRupiah, formatNumber } from '../../utils/formatters';

interface InteractiveUtilitiesWidgetProps {
  initialTab?: 'pam' | 'usp';
}

export const InteractiveUtilitiesWidget: React.FC<InteractiveUtilitiesWidgetProps> = ({
  initialTab = 'pam',
}) => {
  const [activeTab, setActiveTab] = useState<'pam' | 'usp'>(initialTab);

  // State untuk PAMSIMAS
  const [customerNo, setCustomerNo] = useState<string>('PAM-ML-00142');
  const [pamLoading, setPamLoading] = useState<boolean>(false);
  const [pamBill, setPamBill] = useState<PamsimasBill | null>(null);
  const [pamSearched, setPamSearched] = useState<boolean>(false);
  const [pamPaidSuccess, setPamPaidSuccess] = useState<boolean>(false);

  // State untuk USP Syariah Simulator
  const [uspNominal, setUspNominal] = useState<number>(10000000);
  const [uspTenor, setUspTenor] = useState<number>(12);

  // Handle Check PAM
  const handleCheckPam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerNo.trim()) return;
    setPamLoading(true);
    setPamSearched(true);
    setPamPaidSuccess(false);

    try {
      const result = await api.checkPamsimasBill(customerNo);
      setPamBill(result);
    } catch (err) {
      console.error(err);
      setPamBill(null);
    } finally {
      setPamLoading(false);
    }
  };

  // Handle Simulasi Bayar PAM
  const handlePayPam = () => {
    if (!pamBill) return;
    setPamPaidSuccess(true);
    setPamBill({
      ...pamBill,
      payment_status: 'paid',
      paid_at: new Date().toISOString(),
      receipt_no: `KWI-PAM-${Math.floor(100000 + Math.random() * 900000)}`,
      payment_method: 'qris_desa',
    });
  };

  // Hitung simulasi USP
  const uspResult = api.simulateUspFinancing(uspNominal, uspTenor);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
        {/* Tab Header Selector */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('pam')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'pam'
                  ? 'bg-[#0F5132] text-white shadow-md shadow-emerald-950/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Cek Tagihan Air PAMSIMAS</span>
            </button>

            <button
              onClick={() => setActiveTab('usp')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'usp'
                  ? 'bg-[#0F5132] text-white shadow-md shadow-emerald-950/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Simulasi Modal USP Syariah</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Terintegrasi Langsung ke Sistem Kas SIMBUMDes</span>
          </div>
        </div>

        {/* Tab 1: PAMSIMAS Check Bill */}
        {activeTab === 'pam' && (
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Layanan Air Bersih 840+ KK
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
                    Cek & Bayar Tagihan Rekening PAMSIMAS
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Masukkan nomor ID Pelanggan Anda (tertera pada kartu meteran air atau tanda terima bulan lalu).
                  </p>
                </div>

                <form onSubmit={handleCheckPam} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor ID Pelanggan PAMSIMAS
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customerNo}
                        onChange={(e) => setCustomerNo(e.target.value)}
                        placeholder="Contoh: PAM-ML-00142"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm uppercase font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132] focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={pamLoading}
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-[#0F5132] hover:bg-[#0b3e26] text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        {pamLoading ? (
                          <span>Memeriksa...</span>
                        ) : (
                          <>
                            <Search className="w-3.5 h-3.5" />
                            <span>Cek Tagihan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sample ID buttons */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span>Coba ID Sampel:</span>
                    <button
                      type="button"
                      onClick={() => setCustomerNo('PAM-ML-00142')}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono font-medium text-slate-700"
                    >
                      PAM-ML-00142 (Belum Lunas)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerNo('PAM-ML-00085')}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono font-medium text-slate-700"
                    >
                      PAM-ML-00085 (Lunas)
                    </button>
                  </div>
                </form>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Informasi Tarif & Denda Keterlambatan</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Batas pembayaran maksimal tanggal 20 setiap bulan berjalan. Pembayaran dapat dilakukan via QRIS Desa, Bank Jateng, atau Loket Kantor BUMDes.
                  </p>
                </div>
              </div>

              {/* Bill Result View */}
              <div className="lg:col-span-7">
                {pamSearched && pamBill ? (
                  <div className="bg-slate-50/80 rounded-2xl border-2 border-slate-200 p-6 space-y-5">
                    {/* Bill Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          No. Tagihan: {pamBill.bill_number}
                        </span>
                        <h4 className="text-lg font-extrabold text-slate-900">
                          {pamBill.nama_kk}
                        </h4>
                        <span className="font-mono text-xs text-slate-500 font-semibold">
                          ID: {pamBill.customer_no}
                        </span>
                      </div>

                      <div>
                        {pamBill.payment_status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            LUNAS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            BELUM LUNAS
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Breakdown Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Periode</span>
                        <span className="font-bold text-slate-800">
                          Bulan {pamBill.period_month} / {pamBill.period_year}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Pemakaian Air</span>
                        <span className="font-bold text-blue-700">{pamBill.volume_m3} m³</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Biaya Pemeliharaan</span>
                        <span className="font-bold text-slate-800">
                          {formatRupiah(pamBill.maintenance_fee)}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Jatuh Tempo</span>
                        <span className="font-bold text-red-600">{pamBill.due_date}</span>
                      </div>
                    </div>

                    {/* Total Amount Card */}
                    <div className="p-4 rounded-xl bg-white border-2 border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-slate-500 block">Total Tagihan Yang Harus Dibayar:</span>
                        <span className="text-2xl font-extrabold text-[#0F5132]">
                          {formatRupiah(pamBill.total_bill)}
                        </span>
                      </div>

                      {pamBill.payment_status === 'unpaid' && (
                        <button
                          onClick={handlePayPam}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-950/20 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>Simulasi Bayar QRIS Desa</span>
                        </button>
                      )}

                      {pamBill.payment_status === 'paid' && (
                        <div className="text-right">
                          <span className="text-[11px] text-emerald-700 font-semibold block">
                            Dibayar via {pamBill.payment_method?.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-slate-600">
                            {pamBill.receipt_no}
                          </span>
                        </div>
                      )}
                    </div>

                    {pamPaidSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>
                          Pembayaran berhasil diverifikasi secara instan! Mutasi kas telah dicatat otomatis pada pembukuan BUMDes.
                        </span>
                      </div>
                    )}
                  </div>
                ) : pamSearched && !pamBill ? (
                  <div className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                    <AlertCircle className="w-8 h-8 text-amber-500" />
                    <p className="text-xs font-semibold text-slate-700">
                      Nomor Pelanggan "{customerNo}" Tidak Ditemukan
                    </p>
                    <p className="text-[11px] max-w-sm">
                      Pastikan format ID sesuai (contoh: PAM-ML-00142). Hubungi kantor pengelola PAMSIMAS jika ada kendala data pelanggan.
                    </p>
                  </div>
                ) : (
                  <div className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                    <Droplets className="w-10 h-10 text-blue-300" />
                    <p className="text-xs font-semibold text-slate-700">
                      Silakan Masukkan Nomor Pelanggan di Sebelah Kiri
                    </p>
                    <p className="text-[11px] max-w-sm">
                      Hasil pembacaan meter, tagihan bulanan, dan opsi bayar QRIS Desa akan muncul seketika di sini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: USP Syariah Calculator */}
        {activeTab === 'usp' && (
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Slider Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    USP Mekar Syariah - Tanpa Riba
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
                    Kalkulator Simulasi Pembiayaan Modal Kerja
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Skema Mudharabah & Murabahah untuk pedagang pasar Mayong, pengrajin gerabah, dan pelaku UMKM desa.
                  </p>
                </div>

                {/* Nominal Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Plafon Pengajuan Modal:
                    </label>
                    <span className="text-xl font-extrabold text-[#0F5132]">
                      {formatRupiah(uspNominal)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={25000000}
                    step={500000}
                    value={uspNominal}
                    onChange={(e) => setUspNominal(Number(e.target.value))}
                    className="w-full accent-[#0F5132] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Rp 1.000.000</span>
                    <span>Rp 12.500.000</span>
                    <span>Rp 25.000.000</span>
                  </div>
                </div>

                {/* Tenor Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Jangka Waktu Pengembalian (Tenor):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {[3, 6, 9, 12, 24].map((tenor) => (
                      <button
                        key={tenor}
                        type="button"
                        onClick={() => setUspTenor(tenor)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          uspTenor === tenor
                            ? 'bg-[#0F5132] text-white border-[#0F5132] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {tenor} Bulan
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prinsip Syariah Guarantee */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-[#0F5132]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Prinsip Syariah Terverifikasi:
                  </span>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Tanpa denda bunga berbunga (*riba*), tanpa biaya tersembunyi, dan pendampingan pengelolaan arus kas usaha oleh pengurus BUMDes.
                  </p>
                </div>
              </div>

              {/* Simulation Result Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Hasil Simulasi Akad
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 font-semibold">
                      Mudharabah / Murabahah
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>Estimasi Angsuran Pokok:</span>
                      <span className="font-semibold text-white">
                        {formatRupiah(Math.round(uspResult.nominal / uspResult.tenor_months))}/bln
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>Estimasi Margin / Bagi Hasil:</span>
                      <span className="font-semibold text-amber-300">
                        {formatRupiah(uspResult.estimasi_margin_bulanan)}/bln
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300">
                        Total Angsuran Per Bulan:
                      </span>
                      <span className="text-2xl font-extrabold text-white">
                        {formatRupiah(uspResult.total_angsuran_bulanan)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 space-y-1">
                    <p>• Total Pengembalian: {formatRupiah(uspResult.total_pengembalian)}</p>
                    <p>• Tenor: {uspResult.tenor_months} Bulan</p>
                  </div>

                  <button
                    onClick={() => alert(`Pengajuan formulir simulasi modal Rp ${formatNumber(uspNominal)} (Tenor ${uspTenor} Bulan) telah dibuka. Silakan hubungi Sekretariat USP BUMDes Mayong Lor di 0812-2890-8423.`)}
                    className="w-full py-3 rounded-xl bg-[#C85A32] hover:bg-[#a74524] text-white font-bold text-xs shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Ajukan Formulir Pembiayaan Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
