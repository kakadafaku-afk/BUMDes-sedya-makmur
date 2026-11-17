export declare const hasApi: boolean;
export declare function kirimPesan(data: { nama: string; kontak: string; pesan: string }): Promise<{ success: boolean; message: string }>;
export declare function getProduk(kategori?: string): Promise<any[]>;
export declare function getPaketWisata(): Promise<any[]>;
export declare function getUnitUsaha(): Promise<any[]>;
export declare function getWarta(kategori?: string): Promise<any[]>;
export declare function getLaporanKeuangan(tahun?: number): Promise<any>;
export declare function getPengurus(): Promise<any[]>;
export declare const api: {
  getHomeSummary(): Promise<any>;
  getPotteryProducts(categoryId?: number): Promise<any[]>;
  getPotteryCategories(): Promise<any[]>;
  checkPamsimasBill(customerNo: string): Promise<any>;
  simulateUspFinancing(nominal: number, tenorMonths: number): any;
  submitB2BInquiry(payload: any): Promise<any>;
  getAdminDashboardOverview(): Promise<any>;
};
