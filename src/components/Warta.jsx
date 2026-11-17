import React, { useState } from "react";
import { Newspaper, ChevronRight, X, Calendar, Tag } from "lucide-react";
import { WARTA, KATEGORI_WARTA } from "../data/bumdes";

/*
  Bagian Warta BUMDes Sedya Makmur.
  - Tampil hanya jika admin sudah mengisi berita (WARTA.length > 0).
  - Dilengkapi dialog baca selengkapnya yang ramah pembaca desa.
*/
export default function Warta() {
  const [kat, setKat] = useState("Semua");
  const [activeItem, setActiveItem] = useState(null);

  if (!WARTA || WARTA.length === 0) {
    return null;
  }

  const list = WARTA.filter((b) => kat === "Semua" || b.k === kat);

  return (
    <section id="warta" className="py-24 bg-white dark:bg-slate-900 border-t border-brand-krem-gelap dark:border-slate-800" aria-label="Warta dan Kabar BUMDes">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-terakota mb-3">
            Kabar Desa
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-cokelat dark:text-white mb-4">
            Warta & Kegiatan BUMDes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Informasi perkembangan unit usaha, kerja sama kemitraan, dan kegiatan pemberdayaan warga.
          </p>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="group" aria-label="Filter warta">
          {KATEGORI_WARTA.map((k) => (
            <button
              key={k}
              onClick={() => setKat(k)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all min-h-[40px] ${
                kat === k
                  ? "bg-brand-terakota text-white shadow-sm"
                  : "bg-brand-krem dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-brand-krem-gelap dark:border-slate-700 hover:border-brand-terakota hover:text-brand-terakota"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Grid Artikel Warta */}
        <div className="grid md:grid-cols-3 gap-6">
          {list.map((b) => (
            <article
              key={b.t}
              className="rounded-2xl overflow-hidden bg-brand-krem/40 dark:bg-slate-800 border border-brand-krem-gelap dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="h-40 bg-gradient-to-br from-brand-cokelat via-brand-terakota to-[#943d1e] grid place-items-center text-white/80">
                <Newspaper size={36} />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs mb-3 text-slate-500 dark:text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-terakota/15 text-brand-terakota font-semibold">
                      {b.k}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {b.d}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-brand-cokelat dark:text-white leading-snug mb-2">
                    {b.t}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {b.ex}
                  </p>
                </div>
                <button
                  onClick={() => setActiveItem(b)}
                  className="mt-5 text-sm font-bold text-brand-terakota hover:text-brand-cokelat dark:hover:text-[#F5C98A] flex items-center gap-1 transition-colors self-start min-h-[40px]"
                >
                  Baca selengkapnya <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
          {list.length === 0 && (
            <p className="col-span-full text-center text-slate-500 py-10">
              Belum ada warta di kategori ini.
            </p>
          )}
        </div>
      </div>

      {/* Modal Dialog Warta Lengkap */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-brand-krem-gelap dark:border-slate-700 relative animate-count-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs text-brand-terakota font-bold uppercase tracking-wider mb-2">
              <Tag size={14} />
              <span>{activeItem.k}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">{activeItem.d}</span>
            </div>
            <h3 className="text-xl font-bold text-brand-cokelat dark:text-white mb-4 leading-snug">
              {activeItem.t}
            </h3>
            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p>{activeItem.ex}</p>
              {activeItem.isi && <p>{activeItem.isi}</p>}
            </div>
            <div className="mt-6 pt-4 border-t border-brand-krem-gelap dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 rounded-xl bg-brand-terakota text-white font-semibold text-sm hover:bg-brand-cokelat transition min-h-[44px]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
