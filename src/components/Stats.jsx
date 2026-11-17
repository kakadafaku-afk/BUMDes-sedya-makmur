import { useEffect, useRef, useState } from "react";
import { UNIT, PRODUK, PAKET_WISATA } from "../data/bumdes";

/*
  Bar stat yang menumpuk di bawah hero (-mt-12).
  4 angka dihitung langsung dari data, bukan dikodekan keras.
  Animasi hitung naik saat masuk ke viewport.
*/
function useCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === 0) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function Stat({ target, label, suffix = "" }) {
  const { count, ref } = useCounter(target);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-3 sm:px-6 py-4 sm:py-5">
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-terakota tabular-nums">
        {count}{suffix}
      </span>
      <span className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  // Semua angka dihitung dari data sumber, bukan dikodekan keras
  const jumlahUnit   = UNIT.length;
  const jumlahProduk = PRODUK.length;
  const jumlahPaket  = PAKET_WISATA.length;

  return (
    <section
      aria-label="Ringkasan statistik BUMDes"
      className="relative z-10 max-w-4xl mx-auto -mt-12 px-4"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-brand-krem-gelap
        dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0
        divide-brand-krem-gelap dark:divide-slate-700 overflow-hidden">
        <Stat target={jumlahUnit}  label="Unit Usaha" />
        <Stat target={jumlahProduk} label="Produk" />
        <Stat target={jumlahPaket} label="Paket Wisata" />
        {/* Tahun beroperasi — statis, bukan animasi hitung */}
        <div className="flex flex-col items-center text-center px-3 sm:px-6 py-4 sm:py-5">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-terakota">
            2016
          </span>
          <span className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Beroperasi sejak
          </span>
        </div>
      </div>
    </section>
  );
}
