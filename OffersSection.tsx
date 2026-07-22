import React from 'react';
import { Sparkles, Check, Gem, Gift, Users, Award, ShoppingCart } from 'lucide-react';
import { ExclusiveOffer, TribeOffer, CartItem } from '../types';

interface OffersSectionProps {
  offers: ExclusiveOffer[];
  tribeOffers: TribeOffer[];
  cart: CartItem[];
  onAddOfferToCart: (offer: ExclusiveOffer) => void;
  onAddTribeToCart: (tribe: TribeOffer) => void;
}

export default function OffersSection({
  offers,
  tribeOffers,
  cart,
  onAddOfferToCart,
  onAddTribeToCart
}: OffersSectionProps) {

  return (
    <section id="offers" className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 space-y-24">
      {/* 1. Exclusive Offers Section */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs text-[#0F52BA] font-bold tracking-wider uppercase font-mono">Exclusive Packages</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-2 neon-text">
            <Gem className="w-6 h-6 text-neon-gold animate-pulse" />
            الباقات والقطع الحصرية
          </h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-gray-400 font-light">
            باقات متكاملة مجهزة ومصممة بدقة متناهية تحت إشراف المايسترو بخصومات استثنائية جداً.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.filter(o => o.active).map((offer) => {
            const isOfferInCart = cart.some(item => item.id === offer.id);
            return (
              <div
                key={offer.id}
                id={`offer-card-${offer.id}`}
                className="group relative overflow-hidden glass p-6 flex flex-col justify-between shadow-2xl h-[420px] transition-all duration-300 hover:border-royal-blue/60"
              >
                {/* Highlight Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#0F52BA]/30 group-hover:bg-[#0F52BA] transition-all duration-300" />
                
                <div className="space-y-4">
                  {/* Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#0F52BA]/10 border border-[#0F52BA]/30 text-white rounded-full text-[9px] font-bold tracking-wider">
                      {offer.badge}
                    </span>
                    <Gem className="w-4 h-4 text-gray-600 group-hover:text-neon-gold transition-colors duration-300" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-white group-hover:text-[#0F52BA] transition-colors duration-200">
                      {offer.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed h-12 overflow-hidden">
                      {offer.description}
                    </p>
                  </div>

                  {/* Included Items list */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">محتويات الباقة:</span>
                    <ul className="space-y-1.5">
                      {offer.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-xs text-gray-300 font-light">
                          <Check className="w-3.5 h-3.5 text-[#0F52BA] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Add button */}
                <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-gray-500 font-semibold">السعر الإجمالي:</span>
                    <span className="text-xl font-extrabold text-white neon-text font-mono">
                      {offer.price} <span className="text-xs text-gray-400 font-sans font-normal">ريال</span>
                    </span>
                  </div>

                  <button
                    id={`request-offer-btn-${offer.id}`}
                    onClick={() => onAddOfferToCart(offer)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                      isOfferInCart
                        ? 'bg-royal-blue/20 text-white border border-[#0F52BA]'
                        : 'gradient-blue text-white hover:scale-105 active:scale-95 shadow-md shadow-blue-900/20'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{isOfferInCart ? 'أُضيف للسلة' : 'طلب العرض'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Monthly Offers for Tribes Section */}
      <div id="tribes" className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs text-[#0F52BA] font-bold tracking-wider uppercase font-mono">Tribal Pride specials</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-2 neon-text">
            <Users className="w-6 h-6 text-[#0F52BA]" />
            عروض شهرية للقبائل
          </h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-gray-400 font-light">
            تصاميم مهيبة وخلفيات حصرية مجهزة برموز وشارات القبائل العربية لتزيين روماتكم ومجالسكم الرقمية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tribeOffers.filter(t => t.active).map((tribe) => {
            const isTribeInCart = cart.some(item => item.id === tribe.id);
            return (
              <div
                key={tribe.id}
                id={`tribe-card-${tribe.id}`}
                className="group relative overflow-hidden glass hover:border-royal-blue/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Accent glow top */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#0F52BA]/30 group-hover:bg-[#0F52BA]" />
                
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/40">
                    <img
                      src={tribe.imageUrl}
                      alt={tribe.tribeName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#0F52BA]/90 border border-[#0F52BA]/30 text-white rounded-full text-[10px] font-bold shadow-lg shadow-[#0F52BA]/20">
                      عرض مميز للقبيلة
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#0F52BA] transition-colors duration-200">
                      {tribe.tribeName}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {tribe.details}
                    </p>
                  </div>
                </div>

                {/* Footer details & order */}
                <div className="p-6 pt-0 mt-4 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500">سعر العرض:</span>
                    <span className="text-lg font-bold text-white font-mono">
                      {tribe.price} <span className="text-xs text-gray-400 font-normal">ريال</span>
                    </span>
                  </div>

                  <button
                    id={`request-tribe-btn-${tribe.id}`}
                    onClick={() => onAddTribeToCart(tribe)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isTribeInCart
                        ? 'bg-[#0F52BA]/20 text-white border border-[#0F52BA]'
                        : 'gradient-blue text-white hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{isTribeInCart ? 'أُضيف للسلة' : 'طلب العرض'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Special Royal Gift Section */}
      <div className="relative overflow-hidden glass neon-border p-8 lg:p-12 shadow-2xl text-center flex flex-col items-center space-y-6 bg-gradient-to-r from-[#0F52BA]/20 to-transparent">
        {/* Background ambient gold shine */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0F52BA]/10 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-[#0F52BA] animate-pulse">
          <Gift className="w-8 h-8 text-neon-gold" />
        </div>

        <div className="space-y-2">
          <span className="text-xs text-[#0F52BA] font-bold tracking-widest uppercase font-mono">Special Creative Gifts</span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white neon-text">هدية خاصة ترحيبية من المايسترو</h2>
          <p className="max-w-2xl text-xs lg:text-sm text-gray-400 font-light leading-relaxed">
            عند طلبك لأي خدمة أو باقة تصميم بقيمة تفوق <span className="text-[#0F52BA] font-bold">150 ريال سعودي</span>، ستحصل تلقائياً على إحدى الهدايا الاستثنائية التالية كعربون تقدير ومحبة:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl pt-4">
          <div className="glass hover:bg-white/10 p-5 flex items-center gap-4 text-right">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <Award className="w-6 h-6 text-neon-gold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">فيديو إهداء خاص مدمج</h4>
              <p className="text-xs text-gray-500 font-light mt-1">مونتاج مهداة دافئة لحساباتك مع هندسة صوتية مميزة لتثبيتها في صفحتك.</p>
            </div>
          </div>

          <div className="glass hover:bg-white/10 p-5 flex items-center gap-4 text-right">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <Sparkles className="w-6 h-6 text-[#0F52BA]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">فيلم قصير 3D Character</h4>
              <p className="text-xs text-gray-500 font-light mt-1">تجسيد فوتوغرافي لشخصيتك الرقمية ثلاثية الأبعاد متحركة لتبرز بها في السوشيال ميديا.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
