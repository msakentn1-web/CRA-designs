import React, { useState } from 'react';
import { Crown, ShoppingBag, Ticket, Volume2, VolumeX, Menu, X, AlertTriangle } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onOpenDiscountModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  announcement: string;
}

export default function Navbar({
  cart,
  setIsCartOpen,
  onOpenDiscountModal,
  activeTab,
  setActiveTab,
  soundEnabled,
  toggleSound,
  announcement
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'services', label: 'الخدمات' },
    { id: 'offers', label: 'العروض' },
    { id: 'tribes', label: 'عروض القبائل' },
    { id: 'workspace-portal', label: 'البوابة السحابية' },
    { id: 'warning', label: 'التحذير', icon: <AlertTriangle className="w-4 h-4 text-neon-red inline mr-1" /> },
    { id: 'contact', label: 'تواصل معنا' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Marquee */}
      <div className="w-full bg-luxury-black border-b border-royal-blue/30 py-1.5 overflow-hidden text-xs text-royal-neon font-medium">
        <div className="whitespace-nowrap inline-block animate-[marquee_25s_linear_infinite] hover:pause direction-ltr">
          <span className="mx-8 font-semibold">{announcement}</span>
          <span className="mx-8 font-semibold">{announcement}</span>
          <span className="mx-8 font-semibold">{announcement}</span>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translate3d(100%, 0, 0); }
            100% { transform: translate3d(-100%, 0, 0); }
          }
        `}</style>
      </div>

      {/* Main Glass Navbar */}
      <nav className="w-full glass bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl glass bg-gradient-to-br from-[#0F52BA] to-black border border-[#0F52BA]/40 shadow-lg shadow-[#0F52BA]/20 overflow-hidden">
              <Crown className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white font-sans">
                <span className="text-[#0F52BA]">CRA</span> DESIGN
              </span>
              <span className="text-[9px] text-gray-400 tracking-widest uppercase -mt-1">By Maestro</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1 ${
                    isActive
                      ? 'gradient-blue text-white shadow-lg shadow-blue-900/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Control Utility Buttons */}
          <div className="flex items-center gap-2">
            {/* Ambient Audio Button */}
            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                soundEnabled 
                  ? 'bg-[#0F52BA]/10 border-[#0F52BA]/40 text-[#0F52BA] hover:bg-[#0F52BA]/20' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title={soundEnabled ? "إيقاف الموسيقى الهادئة" : "تشغيل الموسيقى الهادئة"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Discount Code trigger button */}
            <button
              id="discount-code-btn"
              onClick={onOpenDiscountModal}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#0F52BA]/40 hover:bg-[#0F52BA]/5 transition-all duration-300 flex items-center gap-1 cursor-pointer"
              title="كود الخصم"
            >
              <Ticket className="w-4 h-4 text-neon-gold" />
              <span className="text-[11px] font-bold hidden sm:inline text-gray-300 hover:text-white">كود الخصم</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl gradient-blue text-white border border-[#0F52BA]/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-900/20 group"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-neon-gold text-[10px] font-bold text-black border-2 border-luxury-black animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full mt-4 p-4 rounded-2xl bg-luxury-card border border-white/5 space-y-2 animate-in fade-in slide-in-from-top-5 duration-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-royal-blue/20 border-r-4 border-royal-blue text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-royal-neon shadow shadow-royal-neon' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
