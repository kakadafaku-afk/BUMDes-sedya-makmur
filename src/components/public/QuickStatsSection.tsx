import React from 'react';
import { 
  Droplets, 
  Sparkles, 
  Coins, 
  Compass
} from 'lucide-react';

interface QuickStatsSectionProps {
  onSelectService?: (code: string) => void;
}

export const QuickStatsSection: React.FC<QuickStatsSectionProps> = ({ onSelectService }) => {
  const highlights = [
    {
      code: 'KRIYA_GERABAH',
      icon: <Sparkles className="w-5 h-5 text-[#C85A32]" />,
      bgIcon: 'bg-orange-50',
      title: 'Kriya Terakota',
      desc: 'Pot, guci & hiasan tanah liat hasil karya perajin Mayong Lor.',
    },
    {
      code: 'PAMSIMAS',
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      bgIcon: 'bg-blue-50',
      title: 'Air Bersih PAM',
      desc: 'Distribusi air perpipaan higienis dan mudah cek tagihan.',
    },
    {
      code: 'USP_SYARIAH',
      icon: <Coins className="w-5 h-5 text-emerald-700" />,
      bgIcon: 'bg-emerald-50',
      title: 'Modal Syariah',
      desc: 'Dukungan modal kerja usaha pasar tanpa sistem bunga.',
    },
    {
      code: 'DESA_WISATA',
      icon: <Compass className="w-5 h-5 text-amber-600" />,
      bgIcon: 'bg-amber-50',
      title: 'Eduwisata Desa',
      desc: 'Pengalaman langsung belajar memutar gerabah tradisional.',
    },
  ];

  return (
    <section className="relative -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item) => (
          <div
            key={item.code}
            onClick={() => onSelectService && onSelectService(item.code)}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${item.bgIcon} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F5132] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
