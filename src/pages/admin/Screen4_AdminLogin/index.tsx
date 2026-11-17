import React, { useState } from 'react';
import { Lock, LogIn, ShieldCheck, ArrowLeft } from 'lucide-react';
import { BUMDES } from '../../../data/bumdes';

interface Screen4Props {
  onSuccessLogin: () => void;
  onBackToPublic: () => void;
}

export const Screen4_AdminLogin: React.FC<Screen4Props> = ({
  onSuccessLogin,
  onBackToPublic,
}) => {
  const [nik, setNik] = useState('3320091204850001');
  const [password, setPassword] = useState('SecretPassword2026!');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nik.trim() && password.trim()) {
      onSuccessLogin();
    } else {
      setError('Harap isi NIK dan kata sandi kedinasan Anda.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-brand-krem-gelap dark:border-slate-700 shadow-xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-terakota text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-cokelat dark:text-white tracking-tight">
            Masuk Panel Pengurus
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sistem Administrasi {BUMDES.nama}, {BUMDES.desa}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-brand-krem/70 dark:bg-slate-700/50 border border-brand-krem-gelap dark:border-slate-600 text-xs text-brand-cokelat dark:text-slate-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-brand-terakota">
            <ShieldCheck className="w-4 h-4 text-brand-terakota" />
            <span>Koneksi Aman & Terdaftar Kedinasan</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            Akses diaudit berbasis NIK sesuai tata kelola BUMDes berbadan hukum.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nomor Induk Kependudukan (NIK)
            </label>
            <input
              type="text"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-terakota"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Kata Sandi Kedinasan
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-terakota"
              required
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Dasbor BUMDes</span>
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onBackToPublic}
            className="text-xs font-semibold text-slate-500 hover:text-brand-terakota transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Web Publik</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Screen4_AdminLogin;
