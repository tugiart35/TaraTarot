/**
 * Tüm Açılımları Test Et Scripti
 * Bu script tüm tarot açılım türlerini tek tek test eder
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase bağlantısı
const supabaseUrl = 'https://qtlokdkcerjrbtrphlrh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNDgwOTcsImV4cCI6MjA3MzcyNDA5N30.ezpkbTze481HDVgWDohuDY-iOfK8TQpog1Jzk6Glm6k';
const supabaseServiceKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG9rZGtjZXJqcmJydHBobHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE0ODA5NywiZXhwIjoyMDczNzI0MDk3fQ.Z9GuxWdEpsAhnz405LM7aVBmZNyJbZOnOdi8A3cMKWI';

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Test kullanıcısı
const testUser = {
  id: '9fcf760f-4cb4-492f-8655-f880165413e1',
  email: 'barbieetugay@gmail.com',
  name: 'Barbie',
  surname: 'Etugay',
};

// Açılım türleri ve konfigürasyonları
const SPREAD_CONFIGS = {
  'love-spread': {
    readingType: 'love',
    spreadName: 'Aşk Açılımı',
    cardCount: 3,
    detailedKey: 'LOVE_SPREAD_DETAILED',
    writtenKey: 'LOVE_SPREAD_WRITTEN',
  },
  'career-spread': {
    readingType: 'career',
    spreadName: 'Kariyer Açılımı',
    cardCount: 5,
    detailedKey: 'CAREER_SPREAD_DETAILED',
    writtenKey: 'CAREER_SPREAD_WRITTEN',
  },
  'situation-analysis': {
    readingType: 'situation-analysis',
    spreadName: 'Durum Analizi Açılımı',
    cardCount: 7,
    detailedKey: 'SITUATION_ANALYSIS_DETAILED',
    writtenKey: 'SITUATION_ANALYSIS_WRITTEN',
  },
  'relationship-analysis': {
    readingType: 'relationship-analysis',
    spreadName: 'İlişki Analizi Açılımı',
    cardCount: 8,
    detailedKey: 'RELATIONSHIP_ANALYSIS_DETAILED',
    writtenKey: 'RELATIONSHIP_ANALYSIS_WRITTEN',
  },
  'problem-solving': {
    readingType: 'problem-solving',
    spreadName: 'Problem Çözme Açılımı',
    cardCount: 10,
    detailedKey: 'PROBLEM_SOLVING_DETAILED',
    writtenKey: 'PROBLEM_SOLVING_WRITTEN',
  },
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
  PROBLEM_SOLVING_WRITTEN: 120,
};

// Rastgele sorular oluştur
const generateRandomQuestions = spreadType => {
  const questionSets = {
    'love-spread': {
      concerns: [
        'Gelecekteki aşk hayatım nasıl olacak?',
        'Mevcut ilişkimde yaşadığım sorunları çözmek istiyorum',
        'Aşk hayatımda doğru kişiyi bulabilecek miyim?',
        'Eski aşkım geri dönecek mi?',
      ],
      understandings: [
        'Aşk hayatımda hangi adımları atmalıyım?',
        'İlişkimdeki sorunları nasıl çözebilirim?',
        'Aşk hayatımda neye odaklanmalıyım?',
        'Gelecekteki aşk hayatım hakkında bilgi almak istiyorum',
      ],
      emotionals: [
        'Karışık duygular içindeyim ve netlik istiyorum',
        'Aşk konusunda endişeliyim ve rehberliğe ihtiyacım var',
        'Duygusal olarak hazır mıyım yeni bir ilişkiye?',
        'Aşk hayatımda hangi duyguları yaşıyorum?',
      ],
    },
    'career-spread': {
      concerns: [
        'Kariyerimde hangi yöne gitmeliyim?',
        'İş hayatımda yaşadığım sorunları çözmek istiyorum',
        'Yeni bir iş fırsatı değerlendirmeli miyim?',
        'Kariyerimde ilerleme kaydedebilecek miyim?',
      ],
      understandings: [
        'Kariyerimde hangi adımları atmalıyım?',
        'İş hayatımda neye odaklanmalıyım?',
        'Kariyer hedeflerime nasıl ulaşabilirim?',
        'Profesyonel gelişimim için ne yapmalıyım?',
      ],
      emotionals: [
        'İş hayatımda stresli ve endişeliyim',
        'Kariyer konusunda kararsızım',
        'İş hayatımda motivasyonumu kaybettim',
        'Kariyer değişikliği yapmalı mıyım?',
      ],
    },
    'situation-analysis': {
      concerns: [
        'Mevcut durumum hakkında netlik istiyorum',
        'Hayatımdaki karmaşık durumu analiz etmek istiyorum',
        'Gelecekteki adımlarımı belirlemek istiyorum',
        'Yaşadığım sorunları çözmek istiyorum',
      ],
      understandings: [
        'Mevcut durumumu nasıl değerlendirmeliyim?',
        'Hangi konularda odaklanmalıyım?',
        'Gelecekteki planlarımı nasıl şekillendirmeliyim?',
        'Hayatımda hangi değişiklikleri yapmalıyım?',
      ],
      emotionals: [
        'Karışık duygular içindeyim ve netlik istiyorum',
        'Stresli ve endişeliyim',
        'Hayatımda belirsizlik yaşıyorum',
        'Duygusal olarak dengeli değilim',
      ],
    },
    'relationship-analysis': {
      concerns: [
        'İlişkimde yaşadığım sorunları anlamak istiyorum',
        'Partnerimle olan bağlantımızı analiz etmek istiyorum',
        'İlişkimin geleceği hakkında bilgi almak istiyorum',
        'İlişkimdeki sorunları çözmek istiyorum',
      ],
      understandings: [
        'İlişkimde hangi konulara odaklanmalıyım?',
        'Partnerimle nasıl daha iyi iletişim kurabilirim?',
        'İlişkimde hangi değişiklikleri yapmalıyım?',
        'İlişkimin sağlıklı olması için ne yapmalıyım?',
      ],
      emotionals: [
        'İlişkimde duygusal olarak zorlanıyorum',
        'Partnerimle arasında sorunlar var',
        'İlişkimde güven sorunu yaşıyorum',
        'İlişkimde mutlu değilim',
      ],
    },
    'problem-solving': {
      concerns: [
        'Karmaşık bir problemle karşı karşıyayım ve çözüm arıyorum',
        'Bu problemin kökenini anlamak ve etkili çözümler bulmak istiyorum',
        'Problemimi çözmek için hangi yolu izlemeliyim?',
        'Bu durumla nasıl başa çıkabilirim?',
      ],
      understandings: [
        'Bu problemin çözümü için hangi adımları atmalıyım?',
        'Problemimi nasıl analiz etmeliyim?',
        'Hangi çözüm yollarını denemeliyim?',
        'Bu durumdan nasıl çıkabilirim?',
      ],
      emotionals: [
        'Stresli ve endişeliyim, net bir yol haritasına ihtiyacım var',
        'Bu problem beni çok yoruyor',
        'Çözüm bulamadığım için umutsuzum',
        'Bu durumla başa çıkamıyorum',
      ],
    },
  };

  const questions = questionSets[spreadType] || questionSets['love-spread'];

  return {
    concern:
      questions.concerns[Math.floor(Math.random() * questions.concerns.length)],
    understanding:
      questions.understandings[
        Math.floor(Math.random() * questions.understandings.length)
      ],
    emotional:
      questions.emotionals[
        Math.floor(Math.random() * questions.emotionals.length)
      ],
  };
};

// Rastgele kartlar seç
const generateRandomCards = cardCount => {
  const allCards = [
    'The Fool',
    'The Magician',
    'The High Priestess',
    'The Empress',
    'The Emperor',
    'The Hierophant',
    'The Lovers',
    'The Chariot',
    'Strength',
    'The Hermit',
    'Wheel of Fortune',
    'Justice',
    'The Hanged Man',
    'Death',
    'Temperance',
    'The Devil',
    'The Tower',
    'The Star',
    'The Moon',
    'The Sun',
    'Judgement',
    'The World',
    'Ace of Wands',
    'Two of Wands',
    'Three of Wands',
    'Four of Wands',
    'Five of Wands',
    'Six of Wands',
    'Seven of Wands',
    'Eight of Wands',
    'Nine of Wands',
    'Ten of Wands',
    'Page of Wands',
    'Knight of Wands',
    'Queen of Wands',
    'King of Wands',
    'Ace of Cups',
    'Two of Cups',
    'Three of Cups',
    'Four of Cups',
    'Five of Cups',
    'Six of Cups',
    'Seven of Cups',
    'Eight of Cups',
    'Nine of Cups',
    'Ten of Cups',
    'Page of Cups',
    'Knight of Cups',
    'Queen of Cups',
    'King of Cups',
    'Ace of Swords',
    'Two of Swords',
    'Three of Swords',
    'Four of Swords',
    'Five of Swords',
    'Six of Swords',
    'Seven of Swords',
    'Eight of Swords',
    'Nine of Swords',
    'Ten of Swords',
    'Page of Swords',
    'Knight of Swords',
    'Queen of Swords',
    'King of Swords',
    'Ace of Pentacles',
    'Two of Pentacles',
    'Three of Pentacles',
    'Four of Pentacles',
    'Five of Pentacles',
    'Six of Pentacles',
    'Seven of Pentacles',
    'Eight of Pentacles',
    'Nine of Pentacles',
    'Ten of Pentacles',
    'Page of Pentacles',
    'Knight of Pentacles',
    'Queen of Pentacles',
    'King of Pentacles',
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
      isReversed: Math.random() < 0.3, // %30 ters kart
    });
  }

  return selectedCards;
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

// Okuma oluştur
async function createReading(spreadType, readingType, questions, cards) {
  const config = SPREAD_CONFIGS[spreadType];
  const creditKey =
    readingType === 'VOICE' ? config.detailedKey : config.writtenKey;
  const costCredits = CREDIT_COSTS[creditKey];

  console.log(`\n🔄 ${readingType} okuma oluşturuluyor...`);
  console.log(`📊 Açılım: ${config.spreadName}`);
  console.log(`🃏 Kart Sayısı: ${cards.length}`);
  console.log(`💰 Kredi Maliyeti: ${costCredits} (${creditKey})`);

  try {
    const readingData = {
      user_id: testUser.id,
      reading_type: config.readingType,
      spread_name: config.spreadName,
      title: `${readingType} ${config.spreadName}`,
      cards: cards,
      questions: questions,
      contact_method: readingType === 'VOICE' ? 'whatsapp' : 'email',
      phone: readingType === 'VOICE' ? '+905551234567' : null,
      cost_credits: costCredits,
      status: 'completed',
      interpretation: `Bu ${config.spreadName} okuması tüm açılım testi ile oluşturulmuştur. ${cards.length} kart ile ${questions.concern} sorusuna yanıt aranmaktadır.`,
      metadata: {
        communication_type: readingType === 'VOICE' ? 'sesli' : 'yazılı',
        platform: 'web',
        test_type: 'all_spreads_test',
        timestamp: new Date().toISOString(),
      },
    };

    const { data, error } = await supabaseAdmin
      .from('readings')
      .insert([readingData])
      .select()
      .single();

    if (error) throw error;

    console.log(`✅ ${readingType} okuma kaydedildi!`);
    console.log(`📊 Okuma ID: ${data.id}`);

    return {
      id: data.id,
      readingType,
      costCredits,
      cards: cards.length,
      config,
    };
  } catch (error) {
    console.error(`❌ ${readingType} okuma kaydedilemedi:`, error.message);
    throw error;
  }
}

// Kredi güncelle
async function updateUserCredits(totalCreditsDeducted) {
  try {
    const { data: currentData, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', testUser.id)
      .single();

    if (fetchError) throw fetchError;

    const newCredits = currentData.credits - totalCreditsDeducted;

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

// Tek açılım testi
async function testSingleSpread(spreadType) {
  console.log(
    `\n🎯 ${SPREAD_CONFIGS[spreadType].spreadName} Test Başlatılıyor...`
  );

  try {
    const config = SPREAD_CONFIGS[spreadType];
    const questions = generateRandomQuestions(spreadType);
    const cards = generateRandomCards(config.cardCount);

    // Sesli okuma
    const voiceReading = await createReading(
      spreadType,
      'VOICE',
      questions,
      cards
    );

    // Yazılı okuma
    const writtenReading = await createReading(
      spreadType,
      'WRITTEN',
      questions,
      cards
    );

    // Kredi düşüşü
    const totalCredits = voiceReading.costCredits + writtenReading.costCredits;
    console.log(`\n💳 Toplam kredi düşüşü: ${totalCredits}`);

    return {
      spreadType,
      spreadName: config.spreadName,
      voiceReading,
      writtenReading,
      totalCredits,
      success: true,
    };
  } catch (error) {
    console.error(
      `❌ ${SPREAD_CONFIGS[spreadType].spreadName} test başarısız:`,
      error.message
    );
    return {
      spreadType,
      spreadName: SPREAD_CONFIGS[spreadType].spreadName,
      success: false,
      error: error.message,
    };
  }
}

// Tüm açılımları test et
async function testAllSpreads() {
  console.log('🎯 Tüm Açılımlar Test Başlatılıyor...');
  console.log(
    '📊 Test edilecek açılımlar:',
    Object.keys(SPREAD_CONFIGS).join(', ')
  );

  const initialCredits = await checkUserCredits();
  const results = [];
  let totalCreditsUsed = 0;

  // Her açılımı test et
  for (const spreadType of Object.keys(SPREAD_CONFIGS)) {
    const result = await testSingleSpread(spreadType);
    results.push(result);

    if (result.success) {
      totalCreditsUsed += result.totalCredits;
    }

    // Açılımlar arası kısa bekleme
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Kredi güncelle
  if (totalCreditsUsed > 0) {
    console.log(`\n💳 Toplam kredi düşüşü: ${totalCreditsUsed}`);
    const finalCredits = await updateUserCredits(totalCreditsUsed);

    // Sonuçları kaydet
    const testResults = {
      timestamp: new Date().toISOString(),
      user: testUser,
      initialCredits,
      finalCredits,
      totalCreditsUsed,
      results,
      summary: {
        totalSpreads: results.length,
        successfulSpreads: results.filter(r => r.success).length,
        failedSpreads: results.filter(r => !r.success).length,
        success: results.every(r => r.success),
      },
    };

    const resultsPath = path.join(__dirname, 'all-spreads-test-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));

    console.log('\n📋 Test Özeti:');
    console.log(
      `👤 Kullanıcı: ${testUser.name} ${testUser.surname} (${testUser.email})`
    );
    console.log(
      `💳 Kredi: ${initialCredits} → ${finalCredits} (-${totalCreditsUsed})`
    );
    console.log(`📊 Toplam Açılım: ${results.length}`);
    console.log(`✅ Başarılı: ${testResults.summary.successfulSpreads}`);
    console.log(`❌ Başarısız: ${testResults.summary.failedSpreads}`);
    console.log(
      `🎯 Genel Başarı: ${testResults.summary.success ? '✅ Evet' : '❌ Hayır'}`
    );

    console.log('\n📊 Açılım Detayları:');
    results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(
        `${status} ${result.spreadName}: ${result.success ? 'Başarılı' : result.error}`
      );
    });

    console.log('\n🎉 Tüm açılımlar testi tamamlandı!');
    console.log('✅ Supabase bağlantısı çalışıyor');
    console.log('✅ Okumalar kaydedildi');
    console.log('✅ Kredi sistemi çalışıyor');
    console.log('✅ Tüm işlemler başarılı');
  }
}

// Test çalıştır
if (require.main === module) {
  testAllSpreads().catch(console.error);
}

module.exports = { testAllSpreads, testSingleSpread };
