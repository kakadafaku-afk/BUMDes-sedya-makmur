import React from 'react';
import { 
  ShieldCheck, 
  Landmark, 
  Award, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { mockBumdesProfile, mockOrganizationStructures, mockBusinessUnits } from '../../../services/mockData/businessUnitsData';

interface Screen8Props {
  onNavigateToCatalog: () => void;
  onNavigateToTransparency: () => void;
}

export const Screen8_BumdesProfile: React.FC<Screen8Props> = ({
  onNavigateToCatalog,
  onNavigateToTransparency,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8FF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero Section */}
        <div className="bg-gradient-to-br from-[#0F5132] to-[#092d1c] text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Profil Resmi Korporasi Desa Berbadan Hukum Penuh</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Profil BUMDes Mayong Lor Mandiri
            </h1>
            <p className="text-base text-emerald-100/90 leading-relaxed font-normal">
              {mockBumdesProfile.tagline}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Award className="w-4 h-4 text-amber-300" />
                SK Kemendes: {mockBumdesProfile.no_badan_hukum_kemendes}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Landmark className="w-4 h-4 text-emerald-300" />
                {mockBumdesProfile.sk_pendirian_desa}
              </span>
            </div>
          </div>
        </div>

        {/* Visi, Misi & Dasar Hukum */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visi */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F5132] bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              Visi Utama Desa Mandiri
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Transformasi Ekonomi Berkelanjutan
            </h3>
            <p className="text-sm text-slate-700 italic leading-relaxed bg-slate-50 p-4 rounded-2xl border-l-4 border-[#0F5132]">
              "{mockBumdesProfile.visi}"
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Landasan Regulasi Nasional
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <span>PP No. 11 Tahun 2021 tentang BUMDes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <span>Permendesa PDTT No. 3 Tahun 2021 (Pendaftaran Badan Hukum)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <span>Peraturan Desa Mayong Lor No. 04 Tahun 2020</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Misi */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] bg-orange-50 px-3 py-1 rounded-md border border-orange-200">
              4 Pilar Misi Strategis
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Agenda Aksi Pemberdayaan Masyarakat
            </h3>

            <div className="space-y-3 pt-2">
              {mockBumdesProfile.misi.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0F5132] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {m}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sejarah & Transformasi Kriya */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F5132]">
              Latar Belakang & Warisan Budaya
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sejarah Sentra Gerabah & Transformasi Menjadi BUMDes
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {mockBumdesProfile.sejarah_singkat}
          </p>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between flex-wrap gap-3">
            <span>
              Ingin menelusuri katalog kerajinan gerabah Mayong Lor untuk proyek atau pengadaan instansi?
            </span>
            <button
              onClick={onNavigateToCatalog}
              className="px-4 py-2 rounded-xl bg-[#0F5132] hover:bg-[#0b3e26] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Buka E-Katalog Kriya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Struktur Organisasi Kepengurusan */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] bg-[#C85A32]/10 px-3 py-1 rounded-full border border-[#C85A32]/20">
              Tata Kelola Transparan
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Struktur Kepengurusan & Dewan Pengawas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kolaborasi harmonis antara Pemerintah Desa, Badan Permusyawaratan Desa (BPD), Direksi Profesional, dan Manajer Teknis Unit Usaha.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockOrganizationStructures.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={org.photo_url}
                    alt={org.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 text-[#0F5132] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {org.category.replace('_', ' ')}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-bold text-white drop-shadow-xs truncate">
                      {org.name}
                    </p>
                    <p className="text-xs text-amber-300 font-medium truncate">
                      {org.position_title}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Aktif Menjabat
                  </span>
                  <span className="text-slate-400">Periode 2024–2029</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan 4 Pilar Bisnis */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                4 Pilar Unit Bisnis Desa Mayong Lor
              </h3>
              <p className="text-xs text-slate-500">
                Pilar penggerak ekonomi, utilitas air, inklusi syariah, dan eduwisata
              </p>
            </div>
            <button
              onClick={onNavigateToTransparency}
              className="text-xs font-bold text-[#0F5132] hover:underline flex items-center gap-1"
            >
              Lihat Laporan Transparansi Keuangan BUMDes →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBusinessUnits.map((u) => (
              <div
                key={u.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0F5132] transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{u.name}</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {u.stat_highlight}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {u.description}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200">
                  <span>PIC: {u.manager_name}</span>
                  <span className="text-[#0F5132] font-semibold">{u.contact_phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
