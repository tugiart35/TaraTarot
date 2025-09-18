/*
 * DOSYA ANALİZİ - PDF GENERATOR SERVICE
 *
 * BAĞLANTILI DOSYALAR:
 * - src/lib/email/email-service.ts (email gönderme servisi)
 * - src/features/shared/ui/ReadingDetailModal.tsx (modal tasarımı)
 *
 * DOSYA AMACI:
 * ReadingDetailModal tarzında PDF oluşturma servisi
 * Puppeteer ile yüksek kaliteli PDF üretimi
 *
 * SUPABASE DEĞİŞKENLERİ:
 * - readings tablosu (okuma verileri)
 * - cards tablosu (kart bilgileri)
 *
 * GELİŞTİRME ÖNERİLERİ:
 * - Kart fotoğrafları eklendi
 * - Tek sayfa PDF formatı
 * - Modern gradient tasarım
 *
 * HATA DURUMLARI:
 * - Puppeteer başlatma hatası
 * - HTML render hatası
 *
 * KULLANIM DURUMU:
 * - AKTİF: Email PDF oluşturma
 * - GÜVENLİ: Production-ready
 */

// JSDOM not used in this file
import {
  calculateLifePath,
  calculateExpressionDestiny,
  calculateSoulUrge,
  calculatePersonality,
  calculateBirthdayNumber,
  calculateMaturity,
  calculatePinnaclesChallenges,
  calculatePersonalCycles,
} from '@/lib/numerology/calculators';

export interface ReadingData {
  id: string;
  reading_type: string;
  title?: string;
  spread_name?: string;
  cards: any[];
  interpretation: string;
  questions?: {
    personalInfo?: any;
    userQuestions?: any;
  };
  status: string;
  created_at: string;
  cost_credits?: number;
  admin_notes?: string;
}

class PDFGeneratorService {
  async generateReadingPDF(readingData: ReadingData): Promise<Buffer> {
    try {
      // Puppeteer import'u
      const puppeteer = await import('puppeteer');

      // Browser başlat
      const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // ReadingDetailModal tarzında HTML oluştur
      const htmlContent = this.generateModalStyleHTML(readingData);

      // HTML'i sayfaya yükle
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // PDF oluştur - Tek sayfa, kart fotoğrafları ile
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm',
        },
        displayHeaderFooter: false,
        preferCSSPageSize: false,
        width: '210mm',
        height: '297mm',
      });

      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error('PDF oluşturulamadı');
    }
  }

  private generateModalStyleHTML(readingData: ReadingData): string {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const getReadingIcon = (type: string) => {
      if (type.includes('LOVE')) return '❤️';
      if (type.includes('GENERAL') || type.includes('THREE_CARD')) return '⭐';
      if (type.includes('CAREER')) return '📅';
      if (type.includes('NUMEROLOGY')) return '#️⃣';
      return '⭐';
    };

    const getStatusInfo = (status: string) => {
      switch (status) {
        case 'completed':
          return { text: 'Tamamlandı', icon: '✅' };
        case 'reviewed':
          return { text: 'İncelendi', icon: '👁️' };
        case 'pending':
          return { text: 'Beklemede', icon: '⏳' };
        default:
          return { text: status, icon: '❓' };
      }
    };

    // Card image URL generation moved to private method

    const statusInfo = getStatusInfo(readingData.status);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: #1a1a2e;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 10px;
            max-width: 100%;
            margin: 0 auto;
            min-height: auto;
            line-height: 1.4;
            font-size: 12px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3));
            border-radius: 0.75rem;
            border: 1px solid rgba(139, 92, 246, 0.3);
          }
          
          .header h1 {
            font-size: 1.25rem;
            background: linear-gradient(135deg, #fbbf24, #eab308);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.25rem;
          }
          
          .header p {
            color: #8b5cf6;
            font-size: 0.875rem;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            margin-bottom: 1rem;
          }
          
          .info-card {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 0.5rem;
            padding: 0.75rem;
            text-align: center;
          }
          
          .info-card h3 {
            color: #8b5cf6;
            font-size: 0.75rem;
            margin-bottom: 0.25rem;
          }
          
          .info-card p {
            color: white;
            font-weight: bold;
            font-size: 0.75rem;
          }
          
          .questions-section {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1));
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .questions-section h2 {
            color: #fbbf24;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            text-align: center;
          }
          
          .question-item {
            border-bottom: 1px solid rgba(139, 92, 246, 0.2);
            padding-bottom: 0.75rem;
            margin-bottom: 0.75rem;
          }
          
          .question-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .question-item h4 {
            color: #fbbf24;
            font-size: 0.75rem;
            margin-bottom: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .question-item p {
            color: #8b5cf6;
            font-size: 0.75rem;
            line-height: 1.4;
            padding-left: 1rem;
          }
          
          .interpretation {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2));
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .interpretation h2 {
            color: #fbbf24;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            text-align: center;
          }
          
          .cards-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          
          .card-item {
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.6), rgba(88, 28, 135, 0.6));
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 0.75rem;
            padding: 0.75rem;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            position: relative;
          }
          
          .card-image {
            width: 60px;
            height: 90px;
            background: #374151;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.625rem;
            text-align: center;
            flex-shrink: 0;
            border: 2px solid #8b5cf6;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          
          .card-content h4 {
            color: white;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
            font-weight: bold;
          }
          
          .card-content .card-name {
            color: #fbbf24;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          
          .card-content .meaning {
            color: white;
            font-size: 0.75rem;
            line-height: 1.4;
          }
          
          .position-number {
            position: absolute;
            top: -6px;
            left: -6px;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #fbbf24, #eab308);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.625rem;
            font-weight: bold;
            color: #1a1a2e;
            border: 2px solid #1a1a2e;
          }
          
          .reversed-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            font-size: 0.5rem;
            padding: 1px 4px;
            border-radius: 0.25rem;
            font-weight: 600;
          }
          
          .footer {
            text-align: center;
            padding: 0.75rem;
            color: #8b5cf6;
            font-size: 0.75rem;
            border-top: 1px solid rgba(139, 92, 246, 0.2);
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${getReadingIcon(readingData.reading_type)} ${readingData.title || 'Mistik Okuma'}</h1>
          <p>${readingData.spread_name || 'Genel Yayılım'}</p>
        </div>
        
        <div class="info-grid">
          <div class="info-card">
            <h3>📅 Okuma Tarihi</h3>
            <p>${formatDate(readingData.created_at)}</p>
          </div>
          <div class="info-card">
            <h3>⭐ Kredi Maliyeti</h3>
            <p>${readingData.cost_credits || 50} kredi</p>
          </div>
          <div class="info-card">
            <h3>👁️ Durum</h3>
            <p>${statusInfo.icon} ${statusInfo.text}</p>
          </div>
        </div>
        
        ${this.generateQuestionsHTML(readingData)}
        
        <div class="interpretation">
          <h2>🔮 Mistik Yorumlama</h2>
          <div class="cards-grid">
            ${this.generateCardsHTML(readingData)}
          </div>
        </div>
        
        <div class="footer">
          <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
          <p>Bu PDF otomatik olarak oluşturulmuştur. - ${new Date().toLocaleString('tr-TR')}</p>
        </div>
      </body>
      </html>
    `;
  }

  private generateQuestionsHTML(readingData: ReadingData): string {
    if (!readingData.questions?.userQuestions) {
      return '';
    }

    const questions = Object.entries(readingData.questions.userQuestions)
      .filter(([_, qa]: [string, any]) => qa.question && qa.answer)
      .map(
        ([_, qa]: [string, any]) => `
        <div class="question-item">
          <h4>✨ ${qa.question}</h4>
          <p>${qa.answer}</p>
        </div>
      `
      )
      .join('');

    if (!questions) return '';

    return `
      <div class="questions-section">
        <h2>💬 Sorular ve Cevaplar</h2>
        ${questions}
      </div>
    `;
  }

  private generateCardsHTML(readingData: ReadingData): string {
    const cardsData = Array.isArray(readingData.cards) ? readingData.cards : [];
    const positionTitles = [
      'İlgi Duyduğun Kişi',
      'Fiziksel/Cinsel Bağlantı',
      'Duygusal/Ruhsal Bağlantı',
      'Uzun Vadeli Sonuç',
    ];

    return cardsData
      .map((card: any, index: number) => {
        const positionTitle = positionTitles[index] || `Pozisyon ${index + 1}`;
        const cardImageUrl = this.getCardImageUrl(card.id, card.isReversed);

        // Yorum metnini bul
        const interpretation = readingData.interpretation || '';
        const lines = interpretation.split('\n');
        const cardSection = lines.find(
          line =>
            line.includes(`${index + 1}.`) &&
            line.includes(card.nameTr || card.name)
        );

        let meaning = '';
        if (cardSection) {
          const sectionIndex = lines.findIndex(line => line === cardSection);
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
          meaning = meaningLines.join(' ').trim();
        }

        return `
        <div class="card-item">
            <div class="position-number">${index + 1}</div>
          <div class="card-image" style="background-image: url('${cardImageUrl}')">
            ${card.isReversed ? '<div class="reversed-badge">Ters</div>' : ''}
            </div>
            <div class="card-content">
              <h4>${positionTitle}</h4>
            <div class="card-name">🃏 ${card.nameTr || card.name} ${card.isReversed ? '(Ters)' : '(Düz)'}</div>
            <div class="meaning">${meaning || 'Yorum bulunamadı.'}</div>
          </div>
          </div>
        `;
      })
      .join('');
  }

  private getCardImageUrl(cardId: number, _isReversed: boolean): string {
    // Kart fotoğrafı URL'si oluştur
    const cardNumber = cardId.toString().padStart(2, '0');
    const baseUrl =
      'https://qtlokdkcerjrbrtphlrh.supabase.co/storage/v1/object/public/cards/rws';
    return `${baseUrl}/${cardNumber}.jpg`;
  }

  async generateNumerologyPDF(userData: any): Promise<Buffer> {
    try {
      // Puppeteer import'u
      const puppeteer = await import('puppeteer');

      // Browser başlat
      const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Numeroloji hesaplamaları yap
      const numerologyData = this.calculateNumerologyData(userData);

      // Numeroloji HTML oluştur
      const htmlContent = this.generateNumerologyHTML(numerologyData, userData);

      // HTML'i sayfaya yükle
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // PDF oluştur
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm',
        },
        displayHeaderFooter: false,
        preferCSSPageSize: false,
        width: '210mm',
        height: '297mm',
      });

      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error('Numerology PDF generation failed:', error);
      throw new Error('Numeroloji PDF oluşturulamadı');
    }
  }

  private calculateNumerologyData(userData: any) {
    const fullName = `${userData.name || ''} ${userData.surname || ''}`.trim();
    const birthDate = userData.birthDate || userData.birth_date || '';

    return {
      lifePath: calculateLifePath(birthDate, 'tr'),
      expression: calculateExpressionDestiny(fullName, 'tr'),
      soulUrge: calculateSoulUrge(fullName, 'tr'),
      personality: calculatePersonality(fullName, 'tr'),
      birthday: calculateBirthdayNumber(birthDate, 'tr'),
      maturity: calculateMaturity(
        calculateLifePath(birthDate, 'tr').number,
        calculateExpressionDestiny(fullName, 'tr').number,
        'tr'
      ),
      pinnacles: calculatePinnaclesChallenges(birthDate, 'tr'),
      personalCycles: calculatePersonalCycles(birthDate, 'tr'),
    };
  }

  private generateNumerologyHTML(numerologyData: any, userData: any): string {
    const fullName = `${userData.name || ''} ${userData.surname || ''}`.trim();
    const birthDate = userData.birthDate || userData.birth_date || '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: #1a1a2e;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 10px;
            max-width: 100%;
            margin: 0 auto;
            min-height: auto;
            line-height: 1.4;
            font-size: 11px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3));
            border-radius: 0.75rem;
            border: 1px solid rgba(139, 92, 246, 0.3);
          }
          
          .header h1 {
            font-size: 1.25rem;
            background: linear-gradient(135deg, #fbbf24, #eab308);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.25rem;
          }
          
          .header p {
            color: #8b5cf6;
            font-size: 0.875rem;
          }
          
          .user-info {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
            text-align: center;
          }
          
          .user-info h3 {
            color: #8b5cf6;
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .user-info p {
            color: white;
            font-size: 0.875rem;
            margin: 0.25rem 0;
          }
          
          .numbers-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .number-card {
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.6), rgba(88, 28, 135, 0.6));
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 0.75rem;
            padding: 0.75rem;
            text-align: center;
            position: relative;
          }
          
          .number-card.life-path {
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
            border-color: rgba(168, 85, 247, 0.2);
          }
          
          .number-card.expression {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1));
            border-color: rgba(59, 130, 246, 0.2);
          }
          
          .number-card.soul-urge {
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.1));
            border-color: rgba(236, 72, 153, 0.2);
          }
          
          .number-card.personality {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
            border-color: rgba(34, 197, 94, 0.2);
          }
          
          .number-card.birthday {
            background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1));
            border-color: rgba(249, 115, 22, 0.2);
          }
          
          .number-card.maturity {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            border-color: rgba(99, 102, 241, 0.2);
          }
          
          .number-icon {
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #8b5cf6, #a855f7);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            font-size: 0.875rem;
          }
          
          .number-card h4 {
            color: #fbbf24;
            font-size: 0.75rem;
            margin-bottom: 0.25rem;
            font-weight: bold;
          }
          
          .number-value {
            font-size: 2rem;
            font-weight: bold;
            color: white;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .master-badge {
            display: inline-block;
            background: rgba(251, 191, 36, 0.2);
            color: #fbbf24;
            font-size: 0.625rem;
            padding: 2px 6px;
            border-radius: 0.25rem;
            border: 1px solid rgba(251, 191, 36, 0.3);
            margin-bottom: 0.5rem;
          }
          
          .number-description {
            color: #8b5cf6;
            font-size: 0.625rem;
            line-height: 1.3;
            text-align: center;
          }
          
          .master-number {
            background: linear-gradient(135deg, #fbbf24, #eab308);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
          }
          
          .cycles-section {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(234, 179, 8, 0.1));
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .cycles-section h3 {
            color: #fbbf24;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            text-align: center;
          }
          
          .cycles-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
          
          .cycle-item {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 0.5rem;
            padding: 0.75rem;
            text-align: center;
          }
          
          .cycle-value {
            font-size: 1.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #fbbf24, #eab308);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.25rem;
          }
          
          .cycle-label {
            color: #8b5cf6;
            font-size: 0.625rem;
            font-weight: 600;
          }
          
          .pinnacles-section {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .pinnacles-section h3 {
            color: #10b981;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            text-align: center;
          }
          
          .pinnacle-item {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 0.5rem;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .pinnacle-period {
            color: #8b5cf6;
            font-size: 0.625rem;
            font-weight: 600;
          }
          
          .pinnacle-number {
            font-size: 1.25rem;
            font-weight: bold;
            background: linear-gradient(135deg, #10b981, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .footer {
            text-align: center;
            padding: 0.75rem;
            color: #8b5cf6;
            font-size: 0.75rem;
            border-top: 1px solid rgba(139, 92, 246, 0.2);
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>#️⃣ Numeroloji Analizi</h1>
          <p>Mistik Sayılar ve Yaşam Yolu</p>
        </div>
        
        <div class="user-info">
          <h3>👤 Kullanıcı Bilgileri</h3>
          <p><strong>Ad Soyad:</strong> ${fullName || 'Belirtilmemiş'}</p>
          <p><strong>Doğum Tarihi:</strong> ${birthDate ? new Date(birthDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</p>
        </div>
        
        <div class="numbers-grid">
          <div class="number-card life-path">
            <div class="number-icon">#</div>
            <h4>Yaşam Yolu</h4>
            <div class="number-value ${numerologyData.lifePath.isMasterNumber ? 'master-number' : ''}">
              ${numerologyData.lifePath.number}
            </div>
            ${numerologyData.lifePath.isMasterNumber ? '<div class="master-badge">✨ Master Sayı</div>' : ''}
            <div class="number-description">${numerologyData.lifePath.description}</div>
          </div>
          
          <div class="number-card expression">
            <div class="number-icon">✨</div>
            <h4>İfade/Kader</h4>
            <div class="number-value ${numerologyData.expression.isMasterNumber ? 'master-number' : ''}">
              ${numerologyData.expression.number}
            </div>
            ${numerologyData.expression.isMasterNumber ? '<div class="master-badge">✨ Master Sayı</div>' : ''}
            <div class="number-description">${numerologyData.expression.description}</div>
          </div>
          
          <div class="number-card soul-urge">
            <div class="number-icon">💫</div>
            <h4>Ruh Arzusu</h4>
            <div class="number-value ${numerologyData.soulUrge.isMasterNumber ? 'master-number' : ''}">
              ${numerologyData.soulUrge.number}
            </div>
            ${numerologyData.soulUrge.isMasterNumber ? '<div class="master-badge">✨ Master Sayı</div>' : ''}
            <div class="number-description">${numerologyData.soulUrge.description}</div>
          </div>
          
          <div class="number-card personality">
            <div class="number-icon">👁️</div>
            <h4>Kişilik</h4>
            <div class="number-value ${numerologyData.personality.isMasterNumber ? 'master-number' : ''}">
              ${numerologyData.personality.number}
            </div>
            ${numerologyData.personality.isMasterNumber ? '<div class="master-badge">✨ Master Sayı</div>' : ''}
            <div class="number-description">${numerologyData.personality.description}</div>
          </div>
          
          <div class="number-card birthday">
            <div class="number-icon">🎂</div>
            <h4>Doğum Günü</h4>
            <div class="number-value">
              ${numerologyData.birthday.number}
            </div>
            <div class="number-description">${numerologyData.birthday.description}</div>
          </div>
          
          <div class="number-card maturity">
            <div class="number-icon">👑</div>
            <h4>Olgunluk</h4>
            <div class="number-value ${numerologyData.maturity.isMasterNumber ? 'master-number' : ''}">
              ${numerologyData.maturity.number}
            </div>
            ${numerologyData.maturity.isMasterNumber ? '<div class="master-badge">✨ Master Sayı</div>' : ''}
            <div class="number-description">${numerologyData.maturity.description}</div>
          </div>
        </div>
        
        <div class="cycles-section">
          <h3>🕐 Kişisel Döngüler</h3>
          <div class="cycles-grid">
            <div class="cycle-item">
              <div class="cycle-value">${numerologyData.personalCycles.personalYear}</div>
              <div class="cycle-label">Kişisel Yıl</div>
            </div>
            <div class="cycle-item">
              <div class="cycle-value">${numerologyData.personalCycles.personalMonth}</div>
              <div class="cycle-label">Kişisel Ay</div>
            </div>
            <div class="cycle-item">
              <div class="cycle-value">${numerologyData.personalCycles.personalDay}</div>
              <div class="cycle-label">Kişisel Gün</div>
            </div>
          </div>
          <p style="color: #8b5cf6; font-size: 0.625rem; text-align: center; margin-top: 0.5rem;">
            ${numerologyData.personalCycles.description}
          </p>
        </div>
        
        ${
          numerologyData.pinnacles.pinnacles
            ? `
        <div class="pinnacles-section">
          <h3>💎 Yaşam Zirveleri</h3>
          ${numerologyData.pinnacles.pinnacles
            .map(
              (pinnacle: any, _index: number) => `
            <div class="pinnacle-item">
              <span class="pinnacle-period">${pinnacle.period}</span>
              <span class="pinnacle-number">${pinnacle.number}</span>
            </div>
          `
            )
            .join('')}
        </div>
        `
            : ''
        }
        
        <div class="footer">
          <p>Busbuskimki Tarot - Mistik Rehberlik Sistemi</p>
          <p>Bu numeroloji analizi otomatik olarak oluşturulmuştur. - ${new Date().toLocaleString('tr-TR')}</p>
        </div>
      </body>
      </html>
    `;
  }
}

export const pdfGeneratorService = new PDFGeneratorService();
export default PDFGeneratorService;
