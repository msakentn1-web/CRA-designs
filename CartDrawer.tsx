import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, PhoneCall, Gift } from 'lucide-react';
import { CartItem, DiscountCoupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  whatsappNumber: string;
  appliedCoupon: DiscountCoupon | null;
  onRemoveCoupon: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  whatsappNumber,
  appliedCoupon,
  onRemoveCoupon
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercentage) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount);

  // Check if qualifies for a free gift (Subtotal > 150 SAR)
  const qualifiesForGift = subtotal >= 150;

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert('الرجاء إدخال اسمك الكريم لإتمام الطلب.');
      return;
    }

    // Build the exact WhatsApp message format requested by the user
    let itemsText = '';
    cart.forEach((item) => {
      itemsText += `• ${item.name} ×${item.quantity} = ${item.price * item.quantity} ريال\n`;
    });

    let message = `السلام عليكم CRA DESIGN\n\n` +
      `أرغب بطلب الخدمات التالية:\n\n` +
      `${itemsText}\n` +
      `المجموع الفرعي: ${subtotal} ريال\n`;

    if (appliedCoupon) {
      message += `كود الخصم المطبق: ${appliedCoupon.code} (${appliedCoupon.discountPercentage}%)\n` +
                 `قيمة الخصم: -${discountAmount} ريال\n`;
    }

    message += `إجمالي الطلب النهائي:\n` +
      `${total} ريال سعودي\n\n` +
      `الاسم:\n` +
      `${customerName}\n\n` +
      `ملاحظات:\n` +
      `${customerNotes || 'لا توجد ملاحظات إضافية'}`;

    // Generate WhatsApp API link
    const cleanNumber = whatsappNumber.replace('+', '').replace(/\s/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Cart Container Frame */}
      <div className="absolute inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-md glass bg-[#0B0B0B]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/5 border border-[#0F52BA]/30 text-[#0F52BA] rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">سلة الطلبات الخاصة بك</h2>
                <p className="text-[10px] text-gray-500 font-light">استعرض الخدمات وعدّل التفاصيل قبل الإرسال</p>
              </div>
            </div>
            <button 
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="p-4 bg-white/5 rounded-full border border-white/5">
                  <ShoppingBag className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">سلتك فارغة تماماً</h3>
                  <p className="text-xs text-gray-500 font-light mt-1">تصفح البوابات الرقمية وأضف خدماتك المفضلة لبدء طلبك.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* List of items */}
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="p-4 rounded-xl glass border-white/10 flex items-center justify-between gap-4 hover:bg-white/10 transition-all"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white leading-snug">{item.name}</h4>
                      <p className="text-[10px] text-[#0F52BA] font-mono font-bold">{item.price} ريال</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/5 p-0.5">
                        <button
                          id={`decrease-qty-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white font-mono">{item.quantity}</span>
                        <button
                          id={`increase-qty-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button
                        id={`remove-cart-item-${item.id}`}
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-2 text-gray-500 hover:text-neon-red hover:bg-red-500/10 rounded-lg transition-colors"
                        title="حذف الخدمة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Free gift checker panel */}
                {qualifiesForGift ? (
                  <div className="p-4 rounded-xl glass neon-border bg-gradient-to-r from-[#0F52BA]/20 to-transparent flex items-center gap-3 text-right">
                    <Gift className="w-5 h-5 text-neon-gold shrink-0 animate-bounce" />
                    <div>
                      <h4 className="text-[11px] font-bold text-neon-gold">مبروك! لقد تأهلت لهديتك الخاصة 🎁</h4>
                      <p className="text-[9px] text-gray-400 font-light">سيتم مناقشة تفاصيل الهدية (فيديو إهداء أو فيلم 3D) عند معالجة طلبك عبر الواتساب.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl glass border-white/10 text-right">
                    <p className="text-[10px] text-gray-400 font-light">
                      أضف خدمات بقيمة <span className="text-[#0F52BA] font-bold font-mono">{(150 - subtotal)} ريال</span> أخرى لتتأهل للحصول على <span className="text-neon-gold font-bold">فيديو إهداء أو فيلم 3D مجاني</span>!
                    </p>
                  </div>
                )}

                {/* Form Information */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">بيانات العميل ومتطلباته:</span>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-300">اسمك الكريم <span className="text-neon-red">*</span></label>
                    <input
                      id="cart-customer-name"
                      type="text"
                      placeholder="أدخل اسمك هنا..."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#0F52BA] focus:ring-1 focus:ring-[#0F52BA]/30 text-white text-xs outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-300">ملاحظات أو مواصفات مخصصة (اختياري)</label>
                    <textarea
                      id="cart-customer-notes"
                      placeholder="مثال: أريد الألوان نيون زرقاء، اسم الحساب (Maestro)..."
                      rows={3}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#0F52BA] focus:ring-1 focus:ring-[#0F52BA]/30 text-white text-xs outline-none resize-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Billing Details */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-[#0B0B0B]/90 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono">{subtotal} ريال</span>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-green-400">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/30 rounded text-[9px] font-bold font-mono">
                        {appliedCoupon.code} ({appliedCoupon.discountPercentage}%)
                      </span>
                      <span>خصم الكوبون:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">-{discountAmount} ريال</span>
                      <button 
                        onClick={onRemoveCoupon}
                        className="text-[10px] text-red-400 hover:text-red-300 underline font-bold"
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>الهدية الخاصة المؤهلة:</span>
                  <span className="text-neon-gold font-bold">{qualifiesForGift ? 'مؤهل مجاناً' : 'غير مؤهل'}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                  <span>المجموع النهائي للطلب:</span>
                  <span className="text-lg text-[#0F52BA] neon-text font-mono">{total} ريال سعودي</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  id="checkout-whatsapp-btn"
                  onClick={handleCheckout}
                  className="flex-1 py-3 px-4 rounded-xl gradient-blue text-white text-xs font-bold shadow-lg shadow-blue-900/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-neon-gold" />
                  <span>إرسال الطلب عبر WhatsApp</span>
                </button>
                <button
                  id="clear-cart-btn"
                  onClick={onClearCart}
                  className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                  title="تفريغ السلة بالكامل"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
