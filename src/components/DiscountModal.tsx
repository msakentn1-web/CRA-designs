import React, { useState } from 'react';
import { X, Ticket, CheckCircle, AlertTriangle } from 'lucide-react';
import { DiscountCoupon } from '../types';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupons: DiscountCoupon[];
  onApplyCoupon: (coupon: DiscountCoupon) => void;
  onOpenAdmin: () => void;
}

export default function DiscountModal({
  isOpen,
  onClose,
  coupons,
  onApplyCoupon,
  onOpenAdmin
}: DiscountModalProps) {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmed = inputCode.trim();
    if (!trimmed) {
      setError('الرجاء إدخال الكود أولاً.');
      return;
    }

    if (trimmed === '22768061') {
      onOpenAdmin();
      onClose();
      setInputCode('');
      return;
    }

    const matchedCoupon = coupons.find(
      (c) => c.code.toUpperCase() === trimmed.toUpperCase()
    );

    if (matchedCoupon) {
      if (!matchedCoupon.active) {
        setError('عذراً، كود الخصم هذا معطل حالياً.');
        return;
      }
      onApplyCoupon(matchedCoupon);
      setSuccess(`تم تطبيق الخصم بنجاح! خصم بقيمة ${matchedCoupon.discountPercentage}%`);
      setTimeout(() => {
        setInputCode('');
        setSuccess('');
        onClose();
      }, 1500);
    } else {
      setError('كود الخصم الذي أدخلته غير صحيح أو غير متاح.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md glass bg-[#0B0B0B]/95 border border-white/10 rounded-3xl shadow-2xl p-6 text-right overflow-hidden">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/5 border border-[#0F52BA]/30 text-[#0F52BA] rounded-xl">
              <Ticket className="w-5 h-5 text-neon-gold" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">تطبيق كود الخصم</h3>
              <p className="text-[10px] text-gray-500">أدخل الرمز للحصول على تخفيف فوري لطلبك</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-300">أدخل كود الخصم</label>
            <input
              id="discount-modal-input"
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setError('');
              }}
              placeholder="مثال: MAESTRO10..."
              className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#0F52BA] focus:ring-1 focus:ring-[#0F52BA]/30 text-white text-xs outline-none"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 justify-end bg-red-500/5 p-2.5 rounded-lg border border-red-500/10">
              <span>{error}</span>
              <AlertTriangle className="w-4 h-4 text-neon-red shrink-0" />
            </div>
          )}

          {success && (
            <div className="flex items-center gap-1.5 text-xs text-green-400 justify-end bg-green-500/5 p-2.5 rounded-lg border border-green-500/10">
              <span>{success}</span>
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
            </div>
          )}

          <button
            id="apply-coupon-modal-btn"
            type="submit"
            className="w-full py-3 rounded-xl gradient-blue text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            تحقق وتطبيق الخصم
          </button>
        </form>
      </div>
    </div>
  );
}