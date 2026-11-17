import React, { useState } from "react";
import { Search, Package, MessageCircle } from "lucide-react";
import { BUMDES, KATALOG, KATEGORI_KATALOG, rupiah } from "../data/bumdes";
import { Heading } from "./common";

export default function Katalog() {
  const [kat, setKat] = useState("Semua");
  const [q, setQ] = useState("");

  const list = KATALOG.filter(
    (p) => (kat === "Semua" || p.kat === kat) && p.nama.toLowerCase().includes(q.toLowerCase())
  );

  const pesan = (p) =>
    `https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(`Halo ${BUMDES.nama}, saya tertarik dengan produk "${p.nama}". Apakah masih tersedia?`)}`;

  return (
    <section id="katalog" className="bg-white dark:bg-slate-800/50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <Heading kicker="E-Katalog" title="Produk Kriya Desa" sub="Karya perajin Mayong Lor. Pilih produk, lalu pesan langsung lewat WhatsApp." />

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {KATEGORI_KATALOG.map((k) => (
              <button
                key={k}
                onClick={() => setKat(k)}
                className={`px-4 py-1.5 text-sm rounded-full border transition ${
                  kat === k
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari produk..."
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <article key={p.id} className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition">
              <div className="h-44 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 grid place-items-center text-amber-700 dark:text-amber-300">
                {p.foto ? (
                  <img src={p.foto} alt={p.nama} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <Package size={40} />
                )}
              </div>
              <div className="p-5">
                <span className="text-xs text-emerald-600 dark:text-emerald-400">{p.kat}</span>
                <h3 className="font-semibold">{p.nama}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mulai {rupiah(p.harga)}</p>
                <a
                  href={pesan(p)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                >
                  <MessageCircle size={16} /> Pesan via WhatsApp
                </a>
              </div>
            </article>
          ))}
          {list.length === 0 && <p className="col-span-full text-center text-slate-500 py-10">Produk tidak ditemukan.</p>}
        </div>
      </div>
    </section>
  );
}
