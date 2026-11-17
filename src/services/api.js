import { mockBumdesProfile, mockBusinessUnits } from './mockData/businessUnitsData';
import { mockPotteryCategories, mockPotteryProducts } from './mockData/catalogData';
import { mockTransparencySnapshot, mockRecentCashMutations } from './mockData/financeData';
import { mockNewsArticles, mockVillageEvents } from './mockData/newsEventsData';
import { PRODUK, PAKET_WISATA, UNIT, WARTA, PENGURUS } from '../data/bumdes';

/*
  Lapisan penghubung ke backend BUMDes Sedya Makmur.
  - Isi VITE_API_URL di file .env (mis. VITE_API_URL=http://localhost:5000)
  - Tanpa VITE_API_URL, fungsi di bawah memakai data SIMULASI internal yang aman.
  - Alamat endpoint (/api/...) disesuaikan dengan skema API BUMDes Sedya Makmur.

  CATATAN: Fitur Cek Tagihan PAMSIMAS dihapus dari portal publik.
  Referensi PAMSIMAS di object `api` dipertahankan hanya jika
  admin dashboard masih membutuhkannya (tidak dihapus dari TSX).
*/
const BASE = import.meta.env.VITE_API_URL || "";
export const hasApi = Boolean(BASE);

const tunggu = (ms) => new Promise((r) => setTimeout(r, ms));

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Permintaan gagal (${res.status})`);
  return res.json();
}

// ── Kirim Pesan Kontak / Aspirasi Warga ─────────────────────
export async function kirimPesan(data) {
  if (!hasApi) {
    await tunggu(500);
    return { success: true, message: "Pesan Anda telah diterima oleh pengurus BUMDes." };
  }
  return req("/api/v1/public/aspirations", {
    method: "POST",
    body: JSON.stringify({
      reporter_name: data.nama,
      phone: data.kontak,
      description: data.pesan,
      category: "aspirasi_umum",
      title: "Pesan Kontak Web",
    }),
  });
}

// ── Data Publik (mock / backend) ─────────────────────────────
export async function getProduk(kategori = "Semua") {
  if (!hasApi) {
    await tunggu(100);
    if (kategori === "Semua") return PRODUK;
    return PRODUK.filter((p) => p.kat === kategori);
  }
  const q = kategori !== "Semua" ? `?kategori=${encodeURIComponent(kategori)}` : "";
  return req(`/api/v1/public/produk${q}`);
}

export async function getPaketWisata() {
  if (!hasApi) {
    await tunggu(100);
    return PAKET_WISATA;
  }
  return req("/api/v1/public/paket-wisata");
}

export async function getUnitUsaha() {
  if (!hasApi) {
    await tunggu(100);
    return UNIT;
  }
  return req("/api/v1/public/unit-usaha");
}

export async function getWarta(kategori = "Semua") {
  if (!hasApi) {
    await tunggu(100);
    if (kategori === "Semua") return WARTA;
    return WARTA.filter((w) => w.k === kategori);
  }
  const q = kategori !== "Semua" ? `?kategori=${encodeURIComponent(kategori)}` : "";
  return req(`/api/v1/public/warta${q}`);
}

export async function getLaporanKeuangan(tahun) {
  if (!hasApi) {
    await tunggu(100);
    // Kembalikan template kosong — admin belum mengisi data
    return null;
  }
  const q = tahun ? `?tahun=${tahun}` : "";
  return req(`/api/v1/public/laporan-keuangan${q}`);
}

export async function getPengurus() {
  if (!hasApi) {
    await tunggu(100);
    return PENGURUS;
  }
  return req("/api/v1/public/pengurus");
}

// ── Object `api` — kompatibilitas dengan Admin Dashboard TSX ─
// JANGAN hapus bagian ini; Screen2_AdminDashboard masih menggunakannya.
export const api = {
  async getHomeSummary() {
    await tunggu(100);
    return {
      profile: mockBumdesProfile,
      quick_stats: {
        mitra_umkm_binaan: 50,
        kontribusi_pades_berjalan: mockTransparencySnapshot.realisasi_pades,
      },
      units: mockBusinessUnits,
      featured_pottery: mockPotteryProducts.filter((p) => p.is_featured),
      transparency_snapshot: mockTransparencySnapshot,
      latest_news: mockNewsArticles,
      upcoming_events: mockVillageEvents,
    };
  },

  async getPotteryProducts(categoryId) {
    await tunggu(100);
    if (!categoryId || categoryId === 1) return mockPotteryProducts;
    return mockPotteryProducts.filter((p) => p.category_id === categoryId);
  },

  async getPotteryCategories() {
    return mockPotteryCategories;
  },

  // Dipertahankan untuk kompatibilitas admin dashboard TSX
  async checkPamsimasBill(customerNo) {
    await tunggu(200);
    return null;
  },

  simulateUspFinancing(nominal, tenorMonths) {
    return {
      nominal,
      tenorMonths,
      monthlyInstallment: Math.round(nominal / tenorMonths),
    };
  },

  async submitB2BInquiry(payload) {
    await tunggu(300);
    return { success: true, message: "Pesanan B2B berhasil dikirim.", orderId: `B2B-${Date.now()}` };
  },

  async getAdminDashboardOverview() {
    return {
      kpi: {
        pendapatan_bulan_ini: 0,
        pertumbuhan_mom: 0,
        saldo_giro_bank_jateng: mockBumdesProfile?.saldo_giro_terkini ?? 0,
        pesanan_b2b_aktif: 0,
        capaian_pades_persen: mockTransparencySnapshot?.persentase_capaian ?? 0,
        target_pades_tahunan: mockTransparencySnapshot?.target_pades ?? 30000000,
      },
      recent_mutations: mockRecentCashMutations,
    };
  },
};
