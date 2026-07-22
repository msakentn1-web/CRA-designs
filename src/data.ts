import { Service, ExclusiveOffer, TribeOffer, WarningItem, WebConfig, AdminStats, DiscountCoupon } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'app-avatar',
    name: 'Avatar شخصي',
    description: 'تصميم رمزية شخصية احترافية فريدة تناسب هويتك الرقمية وبأعلى جودة.',
    price: 30,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-avatar-anim',
    name: 'Avatar متحرك',
    description: 'رمزية متحركة بتأثيرات بصرية راقية وجذابة تلفت الأنظار في كافة المنصات.',
    price: 50,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    active: true
  }
];

export const INITIAL_OFFERS: ExclusiveOffer[] = [
  {
    id: 'offer-full-section',
    title: 'عرض تصميم فقرة كاملة',
    description: 'الباقة الكلاسيكية المتكاملة لبدء انطلاقتك الفاخرة في عالم غرف الدردشة والتطبيقات.',
    items: ['خلفية ثابتة فائقة الدقة والجمال', 'تيفوا ثابت بتصميم شعاري ملكي'],
    price: 150,
    active: true,
    badge: 'الأكثر طلباً'
  }
];

export const INITIAL_TRIBES_OFFERS: TribeOffer[] = [
  {
    id: 'tribe-offer-1',
    tribeName: 'عرض قبيلة عتيبة الهيلا',
    details: 'خلفية متحركة تحمل الهوية والرموز القبلية الفاخرة + تيفوا نيون أزرق ملكي',
    price: 160,
    imageUrl: 'https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&w=400&q=80',
    active: true
  }
];

export const INITIAL_WARNINGS: WarningItem[] = [
  {
    id: 'warn-1',
    name: 'أحمد الـمخادع',
    app: 'تطبيق لايكي Likee / ديسكورد',
    appUserId: 'ID: 887723410',
    phone: '+966 50 123 4567',
    reason: 'يقوم بطلب تصاميم ويدعي تحويل الأموال عبر لقطات شاشة مزيفة',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    active: true
  }
];

export const INITIAL_CONFIG: WebConfig = {
  announcement: '✨ أهلاً بكم في متجر CRA DESIGN الفاخر للخدمات الرقمية ✨',
  heroTitle: 'Luxury Digital Design Studio',
  heroSubtitle: 'حيث تلتقي الفخامة الرقمية بلمسات نيون إبداعية تدوم طويلاً',
  whatsappNumber: '+21621725094',
  allowSound: true,
  heroImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
};

export const INITIAL_STATS: AdminStats = {
  visitorsCount: 14820,
  ordersCount: 843,
  totalRevenue: 54120,
  mostRequested: [
    { name: 'Avatar متحرك', count: 245 },
    { name: 'عرض VIP الملكي المتميز', count: 189 }
  ]
};

export const INITIAL_COUPONS: DiscountCoupon[] = [
  { id: 'coupon-1', code: 'MAESTRO10', discountPercentage: 10, active: true },
  { id: 'coupon-2', code: 'CRA20', discountPercentage: 20, active: true }
];