import React, { useState, useEffect } from "react";

export function useCounter(target) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let s = null;
    let raf;
    const f = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / 1200, 1);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return n;
}

export function Heading({ kicker, title, sub }) {
  return (
    <div className="max-w-2xl mb-10">
      <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">{kicker}</span>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold">{title}</h2>
      {sub && <p className="mt-3 text-slate-600 dark:text-slate-400">{sub}</p>}
    </div>
  );
}

export const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500";
