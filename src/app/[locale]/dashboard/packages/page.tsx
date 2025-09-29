/*
info:
Bağlantılı dosyalar:
- @/hooks/useAuth: Kullanıcı giriş durumu kontrolü için (gerekli)
- @/lib/supabase/client: Supabase bağlantısı için (gerekli)
- @/lib/constants/reading-credits: Kredi sabitleri için (gerekli)
- lucide-react: İkonlar için (gerekli)

Dosyanın amacı:
- Kredi paketleri satın alma sayfası oluşturur
- 100, 300, 500 kredi paketlerini kart şeklinde gösterir
- Ödeme işlemleri için backend entegrasyonu hazırlar

Backend bağlantısı:
- Supabase auth ile kullanıcı doğrulama
- profiles tablosundan kredi bakiyesi güncelleme
- transactions tablosuna satın alma kaydı ekleme
- Burada backend'e bağlanılacak - ödeme işlemleri

Geliştirme ve öneriler:
- useAuth hook'u ile tutarlı auth kontrolü
- Responsive tasarım ve modern UI
- Kullanıcı deneyimi odaklı paket seçimi
- Güvenli ödeme işleme ve veri işleme

Hatalar / Geliştirmeye Açık Noktalar:
- Auth kontrolü useAuth hook'u ile güçlendirilebilir
- Loading state'leri daha detaylı hale getirilebilir
- Error handling iyileştirilebilir
- PWA desteği eklenebilir

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz kod yapısı, açık fonksiyon isimleri
- Optimizasyon: Gereksiz re-render'lar önlenmiş
- Yeniden Kullanılabilirlik: Modüler bileşen yapısı
- Güvenlik: Auth kontrolü ve güvenli veri işleme

Gereklilik ve Kullanım Durumu:
- PackagesPage: Gerekli, kredi paketleri satın alma için ana bileşen
- checkAuth: Gerekli, kullanıcı doğrulama için
- purchasePackage: Gerekli, paket satın alma işlemi için
- refreshCreditBalance: Gerekli, kredi bakiyesi güncelleme için
*/

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { BottomNavigation } from '@/features/shared/layout';
import {
  Coins,
  Star,
  Crown,
  Check,
  ShoppingCart,
  CreditCard,
  Gift,
  Shield,
  Clock,
  ArrowLeft,
} from 'lucide-react';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface UserProfile {
  id: string;
  credit_balance?: number;
  display_name?: string;
  email?: string;
}

export default function PackagesPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useTranslations();
  const router = useRouter();

  // Pathname'den locale'i çıkar
  const pathname = window.location.pathname;
  const locale = pathname.split('/')[1] || 'tr';
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Supabase'den kredi paketlerini çek
  const [creditPackages, setCreditPackages] = useState<CreditPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);

  // Supabase'den paketleri çek
  const fetchPackages = useCallback(async () => {
    try {
      setPackagesLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('active', true)
        .order('credits', { ascending: true });

      if (error) {
        return;
      }

      // Supabase verilerini CreditPackage formatına dönüştür
      const formattedPackages: CreditPackage[] = (data || []).map(
        (pkg: any, index: number) => {
          const isPopular = index === 1; // İkinci paket popüler olsun

          return {
            id: pkg.id.toString(),
            name: pkg.name,
            credits: pkg.credits,
            price: parseFloat(pkg.price_try), // TRY fiyatını kullan
            currency: 'TRY',
            description: pkg.description || '',
            features: generateFeatures(pkg.credits),
            popular: isPopular,
            icon: getPackageIcon(pkg.credits),
            color: getPackageColor(pkg.credits),
            bgColor: getPackageBgColor(pkg.credits),
            borderColor: getPackageBorderColor(pkg.credits),
          };
        }
      );

      setCreditPackages(formattedPackages);
    } catch (error) {
      console.error('Paketler yüklenirken hata:', error);
    } finally {
      setPackagesLoading(false);
    }
  }, [t]);

  // Kredi miktarına göre özellikler oluştur
  const generateFeatures = useCallback(
    (credits: number): string[] => {
      const baseFeatures = [
        t('dashboard.packages.featureNumerology', 'Numeroloji analizi'),
        t('dashboard.packages.featureLove', 'Aşk açılımı'),
      ];

      if (credits >= 1000) {
        return [
          ...baseFeatures,
          t(
            'dashboard.packages.feature10Readings',
            '10+ detaylı tarot okuması'
          ),
          t('dashboard.packages.featureCareer', 'Kariyer okuması'),
          t('dashboard.packages.featureGeneral', 'Genel okuma'),
          t('dashboard.packages.feature60Days', '60 gün geçerlilik'),
          t('dashboard.packages.feature20Bonus', '%20 bonus kredi'),
          t('dashboard.packages.featurePriority', 'Öncelikli destek'),
        ];
      } else if (credits >= 500) {
        return [
          ...baseFeatures,
          t('dashboard.packages.feature5Readings', '5-6 detaylı tarot okuması'),
          t('dashboard.packages.featureCareer', 'Kariyer okuması'),
          t('dashboard.packages.feature30Days', '30 gün geçerlilik'),
          t('dashboard.packages.feature10Bonus', '%10 bonus kredi'),
        ];
      } else {
        return [
          ...baseFeatures,
          t('dashboard.packages.feature2Readings', '1-2 detaylı tarot okuması'),
          t('dashboard.packages.feature7Days', '7 gün geçerlilik'),
        ];
      }
    },
    [t]
  );

  // Kredi miktarına göre ikon belirle
  const getPackageIcon = (credits: number) => {
    if (credits >= 1000) {
      return <Crown className='h-8 w-8' />;
    }
    if (credits >= 500) {
      return <Star className='h-8 w-8' />;
    }
    return <Coins className='h-8 w-8' />;
  };

  // Kredi miktarına göre renk belirle
  const getPackageColor = (credits: number) => {
    if (credits >= 1000) {
      return 'text-purple-400';
    }
    if (credits >= 500) {
      return 'text-gold';
    }
    return 'text-blue-400';
  };

  const getPackageBgColor = (credits: number) => {
    if (credits >= 1000) {
      return 'bg-purple-500/10';
    }
    if (credits >= 500) {
      return 'bg-gold/10';
    }
    return 'bg-blue-500/10';
  };

  const getPackageBorderColor = (credits: number) => {
    if (credits >= 1000) {
      return 'border-purple-500/30';
    }
    if (credits >= 500) {
      return 'border-gold/30';
    }
    return 'border-blue-500/30';
  };

  // Kullanıcı profilini çek
  const fetchUserProfile = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('id, credit_balance, display_name, email')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profil yükleme hatası:', error);
        setError(
          t('dashboard.packages.profileError', 'Profil bilgileri yüklenemedi')
        );
        return;
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Profil yükleme hatası:', error);
      setError(
        t('dashboard.packages.profileError', 'Profil bilgileri yüklenemedi')
      );
    } finally {
      setLoading(false);
    }
  }, [user, t]);

  // Auth kontrolü ve paketleri çek
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace(`/${locale}/auth`);
        return;
      }
      fetchUserProfile();
      fetchPackages(); // Supabase'den paketleri çek
    }
  }, [authLoading, user, router, locale, fetchPackages, fetchUserProfile]);

  // Paket satın alma işlemi
  const purchasePackage = async (packageId: string) => {
    if (!user || !profile) {
      return;
    }

    const selectedPackage = creditPackages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) {
      return;
    }

    try {
      setPurchasing(packageId);
      setError(null);
      setSuccess(null);

      // Bonus kredi hesapla (kredi miktarına göre)
      const bonusCredits =
        selectedPackage.credits >= 1000
          ? 200
          : selectedPackage.credits >= 500
            ? 50
            : 0;
      const totalCredits = selectedPackage.credits + bonusCredits;

      // Kredi bakiyesini güncelle
      const newBalance = (profile.credit_balance || 0) + totalCredits;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          credit_balance: newBalance,
        })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Transaction log oluştur
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'purchase',
          amount: selectedPackage.price,
          delta_credits: totalCredits,
          reason: `${selectedPackage.name} ${t('dashboard.packages.purchased', 'satın alındı')} (${selectedPackage.credits} ${t('dashboard.packages.credits', 'kredi')}${bonusCredits > 0 ? ` + ${bonusCredits} ${t('dashboard.packages.bonus', 'bonus')}` : ''})`,
          ref_type: 'package_purchase',
          ref_id: packageId,
          description: `${selectedPackage.name} - ${totalCredits} ${t('dashboard.packages.credits', 'kredi')}`,
        });

      if (transactionError) {
        console.warn('Transaction log oluşturulamadı:', transactionError);
        // Transaction log hatası kritik değil, devam et
      }

      // Profili güncelle
      setProfile(prev =>
        prev ? { ...prev, credit_balance: newBalance } : null
      );

      // Başarı mesajı
      setSuccess(
        `${selectedPackage.name} ${t('dashboard.packages.purchaseSuccess', 'başarıyla satın alındı!')} ${totalCredits} ${t('dashboard.packages.credits', 'kredi')} ${t('dashboard.packages.addedToAccount', 'hesabınıza eklendi.')}`
      );

      // Global event dispatch et - dashboard'u güncelle
      window.dispatchEvent(
        new CustomEvent('creditBalanceChanged', {
          detail: { newBalance },
        })
      );
    } catch (error) {
      console.error('Paket satın alma hatası:', error);
      setError(
        t(
          'dashboard.packages.purchaseError',
          'Paket satın alınırken bir hata oluştu. Lütfen tekrar deneyin.'
        )
      );
    } finally {
      setPurchasing(null);
    }
  };

  // Loading state
  if (authLoading || loading || packagesLoading) {
    return (
      <div className='flex flex-col min-h-screen bg-cosmic-black pb-16'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4'></div>
            <div className='text-text-celestial text-lg'>
              {t(
                'dashboard.packages.loading',
                '🔮 Kredi paketleri yükleniyor...'
              )}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-cosmic-black text-white pb-16'>
      {/* Header */}
      <header className='border-b border-cosmic-fog p-4'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <ShoppingCart className='h-8 w-8 text-gold' />
            <span className='text-xl font-bold text-text-celestial'>
              {t('dashboard.packages.title', 'Kredi Paketleri')}
            </span>
          </div>
          <Link
            href={`/${locale}/dashboard`}
            className='text-text-mystic hover:text-gold transition-colors flex items-center space-x-1'
          >
            <ArrowLeft className='h-4 w-4' />
            <span>{t('dashboard.backToDashboard', "Dashboard'a Dön")}</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 container mx-auto px-4 py-8'>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4 text-text-celestial'>
            💎 {t('dashboard.packages.pageTitle', 'Kredi Paketleri')}
          </h1>
          <p className='text-xl text-text-mystic mb-6'>
            {t(
              'dashboard.packages.description',
              'Tarot okumalarınız için ihtiyacınız olan kredileri satın alın'
            )}
          </p>

          {/* Mevcut Kredi Bakiyesi */}
          {profile && (
            <div className='inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 rounded-lg px-6 py-3'>
              <Coins className='h-5 w-5 text-gold' />
              <span className='text-gold font-semibold'>
                {t('dashboard.packages.currentBalance', 'Mevcut Bakiyeniz')}:{' '}
                {profile.credit_balance || 0}{' '}
                {t('dashboard.packages.credits', 'kredi')}
              </span>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className='mb-8 p-4 bg-success/10 border border-success/30 rounded-lg'>
            <div className='flex items-center space-x-2'>
              <Check className='h-5 w-5 text-success' />
              <p className='text-success'>{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className='mb-8 p-4 bg-danger/10 border border-danger/30 rounded-lg'>
            <div className='flex items-center space-x-2'>
              <Shield className='h-5 w-5 text-danger' />
              <p className='text-danger'>{error}</p>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          {creditPackages.length > 0 ? (
            creditPackages.map(pkg => (
              <div
                key={pkg.id}
                className={`relative card hover-lift p-8 ${
                  pkg.popular ? 'ring-2 ring-gold/50' : ''
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-gold text-cosmic-black px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1'>
                      <Star className='h-4 w-4' />
                      <span>
                        {t('dashboard.packages.mostPopular', 'En Popüler')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Package Icon */}
                <div
                  className={`inline-flex p-4 rounded-lg ${pkg.bgColor} ${pkg.borderColor} border mb-6`}
                >
                  <div className={pkg.color}>{pkg.icon}</div>
                </div>

                {/* Package Info */}
                <div className='text-center mb-6'>
                  <h3 className='text-2xl font-bold text-text-celestial mb-2'>
                    {pkg.name}
                  </h3>
                  <p className='text-text-mystic mb-4'>{pkg.description}</p>

                  {/* Credits */}
                  <div className='mb-4'>
                    <div className='text-4xl font-bold text-gold mb-1'>
                      {pkg.credits}
                    </div>
                    <div className='text-sm text-text-muted'>
                      {t('dashboard.packages.credits', 'kredi')}
                    </div>
                  </div>

                  {/* Price */}
                  <div className='mb-6'>
                    <div className='text-3xl font-bold text-text-celestial'>
                      {pkg.price} {pkg.currency}
                    </div>
                    <div className='text-sm text-text-muted'>
                      {Math.round((pkg.price / pkg.credits) * 100) / 100}{' '}
                      {pkg.currency}/kredi
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => purchasePackage(pkg.id)}
                  disabled={purchasing === pkg.id}
                  className={`w-full btn ${
                    pkg.popular ? 'btn-primary' : 'btn-secondary'
                  } flex items-center justify-center space-x-2 ${
                    purchasing === pkg.id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {purchasing === pkg.id ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      <span>
                        {t('dashboard.packages.processing', 'İşleniyor...')}
                      </span>
                    </>
                  ) : (
                    <>
                      <CreditCard className='h-4 w-4' />
                      <span>{t('dashboard.packages.buyNow', 'Satın Al')}</span>
                    </>
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <div className='text-text-mystic text-lg'>
                {t(
                  'dashboard.packages.noPackages',
                  'Henüz aktif paket bulunmuyor. Lütfen daha sonra tekrar kontrol edin.'
                )}
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className='grid md:grid-cols-3 gap-6 mb-12'>
          <div className='card p-6 text-center'>
            <Shield className='h-8 w-8 text-success mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-text-celestial mb-2'>
              {t('dashboard.packages.securePayment', 'Güvenli Ödeme')}
            </h3>
            <p className='text-text-mystic text-sm'>
              {t(
                'dashboard.packages.securePaymentDesc',
                'Tüm ödemeler SSL şifreleme ile korunur'
              )}
            </p>
          </div>

          <div className='card p-6 text-center'>
            <Clock className='h-8 w-8 text-info mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-text-celestial mb-2'>
              {t('dashboard.packages.instantActivation', 'Anında Aktif')}
            </h3>
            <p className='text-text-mystic text-sm'>
              {t(
                'dashboard.packages.instantActivationDesc',
                'Kredileriniz hemen hesabınıza eklenir'
              )}
            </p>
          </div>

          <div className='card p-6 text-center'>
            <Gift className='h-8 w-8 text-warning mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-text-celestial mb-2'>
              {t('dashboard.packages.bonusCredits', 'Bonus Krediler')}
            </h3>
            <p className='text-text-mystic text-sm'>
              {t(
                'dashboard.packages.bonusCreditsDesc',
                'Büyük paketlerde ekstra kredi kazanın'
              )}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='card p-8'>
          <h2 className='text-2xl font-bold text-text-celestial mb-6 text-center'>
            ❓ {t('dashboard.packages.faq', 'Sıkça Sorulan Sorular')}
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold text-gold mb-2'>
                {t(
                  'dashboard.packages.faq1Question',
                  'Krediler ne kadar süre geçerli?'
                )}
              </h3>
              <p className='text-text-mystic text-sm'>
                {t(
                  'dashboard.packages.faq1Answer',
                  'Kredileriniz satın alma tarihinden itibaren 1 yıl geçerlidir.'
                )}
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gold mb-2'>
                {t('dashboard.packages.faq2Question', 'İade politikası nedir?')}
              </h3>
              <p className='text-text-mystic text-sm'>
                {t(
                  'dashboard.packages.faq2Answer',
                  'Kullanılmayan krediler için 7 gün içinde iade alabilirsiniz.'
                )}
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gold mb-2'>
                {t(
                  'dashboard.packages.faq3Question',
                  'Hangi ödeme yöntemleri kabul ediliyor?'
                )}
              </h3>
              <p className='text-text-mystic text-sm'>
                {t(
                  'dashboard.packages.faq3Answer',
                  'Kredi kartı, banka kartı ve dijital cüzdanlar kabul edilir.'
                )}
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gold mb-2'>
                {t(
                  'dashboard.packages.faq4Question',
                  'Bonus krediler nasıl hesaplanıyor?'
                )}
              </h3>
              <p className='text-text-mystic text-sm'>
                {t(
                  'dashboard.packages.faq4Answer',
                  'Popüler pakette %10, Premium pakette %20 bonus kredi verilir.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className='mt-12 text-center'>
          <Link href={`/${locale}/dashboard`} className='btn btn-primary'>
            {t('dashboard.backToDashboard', "Dashboard'a Dön")}
          </Link>
        </div>
      </main>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
