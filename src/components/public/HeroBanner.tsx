import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Droplet, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Heart
} from 'lucide-react';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onOpenPamCheck: () => void;
  onViewTransparency: () => void;
}

const heroSlides = [
  {
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    caption: 'Pengrajin Mayong Lor',
    subcaption: 'Ketekunan tangan terampil merawat warisan gerabah',
  },
  {
    url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80',
    caption: 'Pot Terakota Alami',
    subcaption: 'Sentuhan hangat tanah liat untuk hunian dan kafe',
  },
  {
    url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Koleksi Kriya Meja',
    subcaption: 'Estetika rustic khas pesisir Jepara',
  },
  {
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tungku Tradisional',
    subcaption: 'Pembakaran alami dengan kayu asam jawa',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCatalog,
  onOpenPamCheck,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f3f9f5] via-[#FAF8FF] to-[#FAF8FF] pt-8 pb-14 lg:pt-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Sisi Kiri: Teks Hangat & Menyambut */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Friendly Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/80 text-xs font-semibold text-[#0F5132]">
              <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-pulse" />
              <span>BUMDes Mayong Lor • Jepara</span>
            </div>

            {/* Headline Ramah & Menyapa */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Tumbuh Bersama Warga,{' '}
                <span className="text-[#0F5132] inline-block">
                  Merawat Kriya Desa
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Selamat datang di portal resmi BUMDes Mayong Lor. Kami hadir melayani kebutuhan air bersih warga, permodalan usaha kecil, dan menghadirkan keindahan gerabah tanah liat untuk Anda dan mitra usaha.
              </p>
            </div>

            {/* Tombol Sederhana & Ringkas */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0F5132] hover:bg-[#0b3e26] shadow-sm hover:shadow-md transition-all group"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>E-Katalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenPamCheck}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#0F5132] bg-white hover:bg-emerald-50 border border-emerald-200 shadow-2xs transition-all"
              >
                <Droplet className="w-4 h-4 text-blue-600 fill-blue-600/30" />
                <span>Cek Tagihan PAM</span>
              </button>
            </div>

            {/* Catatan Kaki Ringan */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <Heart className="w-3.5 h-3.5 text-[#C85A32] fill-[#C85A32]/20" />
              <span>Melayani warga dan pengadaan skala kecil maupun besar</span>
            </div>
          </div>

          {/* Sisi Kanan: Image Slider Estetis Tanpa Metrik Rumit */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-200/80 bg-slate-100 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
              
              {/* Gambar Slides */}
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.caption}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle Gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Minimalist Caption */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <p className="text-xs font-semibold text-amber-300">
                      {slide.caption}
                    </p>
                    <p className="text-sm font-medium text-white/95">
                      {slide.subcaption}
                    </p>
                  </div>
                </div>
              ))}

              {/* Slider Controls (Prev / Next Buttons) */}
              <button
                onClick={prevSlide}
                aria-label="Foto Sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Foto Selanjutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots Indicators */}
              <div className="absolute bottom-3 right-5 z-20 flex items-center gap-1.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentSlide
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
