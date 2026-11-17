export type AkadType = 'mudharabah' | 'murabahah' | 'qardhul_hasan';

export type UspApplicationStatus =
  | 'submitted'
  | 'field_survey'
  | 'awaiting_director_approval'
  | 'approved'
  | 'disbursed'
  | 'active_repayment'
  | 'settled'
  | 'rejected';

export interface UspMember {
  id: number;
  member_no: string;
  nik: string;
  nama: string;
  alamat_usaha: string;
  jenis_usaha: 'pedagang_pasar' | 'pengrajin_gerabah' | 'petani' | 'warung_kelontong' | 'industri_rumahan' | 'jasa';
  omset_bulanan: number;
  phone: string;
  status: 'active' | 'inactive';
}

export interface UspFinancingApplication {
  id: number;
  application_no: string;
  member_id: number;
  member_name: string;
  akad_type: AkadType;
  nominal_pengajuan: number;
  tenor_months: number;
  tujuan_penggunaan: string;
  kelayakan_score: number;
  status: UspApplicationStatus;
  nominal_disetujui?: number;
  nisbah_bumdes_percent: number;
  nisbah_nasabah_percent: number;
  created_at: string;
}

export interface UspSimulationResult {
  nominal: number;
  tenor_months: number;
  estimasi_margin_bulanan: number;
  total_angsuran_bulanan: number;
  total_pengembalian: number;
}

