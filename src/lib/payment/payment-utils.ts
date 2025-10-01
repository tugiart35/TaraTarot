/*
 * Payment Utility Functions
 *
 * Bu dosya payment işlemleri için ortak utility fonksiyonları sağlar.
 * DRY principle uygulayarak tekrarlanan payment kodlarını önler.
 */

/**
 * Order ID'den user ID çıkarma
 * Farklı order ID formatlarını destekler
 */
export function extractUserIdFromOrderId(orderId: string): string | null {
  try {
    // Format 1: ORDER_123_userId
    const match1 = orderId.match(/ORDER_\d+_(.+)/);
    if (match1?.[1]) {
      return match1[1];
    }

    // Format 2: user_userId_package_packageType_timestamp
    const parts = orderId.split('_');
    if (parts.length >= 2 && parts[0] === 'user') {
      return parts[1] || null;
    }

    // Format 3: userId_package_timestamp
    if (parts.length >= 3 && parts[1] === 'package') {
      return parts[0] || null;
    }

    return null;
  } catch (error) {
    console.error('Error extracting user ID from order ID:', error);
    return null;
  }
}

/**
 * Order ID'den package ID çıkarma
 */
export function extractPackageIdFromOrderId(orderId: string): string | null {
  try {
    const parts = orderId.split('_');

    // Format: user_userId_package_packageType_timestamp
    if (parts.length >= 4 && parts[0] === 'user' && parts[2] === 'package') {
      return parts[3] || null;
    }

    // Format: userId_package_packageType_timestamp
    if (parts.length >= 3 && parts[1] === 'package') {
      return parts[2] || null;
    }

    return null;
  } catch (error) {
    console.error('Error extracting package ID from order ID:', error);
    return null;
  }
}

/**
 * Package ID'den package bilgilerini al
 */
export function getPackageInfo(packageId: string): PackageInfo | null {
  const packages: Record<string, PackageInfo> = {
    '1': {
      id: '1',
      name: 'Başlangıç Paketi',
      credits: 100,
      bonusCredits: 0,
      priceTRY: 50.0,
    },
    starter: {
      id: 'starter',
      name: 'Başlangıç Paketi',
      credits: 100,
      bonusCredits: 0,
      priceTRY: 50.0,
    },
    popular: {
      id: 'popular',
      name: 'Popüler Paket',
      credits: 300,
      bonusCredits: 30,
      priceTRY: 150.0,
    },
    premium: {
      id: 'premium',
      name: 'Premium Paket',
      credits: 500,
      bonusCredits: 100,
      priceTRY: 250.0,
    },
  };

  return packages[packageId] || null;
}

/**
 * Bonus kredi hesaplama
 */
export function calculateBonusCredits(credits: number): number {
  if (credits >= 500) {
    return 100;
  }
  if (credits >= 300) {
    return 30;
  }
  return 0;
}

/**
 * Toplam kredi hesaplama (base + bonus)
 */
export function calculateTotalCredits(packageId: string): number {
  const packageInfo = getPackageInfo(packageId);
  if (!packageInfo) {
    return 0;
  }

  return packageInfo.credits + packageInfo.bonusCredits;
}

/**
 * Ödeme durumu metnini Türkçe'ye çevir
 */
export function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case 'success':
      return 'Başarılı';
    case 'failed':
    case 'failure':
      return 'Başarısız';
    case 'cancelled':
    case 'canceled':
      return 'İptal Edildi';
    case 'pending':
      return 'Beklemede';
    case 'expired':
      return 'Süresi Doldu';
    case 'refunded':
      return 'İade Edildi';
    default:
      return status;
  }
}

/**
 * Order ID formatını doğrula
 */
export function validateOrderIdFormat(orderId: string): boolean {
  return extractUserIdFromOrderId(orderId) !== null;
}

// Types
export interface PackageInfo {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  priceTRY: number;
}
