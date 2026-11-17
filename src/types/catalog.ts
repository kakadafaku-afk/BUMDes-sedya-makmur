export interface PotteryCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface PotteryProduct {
  id: number;
  category_id: number;
  category_name?: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  dimensions: string;
  weight_gram: number;
  material: string;
  price: number;
  b2b_wholesale_price: number;
  min_b2b_qty: number;
  stock_ready: number;
  production_capacity_monthly: number;
  lead_time_days: number;
  image_urls: string[];
  is_featured: boolean;
  is_b2b_available: boolean;
  is_active: boolean;
}

export type BuyerType =
  | 'instansi_pemerintah'
  | 'kafe_resto_hotel'
  | 'pemborong_kontraktor'
  | 'ritel_nasional'
  | 'individu';

export type B2BOrderStatus =
  | 'pending_review'
  | 'po_approved'
  | 'downpayment_verified'
  | 'in_production'
  | 'qc_packaging'
  | 'ready_to_ship'
  | 'shipped'
  | 'completed'
  | 'rejected';

export interface B2BOrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface B2BOrderRequest {
  buyer_type: BuyerType;
  company_name: string;
  npwp?: string;
  contact_person: string;
  phone: string;
  email: string;
  delivery_address: string;
  target_delivery_date: string;
  items: {
    product_id: number;
    quantity: number;
  }[];
  notes?: string;
}

export interface B2BOrder {
  id: number;
  order_number: string;
  buyer_type: BuyerType;
  company_name: string;
  npwp?: string;
  contact_person: string;
  phone: string;
  email: string;
  delivery_address: string;
  target_delivery_date: string;
  total_amount: number;
  tax_amount: number;
  grand_total: number;
  downpayment_amount: number;
  status: B2BOrderStatus;
  notes?: string;
  items: B2BOrderItem[];
  invoice_number?: string;
  created_at: string;
}

