-- ====================================================================
-- MIGRASI BASIS DATA RESMI: BUMDes Sedya Makmur, Desa Mayong Lor
-- Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah
-- Disesuaikan dengan Peraturan Desa No. 7 Tahun 2014 & Akta Notaris Mulung Estu No. 14
-- ====================================================================

-- 1. PILIH ATAU BUAT DATABASE
CREATE DATABASE IF NOT EXISTS db_bumdes_sedya_makmur
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE db_bumdes_sedya_makmur;

-- 2. PENGHAPUSAN TABEL LAMA / RETRIBUSI AIR PAMSIMAS DENGAN AMAN
-- (BUMDes Sedya Makmur tidak memiliki unit usaha air perpipaan PAMSIMAS)
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS pamsimas_bills;
DROP TABLE IF EXISTS pamsimas_meter_readings;
DROP TABLE IF EXISTS pamsimas_connection_requests;
DROP TABLE IF EXISTS pamsimas_customers;
DROP TABLE IF EXISTS usp_installments;
DROP TABLE IF EXISTS usp_financing_applications;
DROP TABLE IF EXISTS usp_members;

SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================================
-- 3. PEMBUATAN TABEL INTI TATA KELOLA BUMDes SEDYA MAKMUR
-- ====================================================================

-- A. Tabel Unit Usaha (6 Unit Usaha Resmi)
CREATE TABLE IF NOT EXISTS unit_usaha (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode_unit VARCHAR(50) NOT NULL UNIQUE,
    nama_unit VARCHAR(150) NOT NULL,
    deskripsi TEXT NOT NULL,
    tahun_beroperasi INT NOT NULL DEFAULT 2016,
    badge_highlight VARCHAR(100) NULL,
    is_aktif BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- B. Tabel Struktur Pengurus BUMDes
CREATE TABLE IF NOT EXISTS pengurus (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jabatan VARCHAR(100) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    keterangan VARCHAR(255) NULL,
    urutan INT NOT NULL DEFAULT 1,
    is_aktif BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- C. Tabel Produk (Harga Bersifat Opsional/Nullable)
CREATE TABLE IF NOT EXISTS produk (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    unit_id INT UNSIGNED NOT NULL,
    kategori ENUM('Peternakan', 'Hortikultura', 'Gerabah & Arsitektur', 'Lainnya') NOT NULL,
    nama_produk VARCHAR(200) NOT NULL,
    deskripsi TEXT NULL,
    harga DECIMAL(15, 2) NULL COMMENT 'NULL jika harga opsional / tanyakan harga via WhatsApp',
    satuan VARCHAR(50) NULL,
    foto_url VARCHAR(255) NULL,
    is_aktif BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES unit_usaha(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- D. Tabel Paket Wisata Edukasi Desa
CREATE TABLE IF NOT EXISTS paket_wisata (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_paket VARCHAR(150) NOT NULL,
    deskripsi TEXT NOT NULL,
    durasi VARCHAR(50) NULL,
    min_peserta INT NULL,
    harga_per_orang DECIMAL(12, 2) NULL,
    is_aktif BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- E. Tabel Laporan Keuangan Tahunan & Setoran PAD
CREATE TABLE IF NOT EXISTS laporan_keuangan_tahunan (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tahun INT NOT NULL UNIQUE,
    total_pendapatan DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    pengeluaran DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    laba_bersih DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    setoran_pad_realisasi DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    status ENUM('Audited', 'Draft', 'Musdes') NOT NULL DEFAULT 'Audited',
    keterangan VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- F. Rincian Pendapatan per Unit Usaha
CREATE TABLE IF NOT EXISTS detail_pendapatan_tahunan (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    laporan_id INT UNSIGNED NOT NULL,
    unit_id INT UNSIGNED NOT NULL,
    pendapatan DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (laporan_id) REFERENCES laporan_keuangan_tahunan(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES unit_usaha(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- G. Tabel Pesan & Aspirasi Publik
CREATE TABLE IF NOT EXISTS pesan_aspirasi (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    kontak VARCHAR(100) NOT NULL,
    pesan TEXT NOT NULL,
    status ENUM('baru', 'diproses', 'selesai') NOT NULL DEFAULT 'baru',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- H. Tabel Buku Kas Umum (Pencatatan Mutasi Kas Harian)
CREATE TABLE IF NOT EXISTS buku_kas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nomor_transaksi VARCHAR(50) NOT NULL UNIQUE,
    tanggal DATE NOT NULL,
    unit_id INT UNSIGNED NOT NULL,
    tipe ENUM('IN', 'OUT') NOT NULL,
    jumlah DECIMAL(15, 2) NOT NULL,
    keterangan TEXT NOT NULL,
    petugas VARCHAR(100) NOT NULL DEFAULT 'Bendahara',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES unit_usaha(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- 4. SEEDING DATA AWAL RESMI (KONFIRMASI DOKUMEN BUMDES)
-- ====================================================================

-- 4.1. Unit Usaha
INSERT INTO unit_usaha (id, kode_unit, nama_unit, deskripsi, tahun_beroperasi, badge_highlight) VALUES
(1, 'SIMPAN_PINJAM', 'Simpan Pinjam', 'Dukungan modal usaha warga desa. Modal awal Rp 25 juta berkembang ke Rp 38 juta dengan 50+ nasabah.', 2016, '50+ nasabah terbantu'),
(2, 'BEKISTING', 'Persewaan Bekisting', 'Penyewaan bekisting untuk kebutuhan konstruksi bangunan warga dan pemborong sekitar Mayong Lor.', 2017, NULL),
(3, 'SEMBAKO_HORTIKULTURA', 'Perdagangan Sembako & Hortikultura', 'Supplier SPPG program Makan Bergizi Gratis (MBG), menyuplai sayur, tahu, dan buah lokal.', 2024, 'Supplier resmi MBG'),
(4, 'KANTIN_PABRIK', 'Kantin Karyawan Pabrik', 'Sejak Des 2025 mengelola kantin di PT. TBS Industrial Indo bersama Perkumpulan UMKM Jatrasmol.', 2025, 'Aktif sejak Des 2025'),
(5, 'GERABAH_ARSITEKTUR', 'Gerabah & Produk Arsitektur', 'Melestarikan produk unggulan lokal: gerabah hias, genteng, dan bata tempel Mayong Lor.', 2016, 'Produk lokal unggulan'),
(6, 'KETAHANAN_PANGAN', 'Ketahanan Pangan', 'Amanat Perdes sejak Feb 2026: pertanian hidroponik NFT, ternak kambing peranakan etawa, kebun terpadu.', 2026, 'Aktif sejak Feb 2026')
ON DUPLICATE KEY UPDATE nama_unit=VALUES(nama_unit);

-- 4.2. Pengurus BUMDes Sedya Makmur
INSERT INTO pengurus (id, jabatan, nama, keterangan, urutan) VALUES
(1, 'Direktur', 'Mulyono', 'Pejabat Operasional Tertinggi', 1),
(2, 'Penasihat', 'GANTI', 'Kepala Desa Mayong Lor (Ex-Officio)', 2),
(3, 'Sekretaris', 'GANTI', 'Administrasi & Notula', 3),
(4, 'Bendahara', 'GANTI', 'Tata Usaha Keuangan & Kas', 4),
(5, 'Pengawas', 'GANTI', 'Badan Permusyawaratan Desa (BPD)', 5)
ON DUPLICATE KEY UPDATE nama=VALUES(nama);

-- 4.3. Produk Awal (Harga NULL = Tanyakan Harga via WhatsApp)
INSERT INTO produk (unit_id, kategori, nama_produk, deskripsi, harga) VALUES
(6, 'Peternakan', 'Susu Kambing Etawa Segar', 'Susu segar kambing peranakan etawa dari peternakan terintegrasi BUMDes.', NULL),
(6, 'Hortikultura', 'Bibit Cabe Siap Tanam', 'Bibit cabe rawit dan keriting unggul siap tanam.', NULL),
(6, 'Hortikultura', 'Sayur Kale (siap berbuah)', 'Kale organik segar kaya nutrisi dari kebun BUMDes.', NULL),
(6, 'Hortikultura', 'Tomat Siap Berbuah', 'Tanaman tomat organik dalam polybag siap panen.', NULL),
(3, 'Hortikultura', 'Cabe & Sayuran Segar', 'Pasokan komoditas sayur dan cabe segar untuk SPPG dan dapur warga.', NULL),
(6, 'Hortikultura', 'Pupuk Organik & Media Tanam', 'Pupuk kompos dan media tanam fermentasi olahan mandiri.', NULL),
(6, 'Hortikultura', 'Selada & Pakcoy Hidroponik', 'Sayuran hidroponik NFT bebas pestisida kimia.', NULL),
(5, 'Gerabah & Arsitektur', 'Remitan & Gerabah Hias', 'Kriya tanah liat khas Mayong Lor dengan ornamen tradisional.', NULL),
(5, 'Gerabah & Arsitektur', 'Celengan & Kendi Tanah Liat', 'Celengan dan kendi tanah liat klasik buatan tangan.', NULL),
(5, 'Gerabah & Arsitektur', 'Genteng & Bata Tempel', 'Produk arsitektur tahan cuaca produksi sentra Mayong Lor.', NULL);

-- 4.4. Paket Wisata Edukasi
INSERT INTO paket_wisata (id, nama_paket, deskripsi, durasi, min_peserta) VALUES
(1, 'Wisata Pertanian & Peternakan', 'Kunjungan edukasi kandang kambing etawa dan kebun hidroponik.', '3 Jam', 10),
(2, 'Cooking Class Produk Lokal', 'Praktik memasak kuliner desa bersama pegiat UMKM Jatrasmol.', '3 Jam', 10),
(3, 'Edukasi Gerabah & Kerajinan', 'Belajar teknik memutar tanah liat bersama perajin gerabah senior Mayong Lor.', '2 Jam', 10)
ON DUPLICATE KEY UPDATE nama_paket=VALUES(nama_paket);

-- 4.5. Laporan Keuangan Tahunan & Setoran PAD
INSERT INTO laporan_keuangan_tahunan (tahun, total_pendapatan, pengeluaran, laba_bersih, setoran_pad_realisasi, status, keterangan) VALUES
(2024, 55600000, 36800000, 18800000, 10000000, 'Audited', 'Laporan Tutup Buku Tahun Anggaran 2024'),
(2025, 69500000, 44200000, 25300000, 12500000, 'Audited', 'Laporan Tutup Buku Tahun Anggaran 2025')
ON DUPLICATE KEY UPDATE total_pendapatan=VALUES(total_pendapatan);

