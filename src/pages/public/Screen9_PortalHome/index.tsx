import React, { useEffect, useState, useRef } from 'react';
import { HeroBanner } from '../../../components/public/HeroBanner';
import { QuickStatsSection } from '../../../components/public/QuickStatsSection';
import { BusinessUnitsGrid } from '../../../components/public/BusinessUnitsGrid';
import { PotteryShowcase } from '../../../components/public/PotteryShowcase';
import { InteractiveUtilitiesWidget } from '../../../components/public/InteractiveUtilitiesWidget';
import { NewsEventsSection } from '../../../components/public/NewsEventsSection';
import { B2BOrderModal } from '../../../components/public/B2BOrderModal';
import { ProductDetailModal } from '../../../components/public/ProductDetailModal';
import { api } from '../../../services/api';
import type { PublicHomeSummary } from '../../../types/public';
import type { PotteryProduct, PotteryCategory } from '../../../types/catalog';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface Screen9Props {
  onNavigateToUnit?: (unitCode: string) => void;
  onNavigateToTransparency?: () => void;
  onNavigateToNews?: (slug?: string) => void;
}

export const Screen9_PortalHome: React.FC<Screen9Props> = ({
  onNavigateToUnit,
  onNavigateToTransparency,
  onNavigateToNews,
}) => {
  const [data, setData] = useState<PublicHomeSummary | null>(null);
  const [categories, setCategories] = useState<PotteryCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal States
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<PotteryProduct | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<PotteryProduct | null>(null);

  // Section Refs for smooth scrolling
  const catalogRef = useRef<HTMLDivElement>(null);
  const utilitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [homeSummary, catList] = await Promise.all([
          api.getHomeSummary(),
          api.getPotteryCategories(),
        ]);
        setData(homeSummary);
        setCategories(catList);
      } catch (err) {
        console.error('Error fetching portal home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUtilities = () => {
    utilitiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-3 border-emerald-200 border-t-[#0F5132] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">
          Memuat BUMDes Mayong Lor...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      {/* 1. Hero Banner (Clean, Welcoming & Image Slider) */}
      <HeroBanner
        onExploreCatalog={scrollToCatalog}
        onOpenPamCheck={scrollToUtilities}
        onViewTransparency={onNavigateToTransparency || (() => {})}
      />

      {/* 2. Quick Highlight Pills (Clean & Low Cognitive Load) */}
      <QuickStatsSection
        onSelectService={(code) => {
          if (code === 'KRIYA_GERABAH') {
            scrollToCatalog();
          } else {
            scrollToUtilities();
          }
        }}
      />

      {/* 3. Sorotan 4 Unit Usaha BUMDes */}
      <div id="unit-usaha">
        <BusinessUnitsGrid
          units={data.units}
          onSelectUnit={(code) => {
            if (code === 'KRIYA_GERABAH') {
              scrollToCatalog();
            } else if (code === 'PAMSIMAS' || code === 'USP_SYARIAH') {
              scrollToUtilities();
            } else {
              if (onNavigateToUnit) onNavigateToUnit(code);
            }
          }}
        />
      </div>

      {/* 4. Showcase Produk Kriya Terakota */}
      <div ref={catalogRef} id="katalog">
        <PotteryShowcase
          products={data.featured_pottery}
          categories={categories}
          onOpenOrderModal={(p) => setSelectedProductForOrder(p)}
          onOpenDetailModal={(p) => setSelectedProductForDetail(p)}
        />
      </div>

      {/* 5. Layanan Praktis Warga (Cek PAM & Simulasi USP) */}
      <div ref={utilitiesRef} id="layanan">
        <InteractiveUtilitiesWidget />
      </div>

      {/* 6. Kartu Undangan Transparansi Ramah & Bersih */}
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F5132] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Pengelolaan Keuangan Terbuka & Akuntabel</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Keterbukaan Laporan Kas & Realisasi PADes
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Kami menyajikan laporan pertanggungjawaban kas, neraca laba rugi, dan hasil audit BPD secara transparan untuk seluruh masyarakat Mayong Lor.
            </p>
          </div>
          <button
            onClick={onNavigateToTransparency}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <span>Buka Transparansi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7. Warta Terkini & Agenda Desa */}
      <div id="warta">
        <NewsEventsSection
          news={data.latest_news}
          events={data.upcoming_events}
          onReadMoreNews={(slug) => {
            if (onNavigateToNews) {
              onNavigateToNews(slug);
            } else {
              alert(`Membaca Berita: ${slug}`);
            }
          }}
        />
      </div>

      {/* Modals */}
      {selectedProductForOrder && (
        <B2BOrderModal
          product={selectedProductForOrder}
          onClose={() => setSelectedProductForOrder(null)}
        />
      )}

      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
          onOrderNow={(p) => {
            setSelectedProductForDetail(null);
            setSelectedProductForOrder(p);
          }}
        />
      )}
    </div>
  );
};
