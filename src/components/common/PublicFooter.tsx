import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Droplet, 
  Sparkles, 
  Coins, 
  Compass
} from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#0b3e26] text-white pt-16 pb-8 border-t-4 border-[#C85A32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/60">
          {/* Kolom 1: Profil BUMDes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                <Building2 className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  BUMDes Mayong Lor Mandiri
                </h3>
                <p className="text-xs text-emerald-300 font-medium">
                  Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Korporasi desa berbadan hukum resmi Kemendes PDTT yang mengintegrasikan sentra kriya terakota bernilai ekspor, distribusi utilitas air bersih perpipaan PAMSIMAS, pembiayaan syariah bebas riba, dan eduwisata keramik pedesaan.
            </p>

            <div className="pt-2 space-y-2 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <span>Jl. Raya Mayong - Pancur Km 1.5, Desa Mayong Lor, Mayong, Jepara 59465</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0812-2890-8420 (Sekretariat & Pelayanan B2B)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>sekretariat@bumdesmayonglor.desa.id</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: 4 Unit Usaha */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              4 Pilar Unit Bisnis
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Kriya Gerabah Terakota</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Droplet className="w-3.5 h-3.5 text-blue-400" />
                <span>PAMSIMAS Tirta Mayong</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>USP Mekar Syariah</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Compass className="w-3.5 h-3.5 text-emerald-300" />
                <span>Eduwisata & Homestay</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Publik Warga */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Layanan Terpadu
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li className="hover:text-white transition-colors cursor-pointer">Cek Tagihan Air PAMSIMAS</li>
              <li className="hover:text-white transition-colors cursor-pointer">Pengajuan Sambungan Baru PAM</li>
              <li className="hover:text-white transition-colors cursor-pointer">Permohonan PO Kriya B2B</li>
              <li className="hover:text-white transition-colors cursor-pointer">Simulasi Akad Mudharabah USP</li>
              <li className="hover:text-white transition-colors cursor-pointer">Kanal Pengaduan & Aspirasi Warga</li>
            </ul>
          </div>

          {/* Kolom 4: Kepatuhan Hukum & Rekening Giro */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Akuntabilitas Perbankan
            </h4>
            <div className="p-3 rounded-lg bg-emerald-900/60 border border-emerald-700/50 space-y-1.5 text-[11px]">
              <span className="text-emerald-300 font-semibold block">Rekening Resmi Operasional:</span>
              <p className="font-mono text-white text-xs font-bold">1-024-08992-1</p>
              <p className="text-emerald-200">Bank Jateng Kantor Kas Mayong</p>
              <p className="text-[10px] text-emerald-300/80">a.n. BUMDES MAYONG LOR MANDIRI</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diaudit berkala oleh Pengawas BPD</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <p>
            © {new Date().getFullYear()} BUMDes Mayong Lor. Hak Cipta Dilindungi Undang-Undang. Mengacu PP No. 11/2021 & Permendesa PDTT No. 3/2021.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
              SIMBUMDes v2.4 (Enterprise Village ERP)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
