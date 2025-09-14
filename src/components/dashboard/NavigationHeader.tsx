// Dashboard navigasyon header bileşeni

import { 
  Moon, 
  BarChart3, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface NavigationHeaderProps {
  currentLocale: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => Promise<void>;
}

// Navigasyon header bileşeni
export default function NavigationHeader({
  currentLocale,
  sidebarOpen,
  setSidebarOpen,
  handleLogout
}: NavigationHeaderProps) {
  const { t } = useTranslations();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 admin-sidebar border-b border-mystical-700/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo - Site logosu ve adı */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-mystic rounded-lg flex items-center justify-center">
            <Moon className="h-5 w-5 text-cosmic-black" />
          </div>
          <span className="text-xl font-bold text-text-celestial">Busbuskimki</span>
        </div>

        {/* Desktop Navigation - Masaüstü navigasyon menüsü */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Dashboard linki - aktif sayfa */}
          <a 
            href={`/${currentLocale}/dashboard`} 
            className="flex items-center space-x-2 px-4 py-2 text-gold bg-crystal-clear border-b-2 border-gold rounded-t-lg transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="font-medium">{t('nav.dashboard', 'Dashboard')}</span>
          </a>
          {/* Okumalar sayfası linki */}
          <a 
            href={`/${currentLocale}/dashboard/readings`} 
            className="flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t('dashboard.readings', 'Okumalar')}</span>
          </a>
          {/* İstatistikler sayfası linki */}
          <a 
            href={`/${currentLocale}/dashboard/statistics`} 
            className="flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors"
          >
            <TrendingUp className="h-4 w-4" />
            <span>{t('dashboard.statistics', 'İstatistikler')}</span>
          </a>
          {/* Ayarlar sayfası linki */}
          <a 
            href={`/${currentLocale}/dashboard/settings`} 
            className="flex items-center space-x-2 px-4 py-2 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-t-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>{t('dashboard.settings', 'Ayarlar')}</span>
          </a>
          {/* Çıkış yap butonu */}
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-t-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('dashboard.signOut', 'Çıkış Yap')}</span>
          </button>
        </nav>

        {/* Mobile Menu Button - Mobil menü butonu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)} // Sidebar aç/kapat
          className="md:hidden p-2 rounded-md text-text-muted hover:text-text-celestial hover:bg-crystal-clear"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />} {/* Menü ikonu değiştir */}
        </button>
      </div>

      {/* Mobile Navigation - Mobil navigasyon menüsü */}
      {sidebarOpen && (
        <div className="md:hidden border-t border-mystical-700/50">
          <nav className="px-4 py-2 space-y-1">
            {/* Dashboard linki - mobil */}
            <a 
              href={`/${currentLocale}/dashboard`} 
              className="flex items-center space-x-3 px-4 py-3 text-gold bg-crystal-clear border-l-4 border-gold rounded-lg"
              onClick={() => setSidebarOpen(false)} // Linke tıklayınca menüyü kapat
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">{t('nav.dashboard', 'Dashboard')}</span>
            </a>
            {/* Okumalar linki - mobil */}
            <a 
              href={`/${currentLocale}/dashboard/readings`} 
              className="flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)} // Linke tıklayınca menüyü kapat
            >
              <BookOpen className="h-5 w-5" />
              <span>{t('dashboard.readings', 'Okumalar')}</span>
            </a>
            {/* İstatistikler linki - mobil */}
            <a 
              href={`/${currentLocale}/dashboard/statistics`} 
              className="flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)} // Linke tıklayınca menüyü kapat
            >
              <TrendingUp className="h-5 w-5" />
              <span>{t('dashboard.statistics', 'İstatistikler')}</span>
            </a>
            {/* Ayarlar linki - mobil */}
            <a 
              href={`/${currentLocale}/dashboard/settings`} 
              className="flex items-center space-x-3 px-4 py-3 text-text-mystic hover:text-text-celestial hover:bg-crystal-clear rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)} // Linke tıklayınca menüyü kapat
            >
              <Settings className="h-5 w-5" />
              <span>{t('dashboard.settings', 'Ayarlar')}</span>
            </a>
            {/* Çıkış yap butonu - mobil */}
            <button 
              onClick={() => {
                handleLogout(); // Çıkış yap
                setSidebarOpen(false); // Menüyü kapat
              }}
              className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('dashboard.signOut', 'Çıkış Yap')}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
