import { Service, ExclusiveOffer, TribeOffer, WarningItem, WebConfig, AdminStats, DiscountCoupon } from './types';

export const INITIAL_SERVICES: Service[] = [
  // تصاميم التطبيقات / الشات
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
  },
  {
    id: 'app-tifwa',
    name: 'تيفوا ثابت',
    description: 'تصميم شعار وتوقيع تيفوا مميز بلمسة المايسترو الخاصة وبألوان ملكية متناسقة.',
    price: 50,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-tifwa-anim',
    name: 'تيفوا متحرك',
    description: 'تيفوا احترافي متحرك بحركات انسيابية نيونية وتأثيرات بصرية فخمة للغاية.',
    price: 90,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-bg-static',
    name: 'خلفية ثابتة',
    description: 'تصميم خلفية فاخرة مخصصة للجوال أو غرف الدردشة بدقة عالية وهوية متكاملة.',
    price: 30,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-bg-anim',
    name: 'خلفية متحركة',
    description: 'خلفية حية ومتحركة بتأثيرات جزيئات نيون وإضاءة خافتة تمنح واجهتك فخامة ملكية.',
    price: 50,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-event',
    name: 'تصميم حدث',
    description: 'تصميم بنر مخصص للفعاليات والمناسبات الرسمية مع إبراز التفاصيل بشكل منسق وجذاب.',
    price: 30,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-invite',
    name: 'بطاقة دعوة فاخرة',
    description: 'بطاقة دعوة رقمية للمناسبات والأعياد بتصميم كلاسيكي حديث يليق بضيوفك.',
    price: 30,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-room-static',
    name: 'صورة روم ثابت',
    description: 'خلفية وتصميم مخصص للرومات الصوتية لإضفاء طابع احترافي وهيبة للغرفة.',
    price: 25,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'app-room-anim',
    name: 'صورة روم متحركة',
    description: 'تصميم روم كامل الحركة مع إضاءات متفاعلة ولمسات مذهلة تعزز حضورك.',
    price: 50,
    category: 'تصاميم التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
    active: true
  },

  // الفيديو والمونتاج
  {
    id: 'vid-montage',
    name: 'مونتاج فيديو احترافي',
    description: 'تحرير ودمج المقاطع مع هندسة صوتية وتأثيرات انتقالية سينمائية تروي قصتك.',
    price: 150,
    category: 'الفيديو والمونتاج',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'vid-edit',
    name: 'تعديل وتحسين فيديو',
    description: 'تعديل الألوان والقص وإضافة نصوص توضيحية احترافية تتناسب مع جميع المنصات.',
    price: 100,
    category: 'الفيديو والمونتاج',
    imageUrl: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'vid-intro',
    name: 'مقدمة فيديو (Intro)',
    description: 'تصميم مقدمة ثلاثية الأبعاد بصرية لشعارك لافتتاح مقاطعك بهوية بصرية قوية.',
    price: 80,
    category: 'الفيديو والمونتاج',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'vid-outro',
    name: 'نهاية فيديو (Outro)',
    description: 'خاتمة فيديو مميزة تشتمل على دعوة للاشتراك ووسائل التواصل الاجتماعي الخاصة بك.',
    price: 80,
    category: 'الفيديو والمونتاج',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'vid-ad',
    name: 'فيديو إعلان تجاري',
    description: 'إنتاج إعلان ترويجي فاخر يجذب العملاء ويرفع من مبيعات علامتك التجارية بصرياً.',
    price: 250,
    category: 'الفيديو والمونتاج',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
    active: true
  },

  // الأفلام القصيرة
  {
    id: 'film-realistic',
    name: 'فيلم قصير واقعي',
    description: 'تأليف وإخراج لقطات واقعية مع معالجة سينمائية راقية ومونتاج ذو طابع درامي.',
    price: 400,
    category: 'الأفلام القصيرة',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'film-3d',
    name: 'فيلم قصير ثلاثي الأبعاد 3D',
    description: 'تصميم شخصيات وبيئات ثلاثية الأبعاد متحركة بالكامل بمؤثرات خيالية عالية الاحترافية.',
    price: 600,
    category: 'الأفلام القصيرة',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'film-story',
    name: 'قصة كاملة متحركة',
    description: 'سرد قصصي متكامل مع تمثيل صوتي أو مؤثرات سينمائية تأخذ المشاهد في رحلة مشوقة.',
    price: 350,
    category: 'الأفلام القصيرة',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'film-cinematic',
    name: 'فيديو سينمائي احترافي',
    description: 'تصوير وتحرير سينمائي بألوان مذهلة وإضاءات تعطي إحساس هوليوود الفاخر.',
    price: 500,
    category: 'الأفلام القصيرة',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    active: true
  },

  // تصميم المواقع
  {
    id: 'web-wedding',
    name: 'دعوة زواج إلكترونية تفاعلية',
    description: 'موقع إلكتروني خاص بدعوة زفافك، يضم تفاصيل الحفل، خريطة الموقع، ومؤقت تنازلي أنيق.',
    price: 300,
    category: 'تصميم المواقع',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'web-corporate',
    name: 'موقع تعريفي للشركات',
    description: 'تصميم موقع احترافي متكامل يعرض خدمات شركتك ورؤيتها بأحدث لغات البرمجة والتصاميم.',
    price: 1200,
    category: 'تصميم المواقع',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'web-shop',
    name: 'موقع محلات ومتاجر رقمية',
    description: 'منصة بيع ممتازة لعرض منتجات محلك التجاري واستقبال الطلبات بسلاسة وسرعة فائقة.',
    price: 800,
    category: 'تصميم المواقع',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80',
    active: true
  },

  // تصميم التطبيقات / البرمجة
  {
    id: 'dev-chat',
    name: 'تطبيق دردشة صوتية كامل',
    description: 'برمجة وتصميم واجهات تطبيق غرف دردشة صوتية متطور يضم مزايا الهدايا والفعاليات.',
    price: 2500,
    category: 'تطوير التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'dev-market',
    name: 'متجر تطبيقات ذكي (Market)',
    description: 'واجهة متجر متكامل لعرض وتحميل الخدمات أو المنتجات الرقمية مع لوحة تحكم ذكية.',
    price: 3500,
    category: 'تطوير التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'dev-brand',
    name: 'هوية تطبيق وعلامة تجارية (Brand)',
    description: 'بناء هوية بصرية كاملة لتطبيقك تشمل الأيقونات والألوان وتصميم تجربة المستخدم الفاخرة.',
    price: 1500,
    category: 'تطوير التطبيقات',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80',
    active: true
  },

  // خدمات أخرى
  {
    id: 'other-logo',
    name: 'تصميم شعار (Logo) احترافي',
    description: 'شعار أيقوني فريد يجسد فخامة علامتك التجارية ويحقق التميز البصري المطلوب.',
    price: 150,
    category: 'أخرى',
    imageUrl: 'https://images.unsplash.com/photo-1626785774625-ddc7c8241314?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'other-cv',
    name: 'كتابة وتصميم سيرة ذاتية CV',
    description: 'تنسيق سيرة ذاتية احترافية بأسلوب إنفوجرافيك عصري يجذب مسؤولي التوظيف فوراً.',
    price: 50,
    category: 'أخرى',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'other-retouch',
    name: 'تعديل وتحسين صور',
    description: 'معالجة فوتوغرافية متقدمة، تصحيح الألوان، إزالة الخلفيات، وعمل رتوش سينمائي للصور.',
    price: 40,
    category: 'أخرى',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=400&q=80',
    active: true
  }
];

export const INITIAL_OFFERS: ExclusiveOffer[] = [
  {
    id: 'offer-full-section',
    title: 'عرض تصميم فقرة كاملة',
    description: 'الباقة الكلاسيكية المتكاملة لبدء انطلاقتك الفاخرة في عالم غرف الدردشة والتطبيقات.',
    items: [
      'خلفية ثابتة فائقة الدقة والجمال',
      'تيفوا ثابت بتصميم شعاري ملكي',
      'بنر حدث/فعالية منسق بالكامل'
    ],
    price: 150,
    active: true,
    badge: 'الأكثر طلباً'
  },
  {
    id: 'offer-anim-section',
    title: 'عرض تصميم فقرة متحركة',
    description: 'عزز تفاعل غرفتك وهيبتك الرقمية بتصاميم ديناميكية مفعمة بالحياة والحركات المبهرة.',
    items: [
      'خلفية متحركة نيون مذهلة',
      '2 تيفوا متحرك بإضاءات متناسقة',
      '2 تيفوا ثابت بدقة عالية',
      'بنر حدث متحرك أو ثابت فاخر'
    ],
    price: 180,
    active: true,
    badge: 'حركي مميز'
  },
  {
    id: 'offer-vip',
    title: 'عرض VIP الملكي المتميز',
    description: 'باقة النخبة الخاصة من المايسترو بتصاميم استثنائية ومعاملة سريعة وخاصة جداً.',
    items: [
      'خلفية فاخرة (ثابتة أو متحركة حسب اختيارك)',
      'تيفوا ملكي مخصص يحمل اسمك ببريق خاص',
      'بنر حدث وتغطية للفعالية متكامل',
      'بطاقة دعوة رسمية للمناسبات الهامة'
    ],
    price: 200,
    active: true,
    badge: 'VIP النخبة'
  },
  {
    id: 'offer-room-pack',
    title: 'عرض تصميم روم ملكي',
    description: 'حوّل غرفتك الصوتية إلى تحفة فنية تلفت أسماع وأنظار الزائرين على الفور.',
    items: [
      'خلفية روم متحركة بتأثيرات بصرية دافئة',
      'Avatar متحرك مميز لصاحب الروم',
      'غلاف روم خارجي متحرك يبرز الهيبة والجمال'
    ],
    price: 120,
    active: true,
    badge: 'عرض الغرف'
  }
];

export const INITIAL_TRIBES_OFFERS: TribeOffer[] = [
  {
    id: 'tribe-offer-1',
    tribeName: 'عرض قبيلة عتيبة الهيلا',
    details: 'خلفية متحركة تحمل الهوية والرموز القبلية الفاخرة + تيفوا نيون أزرق ملكي متحرك + بنر مناسبات فخم.',
    price: 160,
    imageUrl: 'https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'tribe-offer-2',
    tribeName: 'عرض قبيلة قحطان العريقة',
    details: 'تصميم متكامل يجسد الهيبة التاريخية: خلفية ذهبية نيون متحركة + رمزية كبار شخصيات + تيفوا وتوقيع حركي فريد.',
    price: 170,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
    active: true
  },
  {
    id: 'tribe-offer-3',
    tribeName: 'عرض قبيلة مطير حمران النواظر',
    details: 'باقة ملكية حمراء نارية: خلفية روم متحركة مخصصة مع شارات الترحيب + تيفوا أحمر نيون فخم + بطاقة دعوة للمجالس.',
    price: 165,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
    active: true
  }
];

export const INITIAL_WARNINGS: WarningItem[] = [
  {
    id: 'warn-1',
    name: 'أحمد الـمخادع (أبو فهد)',
    app: 'تطبيق لايكي Likee / ديسكورد',
    appUserId: 'ID: 887723410',
    phone: '+966 50 123 4567',
    reason: 'يقوم بطلب تصاميم ويدعي تحويل الأموال عبر لقطات شاشة مزيفة للبنوك ثم يختفي بعد استلام التصاميم المفتوحة.',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    active: true
  },
  {
    id: 'warn-2',
    name: 'خالد م. (السراب)',
    app: 'تيك توك / تليجرام',
    appUserId: 'ID: @alsarab_scam',
    phone: '+966 55 987 6543',
    reason: 'ينتحل صفة وسيط معتمد لدى مصممي CRA DESIGN ويأخذ عربون من الزبائن ويسرق مبالغهم دون علم الإدارة.',
    imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80',
    active: true
  }
];

export const INITIAL_CONFIG: WebConfig = {
  announcement: '✨ أهلاً بكم في متجر CRA DESIGN الفاخر للخدمات الرقمية وتصاميم النخبة تحت إشراف المايسترو Maestro ✨',
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
    { name: 'عرض VIP الملكي المتميز', count: 189 },
    { name: 'تيفوا متحرك', count: 142 },
    { name: 'خلفية متحركة', count: 110 }
  ]
};

export const INITIAL_COUPONS: DiscountCoupon[] = [
  { id: 'coupon-1', code: 'MAESTRO10', discountPercentage: 10, active: true },
  { id: 'coupon-2', code: 'CRA20', discountPercentage: 20, active: true }
];

