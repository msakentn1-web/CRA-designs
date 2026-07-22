import React, { useState, useEffect } from 'react';
import { 
  Crown, Sparkles, MessageCircle, ArrowUp, CheckCircle, 
  Phone, Mail, Globe, MapPin, Send, Instagram, ShieldAlert 
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portals from './components/Portals';
import OffersSection from './components/OffersSection';
import WorkspacePortal from './components/WorkspacePortal';
import WarningPanel from './components/WarningPanel';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import DiscountModal from './components/DiscountModal';

import { 
  INITIAL_SERVICES, INITIAL_OFFERS, INITIAL_TRIBES_OFFERS, 
  INITIAL_WARNINGS, INITIAL_CONFIG, INITIAL_STATS, INITIAL_COUPONS 
} from './data';
import { Service, ExclusiveOffer, TribeOffer, WarningItem, CartItem, WebConfig, DiscountCoupon } from './types';

// Web Audio API Ambient Synthesizer to create a high-end luxury atmosphere
let audioCtx: AudioContext | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

export default function App() {
  // --- Persistent States from Local Storage ---
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('cra_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [offers, setOffers] = useState<ExclusiveOffer[]>(() => {
    const saved = localStorage.getItem('cra_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [tribeOffers, setTribeOffers] = useState<TribeOffer[]>(() => {
    const saved = localStorage.getItem('cra_tribe_offers');
    return saved ? JSON.parse(saved) : INITIAL_TRIBES_OFFERS;
  });

  const [warnings, setWarnings] = useState<WarningItem[]>(() => {
    const saved = localStorage.getItem('cra_warnings');
    return saved ? JSON.parse(saved) : INITIAL_WARNINGS;
  });

  const [config, setConfig] = useState<WebConfig>(() => {
    const saved = localStorage.getItem('cra_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [coupons, setCoupons] = useState<DiscountCoupon[]>(() => {
    const saved = localStorage.getItem('cra_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(() => {
    const saved = localStorage.getItem('cra_applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Client Interactive States ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cra_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleNotify = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // --- Sync State to Local Storage ---
  useEffect(() => {
    localStorage.setItem('cra_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('cra_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('cra_tribe_offers', JSON.stringify(tribeOffers));
  }, [tribeOffers]);

  useEffect(() => {
    localStorage.setItem('cra_warnings', JSON.stringify(warnings));
  }, [warnings]);

  useEffect(() => {
    localStorage.setItem('cra_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('cra_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('cra_applied_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('cra_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Scroll Detection for active nav highlighting and Back-To-Top button ---
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['hero', 'services', 'offers', 'tribes', 'workspace-portal', 'warning'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveTab(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Soundscape Controller ---
  const toggleSound = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        
        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 3); 
        
        osc1 = audioCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(110, audioCtx.currentTime);
        
        osc2 = audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(165, audioCtx.currentTime);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc1.start();
        osc2.start();
      } catch (e) {
        console.warn('Audio Context block', e);
      }
    } else {
      setSoundEnabled(false);
      if (gainNode && audioCtx) {
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
        setTimeout(() => {
          try {
            osc1?.stop();
            osc2?.stop();
          } catch (e) {}
        }, 1600);
      }
    }
  };

  // --- Cart Helpers ---
  const handleAddToCart = (service: Service) => {
    const existing = cart.find(item => item.id === service.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: service.id, name: service.name, price: service.price, quantity: 1, category: service.category }]);
    }
    setIsCartOpen(true);
  };

  const handleAddOfferToCart = (offer: ExclusiveOffer) => {
    const existing = cart.find(item => item.id === offer.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === offer.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: offer.id, name: offer.title, price: offer.price, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleAddTribeToCart = (tribe: TribeOffer) => {
    const existing = cart.find(item => item.id === tribe.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === tribe.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: tribe.id, name: tribe.tribeName, price: tribe.price, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    if (confirm('هل ترغب بتفريغ سلة التسوق بالكامل؟')) {
      setCart([]);
    }
  };

  // --- Scroll action triggers ---
  const scrollToServices = () => {
    const el = document.getElementById('portals-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToWarning = () => {
    const el = document.getElementById('warning');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg text-white relative flex flex-col justify-between selection:bg-royal-blue selection:text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-blue/5 via-transparent to-transparent pointer-events-none z-0" />

      <Navbar 
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onOpenDiscountModal={() => setIsDiscountModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        announcement={config.announcement}
      />

      <main className="flex-grow z-10 space-y-12">
        <Hero 
          title={config.heroTitle}
          subtitle={config.heroSubtitle}
          imageUrl={config.heroImageUrl}
          onStartOrder={scrollToServices}
          onBrowseServices={scrollToServices}
        />

        <div id="services">
          <Portals 
            services={services}
            selectedPortal={selectedPortal}
            setSelectedPortal={setSelectedPortal}
            onAddToCart={handleAddToCart}
            cart={cart}
            onScrollToWarning={scrollToWarning}
          />
        </div>

        <OffersSection 
          offers={offers}
          tribeOffers={tribeOffers}
          cart={cart}
          onAddOfferToCart={handleAddOfferToCart}
          onAddTribeToCart={handleAddTribeToCart}
        />

        <div id="workspace-portal">
          <WorkspacePortal onNotify={handleNotify} />
        </div>

        <WarningPanel warnings={warnings} />
      </main>

      <footer className="w-full glass bg-[#0B0B0B]/80 border-t border-white/10 py-12 px-4 lg:px-8 mt-12 text-center text-xs text-gray-500 z-10 space-y-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#0F52BA]" />
            <span className="font-black text-white tracking-widest text-sm uppercase font-sans">
              <span className="text-[#0F52BA]">CRA</span> DESIGN
            </span>
          </div>
          <p className="font-light">حقوق الطبع والنشر © 2026 CRA DESIGN. جميع الحقوق محفوظة لـ <span className="text-white font-semibold">Maestro</span>.</p>
        </div>
      </footer>

      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl gradient-blue border border-[#0F52BA]/20 text-white shadow-xl shadow-blue-900/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="العودة للأعلى"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        whatsappNumber={config.whatsappNumber}
        appliedCoupon={appliedCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
      />

      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        services={services}
        onUpdateServices={setServices}
        offers={offers}
        onUpdateOffers={setOffers}
        tribeOffers={tribeOffers}
        onUpdateTribeOffers={setTribeOffers}
        warnings={warnings}
        onUpdateWarnings={setWarnings}
        config={config}
        onUpdateConfig={setConfig}
        stats={INITIAL_STATS}
        coupons={coupons}
        onUpdateCoupons={setCoupons}
      />

      <DiscountModal 
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        coupons={coupons}
        onApplyCoupon={(coupon) => setAppliedCoupon(coupon)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {notification && (
        <div className={`fixed bottom-6 left-6 z-50 p-4 rounded-2xl border backdrop-blur-md flex items-center gap-3 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
          notification.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
        }`}>
          <div className="p-1 rounded-lg bg-white/10">
            {notification.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-rose-400" />}
          </div>
          <span className="text-xs font-bold text-right leading-relaxed">{notification.message}</span>
        </div>
      )}
    </div>
  );
}