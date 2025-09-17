/*
info:
Bağlantılı dosyalar:
- @supabase/supabase-js: User tipi için (gerekli)

Dosyanın amacı:
- Dashboard sayfasının hoş geldin bölümünü oluşturur
- Kullanıcı profil bilgilerini, üyelik süresini ve admin durumunu gösterir
- Kişiselleştirilmiş karşılama mesajı sunar

Supabase değişkenleri ve tabloları:
- profiles tablosu: Kullanıcı profil bilgileri
- UserProfile interface: Yerel tip tanımı

Geliştirme önerileri:
- UserProfile tipi yerel olarak tanımlandı
- Responsive tasarım ve modern UI
- Kullanıcı deneyimi odaklı kişiselleştirme
- Güvenli profil bilgisi gösterimi

Tespit edilen hatalar:
- Yok

Kullanım durumu:
- Dashboard karşılama bölümü olarak aktif
- Kullanıcı karşılama mesajı için gerekli
*/

'use client';

import { User } from '@supabase/supabase-js';
// UserProfile type defined locally
interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  credit_balance: number;
  created_at: string;
  updated_at: string;
}

interface WelcomeSectionProps {
  profile: UserProfile | null;
  user: User | null;
  isAdmin: boolean;
}

// Yardımcı fonksiyonlar
const getMemberSince = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return '1 gün';
  }
  if (diffDays < 30) {
    return `${diffDays} gün`;
  }
  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} ay`;
  }
  return `${Math.floor(diffDays / 365)} yıl`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function WelcomeSection({
  profile,
  user,
  isAdmin,
}: WelcomeSectionProps) {
  return (
    <div className='mb-8'>
      <div className='card-mystic p-8 text-text-celestial mystic-glow'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6'>
          {/* Avatar */}
          <div className='w-20 h-20 bg-crystal-clear rounded-full flex items-center justify-center border-2 border-gold flex-shrink-0'>
            <span className='text-3xl font-bold text-gold'>
              {(profile?.display_name?.charAt(0) || 'U').toUpperCase()}
            </span>
          </div>

          {/* Kullanıcı Bilgileri */}
          <div className='flex-1 w-full'>
            <h1 className='text-heading-1 text-gold mb-3'>
              Hoş geldiniz,{' '}
              {profile?.display_name ||
                user?.email?.split('@')[0] ||
                'Mistik Kullanıcı'}{' '}
              ✨
            </h1>
            <p className='text-text-mystic text-body-large mb-4'>
              Mistik yolculuğunuz{' '}
              {profile?.created_at
                ? getMemberSince(profile.created_at)
                : 'yeni'}{' '}
              süredir devam ediyor
            </p>

            {/* Email Bilgisi */}
            {user?.email && (
              <p className='text-text-muted text-sm mb-3'>📧 {user.email}</p>
            )}

            {/* Admin Badge */}
            {isAdmin && (
              <div className='mb-3'>
                <span className='bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30'>
                  👑 Admin
                </span>
              </div>
            )}

            {/* Üyelik Tarihi */}
            <div className='flex flex-wrap items-center gap-3'>
              <span className='bg-crystal-clear px-3 py-1 rounded-full text-sm border border-gold/30'>
                {profile?.created_at
                  ? formatDate(profile.created_at)
                  : 'Yeni üye'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
