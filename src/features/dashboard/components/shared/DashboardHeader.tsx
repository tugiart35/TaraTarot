/*
info:
Bağlantılı dosyalar:
- lucide-react: İkonlar için (gerekli)
- @/hooks/useTranslations: i18n desteği için (gerekli)
- @/lib/supabase/client: Çıkış yapma için (gerekli)

Dosyanın amacı:
- Dashboard sayfasının üst navigasyon barını oluşturur
- Desktop ve mobile navigasyon menülerini içerir
- Logo, menü linkleri, çıkış yap butonu ve mobile menu toggle özellikleri sunar

Geliştirme ve öneriler:
- Responsive tasarım ve modern UI
- Active state yönetimi
- Mobile-first yaklaşım
- Accessibility desteği
- Çıkış yap butonu eklendi (desktop ve mobile)

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz kod yapısı, açık prop isimleri
- Optimizasyon: Gereksiz re-render'lar önlenmiş
- Yeniden Kullanılabilirlik: Modüler bileşen yapısı
- Güvenlik: Güvenli navigation, state yönetimi ve çıkış yapma

Gereklilik ve Kullanım Durumu:
- DashboardHeader: Gerekli, dashboard navigasyonu için
- currentLocale: Gerekli, dil desteği için
- sidebarOpen: Gerekli, mobile menu kontrolü için
- setSidebarOpen: Gerekli, mobile menu state yönetimi için
- handleLogout: Gerekli, çıkış yapma fonksiyonu için
*/

'use client';

import {
  Moon,
  BarChart3,
  BookOpen,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { supabase } from '@/lib/supabase/client';

interface DashboardHeaderProps {
  currentLocale: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({
  currentLocale,
  sidebarOpen,
  setSidebarOpen,
}: DashboardHeaderProps) {
  const { t: _translate } = useTranslations();

  // Çıkış yap fonksiyonu - Basitleştirilmiş
  const handleLogout = async () => {
    console.log('🚪 DashboardHeader: Çıkış yapma işlemi başlatılıyor...');
    
    try {
      console.log('🔐 DashboardHeader: Supabase signOut çağrılıyor...');
      const { error } = await supabase.auth.signOut();
      
      console.log('🔍 DashboardHeader: SignOut sonucu:', { hasError: !!error, errorMessage: error?.message });
      
      // Her durumda temizlik yap
      console.log('🧹 DashboardHeader: Veriler temizleniyor...');
      localStorage.clear();
      sessionStorage.clear();
      
      // Cookie'leri temizle
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      console.log('✅ DashboardHeader: Temizlik tamamlandı, yönlendiriliyor...');
      
      // Kısa bir bekleme sonrası yönlendir
      setTimeout(() => {
        console.log('🔄 DashboardHeader: Yönlendirme:', `/${currentLocale}`);
        window.location.href = `/${currentLocale}`;
      }, 100);
      
    } catch (error) {
      console.error('❌ DashboardHeader: Çıkış yapma hatası:', error);
      
      // Hata durumunda da temizlik yap
      localStorage.clear();
      sessionStorage.clear();
      
      // Cookie'leri temizle
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      console.log('🔄 DashboardHeader: Hata durumunda yönlendiriliyor...');
      window.location.href = `/${currentLocale}`;
    }
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 admin-sidebar border-b border-mystical-700/50'>
      <div className='flex items-center justify-between h-16 px-4 md:px-6'>
        {/* Logo */}
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-gradient-mystic rounded-lg flex items-center justify-center'>
            <Moon className='h-5 w-5 text-cosmic-black' />
          </div>
          <span className='text-xl font-bold text-text-celestial'>
            Busbuskimki
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-1'>
          <a
            href={`/${currentLocale}/dashboard`}
            className='flex items-center space-x-2 px-4 py-2 text-gold bg-crystal-clear border-b-2 border-gold rounded-t-lg transition-colors'
          >
            <BarChart3 className='h-4 w-4' />
            <span className='font-medium'>Dashboard</span>
          </a>
          <a
            href={`/${currentLocale}/dashboard/readings`}
            className='flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors'
          >
            <BookOpen className='h-4 w-4' />
            <span>Okumalar</span>
          </a>
          <a
            href={`/${currentLocale}/dashboard/statistics`}
            className='flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors'
          >
            <TrendingUp className='h-4 w-4' />
            <span>İstatistikler</span>
          </a>
          <a
            href={`/${currentLocale}/dashboard/settings`}
            className='flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors'
          >
            <Settings className='h-4 w-4' />
            <span>Ayarlar</span>
          </a>
          <button
            onClick={handleLogout}
            className='flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-t-lg transition-colors'
            title='Çıkış Yap'
          >
            <LogOut className='h-4 w-4' />
            <span>Çıkış</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='md:hidden p-2 rounded-md text-text-muted hover:text-text-celestial hover:bg-crystal-clear'
          aria-label='Toggle mobile menu'
        >
          {sidebarOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {sidebarOpen && (
        <div className='md:hidden border-t border-mystical-700/50'>
          <nav className='px-4 py-2 space-y-1'>
            <a
              href={`/${currentLocale}/dashboard`}
              className='flex items-center space-x-3 px-4 py-3 text-gold bg-crystal-clear border-l-4 border-gold rounded-lg'
              onClick={() => setSidebarOpen(false)}
            >
              <BarChart3 className='h-5 w-5' />
              <span className='font-medium'>Dashboard</span>
            </a>
            <a
              href={`/${currentLocale}/dashboard/readings`}
              className='flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors'
              onClick={() => setSidebarOpen(false)}
            >
              <BookOpen className='h-5 w-5' />
              <span>Okumalar</span>
            </a>
            <a
              href={`/${currentLocale}/dashboard/statistics`}
              className='flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors'
              onClick={() => setSidebarOpen(false)}
            >
              <TrendingUp className='h-5 w-5' />
              <span>İstatistikler</span>
            </a>
            <a
              href={`/${currentLocale}/dashboard/settings`}
              className='flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors'
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className='h-5 w-5' />
              <span>Ayarlar</span>
            </a>
            <button
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className='flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors w-full text-left'
            >
              <LogOut className='h-5 w-5' />
              <span>Çıkış Yap</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
