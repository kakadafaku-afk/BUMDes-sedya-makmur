import React from "react";
import { BUMDES } from "../../data/bumdes";

/*
  Logo Resmi BUMDes Sedya Makmur, Desa Mayong Lor.
  Menggabungkan elemen:
  - Lambang terakota (kriya gerabah khas Mayong Lor)
  - Daun hijau (pertanian & ketahanan pangan)
  - Monogram huruf "S" (Sedya Makmur)
*/
export default function Logo({ variant = "auto", size = "md", showText = true }) {
  // size: 'sm' | 'md' | 'lg'
  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-xl",
    lg: "w-12 h-12 text-2xl",
  };

  const titleSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const subSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-xs",
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Emblem Simbolik */}
      <div
        className={`relative ${sizeClasses[size] || sizeClasses.md} rounded-2xl bg-gradient-to-br from-brand-terakota via-[#A04523] to-brand-cokelat flex items-center justify-center font-black text-white shadow-md border border-white/20 shrink-0 overflow-hidden group`}
      >
        {/* Ornamen Daun / Aksen Hijau */}
        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand-hijau rounded-bl-xl opacity-90" />
        
        {/* Monogram S */}
        <span className="relative z-10 font-extrabold tracking-tighter drop-shadow-xs">
          S
        </span>

        {/* Lingkaran halus latar */}
        <div className="absolute inset-0 bg-radial-gradient from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Teks Identitas Desa */}
      {showText && (
        <div className="text-left leading-tight">
          <span
            className={`block font-extrabold tracking-tight ${titleSizes[size] || titleSizes.md} ${
              variant === "white"
                ? "text-white"
                : variant === "dark"
                ? "text-brand-cokelat dark:text-white"
                : "text-current"
            }`}
          >
            {BUMDES.singkatan}
          </span>
          <span
            className={`block font-medium ${subSizes[size] || subSizes.md} opacity-75 ${
              variant === "white"
                ? "text-white/80"
                : variant === "dark"
                ? "text-brand-cokelat/70 dark:text-slate-300"
                : "text-current opacity-70"
            }`}
          >
            {BUMDES.desa}, {BUMDES.kab}
          </span>
        </div>
      )}
    </div>
  );
}

