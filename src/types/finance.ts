export type CashTransactionType = 'IN' | 'OUT';

export type CashCategory =
  | 'penjualan_gerabah_b2b'
  | 'retribusi_pamsimas'
  | 'angsuran_usp_syariah'
  | 'tiket_eduwisata'
  | 'belanja_modal_produksi'
  | 'pemeliharaan_pipa_pam'
  | 'gaji_operasional'
  | 'setoran_pades'
  | 'dividen_desa_apbdes';

export interface CashMutation {
  id: number;
  transaction_no: string;
  transaction_date: string;
  unit_code?: string;
  transaction_type: CashTransactionType;
  account_code: string;
  category: CashCategory;
  amount: number;
  running_balance: number;
  description: string;
  proof_document_url?: string;
  created_by_name: string;
  verified: boolean;
}

export interface TransparencySnapshot {
  tahun_anggaran: number;
  target_pades: number;
  realisasi_pades: number;
  target_apbdes: number;
  persentase_capaian: number;
  saldo_giro_kas: number;
  alokasi_belanja_modal: number;
  alokasi_dividen_warga: number;
}

export interface FinancialReportPublic {
  id: number;
  fiscal_year: number;
  report_period: 'q1' | 'q2' | 'q3' | 'q4' | 'annual';
  report_type: 'neraca' | 'laba_rugi' | 'realisasi_apbdes' | 'audit_bpd';
  title: string;
  summary: string;
  total_pendapatan: number;
  total_belanja: number;
  surplus_defisit: number;
  file_pdf_url: string;
  published_at: string;
}

