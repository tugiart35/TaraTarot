'use client';

import { WifiOff, RefreshCw, Home, Moon } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative mb-6">
            <Moon className="w-16 h-16 text-purple-300 mx-auto mb-2" />
            <WifiOff className="w-8 h-8 text-red-400 absolute -top-1 -right-1" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            İnternet Bağlantısı Yok
          </h1>
          <p className="text-gray-300 text-lg mb-4">
            Şu anda çevrimdışısınız. Bağlantınızı kontrol edin ve tekrar deneyin.
          </p>
          
          <div className="bg-purple-800/30 rounded-lg p-4 mb-6">
            <p className="text-purple-200 text-sm">
              💡 <strong>İpucu:</strong> Bağlantınız geldiğinde sayfa otomatik olarak yenilenecek
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRefresh}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Tekrar Dene
          </button>
          
          <Link
            href="/tr"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
          
          <div className="text-sm text-gray-400 mt-6">
            <p>🔮 Çevrimdışı özellikler yakında eklenecek</p>
            <p className="mt-1">📱 PWA desteği aktif</p>
          </div>
        </div>
      </div>
    </div>
  );
}
