/*
 * Auth Page - Next.js 14 App Router (RSC + Client Handoff)
 *
 * Bağlı dosyalar:
 * - src/lib/supabase/server.ts (server client)
 * - src/components/auth/SignInForm.tsx (client component)
 * - src/middleware.ts (auth middleware)
 *
 * Dosya amacı:
 * Server Component olarak session kontrolü yapar
 * Client Component'e handoff yapar
 *
 * Supabase değişkenleri ve tablolar:
 * - auth.users: Supabase auth tablosu
 * - profiles: kullanıcı profilleri
 *
 * Geliştirme önerileri:
 * - Server-side session kontrolü
 * - Client-side form handling
 * - Locale-aware redirects
 *
 * Tespit edilen hatalar:
 * - ✅ RSC pattern uygulandı
 * - ✅ Sonsuz loading sorunu çözüldü
 * - ✅ Server/Client ayrımı yapıldı
 *
 * Kullanım durumu:
 * - ✅ Gerekli: Ana authentication sayfası
 * - ✅ Production-ready: Next.js 14 App Router uyumlu
 */

import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/supabase/server';
import SignInForm from '@/components/auth/SignInForm';

interface AuthPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

export default async function AuthPage({ params, searchParams }: AuthPageProps) {
  const { locale } = await params;
  const { error, next } = await searchParams;

  // Server-side session kontrolü
  const session = await getServerSession();

  // Eğer kullanıcı giriş yapmışsa dashboard'a yönlendir
  if (session?.user) {
    redirect(`/${locale}/dashboard`);
  }

  // Client Component'e handoff
  return (
    <div className="min-h-screen bg-night flex items-center justify-center p-4 pb-20">
      <div className="max-w-md w-full bg-lavender/10 backdrop-blur-sm rounded-lg p-8 border border-lavender/20">
        <div className="text-center mb-8">
          <div className="h-12 w-12 text-gold mx-auto mb-4 flex items-center justify-center">
            🌙
          </div>
          <h1 className="text-2xl font-bold text-white">
            Mistik Giriş
          </h1>
        </div>
        
        <SignInForm 
          locale={locale}
          initialError={error || null}
          next={next || null}
        />
      </div>
    </div>
  );
}
