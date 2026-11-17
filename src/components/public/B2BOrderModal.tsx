import React, { useState } from 'react';
import { 
  X, 
  FileCheck, 
  CheckCircle2
} from 'lucide-react';
import type { PotteryProduct, B2BOrderRequest, B2BOrder } from '../../types/catalog';
import { api } from '../../services/api';
import { formatRupiah } from '../../utils/formatters';

interface B2BOrderModalProps {
  product: PotteryProduct;
  onClose: () => void;
}

export const B2BOrderModal: React.FC<B2BOrderModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState<number>(product.min_b2b_qty || 25);
  const [buyerType, setBuyerType] = useState<B2BOrderRequest['buyer_type']>('kafe_resto_hotel');
  const [companyName, setCompanyName] = useState<string>('PT Kopi Jawa Heritage');
  const [npwp, setNpwp] = useState<string>('01.234.567.8-516.000');
  const [contactPerson, setContactPerson] = useState<string>('Dimas Hendrawan, S.T.');
  const [phone, setPhone] = useState<string>('0812-3456-7890');
  const [email, setEmail] = useState<string>('procurement@kopijawa.co.id');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Jl. Kaliurang Km 9.5, Sleman, D.I. Yogyakarta');
  const [targetDate, setTargetDate] = useState<string>('2026-12-15');
  const [notes] = useState<string>('Mohon sertakan Faktur Pajak resmi BUMDes dan kemasan bubble wrap ekstra kayu.');

  const [loading, setLoading] = useState<boolean>(false);
  const [orderResult, setOrderResult] = useState<B2BOrder | null>(null);

  const subtotal = product.b2b_wholesale_price * quantity;
  const taxAmount = Math.round(subtotal * 0.11);
  const grandTotal = subtotal + taxAmount;
  const dpAmount = Math.round(grandTotal * 0.5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await api.submitB2BInquiry({
        buyer_type: buyerType,
        company_name: companyName,
        npwp,
        contact_person: contactPerson,
        phone,
        email,
        delivery_address: deliveryAddress,
        target_delivery_date: targetDate,
        items: [{ product_id: product.id, quantity }],
        notes,
      });
      setOrderResult(order);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memproses PO B2B.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header Modal */}
        <div className="bg-[#0F5132] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-300">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Formulir Pengajuan PO / Faktur B2B Resmi
              </h3>
              <p className="text-[11px] text-emerald-200">
                Penerbitan PO BUMDes Mayong Lor Berbadan Hukum
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!orderResult ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Selected Product Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <img
                src={product.image_urls[0]}
                alt={product.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold font-mono text-slate-500">
                  {product.sku}
                </span>
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-[#0F5132] font-extrabold">
                  Harga Grosir: {formatRupiah(product.b2b_wholesale_price)} / unit
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jumlah Pesanan (Unit) *Min {product.min_b2b_qty}
                </label>
                <input
                  type="number"
                  min={product.min_b2b_qty}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.min_b2b_qty, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Klasifikasi Pemesan
                </label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value as B2BOrderRequest['buyer_type'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                >
                  <option value="kafe_resto_hotel">Kafe / Resto / Hotel / Resort</option>
                  <option value="instansi_pemerintah">Instansi Pemerintah / BUMN / Dinas</option>
                  <option value="pemborong_kontraktor">Kontraktor / Desainer Lansekap</option>
                  <option value="ritel_nasional">Jaringan Ritel / Distributor</option>
                  <option value="individu">Pemesan Individu Partai Besar</option>
                </select>
              </div>
            </div>

            {/* Company & NPWP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Badan Usaha / Instansi *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor NPWP (Opsional untuk Faktur Pajak)
                </label>
                <input
                  type="text"
                  value={npwp}
                  onChange={(e) => setNpwp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                />
              </div>
            </div>

            {/* Contact Person & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama PIC Pemesan *
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Perusahaan *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>
            </div>

            {/* Address & Target Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap Pengiriman Logistik *
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Tiba Lokasi
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F5132]"
                  required
                />
              </div>
            </div>

            {/* Cost Breakdown Summary Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({quantity} unit × {formatRupiah(product.b2b_wholesale_price)}):</span>
                <span className="font-semibold">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>PPN 11% (Dinas/Perusahaan):</span>
                <span className="font-semibold">{formatRupiah(taxAmount)}</span>
              </div>
              <div className="pt-2 border-t border-emerald-200/80 flex justify-between text-sm font-extrabold text-[#0F5132]">
                <span>Total Estimasi PO:</span>
                <span>{formatRupiah(grandTotal)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#C85A32] font-bold">
                <span>Uang Muka Produksi (DP 50%):</span>
                <span>{formatRupiah(dpAmount)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F5132] hover:bg-[#0b3e26] shadow-md shadow-emerald-950/20 disabled:opacity-50 transition-all flex items-center gap-1.5"
              >
                {loading ? 'Menerbitkan Nomor PO...' : 'Kirim Pengajuan PO Resmi'}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Status: Pending Review Direktur BUMDes
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Pengajuan PO Berhasil Diterbitkan!
              </h3>
              <p className="text-xs text-slate-500">
                Nomor Tiket Pesanan Resmi:
              </p>
              <p className="font-mono text-lg font-extrabold text-[#0F5132] bg-slate-100 py-1.5 px-4 rounded-lg inline-block">
                {orderResult.order_number}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Pemesan:</span>
                <span className="font-bold text-slate-800">{orderResult.company_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Item Produk:</span>
                <span className="font-bold text-slate-800">{product.name} ({quantity} unit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Grand Total PO:</span>
                <span className="font-bold text-[#0F5132]">{formatRupiah(orderResult.grand_total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tagihan DP 50%:</span>
                <span className="font-bold text-[#C85A32]">{formatRupiah(orderResult.downpayment_amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rekening Transfer:</span>
                <span className="font-mono font-bold text-slate-800">Bank Jateng 1-024-08992-1</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Faktur proforma resmi telah kami kirimkan ke email <span className="font-semibold text-slate-700">{orderResult.email}</span> dan WhatsApp PIC.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0F5132] text-white text-xs font-bold hover:bg-[#0b3e26] transition-colors"
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
