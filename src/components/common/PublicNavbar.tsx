import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Droplet, 
  PhoneCall, 
  LogIn
} from 'lucide-react';

interface PublicNavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenPamCheck: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ 
  currentTab, 
  onNavigate,
  onOpenPamCheck 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'unit-usaha', label: 'Unit Usaha' },
    { id: 'katalog', label: 'E-Katalog' },
    { id: 'transparansi', label: 'Transparansi' },
    { id: 'warta', label: 'Warta Desa' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Friendly Notification Bar */}
      <div className="bg-[#0F5132] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-100 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Kecamatan Mayong, Kabupaten Jepara • BUMDes Siap Melayani</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-100 text-[11px]">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-300" /> 0812-2890-8420
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F5132] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-[#0F5132]">
                  BUMDes Mayong Lor
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
                Portal Layanan & Kriya Desa
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currentTab === link.id
                    ? 'text-[#0F5132] bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-[#0F5132] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Quick Actions (Simple and Short) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenPamCheck}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F5132] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
            >
              <Droplet className="w-3.5 h-3.5 text-blue-600" />
              <span>Cek Tagihan</span>
            </button>

            <button
              onClick={() => onNavigate('admin-login')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0F5132] hover:bg-[#0b3e26] transition-all shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                currentTab === link.id
                  ? 'text-[#0F5132] bg-emerald-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onOpenPamCheck();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold text-[#0F5132] bg-emerald-50 border border-emerald-200"
            >
              <Droplet className="w-3.5 h-3.5 text-blue-600" />
              Cek Tagihan
            </button>
            <button
              onClick={() => {
                onNavigate('admin-login');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold text-white bg-[#0F5132]"
            >
              <LogIn className="w-3.5 h-3.5" />
              Masuk Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
