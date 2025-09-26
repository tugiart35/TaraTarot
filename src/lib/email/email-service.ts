/*
 * Email Servisi - Tarot Okuma PDF'leri için
 *
 * Bu dosya email gönderme işlevselliğini içerir.
 * Tarot okuma PDF'lerini otomatik olarak gönderir.
 *
 * Bağlı dosyalar:
 * - Nodemailer (email gönderme)
 * - PDF generator servisi
 *
 * Geliştirme önerileri:
 * - Email template sistemi
 * - Attachment desteği
 * - Error handling
 *
 * Kullanım durumları:
 * - Gerekli: Otomatik PDF gönderimi
 * - Modern: Template tabanlı email
 * - Güvenli: Environment variables
 */

import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  // Connection pooling ayarları
  pool?: boolean;
  maxConnections?: number;
  maxMessages?: number;
  rateLimit?: number;
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter | null = null;
  private isInitialized: boolean = false;

  private constructor() {
    this.initializeTransporter();
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initializeTransporter() {
    if (this.isInitialized) {
      return;
    }

    try {
      const config: EmailConfig = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
        // Connection pooling ayarları
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10, // 10 emails per second
      };

      console.log('SMTP Config:', {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.auth.user,
        hasPassword: !!config.auth.pass,
      });

      this.transporter = nodemailer.createTransport(config);
      this.isInitialized = true;
      console.log('Email transporter initialized successfully with connection pooling');
    } catch (error) {
      console.error('Email transporter initialization failed:', error);
    }
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    if (!this.transporter) {
      console.error('Email transporter not initialized');
      return false;
    }

    try {
      const mailOptions = {
        from: `"Busbuskimki Tarot" <${process.env.SMTP_USER}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        attachments: emailData.attachments,
      };

      console.log('Sending email to:', emailData.to);
      console.log('Mail options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        hasHtml: !!mailOptions.html,
        hasAttachments: !!mailOptions.attachments,
      });

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendTarotReadingPDF(
    userEmail: string,
    readingData: any,
    pdfBuffer: Buffer,
    fileName: string
  ): Promise<boolean> {
    const htmlTemplate = this.generateEmailTemplate(readingData, userEmail);

    // Numeroloji PDF'i de oluştur
    let attachments = [
      {
        filename: fileName,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ];

    // Kullanıcı bilgileri varsa numeroloji PDF'i de ekle
    if (readingData.questions?.personalInfo) {
      try {
        const { pdfGeneratorService } = await import('@/lib/pdf/pdf-generator');
        const numerologyPdfBuffer =
          await pdfGeneratorService.generateNumerologyPDF(
            readingData.questions.personalInfo
          );
        const numerologyFileName = `numeroloji-analizi-${new Date().toISOString().split('T')[0]}.pdf`;

        attachments.push({
          filename: numerologyFileName,
          content: numerologyPdfBuffer,
          contentType: 'application/pdf',
        });
      } catch (error) {
        console.error('Numeroloji PDF oluşturulamadı:', error);
      }
    }

    const emailData: EmailData = {
      to: 'busbuskimkionline@gmail.com', // Sadece admin'e gönder
      subject: `📊 Yeni Tarot Okuma - ${readingData.title || 'Mistik Okuma'}`,
      html: htmlTemplate,
      attachments: attachments,
    };

    return await this.sendEmail(emailData);
  }

  private generateEmailTemplate(readingData: any, userEmail: string): string {
    // Kullanıcı bilgilerini al
    const personalInfo = readingData.questions?.personalInfo || {};
    const userName = personalInfo.name || 'Bilinmiyor';
    const userSurname = personalInfo.surname || 'Bilinmiyor';
    const birthDate = personalInfo.birthDate || 'Bilinmiyor';

    // Okuma tarihini formatla
    const readingDate = new Date(readingData.created_at).toLocaleDateString(
      'tr-TR',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );

    // Okuma türünü Türkçe'ye çevir
    const getReadingTypeText = (type: string) => {
      switch (type) {
        case 'love':
          return 'Aşk Açılımı';
        case 'general':
          return 'Genel Okuma';
        case 'three_card':
          return 'Üç Kart Açılımı';
        case 'career':
          return 'Kariyer Okuması';
        case 'numerology':
          return 'Numeroloji';
        default:
          return type;
      }
    };

    // Seçilen kartları listele
    const selectedCards = Array.isArray(readingData.cards)
      ? readingData.cards
      : [];
    const cardsList = selectedCards
      .map(
        (card: any, index: number) =>
          `${index + 1}. ${card.nameTr || card.name} ${card.isReversed ? '(Ters)' : '(Düz)'}`
      )
      .join('<br>');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .user-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2196f3; }
          .reading-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #8b5cf6; }
          .cards-info { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ff9800; }
          .footer { background: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px; }
          .info-row { margin: 8px 0; }
          .info-label { font-weight: bold; color: #555; }
          .info-value { color: #333; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔮 Yeni Tarot Okuma</h1>
          <p>Busbuskimki Tarot Sistemi</p>
        </div>
        
        <div class="content">
          <h2>📊 Yeni Tarot Okuma Bildirimi</h2>
          
          <div class="user-info">
            <h3>👤 Kullanıcı Bilgileri</h3>
            <div class="info-row">
              <span class="info-label">Ad Soyad:</span> 
              <span class="info-value">${userName} ${userSurname}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span> 
              <span class="info-value">${userEmail}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Doğum Tarihi:</span> 
              <span class="info-value">${birthDate}</span>
            </div>
          </div>
          
          <div class="reading-info">
            <h3>🔮 Okuma Detayları</h3>
            <div class="info-row">
              <span class="info-label">Okuma Türü:</span> 
              <span class="info-value">${getReadingTypeText(readingData.reading_type)}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Başlık:</span> 
              <span class="info-value">${readingData.title || 'Mistik Okuma'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Yayılım:</span> 
              <span class="info-value">${readingData.spread_name || 'Genel Yayılım'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Açılım Tarihi:</span> 
              <span class="info-value">${readingDate}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Kredi Maliyeti:</span> 
              <span class="info-value">${readingData.cost_credits || 50} kredi</span>
            </div>
            <div class="info-row">
              <span class="info-label">Durum:</span> 
              <span class="info-value">${readingData.status === 'completed' ? '✅ Tamamlandı' : readingData.status}</span>
            </div>
          </div>
          
          <div class="cards-info">
            <h3>🎴 Seçilen Kartlar</h3>
            <div class="info-value">${cardsList || 'Kart bilgisi bulunamadı'}</div>
          </div>
          
          <p>📎 Detaylı okuma raporu PDF olarak ekte gönderilmiştir.</p>
          <p>🔢 Numeroloji analizi PDF'i de ekte gönderilmiştir.</p>
          
          <p>Bu okuma otomatik olarak sistem tarafından oluşturulmuş ve admin'e bildirilmiştir.</p>
        </div>
        
        <div class="footer">
          <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
          <p>Bu email otomatik olarak gönderilmiştir. - ${new Date().toLocaleString('tr-TR')}</p>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = EmailService.getInstance();
export default EmailService;
