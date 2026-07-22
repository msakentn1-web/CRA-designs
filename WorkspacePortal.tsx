import React, { useState, useEffect } from 'react';
import { 
  Folder, FileText, Mail, Upload, RefreshCw, LogOut, Send, 
  CheckCircle, Loader2, User, ExternalLink, ShieldCheck, 
  Plus, Inbox, AlertCircle, FileImage, FileCode, Lock
} from 'lucide-react';
import { 
  googleSignIn, logoutWorkspace, initAuth, DriveFile, 
  listDriveFiles, getOrCreateWorkspaceFolder, uploadFileToDrive, 
  sendGmailMessage, listGmailMessages, GmailMessage 
} from '../lib/workspace';
import { User as FirebaseUser } from 'firebase/auth';

interface WorkspacePortalProps {
  onNotify: (msg: string, type: 'success' | 'error') => void;
}

export default function WorkspacePortal({ onNotify }: WorkspacePortalProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'drive' | 'gmail'>('drive');

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [driveLoading, setDriveLoading] = useState<boolean>(false);
  const [workspaceFolderId, setWorkspaceFolderId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Gmail state
  const [gmailMessages, setGmailMessages] = useState<GmailMessage[]>([]);
  const [gmailLoading, setGmailLoading] = useState<boolean>(false);
  const [emailSubject, setEmailSubject] = useState<string>('طلب تصميم شعار وهوية بصرية - CRA DESIGN');
  const [emailBody, setEmailBody] = useState<string>(
    `<div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
  <h2 style="color: #0F52BA; border-bottom: 2px solid #0F52BA; padding-bottom: 8px;">طلب برمجيات وتصاميم فاخرة</h2>
  <p>السلام عليكم مايسترو،</p>
  <p>أرغب في الاستفادة من خبراتكم الاستثنائية في تقديم الخدمات الرقمية والتصاميم الراقية لمشروعي.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr style="background-color: #f8f9fa;">
      <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">نوع الطلب</th>
      <td style="border: 1px solid #ddd; padding: 10px;">هوية بصرية كاملة وتصميم شعار فاخر</td>
    </tr>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">ملاحظات خاصة</th>
      <td style="border: 1px solid #ddd; padding: 10px;">أرغب في تطبيق أسلوب بساطة ذكية (Minimalist) مع تداخل درجات الأزرق الملكي والذهبي.</td>
    </tr>
  </table>
  <p style="font-weight: bold; color: #0F52BA;">يرجى التواصل معي فور قراءة بريدي الإلكتروني للبدء بالخطوات الرسمية.</p>
  <p>مع خالص التقدير،<br/>[اسمك الكريم]</p>
</div>`
  );

  const emailTemplates = [
    {
      label: 'طلب تصميم شعار',
      subject: 'طلب تصميم شعار وهوية بصرية - CRA DESIGN',
      body: `<div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
  <h2 style="color: #0F52BA; border-bottom: 2px solid #0F52BA; padding-bottom: 8px;">طلب برمجيات وتصاميم فاخرة</h2>
  <p>السلام عليكم مايسترو،</p>
  <p>أرغب في الاستفادة من خبراتكم الاستثنائية في تقديم الخدمات الرقمية والتصاميم الراقية لمشروعي.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr style="background-color: #f8f9fa;">
      <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">نوع الطلب</th>
      <td style="border: 1px solid #ddd; padding: 10px;">هوية بصرية كاملة وتصميم شعار فاخر</td>
    </tr>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">ملاحظات خاصة</th>
      <td style="border: 1px solid #ddd; padding: 10px;">أرغب في تطبيق أسلوب بساطة ذكية (Minimalist) مع تداخل درجات الأزرق الملكي والذهبي.</td>
    </tr>
  </table>
  <p style="font-weight: bold; color: #0F52BA;">يرجى التواصل معي فور قراءة بريدي الإلكتروني للبدء بالخطوات الرسمية.</p>
  <p>مع خالص التقدير،<br/>[اسمك الكريم]</p>
</div>`
    },
    {
      label: 'تطوير تطبيق ويب كامل',
      subject: 'استشارة وتطوير تطبيق ويب متكامل - CRA DESIGN',
      body: `<div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
  <h2 style="color: #0F52BA; border-bottom: 2px solid #0F52BA; padding-bottom: 8px;">طلب تطوير نظام رقمي متقدم</h2>
  <p>السلام عليكم ورحمة الله وبركاته،</p>
  <p>أرغب في حجز خدمة تطوير موقع وتطبيق ويب خاص فائق السرعة والأداء بتصميم فاخر.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr style="background-color: #f8f9fa;">
      <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">أهداف المنصة</th>
      <td style="border: 1px solid #ddd; padding: 10px;">تقديم لوحة تحكم متفاعلة وإحصائيات مباشرة وتكامل مع واجهات الدفع والسحابة.</td>
    </tr>
    <tr>
      <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">تفاصيل إضافية</th>
      <td style="border: 1px solid #ddd; padding: 10px;">المشروع يتطلب واجهات عصرية ناعمة مستجيبة بالكامل وتطبيق معايير حماية مشددة.</td>
    </tr>
  </table>
  <p>بانتظار توجيهاتكم الكريمة ومناقشة تفاصيل العقد والتنفيذ.</p>
  <p>تحياتي،<br/>[اسمك الكريم]</p>
</div>`
    },
    {
      label: 'استشارة فنية مع المايسترو',
      subject: 'طلب جلسة استشارية وتوجيه فني - CRA DESIGN',
      body: `<div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
  <h2 style="color: #0F52BA; border-bottom: 2px solid #0F52BA; padding-bottom: 8px;">طلب استشارة رقمية فاخرة</h2>
  <p>مرحباً مايسترو،</p>
  <p>نود حجز جلسة استشارية مخصصة معكم لمراجعة استراتيجيتنا الرقمية وتطوير الهوية الهندسية لشركتنا.</p>
  <p>نتطلع لتقييمكم الاحترافي والوقوف على أحدث التقنيات القابلة للتطبيق.</p>
  <p>يرجى التنسيق لإرسال رابط الإجتماع وتحديد الموعد الأنسب لكم.</p>
  <p>تحياتي الطيبة،<br/>[اسم الشركة أو اسمك]</p>
</div>`
    }
  ];

  // Load user status
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, activeToken) => {
        setUser(currentUser);
        setToken(activeToken);
        setLoading(false);
        loadDriveData(activeToken);
        loadGmailData(activeToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setActionLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        onNotify('تم تسجيل الدخول بنجاح عبر حساب Google وتوصيل خدمات السحابة والبريد!', 'success');
        loadDriveData(res.accessToken);
        loadGmailData(res.accessToken);
      }
    } catch (error) {
      console.error(error);
      onNotify('فشل تسجيل الدخول أو تم إلغاؤه من قبلك.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutWorkspace();
      setUser(null);
      setToken(null);
      setDriveFiles([]);
      setGmailMessages([]);
      onNotify('تم تسجيل الخروج بنجاح من بوابة Google Workspace.', 'success');
    } catch (error) {
      onNotify('حدث خطأ أثناء تسجيل الخروج.', 'error');
    }
  };

  const loadDriveData = async (accessToken: string) => {
    setDriveLoading(true);
    try {
      const files = await listDriveFiles(accessToken);
      setDriveFiles(files);
      
      // Look for the workspace folder id
      const folderId = await getOrCreateWorkspaceFolder(accessToken);
      setWorkspaceFolderId(folderId);
    } catch (err) {
      console.error(err);
    } finally {
      setDriveLoading(false);
    }
  };

  const loadGmailData = async (accessToken: string) => {
    setGmailLoading(true);
    try {
      const msgs = await listGmailMessages(accessToken);
      setGmailMessages(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setGmailLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!token) return;
    setActionLoading(true);
    try {
      const id = await getOrCreateWorkspaceFolder(token);
      setWorkspaceFolderId(id);
      onNotify('تم تفعيل وتوثيق مجلد CRA_DESIGN_WORKSPACE على Google Drive بنجاح!', 'success');
      loadDriveData(token);
    } catch (err) {
      onNotify('فشل إنشاء أو جلب المجلد السحابي.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadFile = async () => {
    if (!token || !selectedFile) return;
    setActionLoading(true);
    try {
      let folderId = workspaceFolderId || undefined;
      if (!folderId) {
        folderId = await getOrCreateWorkspaceFolder(token);
        setWorkspaceFolderId(folderId);
      }
      
      const uploaded = await uploadFileToDrive(token, selectedFile, folderId);
      onNotify(`تم رفع الملف "${uploaded.name}" بنجاح إلى مجلد Drive السحابي!`, 'success');
      setSelectedFile(null);
      loadDriveData(token);
    } catch (err) {
      onNotify('حدث خطأ أثناء رفع الملف السحابي. يرجى المحاولة لاحقاً.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Mandatory explicit confirmation Dialog before sending Gmail
  const handleSendEmail = async () => {
    if (!token) return;
    
    // EXPLICIT CONFIRMATION MANDATORY
    const confirmSend = window.confirm(
      'هل أنت متأكد من رغبتك في إرسال هذه الرسالة الرسمية من حساب بريدك الإلكتروني الشخصي (Gmail) إلى بريد الإدارة (starfactory.app@gmail.com)؟'
    );
    if (!confirmSend) return;

    setActionLoading(true);
    try {
      await sendGmailMessage(
        token,
        'starfactory.app@gmail.com',
        emailSubject,
        emailBody
      );
      onNotify('تم إرسال رسالتك وتصميمك المبدئي إلى بريد المايسترو بنجاح عبر Gmail!', 'success');
      loadGmailData(token);
    } catch (err) {
      onNotify('فشل إرسال البريد الإلكتروني. تحقق من اتصالك أو الصلاحيات.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <FileImage className="w-5 h-5 text-neon-gold" />;
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-rose-500" />;
    if (mimeType.includes('folder')) return <Folder className="w-5 h-5 text-amber-500" />;
    if (mimeType.includes('javascript') || mimeType.includes('html') || mimeType.includes('json')) {
      return <FileCode className="w-5 h-5 text-cyan-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  const formatBytes = (bytes?: string, decimals = 2) => {
    if (!bytes) return '';
    const b = parseInt(bytes);
    if (isNaN(b) || b === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <section id="workspace-portal" className="w-full max-w-6xl mx-auto px-4 py-16 scroll-mt-24 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#0F52BA]/10 border border-[#0F52BA]/30 px-4 py-1.5 rounded-full text-xs text-royal-neon font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-royal-neon" />
          بوابة العميل الرقمية الفاخرة
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          تكامل المجلد السحابي والبريد الذكي
        </h2>
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-400 font-light leading-relaxed">
          قم بتوصيل حساب Google المعتمد لديك بشكل فوري لإدارة ملفات التصميم الفنية على Google Drive، ومراسلة المايسترو عبر بريدك الشخصي بضغطة واحدة وبأعلى حماية وسرية تامة.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 glass rounded-3xl border-white/5 space-y-4">
          <Loader2 className="w-8 h-8 text-[#0F52BA] animate-spin" />
          <p className="text-xs text-gray-500 font-light">يتم تأمين وتحميل بوابة العميل السحابية...</p>
        </div>
      ) : !user ? (
        // Beautiful Luxury Google Sign In Page
        <div className="max-w-md mx-auto p-8 rounded-3xl glass border border-white/10 hover:border-[#0F52BA]/30 transition-all duration-500 space-y-6 text-center shadow-xl shadow-black/40">
          <div className="flex items-center justify-center mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F52BA] to-black border border-[#0F52BA]/30 shadow-lg shadow-[#0F52BA]/10">
            <Folder className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">تفعيل البوابة السحابية الفاخرة</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              تتيح لك البوابة رفع ومشاركة لوحات الإلهام وتصاميم الشعارات المبدئية وسندات الدفع على Drive بشكل مباشر وآمن، وإرسال عقود العمل آلياً.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLogin}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-white text-black hover:bg-gray-100 font-bold text-xs transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
            >
              {actionLoading ? (
                <Loader2 className="w-4 h-4 text-black animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              )}
              <span>تسجيل الدخول الآمن بواسطة Google</span>
            </button>
          </div>

          <div className="text-[10px] text-gray-500 font-light flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-gray-500" />
            <span>بياناتك السحابية مشفرة بالكامل ولا نطلع عليها إطلاقاً.</span>
          </div>
        </div>
      ) : (
        // Authenticated Dashboard
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar / User Info card */}
          <div className="lg:col-span-4 p-6 rounded-3xl glass border border-white/10 space-y-6">
            <div className="flex items-center gap-4 text-right">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'Client'} 
                  className="w-12 h-12 rounded-full border-2 border-[#0F52BA] shadow-lg shadow-[#0F52BA]/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center text-white font-bold text-lg">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {user.displayName || 'عميل متميز'}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[10px] text-gray-400 font-light truncate max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Quick Switch Navigation */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setActiveSubTab('drive')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeSubTab === 'drive'
                    ? 'gradient-blue text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  مستندات وتصاميم Google Drive
                </span>
                <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full">
                  {driveFiles.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSubTab('gmail')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeSubTab === 'gmail'
                    ? 'gradient-blue text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  بريد ومراسلات المايسترو Gmail
                </span>
                <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full">
                  {gmailMessages.length}
                </span>
              </button>
            </div>

            {/* Quick actions info */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-right">
              <h5 className="text-[11px] font-bold text-neon-gold">مجالات التعاون السحابي:</h5>
              <ul className="text-[10px] text-gray-400 font-light space-y-1.5 list-disc list-inside">
                <li>رفع شعار شركتك الحالي لإعادة صياغته.</li>
                <li>تنزيل مخرجات العمل وملفات الـ Source الأصلية.</li>
                <li>توثيق عمليات دفع رسوم الخدمات الفنية.</li>
                <li>إدارة مذكرات العمل وعقود البرمجيات الحصرية.</li>
              </ul>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-300 text-xs font-bold transition-all duration-300 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>إنهاء جلسة البوابة السحابية</span>
            </button>
          </div>

          {/* Main Workspace Interactive Area */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl glass border border-white/10 min-h-[500px] flex flex-col justify-between">
            {activeSubTab === 'drive' ? (
              // ==========================================
              // Google Drive Interactive Sub-Tab
              // ==========================================
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1 text-right">
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <Folder className="w-5 h-5 text-[#0F52BA]" />
                      مستودع ملفاتك السحابية (Google Drive)
                    </h3>
                    <p className="text-xs text-gray-400 font-light">
                      عرض ورفع وتنزيل الأصول الرقمية للمشاريع المشتركة.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadDriveData(token!)}
                      disabled={driveLoading}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50"
                      title="تحديث قائمة الملفات"
                    >
                      <RefreshCw className={`w-4 h-4 ${driveLoading ? 'animate-spin' : ''}`} />
                    </button>
                    {!workspaceFolderId && (
                      <button
                        onClick={handleCreateFolder}
                        disabled={actionLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#0F52BA]/30 bg-[#0F52BA]/10 text-royal-neon text-[11px] font-bold transition-all hover:bg-[#0F52BA]/20 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        تجهيز مجلد CRA السحابي
                      </button>
                    )}
                  </div>
                </div>

                {/* Upload Section */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-white text-right">مشاركة ملف أو لوحة الهوية بضغطة زر:</h4>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:flex-grow">
                      <input 
                        type="file" 
                        id="drive-file-uploader" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedFile(e.target.files[0]);
                          }
                        }}
                      />
                      <label 
                        htmlFor="drive-file-uploader"
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/20 hover:border-[#0F52BA] cursor-pointer hover:bg-white/5 transition-all text-center"
                      >
                        {selectedFile ? (
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-neon-gold block truncate max-w-[300px]">
                              {selectedFile.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-light block">
                              الحجم: {formatBytes(selectedFile.size.toString())}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-5 h-5 text-gray-400 mx-auto" />
                            <span className="text-xs text-gray-400 font-light block">
                              اسحب ملفك هنا أو انقر للتصفح والرفع السحابي الفوري
                            </span>
                          </div>
                        )}
                      </label>
                    </div>

                    <button
                      onClick={handleUploadFile}
                      disabled={!selectedFile || actionLoading}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl gradient-blue text-white text-xs font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>رفع الملف إلى Drive</span>
                    </button>
                  </div>
                </div>

                {/* Files Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-light">
                      تظهر أحدث الملفات في حسابك، بما في ذلك مجلد CRA_DESIGN_WORKSPACE الخاص بك.
                    </span>
                    <h4 className="text-xs font-bold text-gray-300 text-right">ملفاتك الموثقة:</h4>
                  </div>

                  {driveLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#0F52BA]" />
                      <span className="text-xs font-light">يتم قراءة مستندات Google Drive...</span>
                    </div>
                  ) : driveFiles.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-white/5 bg-white/[0.02] text-gray-500 text-xs font-light space-y-2">
                      <Inbox className="w-8 h-8 text-gray-600 mx-auto" />
                      <p>لا توجد ملفات متوفرة حالياً في مجلد Drive الخاص بك.</p>
                      <p className="text-[10px] text-gray-600">ارفع ملفاً بالأعلى ليظهر هنا فوراً!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[250px] overflow-y-auto pr-1">
                      {driveFiles.map((file) => (
                        <div 
                          key={file.id}
                          className="p-3.5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between text-right"
                        >
                          <a 
                            href={file.webViewLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                            title="عرض الملف الأصلي"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <div className="space-y-0.5 max-w-[80%]">
                            <h5 className="text-xs font-bold text-white truncate" title={file.name}>
                              {file.name}
                            </h5>
                            <div className="flex items-center justify-end gap-2 text-[9px] text-gray-500 font-light">
                              {file.size && <span>{formatBytes(file.size)}</span>}
                              {file.size && <span>•</span>}
                              <span>{file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('ar-EG') : ''}</span>
                            </div>
                          </div>

                          <div className="p-2 bg-white/[0.03] border border-white/5 rounded-xl ml-2">
                            {getFileIcon(file.mimeType)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // ==========================================
              // Gmail Agency Center Sub-Tab
              // ==========================================
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1 text-right">
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#0F52BA]" />
                      مركز المراسلات الرسمي والمذكرات الفنية (Gmail)
                    </h3>
                    <p className="text-xs text-gray-400 font-light">
                      إرسال وتوثيق خطط الهوية والعقود البرمجية من حسابك مباشرة.
                    </p>
                  </div>

                  <button
                    onClick={() => loadGmailData(token!)}
                    disabled={gmailLoading}
                    className="p-2 self-end sm:self-auto rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50"
                    title="تحديث قائمة الرسائل"
                  >
                    <RefreshCw className={`w-4 h-4 ${gmailLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* Send Email Block */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-light">
                      اختر مسودة جاهزة واكتتبها للمايسترو بكل راحة وسرعة.
                    </span>
                    <h4 className="text-xs font-bold text-gray-300 text-right">تحضير وإرسال رسالة بريدية:</h4>
                  </div>

                  {/* Templates Quick Bar */}
                  <div className="flex flex-wrap items-center gap-2 justify-end">
                    {emailTemplates.map((tpl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setEmailSubject(tpl.subject);
                          setEmailBody(tpl.body);
                          onNotify(`تم تطبيق مسودة "${tpl.label}" بنجاح!`, 'success');
                        }}
                        className="px-3 py-1.5 rounded-xl text-[10px] font-bold border border-white/10 hover:border-[#0F52BA]/40 bg-white/5 text-gray-300 hover:text-white transition-all cursor-pointer"
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>

                  {/* Subject and Body inputs */}
                  <div className="space-y-3">
                    <div className="space-y-1 text-right">
                      <label className="text-[10px] font-bold text-gray-400 block">موضوع الرسالة:</label>
                      <input 
                        type="text" 
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full text-right p-3 rounded-xl bg-luxury-black/60 border border-white/10 focus:border-[#0F52BA] outline-none text-xs text-white"
                        placeholder="أدخل موضوع البريد هنا..."
                      />
                    </div>

                    <div className="space-y-1 text-right">
                      <label className="text-[10px] font-bold text-gray-400 block">نص الرسالة (تنسيق HTML):</label>
                      <textarea 
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        rows={6}
                        className="w-full text-right p-3 rounded-xl bg-luxury-black/60 border border-white/10 focus:border-[#0F52BA] outline-none text-xs text-white font-mono"
                        placeholder="نص رسالتك الفاخر..."
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-light">
                        <AlertCircle className="w-3.5 h-3.5 text-neon-gold" />
                        <span>سيتم إرسالها من بريدك الشخصي الموثق</span>
                      </div>

                      <button
                        onClick={handleSendEmail}
                        disabled={actionLoading || !emailSubject || !emailBody}
                        className="px-6 py-2.5 rounded-xl gradient-blue text-white text-xs font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                      >
                        {actionLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        <span>إرسال بريد المايسترو</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Communication Feed / Recent mails */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-gray-300 text-right">مراسلاتك الأخيرة على Gmail:</h4>
                  
                  {gmailLoading ? (
                    <div className="py-8 flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#0F52BA]" />
                      <span className="text-[11px] font-light">يتم قراءة صندوق البريد...</span>
                    </div>
                  ) : gmailMessages.length === 0 ? (
                    <div className="p-6 text-center rounded-2xl border border-white/5 bg-white/[0.01] text-gray-500 text-xs font-light">
                      <p>لا توجد مراسلات سابقة ظاهرة في أحدث الصندوق.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                      {gmailMessages.map((msg) => (
                        <div 
                          key={msg.id}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between text-right"
                        >
                          <span className="text-[9px] text-gray-500 font-mono mt-1 shrink-0">
                            {msg.date}
                          </span>

                          <div className="space-y-0.5 max-w-[85%]">
                            <h5 className="text-xs font-bold text-white truncate">
                              {msg.subject}
                            </h5>
                            <p className="text-[10px] text-gray-400 font-light line-clamp-1">
                              {msg.snippet}
                            </p>
                            <div className="text-[9px] text-[#0F52BA] font-light">
                              من: {msg.from}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Micro assurance line */}
            <div className="pt-4 text-center text-[10px] text-gray-600 font-light border-t border-white/5 flex items-center justify-center gap-1">
              <span>جميع العمليات تتم بشكل مباشر من خلال واجهات Google APIs الرسمية والآمنة.</span>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
