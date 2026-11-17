import type { NewsArticle, VillageEvent } from '../../types/public';

export interface GalleryItem {
  id: number;
  title: string;
  category: 'kriya_gerabah' | 'pamsimas' | 'budaya_desa' | 'kegiatan_bumdes';
  media_url: string;
  caption: string;
  event_date: string;
}

export const mockGalleries: GalleryItem[] = [
  {
    id: 1,
    title: 'Pemberangkatan Kontainer Ekspor Gerabah ke Bali',
    category: 'kriya_gerabah',
    media_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    caption: 'Pengiriman 2.400 unit pot terakota dan guci relief pesanan jaringan resor Bali.',
    event_date: '4 November 2026',
  },
  {
    id: 2,
    title: 'Pemasangan Pipa Transmisi HDPE PAMSIMAS',
    category: 'pamsimas',
    media_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    caption: 'Pekerjaan galian dan penyambungan pipa distribusi air bersih di Dusun Krajan.',
    event_date: '28 Oktober 2026',
  },
  {
    id: 3,
    title: 'Pelatihan Akad Mudharabah & Tata Kelola Keuangan USP',
    category: 'kegiatan_bumdes',
    media_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    caption: 'Bimtek literasi keuangan syariah bebas rentenir bersama 35 pengrajin kriya.',
    event_date: '19 Oktober 2026',
  },
  {
    id: 4,
    title: 'Workshop Putar Gerabah Eduwisata Siswa SMP',
    category: 'budaya_desa',
    media_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    caption: 'Kunjungan 80 pelajar sekolah alam mempraktikkan teknik putaran miring tradisional.',
    event_date: '12 Oktober 2026',
  },
  {
    id: 5,
    title: 'Musyawarah Pertanggungjawaban BUMDes bersama BPD',
    category: 'kegiatan_bumdes',
    media_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Sidang pleno transparansi kas semesteran di Pendopo Balai Desa Mayong Lor.',
    event_date: '5 Oktober 2026',
  },
  {
    id: 6,
    title: 'Proses Pembakaran Guci Tungku Asam Jawa Tradisional',
    category: 'kriya_gerabah',
    media_url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    caption: 'Proses penembakan suhu tinggi 900°C menghasilkan warna terakota alami eksotis.',
    event_date: '25 September 2026',
  },
];

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Pengiriman Kontainer Perdana Gerabah Terakota Mayong Lor Tembus Pasar Ritel Kafe Nasional & Bali',
    slug: 'pengiriman-kontainer-perdana-gerabah-terakota-mayong-lor',
    summary: 'Sebanyak 2.400 unit pot arsitektural dan guci terakota hasil karya 42 pengrajin desa resmi diberangkatkan menuju jaringan perhotelan Bali dan Jabodetabek.',
    content: 'Kerja sama strategis BUMDes Mayong Lor dengan asosiasi perhotelan membuahkan hasil nyata. Pengiriman kontainer ini membuktikan bahwa produk kerajinan desa memiliki daya saing tinggi saat distandarisasi secara profesional melalui manajemen BUMDes.',
    category: 'ekspor_gerabah',
    thumbnail_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    author_name: 'Humas BUMDes',
    published_at: '2026-11-04',
    views_count: 1420,
  },
  {
    id: 2,
    title: 'Optimalisasi Debit Air PAMSIMAS Tirta Mayong: Pasang 150 Sambungan Rumah Baru di Dusun Krajan',
    slug: 'optimalisasi-debit-air-pamsimas-tirta-mayong',
    summary: 'Pemerintah Desa bersama BUMDes menambah jalur pipa transmisi HDPE 4 inch untuk menjamin kontinuitas suplai air bersih tanpa henti 24 jam.',
    content: 'Dengan penambahan sumur bor dalam dan reservoir berkapasitas 80 meter kubik, keandalan tekanan air ke rumah-rumah warga kini terjamin stabil bahkan di musim kemarau.',
    category: 'layanan_pamsimas',
    thumbnail_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    author_name: 'Unit PAMSIMAS',
    published_at: '2026-10-28',
    views_count: 890,
  },
  {
    id: 3,
    title: 'Penyaluran Modal Kerja Syariah Tahap IV: 35 Pengrajin Gerabah Terima Akad Mudharabah Bebas Riba',
    slug: 'penyaluran-modal-kerja-syariah-tahap-iv',
    summary: 'USP Mekar Syariah kembali menyalurkan dana bergulir senilai total Rp 140 Juta untuk peremajaan tungku dan bahan baku tanah liat super.',
    content: 'Program ini bertujuan memutus ketergantungan pelaku kriya terhadap rentenir dan pinjaman berbunga tinggi, sehingga laba bersih perajin meningkat rata-rata 32%.',
    category: 'edukasi_syariah',
    thumbnail_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    author_name: 'USP Mekar',
    published_at: '2026-10-19',
    views_count: 670,
  },
];

export const mockVillageEvents: VillageEvent[] = [
  {
    id: 1,
    title: 'Festival Gebyar Kriya Terakota Mayong Lor 2026',
    location: 'Sentra Gerabah Dusun Krajan, Mayong Lor',
    event_start: '2026-11-28 08:00',
    event_end: '2026-11-30 21:00',
    description: 'Pameran kriya akbar, demo putar gerabah bersama 100 perajin, lelang guci antik, dan bazar kuliner tradisional pesisir.',
    organizer: 'BUMDes & Karang Taruna Mayong Lor',
    is_upcoming: true,
  },
  {
    id: 2,
    title: 'Pelatihan Sertifikasi Kurasi Produk Ekspor bagi Pengrajin Kriya',
    location: 'Pendopo Balai Desa Mayong Lor',
    event_start: '2026-12-05 09:00',
    event_end: '2026-12-05 16:00',
    description: 'Bimbingan teknis standar finishing dan kemasan tahan banting standar pengiriman laut internasional.',
    organizer: 'Disperindag Jepara & BUMDes',
    is_upcoming: true,
  },
  {
    id: 3,
    title: 'Musyawarah Desa (Musdes) Pertanggungjawaban Tahunan BUMDes',
    location: 'Gedung Serbaguna Mayong Lor',
    event_start: '2026-12-18 13:00',
    event_end: '2026-12-18 17:30',
    description: 'Penyampaian realisasi dividen PADes dan penetapan Rencana Kerja Pemerintah Desa (RKPDes) tahun 2027.',
    organizer: 'Pemerintah Desa & BPD Mayong Lor',
    is_upcoming: true,
  },
];
