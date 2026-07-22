import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Layout, ShieldAlert, Sparkles, TrendingUp, DollarSign, 
  Users, BarChart2, Check, Trash2, Plus, Edit3, Settings, ShieldCheck, Eye, EyeOff, Save, Inbox, Ticket 
} from 'lucide-react';
import { Service, ExclusiveOffer, TribeOffer, WarningItem, WebConfig, AdminStats, CustomerOrder, DiscountCoupon } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onUpdateServices: (services: Service[]) => void;
  offers: ExclusiveOffer[];
  onUpdateOffers: (offers: ExclusiveOffer[]) => void;
  tribeOffers: TribeOffer[];
  onUpdateTribeOffers: (tribeOffers: TribeOffer[]) => void;
  warnings: WarningItem[];
  onUpdateWarnings: (warnings: WarningItem[]) => void;
  config: WebConfig;
  onUpdateConfig: (config: WebConfig) => void;
  stats: AdminStats;
  coupons: DiscountCoupon[];
  onUpdateCoupons: (coupons: DiscountCoupon[]) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  services,
  onUpdateServices,
  offers,
  onUpdateOffers,
  tribeOffers,
  onUpdateTribeOffers,
  warnings,
  onUpdateWarnings,
  config,
  onUpdateConfig,
  stats,
  coupons,
  onUpdateCoupons
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'services' | 'offers' | 'warnings' | 'banners' | 'orders' | 'coupons'>('stats');

  // Coupons form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);

  // Service form state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceCategory, setServiceCategory] = useState('تصاميم التطبيقات');
  const [serviceImg, setServiceImg] = useState('');

  // Warning form state
  const [warnName, setWarnName] = useState('');
  const [warnApp, setWarnApp] = useState('');
  const [warnId, setWarnId] = useState('');
  const [warnPhone, setWarnPhone] = useState('');
  const [warnReason, setWarnReason] = useState('');
  const [warnImg, setWarnImg] = useState('');

  // Banners Config state
  const [announcementText, setAnnouncementText] = useState(config.announcement);
  const [heroTitleText, setHeroTitleText] = useState(config.heroTitle);
  const [heroSubtitleText, setHeroSubtitleText] = useState(config.heroSubtitle);
  const [whatsappEndpoint, setWhatsappEndpoint] = useState(config.whatsappNumber);
  const [heroImageUrlText, setHeroImageUrlText] = useState(config.heroImageUrl || '');

  // Simulated Inbox state
  const [simulatedOrders, setSimulatedOrders] = useState<CustomerOrder[]>([
    {
      id: 'ORD-5412',
      customerName: 'الأمير خالد آل سعود',
      phone: '+966500000000',
      items: [
        { id: 'app-avatar-anim', name: 'Avatar متحرك', price: 50, quantity: 1 },
        { id: 'offer-vip', name: 'عرض VIP الملكي المتميز', price: 200, quantity: 1 }
      ],
      totalPrice: 250,
      notes: 'أريد الألوان أزرق ملكي مع الشعار مكتوب عليه (K.S.A)',
      timestamp: 'قبل ساعتين',
      status: 'pending'
    },
    {
      id: 'ORD-5409',
      customerName: 'فهد العتيبي',
      phone: '+966551234567',
      items: [
        { id: 'tribe-offer-1', name: 'عرض قبيلة عتيبة الهيلا', price: 160, quantity: 1 }
      ],
      totalPrice: 160,
      notes: 'للروم الصوتي في تطبيق لايكي',
      timestamp: 'قبل 5 ساعات',
      status: 'completed'
    }
  ]);

  useEffect(() => {
    // Reset login status when opened/closed
    if (!isOpen) {
      setIsAuthenticated(false);
      setPassword('');
      setLoginError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'maestro123' || password === 'Maestro123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('❌ كلمة المرور غير صحيحة يا مايسترو! حاول مجدداً.');
    }
  };

  // --- CRUD Services ---
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || servicePrice <= 0) {
      alert('الرجاء تعبئة اسم الخدمة وسعرها بشكل صحيح.');
      return;
    }

    if (editingServiceId) {
      // Update
      const updated = services.map(s => {
        if (s.id === editingServiceId) {
          return {
            ...s,
            name: serviceName,
            description: serviceDesc,
            price: Number(servicePrice),
            category: serviceCategory,
            imageUrl: serviceImg || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
          };
        }
        return s;
      });
      onUpdateServices(updated);
      setEditingServiceId(null);
    } else {
      // Add new
      const newService: Service = {
        id: `service-${Date.now()}`,
        name: serviceName,
        description: serviceDesc,
        price: Number(servicePrice),
        category: serviceCategory,
        imageUrl: serviceImg || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        active: true
      };
      onUpdateServices([newService, ...services]);
    }

    // Reset Form
    setServiceName('');
    setServiceDesc('');
    setServicePrice(0);
    setServiceImg('');
  };

  const handleEditService = (s: Service) => {
    setEditingServiceId(s.id);
    setServiceName(s.name);
    setServiceDesc(s.description);
    setServicePrice(s.price);
    setServiceCategory(s.category);
    setServiceImg(s.imageUrl);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك بحذف هذه الخدمة نهائياً؟')) {
      const updated = services.filter(s => s.id !== id);
      onUpdateServices(updated);
    }
  };

  const handleToggleService = (id: string) => {
    const updated = services.map(s => {
      if (s.id === id) return { ...s, active: !s.active };
      return s;
    });
    onUpdateServices(updated);
  };

  // --- CRUD Warnings ---
  const handleAddWarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warnName.trim() || !warnId.trim() || !warnReason.trim()) {
      alert('الرجاء إدخال الاسم، والآيدي، وسبب التحذير.');
      return;
    }

    const newWarning: WarningItem = {
      id: `warn-${Date.now()}`,
      name: warnName,
      app: warnApp || 'تليجرام / ديسكورد',
      appUserId: warnId,
      phone: warnPhone || 'غير متوفر',
      reason: warnReason,
      imageUrl: warnImg || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      active: true
    };

    onUpdateWarnings([newWarning, ...warnings]);

    // Reset Form
    setWarnName('');
    setWarnApp('');
    setWarnId('');
    setWarnPhone('');
    setWarnReason('');
    setWarnImg('');
  };

  const handleDeleteWarning = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المحتال من قائمة التحذير؟')) {
      const updated = warnings.filter(w => w.id !== id);
      onUpdateWarnings(updated);
    }
  };

  // --- Coupon Codes Handlers ---
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) {
      alert('الرجاء إدخال كود خصم صحيح.');
      return;
    }
    const cleanCode = newCouponCode.trim().toUpperCase();
    if (coupons.some(c => c.code === cleanCode)) {
      alert('هذا الكوبون مضاف مسبقاً بالفعل يا مايسترو!');
      return;
    }

    const newCoupon: DiscountCoupon = {
      id: `coupon-${Date.now()}`,
      code: cleanCode,
      discountPercentage: newCouponDiscount,
      active: true
    };

    onUpdateCoupons([newCoupon, ...coupons]);
    setNewCouponCode('');
    alert('✅ تم إنشاء كود الخصم بنجاح!');
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm('هل ترغب في حذف كود الخصم هذا نهائياً؟')) {
      onUpdateCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const handleToggleCouponActive = (id: string) => {
    onUpdateCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  // --- Save Config ---
  const handleSaveConfig = () => {
    const updatedConfig: WebConfig = {
      ...config,
      announcement: announcementText,
      heroTitle: heroTitleText,
      heroSubtitle: heroSubtitleText,
      whatsappNumber: whatsappEndpoint,
      heroImageUrl: heroImageUrlText
    };
    onUpdateConfig(updatedConfig);
    alert('✅ تم حفظ الإعدادات والبنرات بنجاح يا مايسترو!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-6xl glass bg-[#0B0B0B]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Panel */}
        <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/5 border border-[#0F52BA]/30 text-white rounded-2xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white neon-text flex items-center gap-1.5">
                CRA DESIGN Command Center
                <span className="text-[10px] px-2 py-0.5 bg-neon-gold text-black rounded font-mono uppercase">Maestro Mode</span>
              </h2>
              <p className="text-xs text-gray-400 font-light mt-0.5">لوحة القيادة لإدارة المنتجات، الأسعار، البنرات والتحذير الأمني للمتجر الفاخر</p>
            </div>
          </div>
          <button 
            id="close-admin-panel-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Password Lock Gate Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 p-8 lg:p-16 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="p-4 bg-white/5 rounded-full border border-white/10 animate-pulse text-[#0F52BA]">
              <Lock className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">تسجيل دخول الإدارة الفاخرة</h3>
              <p className="text-xs text-gray-400">يرجى إدخال كلمة المرور السرية الخاصة بالمايسترو لتخويل الوصول.</p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                id="admin-pwd-input"
                type="password"
                placeholder="أدخل كلمة المرور السرية..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#0F52BA] focus:ring-1 focus:ring-[#0F52BA]/30 text-white text-xs outline-none transition-all font-mono"
                autoFocus
              />
              {loginError && <p className="text-xs text-neon-red font-semibold">{loginError}</p>}
              
              <button
                id="admin-login-submit"
                type="submit"
                className="w-full py-3 rounded-xl gradient-blue text-white text-xs font-bold shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                تخويل الدخول الفوري
              </button>
            </form>
            <p className="text-[10px] text-gray-600 font-mono">كلمة المرور: maestro123</p>
          </div>
        ) : (
          /* Main Dashboard layout once Logged In */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Admin Controls */}
            <div className="w-full md:w-64 bg-[#0B0B0B]/50 border-b md:border-b-0 md:border-l border-white/5 p-4 space-y-2 shrink-0">
              {[
                { id: 'stats', label: 'إحصائيات وتقارير الزوار', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'services', label: 'إدارة وتعديل الخدمات', icon: <Layout className="w-4 h-4" /> },
                { id: 'coupons', label: 'إدارة وصناعة أكواد الخصم', icon: <Ticket className="w-4 h-4" /> },
                { id: 'warnings', label: 'قسم ومكافحة المحتالين', icon: <ShieldAlert className="w-4 h-4" /> },
                { id: 'banners', label: 'إدارة البنرات والإعدادات', icon: <Settings className="w-4 h-4" /> },
                { id: 'orders', label: 'بريد طلبات العملاء (محاكاة)', icon: <Inbox className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`admin-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-right px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                    activeTab === tab.id
                      ? 'bg-[#0F52BA]/20 text-white border-r-4 border-[#0F52BA]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                  <div className={`w-1 h-1 rounded-full ${activeTab === tab.id ? 'bg-[#0F52BA] shadow shadow-[#0F52BA]' : 'bg-transparent'}`} />
                </button>
              ))}
            </div>

            {/* Admin Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Tab 1: Stats & Overview Dashboard */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-royal-neon" />
                      إحصائيات وتقارير زوار CRA DESIGN
                    </h3>
                    <p className="text-xs text-gray-500">مراقبة تفاعل المستخدمين والخدمات الأكثر طلباً في المتجر</p>
                  </div>

                  {/* High-level Numeric Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-luxury-card p-5 rounded-2xl border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold">إجمالي عدد الزوار الفعلي</span>
                      <p className="text-2xl font-black text-white font-mono text-glow-blue">{stats.visitorsCount.toLocaleString()}</p>
                    </div>
                    <div className="bg-luxury-card p-5 rounded-2xl border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold">طلبات واتساب المحولة</span>
                      <p className="text-2xl font-black text-white font-mono text-glow-blue">{stats.ordersCount.toLocaleString()}</p>
                    </div>
                    <div className="bg-luxury-card p-5 rounded-2xl border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold">الإيرادات المقدرة (ريال سعودي)</span>
                      <p className="text-2xl font-black text-neon-gold font-mono">{stats.totalRevenue.toLocaleString()} SAR</p>
                    </div>
                  </div>

                  {/* Elegant Interactive SVG Chart Widget */}
                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white">منحنى نشاط المبيعات الأسبوعي للمتجر الفاخر</span>
                    <div className="h-44 w-full relative pt-4 flex items-end">
                      {/* Grid lines */}
                      <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-10">
                        <div className="border-b border-white w-full" />
                        <div className="border-b border-white w-full" />
                        <div className="border-b border-white w-full" />
                        <div className="border-b border-white w-full" />
                      </div>
                      
                      {/* Bar charts customized */}
                      <div className="flex items-end justify-between w-full h-full relative z-10 px-4">
                        {[
                          { day: 'الأحد', val: 40 },
                          { day: 'الأثنين', val: 65 },
                          { day: 'الثلاثاء', val: 55 },
                          { day: 'الأربعاء', val: 90 },
                          { day: 'الخميس', val: 120 },
                          { day: 'الجمعة', val: 150 },
                          { day: 'السبت', val: 110 }
                        ].map((d, index) => (
                          <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer w-1/8">
                            <div className="relative w-full flex justify-center">
                              {/* Hover Tooltip */}
                              <span className="absolute -top-8 px-2 py-0.5 bg-royal-blue text-[9px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {d.val} طلب
                              </span>
                              <div 
                                style={{ height: `${(d.val / 160) * 110}px` }}
                                className="w-8 rounded-t bg-gradient-to-t from-royal-blue to-royal-neon group-hover:from-royal-neon group-hover:to-white transition-all duration-300 shadow-md shadow-royal-blue/10"
                              />
                            </div>
                            <span className="text-[10px] text-gray-500 group-hover:text-white transition-colors">{d.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Most requested list */}
                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-royal-neon" />
                      الخدمات الأكثر طلباً وتفاعلاً
                    </span>
                    <div className="space-y-3">
                      {stats.mostRequested.map((req, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-xs text-white font-bold">{req.name}</span>
                          <span className="text-xs text-royal-neon font-mono font-bold bg-royal-blue/10 px-3 py-1 rounded-full border border-royal-blue/20">
                            {req.count} طلب محول
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Manage Services (Full CRUD with Active toggles) */}
              {activeTab === 'services' && (
                <div className="space-y-8">
                  {/* Service Input Form */}
                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-royal-neon" />
                      {editingServiceId ? 'تعديل الخدمة المحددة' : 'إضافة خدمة رقمية جديدة'}
                    </span>

                    <form onSubmit={handleSaveService} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">اسم الخدمة <span className="text-neon-red">*</span></label>
                        <input
                          id="admin-service-name"
                          type="text"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="مثال: Avatar متحرك احترافي"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">السعر بالريال السعودي (SAR) <span className="text-neon-red">*</span></label>
                        <input
                          id="admin-service-price"
                          type="number"
                          value={servicePrice || ''}
                          onChange={(e) => setServicePrice(Number(e.target.value))}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="مثال: 50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">تصنيف البوابة الرقمية <span className="text-neon-red">*</span></label>
                        <select
                          id="admin-service-category"
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
                          className="w-full px-4 py-2 bg-luxury-card border border-white/5 rounded-xl text-xs text-white outline-none"
                        >
                          <option value="تصاميم التطبيقات">بوابة تصاميم التطبيقات</option>
                          <option value="الفيديو والمونتاج">بوابة الفيديو والمونتاج</option>
                          <option value="الأفلام القصيرة">بوابة الأفلام القصيرة</option>
                          <option value="تصميم المواقع">بوابة تصميم المواقع</option>
                          <option value="تطوير التطبيقات">بوابة تصميم وتطوير التطبيقات</option>
                          <option value="أخرى">بوابة أخرى</option>
                        </select>
                      </div>

                      <div className="space-y-1 col-span-1">
                        <label className="text-[11px] font-bold text-gray-300">رابط صورة الخدمة (Unsplash أو رابط خارجي)</label>
                        <input
                          id="admin-service-img"
                          type="text"
                          value={serviceImg}
                          onChange={(e) => setServiceImg(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="رابط الصورة المباشر..."
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-gray-300">وصف الخدمة ومميزاتها</label>
                        <textarea
                          id="admin-service-desc"
                          value={serviceDesc}
                          onChange={(e) => setServiceDesc(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none resize-none"
                          placeholder="اكتب وصفاً جذاباً للزبون..."
                          rows={2}
                        />
                      </div>

                      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                        {editingServiceId && (
                          <button
                            id="admin-cancel-edit-service"
                            type="button"
                            onClick={() => {
                              setEditingServiceId(null);
                              setServiceName('');
                              setServiceDesc('');
                              setServicePrice(0);
                              setServiceImg('');
                            }}
                            className="px-4 py-2 bg-white/5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white"
                          >
                            إلغاء التعديل
                          </button>
                        )}
                        <button
                          id="admin-save-service-btn"
                          type="submit"
                          className="px-6 py-2 bg-royal-blue text-white text-xs font-bold rounded-lg hover:bg-royal-neon"
                        >
                          {editingServiceId ? 'حفظ تعديلات الخدمة' : 'إضافة الخدمة فوراً'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Interactive Services List Manager */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-royal-neon" />
                      الخدمات المتوفرة حالياً بالمتجر (تفعيل، تعطيل، تعديل، حذف)
                    </span>

                    <div className="grid grid-cols-1 gap-3">
                      {services.map((s) => (
                        <div 
                          key={s.id}
                          id={`admin-list-service-${s.id}`}
                          className="p-4 rounded-xl bg-luxury-card border border-white/5 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={s.imageUrl} 
                              alt={s.name} 
                              className="w-10 h-10 rounded-lg object-cover" 
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                                {s.name}
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 font-normal">
                                  {s.category}
                                </span>
                              </h4>
                              <p className="text-[10px] text-gray-500 mt-0.5">{s.price} ريال سعودي</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Toggle active state */}
                            <button
                              id={`toggle-service-active-${s.id}`}
                              onClick={() => handleToggleService(s.id)}
                              className={`p-2 rounded-lg border transition-all ${
                                s.active
                                  ? 'bg-royal-blue/10 border-royal-blue/30 text-royal-neon hover:bg-royal-blue/20'
                                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'
                              }`}
                              title={s.active ? "إخفاء الخدمة مؤقتاً" : "إظهار الخدمة في المتجر"}
                            >
                              {s.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>

                            {/* Edit */}
                            <button
                              id={`edit-service-btn-${s.id}`}
                              onClick={() => handleEditService(s)}
                              className="p-2 bg-white/5 border border-white/5 hover:border-royal-blue/30 text-gray-400 hover:text-white rounded-lg transition-all"
                              title="تعديل تفاصيل الخدمة"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              id={`delete-service-btn-${s.id}`}
                              onClick={() => handleDeleteService(s.id)}
                              className="p-2 bg-white/5 border border-white/5 hover:border-red-500/30 text-gray-400 hover:text-neon-red rounded-lg transition-all"
                              title="حذف نهائي"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Anti-fraud Database Manager */}
              {activeTab === 'warnings' && (
                <div className="space-y-8">
                  {/* Warning Input Form */}
                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-neon-red" />
                      إدراج محتال جديد في البوابة الأمنية السوداء
                    </span>

                    <form onSubmit={handleAddWarning} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">اسم الشخص أو لقبه <span className="text-neon-red">*</span></label>
                        <input
                          id="admin-warn-name"
                          type="text"
                          value={warnName}
                          onChange={(e) => setWarnName(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="مثال: أحمد المحتال"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">التطبيق المستخدم (لايكي، تليجرام، تيك توك) <span className="text-neon-red">*</span></label>
                        <input
                          id="admin-warn-app"
                          type="text"
                          value={warnApp}
                          onChange={(e) => setWarnApp(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="مثال: تليجرام وديسكورد"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">الآيدي ID أو معرّف الحساب <span className="text-neon-red">*</span></label>
                        <input
                          id="admin-warn-id"
                          type="text"
                          value={warnId}
                          onChange={(e) => setWarnId(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="مثال: ID: 1234567"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">رقم الهاتف للواتساب أو الاتصال (إن وجد)</label>
                        <input
                          id="admin-warn-phone"
                          type="text"
                          value={warnPhone}
                          onChange={(e) => setWarnPhone(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="مثال: +966 50 000 0000"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-gray-300">صورة الشخص (رابط فوتوغرافي أو رمزية افتراضية)</label>
                        <input
                          id="admin-warn-img"
                          type="text"
                          value={warnImg}
                          onChange={(e) => setWarnImg(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                          placeholder="رابط الصورة المباشر..."
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-gray-300">تفاصيل وسيناريو الاحتيال بالكامل <span className="text-neon-red">*</span></label>
                        <textarea
                          id="admin-warn-reason"
                          value={warnReason}
                          onChange={(e) => setWarnReason(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none resize-none"
                          placeholder="اشرح كيف يحتال لمنع وقوع الزبائن الآخرين في شباكه..."
                          rows={3}
                        />
                      </div>

                      <div className="sm:col-span-2 flex justify-end pt-2">
                        <button
                          id="admin-add-warning-submit"
                          type="submit"
                          className="px-6 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-neon-red"
                        >
                          إدراج فوري في البوابة الأمنية
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of Fraud warnings with delete trigger */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-neon-red flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" />
                      المدرجون في اللائحة السوداء الحالية (التحكم)
                    </span>

                    <div className="grid grid-cols-1 gap-3">
                      {warnings.map((warn) => (
                        <div 
                          key={warn.id}
                          id={`admin-warn-list-${warn.id}`}
                          className="p-4 rounded-xl bg-luxury-card border border-red-950/30 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={warn.imageUrl} 
                              alt={warn.name} 
                              className="w-10 h-10 rounded-full object-cover filter grayscale"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-white">{warn.name}</h4>
                              <p className="text-[10px] text-gray-500 mt-0.5">{warn.app} - {warn.appUserId}</p>
                            </div>
                          </div>

                          <button
                            id={`delete-warning-btn-${warn.id}`}
                            onClick={() => handleDeleteWarning(warn.id)}
                            className="p-2 bg-white/5 border border-white/5 hover:border-red-500/30 text-gray-400 hover:text-neon-red rounded-lg transition-all"
                            title="إزالة وإسقاط من القائمة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Web Config, Announcement & Banners */}
              {activeTab === 'banners' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-royal-neon" />
                      إدارة البنرات، الهوية والمعلومات العامة
                    </h3>
                    <p className="text-xs text-gray-500">تعديل نصوص الصفحة الرئيسية والتحكم بالنوافذ والواتساب الخاص بالمايسترو</p>
                  </div>

                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4 text-right">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-300">الشريط الإعلاني العلوي المتحرك (Marquee)</label>
                      <input
                        id="admin-announcement-input"
                        type="text"
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-300">عنوان البانر الرئيسي (Main Banner Title)</label>
                      <input
                        id="admin-hero-title-input"
                        type="text"
                        value={heroTitleText}
                        onChange={(e) => setHeroTitleText(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-300">الوصف الفرعي للبانر (Sub-Banner Description)</label>
                      <textarea
                        id="admin-hero-sub-input"
                        value={heroSubtitleText}
                        onChange={(e) => setHeroSubtitleText(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none resize-none"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-300">رقم هاتف WhatsApp لتوجيه الزبائن (مخفي من الواجهات)</label>
                      <input
                        id="admin-whatsapp-input"
                        type="text"
                        value={whatsappEndpoint}
                        onChange={(e) => setWhatsappEndpoint(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none font-mono"
                        placeholder="مثال: +21621725094"
                      />
                    </div>

                    <div className="space-y-1.5 text-right">
                      <label className="text-[11px] font-bold text-gray-300">رابط صورة التطبيق الرئيسية في الأعلى (Main Top Image URL)</label>
                      <input
                        id="admin-hero-image-input"
                        type="text"
                        value={heroImageUrlText}
                        onChange={(e) => setHeroImageUrlText(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white outline-none font-mono"
                        placeholder="أدخل رابط صورة فخم ومباشر (مثال: رابط Unsplash أو Imgur)..."
                      />
                      {heroImageUrlText && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                            <img 
                              src={heroImageUrlText} 
                              alt="معاينة الصورة" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-[10px] text-gray-500 font-light">معاينة الصورة الحالية</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        id="admin-save-config-btn"
                        onClick={handleSaveConfig}
                        className="px-6 py-2.5 bg-royal-blue hover:bg-royal-neon text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>حفظ بنرات وإعدادات المتجر</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Simulated Customers Orders Logs */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Inbox className="w-5 h-5 text-royal-neon" />
                      بريد ومحاكاة طلبات العملاء الواردة
                    </h3>
                    <p className="text-xs text-gray-500">سجل افتراضي للطلبات لتتبع العملاء وتجربة هيكل البيانات</p>
                  </div>

                  <div className="space-y-4">
                    {simulatedOrders.map((ord) => (
                      <div 
                        key={ord.id}
                        id={`simulated-order-${ord.id}`}
                        className="p-5 rounded-2xl bg-luxury-card border border-white/5 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <div>
                            <span className="text-[10px] text-gray-500 font-bold">{ord.id}</span>
                            <h4 className="text-xs font-bold text-white">{ord.customerName}</h4>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                            ord.status === 'completed' 
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                              : 'bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse'
                          }`}>
                            {ord.status === 'completed' ? 'تم التنفيذ والتسليم' : 'بانتظار الإرسال/معالجة'}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs font-light">
                          <span className="text-[10px] font-bold text-gray-400">الخدمات المطلوبة:</span>
                          <ul className="space-y-1 list-disc list-inside">
                            {ord.items.map((it, idx) => (
                              <li key={idx} className="text-gray-300">
                                {it.name} (عدد {it.quantity}) = {it.price * it.quantity} ريال
                              </li>
                            ))}
                          </ul>
                          
                          {ord.notes && (
                            <p className="bg-white/5 p-3 rounded-xl text-gray-400 border border-white/5 text-[11px] mt-2">
                              💡 ملاحظات العميل: {ord.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-white/5">
                          <span>زمن الطلب: {ord.timestamp}</span>
                          <span className="font-bold text-white">الإجمالي: {ord.totalPrice} ريال سعودي</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Manage Coupons (صناعة أكواد خصم) */}
              {activeTab === 'coupons' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-neon-gold" />
                      إدارة وصناعة أكواد الخصم للعملاء
                    </h3>
                    <p className="text-xs text-gray-500">قم بتوليد أكواد الخصم وتحديد نسبة التخفيض (10% أو 20% إلخ) لتقديمها لعملائك المميزين</p>
                  </div>

                  {/* Create Coupon Form */}
                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-neon-gold" />
                      إنشاء كود خصم جديد
                    </span>

                    <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">كود الخصم (بالأحرف الإنجليزية) <span className="text-neon-red">*</span></label>
                        <input
                          id="admin-coupon-code"
                          type="text"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-[#0F52BA]"
                          placeholder="مثال: MAESTRO10"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">نسبة الخصم المئوية % <span className="text-neon-red">*</span></label>
                        <select
                          id="admin-coupon-discount"
                          value={newCouponDiscount}
                          onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-[#0F52BA] [&>option]:bg-[#0B0B0B]"
                        >
                          <option value={10}>10% خصم</option>
                          <option value={20}>20% خصم</option>
                          <option value={30}>30% خصم</option>
                          <option value={50}>50% خصم</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 pt-2">
                        <button
                          id="admin-create-coupon-btn"
                          type="submit"
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl gradient-blue text-white text-xs font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
                        >
                          توليد كود الخصم الفوري
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Coupons List */}
                  <div className="bg-luxury-card p-6 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white">قائمة أكواد الخصم الفعالة</span>
                    
                    {coupons.length === 0 ? (
                      <p className="text-xs text-gray-500 py-4 text-center font-light">لا توجد أكواد خصم نشطة حالياً. أنشئ كود خصم جديد بالأعلى.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-right text-xs">
                          <thead>
                            <tr className="border-b border-white/5 text-gray-400">
                              <th className="pb-3 font-semibold">كود الخصم</th>
                              <th className="pb-3 font-semibold">نسبة الخصم</th>
                              <th className="pb-3 font-semibold">الحالة</th>
                              <th className="pb-3 font-semibold text-center">العمليات</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-gray-300">
                            {coupons.map((coupon) => (
                              <tr key={coupon.id} className="hover:bg-white/5">
                                <td className="py-3 font-bold text-white font-mono">{coupon.code}</td>
                                <td className="py-3 font-mono text-neon-gold">{coupon.discountPercentage}%</td>
                                <td className="py-3">
                                  <button
                                    onClick={() => handleToggleCouponActive(coupon.id)}
                                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                      coupon.active 
                                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                    }`}
                                  >
                                    {coupon.active ? 'نشط ومفعل' : 'معطل'}
                                  </button>
                                </td>
                                <td className="py-3 text-center">
                                  <button
                                    onClick={() => handleDeleteCoupon(coupon.id)}
                                    className="p-1.5 text-gray-500 hover:text-neon-red hover:bg-red-500/10 rounded transition-colors"
                                    title="حذف الكود"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
