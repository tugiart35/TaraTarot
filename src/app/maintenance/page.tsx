/*
info:
Bağlantılı dosyalar:
- middleware/maintenance.ts: Bakım modu kontrolü (gerekli)
- lib/admin/maintenance-system.ts: Bakım modu yönetimi (gerekli)

Dosyanın amacı:
- Bakım modu sayfası
- Kullanıcı bilgilendirme
- Modern UI/UX

Supabase değişkenleri ve tabloları:
- system_settings: Sistem ayarları

Geliştirme önerileri:
- Animasyonlar
- Geri sayım
- Sosyal medya linkleri

Tespit edilen hatalar:
- ✅ Bakım sayfası oluşturuldu
- ✅ Responsive design eklendi
- ✅ Modern UI eklendi

Kullanım durumu:
- ✅ Gerekli: Bakım modu sayfası
- ✅ Production-ready: Modern ve kullanıcı dostu
*/

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Wrench, Clock, RefreshCw, Home, Mail } from 'lucide-react';

export default function MaintenancePage() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const message = searchParams.get('message') || 'Sistem bakımda. Lütfen daha sonra tekrar deneyin.';

  useEffect(() => {
    // Gerçek zamanlı saat güncellemesi
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/tr';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Ana Kart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 shadow-2xl">
          {/* İkon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 animate-pulse">
              <Wrench className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Başlık */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Sistem Bakımda
          </h1>

          {/* Mesaj */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Zaman Bilgisi */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-slate-300 font-medium">Şu anki zaman</span>
            </div>
            <div className="text-2xl font-mono text-white">
              {currentTime.toLocaleString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Yenile</span>
            </button>
            
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfa</span>
            </button>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-8 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Neler Oluyor?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistem güncellemesi</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Performans iyileştirmesi</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Güvenlik güncellemesi</span>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Acil durumlar için{' '}
            <a 
              href="mailto:support@busbuskimki.com" 
              className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center space-x-1"
            >
              <Mail className="h-4 w-4" />
              <span>support@busbuskimki.com</span>
            </a>
          </p>
        </div>

        {/* Animasyonlu Arka Plan */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
    </div>
  );
}

