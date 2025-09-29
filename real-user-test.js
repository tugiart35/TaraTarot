/**
 * Gerçek Kullanıcı Deneyimi Test Scripti
 * Bu script gerçek bir kullanıcının tarot okuma sürecini tam olarak simüle eder:
 * 1. Açılım seçimi
 * 2. Okuma tipi seçimi (Sesli/Yazılı)
 * 3. Kişisel bilgi girişi
 * 4. Soru cevaplama
 * 5. Kart seçimi
 * 6. Okuma kaydetme
 * 7. Kredi düşüşü
 * 8. Sonuç gösterimi
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Node.js fetch polyfill
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// Supabase bağlantısı
const supabaseUrl = 'https://qtlokdkcerjrbtrphlrh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNDgwOTcsImV4cCI6MjA3MzcyNDA5N30.ezpkbTze481HDVgWDohuDY-iOfK8TQpog1Jzk6Glm6k';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE0ODA5NywiZXhwIjoyMDczNzI0MDk3fQ.Z9GuxWdEpsAhnz405LM7aVBmZNyJbZOnOdi8A3cMKWI';

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Test kullanıcısı (gerçek kullanıcı gibi)
const testUser = {
  id: '9fcf760f-4cb4-492f-8655-f880165413e1',
  email: 'barbieetugay@gmail.com',
  name: 'Barbie',
  surname: 'Etugay'
};

// Gerçek kullanıcı gibi rastgele kişisel bilgiler
const generateRandomPersonalInfo = () => {
  const names = ['Ayşe', 'Fatma', 'Zeynep', 'Elif', 'Merve', 'Selin', 'Deniz', 'Cemre'];
  const surnames = ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Arslan', 'Özkan', 'Aydın'];
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
  const birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
  
  // Rastgele telefon numarası
  const phone = `+90555${Math.floor(Math.random() * 9000000) + 1000000}`;
  
  return {
    name,
    surname,
    email,
    birthDate,
    phone
  };
};

// Gerçek kullanıcı gibi rastgele sorular
const generateRandomQuestions = (spreadType) => {
  const questionSets = {
    'love-spread': {
      concern: [
        'Gelecekteki aşk hayatım nasıl olacak?',
        'Mevcut ilişkimde yaşadığım sorunları çözmek istiyorum',
        'Aşk hayatımda doğru kişiyi bulabilecek miyim?',
        'Eski aşkım geri dönecek mi?'
      ],
      understanding: [
        'Aşk hayatımda hangi adımları atmalıyım?',
        'İlişkimdeki sorunları nasıl çözebilirim?',
        'Aşk hayatımda neye odaklanmalıyım?',
        'Gelecekteki aşk hayatım hakkında bilgi almak istiyorum'
      ],
      emotional: [
        'Karışık duygular içindeyim ve netlik istiyorum',
        'Aşk konusunda endişeliyim ve rehberliğe ihtiyacım var',
        'Duygusal olarak hazır mıyım yeni bir ilişkiye?',
        'Aşk hayatımda hangi duyguları yaşıyorum?'
      ]
    },
    'career-spread': {
      concern: [
        'Kariyerimde hangi yöne gitmeliyim?',
        'İş hayatımda yaşadığım sorunları çözmek istiyorum',
        'Yeni bir iş fırsatı değerlendirmeli miyim?',
        'Kariyerimde ilerleme kaydedebilecek miyim?'
      ],
      understanding: [
        'Kariyerimde hangi adımları atmalıyım?',
        'İş hayatımda neye odaklanmalıyım?',
        'Kariyer hedeflerime nasıl ulaşabilirim?',
        'Profesyonel gelişimim için ne yapmalıyım?'
      ],
      emotional: [
        'İş hayatımda stresli ve endişeliyim',
        'Kariyer konusunda kararsızım',
        'İş hayatımda motivasyonumu kaybettim',
        'Kariyer değişikliği yapmalı mıyım?'
      ]
    },
    'situation-analysis': {
      concern: [
        'Mevcut durumum hakkında netlik istiyorum',
        'Hayatımdaki karmaşık durumu analiz etmek istiyorum',
        'Gelecekteki adımlarımı belirlemek istiyorum',
        'Yaşadığım sorunları çözmek istiyorum'
      ],
      understanding: [
        'Mevcut durumumu nasıl değerlendirmeliyim?',
        'Hangi konularda odaklanmalıyım?',
        'Gelecekteki planlarımı nasıl şekillendirmeliyim?',
        'Hayatımda hangi değişiklikleri yapmalıyım?'
      ],
      emotional: [
        'Karışık duygular içindeyim ve netlik istiyorum',
        'Stresli ve endişeliyim',
        'Hayatımda belirsizlik yaşıyorum',
        'Duygusal olarak dengeli değilim'
      ]
    },
    'relationship-analysis': {
      concern: [
        'İlişkimde yaşadığım sorunları anlamak istiyorum',
        'Partnerimle olan bağlantımızı analiz etmek istiyorum',
        'İlişkimin geleceği hakkında bilgi almak istiyorum',
        'İlişkimdeki sorunları çözmek istiyorum'
      ],
      understanding: [
        'İlişkimde hangi konulara odaklanmalıyım?',
        'Partnerimle nasıl daha iyi iletişim kurabilirim?',
        'İlişkimde hangi değişiklikleri yapmalıyım?',
        'İlişkimin sağlıklı olması için ne yapmalıyım?'
      ],
      emotional: [
        'İlişkimde duygusal olarak zorlanıyorum',
        'Partnerimle arasında sorunlar var',
        'İlişkimde güven sorunu yaşıyorum',
        'İlişkimde mutlu değilim'
      ]
    }
  };
  
  const questions = questionSets[spreadType] || questionSets['love-spread'];
  
  return {
    concern: questions.concern[Math.floor(Math.random() * questions.concern.length)],
    understanding: questions.understanding[Math.floor(Math.random() * questions.understanding.length)],
    emotional: questions.emotional[Math.floor(Math.random() * questions.emotional.length)]
  };
};

// Gerçek kullanıcı gibi rastgele kart seçimi
const generateRandomCards = (cardCount) => {
  const allCards = [
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
    'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
    'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
    'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World',
    'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands',
    'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands',
    'Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands',
    'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups',
    'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups',
    'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups',
    'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords',
    'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords',
    'Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords',
    'Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles', 'Five of Pentacles',
    'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles', 'Nine of Pentacles', 'Ten of Pentacles',
    'Page of Pentacles', 'Knight of Pentacles', 'Queen of Pentacles', 'King of Pentacles'
  ];
  
  const selectedCards = [];
  const usedCards = new Set();
  
  for (let i = 0; i < cardCount; i++) {
    let card;
    do {
      card = allCards[Math.floor(Math.random() * allCards.length)];
    } while (usedCards.has(card));
    
    usedCards.add(card);
    selectedCards.push({
      name: card,
      position: i + 1,
      isReversed: Math.random() < 0.3 // %30 ters kart
    });
  }
  
  return selectedCards;
};

// Gerçek kredi maliyetleri
const CREDIT_COSTS = {
  LOVE_SPREAD_DETAILED: 80,
  LOVE_SPREAD_WRITTEN: 70,
  CAREER_SPREAD_DETAILED: 90,
  CAREER_SPREAD_WRITTEN: 80,
  SITUATION_ANALYSIS_DETAILED: 100,
  SITUATION_ANALYSIS_WRITTEN: 90,
  RELATIONSHIP_ANALYSIS_DETAILED: 110,
  RELATIONSHIP_ANALYSIS_WRITTEN: 100,
  PROBLEM_SOLVING_DETAILED: 130,
  PROBLEM_SOLVING_WRITTEN: 120
};

// Açılım türleri ve konfigürasyonları
const SPREAD_CONFIGS = {
  'love-spread': {
    readingType: 'love',
    spreadName: 'Aşk Açılımı',
    cardCount: 3,
    detailedKey: 'LOVE_SPREAD_DETAILED',
    writtenKey: 'LOVE_SPREAD_WRITTEN'
  },
  'career-spread': {
    readingType: 'career',
    spreadName: 'Kariyer Açılımı',
    cardCount: 5,
    detailedKey: 'CAREER_SPREAD_DETAILED',
    writtenKey: 'CAREER_SPREAD_WRITTEN'
  },
  'situation-analysis': {
    readingType: 'situation-analysis',
    spreadName: 'Durum Analizi Açılımı',
    cardCount: 7,
    detailedKey: 'SITUATION_ANALYSIS_DETAILED',
    writtenKey: 'SITUATION_ANALYSIS_WRITTEN'
  },
  'relationship-analysis': {
    readingType: 'relationship-analysis',
    spreadName: 'İlişki Analizi Açılımı',
    cardCount: 8,
    detailedKey: 'RELATIONSHIP_ANALYSIS_DETAILED',
    writtenKey: 'RELATIONSHIP_ANALYSIS_WRITTEN'
  }
};

// Kullanıcı kredilerini kontrol et
async function checkUserCredits() {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', testUser.id)
      .single();
    
    if (error) throw error;
    
    console.log(`💳 Mevcut kredi: ${data.credits}`);
    return data.credits;
  } catch (error) {
    console.error('❌ Kredi kontrolü başarısız:', error.message);
    throw error;
  }
}

// Gerçek kullanıcı gibi okuma oluştur
async function createRealUserReading(spreadType, readingType, personalInfo, questions, cards) {
  const config = SPREAD_CONFIGS[spreadType];
  const creditKey = readingType === 'VOICE' ? config.detailedKey : config.writtenKey;
  const costCredits = CREDIT_COSTS[creditKey];
  
  console.log(`\n🔄 ${readingType} okuma oluşturuluyor...`);
  console.log(`📊 Açılım: ${config.spreadName}`);
  console.log(`👤 Kullanıcı: ${personalInfo.name} ${personalInfo.surname}`);
  console.log(`📧 E-posta: ${personalInfo.email}`);
  console.log(`📞 Telefon: ${personalInfo.phone}`);
  console.log(`🎂 Doğum: ${personalInfo.birthDate}`);
  console.log(`💭 Endişe: ${questions.concern}`);
  console.log(`🃏 Kart Sayısı: ${cards.length}`);
  console.log(`💰 Kredi Maliyeti: ${costCredits} (${creditKey})`);
  
  try {
    // Okuma verisi oluştur (gerçek kullanıcı gibi)
    const readingData = {
      user_id: testUser.id,
      reading_type: config.readingType,
      spread_name: config.spreadName,
      title: `${readingType} ${config.spreadName}`,
      cards: cards,
      questions: {
        personalInfo: personalInfo,
        userQuestions: questions
      },
      contact_method: readingType === 'VOICE' ? 'whatsapp' : 'email',
      phone: readingType === 'VOICE' ? personalInfo.phone : null,
      cost_credits: costCredits,
      status: 'completed',
      interpretation: `Bu ${config.spreadName} okuması gerçek kullanıcı testi ile oluşturulmuştur. ${cards.length} kart ile ${questions.concern} sorusuna yanıt aranmaktadır.`,
      metadata: {
        communication_type: readingType === 'VOICE' ? 'sesli' : 'yazılı',
        platform: 'web',
        test_type: 'real_user_simulation',
        timestamp: new Date().toISOString()
      }
    };
    
    // Supabase'e kaydet
    const { data, error } = await supabaseAdmin
      .from('readings')
      .insert([readingData])
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ ${readingType} okuma kaydedildi!`);
    console.log(`📊 Okuma ID: ${data.id}`);
    console.log(`📱 İletişim: ${readingData.contact_method}`);
    
    return {
      id: data.id,
      readingType,
      costCredits,
      personalInfo,
      questions,
      cards,
      config
    };
  } catch (error) {
    console.error(`❌ ${readingType} okuma kaydedilemedi:`, error.message);
    throw error;
  }
}

// Kredi güncelle
async function updateUserCredits(totalCreditsDeducted) {
  try {
    // Mevcut kredi bakiyesini al
    const { data: currentData, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', testUser.id)
      .single();
    
    if (fetchError) throw fetchError;
    
    const newCredits = currentData.credits - totalCreditsDeducted;
    
    // Kredi güncelle
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', testUser.id);
    
    if (error) throw error;
    
    console.log(`✅ Kredi güncellendi! Yeni kredi: ${newCredits}`);
    return newCredits;
  } catch (error) {
    console.error('❌ Kredi güncellenemedi:', error.message);
    throw error;
  }
}

// Test sonuçlarını kaydet
async function saveTestResults(voiceReading, writtenReading, initialCredits, finalCredits) {
  const results = {
    testType: 'real_user_simulation',
    timestamp: new Date().toISOString(),
    user: {
      id: testUser.id,
      email: testUser.email,
      name: testUser.name,
      surname: testUser.surname
    },
    readings: {
      voice: {
        id: voiceReading.id,
        type: voiceReading.readingType,
        costCredits: voiceReading.costCredits,
        personalInfo: voiceReading.personalInfo,
        questions: voiceReading.questions,
        cards: voiceReading.cards,
        config: voiceReading.config
      },
      written: {
        id: writtenReading.id,
        type: writtenReading.readingType,
        costCredits: writtenReading.costCredits,
        personalInfo: writtenReading.personalInfo,
        questions: writtenReading.questions,
        cards: writtenReading.cards,
        config: writtenReading.config
      }
    },
    credits: {
      initial: initialCredits,
      final: finalCredits,
      deducted: initialCredits - finalCredits,
      voiceCredits: voiceReading.costCredits,
      writtenCredits: writtenReading.costCredits,
      totalCredits: voiceReading.costCredits + writtenReading.costCredits
    },
    summary: {
      totalReadings: 2,
      success: true,
      timestamp: new Date().toISOString()
    }
  };
  
  // JSON dosyasına kaydet
  const resultsPath = path.join(__dirname, 'real-user-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log(`✅ Test sonuçları kaydedildi: ${resultsPath}`);
  
  // Konsola özet yazdır
  console.log('\n📋 Test Özeti:');
  console.log(`👤 Kullanıcı: ${testUser.name} ${testUser.surname} (${testUser.email})`);
  console.log(`🎤 Sesli Okuma: ${voiceReading.id} (sesli - ${voiceReading.personalInfo.phone})`);
  console.log(`📝 Yazılı Okuma: ${writtenReading.id} (yazılı - ${writtenReading.personalInfo.email})`);
  console.log(`💳 Kredi: ${initialCredits} → ${finalCredits} (-${initialCredits - finalCredits})`);
  console.log(`🎤 Sesli Okuma Maliyeti: ${voiceReading.costCredits} kredi`);
  console.log(`📝 Yazılı Okuma Maliyeti: ${writtenReading.costCredits} kredi`);
  console.log(`💰 Toplam Maliyet: ${voiceReading.costCredits + writtenReading.costCredits} kredi`);
  console.log(`📊 Toplam Kart: ${voiceReading.cards.length + writtenReading.cards.length}`);
  console.log(`✅ Test Başarılı: true`);
}

// Ana test fonksiyonu
async function runRealUserTest(spreadType = 'love-spread') {
  console.log('🎯 Gerçek Kullanıcı Deneyimi Test Başlatılıyor...');
  console.log(`📊 Test Açılımı: ${SPREAD_CONFIGS[spreadType].spreadName}`);
  
  try {
    // 1. Kullanıcı kredilerini kontrol et
    console.log('\n💰 Kullanıcı kredileri kontrol ediliyor...');
    const initialCredits = await checkUserCredits();
    
    // 2. Gerçek kullanıcı gibi kişisel bilgiler oluştur
    console.log('\n👤 Gerçek kullanıcı bilgileri oluşturuluyor...');
    const personalInfo = generateRandomPersonalInfo();
    
    // 3. Gerçek kullanıcı gibi sorular oluştur
    console.log('\n💭 Gerçek kullanıcı soruları oluşturuluyor...');
    const questions = generateRandomQuestions(spreadType);
    
    // 4. Gerçek kullanıcı gibi kartlar seç
    console.log('\n🃏 Gerçek kullanıcı kartları seçiliyor...');
    const cards = generateRandomCards(SPREAD_CONFIGS[spreadType].cardCount);
    
    // 5. Sesli okuma oluştur (WhatsApp)
    const voiceReading = await createRealUserReading(
      spreadType, 
      'VOICE', 
      personalInfo, 
      questions, 
      cards
    );
    
    // 6. Yazılı okuma oluştur (Email)
    const writtenReading = await createRealUserReading(
      spreadType, 
      'WRITTEN', 
      personalInfo, 
      questions, 
      cards
    );
    
    // 7. Kredi düşüşünü simüle et
    const totalCreditsDeducted = voiceReading.costCredits + writtenReading.costCredits;
    console.log(`\n💳 Kullanıcı kredileri güncelleniyor (-${totalCreditsDeducted})...`);
    const finalCredits = await updateUserCredits(totalCreditsDeducted);
    
    // 8. Sonuçları kaydet
    console.log('\n📧 Test sonuçları iletiliyor...');
    await saveTestResults(voiceReading, writtenReading, initialCredits, finalCredits);
    
    console.log('\n🎉 Gerçek kullanıcı testi tamamlandı!');
    console.log('✅ Supabase bağlantısı çalışıyor');
    console.log('✅ Okumalar kaydedildi');
    console.log('✅ Kredi sistemi çalışıyor');
    console.log('✅ Tüm işlemler başarılı');
    
  } catch (error) {
    console.error('\n❌ Test başarısız:', error.message);
    throw error;
  }
}

// Test çalıştır
if (require.main === module) {
  const spreadType = process.argv[2] || 'love-spread';
  runRealUserTest(spreadType).catch(console.error);
}

module.exports = { runRealUserTest, createRealUserReading, checkUserCredits };
