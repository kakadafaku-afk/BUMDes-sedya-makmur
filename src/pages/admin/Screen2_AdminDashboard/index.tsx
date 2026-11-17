import React, { useState } from 'react';
import { 
  LogOut, 
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  Compass,
  Users,
  FileSpreadsheet,
  Mail,
  BookOpen,
  X,
  MessageCircle,
  Newspaper
} from 'lucide-react';
import { ToastContainer } from '../../../components/common/Toast';
import type { ToastMessage } from '../../../components/common/Toast';
import { 
  BUMDES, 
  PROFIL, 
  UNIT, 
  PRODUK, 
  PAKET_WISATA, 
  PENGURUS, 
  WARTA,
  rupiah 
} from '../../../data/bumdes';
import { DATA_TRANSPARANSI_TAHUNAN } from '../../../components/Transparansi';
import type { LaporanTahunanItem } from '../../../components/Transparansi';

interface Screen2Props {
  onLogout: () => void;
  onViewPublic: () => void;
}

interface ProductItem {
  id: number;
  nama: string;
  kat: string;
  harga: number | null;
  unit?: string;
  foto: string | null;
  deskripsi?: string;
}

interface WisataItem {
  id: number;
  nama: string;
  deskripsi: string;
  durasi?: string;
  minPeserta?: string;
}

interface PengurusItem {
  jabatan: string;
  nama: string;
  keterangan: string;
}

interface AspirationItem {
  id: number;
  nama: string;
  kontak: string;
  pesan: string;
  tanggal: string;
  status: string;
}

interface CashItem {
  id: number;
  no: string;
  tanggal: string;
  unit: string;
  tipe: 'IN' | 'OUT';
  jumlah: number;
  keterangan: string;
}

interface WartaItem {
  k: string;
  t: string;
  d: string;
  ex: string;
  isi?: string;
}

export const Screen2_AdminDashboard: React.FC<Screen2Props> = ({
  onLogout,
  onViewPublic,
}) => {
  // Navigation Tabs: overview, produk, wisata, pengurus, transparansi, warta, pesan, kas
  const [activeTab, setActiveTab] = useState<'overview' | 'produk' | 'wisata' | 'pengurus' | 'transparansi' | 'warta' | 'pesan' | 'kas'>('overview');

  // Toasts Notification
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev: ToastMessage[]) => [...prev, { id, title, message, type }]);
  };
  const dismissToast = (id: string) => {
    setToasts((prev: ToastMessage[]) => prev.filter((t) => t.id !== id));
  };

  // ==========================================
  // 1. STATE CRUD: PRODUK BUMDes (HARGA OPSIONAL)
  // ==========================================
  const [products, setProducts] = useState<ProductItem[]>(PRODUK);
  const [productSearch, setProductSearch] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  const [productForm, setProductForm] = useState({
    nama: '',
    kat: 'Hortikultura',
    unit: 'Ketahanan Pangan',
    harga: '' as string | number, // Kosong = null (Tanyakan harga)
    deskripsi: '',
  });

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      nama: '',
      kat: 'Hortikultura',
      unit: 'Ketahanan Pangan',
      harga: '',
      deskripsi: '',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProductForm({
      nama: prod.nama,
      kat: prod.kat,
      unit: prod.unit || 'Ketahanan Pangan',
      harga: prod.harga !== null ? prod.harga : '',
      deskripsi: prod.deskripsi || '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.nama.trim()) return;

    const hargaNumber = productForm.harga !== '' ? Number(productForm.harga) : null;

    if (editingProduct) {
      setProducts((prev: ProductItem[]) =>
        prev.map((p: ProductItem) =>
          p.id === editingProduct.id
            ? { ...p, ...productForm, harga: hargaNumber }
            : p
        )
      );
      showToast('Produk Diperbarui', `${productForm.nama} berhasil diupdate.`);
    } else {
      const newProd: ProductItem = {
        id: Date.now(),
        ...productForm,
        harga: hargaNumber,
        foto: null,
      };
      setProducts((prev: ProductItem[]) => [newProd, ...prev]);
      showToast('Produk Ditambahkan', `${productForm.nama} kini terdaftar di katalog BUMDes.`);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: number, nama: string) => {
    if (window.confirm(`Yakin ingin menghapus produk "${nama}"?`)) {
      setProducts((prev: ProductItem[]) => prev.filter((p: ProductItem) => p.id !== id));
      showToast('Produk Dihapus', `${nama} telah dihapus.`, 'info');
    }
  };

  // ==========================================
  // 2. STATE CRUD: PAKET WISATA EDUKASI
  // ==========================================
  const [wisataList, setWisataList] = useState<WisataItem[]>(PAKET_WISATA);
  const [isWisataModalOpen, setIsWisataModalOpen] = useState(false);
  const [editingWisata, setEditingWisata] = useState<WisataItem | null>(null);

  const [wisataForm, setWisataForm] = useState({
    nama: '',
    deskripsi: '',
    durasi: '3 Jam',
    minPeserta: '10',
  });

  const handleOpenAddWisata = () => {
    setEditingWisata(null);
    setWisataForm({
      nama: '',
      deskripsi: '',
      durasi: '3 Jam',
      minPeserta: '10',
    });
    setIsWisataModalOpen(true);
  };

  const handleOpenEditWisata = (w: WisataItem) => {
    setEditingWisata(w);
    setWisataForm({
      nama: w.nama,
      deskripsi: w.deskripsi,
      durasi: w.durasi || '3 Jam',
      minPeserta: w.minPeserta || '10',
    });
    setIsWisataModalOpen(true);
  };

  const handleSaveWisata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wisataForm.nama.trim()) return;

    if (editingWisata) {
      setWisataList((prev: WisataItem[]) =>
        prev.map((w: WisataItem) => (w.id === editingWisata.id ? { ...w, ...wisataForm } : w))
      );
      showToast('Paket Wisata Diperbarui', `${wisataForm.nama} berhasil diubah.`);
    } else {
      const newW: WisataItem = {
        id: Date.now(),
        ...wisataForm,
      };
      setWisataList((prev: WisataItem[]) => [...prev, newW]);
      showToast('Paket Wisata Ditambahkan', `${wisataForm.nama} siap ditawarkan ke pengunjung.`);
    }
    setIsWisataModalOpen(false);
  };

  const handleDeleteWisata = (id: number, nama: string) => {
    if (window.confirm(`Hapus paket wisata "${nama}"?`)) {
      setWisataList((prev: WisataItem[]) => prev.filter((w: WisataItem) => w.id !== id));
      showToast('Paket Wisata Dihapus', `${nama} dihapus.`, 'info');
    }
  };

  // ==========================================
  // 3. STATE CRUD: STRUKTUR PENGURUS
  // ==========================================
  const [pengurusList, setPengurusList] = useState<PengurusItem[]>(PENGURUS);
  const [isPengurusModalOpen, setIsPengurusModalOpen] = useState(false);
  const [editingPengurus, setEditingPengurus] = useState<PengurusItem | null>(null);

  const [pengurusForm, setPengurusForm] = useState({
    jabatan: 'Pengawas',
    nama: '',
    keterangan: '',
  });

  const handleOpenEditPengurus = (p: PengurusItem) => {
    setEditingPengurus(p);
    setPengurusForm({
      jabatan: p.jabatan,
      nama: p.nama,
      keterangan: p.keterangan || '',
    });
    setIsPengurusModalOpen(true);
  };

  const handleSavePengurus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengurusForm.nama.trim()) return;

    if (editingPengurus) {
      setPengurusList((prev: PengurusItem[]) =>
        prev.map((p: PengurusItem) =>
          p.jabatan === editingPengurus.jabatan ? { ...p, ...pengurusForm } : p
        )
      );
      showToast('Data Pengurus Diperbarui', `${pengurusForm.jabatan} kini ${pengurusForm.nama}.`);
    } else {
      setPengurusList((prev: PengurusItem[]) => [...prev, pengurusForm]);
      showToast('Pengurus Ditambahkan', `${pengurusForm.nama} terdaftar.`);
    }
    setIsPengurusModalOpen(false);
  };

  // ==========================================
  // 4. STATE CRUD: TRANSPARANSI & LAPORAN TAHUNAN
  // ==========================================
  const [laporanTahunan, setLaporanTahunan] = useState<LaporanTahunanItem[]>(DATA_TRANSPARANSI_TAHUNAN);
  const [isLaporanModalOpen, setIsLaporanModalOpen] = useState(false);
  const [editingLaporan, setEditingLaporan] = useState<LaporanTahunanItem | null>(null);

  const [laporanForm, setLaporanForm] = useState({
    tahun: 2026,
    status: 'Draft',
    totalPendapatan: 75000000,
    pengeluaran: 45000000,
    labaBersih: 30000000,
    setoranPadRealisasi: 15000000,
    keterangan: 'Laporan Tutup Buku Tahun Anggaran',
  });

  const handleOpenAddLaporan = () => {
    setEditingLaporan(null);
    setLaporanForm({
      tahun: new Date().getFullYear(),
      status: 'Draft',
      totalPendapatan: 0,
      pengeluaran: 0,
      labaBersih: 0,
      setoranPadRealisasi: 0,
      keterangan: `Laporan Tutup Buku Tahun Anggaran ${new Date().getFullYear()}`,
    });
    setIsLaporanModalOpen(true);
  };

  const handleOpenEditLaporan = (lap: LaporanTahunanItem) => {
    setEditingLaporan(lap);
    setLaporanForm({
      tahun: lap.tahun,
      status: lap.status,
      totalPendapatan: lap.totalPendapatan,
      pengeluaran: lap.pengeluaran,
      labaBersih: lap.labaBersih,
      setoranPadRealisasi: lap.setoranPadRealisasi,
      keterangan: lap.keterangan,
    });
    setIsLaporanModalOpen(true);
  };

  const handleSaveLaporan = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLaporan) {
      setLaporanTahunan((prev: LaporanTahunanItem[]) =>
        prev.map((lap: LaporanTahunanItem) =>
          lap.tahun === editingLaporan.tahun
            ? { ...lap, ...laporanForm, unit_usaha: lap.unit_usaha }
            : lap
        )
      );
      showToast('Laporan Keuangan Diperbarui', `Tahun ${laporanForm.tahun} berhasil disimpan.`);
    } else {
      const newLap: LaporanTahunanItem = {
        ...laporanForm,
        unit_usaha: [
          { nama: 'Simpan Pinjam', pendapatan: Math.round(laporanForm.totalPendapatan * 0.25) },
          { nama: 'Persewaan Bekisting', pendapatan: Math.round(laporanForm.totalPendapatan * 0.1) },
          { nama: 'Perdagangan Sembako & Hortikultura', pendapatan: Math.round(laporanForm.totalPendapatan * 0.3) },
          { nama: 'Kantin Karyawan Pabrik', pendapatan: Math.round(laporanForm.totalPendapatan * 0.15) },
          { nama: 'Gerabah & Produk Arsitektur', pendapatan: Math.round(laporanForm.totalPendapatan * 0.1) },
          { nama: 'Ketahanan Pangan', pendapatan: Math.round(laporanForm.totalPendapatan * 0.1) },
        ],
      };
      setLaporanTahunan((prev: LaporanTahunanItem[]) => [newLap, ...prev]);
      showToast('Laporan Tahunan Ditambahkan', `Laporan Tahun ${laporanForm.tahun} tercatat.`);
    }
    setIsLaporanModalOpen(false);
  };

  const handleDeleteLaporan = (tahun: number) => {
    if (window.confirm(`Hapus laporan keuangan tahun ${tahun}?`)) {
      setLaporanTahunan((prev: LaporanTahunanItem[]) => prev.filter((l: LaporanTahunanItem) => l.tahun !== tahun));
      showToast('Laporan Dihapus', `Laporan tahun ${tahun} dihapus.`, 'info');
    }
  };

  // ==========================================
  // 5. STATE CRUD: WARTA & BERITA DESA
  // ==========================================
  const [wartaList, setWartaList] = useState<WartaItem[]>(WARTA);
  const [isWartaModalOpen, setIsWartaModalOpen] = useState(false);
  const [editingWarta, setEditingWarta] = useState<WartaItem | null>(null);

  const [wartaForm, setWartaForm] = useState({
    k: 'Kegiatan',
    t: '',
    d: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    ex: '',
    isi: '',
  });

  const handleOpenAddWarta = () => {
    setEditingWarta(null);
    setWartaForm({
      k: 'Kegiatan',
      t: '',
      d: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      ex: '',
      isi: '',
    });
    setIsWartaModalOpen(true);
  };

  const handleOpenEditWarta = (w: WartaItem) => {
    setEditingWarta(w);
    setWartaForm({
      k: w.k,
      t: w.t,
      d: w.d,
      ex: w.ex,
      isi: w.isi || '',
    });
    setIsWartaModalOpen(true);
  };

  const handleSaveWarta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wartaForm.t.trim()) return;

    if (editingWarta) {
      setWartaList((prev: WartaItem[]) =>
        prev.map((w: WartaItem) => (w.t === editingWarta.t ? { ...w, ...wartaForm } : w))
      );
      showToast('Warta Diperbarui', `Artikel "${wartaForm.t}" berhasil diupdate.`);
    } else {
      setWartaList((prev: WartaItem[]) => [wartaForm, ...prev]);
      showToast('Warta Diterbitkan', `Artikel "${wartaForm.t}" kini tayang.`);
    }
    setIsWartaModalOpen(false);
  };

  const handleDeleteWarta = (judul: string) => {
    if (window.confirm(`Hapus warta "${judul}"?`)) {
      setWartaList((prev: WartaItem[]) => prev.filter((w: WartaItem) => w.t !== judul));
      showToast('Warta Dihapus', `Artikel "${judul}" dihapus.`, 'info');
    }
  };

  // ==========================================
  // 6. STATE: PESAN & ASPIRASI WARGA
  // ==========================================
  const [aspirations, setAspirations] = useState<AspirationItem[]>([
    {
      id: 1,
      nama: 'Bpk. Supriyanto',
      kontak: '0812-3456-7890',
      pesan: 'Mohon info ketersediaan bibit cabai dan sayuran hidroponik untuk kelompok tani RT 02.',
      tanggal: '10 Nov 2026',
      status: 'baru',
    },
    {
      id: 2,
      nama: 'CV Berkah Abadi Jepara',
      kontak: '0877-8899-1122',
      pesan: 'Tertarik kemitraan pemesanan gerabah pot bunga tanah liat skala B2B untuk proyek taman perumahan.',
      tanggal: '9 Nov 2026',
      status: 'diproses',
    },
    {
      id: 3,
      nama: 'Ibu Noor Aini',
      kontak: '0852-9988-7766',
      pesan: 'Ingin mendaftar paket cooking class bersama UMKM untuk rombongan PKK desa tetangga.',
      tanggal: '8 Nov 2026',
      status: 'selesai',
    },
  ]);

  const handleUpdateStatusPesan = (id: number, newStatus: string) => {
    setAspirations((prev: AspirationItem[]) =>
      prev.map((a: AspirationItem) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    showToast('Status Pesan Diperbarui', `Pesan ID #${id} ditandai ${newStatus}.`);
  };

  const handleDeletePesan = (id: number) => {
    if (window.confirm('Hapus pesan ini dari arsip?')) {
      setAspirations((prev: AspirationItem[]) => prev.filter((a: AspirationItem) => a.id !== id));
      showToast('Pesan Dihapus', 'Pesan telah dihapus dari daftar.', 'info');
    }
  };

  // ==========================================
  // 6. STATE CRUD: BUKU KAS UMUM
  // ==========================================
  const [cashMutations, setCashMutations] = useState<CashItem[]>([
    {
      id: 1,
      no: 'TRX-20261109-01',
      tanggal: '9 Nov 2026',
      unit: 'Simpan Pinjam',
      tipe: 'IN',
      jumlah: 3500000,
      keterangan: 'Angsuran pokok dan jasa modal usaha warga',
    },
    {
      id: 2,
      no: 'TRX-20261108-02',
      tanggal: '8 Nov 2026',
      unit: 'Perdagangan Sembako',
      tipe: 'IN',
      jumlah: 8200000,
      keterangan: 'Penyaluran pasokan sayur & tahu lokal ke SPPG Mayong Lor',
    },
    {
      id: 3,
      no: 'TRX-20261107-03',
      tanggal: '7 Nov 2026',
      unit: 'Ketahanan Pangan',
      tipe: 'OUT',
      jumlah: 2400000,
      keterangan: 'Pembelian pakan konsentrat & nutrisi hidroponik NFT',
    },
    {
      id: 4,
      no: 'TRX-20261106-04',
      tanggal: '6 Nov 2026',
      unit: 'Kantin Karyawan Pabrik',
      tipe: 'IN',
      jumlah: 5600000,
      keterangan: 'Pendapatan operasional kantin PT. TBS Industrial Indo (kemitraan Jatrasmol)',
    },
  ]);

  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [cashForm, setCashForm] = useState({
    unit: 'Ketahanan Pangan',
    tipe: 'IN' as 'IN' | 'OUT',
    jumlah: 1000000,
    keterangan: '',
  });

  const handleSaveCash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashForm.keterangan.trim() || cashForm.jumlah <= 0) return;

    const newTrx: CashItem = {
      id: Date.now(),
      no: `TRX-${Date.now().toString().slice(-8)}`,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      unit: cashForm.unit,
      tipe: cashForm.tipe,
      jumlah: Number(cashForm.jumlah),
      keterangan: cashForm.keterangan,
    };

    setCashMutations((prev: CashItem[]) => [newTrx, ...prev]);
    showToast('Mutasi Kas Dicatat', `${cashForm.tipe === 'IN' ? 'Kas Masuk' : 'Kas Keluar'} ${rupiah(cashForm.jumlah)} berhasil disimpan.`);
    setIsCashModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-krem/40 dark:bg-slate-900 py-8 text-slate-800 dark:text-slate-100">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-brand-krem-gelap dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white bg-brand-terakota px-2.5 py-0.5 rounded-full shadow-xs">
                Panel Administrasi Internal
              </span>
              <span className="text-xs text-slate-400 font-mono">• {PROFIL.perdes}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-cokelat dark:text-white tracking-tight mt-1">
              Dasbor Tata Kelola {BUMDES.nama}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {BUMDES.desa}, Kec. {BUMDES.kec}, Kab. {BUMDES.kab} · Direktur: <strong>{BUMDES.direktur}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewPublic}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-brand-cokelat dark:text-white bg-brand-krem dark:bg-slate-700 hover:bg-brand-krem-gelap transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Web Publik</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-brand-krem-gelap dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            Ringkasan & KPI
          </button>
          <button
            onClick={() => setActiveTab('produk')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'produk'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Katalog Produk ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('wisata')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'wisata'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Paket Wisata ({wisataList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('pengurus')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pengurus'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Struktur Pengurus ({pengurusList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('transparansi')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'transparansi'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Laporan Tahunan & PAD ({laporanTahunan.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('warta')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'warta'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Warta Berita ({wartaList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('pesan')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pesan'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Pesan Warga ({aspirations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('kas')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kas'
                ? 'bg-brand-cokelat text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Buku Kas Umum ({cashMutations.length})</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & RINGKASAN */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Unit Usaha Aktif
                </span>
                <p className="text-3xl font-extrabold text-brand-cokelat dark:text-white">
                  6 Unit
                </p>
                <span className="text-xs text-brand-terakota font-semibold">
                  Tumbuh sejak 19 Feb 2016
                </span>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Proyeksi PAD 2026
                </span>
                <p className="text-2xl font-extrabold text-brand-terakota">
                  {rupiah(PROFIL.proyeksiPAD2026)}
                </p>
                <span className="text-xs text-slate-500 font-medium">
                  Label: Target Proyeksi Resmi
                </span>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Katalog Terdaftar
                </span>
                <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {products.length} Produk
                </p>
                <span className="text-xs text-slate-500">
                  {wisataList.length} Paket Wisata Edukasi
                </span>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Aspirasi / Pesan Masuk
                </span>
                <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400">
                  {aspirations.length} Pesan
                </p>
                <span className="text-xs text-slate-500">
                  Form Kontak Web BUMDes
                </span>
              </div>
            </div>

            {/* Quick Status 6 Unit Usaha */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs">
              <h3 className="font-bold text-base text-brand-cokelat dark:text-white mb-4">
                Status Operasional 6 Unit Usaha BUMDes Sedya Makmur
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {UNIT.map((u: any) => (
                  <div key={u.id} className="p-4 rounded-2xl bg-brand-krem/40 dark:bg-slate-700/40 border border-brand-krem-gelap dark:border-slate-600">
                    <span className="block font-bold text-sm text-brand-cokelat dark:text-white">{u.t}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{u.d}</p>
                    {u.highlight && (
                      <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-brand-terakota/15 text-brand-terakota text-[10px] font-bold">
                        {u.highlight}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CRUD KATALOG PRODUK */}
        {/* ============================================================== */}
        {activeTab === 'produk' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-600 bg-brand-krem/20 dark:bg-slate-900 focus:outline-hidden focus:ring-1 focus:ring-brand-terakota"
                />
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 rounded-xl bg-brand-terakota text-white text-xs font-bold hover:bg-brand-cokelat transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-krem/70 dark:bg-slate-900/60 text-brand-cokelat dark:text-slate-300 uppercase tracking-wider font-bold border-b border-brand-krem-gelap dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Nama Produk</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Unit Usaha</th>
                    <th className="py-3 px-4">Harga</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-krem-gelap/50 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
                  {products
                    .filter((p: ProductItem) => p.nama.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((p: ProductItem) => (
                      <tr key={p.id} className="hover:bg-brand-krem/20 dark:hover:bg-slate-700/30">
                        <td className="py-3 px-4 font-semibold">{p.nama}</td>
                        <td className="py-3 px-4">{p.kat}</td>
                        <td className="py-3 px-4 text-slate-500">{p.unit || 'BUMDes'}</td>
                        <td className="py-3 px-4 font-bold text-brand-terakota">
                          {p.harga !== null ? rupiah(p.harga) : <span className="text-slate-400 italic">Tanyakan harga</span>}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-brand-terakota hover:bg-brand-krem transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.nama)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CRUD PAKET WISATA */}
        {/* ============================================================== */}
        {activeTab === 'wisata' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700">
              <span className="text-xs font-bold text-brand-cokelat dark:text-white">
                Kelola 3 Paket Eduwisata Desa Mayong Lor
              </span>
              <button
                onClick={handleOpenAddWisata}
                className="px-4 py-2 rounded-xl bg-brand-terakota text-white text-xs font-bold hover:bg-brand-cokelat transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Paket Wisata</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wisataList.map((w: WisataItem) => (
                <div key={w.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-brand-cokelat dark:text-white mb-2">{w.nama}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{w.deskripsi}</p>
                    <div className="text-[11px] text-slate-400 space-y-1">
                      <div>Durasi: <span className="font-semibold text-slate-600 dark:text-slate-300">{w.durasi}</span></div>
                      <div>Min. Peserta: <span className="font-semibold text-slate-600 dark:text-slate-300">{w.minPeserta} orang</span></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-krem-gelap dark:border-slate-700 flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditWisata(w)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-terakota hover:bg-brand-krem transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWisata(w.id, w.nama)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CRUD STRUKTUR PENGURUS */}
        {/* ============================================================== */}
        {activeTab === 'pengurus' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-brand-cokelat dark:text-white block">
                  Daftar Jabatan & Pengurus BUMDes Sedya Makmur
                </span>
                <span className="text-[11px] text-slate-400">
                  Data bertanda "GANTI" menunggu konfirmasi resmi SK Kepala Desa
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pengurusList.map((p: PengurusItem) => (
                <div key={p.jabatan} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terakota block mb-1">
                      {p.jabatan}
                    </span>
                    <p className="font-bold text-sm text-brand-cokelat dark:text-white">
                      {p.nama}
                    </p>
                    {p.keterangan && (
                      <p className="text-xs text-slate-400 mt-1">{p.keterangan}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleOpenEditPengurus(p)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-brand-terakota hover:bg-brand-krem transition-colors"
                    title="Ubah Nama"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: CRUD LAPORAN TAHUNAN & PAD */}
        {/* ============================================================== */}
        {activeTab === 'transparansi' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700">
              <div>
                <span className="text-xs font-bold text-brand-cokelat dark:text-white block">
                  Laporan Realisasi Kas & Kontribusi PADes
                </span>
                <span className="text-[11px] text-brand-terakota font-semibold">
                  Proyeksi PAD 2026: {rupiah(PROFIL.proyeksiPAD2026)} (Label Proyeksi)
                </span>
              </div>
              <button
                onClick={handleOpenAddLaporan}
                className="px-4 py-2 rounded-xl bg-brand-terakota text-white text-xs font-bold hover:bg-brand-cokelat transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Laporan Tahunan</span>
              </button>
            </div>

            <div className="space-y-4">
              {laporanTahunan.map((lap: LaporanTahunanItem) => (
                <div key={lap.tahun} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-brand-krem-gelap dark:border-slate-700 pb-3">
                    <div>
                      <h4 className="font-bold text-base text-brand-cokelat dark:text-white">
                        Tahun Anggaran {lap.tahun}
                      </h4>
                      <span className="text-xs text-slate-400">{lap.keterangan} · Status: <strong>{lap.status}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditLaporan(lap)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-terakota hover:bg-brand-krem transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLaporan(lap.tahun)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-brand-krem/40 dark:bg-slate-700/40">
                      <span className="text-slate-400 block mb-0.5">Pendapatan</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{rupiah(lap.totalPendapatan)}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-krem/40 dark:bg-slate-700/40">
                      <span className="text-slate-400 block mb-0.5">Pengeluaran</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">{rupiah(lap.pengeluaran)}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-krem/40 dark:bg-slate-700/40">
                      <span className="text-slate-400 block mb-0.5">Laba Bersih</span>
                      <span className="font-bold text-brand-cokelat dark:text-white">{rupiah(lap.labaBersih)}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-terakota/15 border border-brand-terakota/30">
                      <span className="text-brand-terakota font-bold block mb-0.5">Setoran PAD</span>
                      <span className="font-extrabold text-brand-terakota">{rupiah(lap.setoranPadRealisasi)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: CRUD WARTA & BERITA DESA */}
        {/* ============================================================== */}
        {activeTab === 'warta' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700">
              <div>
                <span className="text-xs font-bold text-brand-cokelat dark:text-white block">
                  Manajemen Warta & Kabar Kegiatan BUMDes
                </span>
                <span className="text-[11px] text-slate-400">
                  Artikel yang diterbitkan akan langsung tampil di portal web publik
                </span>
              </div>
              <button
                onClick={handleOpenAddWarta}
                className="px-4 py-2 rounded-xl bg-brand-terakota text-white text-xs font-bold hover:bg-brand-cokelat transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Berita Baru</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wartaList.map((w: WartaItem) => (
                <div key={w.t} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="px-2 py-0.5 rounded-full bg-brand-terakota/15 text-brand-terakota font-bold">
                        {w.k}
                      </span>
                      <span>{w.d}</span>
                    </div>
                    <h4 className="font-bold text-sm text-brand-cokelat dark:text-white leading-snug line-clamp-2">
                      {w.t}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {w.ex}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-krem-gelap dark:border-slate-700 flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditWarta(w)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-terakota hover:bg-brand-krem transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWarta(w.t)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: PESAN & ASPIRASI WARGA */}
        {/* ============================================================== */}
        {activeTab === 'pesan' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700">
              <span className="text-xs font-bold text-brand-cokelat dark:text-white">
                Daftar Pesan & Kebutuhan Kemitraan dari Form Kontak Web
              </span>
            </div>

            <div className="space-y-3">
              {aspirations.map((a: AspirationItem) => (
                <div key={a.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-brand-cokelat dark:text-white">{a.nama}</span>
                      <span className="text-[11px] text-slate-400">({a.kontak})</span>
                      <span className="text-[10px] text-slate-400">• {a.tanggal}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        a.status === 'baru' ? 'bg-amber-100 text-amber-800' :
                        a.status === 'diproses' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {a.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{a.pesan}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={`https://wa.me/${a.kontak.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Balas WA</span>
                    </a>
                    <button
                      onClick={() => handleUpdateStatusPesan(a.id, a.status === 'selesai' ? 'baru' : 'selesai')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                    >
                      {a.status === 'selesai' ? 'Tandai Baru' : 'Tandai Selesai'}
                    </button>
                    <button
                      onClick={() => handleDeletePesan(a.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: BUKU KAS UMUM */}
        {/* ============================================================== */}
        {activeTab === 'kas' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-brand-krem-gelap dark:border-slate-700">
              <span className="text-xs font-bold text-brand-cokelat dark:text-white">
                Pencatatan Buku Kas Umum (6 Unit Usaha)
              </span>
              <button
                onClick={() => setIsCashModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-brand-terakota text-white text-xs font-bold hover:bg-brand-cokelat transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Catat Mutasi Kas</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-brand-krem-gelap dark:border-slate-700 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-krem/70 dark:bg-slate-900/60 text-brand-cokelat dark:text-slate-300 uppercase tracking-wider font-bold border-b border-brand-krem-gelap dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">No. Transaksi</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Unit Usaha</th>
                    <th className="py-3 px-4">Keterangan</th>
                    <th className="py-3 px-4 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-krem-gelap/50 dark:divide-slate-700 text-slate-700 dark:text-slate-200">
                  {cashMutations.map((m: CashItem) => (
                    <tr key={m.id} className="hover:bg-brand-krem/20 dark:hover:bg-slate-700/30">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{m.no}</td>
                      <td className="py-3 px-4">{m.tanggal}</td>
                      <td className="py-3 px-4 font-semibold">{m.unit}</td>
                      <td className="py-3 px-4">{m.keterangan}</td>
                      <td className={`py-3 px-4 text-right font-bold ${
                        m.tipe === 'IN' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                      }`}>
                        {m.tipe === 'IN' ? '+' : '-'} {rupiah(m.jumlah)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL 1: FORM PRODUK */}
      {/* ============================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-brand-krem-gelap dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-krem-gelap dark:border-slate-700">
              <h3 className="font-bold text-sm text-brand-cokelat dark:text-white">
                {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nama Produk *</label>
                <input
                  required
                  value={productForm.nama}
                  onChange={(e) => setProductForm({ ...productForm, nama: e.target.value })}
                  placeholder="Contoh: Susu Kambing Etawa Segar"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Kategori *</label>
                <select
                  value={productForm.kat}
                  onChange={(e) => setProductForm({ ...productForm, kat: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                >
                  <option value="Peternakan">Peternakan</option>
                  <option value="Hortikultura">Hortikultura</option>
                  <option value="Gerabah & Arsitektur">Gerabah & Arsitektur</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Unit Usaha Terkait</label>
                <select
                  value={productForm.unit}
                  onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                >
                  {UNIT.map((u: any) => (
                    <option key={u.id} value={u.t}>{u.t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Harga (Rupiah) — Kosongkan jika Tanyakan Harga</label>
                <input
                  type="number"
                  value={productForm.harga}
                  onChange={(e) => setProductForm({ ...productForm, harga: e.target.value })}
                  placeholder="Kosongkan untuk 'Tanyakan harga'"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Deskripsi Produk</label>
                <textarea
                  rows={3}
                  value={productForm.deskripsi}
                  onChange={(e) => setProductForm({ ...productForm, deskripsi: e.target.value })}
                  placeholder="Keterangan singkat..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: FORM WISATA */}
      {/* ============================================================== */}
      {isWisataModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-brand-krem-gelap dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-krem-gelap dark:border-slate-700">
              <h3 className="font-bold text-sm text-brand-cokelat dark:text-white">
                {editingWisata ? 'Edit Paket Wisata' : 'Tambah Paket Wisata'}
              </h3>
              <button onClick={() => setIsWisataModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWisata} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nama Paket *</label>
                <input
                  required
                  value={wisataForm.nama}
                  onChange={(e) => setWisataForm({ ...wisataForm, nama: e.target.value })}
                  placeholder="Contoh: Cooking Class Bersama UMKM"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Deskripsi Paket *</label>
                <textarea
                  required
                  rows={3}
                  value={wisataForm.deskripsi}
                  onChange={(e) => setWisataForm({ ...wisataForm, deskripsi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Durasi</label>
                  <input
                    value={wisataForm.durasi}
                    onChange={(e) => setWisataForm({ ...wisataForm, durasi: e.target.value })}
                    placeholder="Contoh: 2-3 Jam"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Min. Peserta (Orang)</label>
                  <input
                    value={wisataForm.minPeserta}
                    onChange={(e) => setWisataForm({ ...wisataForm, minPeserta: e.target.value })}
                    placeholder="Contoh: 10"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWisataModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat"
                >
                  Simpan Paket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: FORM PENGURUS */}
      {/* ============================================================== */}
      {isPengurusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-brand-krem-gelap dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-krem-gelap dark:border-slate-700">
              <h3 className="font-bold text-sm text-brand-cokelat dark:text-white">
                Perbarui Pengurus BUMDes
              </h3>
              <button onClick={() => setIsPengurusModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePengurus} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Jabatan</label>
                <input
                  disabled
                  value={pengurusForm.jabatan}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Nama Pejabat *</label>
                <input
                  required
                  value={pengurusForm.nama}
                  onChange={(e) => setPengurusForm({ ...pengurusForm, nama: e.target.value })}
                  placeholder="Isi nama resmi (mis. Mulyono)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Keterangan Tambahan</label>
                <input
                  value={pengurusForm.keterangan}
                  onChange={(e) => setPengurusForm({ ...pengurusForm, keterangan: e.target.value })}
                  placeholder="Mis. SK Kepala Desa No..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPengurusModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: FORM LAPORAN TAHUNAN */}
      {/* ============================================================== */}
      {isLaporanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-brand-krem-gelap dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-krem-gelap dark:border-slate-700">
              <h3 className="font-bold text-sm text-brand-cokelat dark:text-white">
                {editingLaporan ? `Edit Laporan Tahun ${editingLaporan.tahun}` : 'Tambah Laporan Tahunan'}
              </h3>
              <button onClick={() => setIsLaporanModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLaporan} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Tahun Anggaran *</label>
                  <input
                    type="number"
                    required
                    value={laporanForm.tahun}
                    onChange={(e) => setLaporanForm({ ...laporanForm, tahun: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Status Audit</label>
                  <select
                    value={laporanForm.status}
                    onChange={(e) => setLaporanForm({ ...laporanForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  >
                    <option value="Audited">Audited</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Total Pendapatan (Rp) *</label>
                <input
                  type="number"
                  required
                  value={laporanForm.totalPendapatan}
                  onChange={(e) => setLaporanForm({ ...laporanForm, totalPendapatan: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Pengeluaran Operasional (Rp) *</label>
                <input
                  type="number"
                  required
                  value={laporanForm.pengeluaran}
                  onChange={(e) => setLaporanForm({ ...laporanForm, pengeluaran: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Laba Bersih (Rp) *</label>
                <input
                  type="number"
                  required
                  value={laporanForm.labaBersih}
                  onChange={(e) => setLaporanForm({ ...laporanForm, labaBersih: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Setoran PAD Realisasi ke Kas Desa (Rp) *</label>
                <input
                  type="number"
                  required
                  value={laporanForm.setoranPadRealisasi}
                  onChange={(e) => setLaporanForm({ ...laporanForm, setoranPadRealisasi: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLaporanModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat"
                >
                  Simpan Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: FORM MUTASI KAS */}
      {/* ============================================================== */}
      {isCashModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-brand-krem-gelap dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-krem-gelap dark:border-slate-700">
              <h3 className="font-bold text-sm text-brand-cokelat dark:text-white">
                Catat Transaksi Buku Kas Umum
              </h3>
              <button onClick={() => setIsCashModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCash} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Tipe Mutasi</label>
                  <select
                    value={cashForm.tipe}
                    onChange={(e) => setCashForm({ ...cashForm, tipe: e.target.value as 'IN' | 'OUT' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  >
                    <option value="IN">Kas Masuk (Pendapatan)</option>
                    <option value="OUT">Kas Keluar (Belanja)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Unit Usaha</label>
                  <select
                    value={cashForm.unit}
                    onChange={(e) => setCashForm({ ...cashForm, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  >
                    {UNIT.map((u: any) => (
                      <option key={u.id} value={u.t}>{u.t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Nominal (Rp) *</label>
                <input
                  type="number"
                  required
                  value={cashForm.jumlah}
                  onChange={(e) => setCashForm({ ...cashForm, jumlah: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Uraian Keterangan *</label>
                <textarea
                  required
                  rows={3}
                  value={cashForm.keterangan}
                  onChange={(e) => setCashForm({ ...cashForm, keterangan: e.target.value })}
                  placeholder="Tulis rincian transaksi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCashModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat"
                >
                  Simpan Transaksi Kas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 6: FORM WARTA & BERITA DESA */}
      {/* ============================================================== */}
      {isWartaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-lg w-full border border-brand-krem-gelap dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-krem-gelap dark:border-slate-700">
              <h3 className="font-bold text-sm text-brand-cokelat dark:text-white">
                {editingWarta ? 'Edit Berita Warta' : 'Publikasi Berita Baru'}
              </h3>
              <button onClick={() => setIsWartaModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWarta} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Kategori Berita *</label>
                  <select
                    value={wartaForm.k}
                    onChange={(e) => setWartaForm({ ...wartaForm, k: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Usaha">Usaha</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Tanggal Terbit</label>
                  <input
                    value={wartaForm.d}
                    onChange={(e) => setWartaForm({ ...wartaForm, d: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Judul Artikel Warta *</label>
                <input
                  required
                  value={wartaForm.t}
                  onChange={(e) => setWartaForm({ ...wartaForm, t: e.target.value })}
                  placeholder="Contoh: Panen Perdana Hidroponik Ketahanan Pangan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Ringkasan Singkat (Muncul di Kartu) *</label>
                <textarea
                  required
                  rows={2}
                  value={wartaForm.ex}
                  onChange={(e) => setWartaForm({ ...wartaForm, ex: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk pratinjau..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Isi Berita Lengkap</label>
                <textarea
                  rows={4}
                  value={wartaForm.isi}
                  onChange={(e) => setWartaForm({ ...wartaForm, isi: e.target.value })}
                  placeholder="Tuliskan berita lengkap..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWartaModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat"
                >
                  Simpan & Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
export default Screen2_AdminDashboard;
