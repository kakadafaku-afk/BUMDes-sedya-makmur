import {
  Wallet,
  Wrench,
  ShoppingBasket,
  UtensilsCrossed,
  Landmark,
  Leaf,
  Sprout,
  MilkOff,
  FlameKindling,
  Package,
  TreePine,
  Tractor,
} from "lucide-react";

/* ============================================================
   PUSAT DATA & TEKS STATIS — BUMDes Sedya Makmur
   Desa Mayong Lor, Kec. Mayong, Kab. Jepara, Jawa Tengah

   KONFIRMASI: Semua data di blok ini bersumber dari data resmi
   BUMDes Sedya Makmur yang dikonfirmasi oleh pengelola.
   Data bertanda "GANTI" adalah placeholder yang menunggu
   konfirmasi resmi.
   ============================================================ */

// ─── IDENTITAS RESMI ───────────────────────────────────────
export const BUMDES = {
  nama: "BUMDes Sedya Makmur",          // KONFIRMASI
  singkatan: "Sedya Makmur",
  desa: "Desa Mayong Lor",
  kec: "Mayong",
  kab: "Jepara",
  prov: "Jawa Tengah",
  alamat: "Kompleks Balaidesa Mayong Lor, Kec. Mayong, Kab. Jepara",  // KONFIRMASI
  jam: "Senin – Jumat: 08.00 – 15.00 WIB | Sabtu: 08.00 – 12.00 WIB",
  direktur: "Mulyono",                   // KONFIRMASI
  telp: "0878-2124-4536",               // KONFIRMASI
  wa: "6287821244536",                  // KONFIRMASI (format 62..., tanpa + dan 0 depan)
  email: "bumdesmayonglor@gmail.com",   // KONFIRMASI
  slogan1: "Bersama Membangun Desa, Menggerakkan Ekonomi Warga",  // KONFIRMASI
  slogan2: "Dari Potensi Lokal Untuk Masa Depan yang Lebih Baik", // KONFIRMASI
  footerPenutup: "Desa Berdaya • Ekonomi Tumbuh • Masyarakat Sejahtera", // KONFIRMASI
  mapsEmbed:
    "https://maps.google.com/maps?q=Mayong+Lor,+Mayong,+Jepara&output=embed",
};

// ─── SALURAN MEDIA SOSIAL RESMI ───────────────────────────
export const SOSMED = [
  { nama: "WhatsApp", url: `https://wa.me/${BUMDES.wa}`, handle: "0878-2124-4536" },
  { nama: "Instagram", url: "https://instagram.com/bumdes.sedyamakmur", handle: "@bumdes.sedyamakmur" },
  { nama: "Facebook", url: "https://facebook.com/bumdessedyamakmur", handle: "BUMDes Sedya Makmur" },
  { nama: "YouTube", url: "https://youtube.com/@bumdessedyamakmur", handle: "Sedya Makmur TV" },
  { nama: "Email", url: `mailto:${BUMDES.email}`, handle: BUMDES.email },
];

// ─── STATUS OPERASIONAL JAM KERJA (REAL-TIME WIB) ──────────
export function cekStatusOperasional() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utc + 7 * 3600000);
  const day = wib.getDay(); // 0: Minggu, 1: Senin, ..., 6: Sabtu
  const timeNum = wib.getHours() * 100 + wib.getMinutes();

  if (day >= 1 && day <= 5) {
    if (timeNum >= 800 && timeNum < 1500) {
      return { buka: true, label: "Buka Sekarang", detail: "Buka s/d 15.00 WIB", badgeColor: "bg-emerald-500" };
    }
    return { buka: false, label: "Sedang Tutup", detail: "Buka kembali hari kerja pkl 08.00 WIB", badgeColor: "bg-amber-500" };
  } else if (day === 6) {
    if (timeNum >= 800 && timeNum < 1200) {
      return { buka: true, label: "Buka (Sabtu)", detail: "Buka s/d 12.00 WIB", badgeColor: "bg-emerald-500" };
    }
    return { buka: false, label: "Sedang Tutup", detail: "Buka kembali Senin pkl 08.00 WIB", badgeColor: "bg-amber-500" };
  } else {
    return { buka: false, label: "Tutup (Minggu)", detail: "Buka kembali Senin pkl 08.00 WIB", badgeColor: "bg-slate-400" };
  }
}

// ─── MENU NAVIGASI ─────────────────────────────────────────
export const NAV = [
  { id: "beranda",       label: "Beranda" },
  { id: "profil",        label: "Profil" },
  { id: "unit",          label: "Unit Usaha" },
  { id: "produk-wisata", label: "Produk & Wisata" },
  { id: "transparansi",  label: "Transparansi" },
  { id: "kontak",        label: "Kontak" },
];

// ─── PROFIL KELEMBAGAAN ────────────────────────────────────
export const PROFIL = {
  // KONFIRMASI: semua data hukum di bawah ini bersumber dari dokumen resmi BUMDes
  perdes: "Peraturan Desa Mayong Lor No. 7 Tahun 2014",
  aktaNotaris: "Mulung Estu No. 14",
  nomorAkta: "C-493.HT.03.01-TH 2014",
  tanggalAkta: "30 Desember 2014",
  tanggalBeroperasi: "19 Februari 2016",
  modalAwal: 25000000,          // Rp 25.000.000 — KONFIRMASI
  jumlahUnit: 6,                 // KONFIRMASI
  padMulaiTahun: 2017,          // KONFIRMASI
  proyeksiPAD2026: 30000000,    // Rp 30.000.000 — KONFIRMASI (tampil dengan label "Proyeksi")

  visi: "Menjadi BUMDes yang profesional, mandiri dan berdaya saing, berbasis potensi lokal untuk kesejahteraan masyarakat Desa Mayong Lor.",  // KONFIRMASI

  misi: [
    "Mengembangkan potensi desa sebagai sumber daya utama BUMDes.",
    "Meningkatkan kesejahteraan masyarakat melalui usaha yang produktif.",
    "Melestarikan budaya dan produk lokal unggulan Desa Mayong Lor.",
    "Mendukung program pemerintah desa di bidang ekonomi dan sosial.",
    "Memberikan pelayanan usaha yang profesional dan berkelanjutan.",
  ],  // KONFIRMASI
};

// ─── PENGURUS ──────────────────────────────────────────────
export const PENGURUS = [
  { jabatan: "Direktur",   nama: "Mulyono",  keterangan: "" },  // KONFIRMASI
  { jabatan: "Penasihat",  nama: "GANTI",    keterangan: "" },
  { jabatan: "Sekretaris", nama: "GANTI",    keterangan: "" },
  { jabatan: "Bendahara",  nama: "GANTI",    keterangan: "" },
  { jabatan: "Pengawas",   nama: "GANTI",    keterangan: "" },
];

// ─── UNIT USAHA (6 Unit) ───────────────────────────────────
export const UNIT = [
  {
    id: "simpan-pinjam",
    icon: Wallet,
    t: "Simpan Pinjam",
    d: "Dukungan modal usaha bagi warga desa. Modal awal Rp 25 juta berkembang menjadi sekitar Rp 38 juta dan telah membantu 50+ nasabah.",
    highlight: "50+ nasabah terbantu",  // KONFIRMASI
  },
  {
    id: "bekisting",
    icon: Wrench,
    t: "Persewaan Bekisting",
    d: "Penyewaan bekisting (formwork) untuk kebutuhan konstruksi bangunan warga dan pelaku jasa konstruksi di sekitar Mayong Lor.",
    highlight: null,
  },
  {
    id: "sembako",
    icon: ShoppingBasket,
    t: "Perdagangan Sembako & Hortikultura",
    d: "Supplier SPPG — mendukung program Makan Bergizi Gratis (MBG) dengan menyuplai sayur, tahu, buah lokal, dan komoditas pangan ke beberapa SPPG di Mayong Lor.",
    highlight: "Supplier resmi MBG",  // KONFIRMASI
  },
  {
    id: "kantin",
    icon: UtensilsCrossed,
    t: "Kantin Karyawan Pabrik",
    d: "Sejak Desember 2025, mengelola kantin karyawan di PT. TBS Industrial Indo bekerja sama dengan Perkumpulan UMKM Jatrasmol.",
    highlight: "Aktif sejak Des 2025",  // KONFIRMASI
  },
  {
    id: "gerabah",
    icon: Landmark,
    t: "Gerabah & Produk Arsitektur",
    d: "Melestarikan produk lokal unggulan: gerabah, genteng, dan produk arsitektur khas Mayong Lor yang telah dikenal lintas daerah.",
    highlight: "Produk lokal unggulan",
  },
  {
    id: "ketahanan-pangan",
    icon: Leaf,
    t: "Ketahanan Pangan",
    d: "Sejak Februari 2026, amanat Perdes: pertanian hidroponik, peternakan kambing peranakan etawa, dan pertanian hortikultura terintegrasi.",
    highlight: "Aktif sejak Feb 2026",  // KONFIRMASI
  },
];

// ─── PRODUK ────────────────────────────────────────────────
// harga: null → tampilkan "Tanyakan harga" + tombol WhatsApp
export const KATEGORI_PRODUK = [
  "Semua",
  "Peternakan",
  "Hortikultura",
  "Gerabah & Arsitektur",
];

export const PRODUK = [
  {
    id: 1,
    nama: "Susu Kambing Etawa",
    kat: "Peternakan",
    harga: null,
    unit: "Ketahanan Pangan",
    foto: null,
    icon: MilkOff,
    deskripsi: "Susu segar kambing peranakan etawa dari peternakan BUMDes Sedya Makmur.",
  },
  {
    id: 2,
    nama: "Bibit Cabe Siap Tanam",
    kat: "Hortikultura",
    harga: null,
    unit: "Ketahanan Pangan",
    foto: null,
    icon: Sprout,
    deskripsi: "Bibit cabe berkualitas, siap tanam dari kebun BUMDes.",
  },
  {
    id: 3,
    nama: "Sayur Kale (siap berbuah)",
    kat: "Hortikultura",
    harga: null,
    unit: "Ketahanan Pangan",
    foto: null,
    icon: Leaf,
    deskripsi: "Kale segar hasil pertanian hortikultura terintegrasi desa.",
  },
  {
    id: 4,
    nama: "Tomat Siap Berbuah",
    kat: "Hortikultura",
    harga: null,
    unit: "Ketahanan Pangan",
    foto: null,
    icon: Sprout,
    deskripsi: "Tanaman tomat siap berbuah dari kebun organik BUMDes.",
  },
  {
    id: 5,
    nama: "Cabe & Sayuran Segar",
    kat: "Hortikultura",
    harga: null,
    unit: "Perdagangan Sembako",
    foto: null,
    icon: ShoppingBasket,
    deskripsi: "Pasokan cabe dan aneka sayuran segar untuk SPPG dan pasar lokal.",
  },
  {
    id: 6,
    nama: "Pupuk Organik & Media Tanam",
    kat: "Hortikultura",
    harga: null,
    unit: "Ketahanan Pangan",
    foto: null,
    icon: TreePine,
    deskripsi: "Pupuk organik dan media tanam berkualitas hasil olahan sendiri.",
  },
  {
    id: 7,
    nama: "Selada & Pakcoy Hidroponik",
    kat: "Hortikultura",
    harga: null,
    unit: "Ketahanan Pangan",
    foto: null,
    icon: Leaf,
    deskripsi: "Sayuran hidroponik segar bebas pestisida dari sistem NFT BUMDes.",
  },
  {
    id: 8,
    nama: "Remitan & Gerabah Hias",
    kat: "Gerabah & Arsitektur",
    harga: null,
    unit: "Gerabah & Produk Arsitektur",
    foto: null,
    icon: Landmark,
    deskripsi: "Remitan, pot, dan gerabah hias khas Mayong Lor, bisa pesan sesuai desain.",
  },
  {
    id: 9,
    nama: "Celengan & Kendi Tanah Liat",
    kat: "Gerabah & Arsitektur",
    harga: null,
    unit: "Gerabah & Produk Arsitektur",
    foto: null,
    icon: Package,
    deskripsi: "Celengan dan kendi tanah liat buatan tangan perajin Mayong Lor.",
  },
  {
    id: 10,
    nama: "Genteng & Bata Tempel",
    kat: "Gerabah & Arsitektur",
    harga: null,
    unit: "Gerabah & Produk Arsitektur",
    foto: null,
    icon: FlameKindling,
    deskripsi: "Produk arsitektur: genteng dan bata tempel berkualitas produksi lokal.",
  },
];

// ─── PAKET WISATA EDUKASI ──────────────────────────────────
export const PAKET_WISATA = [
  {
    id: 1,
    nama: "Wisata Pertanian & Peternakan",
    deskripsi:
      "Kunjungi langsung kebun hortikultura dan kandang kambing etawa BUMDes. Cocok untuk pelajar, mahasiswa, dan keluarga yang ingin mengenal pertanian modern desa.",
    icon: Tractor,
    durasi: "GANTI",
    minPeserta: "GANTI",
  },
  {
    id: 2,
    nama: "Cooking Class Produk Lokal",
    deskripsi:
      "Belajar memasak bersama UMKM lokal Mayong Lor. Mengolah hasil bumi desa menjadi hidangan lezat. Bekerja sama dengan Perkumpulan UMKM Jatrasmol.",
    icon: UtensilsCrossed,
    durasi: "GANTI",
    minPeserta: "GANTI",
  },
  {
    id: 3,
    nama: "Edukasi Gerabah & Kerajinan",
    deskripsi:
      "Mencoba langsung memutar tanah liat dan membuat gerabah didampingi perajin senior Desa Mayong Lor. Bawa pulang karya sendiri sebagai kenang-kenangan.",
    icon: Landmark,
    durasi: "GANTI",
    minPeserta: "GANTI",
  },
];

// ─── DATA KEUANGAN (Template — diisi admin) ────────────────
// Angka murni integer (Rupiah), BUKAN desimal.
// Data ini hanya tampil jika admin sudah mengisi laporan di backend.
// Proyeksi PAD 2026 dikonfirmasi; angka lain hanya template.
export const KAS_TEMPLATE = {
  periode: "GANTI",  // mis. "Tahun Anggaran 2025"
  catatanSumber: "Data bersumber dari laporan keuangan BUMDes Sedya Makmur",
  pendapatan: [
    { n: "Simpan Pinjam", v: 0 },
    { n: "Persewaan Bekisting", v: 0 },
    { n: "Perdagangan Sembako & Hortikultura", v: 0 },
    { n: "Kantin Karyawan Pabrik", v: 0 },
    { n: "Gerabah & Produk Arsitektur", v: 0 },
    { n: "Ketahanan Pangan", v: 0 },
  ],
  belanja: [
    { n: "Operasional & Honor Pengurus", v: 0 },
    { n: "Modal Usaha & Produksi", v: 0 },
    { n: "Pemeliharaan Aset", v: 0 },
  ],
  proyeksiPAD2026: 30000000,  // KONFIRMASI — tampil dengan label "Proyeksi 2026"
};

// ─── WARTA ─────────────────────────────────────────────────
export const KATEGORI_WARTA = ["Semua", "Kegiatan", "Pengumuman", "Usaha"];

// Warta contoh — hapus dan ganti dengan data nyata dari backend.
// Komponen Warta hanya tampil jika array ini tidak kosong.
export const WARTA = [
  {
    k: "Usaha",
    t: "Kantin BUMDes Sedya Makmur Mulai Beroperasi di PT. TBS Industrial Indo",
    d: "Desember 2025",
    ex: "BUMDes Sedya Makmur resmi mengelola kantin karyawan di PT. TBS Industrial Indo bekerja sama dengan Perkumpulan UMKM Jatrasmol.",
    isi: "Langkah ini merupakan bagian dari upaya BUMDes untuk memperluas unit usaha dan membuka peluang bagi anggota UMKM lokal.",
  },
  {
    k: "Usaha",
    t: "Unit Ketahanan Pangan: Peternakan Kambing Etawa & Hidroponik Resmi Berjalan",
    d: "Februari 2026",
    ex: "Amanat Perdes, BUMDes Sedya Makmur memulai pertanian hidroponik dan peternakan kambing peranakan etawa sebagai unit ketahanan pangan desa.",
    isi: "Program ini diharapkan mendukung ketahanan pangan warga dan menjadi sumber PAD desa yang berkelanjutan.",
  },
  {
    k: "Kegiatan",
    t: "Pelatihan Teknik Finishing Gerabah untuk Perajin Desa",
    d: "Oktober 2026",
    ex: "Perajin Mayong Lor belajar teknik pelapisan alami agar produk terakota lebih tahan cuaca dan menarik bagi pembeli luar daerah.",
    isi: "Pelatihan diselenggarakan di sentra kerajinan Dusun Krajan dengan narasumber praktisi kriya.",
  },
];

// ─── HELPERS FORMAT ────────────────────────────────────────
// Selalu gunakan helper ini untuk menampilkan angka Rupiah.
// Hindari hardcode string "Rp 1.150.000" langsung di komponen.
export const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");
export const juta = (n) =>
  "Rp " + (Number(n) / 1_000_000).toLocaleString("id-ID") + " Juta";
