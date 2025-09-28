/*
 * Shopier Email Templates
 *
 * Bu dosya Shopier ödeme işlemleri için email template'lerini sağlar.
 * DRY principle uygulayarak email template duplication'ını önler.
 */

export interface PaymentSuccessData {
  userEmail: string;
  userName: string;
  packageName: string;
  credits: number;
  amount: number;
  orderId: string;
  newBalance: number;
}

export interface PaymentFailureData {
  userEmail: string;
  userName: string;
  orderId: string;
  status: string;
  amount: number;
}

export class ShopierEmailTemplates {
  /**
   * Başarılı ödeme email template'i
   */
  static generatePaymentSuccessEmail(data: PaymentSuccessData): string {
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
        <h1>💳 Yeni Ödeme Bildirimi</h1>
        <p>Busbuskimki Tarot Sistemi</p>
      </div>
      
      <div class="content">
        <h2>🎉 Başarılı Kredi Satın Alma</h2>
        
        <div class="payment-info">
          <h3>💰 Ödeme Detayları</h3>
          <div class="info-row">
            <span class="info-label">Sipariş No:</span> 
            <span class="info-value">${data.orderId}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Paket:</span> 
            <span class="info-value">${data.packageName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Tutar:</span> 
            <span class="info-value">${data.amount} TL</span>
          </div>
          <div class="info-row">
            <span class="info-label">Kredi:</span> 
            <span class="info-value">+${data.credits} kredi</span>
          </div>
          <div class="info-row">
            <span class="info-label">Yeni Bakiye:</span> 
            <span class="info-value">${data.newBalance} kredi</span>
          </div>
          <div class="info-row">
            <span class="info-label">Durum:</span> 
            <span class="success-badge">✅ Başarılı</span>
          </div>
        </div>
        
        <div class="user-info">
          <h3>👤 Kullanıcı Bilgileri</h3>
          <div class="info-row">
            <span class="info-label">Ad Soyad:</span> 
            <span class="info-value">${data.userName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email:</span> 
            <span class="info-value">${data.userEmail}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Ödeme Tarihi:</span> 
            <span class="info-value">${new Date().toLocaleString('tr-TR')}</span>
          </div>
        </div>
        
        <p>🎯 Kullanıcı artık ${data.newBalance} kredi ile tarot okumaları yapabilir.</p>
        <p>📊 Bu ödeme otomatik olarak sisteme kaydedilmiştir.</p>
      </div>
      
      <div class="footer">
        <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
        <p>Bu email otomatik olarak gönderilmiştir. - ${new Date().toLocaleString('tr-TR')}</p>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Başarısız ödeme email template'i
   */
  static generatePaymentFailureEmail(data: PaymentFailureData): string {
    const statusText = this.getStatusText(data.status);

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
        <h1>⚠️ Ödeme Bildirimi</h1>
        <p>Busbuskimki Tarot Sistemi</p>
      </div>
      
      <div class="content">
        <h2>📋 Ödeme Durumu: ${statusText}</h2>
        
        <div class="payment-info">
          <h3>💰 Ödeme Detayları</h3>
          <div class="info-row">
            <span class="info-label">Sipariş No:</span> 
            <span class="info-value">${data.orderId}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Tutar:</span> 
            <span class="info-value">${data.amount} TL</span>
          </div>
          <div class="info-row">
            <span class="info-label">Durum:</span> 
            <span class="warning-badge">⚠️ ${statusText}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Tarih:</span> 
            <span class="info-value">${new Date().toLocaleString('tr-TR')}</span>
          </div>
        </div>
        
        <div class="user-info">
          <h3>👤 Kullanıcı Bilgileri</h3>
          <div class="info-row">
            <span class="info-label">Ad Soyad:</span> 
            <span class="info-value">${data.userName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email:</span> 
            <span class="info-value">${data.userEmail}</span>
          </div>
        </div>
        
        <p>🔍 Bu ödeme işlemi ${statusText.toLowerCase()} olarak işaretlenmiştir.</p>
        <p>📊 Kullanıcının kredi bakiyesi güncellenmemiştir.</p>
        <p>🔄 Gerekirse manuel müdahale yapılabilir.</p>
      </div>
      
      <div class="footer">
        <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
        <p>Bu email otomatik olarak gönderilmiştir. - ${new Date().toLocaleString('tr-TR')}</p>
      </div>
    </body>
    </html>
  `;
  }

  /**
   * Ödeme durumu metnini Türkçe'ye çevir
   */
  private static getStatusText(status: string): string {
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
}
