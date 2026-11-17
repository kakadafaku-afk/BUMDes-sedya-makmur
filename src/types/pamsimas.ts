export type PamsimasTarifGroup =
  | 'rumah_tangga_1'
  | 'rumah_tangga_2'
  | 'niaga_umkm'
  | 'sosial_keagamaan';

export type PamsimasCustomerStatus = 'active' | 'isolated' | 'inactive';

export interface PamsimasCustomer {
  id: number;
  customer_no: string;
  no_meter: string;
  nik: string;
  nama_kk: string;
  no_kk: string;
  alamat_rt_rw: string;
  dusun: string;
  phone: string;
  tarif_group: PamsimasTarifGroup;
  status: PamsimasCustomerStatus;
  installation_date: string;
}

export interface PamsimasBill {
  id: number;
  bill_number: string;
  customer_id: number;
  customer_no: string;
  nama_kk: string;
  period_month: number;
  period_year: number;
  volume_m3: number;
  water_charge: number;
  maintenance_fee: number;
  admin_fee: number;
  penalty_fee: number;
  total_bill: number;
  due_date: string;
  payment_status: 'unpaid' | 'paid' | 'overdue';
  paid_at?: string;
  payment_method?: 'qris_desa' | 'bank_jateng_transfer' | 'tunai_loket';
  receipt_no?: string;
}

export interface PamsimasConnectionRequest {
  id: number;
  request_no: string;
  nik: string;
  nama_pemohon: string;
  alamat_lengkap: string;
  phone: string;
  status:
    | 'submitted'
    | 'survey_scheduled'
    | 'survey_approved'
    | 'payment_waiting'
    | 'installation_in_progress'
    | 'completed'
    | 'rejected';
  survey_notes?: string;
  installation_fee: number;
  created_at: string;
}

