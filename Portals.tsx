import React from 'react';
import { 
  Sparkles, Monitor, AppWindow, Video, Film, Globe, 
  HelpCircle, AlertOctagon, ChevronLeft, ArrowRight, ShieldCheck, ShoppingCart 
} from 'lucide-react';
import { Service, CartItem } from '../types';

interface PortalsProps {
  services: Service[];
  selectedPortal: string | null;
  setSelectedPortal: (portal: string | null) => void;
  onAddToCart: (service: Service) => void;
  cart: CartItem[];
  onScrollToWarning: () => void;
}

export interface PortalInfo {
  id: string;
  title: string;
  arabicName: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  highlightColor: string;
  longDesc: string;
}

export default function Portals({ 
  services, 
  selectedPortal, 
  setSelectedPortal, 
  onAddToCart, 
  cart,
  onScrollToWarning
}: PortalsProps) {

  const portalsList: PortalInfo[] = [
    {
      id: 'app-designs',
      title: 'App UI Designs',
      arabicName: 'تصاميم التطبيقات والشات',
      description: 'أفاتارات مخصصة، خلفيات نيون متحركة، تيفوا ملكي، وصور غرف الدردشة الفخمة.',
      icon: <AppWindow className="w-8 h-8 text-royal-neon" />,
      bgGradient: 'from-royal-blue/20 via-black to-black',
      highlightColor: 'royal-neon',
      longDesc: 'توفير تصاميم واجهات ومستلزمات الغرف الصوتية وتطبيقات الدردشة للارتقاء بحسابك وغرفتك إلى أعلى مستويات الرفاهية والتميز.',
    },
    {
      id: 'video-montage',
      title: 'Video & Montage',
      arabicName: 'الفيديو والمونتاج الاحترافي',
      description: 'قص وتعديل الفيديوهات، هندسة صوتية سينمائية، وتصميم مقدمات (Intros) ونهايات متحركة.',
      icon: <Video className="w-8 h-8 text-royal-neon" />,
      bgGradient: 'from-royal-blue/10 via-black to-black',
      highlightColor: 'royal-blue',
      longDesc: 'مونتاج سينمائي احترافي، دمج مؤثرات صوتية وبصرية جذابة وتعديل الألوان لإنشاء فيديوهات إعلانية وشخصية تأسر الحواس.',
    },
    {
      id: 'short-films',
      title: 'Short Films',
      arabicName: 'الأفلام القصيرة و3D',
      description: 'أفلام قصيرة واقعية، تصاميم ثلاثية الأبعاد متحركة، قصص وسرد سينمائي متكامل.',
      icon: <Film className="w-8 h-8 text-royal-neon" />,
      bgGradient: 'from-royal-blue/15 via-black to-black',
      highlightColor: 'royal-neon',
      longDesc: 'إنتاج أفلام قصيرة بتقنيات حديثة وتصاميم شخصيات 3D وسرد قصصي احترافي يحاكي الواقع أو يأخذك لعوالم الخيال.',
    },
    {
      id: 'web-design',
      title: 'Websites Design',
      arabicName: 'تصميم وبرمجة المواقع',
      description: 'دعوات زفاف رقمية تفاعلية، مواقع للشركات الكبرى، ومتاجر رقمية متطورة وسريعة.',
      icon: <Globe className="w-8 h-8 text-royal-neon" />,
      bgGradient: 'from-royal-blue/10 via-black to-black',
      highlightColor: 'royal-blue',
      longDesc: 'برمجة وتصميم مواقع متجاوبة وحديثة كلياً تلبي احتياجات أعمالك وتمنح زوارك تجربة تصفح غاية في السلاسة والفخامة.',
    },
    {
      id: 'app-dev',
      title: 'Mobile Apps Development',
      arabicName: 'تصميم وبرمجة التطبيقات',
      description: 'تطبيقات شات صوتي متكاملة، أسواق رقمية ذكية، وبناء الهوية البصرية للتطبيقات.',
      icon: <Monitor className="w-8 h-8 text-royal-neon" />,
      bgGradient: 'from-royal-blue/20 via-black to-black',
      highlightColor: 'royal-neon',
      longDesc: 'تطوير تطبيقات الهواتف الذكية من الصفر للدردشة الصوتية والمبيعات بأعلى معايير الحماية والأداء مع لوحة تحكم ذكية وشاملة.',
    },
    {
      id: 'other-services',
      title: 'Other Creative Services',
      arabicName: 'خدمات إبداعية أخرى',
      description: 'شعارات تجارية (Logos) أيقونية، تصميم سيرة ذاتية CV، وتعديل وتحسين فوتوغرافي.',
      icon: <HelpCircle className="w-8 h-8 text-royal-neon" />,
      bgGradient: 'from-royal-blue/5 via-black to-black',
      highlightColor: 'royal-blue',
      longDesc: 'مجموعة من الخدمات المتنوعة تشمل هويات وشعارات فريدة وسير ذاتية احترافية بلمسات المايسترو التي تميز حضورك الرقمي.',
    },
    {
      id: 'warning-gate',
      title: 'Anti-Fraud List',
      arabicName: 'بوابة التحذير والنزاهة',
      description: 'قائمة محدثة بالمحتالين والمنتحلين لحماية عملائنا ومجتمعنا الرقمي.',
      icon: <AlertOctagon className="w-8 h-8 text-neon-red animate-pulse" />,
      bgGradient: 'from-neon-red/10 via-black to-black',
      highlightColor: 'neon-red',
      longDesc: 'حفظاً للأمان والنزاهة، نوفر دليلاً استقصائياً موثقاً للأشخاص المحتالين وأرقامهم وأساليبهم لردع النصب والاحتيال.',
    }
  ];

  // Helper mapping to filter services
  const categoryMap: { [key: string]: string } = {
    'app-designs': 'تصاميم التطبيقات',
    'video-montage': 'الفيديو والمونتاج',
    'short-films': 'الأفلام القصيرة',
    'web-design': 'تصميم المواقع',
    'app-dev': 'تطوير التطبيقات',
    'other-services': 'أخرى'
  };

  const handlePortalClick = (portal: PortalInfo) => {
    if (portal.id === 'warning-gate') {
      onScrollToWarning();
    } else {
      setSelectedPortal(portal.id);
      setTimeout(() => {
        const target = document.getElementById('portal-expanded-view');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // If a portal is selected, display its standalone page view
  if (selectedPortal && selectedPortal !== 'warning-gate') {
    const activePortal = portalsList.find(p => p.id === selectedPortal)!;
    const categoryName = categoryMap[selectedPortal];
    const portalServices = services.filter(s => s.category === categoryName && s.active);

    return (
      <div 
        id="portal-expanded-view" 
        className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 animate-in fade-in zoom-in-95 duration-500"
      >
        {/* Back Button and Path */}
        <div className="flex items-center gap-2 mb-8 text-xs text-gray-400">
          <button 
            id="back-to-portals-btn"
            onClick={() => setSelectedPortal(null)}
            className="flex items-center gap-1 hover:text-white transition-colors duration-200"
          >
            الرئيسية
          </button>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-royal-neon font-semibold">{activePortal.arabicName}</span>
        </div>

        {/* Portal Standalone Header Screen */}
        <div className="relative overflow-hidden rounded-3xl glass bg-gradient-to-br from-[#0F52BA]/10 via-transparent to-transparent p-8 lg:p-12 mb-12 shadow-2xl">
          {/* Neon lights */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0F52BA]/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                {activePortal.icon}
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#0F52BA] font-bold">{activePortal.title}</span>
                <h2 className="text-2xl lg:text-4xl font-extrabold text-white mt-1 neon-text">{activePortal.arabicName}</h2>
              </div>
            </div>
            
            <p className="text-sm lg:text-base text-gray-300 font-light leading-relaxed">
              {activePortal.longDesc}
            </p>

            <div className="flex items-center gap-6 pt-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#0F52BA]" />
                <span>شامل تعديلات لا محدودة</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-neon-gold" />
                <span>تنفيذ فائق الجودة وسريع</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services List Grid inside the Gate */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0F52BA]" />
              قائمة الخدمات المتوفرة
            </h3>
            <span className="text-xs text-gray-500">عدد الخدمات: {portalServices.length}</span>
          </div>

          {portalServices.length === 0 ? (
            <div className="text-center py-16 rounded-2xl glass bg-white/5">
              <Sparkles className="w-10 h-10 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">سيقوم المايسترو بإضافة خدمات جديدة لهذه البوابة قريباً جداً.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portalServices.map((service) => {
                const isItemInCart = cart.some(item => item.id === service.id);
                return (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    className="group relative overflow-hidden rounded-2xl glass hover:border-royal-blue/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Glowing Accent line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#0F52BA]/30 group-hover:bg-[#0F52BA] transition-all duration-300" />
                    
                    <div>
                      {/* Image Frame */}
                      <div className="relative h-48 w-full overflow-hidden bg-black/40">
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-[#0F52BA]/90 border border-[#0F52BA]/30 text-white rounded-full text-[10px] font-bold shadow-lg shadow-[#0F52BA]/20">
                          {service.price} ريال سعودي
                        </span>
                      </div>

                      {/* Info and Content */}
                      <div className="p-5 space-y-2">
                        <h4 className="text-base font-bold text-white group-hover:text-[#0F52BA] transition-colors duration-200">
                          {service.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed h-12 overflow-hidden">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="p-5 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-4">
                      <span className="text-sm font-extrabold text-[#0F52BA]">
                        {service.price} <span className="text-[10px] text-gray-400 font-normal">ريال</span>
                      </span>
                      <button
                        id={`add-to-cart-${service.id}`}
                        onClick={() => onAddToCart(service)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          isItemInCart
                            ? 'bg-royal-blue/20 text-white border border-[#0F52BA]'
                            : 'gradient-blue text-white hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20 animate-pulse-none'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{isItemInCart ? 'أُضيف للسلة' : 'أضف للسلة'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Return Button inside expanded view */}
          <div className="flex justify-center pt-8">
            <button
              id="return-to-all-gates-btn"
              onClick={() => setSelectedPortal(null)}
              className="px-6 py-3 rounded-xl glass hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لجميع البوابات الرقمية</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Gates Directory view (Main list of portals)
  return (
    <section id="portals-directory" className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs text-[#0F52BA] font-bold tracking-wider uppercase">CRA DESIGN Portal System</span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white neon-text">بوابات الخدمات الفاخرة</h2>
        <p className="max-w-xl mx-auto text-xs md:text-sm text-gray-400 font-light">
          اختر البوابة المناسبة واكتشف الخدمات الرقمية الفاخرة التي يقدمها المايسترو بأسعار تنافسية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portalsList.map((portal) => (
          <div
            key={portal.id}
            id={`portal-gate-card-${portal.id}`}
            onClick={() => handlePortalClick(portal)}
            className="group relative overflow-hidden glass p-6 flex flex-col justify-between cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:border-royal-blue/60 hover:bg-white/10 shadow-lg h-64"
          >
            {/* Top Glowing Corner */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#0F52BA]/10 rounded-full filter blur-xl group-hover:bg-[#0F52BA]/20 transition-all duration-300 pointer-events-none" />
            
            {/* Icon and Title */}
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-royal-blue/30 group-hover:bg-royal-blue/5 transition-all duration-300">
                {portal.icon}
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] tracking-widest uppercase text-[#0F52BA] font-bold">{portal.title}</span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#0F52BA] transition-colors duration-200">
                  {portal.arabicName}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {portal.description}
                </p>
              </div>
            </div>

            {/* Access Badge/Action */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F52BA] group-hover:text-white pt-4 transition-colors duration-300 border-t border-white/5 mt-4">
              <span>افتح البوابة الرقمية</span>
              <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
