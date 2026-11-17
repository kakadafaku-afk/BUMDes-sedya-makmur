import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  BellRing, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';
import type { NewsArticle, VillageEvent } from '../../types/public';
import { formatDate } from '../../utils/formatters';

interface NewsEventsSectionProps {
  news: NewsArticle[];
  events: VillageEvent[];
  onReadMoreNews: (slug: string) => void;
}

export const NewsEventsSection: React.FC<NewsEventsSectionProps> = ({
  news,
  events,
  onReadMoreNews,
}) => {
  const [waNumber, setWaNumber] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waNumber.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setWaNumber('');
    }, 2000);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Kolom Berita Terkini (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F5132]">
                  Warta Pembangunan Desa
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Kabar & Informasi BUMDes Terkini
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onReadMoreNews(item.slug)}
                  className="bg-slate-50 hover:bg-emerald-50/50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col sm:flex-row gap-4 cursor-pointer group"
                >
                  <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {formatDate(item.published_at)}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
                        {item.category.replace('_', ' ')}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0F5132] transition-colors line-clamp-2 mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60">
                      <span>Penulis: {item.author_name}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {item.views_count} pembaca
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Agenda Desa & WhatsApp Hotline (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                Jadwal & Agenda Terdekat
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Agenda Kegiatan Desa
              </h3>
            </div>

            <div className="space-y-3.5">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-[#0F5132] transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-[#0F5132] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {ev.organizer}
                    </span>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                      Mendatang
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {ev.title}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#0F5132]" />
                      {ev.event_start} WIB
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                      {ev.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Notification Box */}
            <div className="p-5 rounded-2xl bg-[#0F5132] text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-amber-300" />
                <h4 className="text-sm font-bold text-white">
                  Berlangganan Warta Desa via WhatsApp
                </h4>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Dapatkan notifikasi jadwal pemeliharaan pipa PAM, jadwal angsuran USP, dan info pembukaan kuota pelatihan kriya langsung di nomor Anda.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    placeholder="Nomor WhatsApp (08xxxx)"
                    className="flex-1 px-3 py-2 rounded-xl text-xs bg-white text-slate-900 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 transition-colors"
                  >
                    Daftar
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] text-amber-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Nomor berhasil didaftarkan ke grup warta kedinasan BUMDes!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
