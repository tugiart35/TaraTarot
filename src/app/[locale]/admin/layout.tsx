'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logAdminAction } from '@/lib/logger';
import { logAdminAction as auditLogAdminAction } from '@/lib/audit-logger';
import { AdminAuthProvider, useAdminAuth } from '@/providers/AdminAuthProvider';
import AdminGuard from '@/components/admin/AdminGuard';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  Settings,
  BarChart3,
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
} from 'lucide-react';

// Navigation items - locale dinamik olarak eklenecek
const getNavigation = (locale: string) => [
  {
    name: 'Dashboard',
    href: `/${locale}/admin`,
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-purple-600',
    description: 'Genel bakış ve istatistikler',
  },
  {
    name: 'Kullanıcılar',
    href: `/${locale}/admin/users`,
    icon: Users,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Kullanıcı yönetimi ve detayları',
  },
  {
    name: 'Okumalar',
    href: `/${locale}/admin/readings`,
    icon: BarChart3,
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Tarot okumaları ve analizler',
  },
  {
    name: 'Paketler',
    href: `/${locale}/admin/packages`,
    icon: Package,
    gradient: 'from-orange-500 to-red-600',
    description: 'Kredi paketleri ve fiyatlar',
  },
  {
    name: 'Siparişler',
    href: `/${locale}/admin/orders`,
    icon: CreditCard,
    gradient: 'from-purple-500 to-pink-600',
    description: 'Sipariş takibi ve ödemeler',
  },
  {
    name: 'İstatistikler',
    href: `/${locale}/admin/analytics`,
    icon: TrendingUp,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Detaylı analitik raporlar',
  },
  {
    name: 'Ayarlar',
    href: `/${locale}/admin/settings`,
    icon: Settings,
    gradient: 'from-gray-500 to-slate-600',
    description: 'Sistem ayarları ve güvenlik',
  },
];

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const pathname = usePathname();

  // Pathname'den locale'i çıkar
  const locale = pathname.split('/')[1] || 'tr';

  // Admin auth - global provider'dan al
  const { admin, logoutAdmin } = useAdminAuth();

  // Monitor session expiry - basitleştirildi
  useEffect(() => {
    // Session warning'i kaldırdık - AdminGuard ile kontrol ediliyor
  }, []);

  const handleSignOut = async () => {
    try {
      logAdminAction('logout', {
        userId: admin?.email || 'unknown',
        action: 'admin_logout',
      });

      // Audit log logout
      auditLogAdminAction('admin_logout', 'admin', {
        userId: admin?.email || '',
        userEmail: admin?.email || '',
        metadata: {
          logoutTime: new Date().toISOString(),
        },
      });

      await logoutAdmin();
      window.location.href = `/${locale}/admin/auth`;
    } catch (error) {
      // Logout failed
    }
  };

  const getCurrentPageTitle = () => {
    const navigation = getNavigation(locale);
    const currentNav = navigation.find(item => item.href === pathname);
    return currentNav ? currentNav.name : 'Admin Panel';
  };

  // Development ortamında bile AdminGuard'ı aktif tut
  // if (process.env.NODE_ENV === 'development') {
  //   return (
  //     <div className='min-h-screen admin-bg text-white'>
  //       ...
  //     </div>
  //   );
  // }

  // AdminGuard ile güvenlik kontrolü - sadece admin sayfaları için
  if (pathname.includes('/admin/auth')) {
    // Auth sayfası için AdminGuard kullanma
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className='min-h-screen admin-bg text-white'>
          {/* Session Warning - artık kullanılmıyor, Supabase otomatik yönetiyor */}

        {/* Mobile Header */}
        <div className='lg:hidden'>
          <div className='fixed top-0 left-0 right-0 z-50 bg-mystical-900/50 backdrop-blur-sm border-b border-slate-700/50 p-3 safe-top'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className='p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 transition-transform duration-200 hover:scale-105 touch-target'
                >
                  {mobileMenuOpen ? (
                    <X className='h-5 w-5' />
                  ) : (
                    <Menu className='h-5 w-5' />
                  )}
                </button>
                <div className='flex items-center space-x-2'>
                  <div className='bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg'>
                    <Crown className='h-4 w-4 text-white' />
                  </div>
                  <div className='min-w-0'>
                    <div className='font-bold text-white text-sm truncate'>
                      Admin
                    </div>
                    <div className='text-xs text-slate-400 truncate'>
                      {getCurrentPageTitle()}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-1'>
                <button className='relative p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 transition-transform duration-200 hover:scale-105 touch-target'>
                  <Bell className='h-4 w-4' />
                  {notifications > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse'>
                      {notifications}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleSignOut}
                  className='p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 transition-transform duration-200 hover:scale-105 text-red-400 touch-target'
                >
                  <LogOut className='h-4 w-4' />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className='fixed inset-0 z-40 lg:hidden'>
              <div
                className='fixed inset-0 bg-black/50 backdrop-blur-sm'
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className='fixed top-16 left-2 right-2 bottom-2 bg-mystical-900/50 backdrop-blur-sm border border-mystical-700/50 rounded-2xl p-4 scrollbar-hide overflow-y-auto mobile-modal-full safe-bottom'>
                <div className='space-y-2'>
                  {getNavigation(locale).map(item => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                        flex items-center p-3 rounded-xl transition-transform duration-200 hover:scale-105 group touch-target
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                            : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/30'
                        }
                      `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div
                          className={`p-2 rounded-lg mr-3 bg-gradient-to-r ${item.gradient} flex-shrink-0`}
                        >
                          <item.icon className='h-4 w-4 text-white' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='font-medium text-sm'>{item.name}</div>
                          <div className='text-xs text-slate-400 group-hover:text-slate-300 truncate'>
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className='w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0' />
                        )}
                      </Link>
                    );
                  })}
                </div>

                <div className='mt-6 pt-4 border-t border-slate-700'>
                  <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 mb-3'>
                    <div className='flex items-center space-x-3'>
                      <div className='bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg flex-shrink-0'>
                        <User className='h-4 w-4 text-white' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div className='font-medium text-white text-sm truncate'>
                          {admin?.email}
                        </div>
                        <div className='text-xs text-slate-400 flex items-center'>
                          <Sparkles className='h-3 w-3 mr-1' />
                          Super Admin
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <Link
                      href={`/${locale}/admin`}
                      className='flex items-center justify-center p-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg transition-transform duration-200 hover:scale-105 text-sm touch-target'
                    >
                      <ArrowLeft className='h-4 w-4 mr-1' />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className='flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 hover:scale-105 text-sm touch-target'
                    >
                      <LogOut className='h-4 w-4 mr-1' />
                      <span>Çıkış</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='pt-20 p-3 pb-6 safe-bottom'>{children}</div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:flex min-h-screen'>
          {/* Sidebar */}
          <div className='fixed inset-y-0 left-0 z-50 w-80 bg-mystical-900/95 backdrop-blur-md border-r border-mystical-700/50 scrollbar-hide'>
            {/* Logo/Header */}
            <div className='p-6 border-b border-slate-700/50'>
              <div className='flex items-center space-x-3'>
                <div className='bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl'>
                  <Crown className='h-8 w-8 text-white' />
                </div>
                <div>
                  <h1 className='text-xl font-bold text-white'>Busbuskimki</h1>
                  <p className='text-sm text-slate-400'>Admin Dashboard</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className='p-6 border-b border-slate-700/30'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
                <input
                  type='text'
                  placeholder='Ara...'
                  className='w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className='flex-1 p-6 space-y-2'>
              {getNavigation(locale).map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                    flex items-center p-4 rounded-xl group transition-all duration-300 hover:bg-slate-700/30
                    ${isActive ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30' : ''}
                  `}
                  >
                    <div
                      className={`p-2 rounded-lg mr-4 bg-gradient-to-r ${item.gradient} group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className='h-5 w-5 text-white' />
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium text-white group-hover:text-blue-300 transition-colors'>
                        {item.name}
                      </div>
                      <div className='text-sm text-slate-400 group-hover:text-slate-300 transition-colors'>
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Admin Info & Controls */}
            <div className='p-6 border-t border-slate-700/50'>
              <div className='bg-mystical-900/50 backdrop-blur-sm border border-mystical-700/50 rounded-xl p-4 mb-4'>
                <div className='flex items-center space-x-3 mb-3'>
                  <div className='bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg'>
                    <User className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex-1'>
                    <div className='font-medium text-white'>{admin?.email}</div>
                    <div className='text-sm text-slate-400 flex items-center'>
                      <Sparkles className='h-3 w-3 mr-1' />
                      Super Admin
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <Link
                    href={`/${locale}/admin`}
                    className='flex items-center justify-center p-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg transition-transform duration-200 hover:scale-105 text-sm'
                  >
                    <ArrowLeft className='h-4 w-4 mr-1' />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className='flex items-center justify-center p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 hover:scale-105 text-sm'
                  >
                    <LogOut className='h-4 w-4 mr-1' />
                    <span>Çıkış</span>
                  </button>
                </div>
              </div>

              {/* System Status */}
              <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm text-slate-400'>Sistem Durumu</span>
                  <TrendingUp className='h-4 w-4 text-green-400' />
                </div>
                <div className='space-y-1 text-xs'>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Sunucu:</span>
                    <span className='text-green-400'>🟢 Online</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Database:</span>
                    <span className='text-green-400'>🟢 Bağlı</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-slate-400'>Uptime:</span>
                    <span className='text-blue-400'>99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='ml-80 flex-1'>
            {/* Top Header */}
            <header className='bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${getNavigation(locale).find(n => n.href === pathname)?.gradient || 'from-blue-500 to-purple-600'}`}
                  >
                    <LayoutDashboard className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h1 className='text-2xl font-bold text-white'>
                      {getCurrentPageTitle()}
                    </h1>
                    <p className='text-slate-400'>
                      {getNavigation(locale).find(n => n.href === pathname)
                        ?.description || 'Yönetim paneli'}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <button className='relative p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl transition-transform duration-200 hover:scale-105'>
                    <Bell className='h-5 w-5' />
                    {notifications > 0 && (
                      <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse'>
                        {notifications}
                      </span>
                    )}
                  </button>

                  <div className='bg-mystical-900/50 backdrop-blur-sm border border-mystical-700/50 rounded-xl p-3'>
                    <div className='text-sm text-slate-400'>Son Güncelleme</div>
                    <div className='text-white font-medium'>
                      {new Date().toLocaleTimeString('tr-TR')}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main
              className='p-6 scrollbar-hide'
              style={{ height: 'calc(100vh - 96px)', overflowY: 'auto' }}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin sayfalarında Footer'ı gizle
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
      footer.style.visibility = 'hidden';
      footer.style.opacity = '0';
      footer.style.height = '0';
      footer.style.overflow = 'hidden';
    }
  }, []);

  return (
    <AdminAuthProvider>
      <div className="admin-layout admin-page">
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </div>
      {/* Admin sayfalarında Footer'ı gizle */}
      <style jsx global>{`
        footer {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          left: -9999px !important;
        }
      `}</style>
    </AdminAuthProvider>
  );
}
