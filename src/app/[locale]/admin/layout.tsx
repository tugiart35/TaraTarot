'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { logError, logAdminAction } from '@/lib/logger';
import { logAdminAction as auditLogAdminAction } from '@/lib/audit-logger';
import { useSession } from '@/lib/session-manager';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  CreditCard,
  Settings,
  BarChart3,
  FileText,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  Bell,
  Search,
  User,
  Crown,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/tr/admin', 
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-purple-600',
    description: 'Genel bakış ve istatistikler'
  },
  { 
    name: 'Kullanıcılar', 
    href: '/tr/admin/users', 
    icon: Users,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Kullanıcı yönetimi ve detayları'
  },
  { 
    name: 'Paketler', 
    href: '/tr/admin/packages', 
    icon: Package,
    gradient: 'from-orange-500 to-red-600',
    description: 'Kredi paketleri ve fiyatlar'
  },
  { 
    name: 'Siparişler', 
    href: '/tr/admin/orders', 
    icon: CreditCard,
    gradient: 'from-purple-500 to-pink-600',
    description: 'Sipariş takibi ve ödemeler'
  },
  { 
    name: 'İstatistikler', 
    href: '/tr/admin/analytics', 
    icon: BarChart3,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Detaylı analitik raporlar'
  },
  { 
    name: 'İçerik', 
    href: '/tr/admin/content', 
    icon: FileText,
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Tarot ve numeroloji içerikleri'
  },
  { 
    name: 'Ayarlar', 
    href: '/tr/admin/settings', 
    icon: Settings,
    gradient: 'from-gray-500 to-slate-600',
    description: 'Sistem ayarları ve güvenlik'
  },
];

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState<{
    email?: string;
    role?: string;
    lastLogin?: string;
  } | null>(null);
  const [notifications] = useState(3);
  const pathname = usePathname();
  
  // Session management
  const session = useSession();
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  // Monitor session expiry
  useEffect(() => {
    if (session.needsRefreshSoon && session.isAuthenticated) {
      setShowSessionWarning(true);
    } else {
      setShowSessionWarning(false);
    }
  }, [session.needsRefreshSoon, session.isAuthenticated]);

  const checkAdminStatus = async () => {
    try {
      // Geliştirme aşamasında admin kontrolünü devre dışı bırak
      setAdminInfo({
        email: 'dev@admin.com',
        role: 'admin',
        lastLogin: new Date().toISOString()
      });
      setIsAdmin(true);
      setLoading(false);

      console.log('🔧 Geliştirme modu: Admin kontrolü devre dışı');
    } catch (error) {
      logError('Admin authentication check failed', error, {
        action: 'checkAdminStatus'
      });
      // Geliştirme aşamasında hata durumunda da admin olarak devam et
      setAdminInfo({
        email: 'dev@admin.com',
        role: 'admin',
        lastLogin: new Date().toISOString()
      });
      setIsAdmin(true);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const user = await supabase.auth.getUser();
    
    logAdminAction('logout', {
      userId: adminInfo?.email || 'unknown',
      action: 'admin_logout'
    });

    // Audit log logout
    if (user.data.user) {
      auditLogAdminAction('admin_logout', 'admin', {
        userId: user.data.user.id,
        userEmail: adminInfo?.email || '',
        metadata: {
          logoutTime: new Date().toISOString()
        }
      });
    }

    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getCurrentPageTitle = () => {
    const currentNav = navigation.find(item => item.href === pathname);
    return currentNav ? currentNav.name : 'Admin Panel';
  };

  const getCurrentPageIcon = () => {
    const currentNav = navigation.find(item => item.href === pathname);
    return currentNav ? currentNav.icon : LayoutDashboard;
  };

  if (loading) {
    return (
      <div className="min-h-screen admin-bg flex items-center justify-center">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <Crown className="h-12 w-12 text-blue-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">Admin paneli yükleniyor...</div>
          <div className="mt-4">
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen admin-bg flex items-center justify-center">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="text-red-400 text-6xl mb-4">⛔</div>
          <div className="text-red-400 text-xl font-semibold">Admin yetkisi gerekli</div>
          <div className="text-slate-400 mt-2">Bu sayfaya erişim için admin yetkileriniz bulunmuyor</div>
          <Link 
            href="/tr/dashboard"
            className="inline-block mt-6 px-6 py-3 admin-btn-primary rounded-lg"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const PageIcon = getCurrentPageIcon();

  return (
    <div className="min-h-screen admin-bg text-white">
      {/* Session Warning */}
      {showSessionWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500/90 backdrop-blur-sm text-white p-3 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">
              Oturum süresi yaklaşıyor. {Math.ceil(session.timeUntilExpiry / 60000)} dakika kaldı.
            </span>
            <button
              onClick={() => session.refreshSession()}
              className="ml-4 px-3 py-1 bg-white/20 rounded-lg text-xs hover:bg-white/30 transition-colors"
            >
              Yenile
            </button>
            <button
              onClick={() => setShowSessionWarning(false)}
              className="ml-2 p-1 hover:bg-white/20 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 admin-card border-b border-slate-700/50 p-3 safe-top">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg admin-glass admin-hover-scale touch-target"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="admin-gradient-primary p-2 rounded-lg">
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm truncate">Admin</div>
                  <div className="text-xs text-slate-400 truncate">{getCurrentPageTitle()}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="relative p-2 rounded-lg admin-glass admin-hover-scale touch-target">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg admin-glass admin-hover-scale text-red-400 touch-target"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-16 left-2 right-2 bottom-2 admin-card rounded-2xl p-4 admin-scrollbar overflow-y-auto mobile-modal-full safe-bottom">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center p-3 rounded-xl admin-hover-scale group touch-target
                        ${isActive 
                          ? 'admin-gradient-primary text-white' 
                          : 'admin-glass hover:bg-slate-700/30'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className={`p-2 rounded-lg mr-3 bg-gradient-to-r ${item.gradient} flex-shrink-0`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-slate-400 group-hover:text-slate-300 truncate">{item.description}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="admin-glass rounded-xl p-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="admin-gradient-accent p-2 rounded-lg flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-white text-sm truncate">{adminInfo?.email}</div>
                      <div className="text-xs text-slate-400 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Super Admin
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/tr/dashboard"
                    className="flex items-center justify-center p-2 admin-glass rounded-lg admin-hover-scale text-sm touch-target"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg admin-hover-scale text-sm transition-colors touch-target"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    <span>Çıkış</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-20 p-3 pb-6 safe-bottom">
          {children}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-80 admin-sidebar admin-scrollbar">
          {/* Logo/Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="admin-gradient-primary p-3 rounded-xl">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Busbuskimki</h1>
                <p className="text-sm text-slate-400">Admin Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className="p-6 border-b border-slate-700/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    admin-nav-item flex items-center p-4 rounded-xl group
                    ${isActive ? 'active' : ''}
                  `}
                >
                  <div className={`p-2 rounded-lg mr-4 bg-gradient-to-r ${item.gradient} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-blue-300 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Admin Info & Controls */}
          <div className="p-6 border-t border-slate-700/50">
            <div className="admin-card rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="admin-gradient-accent p-2 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{adminInfo?.email}</div>
                  <div className="text-sm text-slate-400 flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Super Admin
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href="/tr/dashboard"
                  className="flex items-center justify-center p-2 admin-glass rounded-lg admin-hover-scale text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg admin-hover-scale text-sm transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Çıkış</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="admin-glass rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Sistem Durumu</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sunucu:</span>
                  <span className="text-green-400">🟢 Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Database:</span>
                  <span className="text-green-400">🟢 Bağlı</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Uptime:</span>
                  <span className="text-blue-400">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-80 flex-1">
          {/* Top Header */}
          <header className="admin-glass border-b border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${navigation.find(n => n.href === pathname)?.gradient || 'from-blue-500 to-purple-600'}`}>
                  <PageIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{getCurrentPageTitle()}</h1>
                  <p className="text-slate-400">
                    {navigation.find(n => n.href === pathname)?.description || 'Yönetim paneli'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-3 admin-glass rounded-xl admin-hover-scale">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>
                
                <div className="admin-card rounded-xl p-3">
                  <div className="text-sm text-slate-400">Son Güncelleme</div>
                  <div className="text-white font-medium">{new Date().toLocaleTimeString('tr-TR')}</div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 admin-scrollbar" style={{height: 'calc(100vh - 96px)', overflowY: 'auto'}}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}