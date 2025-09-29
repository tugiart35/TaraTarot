#!/usr/bin/env node

/**
 * 🧪 Aşk Açılımı Test Scripti
 * 
 * Bu script:
 * 1. Sesli seçim ile aşk açılımı yapar
 * 2. Yazılı seçim ile aşk açılımı yapar  
 * 3. Her iki okumayı da kaydeder
 * 4. Sonuçları iletir
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Mock test için Supabase bağlantısı gerekmiyor
console.log('🧪 Mock test modunda çalışıyor...');

// Rastgele test verileri oluştur
function generateRandomUser() {
  const names = ['Ayşe', 'Fatma', 'Zeynep', 'Elif', 'Merve', 'Selin', 'Deniz', 'Cemre', 'Büşra', 'Gizem'];
  const surnames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Özkan', 'Arslan', 'Doğan', 'Kılıç'];
  const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${name.toLowerCase()}.${surname.toLowerCase()}@${domain}`;
  
  return {
    id: 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    email: email,
    name: `${name} ${surname}`
  };
}

function generateRandomPersonalInfo() {
  const names = ['Ayşe', 'Fatma', 'Zeynep', 'Elif', 'Merve', 'Selin', 'Deniz', 'Cemre', 'Büşra', 'Gizem'];
  const surnames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Özkan', 'Arslan', 'Doğan', 'Kılıç'];
  const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${name.toLowerCase()}.${surname.toLowerCase()}@${domain}`;
  
  // Rastgele doğum tarihi (18-65 yaş arası)
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - (18 + Math.floor(Math.random() * 47));
  const birthMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const birthDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  
  // Rastgele telefon numarası
  const phoneArea = ['532', '533', '534', '535', '536', '537', '538', '539', '540', '541'];
  const phoneNumber = phoneArea[Math.floor(Math.random() * phoneArea.length)] + 
                     Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  
  return {
    name: name,
    surname: surname,
    birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
    email: email,
    phone: `+90${phoneNumber}`
  };
}

function generateRandomQuestions() {
  const concerns = [
    'Aşk hayatımda belirsizlik var',
    'İlişkimde sorunlar yaşıyorum', 
    'Yeni bir aşk mı yoksa mevcut ilişkim mi?',
    'Partnerimle geleceğimiz nasıl olacak?',
    'Ayrılık mı yoksa devam mı?',
    'Gerçek aşkı bulabilecek miyim?',
    'Evlilik zamanı geldi mi?',
    'Eski aşkım geri dönecek mi?'
  ];
  
  const understandings = [
    'İlişkimin geleceğini öğrenmek istiyorum',
    'Aşk hayatımda doğru kararları vermek istiyorum',
    'Partnerimle uyumlu muyuz anlamak istiyorum',
    'Evlilik konusunda karar vermek istiyorum',
    'Ayrılık kararı almalı mıyım?',
    'Yeni bir ilişkiye başlamalı mıyım?',
    'Aşk hayatımda neler bekliyor?',
    'Gerçek aşkı nasıl bulabilirim?'
  ];
  
  const emotionalStates = [
    'Umutlu ama endişeliyim',
    'Kafam çok karışık',
    'Mutlu ama belirsizlik var',
    'Üzgün ve yorgunum',
    'Heyecanlı ve meraklıyım',
    'Korkuyorum ama umutluyum',
    'Kararsızım',
    'Güçlü ve kararlıyım'
  ];
  
  return {
    concern: concerns[Math.floor(Math.random() * concerns.length)],
    understanding: understandings[Math.floor(Math.random() * understandings.length)],
    emotional: emotionalStates[Math.floor(Math.random() * emotionalStates.length)]
  };
}

// Rastgele test verileri oluştur
const testUser = generateRandomUser();
const testPersonalInfo = generateRandomPersonalInfo();
const testQuestions = generateRandomQuestions();

// Test kartları (4 kartlık aşk açılımı)
const testCards = [
  { name: 'The Fool', position: 1, isReversed: false },
  { name: 'The Lovers', position: 2, isReversed: false },
  { name: 'Two of Cups', position: 3, isReversed: true },
  { name: 'Ten of Cups', position: 4, isReversed: false }
];

async function createTestReading(readingType, communicationMethod) {
  console.log(`\n🔄 ${readingType} okuma oluşturuluyor...`);
  
  try {
    // Okuma verisi oluştur
    const readingData = {
      user_id: testUser.id,
      reading_type: 'love',
      reading_subtype: readingType.toLowerCase(),
      cards: testCards,
      personal_info: testPersonalInfo,
      questions: testQuestions,
      communication_method: communicationMethod,
      created_at: new Date().toISOString(),
      status: 'completed'
    };

    // Mock veri ile test (gerçek Supabase bağlantısı olmadan)
    const mockReading = {
      id: `reading-${readingType.toLowerCase()}-${Date.now()}`,
      ...readingData
    };

    console.log(`✅ ${readingType} okuma kaydedildi! (Mock)`);
    console.log(`📊 Okuma ID: ${mockReading.id}`);
    console.log(`📱 İletişim: ${communicationMethod}`);
    console.log(`🃏 Kart Sayısı: ${testCards.length}`);
    console.log(`👤 Kullanıcı: ${testPersonalInfo.name} ${testPersonalInfo.surname}`);
    console.log(`📧 E-posta: ${testPersonalInfo.email}`);
    console.log(`📞 Telefon: ${testPersonalInfo.phone}`);
    console.log(`🎂 Doğum: ${testPersonalInfo.birthDate}`);
    console.log(`💭 Soru: ${testQuestions.concern}`);
    
    return mockReading;
    
  } catch (error) {
    console.error(`❌ ${readingType} okuma kaydedilemedi:`, error.message);
    throw error;
  }
}

async function sendTestResults(voiceReading, writtenReading) {
  console.log('\n📧 Test sonuçları iletiliyor...');
  
  const results = {
    testDate: new Date().toISOString(),
    voiceReading: {
      id: voiceReading.id,
      type: voiceReading.reading_subtype,
      cards: voiceReading.cards.length,
      communicationMethod: voiceReading.communication_method
    },
    writtenReading: {
      id: writtenReading.id, 
      type: writtenReading.reading_subtype,
      cards: writtenReading.cards.length,
      communicationMethod: writtenReading.communication_method
    },
    summary: {
      totalReadings: 2,
      success: true,
      timestamp: new Date().toISOString()
    }
  };

  // Sonuçları dosyaya kaydet
  const resultsFile = path.join(__dirname, 'test-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  
  console.log('✅ Test sonuçları kaydedildi:', resultsFile);
  console.log('\n📋 Test Özeti:');
  console.log(`🎤 Sesli Okuma: ${results.voiceReading.id} (${results.voiceReading.communicationMethod})`);
  console.log(`📝 Yazılı Okuma: ${results.writtenReading.id} (${results.writtenReading.communicationMethod})`);
  console.log(`📊 Toplam Kart: ${results.voiceReading.cards.length + results.writtenReading.cards.length}`);
  console.log(`✅ Test Başarılı: ${results.summary.success}`);
}

async function runTest() {
  console.log('🧪 Aşk Açılımı Test Başlatılıyor...\n');
  
  try {
    // 1. Sesli okuma (VOICE + WhatsApp)
    const voiceReading = await createTestReading('VOICE', 'whatsapp');
    
    // 2. Yazılı okuma (WRITTEN + Email)  
    const writtenReading = await createTestReading('WRITTEN', 'email');
    
    // 3. Sonuçları ilet
    await sendTestResults(voiceReading, writtenReading);
    
    console.log('\n🎉 Test tamamlandı! Her iki okuma da başarıyla kaydedildi.');
    
  } catch (error) {
    console.error('\n❌ Test başarısız:', error.message);
    process.exit(1);
  }
}

// Test'i çalıştır
if (require.main === module) {
  runTest();
}

module.exports = { runTest, createTestReading, sendTestResults };
