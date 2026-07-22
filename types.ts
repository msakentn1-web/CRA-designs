export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  active: boolean;
}

export interface ExclusiveOffer {
  id: string;
  title: string;
  description: string;
  items: string[];
  price: number;
  active: boolean;
  badge: string;
}

export interface TribeOffer {
  id: string;
  tribeName: string;
  details: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export interface WarningItem {
  id: string;
  name: string;
  app: string;
  appUserId: string;
  phone: string;
  reason: string;
  imageUrl: string;
  active: boolean;
}

export interface CartItem {
  id: string; // can be service ID or offer ID
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

export interface AdminStats {
  visitorsCount: number;
  ordersCount: number;
  totalRevenue: number;
  mostRequested: { name: string; count: number }[];
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  phone?: string;
  items: CartItem[];
  totalPrice: number;
  notes: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface WebConfig {
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappNumber: string;
  allowSound: boolean;
  heroImageUrl?: string;
}

export interface DiscountCoupon {
  id: string;
  code: string;
  discountPercentage: number;
  active: boolean;
}

