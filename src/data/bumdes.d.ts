export declare const BUMDES: {
  nama: string;
  singkatan: string;
  desa: string;
  kec: string;
  kab: string;
  prov: string;
  alamat: string;
  jam: string;
  direktur: string;
  telp: string;
  wa: string;
  email: string;
  slogan1: string;
  slogan2: string;
  footerPenutup: string;
  mapsEmbed: string;
};

export declare const NAV: Array<{ id: string; label: string }>;

export declare const PROFIL: {
  perdes: string;
  aktaNotaris: string;
  nomorAkta: string;
  tanggalAkta: string;
  tanggalBeroperasi: string;
  modalAwal: number;
  jumlahUnit: number;
  padMulaiTahun: number;
  proyeksiPAD2026: number;
  visi: string;
  misi: string[];
};

export declare const PENGURUS: Array<{
  jabatan: string;
  nama: string;
  keterangan: string;
}>;

export declare const UNIT: Array<{
  id: string;
  icon: any;
  t: string;
  d: string;
  highlight: string | null;
}>;

export declare const KATEGORI_PRODUK: string[];

export declare const PRODUK: Array<{
  id: number;
  nama: string;
  kat: string;
  harga: number | null;
  unit?: string;
  foto: string | null;
  icon?: any;
  deskripsi?: string;
}>;

export declare const PAKET_WISATA: Array<{
  id: number;
  nama: string;
  deskripsi: string;
  icon?: any;
  durasi?: string;
  minPeserta?: string;
}>;

export declare const KAS_TEMPLATE: any;

export declare const KATEGORI_WARTA: string[];

export declare const WARTA: Array<{
  k: string;
  t: string;
  d: string;
  ex: string;
  isi?: string;
}>;

export declare function rupiah(n: number | string): string;
export declare function juta(n: number | string): string;

export declare const SOSMED: Array<{
  nama: string;
  url: string;
  handle: string;
}>;

export declare function cekStatusOperasional(): {
  buka: boolean;
  label: string;
  detail: string;
  badgeColor: string;
};

