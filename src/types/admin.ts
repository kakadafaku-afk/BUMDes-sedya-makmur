export type UserRole =
  | 'superadmin'
  | 'direktur_bumdes'
  | 'kepala_desa'
  | 'pengawas_bpd'
  | 'manajer_pamsimas'
  | 'manajer_kriya'
  | 'manajer_usp'
  | 'manajer_wisata'
  | 'staf_operasional'
  | 'warga';

export interface UserSession {
  id: number;
  nik: string;
  nama_lengkap: string;
  email: string;
  role: UserRole;
  unit_id?: number | null;
  sso_verified: boolean;
  avatar_url?: string;
}

export interface KPIDashboard {
  pendapatan_bulan_ini: number;
  pertumbuhan_mom: number;
  saldo_giro_bank_jateng: number;
  pesanan_b2b_aktif: number;
  pelanggan_pamsimas_aktif: number;
  tingkat_kepatuhan_pam: number;
  capaian_pades_persen: number;
  target_pades_tahunan: number;
}

export interface RevenueMonthlyTrend {
  month: string;
  pamsimas: number;
  kriya_gerabah: number;
  usp_syariah: number;
  desa_wisata: number;
  total: number;
}

export interface UrgentVerificationItem {
  id: string;
  type: 'PO_B2B_GERABAH' | 'PENCAIRAN_USP' | 'SAMBUNGAN_PAM';
  title: string;
  requester: string;
  amount: number;
  date: string;
  status: string;
  urgency: 'high' | 'medium' | 'low';
}

