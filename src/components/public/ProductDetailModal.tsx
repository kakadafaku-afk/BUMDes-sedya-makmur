import React from 'react';
import { 
  X, 
  FileCheck 
} from 'lucide-react';
import type { PotteryProduct } from '../../types/catalog';
import { formatRupiah, formatNumber } from '../../utils/formatters';

interface ProductDetailModalProps {
  product: PotteryProduct;
  onClose: () => void;
  onOrderNow: (product: PotteryProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOrderNow,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
            {product.sku}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Visual */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-[#C85A32] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
              Sentra Mayong Lor
            </div>
          </div>

          {/* Title & Category */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
              {product.category_name}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Dimensi Fisik</span>
              <span className="font-bold text-slate-800">{product.dimensions}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Berat Bersih</span>
              <span className="font-bold text-slate-800">{formatNumber(product.weight_gram)} gram</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Bahan Baku Utama</span>
              <span className="font-bold text-slate-800 truncate block">{product.material}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Kapasitas Produksi</span>
              <span className="font-bold text-[#0F5132]">{product.production_capacity_monthly} unit/bln</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Estimasi Pengerjaan</span>
              <span className="font-bold text-slate-800">{product.lead_time_days} Hari Kerja</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Stok Siap Kirim</span>
              <span className="font-bold text-emerald-700">{product.stock_ready} unit</span>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-500">Harga Satuan Retail: <span className="line-through">{formatRupiah(product.price)}</span></span>
              <div className="text-xl font-extrabold text-[#0F5132] flex items-center gap-2">
                <span>{formatRupiah(product.b2b_wholesale_price)}</span>
                <span className="text-xs font-bold text-[#C85A32] bg-white px-2 py-0.5 rounded-full border border-orange-200">
                  Grosir B2B (Min {product.min_b2b_qty} Pcs)
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOrderNow(product);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#0b3e26] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/20 transition-colors"
            >
              <FileCheck className="w-4 h-4 text-amber-300" />
              <span>Ajukan Faktur B2B Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
