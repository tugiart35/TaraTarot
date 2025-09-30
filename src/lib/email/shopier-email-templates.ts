/*
 * Shopier Email Templates
 *
 * Bu dosya Shopier ödeme işlemleri için email template'lerini sağlar.
 * DRY principle uygulayarak email template duplication'ını önler.
 * Multi-language desteği ile farklı dillerde email gönderimi sağlar.
 */

export interface PaymentSuccessData {
  userEmail: string;
  userName: string;
  packageName: string;
  credits: number;
  amount: number;
  orderId: string;
  newBalance: number;
  locale?: string; // Dil seçeneği
}

export interface PaymentFailureData {
  userEmail: string;
  userName: string;
  orderId: string;
  status: string;
  amount: number;
  locale?: string; // Dil seçeneği
}

// Çeviri anahtarları
interface EmailTranslations {
  paymentNotification: string;
  systemName: string;
  successfulPurchase: string;
  paymentDetails: string;
  orderNumber: string;
  package: string;
  amount: string;
  credits: string;
  newBalance: string;
  status: string;
  successful: string;
  userInfo: string;
  fullName: string;
  email: string;
  paymentDate: string;
  userCanNowRead: string;
  automaticallySaved: string;
  footerText: string;
  automaticEmail: string;
  paymentStatus: string;
  warning: string;
  paymentNotProcessed: string;
  manualIntervention: string;
}

// Dil çevirileri
const translations: Record<string, EmailTranslations> = {
  tr: {
    paymentNotification: '💳 Yeni Ödeme Bildirimi',
    systemName: 'Busbuskimki Tarot Sistemi',
    successfulPurchase: '🎉 Başarılı Kredi Satın Alma',
    paymentDetails: '💰 Ödeme Detayları',
    orderNumber: 'Sipariş No',
    package: 'Paket',
    amount: 'Tutar',
    credits: 'Kredi',
    newBalance: 'Yeni Bakiye',
    status: 'Durum',
    successful: '✅ Başarılı',
    userInfo: '👤 Kullanıcı Bilgileri',
    fullName: 'Ad Soyad',
    email: 'Email',
    paymentDate: 'Ödeme Tarihi',
    userCanNowRead:
      '🎯 Kullanıcı artık {credits} kredi ile tarot okumaları yapabilir.',
    automaticallySaved: '📊 Bu ödeme otomatik olarak sisteme kaydedilmiştir.',
    footerText: 'Busbuskimki Tarot - Mistik Rehberlik Sistemi',
    automaticEmail: 'Bu email otomatik olarak gönderilmiştir.',
    paymentStatus: '📋 Ödeme Durumu',
    warning: '⚠️ Ödeme Bildirimi',
    paymentNotProcessed: '📊 Kullanıcının kredi bakiyesi güncellenmemiştir.',
    manualIntervention: '🔄 Gerekirse manuel müdahale yapılabilir.',
  },
  en: {
    paymentNotification: '💳 New Payment Notification',
    systemName: 'Busbuskimki Tarot System',
    successfulPurchase: '🎉 Successful Credit Purchase',
    paymentDetails: '💰 Payment Details',
    orderNumber: 'Order Number',
    package: 'Package',
    amount: 'Amount',
    credits: 'Credits',
    newBalance: 'New Balance',
    status: 'Status',
    successful: '✅ Successful',
    userInfo: '👤 User Information',
    fullName: 'Full Name',
    email: 'Email',
    paymentDate: 'Payment Date',
    userCanNowRead:
      '🎯 User can now make tarot readings with {credits} credits.',
    automaticallySaved:
      '📊 This payment has been automatically recorded in the system.',
    footerText: 'Busbuskimki Tarot - Mystical Guidance System',
    automaticEmail: 'This email was sent automatically.',
    paymentStatus: '📋 Payment Status',
    warning: '⚠️ Payment Notification',
    paymentNotProcessed: '📊 User credit balance has not been updated.',
    manualIntervention: '🔄 Manual intervention may be required if necessary.',
  },
  sr: {
    paymentNotification: '💳 Obaveštenje o novoj uplati',
    systemName: 'Busbuskimki Tarot Sistem',
    successfulPurchase: '🎉 Uspešna kupovina kredita',
    paymentDetails: '💰 Detalji plaćanja',
    orderNumber: 'Broj porudžbine',
    package: 'Paket',
    amount: 'Iznos',
    credits: 'Krediti',
    newBalance: 'Novo stanje',
    status: 'Status',
    successful: '✅ Uspešno',
    userInfo: '👤 Informacije o korisniku',
    fullName: 'Ime i prezime',
    email: 'Email',
    paymentDate: 'Datum plaćanja',
    userCanNowRead: '🎯 Korisnik sada može da čita tarot sa {credits} kredita.',
    automaticallySaved: '📊 Ovo plaćanje je automatski zabeleženo u sistemu.',
    footerText: 'Busbuskimki Tarot - Sistem za mistično vođenje',
    automaticEmail: 'Ovaj email je poslat automatski.',
    paymentStatus: '📋 Status plaćanja',
    warning: '⚠️ Obaveštenje o plaćanju',
    paymentNotProcessed: '📊 Stanje kredita korisnika nije ažurirano.',
    manualIntervention: '🔄 Možda je potrebna ručna intervencija.',
  },
};

export class ShopierEmailTemplates {
  /**
   * Başarılı ödeme email template'i
   */
  static generatePaymentSuccessEmail(data: PaymentSuccessData): string {
    // Dil seçimi (varsayılan: tr)
    const locale = data.locale || 'tr';
    // Get translations for the current locale, fallback to Turkish
    const currentLocale = locale as keyof typeof translations;
    const t = (translations[currentLocale] ||
      translations.tr) as EmailTranslations;

    // Tarih formatı
    const dateFormat =
      locale === 'tr' ? 'tr-TR' : locale === 'en' ? 'en-US' : 'sr-Latn-RS';
    const dateStr = new Date().toLocaleString(dateFormat);

    // Kredi metni
    const userCanNowRead = t.userCanNowRead.replace(
      '{credits}',
      data.newBalance.toString()
    );

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .payment-info { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #4caf50; }
        .user-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2196f3; }
        .footer { background: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .info-row { margin: 8px 0; }
        .info-label { font-weight: bold; color: #555; }
        .info-value { color: #333; }
        .success-badge { background: #4caf50; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${t.paymentNotification}</h1>
        <p>${t.systemName}</p>
      </div>
      
      <div class="content">
        <h2>${t.successfulPurchase}</h2>
        
        <div class="payment-info">
          <h3>${t.paymentDetails}</h3>
          <div class="info-row">
            <span class="info-label">${t.orderNumber}:</span> 
            <span class="info-value">${data.orderId}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.package}:</span> 
            <span class="info-value">${data.packageName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.amount}:</span> 
            <span class="info-value">${data.amount} TL</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.credits}:</span> 
            <span class="info-value">+${data.credits} ${locale === 'tr' ? 'kredi' : 'credits'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.newBalance}:</span> 
            <span class="info-value">${data.newBalance} ${locale === 'tr' ? 'kredi' : 'credits'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.status}:</span> 
            <span class="success-badge">${t.successful}</span>
          </div>
        </div>
        
        <div class="user-info">
          <h3>${t.userInfo}</h3>
          <div class="info-row">
            <span class="info-label">${t.fullName}:</span> 
            <span class="info-value">${data.userName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.email}:</span> 
            <span class="info-value">${data.userEmail}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.paymentDate}:</span> 
            <span class="info-value">${dateStr}</span>
          </div>
        </div>
        
        <p>${userCanNowRead}</p>
        <p>${t.automaticallySaved}</p>
      </div>
      
      <div class="footer">
        <p>${t.footerText}</p>
        <p>${t.automaticEmail} - ${dateStr}</p>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Başarısız ödeme email template'i
   */
  static generatePaymentFailureEmail(data: PaymentFailureData): string {
    // Dil seçimi (varsayılan: tr)
    const locale = data.locale || 'tr';
    // Get translations for the current locale, fallback to Turkish
    const currentLocale = locale as keyof typeof translations;
    const t = (translations[currentLocale] ||
      translations.tr) as EmailTranslations;

    // Tarih formatı
    const dateFormat =
      locale === 'tr' ? 'tr-TR' : locale === 'en' ? 'en-US' : 'sr-Latn-RS';
    const dateStr = new Date().toLocaleString(dateFormat);

    // Durum metni çevirisi
    const statusText = this.getStatusText(data.status, locale);

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #f59e0b, #f97316); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .payment-info { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        .user-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2196f3; }
        .footer { background: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .info-row { margin: 8px 0; }
        .info-label { font-weight: bold; color: #555; }
        .info-value { color: #333; }
        .warning-badge { background: #f59e0b; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${t.warning}</h1>
        <p>${t.systemName}</p>
      </div>
      
      <div class="content">
        <h2>${t.paymentStatus}: ${statusText}</h2>
        
        <div class="payment-info">
          <h3>${t.paymentDetails}</h3>
          <div class="info-row">
            <span class="info-label">${t.orderNumber}:</span> 
            <span class="info-value">${data.orderId}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.amount}:</span> 
            <span class="info-value">${data.amount} TL</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.status}:</span> 
            <span class="warning-badge">⚠️ ${statusText}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.paymentDate}:</span> 
            <span class="info-value">${dateStr}</span>
          </div>
        </div>
        
        <div class="user-info">
          <h3>${t.userInfo}</h3>
          <div class="info-row">
            <span class="info-label">${t.fullName}:</span> 
            <span class="info-value">${data.userName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">${t.email}:</span> 
            <span class="info-value">${data.userEmail}</span>
          </div>
        </div>
        
        <p>🔍 ${statusText}</p>
        <p>${t.paymentNotProcessed}</p>
        <p>${t.manualIntervention}</p>
      </div>
      
      <div class="footer">
        <p>${t.footerText}</p>
        <p>${t.automaticEmail} - ${dateStr}</p>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Ödeme durumu metnini seçilen dile çevir
   */
  private static getStatusText(status: string, locale: string): string {
    const statusMap: Record<string, Record<string, string>> = {
      tr: {
        success: 'Başarılı',
        failed: 'Başarısız',
        failure: 'Başarısız',
        cancelled: 'İptal Edildi',
        canceled: 'İptal Edildi',
        pending: 'Beklemede',
        expired: 'Süresi Doldu',
        refunded: 'İade Edildi',
      },
      en: {
        success: 'Successful',
        failed: 'Failed',
        failure: 'Failed',
        cancelled: 'Cancelled',
        canceled: 'Cancelled',
        pending: 'Pending',
        expired: 'Expired',
        refunded: 'Refunded',
      },
      sr: {
        success: 'Uspešno',
        failed: 'Neuspešno',
        failure: 'Neuspešno',
        cancelled: 'Otkazano',
        canceled: 'Otkazano',
        pending: 'Na čekanju',
        expired: 'Isteklo',
        refunded: 'Refundirano',
      },
    };

    // Get status map for the current locale, fallback to Turkish
    const currentLocale = locale as keyof typeof statusMap;
    const localeMap = (statusMap[currentLocale] || statusMap.tr) as Record<
      string,
      string
    >;
    const statusKey = status.toLowerCase();
    return localeMap[statusKey] ? localeMap[statusKey] : status;
  }
}
