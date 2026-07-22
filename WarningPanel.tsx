import React from 'react';
import { AlertOctagon, UserX, ShieldAlert, Phone, Smartphone, AlertCircle, Hash } from 'lucide-react';
import { WarningItem } from '../types';

interface WarningPanelProps {
  warnings: WarningItem[];
}

export default function WarningPanel({ warnings }: WarningPanelProps) {
  const activeWarnings = warnings.filter(w => w.active);

  return (
    <section id="warning" className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 space-y-12">
      {/* Warning Title and Alerts */}
      <div className="relative overflow-hidden glass p-8 text-center space-y-4 shadow-xl border-red-500/30 bg-gradient-to-br from-red-500/10 via-transparent to-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="inline-flex p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-neon-red animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl font-black text-neon-red text-glow-red font-sans">
            تحذير من التعامل مع المحتالين
          </h2>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-300 font-medium">
            حفاظاً على نزاهة المعاملات المالية وتأمين مجتمعنا الرقمي من النصب وانتحال الشخصية، نوثق هنا قائمة بالحالات المكتشفة التي حاولت النصب على عملائنا أو انتحال صفة CRA DESIGN.
          </p>
        </div>

        <div className="flex justify-center">
          <span className="px-4 py-1 bg-red-500/10 border border-red-500/30 text-neon-red text-[10px] rounded-full font-bold">
            ⚠️ انتبه: لا تتعامل مع أي وسيط خارج حساباتنا الرسمية المعلنة!
          </span>
        </div>
      </div>

      {/* Grid of Fraudsters */}
      {activeWarnings.length === 0 ? (
        <div className="text-center py-16 rounded-2xl glass bg-white/5">
          <AlertCircle className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">القائمة نظيفة حالياً. لم يتم تسجيل أي محاولات نصب جديدة.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeWarnings.map((warn) => (
            <div
              key={warn.id}
              id={`warning-card-${warn.id}`}
              className="relative overflow-hidden glass p-6 flex flex-col md:flex-row gap-6 shadow-xl transition-all duration-300 border-red-500/20 hover:border-red-500/50 hover:bg-white/10"
            >
              {/* Profile Image Frame */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-500/20 shadow-lg shadow-red-500/10">
                  <img
                    src={warn.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'}
                    alt={warn.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-red-950/20 mix-blend-color" />
                  <div className="absolute bottom-0 right-0 p-1.5 bg-neon-red rounded-full text-white border-2 border-luxury-black">
                    <UserX className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] text-neon-red font-bold uppercase tracking-wider mt-2 bg-red-500/10 px-2 py-0.5 rounded-full">
                  محتال مـرصـود
                </span>
              </div>

              {/* Information Directory */}
              <div className="space-y-4 flex-grow text-right">
                <div className="border-b border-white/5 pb-2">
                  <h3 className="text-lg font-bold text-white">{warn.name}</h3>
                  <span className="text-xs text-gray-500 font-light">تاريخ الإدراج: مضاف مسبقاً</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300 font-light">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-neon-red shrink-0" />
                    <span className="font-semibold text-gray-400">التطبيق المستعمل:</span>
                    <span className="text-white text-[11px]">{warn.app}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-neon-red shrink-0" />
                    <span className="font-semibold text-gray-400">الآيدي ID / المعرّف:</span>
                    <span className="text-white text-[11px] select-all bg-white/5 px-2 py-0.5 rounded font-mono">{warn.appUserId}</span>
                  </div>

                  {warn.phone && (
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Phone className="w-4 h-4 text-neon-red shrink-0" />
                      <span className="font-semibold text-gray-400">رقم الهاتف المستخدم:</span>
                      <span className="text-white text-[11px] select-all bg-white/5 px-2 py-0.5 rounded font-mono">{warn.phone}</span>
                    </div>
                  )}
                </div>

                <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-xl text-xs space-y-1">
                  <span className="text-neon-red font-bold flex items-center gap-1">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    سبب الإدراج في القائمة السوداء:
                  </span>
                  <p className="text-gray-300 font-light leading-relaxed">{warn.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
