/**
 * Test All 78 Tarot Cards - SEO Link Test
 * Tüm 78 tarot kartının SEO-friendly linklerini test eder
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test edilecek tüm kartlar
const allCards = {
  // Major Arcana (22 kart)
  tr: [
    'joker', 'buyucu', 'yuksek-rahibe', 'imparatorice', 'imparator', 'basrahip',
    'asiklar', 'savas-arabasi', 'guc', 'ermis', 'kader-carki', 'adalet', 'asili-adam', 'olum', 'olcululuk',
    'seytan', 'kule', 'yildiz', 'ay', 'gunes', 'yargi', 'dunya'
  ],
  en: [
    'the-fool', 'the-magician', 'the-high-priestess', 'the-empress', 'the-emperor', 'the-hierophant',
    'the-lovers', 'the-chariot', 'strength', 'the-hermit', 'wheel-of-fortune', 'justice',
    'the-hanged-man', 'death', 'temperance', 'the-devil', 'the-tower', 'the-star',
    'the-moon', 'the-sun', 'judgement', 'the-world'
  ],
  sr: [
    'joker', 'carobnjak', 'visoka-svestenica', 'carica', 'car', 'visoki-svestenik',
    'ljubavnici', 'kola', 'snaga', 'pustinjak', 'kolo-srece', 'pravda',
    'obeseni-covek', 'smrt', 'umerenost', 'davo', 'kula', 'zvezda',
    'mesec', 'sunce', 'sud', 'svet'
  ]
};

// Minor Arcana kartları (56 kart)
const minorArcanaCards = {
  tr: {
    // Cups (Kupalar) - 14 kart
    cups: ['kupalar-asi', 'kupalar-2', 'kupalar-3', 'kupalar-4', 'kupalar-5', 'kupalar-6', 'kupalar-7', 'kupalar-8', 'kupalar-9', 'kupalar-10', 'kupalar-ucak', 'kupalar-kiz', 'kupalar-sovalye', 'kupalar-krali'],
    // Swords (Kılıçlar) - 14 kart
    swords: ['kiliclar-asi', 'kiliclar-2', 'kiliclar-3', 'kiliclar-4', 'kiliclar-5', 'kiliclar-6', 'kiliclar-7', 'kiliclar-8', 'kiliclar-9', 'kiliclar-10', 'kiliclar-ucak', 'kiliclar-kiz', 'kiliclar-sovalye', 'kiliclar-krali'],
    // Wands (Asalar) - 14 kart
    wands: ['asalar-asi', 'asalar-2', 'asalar-3', 'asalar-4', 'asalar-5', 'asalar-6', 'asalar-7', 'asalar-8', 'asalar-9', 'asalar-10', 'asalar-ucak', 'asalar-kiz', 'asalar-sovalye', 'asalar-krali'],
    // Pentacles (Yıldızlar) - 14 kart
    pentacles: ['yildizlar-asi', 'yildizlar-2', 'yildizlar-3', 'yildizlar-4', 'yildizlar-5', 'yildizlar-6', 'yildizlar-7', 'yildizlar-8', 'yildizlar-9', 'yildizlar-10', 'yildizlar-ucak', 'yildizlar-kiz', 'yildizlar-sovalye', 'yildizlar-krali']
  },
  en: {
    // Cups - 14 kart
    cups: ['ace-of-cups', '2-of-cups', '3-of-cups', '4-of-cups', '5-of-cups', '6-of-cups', '7-of-cups', '8-of-cups', '9-of-cups', '10-of-cups', 'page-of-cups', 'knight-of-cups', 'queen-of-cups', 'king-of-cups'],
    // Swords - 14 kart
    swords: ['ace-of-swords', '2-of-swords', '3-of-swords', '4-of-swords', '5-of-swords', '6-of-swords', '7-of-swords', '8-of-swords', '9-of-swords', '10-of-swords', 'page-of-swords', 'knight-of-swords', 'queen-of-swords', 'king-of-swords'],
    // Wands - 14 kart
    wands: ['ace-of-wands', '2-of-wands', '3-of-wands', '4-of-wands', '5-of-wands', '6-of-wands', '7-of-wands', '8-of-wands', '9-of-wands', '10-of-wands', 'page-of-wands', 'knight-of-wands', 'queen-of-wands', 'king-of-wands'],
    // Pentacles - 14 kart
    pentacles: ['ace-of-pentacles', '2-of-pentacles', '3-of-pentacles', '4-of-pentacles', '5-of-pentacles', '6-of-pentacles', '7-of-pentacles', '8-of-pentacles', '9-of-pentacles', '10-of-pentacles', 'page-of-pentacles', 'knight-of-pentacles', 'queen-of-pentacles', 'king-of-pentacles']
  },
  sr: {
    // Cups (Kupa) - 14 kart
    cups: ['kupa-as', 'kupa-2', 'kupa-3', 'kupa-4', 'kupa-5', 'kupa-6', 'kupa-7', 'kupa-8', 'kupa-9', 'kupa-10', 'kupa-ucak', 'kupa-kraljica', 'kupa-vitez', 'kupa-kralj'],
    // Swords (Mač) - 14 kart
    swords: ['mace-as', 'mace-2', 'mace-3', 'mace-4', 'mace-5', 'mace-6', 'mace-7', 'mace-8', 'mace-9', 'mace-10', 'mace-ucak', 'mace-kraljica', 'mace-vitez', 'mace-kralj'],
    // Wands (Štap) - 14 kart
    wands: ['stap-as', 'stap-2', 'stap-3', 'stap-4', 'stap-5', 'stap-6', 'stap-7', 'stap-8', 'stap-9', 'stap-10', 'stap-ucak', 'stap-kraljica', 'stap-vitez', 'stap-kralj'],
    // Pentacles (Novčić) - 14 kart
    pentacles: ['novcic-as', 'novcic-2', 'novcic-3', 'novcic-4', 'novcic-5', 'novcic-6', 'novcic-7', 'novcic-8', 'novcic-9', 'novcic-10', 'novcic-ucak', 'novcic-kraljica', 'novcic-vitez', 'novcic-kralj']
  }
};

// Test fonksiyonu
function testUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode === 200
      });
    });
    
    req.on('error', () => {
      resolve({
        url,
        status: 0,
        success: false
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        success: false
      });
    });
  });
}

// Ana test fonksiyonu
async function testAll78Cards() {
  console.log('🔮 Tüm 78 Tarot Kartı SEO Link Testi Başlatılıyor...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  let totalTests = 0;
  let successfulTests = 0;
  let failedTests = 0;
  const failedUrls = [];

  // Major Arcana testleri
  console.log('📌 Major Arcana Kartları (22 kart):');
  
  for (const locale of ['tr', 'en', 'sr']) {
    const routePrefix = locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
    console.log(`\n  ${locale.toUpperCase()} (${locale === 'tr' ? 'Türkçe' : locale === 'en' ? 'English' : 'Srpski'}):`);
    
    for (const card of allCards[locale]) {
      const url = `${BASE_URL}/${locale}/${routePrefix}/${card}`;
      totalTests++;
      
      const result = await testUrl(url);
      if (result.success) {
        console.log(`    ✅ /${locale}/${routePrefix}/${card} → 200`);
        successfulTests++;
      } else {
        console.log(`    ❌ /${locale}/${routePrefix}/${card} → ${result.status}`);
        failedTests++;
        failedUrls.push(result.url);
      }
    }
  }

  // Minor Arcana testleri
  console.log('\n📌 Minor Arcana Kartları (56 kart):');
  
  for (const locale of ['tr', 'en', 'sr']) {
    const routePrefix = locale === 'tr' ? 'kartlar' : locale === 'en' ? 'cards' : 'kartice';
    console.log(`\n  ${locale.toUpperCase()} (${locale === 'tr' ? 'Türkçe' : locale === 'en' ? 'English' : 'Srpski'}):`);
    
    const suits = Object.keys(minorArcanaCards[locale]);
    for (const suit of suits) {
      console.log(`    ${suit.toUpperCase()} Suit:`);
      
      for (const card of minorArcanaCards[locale][suit]) {
        const url = `${BASE_URL}/${locale}/${routePrefix}/${card}`;
        totalTests++;
        
        const result = await testUrl(url);
        if (result.success) {
          console.log(`      ✅ /${locale}/${routePrefix}/${card} → 200`);
          successfulTests++;
        } else {
          console.log(`      ❌ /${locale}/${routePrefix}/${card} → ${result.status}`);
          failedTests++;
          failedUrls.push(result.url);
        }
      }
    }
  }

  // Sonuçlar
  console.log('\n==================================================');
  console.log('📊 TEST SONUÇLARI');
  console.log('==================================================');
  console.log(`Toplam Test: ${totalTests}`);
  console.log(`✅ Başarılı: ${successfulTests}`);
  console.log(`❌ Başarısız: ${failedTests}`);
  console.log(`Başarı Oranı: ${((successfulTests / totalTests) * 100).toFixed(2)}%`);

  if (failedUrls.length > 0) {
    console.log('\n❌ HATALI LİNKLER:');
    failedUrls.forEach(url => {
      console.log(`  - ${url}`);
    });
  }

  console.log('\n✨ Test tamamlandı!');
}

// Testi başlat
testAll78Cards().catch(console.error);
