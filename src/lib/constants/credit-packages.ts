/*
info:
Bağlantılı dosyalar:
- @/app/[locale]/dashboard/packages/page.tsx: Kredi paketleri sayfası (gerekli)
- @/hooks/usePayment.ts: Ödeme hook'u (gerekli)
- @/lib/payment/payment-types.ts: Ödeme tipleri (gerekli)

Dosyanın amacı:
- Kredi paketleri için merkezi konfigürasyon
- Paket fiyatları, özellikleri ve bonus hesaplamaları
- Tip güvenliği için TypeScript tanımları

Backend bağlantısı:
- Backend ile doğrudan bağlantı yok
- Paket satın alma işlemlerinde kullanılır
- Burada backend'e bağlanılacak - ödeme işlemleri

Geliştirme ve öneriler:
- Paket fiyatları dinamik hale getirilebilir
- Çoklu para birimi desteği eklenebilir
- Kampanya ve indirim sistemi entegre edilebilir
- A/B test için farklı paket konfigürasyonları

Hatalar / Geliştirmeye Açık Noktalar:
- Fiyatlar sabit, dinamik hale getirilebilir
- Para birimi sadece TRY, uluslararasılaştırılabilir
- Paket özellikleri genişletilebilir

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz kod yapısı, açık konfigürasyon
- Optimizasyon: Sabit değerler, performanslı
- Yeniden Kullanılabilirlik: Modüler yapı, kolay genişletilebilir
- Güvenlik: Sabit değerler, güvenli konfigürasyon

Gereklilik ve Kullanım Durumu:
- CREDIT_PACKAGES: Gerekli, paket tanımları için ana kaynak
- CreditPackage: Gerekli, tip güvenliği için
- PackageType: Gerekli, paket türü kontrolü için
- calculateBonus: Gerekli, bonus hesaplama için
*/

// Kredi paketi türleri
export type PackageType = 'starter' | 'popular' | 'premium';

// Para birimi türleri
export type Currency = 'TRY' | 'USD' | 'EUR';

// Kredi paketi arayüzü
export interface CreditPackage {
  id: PackageType;
  name: string;
  credits: number;
  price: number;
  currency: Currency;
  description: string;
  features: string[];
  popular?: boolean;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  bonusPercentage?: number;
  validityDays: number;
  minCredits?: number;
  maxCredits?: number;
}

// Kredi paketleri konfigürasyonu
export const CREDIT_PACKAGES: Record<PackageType, CreditPackage> = {
  starter: {
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
      '7 gün geçerlilik',
    ],
    icon: 'Coins',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    validityDays: 7,
    minCredits: 50,
    maxCredits: 150,
  },
  popular: {
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
      '%10 bonus kredi',
    ],
    popular: true,
    icon: 'Star',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/30',
    bonusPercentage: 10,
    validityDays: 30,
    minCredits: 250,
    maxCredits: 400,
  },
  premium: {
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
      'Öncelikli destek',
    ],
    icon: 'Crown',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    bonusPercentage: 20,
    validityDays: 60,
    minCredits: 400,
    maxCredits: 700,
  },
};

// Bonus kredi hesaplama fonksiyonu
export const calculateBonus = (packageType: PackageType): number => {
  const pkg = CREDIT_PACKAGES[packageType];
  if (!pkg.bonusPercentage) {
    return 0;
  }

  return Math.round((pkg.credits * pkg.bonusPercentage) / 100);
};

// Toplam kredi hesaplama (ana kredi + bonus)
export const calculateTotalCredits = (packageType: PackageType): number => {
  const pkg = CREDIT_PACKAGES[packageType];
  return pkg.credits + calculateBonus(packageType);
};

// Paket fiyatı hesaplama (kredi başına)
export const calculatePricePerCredit = (packageType: PackageType): number => {
  const pkg = CREDIT_PACKAGES[packageType];
  return Math.round((pkg.price / pkg.credits) * 100) / 100;
};

// Paket önerisi (kullanıcının ihtiyacına göre)
export const recommendPackage = (requiredCredits: number): PackageType => {
  if (requiredCredits <= 150) {
    return 'starter';
  }
  if (requiredCredits <= 400) {
    return 'popular';
  }
  return 'premium';
};

// Paket karşılaştırma
export const comparePackages = (
  package1: PackageType,
  package2: PackageType
) => {
  const pkg1 = CREDIT_PACKAGES[package1];
  const pkg2 = CREDIT_PACKAGES[package2];

  return {
    priceDifference: pkg2.price - pkg1.price,
    creditDifference: pkg2.credits - pkg1.credits,
    valueRatio: pkg2.credits / pkg2.price / (pkg1.credits / pkg1.price),
    betterValue:
      pkg2.credits / pkg2.price > pkg1.credits / pkg1.price
        ? package2
        : package1,
  };
};

// Paket geçerlilik kontrolü
export const isPackageValid = (
  packageType: PackageType,
  purchaseDate: Date
): boolean => {
  const pkg = CREDIT_PACKAGES[packageType];
  const expiryDate = new Date(purchaseDate);
  expiryDate.setDate(expiryDate.getDate() + pkg.validityDays);

  return new Date() <= expiryDate;
};

// Paket özellikleri filtreleme
export const getPackageFeatures = (
  packageType: PackageType,
  category?: string
): string[] => {
  const pkg = CREDIT_PACKAGES[packageType];

  if (!category) {
    return pkg.features;
  }

  // Kategoriye göre filtreleme (gelecekte genişletilebilir)
  switch (category) {
    case 'tarot':
      return pkg.features.filter(
        feature =>
          feature.toLowerCase().includes('tarot') ||
          feature.toLowerCase().includes('açılım')
      );
    case 'numerology':
      return pkg.features.filter(feature =>
        feature.toLowerCase().includes('numeroloji')
      );
    case 'support':
      return pkg.features.filter(
        feature =>
          feature.toLowerCase().includes('destek') ||
          feature.toLowerCase().includes('geçerlilik')
      );
    default:
      return pkg.features;
  }
};

// Paket istatistikleri
export const getPackageStats = () => {
  const packages = Object.values(CREDIT_PACKAGES);

  return {
    totalPackages: packages.length,
    averagePrice:
      packages.reduce((sum, pkg) => sum + pkg.price, 0) / packages.length,
    averageCredits:
      packages.reduce((sum, pkg) => sum + pkg.credits, 0) / packages.length,
    totalCredits: packages.reduce((sum, pkg) => sum + pkg.credits, 0),
    totalPrice: packages.reduce((sum, pkg) => sum + pkg.price, 0),
    bestValue: packages.reduce((best, current) =>
      current.credits / current.price > best.credits / best.price
        ? current
        : best
    ),
    mostPopular: packages.find(pkg => pkg.popular) || packages[0],
  };
};

// Paket arama ve filtreleme
export const searchPackages = (query: string): PackageType[] => {
  const packages = Object.entries(CREDIT_PACKAGES);

  return packages
    .filter(
      ([_, pkg]) =>
        pkg.name.toLowerCase().includes(query.toLowerCase()) ||
        pkg.description.toLowerCase().includes(query.toLowerCase()) ||
        pkg.features.some(feature =>
          feature.toLowerCase().includes(query.toLowerCase())
        )
    )
    .map(([type, _]) => type as PackageType);
};

// Paket sıralama
export const sortPackages = (
  packages: PackageType[],
  sortBy: 'price' | 'credits' | 'value' | 'popularity' = 'price'
): PackageType[] => {
  return [...packages].sort((a, b) => {
    const pkgA = CREDIT_PACKAGES[a];
    const pkgB = CREDIT_PACKAGES[b];

    switch (sortBy) {
      case 'price':
        return pkgA.price - pkgB.price;
      case 'credits':
        return pkgA.credits - pkgB.credits;
      case 'value':
        return pkgB.credits / pkgB.price - pkgA.credits / pkgA.price;
      case 'popularity':
        if (pkgA.popular && !pkgB.popular) {
          return -1;
        }
        if (!pkgA.popular && pkgB.popular) {
          return 1;
        }
        return 0;
      default:
        return 0;
    }
  });
};

// Not: Bu dosya içindeki tüm öğeler zaten tanımlanırken export edildi.
// Aşağıdaki toplu export blokları duplicate export hatasına yol açtığı için kaldırıldı.
