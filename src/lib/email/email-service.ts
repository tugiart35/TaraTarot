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
      console.log(
        'Email transporter initialized successfully with connection pooling'
      );
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
    _pdfBuffer: Buffer,
    _fileName: string
  ): Promise<boolean> {
    // Sadece güzel e-posta template'i - PDF gönderimi yok
    const htmlTemplate = this.generateEmailTemplate(readingData, userEmail);

    const emailData: EmailData = {
      to: 'busbuskimkionline@gmail.com', // Sadece admin'e gönder
      subject: `📊 Yeni Tarot Okuma - ${readingData.title || 'Tarot okuma'}`,
      html: htmlTemplate,
      // PDF attachments kaldırıldı
    };

    return await this.sendEmail(emailData);
  }

  private generateEmailTemplate(readingData: any, userEmail: string): string {
    // Kullanıcı bilgilerini al
    const personalInfo = readingData.questions?.personalInfo || {};
    const userName = personalInfo.name || 'Bilinmiyor';
    const userSurname = personalInfo.surname || 'Bilinmiyor';
    const birthDate = personalInfo.birthDate || 'Bilinmiyor';
    const phoneNumber = personalInfo.phone || 'Belirtilmemiş';
    const whatsapp = personalInfo.whatsapp || false;

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
        case 'LOVE_SPREAD_DETAILED':
          return 'Aşk Açılımı - Detaylı';
        case 'LOVE_SPREAD_WRITTEN':
          return 'Aşk Açılımı - Yazılı';
        case 'GENERAL_SPREAD':
          return 'Genel Okuma';
        case 'THREE_CARD_SPREAD':
          return 'Üç Kart Açılımı';
        case 'CAREER_SPREAD':
          return 'Kariyer Okuması';
        case 'NUMEROLOGY_READING':
          return 'Numeroloji';
        case 'PROBLEM_SOLVING_SPREAD':
          return 'Problem Çözme';
        case 'MONEY_SPREAD':
          return 'Para ve Mali Durum';
        default:
          return type.replace(/_/g, ' ');
      }
    };

    // Okuma formatını belirle
    const getReadingFormat = () => {
      if (readingData.reading_type?.includes('DETAILED')) {
        return '🎤 Sesli Detaylı Okuma';
      } else if (readingData.reading_type?.includes('WRITTEN')) {
        return '📝 Yazılı Okuma';
      } else {
        return '📄 Standart Okuma';
      }
    };

    // İletişim tercihini belirle
    const getCommunicationPreference = () => {
      if (whatsapp && phoneNumber !== 'Belirtilmemiş') {
        return `📱 WhatsApp: ${phoneNumber}`;
      } else if (phoneNumber !== 'Belirtilmemiş') {
        return `📞 Telefon: ${phoneNumber}`;
      } else {
        return '📧 Sadece Email';
      }
    };

    // Seçilen kartları listele - Yorumları ile birlikte
    const selectedCards = Array.isArray(readingData.cards)
      ? readingData.cards
      : [];

    // Kartların yorumlarını çıkar
    const getCardInterpretation = (cardIndex: number, cardName: string) => {
      const interpretation = readingData.interpretation || '';
      const lines = interpretation.split('\n');
      const cardSection = lines.find(
        (line: string) =>
          line.includes(`${cardIndex + 1}.`) && line.includes(cardName)
      );

      if (cardSection) {
        const sectionIndex = lines.findIndex(
          (line: string) => line === cardSection
        );
        const meaningLines = [];
        for (let i = sectionIndex + 2; i < lines.length; i++) {
          const currentLine = lines[i];
          if (
            !currentLine ||
            currentLine.trim() === '' ||
            currentLine.match(/^\*\*\d+\./) ||
            currentLine.includes('**Aşk Hayatı Özeti**')
          ) {
            break;
          }
          meaningLines.push(currentLine.trim());
        }
        return meaningLines.join(' ').trim();
      }
      return 'Yorum bulunamadı.';
    };

    const cardsList = selectedCards
      .map((card: any, index: number) => {
        const interpretation = getCardInterpretation(
          index,
          card.nameTr || card.name
        );
        return `
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #8b5cf6;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px;">
              ${index + 1}. ${card.nameTr || card.name} ${card.isReversed ? '(Ters)' : '(Düz)'}
            </h4>
            <p style="margin: 0; color: #374151; font-size: 13px; line-height: 1.5;">
              ${interpretation}
            </p>
          </div>
        `;
      })
      .join('');

    // Kullanıcı sorularını al
    const userQuestions = readingData.questions?.questions || [];
    const questionsList = userQuestions
      .map((q: any, index: number) => `${index + 1}. ${q}`)
      .join('<br>');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a; 
            margin: 0; 
            padding: 0; 
            background-color: #f8fafc;
          }
          .container { 
            max-width: 700px; 
            margin: 0 auto; 
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
            border-radius: 8px 8px 0 0;
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          .header p { 
            margin: 8px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 30px; 
          }
          .section { 
            background: #ffffff; 
            padding: 20px; 
            border-radius: 12px; 
            margin: 20px 0; 
            border-left: 4px solid #667eea;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          .section.user-info { border-left-color: #3b82f6; }
          .section.reading-info { border-left-color: #8b5cf6; }
          .section.cards-info { border-left-color: #f59e0b; }
          .section.communication-info { border-left-color: #10b981; }
          .section.questions-info { border-left-color: #ef4444; }
          .section h3 { 
            margin: 0 0 15px 0; 
            font-size: 18px; 
            font-weight: 600; 
            color: #1f2937;
          }
          .info-row { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            padding: 8px 0; 
            border-bottom: 1px solid #f3f4f6;
          }
          .info-row:last-child { border-bottom: none; }
          .info-label { 
            font-weight: 600; 
            color: #374151; 
            min-width: 140px;
          }
          .info-value { 
            color: #1f2937; 
            text-align: right;
            font-weight: 500;
          }
          .badge { 
            display: inline-block; 
            padding: 4px 8px; 
            border-radius: 6px; 
            font-size: 12px; 
            font-weight: 600;
          }
          .badge.success { background-color: #d1fae5; color: #065f46; }
          .badge.warning { background-color: #fef3c7; color: #92400e; }
          .badge.info { background-color: #dbeafe; color: #1e40af; }
          .footer { 
            background: linear-gradient(135deg, #4b5563, #374151); 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 14px;
            border-radius: 0 0 8px 8px;
          }
          .priority-notice {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
          }
          .priority-notice strong {
            color: #92400e;
          }
          @media (max-width: 600px) {
            .container { margin: 0; border-radius: 0; }
            .content { padding: 20px; }
            .info-row { flex-direction: column; align-items: flex-start; }
            .info-value { text-align: left; margin-top: 4px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔮 Yeni Tarot Okuma Bildirimi</h1>
            <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
          </div>
          
          <div class="content">
            <div class="priority-notice">
              <strong>🚨 YENİ OKUMA TAMAMLANDI - HEMEN İNCELEYİN!</strong>
            </div>
            
            <div class="section user-info">
              <h3>👤 KULLANICI BİLGİLERİ</h3>
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
              <div class="info-row">
                <span class="info-label">İletişim:</span> 
                <span class="info-value">${getCommunicationPreference()}</span>
              </div>
            </div>
            
            <div class="section reading-info">
              <h3>🔮 OKUMA DETAYLARI</h3>
              <div class="info-row">
                <span class="info-label">Okuma Türü:</span> 
                <span class="info-value">${getReadingTypeText(readingData.reading_type)}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Başlık:</span> 
                <span class="info-value">${readingData.title || 'Tarot okuma'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Yayılım:</span> 
                <span class="info-value">${readingData.spread_name || 'Genel Yayılım'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Format:</span> 
                <span class="info-value">${getReadingFormat()}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Açılım Tarihi:</span> 
                <span class="info-value">${readingDate}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Kredi Maliyeti:</span> 
                <span class="info-value"><span class="badge info">${readingData.cost_credits || 50} kredi</span></span>
              </div>
              <div class="info-row">
                <span class="info-label">Durum:</span> 
                <span class="info-value"><span class="badge success">✅ ${readingData.status === 'completed' ? 'Tamamlandı' : readingData.status}</span></span>
              </div>
            </div>
            
            <div class="section cards-info">
              <h3>🎴 SEÇİLEN KARTLAR VE ANLAMLARI (${selectedCards.length} kart)</h3>
              <div style="text-align: left; line-height: 1.8;">
                ${cardsList || 'Kart bilgisi bulunamadı'}
              </div>
            </div>
            
            ${
              questionsList
                ? `
            <div class="section questions-info">
              <h3>❓ SORULAR VE CEVAPLAR</h3>
              <div class="info-value" style="text-align: left; line-height: 1.8;">
                ${questionsList}
              </div>
            </div>
            `
                : ''
            }
            
            <div class="section communication-info">
              <h3>📞 İLETİŞİM BİLGİLERİ</h3>
              <div class="info-row">
                <span class="info-label">Tercih Edilen İletişim:</span> 
                <span class="info-value">${getCommunicationPreference()}</span>
              </div>
              <div class="info-row">
                <span class="info-label">WhatsApp:</span> 
                <span class="info-value">${whatsapp ? '<span class="badge success">✅ Aktif</span>' : '<span class="badge warning">❌ Pasif</span>'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Telefon:</span> 
                <span class="info-value">${phoneNumber}</span>
              </div>
            </div>
            
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <p style="margin: 0; color: #991b1b; font-weight: 600;">
                ⚠️ <strong>ÖNEMLİ:</strong> Bu okuma otomatik olarak sistem tarafından oluşturulmuştur. 
                Kullanıcıya yanıt vermeden önce tüm detayları kontrol ediniz.
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Busbuskimki Tarot</strong> - Mistik Rehberlik Sistemi</p>
            <p>Bu email otomatik olarak gönderilmiştir - ${new Date().toLocaleString('tr-TR')}</p>
            <p style="font-size: 12px; opacity: 0.8;">Sistem ID: ${readingData.id || 'N/A'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = EmailService.getInstance();
export default EmailService;
