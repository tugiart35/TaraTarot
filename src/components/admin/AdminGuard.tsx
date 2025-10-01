'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuth } from '@/providers/AdminAuthProvider';
import { Crown } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { admin, loading, isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Pathname'den locale'i çıkar
  const locale = pathname.split('/')[1] || 'tr';

  // Development ortamında bile AdminGuard aktif olsun
  // if (process.env.NODE_ENV === 'development') {
  //   return <>{children}</>;
  // }

  useEffect(() => {
    // Production ortamında normal kontrol
    if (!loading && !isAuthenticated && !isRedirecting && !admin) {
      setIsRedirecting(true);
      router.push(`/${locale}/admin/auth`);
    }
  }, [loading, isAuthenticated, isRedirecting, router, locale, admin]);

  // Loading durumu
  if (loading || isRedirecting) {
    return (
      <div className='min-h-screen bg-mystical-950 flex items-center justify-center'>
        <div className='bg-mystical-900/50 backdrop-blur-sm border border-mystical-700/50 rounded-2xl p-8 text-center'>
          <div className='animate-pulse mb-4'>
            <Crown className='h-12 w-12 text-blue-500 mx-auto' />
          </div>
          <div className='bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent text-xl font-semibold'>
            Admin paneli yükleniyor...
          </div>
          <div className='mt-4'>
            <div className='flex space-x-1 justify-center'>
              <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
              <div
                className='w-2 h-2 bg-purple-500 rounded-full animate-bounce'
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className='w-2 h-2 bg-cyan-500 rounded-full animate-bounce'
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin yetkisi varsa çocukları render et
  return <>{children}</>;
}