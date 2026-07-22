# 💎 CRA DESIGN - Luxury Digital Services Marketplace & Web Platform

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?logo=firebase)
![Google Workspace](https://img.shields.io/badge/Google%20Workspace-Drive%20%26%20Gmail-4285F4?logo=google)

**CRA DESIGN** هو متجر إلكتروني ومنصة رقمية فاخرة (Website Marketplace) مخصصة لتقديم خدمات التصميم الاحترافي، الهويات البصرية، تطوير البرمجيات، إنتاج الأفلام والفيديوهات، وباقات العروض الحصرية تحت إشراف المايسترو (Maestro).

---

## 📑 جدول المحتويات / Table of Contents
- [✨ المميزات الرئيسية (Features)](#-المميزات-الرئيسية-features)
- [🛠️ التقنيات المستخدمة (Tech Stack)](#️-التقنيات-المستخدمة-tech-stack)
- [📂 هيكل المشروع (Project Structure)](#-هيكل-المشروع-project-structure)
- [🚀 التشغيل والتطوير (Getting Started)](#-التشغيل-والتطوير-getting-started)
- [☁️ التكامل السحابي (Cloud & Workspace Integration)](#️-التكامل-السحابي-cloud--workspace-integration)

---

## ✨ المميزات الرئيسية (Features)

### 🛒 1. المتجر الرقمي وسلة المشتريات (Digital Services Marketplace)
- **عروض وباقات متنوعة**: باقات الهويات البصرية، المتاجر الإلكترونية، البرمجيات الحصرية، وباقات القبائل المخصصة.
- **سلة مشتريات تفاعلية (`CartDrawer`)**: إضافة الخصومات، حساب الإجمالي تلقائياً، وتوثيق الطلبات بأسلوب فاخر.
- **خصومات تفاعلية (`DiscountModal`)**: عجلة خصم تفاعلية تمنح العملاء أكواد تخفيض مباشرة.

### 🛡️ 2. لوحة تحكم الإدارة (Admin Panel)
- إضافة وتعديل وتحكم كامل في المنتجات والباقات والمقالات.
- إدارة قائمة المحتالين للتحذير والموثوقية (`WarningPanel`).
- متابعة المبيعات والطلبات مباشرة.

### ☁️ 3. البوابة السحابية المتقدمة (Google Workspace Cloud Portal)
- **Google Drive**: رفع وتنزيل ملفات التصميم الأصلية وسندات التوثيق.
- **Gmail API**: إرسال وتلقي المراسلات الرسمية والعقود مع إدارة CRA DESIGN مباشرة وبشكل آمن عبر حساب Google الرسمي.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| التقنية | الاستخدام |
| :--- | :--- |
| **React 19** | واجهات المستخدم التفاعلية والأداء العالي |
| **TypeScript 5.8** | كتابة كود برمجي متين وآمن نمطياً |
| **Tailwind CSS v4** | التصميم والتنسيق الرياضي والفاخر بأسلوب أنيق |
| **Vite 6.2** | خادم التطوير والخدمة البرمجية فائقة السرعة |
| **Lucide React** | أيقونات متجهة فائقة الدقة والنقاء |
| **Firebase Auth & Firestore** | الحماية، التوثيق، وقواعد البيانات السحابية |
| **Google Drive & Gmail API** | مشاركة المستندات والمراسلات البريدية الرسمية |

---

## 📂 هيكل المشروع (Project Structure)

```
cra-design-marketplace/
├── index.html                  # مدخل الصفحة الرئيسية
├── metadata.json               # بيانات وصف المنصة والتراخيص
├── package.json                # التبعيات وأوامر التشغيل
├── tsconfig.json               # إعدادات TypeScript
├── vite.config.ts              # إعدادات Vite للبناء والتطوير
├── firebase-applet-config.json # إعدادات مشروع Firebase
├── src/
│   ├── main.tsx                # نقطة البدء وتفعيل React
│   ├── App.tsx                 # المكون الرئيسي والمنسق للواجهات
│   ├── index.css               # التنسيقات الرئيسية و Tailwind
│   ├── types.ts                # الأنواع والواجهات (TypeScript Interfaces)
│   ├── data.ts                 # البيانات الافتراضية للخدمات والمقالات
│   ├── lib/
│   │   └── workspace.ts        # وحدة الاتصال بـ Google Drive و Gmail
│   └── components/
│       ├── Navbar.tsx          # شريط التنقل العلوي المستجيب
│       ├── Hero.tsx            # الواجهة الترحيبية الفاخرة
│       ├── Portals.tsx         # بوابات الخدمات والمعرض
│       ├── OffersSection.tsx   # عرض الخصومات والباقات
│       ├── WorkspacePortal.tsx # البوابة السحابية وتكامل Google
│       ├── CartDrawer.tsx      # سلة المشتريات والدفع
│       ├── DiscountModal.tsx   # نافذة عجلة الخصم التفاعلية
│       ├── WarningPanel.tsx    # السجل الوطني للتحذير الموثوق
│       └── AdminPanel.tsx      # لوحة التحكم والإدارة الشاملة
```

---

## 🚀 التشغيل والتطوير (Getting Started)

### 1. تثبيت الحزم والتبعيات (Install Dependencies)
```bash
npm install
```

### 2. تشغيل خادم التطوير (Run Development Server)
```bash
npm run dev
```
سيعمل الموقع على الرابط: `http://localhost:3000`

### 3. بناء المشروع للإنتاج (Build for Production)
```bash
npm run build
```

---

## 📜 الترخيص (License)
جميع الحقوق محفوظة لـ **CRA DESIGN** © 2026.
