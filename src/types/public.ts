import type { BusinessUnit, BumdesProfile } from './businessUnits';
import type { PotteryProduct } from './catalog';
import type { TransparencySnapshot } from './finance';

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'berita_bumdes' | 'ekspor_gerabah' | 'layanan_pamsimas' | 'edukasi_syariah' | 'agenda_desa';
  thumbnail_url: string;
  author_name: string;
  published_at: string;
  views_count: number;
}

export interface VillageEvent {
  id: number;
  title: string;
  location: string;
  event_start: string;
  event_end: string;
  description: string;
  organizer: string;
  is_upcoming: boolean;
}

export interface PublicHomeSummary {
  profile: Partial<BumdesProfile>;
  quick_stats: {
    pelanggan_pamsimas_aktif: number;
    penjualan_gerabah_tahun_ini: number;
    mitra_umkm_binaan: number;
    kontribusi_pades_berjalan: number;
  };
  units: BusinessUnit[];
  featured_pottery: PotteryProduct[];
  transparency_snapshot: TransparencySnapshot;
  latest_news: NewsArticle[];
  upcoming_events: VillageEvent[];
}

