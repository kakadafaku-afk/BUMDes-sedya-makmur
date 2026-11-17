import type { UspFinancingApplication, UspSimulationResult } from '../../types/uspSyariah';

export function calculateUspSimulation(nominal: number, tenorMonths: number): UspSimulationResult {
  // Nisbah bagi hasil ekuivalen margin syariah flat 0.8% per bulan (sangat bersahabat untuk UMKM desa)
  const monthlyMarginRate = 0.008;
  const totalMargin = nominal * monthlyMarginRate * tenorMonths;
  const totalPengembalian = nominal + totalMargin;
  const totalAngsuranBulanan = Math.round(totalPengembalian / tenorMonths);

  return {
    nominal,
    tenor_months: tenorMonths,
    estimasi_margin_bulanan: Math.round(totalMargin / tenorMonths),
    total_angsuran_bulanan: totalAngsuranBulanan,
    total_pengembalian: totalPengembalian,
  };
}

export const mockUspApplications: UspFinancingApplication[] = [
  {
    id: 1,
    application_no: 'USP-APP-2026-042',
    member_id: 12,
    member_name: 'Bpk. Bambang Sugiarto',
    akad_type: 'mudharabah',
    nominal_pengajuan: 15000000,
    tenor_months: 12,
    tujuan_penggunaan: 'Pembelian 2 truk bahan baku tanah liat super & peremajaan tungku pembakaran gerabah sentra RT 03',
    kelayakan_score: 92,
    status: 'awaiting_director_approval',
    nisbah_bumdes_percent: 30,
    nisbah_nasabah_percent: 70,
    created_at: '2026-11-06',
  },
];

