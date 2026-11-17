import React from "react";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { BUMDES, rupiah } from "../../data/bumdes";

/*
  Keranjang Belanja Mengambang (Floating Cart Drawer)
  - Pengunjung dapat memilih beberapa produk dan mengatur kuantitasnya.
  - Menghitung total belanja.
  - Tombol Checkout langsung merangkum daftar pesanan dan membuka WhatsApp BUMDes.
*/
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  if (!isOpen) return null;

  // Hitung total belanja (hanya yang memiliki harga numerik)
  const totalBelanja = cartItems.reduce((acc, item) => {
    if (item.harga !== null && item.harga !== undefined) {
      return acc + item.harga * item.qty;
    }
    return acc;
  }, 0);

  const adaItemTanyaHarga = cartItems.some((item) => item.harga === null || item.harga === undefined);

  // Buat pesan WhatsApp otomatis yang rapi
  const handleCheckoutWA = () => {
    if (cartItems.length === 0) return;

    let text = `Halo *${BUMDES.nama}*, saya ingin memesan produk berikut melalui keranjang web:\n\n`;
    cartItems.forEach((item, index) => {
      const hargaStr = item.harga !== null ? rupiah(item.harga * item.qty) : "Tanyakan harga";
      text += `${index + 1}. *${item.nama}*\n`;
      text += `   • Jumlah: ${item.qty} pcs\n`;
      text += `   • Subtotal: ${hargaStr}\n\n`;
    });

    if (totalBelanja > 0) {
      text += `*Estimasi Total:* ${rupiah(totalBelanja)}\n`;
    }
    if (adaItemTanyaHarga) {
      text += `_(Sebagian produk membutuhkan konfirmasi harga & ongkir)_\n`;
    }
    text += `\nMohon konfirmasi ketersediaan stok, total ongkir, dan nomor rekening pembayarannya. Terima kasih!`;

    const url = `https://wa.me/${BUMDES.wa}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-brand-krem-gelap dark:border-slate-800">
        {/* Header Drawer */}
        <div className="p-5 border-b border-brand-krem-gelap dark:border-slate-800 flex items-center justify-between bg-brand-krem/40 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-terakota text-white flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 id="cart-title" className="font-extrabold text-base text-brand-cokelat dark:text-white">
                Keranjang Belanja
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {cartItems.length} jenis produk dipilih
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Tutup keranjang"
          >
            <X size={20} />
          </button>
        </div>

        {/* Isi Keranjang (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-3xl bg-brand-krem dark:bg-slate-800 flex items-center justify-center text-brand-terakota/60 mb-4">
                <ShoppingBag size={32} />
              </div>
              <p className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-1">
                Keranjang masih kosong
              </p>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Silakan pilih produk komoditas pertanian, peternakan, atau kriya gerabah Mayong Lor di katalog.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-brand-terakota text-white text-xs font-bold hover:bg-brand-cokelat transition"
              >
                Lihat Katalog Produk
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-brand-krem/30 dark:bg-slate-800/60 border border-brand-krem-gelap dark:border-slate-700/80 flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-brand-terakota uppercase tracking-wide">
                    {item.kat}
                  </span>
                  <h4 className="font-bold text-sm text-brand-cokelat dark:text-white leading-snug">
                    {item.nama}
                  </h4>
                  <p className="text-xs font-semibold text-brand-terakota">
                    {item.harga !== null ? rupiah(item.harga) : "Tanyakan harga via WhatsApp"}
                  </p>

                  {/* Quantity Counter */}
                  <div className="pt-2 flex items-center gap-2">
                    <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                      <button
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                        className="p-1.5 text-slate-500 hover:text-brand-terakota transition"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-slate-800 dark:text-white">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="p-1.5 text-slate-500 hover:text-brand-terakota transition"
                        aria-label="Tambah jumlah"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition"
                      title="Hapus barang"
                      aria-label="Hapus barang dari keranjang"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtotal Item */}
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    {item.harga !== null ? rupiah(item.harga * item.qty) : "—"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Drawer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-brand-krem-gelap dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Estimasi Total:</span>
              <span className="text-xl font-black text-brand-terakota">
                {totalBelanja > 0 ? rupiah(totalBelanja) : "Tanyakan Harga"}
              </span>
            </div>

            {adaItemTanyaHarga && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 leading-tight">
                * Termasuk produk dengan harga fleksibel yang akan dihitung langsung oleh pengurus.
              </p>
            )}

            <button
              onClick={handleCheckoutWA}
              className="w-full py-3.5 rounded-2xl bg-brand-terakota text-white font-extrabold text-sm hover:bg-brand-cokelat transition-colors flex items-center justify-center gap-2 shadow-lg min-h-[46px] cursor-pointer"
            >
              <MessageCircle size={17} />
              <span>Pesan via WhatsApp ({cartItems.length} Item)</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-red-500 transition text-center"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

