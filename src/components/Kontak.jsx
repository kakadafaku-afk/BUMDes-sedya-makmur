import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { kirimPesan } from "../services/api";
import { BUMDES } from "../data/bumdes";

/*
  Bagian Kontak & Aspirasi Warga.
  - Sisi Kiri: Informasi kontak resmi, direktur Mulyono, jam layanan, dan peta Google Maps Mayong Lor.
  - Sisi Kanan: Formulir pengiriman aspirasi/pertanyaan yang terhubung ke backend.
*/
export default function Kontak() {
  const [f, setF] = useState({ nama: "", kontak: "", pesan: "" });
  const [state, setState] = useState("idle"); // idle | loading | sent | error

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const kirim = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      await kirimPesan(f);
      setState("sent");
      setF({ nama: "", kontak: "", pesan: "" });
    } catch {
      setState("error");
    }
  };

  return (
    <section id="kontak" className="bg-brand-krem dark:bg-slate-900/60 py-24 border-t border-brand-krem-gelap dark:border-slate-800" aria-label="Kontak dan Lokasi">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-terakota mb-3">
            Layanan Warga
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-cokelat dark:text-white mb-4">
            Kontak & Lokasi Kantor
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Sampaikan saran, pemesanan kemitraan B2B, atau aspirasi pembangunan desa langsung kepada pengurus BUMDes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Sisi Kiri: Informasi Kantor & Google Maps */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-brand-krem-gelap dark:border-slate-700 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-brand-cokelat dark:text-white">
                Sekretariat BUMDes Sedya Makmur
              </h3>

              <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-terakota/15 text-brand-terakota flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-cokelat dark:text-white">Alamat</span>
                    <span>{BUMDES.alamat}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-terakota/15 text-brand-terakota flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-cokelat dark:text-white">Telepon / WhatsApp</span>
                    <a
                      href={`https://wa.me/${BUMDES.wa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-terakota hover:underline font-semibold"
                    >
                      {BUMDES.direktur} (Direktur) — {BUMDES.telp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-terakota/15 text-brand-terakota flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-cokelat dark:text-white">Email Resmi</span>
                    <a href={`mailto:${BUMDES.email}`} className="text-brand-terakota hover:underline">
                      {BUMDES.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-terakota/15 text-brand-terakota flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-cokelat dark:text-white">Jam Layanan</span>
                    <span>{BUMDES.jam}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Peta Google Maps Mayong Lor */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-brand-krem-gelap dark:border-slate-700 h-64">
              <iframe
                title="Peta Lokasi Mayong Lor"
                className="w-full h-full border-0"
                loading="lazy"
                src={BUMDES.mapsEmbed}
              />
            </div>
          </div>

          {/* Sisi Kanan: Form Kirim Pesan */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-8 border border-brand-krem-gelap dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-xl text-brand-cokelat dark:text-white mb-2">
              Kirim Aspirasi & Pertanyaan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Pengurus akan merespons pesan Anda sesegera mungkin pada jam kerja operasional.
            </p>

            {state === "sent" ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-base">
                  Pesan Berhasil Terkirim!
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Terima kasih atas partisipasi Anda. Pesan telah diteruskan ke buku catatan pengurus BUMDes Sedya Makmur.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-3 px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={kirim} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    required
                    value={f.nama}
                    onChange={set("nama")}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl border border-brand-krem-gelap dark:border-slate-600 bg-brand-krem/30 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-terakota text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp / Email *
                  </label>
                  <input
                    required
                    value={f.kontak}
                    onChange={set("kontak")}
                    placeholder="Contoh: 0812-xxxx-xxxx"
                    className="w-full px-4 py-3 rounded-xl border border-brand-krem-gelap dark:border-slate-600 bg-brand-krem/30 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-terakota text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Isi Pesan / Kebutuhan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={f.pesan}
                    onChange={set("pesan")}
                    placeholder="Tuliskan aspirasi, pesanan produk, atau pertanyaan Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-krem-gelap dark:border-slate-600 bg-brand-krem/30 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-terakota text-base sm:text-sm"
                  />
                </div>

                {state === "error" && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>Gagal mengirim pesan. Silakan periksa koneksi atau hubungi langsung via WhatsApp.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full py-3.5 rounded-xl bg-brand-terakota text-white font-bold hover:bg-brand-cokelat flex items-center justify-center gap-2 transition shadow-md disabled:opacity-60 min-h-[44px]"
                >
                  <Send size={16} />
                  <span>{state === "loading" ? "Mengirim Pesan..." : "Kirim Pesan Sekarang"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
