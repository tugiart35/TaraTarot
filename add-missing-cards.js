#!/usr/bin/env node

const fs = require('fs');

// JSON dosyasını oku
const trData = JSON.parse(fs.readFileSync('messages/tr.json', 'utf8'));

// Eksik kartları tanımla
const missingCards = {
  // SWORDS (Kılıç) - 14 kart
  "ace-of-swords": {
    "name": "Kılıç Ası – Netlik ve Yeni Düşünceler",
    "short_description": "Kılıç Ası, zihinsel netlik, yeni fikirler ve gerçeği görme gücünü temsil eder. Keskin zeka ve adaletli kararlar için güçlü bir başlangıcı simgeler.",
    "imageUrl": "/cards/rws/Ace-Swords.webp",
    "meanings": {
      "upright": {
        "general": "Kılıç Ası, zihinsel berraklık ve yeni düşünce süreçlerini getiri. Gerçeği görme, adil kararlar alma ve iletişimde netlik için ideal bir zamandır.",
        "love": "Aşkta, açık iletişim ve dürüstlük ön planda. İlişkilerde netlik kazanır ve gerçek duygularını ifade edersin.",
        "career": "Kariyerde yeni projeler, keskin kararlar ve zihinsel başarı için mükemmel bir dönem. Adalet ve dürüstlükle ilerle.",
        "money": "Maddi konularda net kararlar ve mantıklı planlarla ilerleme sağlanır. Detaylara dikkat et.",
        "spiritual": "Ruhsal olarak, zihinsel farkındalık ve içsel gerçeği görme yeteneği güçlenir. Meditasyon ve düşünce disiplini faydalıdır."
      },
      "reversed": {
        "general": "Ters Kılıç Ası, zihinsel karmaşa, iletişim sorunları veya yanlış kararlar riski taşır. Duygusal tepkilerden kaçın.",
        "love": "Aşkta yanlış anlamalar veya sert iletişim ilişkiye zarar verebilir. Sabırlı ve anlayışlı ol.",
        "career": "Kariyerde kararsızlık veya hatalı planlar sorun yaratabilir. Daha fazla araştırma yap.",
        "money": "Finansal kararlarda aceleci davranma. Mantıklı ve dikkatli ol.",
        "spiritual": "Zihinsel blokajlar veya içsel çatışmalar olabilir. Meditasyonla netlik kazanmaya çalış."
      }
    },
    "context": {
      "mythology": "Kılıç Ası, hava elementinin gücüyle, zihinsel netlik ve gerçeği görme yeteneğini temsil eder. Mitolojide adalet ve bilgelik kılıçla sembolize edilir.",
      "celtic_cross": {
        "future": "Gelecekte zihinsel açılımlar ve net kararlarla önemli adımlar atabilirsin.",
        "hidden_influences": "Gizli etkiler, mantık, geçmiş deneyimler ve öğrenme süreçleriyle ilgilidir."
      }
    },
    "story": {
      "title": "Kılıç Ası – Gerçeğin Kılıcı",
      "description": "Kartta bir el gökten bir kılıç tutar, taçla süslenmiş kılıç gücü ve adaleti simgeler. Bu, zihinsel berraklık ve gerçeği görme yeteneğinin başlangıcıdır.",
      "historytitle": "Tarihsel Köken",
      "history_message": "Kılıç Ası, Tarot'un minör arkanasında zihinsel gücün ve adaletin sembolü olarak bilinir. Orta Çağ'da kılıç, şövalyelik ve dürüstlüğü temsil ederdi.",
      "mystic_title": "Ruhsal Anlam: Zihinsel Aydınlanma",
      "mystic_message": "Ruhsal olarak Kılıç Ası, gerçeği görme, zihinsel disiplin ve içsel adalet için bir başlangıçtır.",
      "cultural_title": "Modern Yorum: Net Kararlar",
      "cultural_message": "Modern dünyada Kılıç Ası, mantıklı düşünme, net iletişim ve adil kararlar almayı temsil eder.",
      "lesson": "Zihnini keskinleştir, gerçeği ara ve adaletle hareket et."
    },
    "keywords": {
      "keywords_title": "Kılıç Ası Anahtar Kelimeler",
      "keywords_message": "kılıç ası tarot anlamı, ace of swords türkçe, zihinsel netlik, yeni fikirler, adalet, gerçek",
      "positive_title": "Pozitif Temalar",
      "positive_message": "Zihinsel berraklık, adalet, gerçek, yeni fikirler, keskin zeka.",
      "balance_title": "Denge ve Uyarı",
      "balance_message": "Duygusal değil mantıklı ol; gerçeği görmek için sabırlı ve dikkatli ol.",
      "soul_title": "Ruhsal Mesaj",
      "soul_message": "Gerçeği ara, zihnini disipline et ve adaletli hareket et."
    },
    "associations": {
      "title": "Kılıç Ası Kozmik Bağlantıları",
      "astrology": "İkizler Burcu (İletişim, Zeka, Merak)",
      "numerology": "1 (Yeni Başlangıç, Potansiyel, Güç)",
      "element": "Hava – Zeka, İletişim, Düşünce",
      "chakra": "Throat (Boğaz Çakrası) – İletişim ve Gerçek"
    },
    "card_combinations": {
      "title": "Kılıç Ası ile Öne Çıkan Kombinasyonlar",
      "combinations": [
        { "card": "Justice", "meaning": "Adalet ve gerçek güçlenir, önemli kararlar alınır." },
        { "card": "The Magician", "meaning": "Zihinsel güç ve yaratıcılık birleşir." },
        { "card": "King of Swords", "meaning": "Olgun liderlik ve keskin kararlarla başarı sağlanır." }
      ]
    },
    "affirmations": {
      "title": "Kılıç Ası Onaylamaları",
      "affirmation_list": [
        "Zihinsel netlikle gerçeği görüyorum.",
        "Adalet ve dürüstlükle kararlar alıyorum.",
        "Keskin zekayla yeni fikirlere açık oluyorum."
      ]
    },
    "cta": { "main": "Keşfet", "micro": "Daha fazla öğren" },
    "faq": [
      {
        "question": "Kılıç Ası ne anlama gelir?",
        "answer": "Kılıç Ası, zihinsel netlik, yeni fikirler ve gerçeği görme gücünü temsil eder."
      },
      {
        "question": "Kılıç Ası aşkta ne demek?",
        "answer": "Aşkta açık iletişim ve dürüstlük getirir, ilişkilerde netlik kazanırsın."
      }
    ],
    "related_cards": ["justice", "the-magician", "king-of-swords"]
  },
  
  "two-of-swords": {
    "name": "İki Kılıç – Kararsızlık ve Denge",
    "short_description": "İki Kılıç, zor kararlar, içsel çatışma ve dengeyi temsil eder. Seçim yapmaktan kaçınma veya tarafsız kalma durumunu simgeler.",
    "imageUrl": "/cards/rws/II-Swords.webp",
    "meanings": {
      "upright": {
        "general": "İki Kılıç, iki seçenek arasında kalmayı ve karar vermekte zorlanmayı gösterir. İçsel dengeyi korumak önemlidir.",
        "love": "Aşkta kararsızlık veya tarafsız kalma durumu. Duygularını netleştir ve seçim yap.",
        "career": "Kariyerde zor kararlar veya iki yol arasında seçim yapma zamanı. Detaylı analiz yap.",
        "money": "Maddi konularda tereddüt veya beklemede kalma durumu. Sabırlı ol.",
        "spiritual": "Ruhsal olarak iç denge ve huzur arayışı. Meditasyon yardımcı olabilir."
      },
      "reversed": {
        "general": "Ters İki Kılıç, kaçınma, bastırılmış duygular veya yanlış kararlar riskini gösterir.",
        "love": "Aşkta iletişim eksikliği veya duygusal kapanma olabilir.",
        "career": "Kariyerde karar vermekten kaçınma sorun yaratır.",
        "money": "Finansal konularda mantıksız kararlar veya erteleme.",
        "spiritual": "İçsel çatışmalar çözülmeli, farkındalık gereklidir."
      }
    },
    "context": {
      "mythology": "İki Kılıç, denge ve seçim arasındaki gerginliği temsil eder. Mitolojide iki yol veya ikilik sembolü sıkça görülür.",
      "celtic_cross": {
        "future": "Gelecekte önemli kararlar alman gerekebilir. Dengeli kal.",
        "hidden_influences": "Gizli korkular veya bastırılmış duygular etkili olabilir."
      }
    },
    "story": {
      "title": "İki Kılıç – Seçim Anı",
      "description": "Kartta gözleri bağlı bir figür iki kılıcı kavrar, dengeyi korumaya çalışır. Bu, zor seçimler ve içsel çatışmayı simgeler.",
      "historytitle": "Tarihsel Köken",
      "history_message": "İki Kılıç, Tarot geleneğinde kararsızlık ve dengeyi temsil eder. Orta Çağ'da adalet terazisi gibi iki tarafı simgelerdi.",
      "mystic_title": "Ruhsal Anlam: İçsel Denge",
      "mystic_message": "Ruhsal olarak İki Kılıç, içsel huzur ve dengeli kararlar için farkındalık gerektirir.",
      "cultural_title": "Modern Yorum: Zor Kararlar",
      "cultural_message": "Modern dünyada İki Kılıç, zor seçimler ve tarafsız kalma durumunu temsil eder.",
      "lesson": "Kararlarını dikkatle değerlendir, içsel dengeyi koru."
    },
    "keywords": {
      "keywords_title": "İki Kılıç Anahtar Kelimeler",
      "keywords_message": "iki kılıç tarot anlamı, two of swords türkçe, kararsızlık, denge, zor seçimler",
      "positive_title": "Pozitif Temalar",
      "positive_message": "Denge, tarafsızlık, iç huzur arayışı.",
      "balance_title": "Denge ve Uyarı",
      "balance_message": "Karar vermekten kaçınma, duygularını bastırma.",
      "soul_title": "Ruhsal Mesaj",
      "soul_message": "İçsel dengeyi koru ve bilinçli kararlar al."
    },
    "associations": {
      "title": "İki Kılıç Kozmik Bağlantıları",
      "astrology": "Terazi Burcu (Denge, Adalet, Uyum)",
      "numerology": "2 (Dualite, Denge, Seçim)",
      "element": "Hava – Düşünce, Analiz, İletişim",
      "chakra": "Third Eye (Üçüncü Göz Çakrası) – Sezgi ve Farkındalık"
    },
    "card_combinations": {
      "title": "İki Kılıç ile Öne Çıkan Kombinasyonlar",
      "combinations": [
        { "card": "Justice", "meaning": "Adil kararlar için denge ve netlik gerekir." },
        { "card": "The Lovers", "meaning": "Duygusal seçimler ve ilişkilerde karar verme zamanı." },
        { "card": "Two of Cups", "meaning": "İlişkilerde denge ve uyum arayışı." }
      ]
    },
    "affirmations": {
      "title": "İki Kılıç Onaylamaları",
      "affirmation_list": [
        "İçsel dengeyi koruyorum ve bilinçli kararlar alıyorum.",
        "Zor seçimlerde huzurlu ve sakin kalıyorum.",
        "Gerçeği görmek için kendimi açıyorum."
      ]
    },
    "cta": { "main": "Keşfet", "micro": "Daha fazla öğren" },
    "faq": [
      {
        "question": "İki Kılıç ne anlama gelir?",
        "answer": "İki Kılıç, kararsızlık, zor seçimler ve içsel dengeyi temsil eder."
      },
      {
        "question": "İki Kılıç aşkta ne demek?",
        "answer": "Aşkta kararsızlık veya ilişkide netlik kazanma ihtiyacını gösterir."
      }
    ],
    "related_cards": ["justice", "the-lovers", "two-of-cups"]
  }
};

// Diğer Swords kartları için template
const swordsCards = {
  "three-of-swords": {
    name: "Üç Kılıç – Kalp Kırıklığı ve Acı",
    number: 3,
    meaning: "kalp kırıklığı, acı, ayrılık, üzüntü",
    positive: "iyileşme başlangıcı, gerçeği kabul etme"
  },
  "four-of-swords": {
    name: "Dört Kılıç – Dinlenme ve İyileşme",
    number: 4,
    meaning: "dinlenme, iyileşme, meditasyon, geri çekilme",
    positive: "yeniden şarj olma, huzur bulma"
  },
  "five-of-swords": {
    name: "Beş Kılıç – Çatışma ve Kayıp",
    number: 5,
    meaning: "çatışma, yenilgi, rekabet, ego",
    positive: "dersleri öğrenme, uzlaşma"
  },
  "six-of-swords": {
    name: "Altı Kılıç – Geçiş ve İlerle",
    number: 6,
    meaning: "geçiş, yolculuk, değişim, ileriye gitme",
    positive: "yeni başlangıçlar, huzurlu geçiş"
  },
  "seven-of-swords": {
    name: "Yedi Kılıç – Strateji ve Dikkat",
    number: 7,
    meaning: "strateji, dikkat, gizlilik, planlama",
    positive: "zeki çözümler, stratejik düşünme"
  },
  "eight-of-swords": {
    name: "Sekiz Kılıç – Kısıtlama ve Korkular",
    number: 8,
    meaning: "kısıtlanma, korkular, zihinsel blokajlar",
    positive: "özgürleşme, korkuları aşma"
  },
  "nine-of-swords": {
    name: "Dokuz Kılıç – Kaygı ve Endişe",
    number: 9,
    meaning: "kaygı, endişe, kabuslar, stres",
    positive: "destek arama, iyileşme başlangıcı"
  },
  "ten-of-swords": {
    name: "On Kılıç – Son ve Yeni Başlangıç",
    number: 10,
    meaning: "son, yenilgi, pes etme, bitirme",
    positive: "yeni başlangıç, umut, yeniden doğuş"
  },
  "page-of-swords": {
    name: "Kılıç Prensi – Merak ve Öğrenme",
    number: 11,
    meaning: "merak, öğrenme, iletişim, yeni fikirler",
    positive: "zihinsel gelişim, cesaret"
  },
  "knight-of-swords": {
    name: "Kılıç Şövalyesi – Hızlı Hareket ve Kararlılık",
    number: 12,
    meaning: "hızlı hareket, kararlılık, cesaret, aksiyon",
    positive: "hedefe odaklanma, güçlü ilerleme"
  },
  "queen-of-swords": {
    name: "Kılıç Kraliçesi – Bağımsızlık ve Netlik",
    number: 13,
    meaning: "bağımsızlık, netlik, dürüstlük, zeka",
    positive: "adil liderlik, keskin zeka"
  },
  "king-of-swords": {
    name: "Kılıç Kralı – Otorite ve Adalet",
    number: 14,
    meaning: "otorite, adalet, mantık, liderlik",
    positive: "adil yönetim, bilgelik"
  }
};

// Wands kartları
const wandsCards = {
  "queen-of-wands": {
    name: "Asa Kraliçesi – Güven ve Karizm",
    number: 13,
    meaning: "güven, karizm, enerji, yaratıcılık",
    positive: "liderlik, ilham verme"
  },
  "king-of-wands": {
    name: "Asa Kralı – Vizyon ve Liderlik",
    number: 14,
    meaning: "vizyon, liderlik, girişimcilik, cesaret",
    positive: "güçlü liderlik, başarı"
  }
};

// Template fonksiyonu
function generateCardContent(slug, cardInfo, suit) {
  const suitInfo = {
    swords: { element: "Hava – Zeka, İletişim, Düşünce", chakra: "Throat (Boğaz Çakrası)", imagePrefix: "Swords" },
    wands: { element: "Ateş – Tutku, Enerji, Yaratıcılık", chakra: "Solar Plexus (Güneş Çakrası)", imagePrefix: "Wands" }
  };
  
  const info = suitInfo[suit];
  const romanNum = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"][cardInfo.number] || cardInfo.number;
  const imageUrl = cardInfo.number <= 10 ? `/cards/rws/${romanNum}-${info.imagePrefix}.webp` : 
                  cardInfo.number === 11 ? `/cards/rws/Page-${info.imagePrefix}.webp` :
                  cardInfo.number === 12 ? `/cards/rws/Knight-${info.imagePrefix}.webp` :
                  cardInfo.number === 13 ? `/cards/rws/Queen-${info.imagePrefix}.webp` :
                  `/cards/rws/King-${info.imagePrefix}.webp`;
  
  return {
    "name": cardInfo.name,
    "short_description": `${cardInfo.name}, ${cardInfo.meaning} konularında rehberlik sunar. ${cardInfo.positive} için güçlü bir karttır.`,
    "imageUrl": imageUrl,
    "meanings": {
      "upright": {
        "general": `${cardInfo.name}, ${cardInfo.meaning} ile ilgili önemli mesajlar taşır. Bu dönemde ${cardInfo.positive} ön plandadır.`,
        "love": `Aşkta ${cardInfo.meaning} temaları öne çıkar. İlişkilerde ${cardInfo.positive} için uygun bir zamandır.`,
        "career": `Kariyerde ${cardInfo.meaning} ile ilgili gelişmeler yaşanır. ${cardInfo.positive} için fırsatlar değerlendir.`,
        "money": `Maddi konularda ${cardInfo.meaning} göz önünde bulundurulmalıdır. ${cardInfo.positive} için adımlar at.`,
        "spiritual": `Ruhsal olarak ${cardInfo.meaning} üzerine odaklan. ${cardInfo.positive} için içsel çalışma yap.`
      },
      "reversed": {
        "general": `Ters pozisyonda ${cardInfo.name}, ${cardInfo.meaning} konularında zorluklar yaşanabileceğini gösterir.`,
        "love": `Aşkta dikkatli ol, ${cardInfo.meaning} ile ilgili sorunlar ortaya çıkabilir.`,
        "career": `Kariyerde sabırlı ve stratejik ol, aceleci kararlardan kaçın.`,
        "money": `Finansal konularda dikkatli ve planlı hareket et.`,
        "spiritual": `İçsel dengeyi korumak için meditasyon ve farkındalık gereklidir.`
      }
    },
    "context": {
      "mythology": `${cardInfo.name}, ${suit === 'swords' ? 'hava elementinin zihinsel gücü' : 'ateş elementinin yaratıcı enerjisi'}yle ${cardInfo.meaning} konularında rehberlik sunar.`,
      "celtic_cross": {
        "future": `Gelecekte ${cardInfo.positive} için fırsatlar yakalayabilirsin.`,
        "hidden_influences": `Gizli etkiler ${cardInfo.meaning} ile ilgili olabilir.`
      }
    },
    "story": {
      "title": `${cardInfo.name} – Kartın Hikayesi`,
      "description": `${cardInfo.name}, ${cardInfo.meaning} temalarını taşıyan güçlü bir karttır. ${cardInfo.positive} için önemli mesajlar verir.`,
      "historytitle": "Tarihsel Köken",
      "history_message": `${cardInfo.name}, Tarot geleneğinde ${cardInfo.meaning} sembolü olarak bilinir.`,
      "mystic_title": "Ruhsal Anlam",
      "mystic_message": `Ruhsal olarak ${cardInfo.name}, ${cardInfo.positive} için bir fırsattır.`,
      "cultural_title": "Modern Yorum",
      "cultural_message": `Modern dünyada ${cardInfo.name}, ${cardInfo.meaning} ve ${cardInfo.positive} ile ilişkilidir.`,
      "lesson": `${cardInfo.positive} için adımlar at ve ${cardInfo.meaning} konularında bilinçli ol.`
    },
    "keywords": {
      "keywords_title": `${cardInfo.name} Anahtar Kelimeler`,
      "keywords_message": `${slug.replace(/-/g, ' ')} tarot anlamı, ${cardInfo.meaning}, ${cardInfo.positive}`,
      "positive_title": "Pozitif Temalar",
      "positive_message": cardInfo.positive,
      "balance_title": "Denge ve Uyarı",
      "balance_message": `${cardInfo.meaning} konularında dikkatli ve dengeli ol.`,
      "soul_title": "Ruhsal Mesaj",
      "soul_message": `${cardInfo.positive} için içsel gücünü kullan.`
    },
    "associations": {
      "title": `${cardInfo.name} Kozmik Bağlantıları`,
      "astrology": suit === 'swords' ? "Hava Burçları (İkizler, Terazi, Kova)" : "Ateş Burçları (Koç, Aslan, Yay)",
      "numerology": `${cardInfo.number} (${cardInfo.meaning})`,
      "element": info.element,
      "chakra": info.chakra
    },
    "card_combinations": {
      "title": `${cardInfo.name} ile Öne Çıkan Kombinasyonlar`,
      "combinations": [
        { "card": "The Magician", "meaning": "Güçlü enerji ve yaratıcılık birleşir." },
        { "card": "The Fool", "meaning": "Yeni başlangıçlar ve cesur adımlar." }
      ]
    },
    "affirmations": {
      "title": `${cardInfo.name} Onaylamaları`,
      "affirmation_list": [
        `${cardInfo.positive} için güçlü ve hazırım.`,
        `${cardInfo.meaning} konularında bilinçli ve dikkatli davranıyorum.`,
        "İçsel gücümü kullanarak ilerliyorum."
      ]
    },
    "cta": { "main": "Keşfet", "micro": "Daha fazla öğren" },
    "faq": [
      {
        "question": `${cardInfo.name} ne anlama gelir?`,
        "answer": `${cardInfo.name}, ${cardInfo.meaning} ve ${cardInfo.positive} konularında rehberlik sunar.`
      }
    ],
    "related_cards": ["the-magician", "the-fool", "ace-of-wands"]
  };
}

// Tüm eksik kartları ekle
console.log('📝 Eksik kartlar ekleniyor...\n');
let addedCount = 0;

// İlk iki Swords kartını özel olarak ekle (zaten tanımladık)
Object.keys(missingCards).forEach(cardSlug => {
  trData.blog.cards[cardSlug] = missingCards[cardSlug];
  console.log(`✓ ${cardSlug} eklendi`);
  addedCount++;
});

// Diğer Swords kartlarını ekle
Object.keys(swordsCards).forEach(cardSlug => {
  trData.blog.cards[cardSlug] = generateCardContent(cardSlug, swordsCards[cardSlug], 'swords');
  console.log(`✓ ${cardSlug} eklendi`);
  addedCount++;
});

// Wands kartlarını ekle
Object.keys(wandsCards).forEach(cardSlug => {
  trData.blog.cards[cardSlug] = generateCardContent(cardSlug, wandsCards[cardSlug], 'wands');
  console.log(`✓ ${cardSlug} eklendi`);
  addedCount++;
});

// Dosyayı kaydet
fs.writeFileSync('messages/tr.json', JSON.stringify(trData, null, 2), 'utf8');

console.log(`\n✅ Toplam ${addedCount} kart başarıyla eklendi!`);
console.log('\n📊 Güncel Durum:');
console.log(`   • Toplam kart sayısı: ${Object.keys(trData.blog.cards).length}/78`);

