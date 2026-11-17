import React from 'react';
import { 
  Sparkles, 
  Droplets, 
  Coins, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  UserCheck 
} from 'lucide-react';
import type { BusinessUnit } from '../../types/businessUnits';

interface BusinessUnitsGridProps {
  units: BusinessUnit[];
  onSelectUnit: (code: string) => void;
}

export const BusinessUnitsGrid: React.FC<BusinessUnitsGridProps> = ({ 
  units, 
  onSelectUnit 
}) => {
  const getIcon = (code: string) => {
    switch (code) {
      case 'KRIYA_GERABAH':
        return <Sparkles className="w-6 h-6 text-[#C85A32]" />;
      case 'PAMSIMAS':
        return <Droplets className="w-6 h-6 text-blue-600" />;
      case 'USP_SYARIAH':
        return <Coins className="w-6 h-6 text-emerald-700" />;
      case 'DESA_WISATA':
        return <Compass className="w-6 h-6 text-amber-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0F5132]" />;
    }
  };

  const getBorderHover = (code: string) => {
    switch (code) {
      case 'KRIYA_GERABAH':
        return 'hover:border-[#C85A32]';
      case 'PAMSIMAS':
        return 'hover:border-blue-400';
      case 'USP_SYARIAH':
        return 'hover:border-emerald-500';
      case 'DESA_WISATA':
        return 'hover:border-amber-400';
      default:
        return 'hover:border-[#0F5132]';
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] bg-[#C85A32]/10 px-3 py-1 rounded-full border border-[#C85A32]/20">
          Struktur Pilar Bisnis Desa
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          4 Unit Usaha Mandiri BUMDes Mayong Lor
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Mengintegrasikan potensi kriya budaya lokal, utilitas dasar air bersih warga, inklusi keuangan syariah, dan pariwisata edukatif dalam satu tata kelola profesional.
        </p>
      </div>

      {/* Grid of 4 Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {units.map((unit) => (
          <div
            key={unit.id}
            className={`bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${getBorderHover(unit.code)}`}
          >
            {/* Top Cover Visual */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={unit.cover_image_url}
                alt={unit.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              
              {/* Unit Code Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#0F5132] text-xs font-bold px-3 py-1 rounded-lg shadow-xs flex items-center gap-1.5">
                {getIcon(unit.code)}
                <span>{unit.name}</span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Operasional Aktif</span>
              </div>

              {/* Bottom Cover Title */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  {unit.stat_highlight}
                </p>
                <h3 className="text-lg font-bold text-white drop-shadow-xs">
                  {unit.tagline}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {unit.description}
              </p>

              {/* Manager & Contact */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Manajer: {unit.manager_name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                  <span className="truncate">{unit.contact_phone}</span>
                </div>
              </div>

              {/* Button Action */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectUnit(unit.code)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#0F5132] bg-emerald-50 hover:bg-[#0F5132] hover:text-white transition-all group"
                >
                  <span>Buka Layanan & Detail Unit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

