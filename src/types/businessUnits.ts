export type BusinessUnitCode = 'PAMSIMAS' | 'USP_SYARIAH' | 'KRIYA_GERABAH' | 'DESA_WISATA';

export interface BusinessUnit {
  id: number;
  code: BusinessUnitCode;
  name: string;
  tagline: string;
  description: string;
  manager_id?: number | null;
  manager_name?: string;
  operational_status: 'active' | 'maintenance' | 'suspended';
  icon_name: string;
  cover_image_url?: string;
  contact_phone: string;
  stat_highlight: string;
}

export interface BumdesProfile {
  nama_bumdes: string;
  no_badan_hukum_kemendes: string;
  sk_pendirian_desa: string;
  tagline: string;
  visi: string;
  misi: string[];
  sejarah_singkat: string;
  alamat_lengkap: string;
  email_resmi: string;
  no_wa_pelayanan: string;
  rekening_giro_bank_jateng: string;
  nama_rekening: string;
  saldo_giro_terkini: number;
}

export interface OrganizationStructure {
  id: number;
  name: string;
  position_title: string;
  category: 'penasihat' | 'pengawas_bpd' | 'direksi' | 'manajer_unit';
  photo_url: string;
  order_index: number;
  is_active: boolean;
}

