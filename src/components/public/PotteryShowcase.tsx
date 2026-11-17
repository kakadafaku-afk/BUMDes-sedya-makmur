import React, { useState } from 'react';
import { 
  Sparkles, 
  Package, 
  Clock, 
  Truck, 
  FileCheck, 
  Info 
} from 'lucide-react';
import type { PotteryProduct, PotteryCategory } from '../../types/catalog';
import { formatRupiah } from '../../utils/formatters';

interface PotteryShowcaseProps {
  products: PotteryProduct[];
  categories: PotteryCategory[];
  onOpenOrderModal: (product: PotteryProduct) => void;
  onOpenDetailModal: (product: PotteryProduct) => void;
}

export const PotteryShowcase: React.FC<PotteryShowcaseProps> = ({
  products,
  categories,
  onOpenOrderModal,
  onOpenDetailModal,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);

  const filteredProducts =
    activeCategoryId === 1
      ? products
      : products.filter((p) => p.category_id === activeCategoryId);

  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/20 text-xs font-bold text-[#C85A32]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>E-Katalog Resmi Kriya Terakota Mayong Lor</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Showcase Produk Unggulan & Pengadaan B2B
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dibuat langsung oleh maestro pengrajin lokal dari tanah liat super alami Mayong Lor. Siap memenuhi pesanan skala besar (kontrak instansi kedinasan, lansekap hotel, vila, dan jaringan coffee shop).
            </p>
          </div>

          {/* Quick Notice Badge */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 shrink-0 max-w-sm">
            <div className="flex items-center gap-1.5 font-bold text-[#0F5132]">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>Faktur Pajak & Legalitas BUMDes</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Setiap transaksi B2B disertai invoice resmi berstempel dan sertifikat mutu tanah liat.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-100 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategoryId === cat.id
                  ? 'bg-[#0F5132] text-white shadow-md shadow-emerald-950/15'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Visual */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={product.image_urls[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* SKU Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-700 font-mono text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {product.sku}
                </span>

                {/* B2B Ready Pill */}
                {product.is_b2b_available && (
                  <span className="absolute top-3 right-3 bg-[#C85A32] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Siap Order B2B
                  </span>
                )}

                {/* Capacity Overlay at bottom of image */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-medium text-white/95 bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  <span className="flex items-center gap-1">
                    <Package className="w-3 h-3 text-amber-300" />
                    Kapasitas: {product.production_capacity_monthly} pcs/bln
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-300" />
                    Lead Time: {product.lead_time_days} hari
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {product.category_name}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F5132] transition-colors mt-0.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Dimensions & Specs */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[11px]">Dimensi:</span>
                    <span className="font-semibold text-slate-800">{product.dimensions}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[11px]">Bahan:</span>
                    <span className="font-semibold text-slate-800 truncate ml-2">{product.material}</span>
                  </div>
                </div>

                {/* Pricing Box: Retail vs Wholesale */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Harga Satuan (Eceran):</span>
                    <span className="text-xs font-semibold text-slate-600 line-through">
                      {formatRupiah(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C85A32] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Harga Grosir B2B:
                    </span>
                    <span className="text-base font-extrabold text-[#0F5132]">
                      {formatRupiah(product.b2b_wholesale_price)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 text-right">
                    *Min. order B2B: {product.min_b2b_qty} unit
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenDetailModal(product)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Detail</span>
                  </button>

                  <button
                    onClick={() => onOpenOrderModal(product)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0F5132] hover:bg-[#0b3e26] shadow-xs shadow-emerald-950/20 transition-all flex items-center justify-center gap-1"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-amber-300" />
                    <span>Pesan B2B</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
