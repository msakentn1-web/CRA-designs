import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowDown, ShieldCheck, Zap, Award, Gem } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  onStartOrder: () => void;
  onBrowseServices: () => void;
}

export default function Hero({ title, subtitle, imageUrl, onStartOrder, onBrowseServices }: HeroProps) {
  // Counters animation simulation
  const [designs, setDesigns] = useState(0);
  const [clients, setClients] = useState(0);
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    const duration = 1500; // ms
    const steps = 60;
    const stepTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDesigns(Math.min(Math.floor((1500 / steps) * step), 1500));
      setClients(Math.min(Math.floor((620 / steps) * step), 620));
      setProjects(Math.min(Math.floor((1100 / steps) * step), 1100));
      setExperience(Math.min(Math.floor((7 / steps) * step), 7));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 lg:px-8 py-16 overflow-hidden">
      {/* Background Decorative Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-royal-blue/20 rounded-full filter blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-royal-neon/10 rounded-full filter blur-[130px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Luxury Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 flex flex-col items-center">
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/30 text-royal-neon text-xs font-semibold tracking-wider animate-bounce shadow-lg shadow-royal-blue/10">
          <Sparkles className="w-3.5 h-3.5 text-neon-gold" />
          <span>المتجر الرقمي الرسمي للأعمال الفاخرة</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-royal-neon" />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase font-sans">
            <span className="text-[#0F52BA]">CRA</span> DESIGN
          </h1>
          <p className="text-lg md:text-3xl font-bold tracking-wider neon-text text-white">
            {title}
          </p>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm md:text-base text-gray-400 font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-4">
          <button
            id="hero-order-btn"
            onClick={onStartOrder}
            className="w-full sm:w-auto px-10 py-4 rounded-xl gradient-blue text-white text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20"
          >
            <Gem className="w-4 h-4 text-neon-gold" />
            <span>ابدأ الطلب الآن</span>
          </button>
          
          <button
            id="hero-browse-btn"
            onClick={onBrowseServices}
            className="w-full sm:w-auto px-10 py-4 rounded-xl glass text-white text-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>استعرض الخدمات</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Trust features */}
        <div className="grid grid-cols-3 gap-6 pt-6 max-w-lg w-full text-center text-gray-500 text-[10px] md:text-xs font-medium">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-royal-neon" />
            <span>ضمان جودة ذهبي</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 text-neon-gold" />
            <span>تسليم سريع للغاية</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Award className="w-4 h-4 text-royal-neon" />
            <span>تصميم مخصص 100%</span>
          </div>
        </div>

        {/* Main top image if configured */}
        {imageUrl && (
          <div className="relative w-full max-w-3xl mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(15,82,186,0.2)] group transition-all duration-500 hover:border-[#0F52BA]/50 hover:shadow-[0_0_60px_rgba(15,82,186,0.3)]">
            <img 
              id="hero-main-image"
              src={imageUrl} 
              alt="CRA DESIGN Main Showcase" 
              className="w-full h-auto max-h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/5 text-[10px] text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F52BA] animate-pulse" />
              <span>المعرض الرئيسي المباشر</span>
            </div>
          </div>
        )}

        {/* Dynamic Animated Metrics counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-16">
          {[
            { value: `${designs}+`, label: 'تصميم فخم صُمم', desc: 'أفاتار، تيفوا وخلفية' },
            { value: `${clients}+`, label: 'عميل سعيد ومستمر', desc: 'شخصيات وقادة رومات' },
            { value: `${projects}+`, label: 'مشروع رقمي مكتمل', desc: 'مواقع وتطبيقات ومونتاج' },
            { value: `${experience}+ سنوات`, label: 'خبرة فنية وتطويرية', desc: 'بإشراف المايسترو' }
          ].map((stat, idx) => (
            <div
              key={idx}
              id={`hero-metric-${idx}`}
              className="relative group overflow-hidden glass p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-[#0F52BA] tracking-tight font-mono">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-gray-300 mt-2">
                {stat.label}
              </span>
              <span className="text-[10px] text-gray-500 mt-1">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
