import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Eye, 
  ArrowRight 
} from 'lucide-react';
import { mockNewsArticles, mockGalleries, mockVillageEvents } from '../../../services/mockData/newsEventsData';
import { formatDate } from '../../../utils/formatters';

export const Screen5_NewsGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'berita' | 'galeri' | 'agenda'>('berita');

  const filteredNews = mockNewsArticles;

  return (
    <div className="min-h-screen bg-[#FAF8FF] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-xs font-bold text-[#0F5132]">
            <span>Warta & Dokumentasi Kegiatan Desa Mayong Lor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kabar Desa, Galeri Kriya & Agenda Kegiatan
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Ikuti perkembangan terkini pembangunan utilitas air bersih, kemajuan sentra kerajinan gerabah, dan agenda kebersamaan warga Mayong Lor.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('berita')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'berita'
                ? 'bg-[#0F5132] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Warta Terkini
          </button>
          <button
            onClick={() => setActiveTab('galeri')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'galeri'
                ? 'bg-[#0F5132] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Galeri Foto Dokumentasi
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'agenda'
                ? 'bg-[#0F5132] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Agenda Kegiatan Desa
          </button>
        </div>

        {/* Tab 1: Berita */}
        {activeTab === 'berita' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={article.thumbnail_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded text-[#C85A32]">
                      {article.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[11px] text-slate-400">
                        {formatDate(article.published_at)} • {article.author_name}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {article.views_count}
                      </span>
                      <button
                        onClick={() => alert(`Membaca Berita Lengkap:\n\n${article.title}\n\n${article.content}`)}
                        className="font-bold text-[#0F5132] hover:underline flex items-center gap-1"
                      >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Galeri Foto */}
        {activeTab === 'galeri' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGalleries.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={img.media_url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-amber-300 font-semibold block">
                      {img.event_date}
                    </span>
                    <h4 className="text-sm font-bold text-white drop-shadow-xs">
                      {img.title}
                    </h4>
                  </div>
                </div>
                <div className="p-3.5 text-xs text-slate-600">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Agenda Desa */}
        {activeTab === 'agenda' && (
          <div className="space-y-4 max-w-3xl">
            {mockVillageEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#0F5132] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ev.organizer}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {ev.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-slate-600 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#0F5132]" /> {ev.event_start} WIB
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32]" /> {ev.location}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Pengingat agenda "${ev.title}" telah ditambahkan.`)}
                  className="px-4 py-2 rounded-xl bg-[#0F5132] text-white font-bold text-xs hover:bg-[#0b3e26] shrink-0"
                >
                  Simpan Agenda
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
