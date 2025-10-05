/**
 * Link Test Script - Tüm route'ları test eder
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';


// Test edilecek linkler
const testLinks = {
  // Ana sayfalar
  homepages: [
    '/tr',
    '/en',
    '/sr',
  ],

  // SEO-friendly URL'ler
  seoFriendly: [
    '/tr/anasayfa',
    '/en/home',
    '/sr/pocetna',
    '/tr/tarot-okuma',
    '/en/tarot-reading',
    '/sr/tarot-citanje',
    '/tr/numeroloji',
    '/en/numerology',
    '/sr/numerologija',
    '/tr/panel',
    '/en/dashboard',
    '/sr/panel',
    '/tr/giris',
    '/en/login',
    '/sr/prijava',
  ],

  // Tarot kart sayfaları (örnek - tümünü test etmek için)
  tarotCards: {
    tr: [
      '/tr/kartlar/joker',
      '/tr/kartlar/buyucu',
      '/tr/kartlar/yuksek-rahibe',
      '/tr/kartlar/kupalar-asi',
      '/tr/kartlar/kiliclar-krali',
    ],
    en: [
      '/en/cards/the-fool',
      '/en/cards/the-magician',
      '/en/cards/the-high-priestess',
      '/en/cards/ace-of-cups',
      '/en/cards/king-of-swords',
    ],
    sr: [
      '/sr/kartice/joker',
      '/sr/kartice/carobnjak',
      '/sr/kartice/visoka-svestenica',
      '/sr/kartice/kupa-as',
      '/sr/kartice/mace-kralj',
    ],
  },

  // Legal sayfalar
  legal: [
    '/tr/legal/about',
    '/en/legal/about',
    '/sr/legal/about',
    '/tr/legal/contact',
    '/tr/legal/privacy-policy',
  ],

  // Dashboard & Auth
  userPages: [
    '/tr/auth',
    '/en/auth',
    '/tr/dashboard',
  ],

  // Sitemap & robots
  seo: [
    '/sitemap.xml',
    '/robots.txt',
  ],
};

// HTTP GET request helper
function testLink(url) {
  return new Promise((resolve) => {
    const fullUrl = BASE_URL + url;
    http.get(fullUrl, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode === 200 || res.statusCode === 308 || res.statusCode === 307,
        redirect: res.statusCode === 308 || res.statusCode === 307,
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: err.message,
      });
    });
  });
}

// Test sonuçlarını yazdır
async function runTests() {
  console.log('🔗 Link Test Başlatılıyor...\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  const results = {
    total: 0,
    success: 0,
    failed: 0,
    redirect: 0,
    errors: [],
  };

  // Ana sayfalar
  console.log('📌 Ana Sayfalar:');
  for (const url of testLinks.homepages) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      if (result.redirect) {
        results.redirect++;
        console.log(`  ↪️  ${url} → ${result.status} (Redirect)`);
      } else {
        results.success++;
        console.log(`  ✅ ${url} → ${result.status}`);
      }
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status} ${result.error || ''}`);
    }
  }

  // SEO-friendly URL'ler
  console.log('\n📌 SEO-Friendly URL\'ler:');
  for (const url of testLinks.seoFriendly) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      if (result.redirect) {
        results.redirect++;
        console.log(`  ↪️  ${url} → ${result.status} (Redirect)`);
      } else {
        results.success++;
        console.log(`  ✅ ${url} → ${result.status}`);
      }
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // Tarot kartları (TR)
  console.log('\n📌 Tarot Kartları (Türkçe):');
  for (const url of testLinks.tarotCards.tr) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      results.success++;
      console.log(`  ✅ ${url} → ${result.status}`);
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // Tarot kartları (EN)
  console.log('\n📌 Tarot Kartları (English):');
  for (const url of testLinks.tarotCards.en) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      results.success++;
      console.log(`  ✅ ${url} → ${result.status}`);
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // Tarot kartları (SR)
  console.log('\n📌 Tarot Kartları (Srpski):');
  for (const url of testLinks.tarotCards.sr) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      results.success++;
      console.log(`  ✅ ${url} → ${result.status}`);
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // Legal sayfalar
  console.log('\n📌 Legal Sayfalar:');
  for (const url of testLinks.legal) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      results.success++;
      console.log(`  ✅ ${url} → ${result.status}`);
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // User pages
  console.log('\n📌 User Pages (Auth & Dashboard):');
  for (const url of testLinks.userPages) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      if (result.redirect) {
        results.redirect++;
        console.log(`  ↪️  ${url} → ${result.status} (Redirect)`);
      } else {
        results.success++;
        console.log(`  ✅ ${url} → ${result.status}`);
      }
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // SEO pages
  console.log('\n📌 SEO Pages (Sitemap & Robots):');
  for (const url of testLinks.seo) {
    const result = await testLink(url);
    results.total++;
    if (result.success) {
      results.success++;
      console.log(`  ✅ ${url} → ${result.status}`);
    } else {
      results.failed++;
      results.errors.push(result);
      console.log(`  ❌ ${url} → ${result.status}`);
    }
  }

  // Özet
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SONUÇLARI');
  console.log('='.repeat(50));
  console.log(`Toplam Test: ${results.total}`);
  console.log(`✅ Başarılı: ${results.success}`);
  console.log(`↪️  Redirect: ${results.redirect}`);
  console.log(`❌ Başarısız: ${results.failed}`);
  console.log(`Başarı Oranı: ${((results.success + results.redirect) / results.total * 100).toFixed(2)}%`);

  if (results.errors.length > 0) {
    console.log('\n❌ HATALI LİNKLER:');
    results.errors.forEach(err => {
      console.log(`  - ${err.url} (${err.status}) ${err.error || ''}`);
    });
  }

  console.log('\n✨ Test tamamlandı!\n');

  // Exit code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Test'i çalıştır
runTests().catch(console.error);
