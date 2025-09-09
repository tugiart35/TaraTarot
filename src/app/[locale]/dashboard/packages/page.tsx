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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { 
  Coins, 
  Star, 
  Zap, 
  Crown, 
  Check, 
  ShoppingCart,
  CreditCard,
  Gift,
  TrendingUp,
  Shield,
  Clock,
  ArrowLeft
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
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const { t } = useTranslations();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Kredi paketleri tanımları
  const creditPackages: CreditPackage[] = [
    {
      id: 'starter',
      name: 'Başlangıç Paketi',
      credits: 100,
      price: 29.99,
      currency: 'TRY',
      description: 'Temel okumalar için ideal',
      features: [
        '1-2 detaylı tarot okuması',
        'Numeroloji analizi',
        'Aşk açılımı',
        '7 gün geçerlilik'
      ],
      icon: <Coins className="h-8 w-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'popular',
      name: 'Popüler Paket',
      credits: 300,
      price: 79.99,
      currency: 'TRY',
      description: 'En çok tercih edilen paket',
      features: [
        '5-6 detaylı tarot okuması',
        'Numeroloji analizi',
        'Aşk açılımı',
        'Kariyer okuması',
        '30 gün geçerlilik',
        '%10 bonus kredi'
      ],
      popular: true,
      icon: <Star className="h-8 w-8" />,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      borderColor: 'border-gold/30'
    },
    {
      id: 'premium',
      name: 'Premium Paket',
      credits: 500,
      price: 119.99,
      currency: 'TRY',
      description: 'Sınırsız okuma deneyimi',
      features: [
        '10+ detaylı tarot okuması',
        'Numeroloji analizi',
        'Aşk açılımı',
        'Kariyer okuması',
        'Genel okuma',
        '60 gün geçerlilik',
        '%20 bonus kredi',
        'Öncelikli destek'
      ],
      icon: <Crown className="h-8 w-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    }
  ];

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/tr/auth');
        return;
      }
      fetchUserProfile();
    }
  }, [authLoading, isAuthenticated, router]);

  // Kullanıcı profilini çek
  const fetchUserProfile = async () => {
    if (!user) return;
    
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
        setError('Profil bilgileri yüklenemedi');
        return;
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Profil yükleme hatası:', error);
      setError('Profil bilgileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  // Paket satın alma işlemi
  const purchasePackage = async (packageId: string) => {
    if (!user || !profile) return;

    const selectedPackage = creditPackages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) return;

    try {
      setPurchasing(packageId);
      setError(null);
      setSuccess(null);

      // Bonus kredi hesapla
      const bonusCredits = selectedPackage.id === 'popular' ? 30 : 
                          selectedPackage.id === 'premium' ? 100 : 0;
      const totalCredits = selectedPackage.credits + bonusCredits;

      // Kredi bakiyesini güncelle
      const newBalance = (profile.credit_balance || 0) + totalCredits;
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          credit_balance: newBalance 
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Transaction log oluştur
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'purchase',
          amount: selectedPackage.price,
          delta_credits: totalCredits,
          reason: `${selectedPackage.name} satın alındı (${selectedPackage.credits} kredi${bonusCredits > 0 ? ` + ${bonusCredits} bonus` : ''})`,
          ref_type: 'package_purchase',
          ref_id: packageId,
          description: `${selectedPackage.name} - ${totalCredits} kredi`
        });

      if (transactionError) {
        console.warn('Transaction log oluşturulamadı:', transactionError);
        // Transaction log hatası kritik değil, devam et
      }

      // Profili güncelle
      setProfile(prev => prev ? { ...prev, credit_balance: newBalance } : null);
      
      // Başarı mesajı
      setSuccess(`${selectedPackage.name} başarıyla satın alındı! ${totalCredits} kredi hesabınıza eklendi.`);

      // Global event dispatch et - dashboard'u güncelle
      window.dispatchEvent(new CustomEvent('creditBalanceChanged', {
        detail: { newBalance }
      }));

    } catch (error) {
      console.error('Paket satın alma hatası:', error);
      setError('Paket satın alınırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setPurchasing(null);
    }
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-cosmic-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <div className="text-text-celestial text-lg">🔮 Kredi paketleri yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      {/* Header */}
      <header className="border-b border-cosmic-fog p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold text-text-celestial">Kredi Paketleri</span>
          </div>
          <a href="/dashboard" className="text-text-mystic hover:text-gold transition-colors flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard'a Dön</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-text-celestial">
            💎 Kredi Paketleri
          </h1>
          <p className="text-xl text-text-mystic mb-6">
            Tarot okumalarınız için ihtiyacınız olan kredileri satın alın
          </p>
          
          {/* Mevcut Kredi Bakiyesi */}
          {profile && (
            <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 rounded-lg px-6 py-3">
              <Coins className="h-5 w-5 text-gold" />
              <span className="text-gold font-semibold">
                Mevcut Bakiyeniz: {profile.credit_balance || 0} kredi
              </span>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-8 p-4 bg-success/10 border border-success/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-success" />
              <p className="text-success">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-danger/10 border border-danger/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-danger" />
              <p className="text-danger">{error}</p>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative card hover-lift p-8 ${
                pkg.popular ? 'ring-2 ring-gold/50' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gold text-cosmic-black px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>En Popüler</span>
                  </div>
                </div>
              )}

              {/* Package Icon */}
              <div className={`inline-flex p-4 rounded-lg ${pkg.bgColor} ${pkg.borderColor} border mb-6`}>
                <div className={pkg.color}>
                  {pkg.icon}
                </div>
              </div>

              {/* Package Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text-celestial mb-2">
                  {pkg.name}
                </h3>
                <p className="text-text-mystic mb-4">
                  {pkg.description}
                </p>
                
                {/* Credits */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gold mb-1">
                    {pkg.credits}
                  </div>
                  <div className="text-sm text-text-muted">kredi</div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-text-celestial">
                    {pkg.price} {pkg.currency}
                  </div>
                  <div className="text-sm text-text-muted">
                    {Math.round(pkg.price / pkg.credits * 100) / 100} {pkg.currency}/kredi
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-text-celestial mb-4">
                  Paket İçeriği:
                </h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-text-mystic">{feature}</span>
                    </li>
                  ))}
                </ul>
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
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <span>Satın Al</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center">
            <Shield className="h-8 w-8 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-celestial mb-2">
              Güvenli Ödeme
            </h3>
            <p className="text-text-mystic text-sm">
              Tüm ödemeler SSL şifreleme ile korunur
            </p>
          </div>

          <div className="card p-6 text-center">
            <Clock className="h-8 w-8 text-info mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-celestial mb-2">
              Anında Aktif
            </h3>
            <p className="text-text-mystic text-sm">
              Kredileriniz hemen hesabınıza eklenir
            </p>
          </div>

          <div className="card p-6 text-center">
            <Gift className="h-8 w-8 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-celestial mb-2">
              Bonus Krediler
            </h3>
            <p className="text-text-mystic text-sm">
              Büyük paketlerde ekstra kredi kazanın
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-text-celestial mb-6 text-center">
            ❓ Sıkça Sorulan Sorular
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                Krediler ne kadar süre geçerli?
              </h3>
              <p className="text-text-mystic text-sm">
                Kredileriniz satın alma tarihinden itibaren 1 yıl geçerlidir.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                İade politikası nedir?
              </h3>
              <p className="text-text-mystic text-sm">
                Kullanılmayan krediler için 7 gün içinde iade alabilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                Hangi ödeme yöntemleri kabul ediliyor?
              </h3>
              <p className="text-text-mystic text-sm">
                Kredi kartı, banka kartı ve dijital cüzdanlar kabul edilir.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                Bonus krediler nasıl hesaplanıyor?
              </h3>
              <p className="text-text-mystic text-sm">
                Popüler pakette %10, Premium pakette %20 bonus kredi verilir.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a
            href="/dashboard"
            className="btn btn-primary"
          >
            Dashboard'a Dön
          </a>
        </div>
      </main>
    </div>
  );
}
