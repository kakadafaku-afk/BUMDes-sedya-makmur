export interface LaporanTahunanItem {
  tahun: number;
  status: string;
  unit_usaha: Array<{ nama: string; pendapatan: number }>;
  totalPendapatan: number;
  pengeluaran: number;
  labaBersih: number;
  setoranPadRealisasi: number;
  keterangan: string;
}

export declare const DATA_TRANSPARANSI_TAHUNAN: LaporanTahunanItem[];
declare const Transparansi: React.FC;
export default Transparansi;

